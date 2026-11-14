<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, km, pct, REAL_MOON, D_EARTH } from './moonSizeModel'

// earth-space/moon-size. params k (how many Moons wide the Earth's shadow is) and pos (how far the Moon
// is through its crossing, %). Top: the Earth's round shadow on the Moon's path, the Moon sliding
// across it, and a row of ghost Moons showing k of them fit across. Bottom: the Earth and the Moon
// it implies, d_M = d_E / (k + 1), side by side to scale, with the real Moon dashed on top.
// Drag the Moon sideways to set pos.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const CX = 400
const CY = 150
const p = computed(() => readParams(props.params))
const RM = computed(() => Math.min(40, 100 / p.value.k)) // the Moon's radius in the top picture (the shadow is at most 100 across)
const rs = computed(() => p.value.k * RM.value) // the shadow is k Moons wide
const x0 = computed(() => CX - rs.value - RM.value)
const span = computed(() => 2 * (rs.value + RM.value))
const mx = computed(() => x0.value + (p.value.pos / 100) * span.value)
const rowY = computed(() => CY + rs.value + RM.value + 8)
const brY = computed(() => rowY.value + RM.value + 8)
const ghosts = computed(() => Array.from({ length: Math.ceil(p.value.k) }, (_, i) => CX - rs.value + RM.value + i * 2 * RM.value))

// the bottom: Earth and the Moon it implies, to scale
const ER = 56
const EY = 414
const mr = computed(() => ER / p.value.ratio)
const realR = (ER * REAL_MOON) / D_EARTH

const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const physR = computed(() => (isRtl() ? 'end' : 'start'))
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  if (((e.clientY - b.top) / b.height) * H > 340) return
  const x = ((e.clientX - b.left) / b.width) * W
  emit('set', 'pos', Math.max(0, Math.min(100, Math.round(((x - x0.value) / span.value) * 100))))
}

const off = computed(() => Math.abs(p.value.err))
const readouts = computed(() => [
  { label: t('moon-size.r.k'), value: `${fmt(p.value.k, 2)}` },
  { label: t('moon-size.r.moon'), value: `${km(p.value.moon)} km`, color: 'var(--accent-2)' },
  { label: t('moon-size.r.real'), value: `${km(REAL_MOON)} km` },
  { label: t('moon-size.r.err'), value: pct(p.value.err), color: off.value <= 2 ? 'var(--pos)' : 'var(--accent-2)' },
  { label: t('moon-size.r.ratio'), value: `${fmt(p.value.ratio, 2)} : 1` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full cursor-pointer touch-none select-none"
      @pointerdown="onDown"
      @pointermove="dragging && pick($event)"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <defs>
        <clipPath id="ms-shadow"><circle :cx="CX" :cy="CY" :r="rs" /></clipPath>
        <clipPath id="ms-row"><rect :x="CX - rs - 2" :y="rowY - RM - 2" :width="2 * rs + 4" :height="2 * RM + 4" /></clipPath>
      </defs>
      <text x="16" y="20" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physR">{{ t('moon-size.hint') }}</text>
      <text x="16" y="42" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir" :text-anchor="physR">{{ t('moon-size.shadow') }}</text>

      <!-- the Earth's shadow, and the Moon's way through it -->
      <line :x1="x0" :y1="CY" :x2="x0 + span" :y2="CY" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 5" />
      <circle :cx="CX" :cy="CY" :r="rs" fill="var(--ink)" fill-opacity="0.9" stroke="var(--muted)" stroke-width="1.5" />
      <circle :cx="mx" :cy="CY" :r="RM" fill="var(--paper)" stroke="var(--muted)" stroke-width="1.5" />
      <circle :cx="mx" :cy="CY" :r="RM" fill="var(--neg)" fill-opacity="0.55" clip-path="url(#ms-shadow)" />
      <circle :cx="mx" :cy="CY" :r="RM + 6" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="3 3" />

      <!-- k Moons fit across the shadow -->
      <g clip-path="url(#ms-row)">
        <circle v-for="(g, i) in ghosts" :key="i" :cx="g" :cy="rowY" :r="RM" fill="var(--sunken)" stroke="var(--accent)" stroke-width="1.8" />
      </g>
      <path :d="`M${CX - rs} ${brY} v8 H${CX + rs} v-8`" fill="none" stroke="var(--accent)" stroke-width="2" />
      <text x="400" :y="brY + 30" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent)" :direction="dir">
        {{ t('moon-size.across', { k: fmt(p.k, 2) }) }}
      </text>

      <!-- the Earth and the Moon it implies, to scale -->
      <circle cx="110" :cy="EY" :r="ER" fill="var(--accent)" fill-opacity="0.85" />
      <text x="182" :y="EY - 4" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir" :text-anchor="physR">{{ t('moon-size.earth') }}</text>
      <text x="182" :y="EY + 14" font-size="13" fill="var(--muted)" direction="ltr" text-anchor="start">{{ km(D_EARTH) }} km</text>
      <circle cx="350" :cy="EY" :r="mr" fill="var(--accent-2)" fill-opacity="0.85" />
      <circle cx="350" :cy="EY" :r="realR" fill="none" stroke="var(--fg)" stroke-width="2" stroke-dasharray="4 3" />
      <text x="412" :y="EY - 8" font-size="13" font-weight="600" fill="var(--accent-2)" :direction="dir" :text-anchor="physR">
        {{ t('moon-size.yours', { d: km(p.moon) }) }}
      </text>
      <text x="412" :y="EY + 14" font-size="13" fill="var(--fg)" :direction="dir" :text-anchor="physR">{{ t('moon-size.theReal', { d: km(REAL_MOON) }) }}</text>
      <text x="400" y="474" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('moon-size.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
