<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const K_RAD = 30 // px per (v / |q B|) — calibrates the visible cyclotron radius
const K_B = 1 / K_RAD
const K_E = 1 / (2 * K_RAD)
const TRAIL_N = 200

const q = computed(() => props.params.q ?? 1)
const v = computed(() => props.params.v ?? 5)
const B = computed(() => props.params.B ?? 1)
const E = computed(() => props.params.E ?? 0)

const state = reactive({ x: 60, y: H / 2, vx: 5, vy: 0, trail: [] as [number, number][] })

function reset() {
  state.x = 60
  state.y = H / 2
  state.vx = v.value
  state.vy = 0
  state.trail = []
}
reset()
watch(() => [q.value, v.value, B.value, E.value], reset)

function step() {
  const ax = -K_B * q.value * B.value * state.vy
  const ay = K_B * q.value * B.value * state.vx - K_E * q.value * E.value
  state.vx += ax
  state.vy += ay
  state.x += state.vx
  state.y += state.vy
  state.trail.push([state.x, state.y])
  if (state.trail.length > TRAIL_N) state.trail.shift()
  if (state.x < 0 || state.x > W || state.y < 0 || state.y > H) reset()
}

let raf = 0
function tick() {
  step()
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
})

const gridMarks = computed(() => {
  const out: [number, number][] = []
  for (let gx = 60; gx <= W - 40; gx += 90) {
    for (let gy = 50; gy <= H - 40; gy += 80) out.push([gx, gy])
  }
  return out
})

const fMag = computed(() => Math.abs(q.value * v.value * B.value))
const radius = computed(() => (q.value !== 0 && B.value !== 0 ? (K_RAD * v.value) / Math.abs(q.value * B.value) : NaN))
const period = computed(() => (Number.isFinite(radius.value) ? (2 * Math.PI * radius.value) / v.value : NaN))
const deflect = computed(() => {
  const ay0 = K_B * q.value * B.value * v.value - K_E * q.value * E.value
  if (Math.abs(ay0) < 1e-6) return 'none'
  return ay0 > 0 ? 'down' : 'up'
})

const velLine = computed(() => {
  const m = Math.hypot(state.vx, state.vy) || 1e-9
  const s = 26 / m
  return { x1: state.x, y1: state.y, x2: state.x + state.vx * s, y2: state.y + state.vy * s }
})
const forceLine = computed(() => {
  const ax = -K_B * q.value * B.value * state.vy
  const ay = K_B * q.value * B.value * state.vx - K_E * q.value * E.value
  const m = Math.hypot(ax, ay) || 1e-9
  const s = 26 / m
  return { x1: state.x, y1: state.y, x2: state.x + ax * s, y2: state.y + ay * s }
})

const trailPath = computed(() => state.trail.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(''))

const readouts = computed(() => [
  { label: 'F = qvB', value: `${fmt(fMag.value)} (rel. units)` },
  { label: 'radius', value: Number.isFinite(radius.value) ? `${fmt(radius.value)} px` : '—' },
  { label: 'period', value: Number.isFinite(period.value) ? `${fmt(period.value)} steps` : '—' },
  { label: 'deflects', value: deflect.value, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <template v-if="B >= 0">
        <g v-for="(m, i) in gridMarks" :key="'x' + i" stroke="var(--grid)" stroke-width="1.2">
          <line :x1="m[0] - 5" :y1="m[1] - 5" :x2="m[0] + 5" :y2="m[1] + 5" />
          <line :x1="m[0] - 5" :y1="m[1] + 5" :x2="m[0] + 5" :y2="m[1] - 5" />
        </g>
      </template>
      <template v-else>
        <circle v-for="(m, i) in gridMarks" :key="'d' + i" :cx="m[0]" :cy="m[1]" r="2.5" fill="var(--grid)" />
      </template>

      <path :d="trailPath" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-opacity="0.5" />

      <line :x1="forceLine.x1" :y1="forceLine.y1" :x2="forceLine.x2" :y2="forceLine.y2" stroke="var(--accent-2)" stroke-width="2.2" stroke-linecap="round" />
      <line :x1="velLine.x1" :y1="velLine.y1" :x2="velLine.x2" :y2="velLine.y2" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" />
      <circle :cx="state.x" :cy="state.y" r="5.5" fill="var(--fg)" />

      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">F = q(E + v × B): the magnetic force is always perpendicular to v, so it steers but never speeds up.</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
