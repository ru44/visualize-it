<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// physics/kinematics-constant-acceleration. params x0, v0, a, x = the moment t you inspect.
// A car on a measured road: scrub time and watch x(t) = x0 + v0·t + ½at². Breadcrumbs dropped at
// every whole second make the acceleration visible as growing (or shrinking) gaps, and the two
// arrows carry v(t) and a.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const x0 = computed(() => props.params.x0 ?? 0)
const v0 = computed(() => props.params.v0 ?? 2)
const a = computed(() => props.params.a ?? 1)
const tNow = computed(() => Math.min(Math.max(props.params.x ?? 4, 0), 10))
const posAt = (tt: number) => x0.value + v0.value * tt + 0.5 * a.value * tt * tt
const pos = computed(() => posAt(tNow.value))
const vel = computed(() => v0.value + a.value * tNow.value)

const ROAD = { x: 60, w: 680, y: 210 }
const mx = (m: number) => ROAD.x + ((Math.min(Math.max(m, -10), 62) + 10) / 72) * ROAD.w
const crumbs = computed(() => Array.from({ length: Math.floor(tNow.value) + 1 }, (_, i) => ({ t: i, x: mx(posAt(i)) })))

// the x–t curve as an inset, scrubbed by t
const CH = { x: 470, y: 300, w: 290, h: 150 }
const pts = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 60; i++) {
    const tt = (i / 60) * 10
    out.push(`${CH.x + (tt / 10) * CH.w},${CH.y + CH.h - ((Math.min(Math.max(posAt(tt), -10), 62) + 10) / 72) * CH.h}`)
  }
  return out.join(' ')
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sx = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.round(Math.min(10, Math.max(0, ((sx - ROAD.x) / ROAD.w) * 10)) * 50) / 50)
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 't', value: `${fmt(tNow.value, 2)} s`, color: 'var(--accent-2)' },
  { label: 'x(t) = x₀ + v₀t + ½at²', value: `${fmt(pos.value, 2)} m`, color: 'var(--accent)' },
  { label: 'v(t) = v₀ + at', value: `${fmt(vel.value, 2)} m/s`, color: 'var(--pos)' },
  { label: 'a', value: `${fmt(a.value, 1)} m/s²` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('road.hint') }}</text>
      <!-- the measured road -->
      <line :x1="ROAD.x" :y1="ROAD.y" :x2="ROAD.x + ROAD.w" :y2="ROAD.y" stroke="var(--line)" stroke-width="3" />
      <g v-for="m in [0, 10, 20, 30, 40, 50, 60]" :key="m">
        <line :x1="mx(m)" :y1="ROAD.y - 5" :x2="mx(m)" :y2="ROAD.y + 5" stroke="var(--line)" />
        <text :x="mx(m)" :y="ROAD.y + 22" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ m }} m</text>
      </g>
      <!-- breadcrumbs at whole seconds: the gaps are the story -->
      <circle v-for="c in crumbs" :key="c.t" :cx="c.x" :cy="ROAD.y - 10" r="3.5" fill="var(--accent-2)" opacity="0.65" />
      <text x="70" :y="ROAD.y - 44" font-size="10" fill="var(--muted)">{{ t('road.crumbs') }}</text>
      <!-- the car, its velocity arrow, its acceleration arrow -->
      <g :transform="`translate(${mx(pos)}, ${ROAD.y - 26})`">
        <rect x="-22" y="-14" width="44" height="18" rx="6" fill="var(--accent)" />
        <circle cx="-12" cy="6" r="6" fill="var(--fg)" />
        <circle cx="12" cy="6" r="6" fill="var(--fg)" />
        <line v-if="Math.abs(vel) > 0.1" x1="0" y1="-30" :x2="vel * 7" y2="-30" stroke="var(--pos)" stroke-width="3" />
        <path v-if="Math.abs(vel) > 0.1" :d="`M${vel * 7},-30 l${vel > 0 ? -7 : 7},-4 v8 z`" fill="var(--pos)" />
        <text :x="vel * 3.5" y="-38" text-anchor="middle" font-size="10" fill="var(--pos)" class="num">v</text>
        <line v-if="Math.abs(a) > 0.05" x1="0" y1="-56" :x2="a * 12" y2="-56" stroke="var(--accent-2)" stroke-width="3" />
        <path v-if="Math.abs(a) > 0.05" :d="`M${a * 12},-56 l${a > 0 ? -7 : 7},-4 v8 z`" fill="var(--accent-2)" />
        <text :x="a * 6" y="-64" text-anchor="middle" font-size="10" fill="var(--accent-2)" class="num">a</text>
      </g>
      <text v-if="Math.abs(vel) < 0.15 && tNow > 0.2" :x="mx(pos)" :y="ROAD.y + 44" text-anchor="middle" font-size="11" fill="var(--pos)" font-weight="600">{{ t('road.turning') }}</text>
      <!-- the x–t curve inset -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <polyline :points="pts" fill="none" stroke="var(--accent)" stroke-width="2" />
      <line :x1="CH.x + (tNow / 10) * CH.w" :y1="CH.y" :x2="CH.x + (tNow / 10) * CH.w" :y2="CH.y + CH.h" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <text :x="CH.x + 6" :y="CH.y + 14" font-size="10" fill="var(--muted)" class="num">x(t) · 0–10 s</text>
      <text x="90" y="330" font-size="12" fill="var(--fg)" class="num">x({{ fmt(tNow, 1) }}) = {{ fmt(x0, 1) }} + {{ fmt(v0, 1) }}·t + ½·{{ fmt(a, 1) }}·t² = {{ fmt(pos, 1) }} m</text>
      <text x="90" y="356" font-size="11" fill="var(--muted)">{{ t('road.readEq') }}</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('road.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
