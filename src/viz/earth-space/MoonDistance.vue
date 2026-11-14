<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, COVER_KEY, km, MOON_DISTANCE } from './moonDistanceModel'

// earth-space/moon-distance. params c (coin width, mm) and L (eye to coin, cm). Left: a side view with
// the eye, the coin on a stick and the two sight lines that skim its edges, going on to the Moon far
// away (broken axis, not to scale). Right: what the eye sees, the Moon disc with the coin disc in front.
// The coin and the Moon are drawn at the same angular scale, so the sight lines touch the Moon's edge
// exactly when the coin just covers it. Drag the coin along the stick to set L.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const EX = 40
const EY = 215
const S = 1.2 // px per cm of stick
const K = 2.92 // px per mm of coin (so that the picture's coin and Moon obey the same geometry)
const MX = 440
const MR = 44
const coinX = computed(() => EX + p.value.L * S)
const ch = computed(() => (p.value.c * K) / 2)
const hMoon = computed(() => (ch.value * (MX - EX)) / (coinX.value - EX)) // sight-line half-height at the Moon

// ---- what the eye sees ----
const VX = 640
const VY = 230
const VR = 70
const coinR = computed(() => VR * p.value.size)
const color = computed(() => (p.value.cover === 'exact' ? 'var(--pos)' : 'var(--neg)'))

const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const x0 = computed(() => (isRtl() ? W - 16 : 16))

// ---- dragging the coin ----
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  const m = svg.value?.getScreenCTM()
  if (!m) return
  const x = (e.clientX - m.e) / m.a
  emit('set', 'L', Math.min(250, Math.max(20, Math.round((x - EX) / S / 0.5) * 0.5)))
}
function down(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => [
  { label: t('moon-distance.r.ratio'), value: fmt(p.value.ratio, 1) },
  { label: t('moon-distance.r.yours'), value: `${km(p.value.distance)} km`, color: 'var(--accent)' },
  { label: t('moon-distance.r.real'), value: `${km(MOON_DISTANCE)} km` },
  { label: t('moon-distance.r.err'), value: `${p.value.error > 0 ? '+' : ''}${fmt(p.value.error * 100, 1)} %`, color: color.value },
  { label: t('moon-distance.r.radii'), value: fmt(p.value.radii, 1) },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none touch-none">
      <defs>
        <clipPath id="md-left"><rect x="0" y="52" width="470" height="360" /></clipPath>
        <clipPath id="md-right"><rect x="498" y="52" width="288" height="360" rx="8" /></clipPath>
      </defs>
      <text :x="x0" y="22" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('moon-distance.hint') }}</text>

      <!-- left: side view -->
      <g clip-path="url(#md-left)">
        <polygon :points="`${EX},${EY} ${MX},${EY - hMoon} ${MX},${EY + hMoon}`" fill="var(--accent)" opacity="0.1" />
        <line :x1="EX" :y1="EY" :x2="MX" :y2="EY - hMoon" stroke="var(--accent)" stroke-width="1.8" />
        <line :x1="EX" :y1="EY" :x2="MX" :y2="EY + hMoon" stroke="var(--accent)" stroke-width="1.8" />
        <line :x1="EX" :y1="EY" :x2="MX" :y2="EY" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="5 5" />
        <circle :cx="MX" :cy="EY" :r="MR" fill="var(--sunken)" stroke="var(--fg)" stroke-width="2" />
      </g>
      <!-- break in the distance -->
      <rect x="398" :y="EY - 7" width="14" height="14" fill="var(--panel)" />
      <path :d="`M397 ${EY + 9} L404 ${EY - 9} M406 ${EY + 9} L413 ${EY - 9}`" stroke="var(--muted)" stroke-width="2" fill="none" />
      <text :x="MX" :y="EY - MR - 12" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('moon-distance.moon') }}
      </text>
      <text :x="MX" :y="EY + MR + 22" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('moon-distance.moonw') }}</text>

      <!-- the eye, the stick, the coin -->
      <line :x1="EX" :y1="EY" :x2="coinX" :y2="EY" stroke="var(--muted)" stroke-width="4" stroke-linecap="round" />
      <circle :cx="EX" :cy="EY" r="11" fill="var(--panel)" stroke="var(--fg)" stroke-width="2" />
      <circle :cx="EX + 3" :cy="EY" r="4.5" fill="var(--fg)" />
      <text :x="EX" :y="EY + 38" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('moon-distance.eye') }}</text>
      <rect :x="coinX - 4" :y="EY - ch" width="8" :height="ch * 2" rx="3" fill="var(--accent-2)" stroke="var(--fg)" stroke-width="1.2" />
      <text :x="Math.min(coinX + 6, 330)" :y="EY - ch - 10" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent-2)" :direction="dir">
        {{ t('moon-distance.cw', { v: fmt(p.c, 1) }) }}
      </text>
      <!-- L: dimension line under the stick -->
      <g :stroke="'var(--accent-2)'" stroke-width="1.5" fill="none">
        <line :x1="EX" :y1="EY + 85" :x2="coinX" :y2="EY + 85" />
        <line :x1="EX" :y1="EY + 77" :x2="EX" :y2="EY + 93" />
        <line :x1="coinX" :y1="EY + 77" :x2="coinX" :y2="EY + 93" />
      </g>
      <text :x="(EX + coinX) / 2 + 20" :y="EY + 112" text-anchor="middle" font-size="14" font-weight="600" fill="var(--accent-2)" :direction="dir">
        {{ t('moon-distance.lw', { v: fmt(p.L, 1) }) }}
      </text>
      <!-- the handle to drag -->
      <rect
        :x="EX"
        :y="EY - 150"
        width="360"
        height="300"
        fill="transparent"
        :style="{ cursor: dragging ? 'grabbing' : 'ew-resize' }"
        @pointerdown="down"
        @pointermove="dragging && drag($event)"
        @pointerup="dragging = false"
        @pointercancel="dragging = false"
      />
      <text x="235" y="438" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('moon-distance.notScale') }}</text>

      <!-- right: what the eye sees -->
      <rect x="498" y="52" width="288" height="360" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <text :x="VX" y="44" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('moon-distance.sees') }}</text>
      <g clip-path="url(#md-right)">
        <circle :cx="VX" :cy="VY" :r="coinR" fill="var(--accent-2)" opacity="0.6" />
        <circle :cx="VX" :cy="VY" :r="coinR" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
        <circle :cx="VX" :cy="VY" :r="VR" fill="none" stroke="var(--fg)" stroke-width="2.5" stroke-dasharray="7 5" />
      </g>
      <circle cx="514" cy="72" r="6" fill="var(--accent-2)" />
      <text :x="526" y="77" font-size="13" fill="var(--fg)" text-anchor="start" :direction="dir">{{ t('moon-distance.coin') }}</text>
      <circle cx="614" cy="72" r="6" fill="none" stroke="var(--fg)" stroke-width="2" />
      <text :x="626" y="77" font-size="13" fill="var(--fg)" text-anchor="start" :direction="dir">{{ t('moon-distance.moon') }}</text>
      <text
        v-if="p.size > 1.6"
        :x="VX"
        :y="VY + 5"
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="5"
        stroke-linejoin="round"
      >
        {{ t('moon-distance.times', { v: fmt(p.size, 1) }) }}
      </text>
      <text :x="VX" y="437" text-anchor="middle" font-size="15" font-weight="700" :fill="color" :direction="dir">
        {{ t(COVER_KEY[p.cover]) }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
