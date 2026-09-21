<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 420
const X0 = 60
const X1 = 740
const XC = 400 // throat centre
const LC = 170 // half-length of the contraction zone
const H1 = 70 // inlet/outlet half-height (px)
const CY = 150 // pipe centreline
const RHO = 1.2
const P1 = 101325

const v1 = computed(() => props.params.v1 ?? 10)
const ratio = computed(() => Math.max(0.05, props.params.ratio ?? 0.5))

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}
/** Local pipe half-height (px) at screen x: flat at the ends, smoothly narrowed at the throat. */
function halfHeight(x: number) {
  const d = Math.min(1, Math.abs(x - XC) / LC)
  const shape = smoothstep(d) // 0 at the throat, 1 at the edges of the contraction zone
  const h2 = H1 * ratio.value
  return h2 + (H1 - h2) * shape
}
/** Local speed from continuity: v(x) = v1 * A1 / A(x) = v1 * H1 / h(x). */
function speedAt(x: number) {
  return (v1.value * H1) / halfHeight(x)
}

const N_WALL = 70
const pipePath = computed(() => {
  const top: [number, number][] = []
  const bot: [number, number][] = []
  for (let i = 0; i <= N_WALL; i++) {
    const x = X0 + ((X1 - X0) * i) / N_WALL
    const h = halfHeight(x)
    top.push([x, CY - h])
    bot.push([x, CY + h])
  }
  const pts = [...top, ...bot.reverse()]
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ' Z'
})

// --- particles ---
const LANES = [-0.75, -0.4, 0, 0.4, 0.75]
const PER_LANE = 4
const particleLane: number[] = []
const particleX = ref<number[]>([])
for (let l = 0; l < LANES.length; l++) {
  for (let k = 0; k < PER_LANE; k++) {
    particleLane.push(LANES[l])
    particleX.value.push(X0 + ((X1 - X0) * (k + l * 0.2 * PER_LANE)) / (PER_LANE * LANES.length))
  }
}
const particles = computed(() =>
  particleX.value.map((x, i) => {
    const h = halfHeight(x)
    return { x, y: CY + particleLane[i] * h }
  }),
)

let rafId: number | null = null
let lastTs: number | null = null
const PX_PER_MPS = 5
function tick(ts: number) {
  const dt = lastTs === null ? 0 : Math.min(0.05, (ts - lastTs) / 1000)
  lastTs = ts
  for (let i = 0; i < particleX.value.length; i++) {
    let x = particleX.value[i] + speedAt(particleX.value[i]) * PX_PER_MPS * dt
    if (x > X1) x = X0
    particleX.value[i] = x
  }
  rafId = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

// --- manometers ---
const TUBE_TOP = 250
const TUBE_BASE = 420
const TUBE_HALF_W = 15
const BASELINE_Y = TUBE_BASE - 80

function pressureAt(x: number) {
  const v = speedAt(x)
  return P1 + 0.5 * RHO * (v1.value * v1.value - v * v)
}

const stations = computed(() => {
  const raw = [
    { x: 140, label: 'inlet', p: pressureAt(140) },
    { x: XC, label: 'throat', p: pressureAt(XC) },
    { x: 660, label: 'outlet', p: pressureAt(660) },
  ]
  const maxDrop = Math.max(1, ...raw.map((s) => Math.abs(s.p - P1)))
  const k = 80 / maxDrop
  return raw.map((s) => ({ ...s, level: Math.max(TUBE_TOP + 8, Math.min(TUBE_BASE - 8, BASELINE_Y - k * (s.p - P1))) }))
})

const v2 = computed(() => v1.value / ratio.value)
const dp = computed(() => P1 - pressureAt(XC)) // pressure drop at the throat (Pa)

const readouts = computed(() => [
  { label: 'v₁', value: `${fmt(v1.value)} m/s` },
  { label: 'v₂ (throat)', value: `${fmt(v2.value)} m/s`, color: 'var(--accent)' },
  { label: 'Δp', value: `${fmt(dp.value)} Pa`, color: 'var(--accent-2)' },
  { label: 'A₂ / A₁', value: fmt(ratio.value) },
])

let dragStart: { x: number; ratio: number } | null = null
function down(e: PointerEvent) {
  dragStart = { x: e.clientX, ratio: ratio.value }
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!dragStart) return
  emit('set', 'ratio', dragStart.ratio + (e.clientX - dragStart.x) * 0.0022)
}
function up() {
  dragStart = null
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
      <path :d="pipePath" fill="var(--sunken)" stroke="var(--line)" stroke-width="1.5" />
      <circle v-for="(p, i) in particles" :key="i" :cx="p.x" :cy="p.y" r="2.5" fill="var(--accent)" />

      <g v-for="s in stations" :key="s.label">
        <line :x1="s.x" :y1="CY + halfHeight(s.x)" :x2="s.x" :y2="TUBE_TOP" stroke="var(--line)" stroke-width="1" />
        <rect :x="s.x - TUBE_HALF_W" :y="TUBE_TOP" :width="TUBE_HALF_W * 2" :height="TUBE_BASE - TUBE_TOP" fill="none" stroke="var(--line)" stroke-width="1.2" />
        <rect :x="s.x - TUBE_HALF_W" :y="s.level" :width="TUBE_HALF_W * 2" :height="TUBE_BASE - s.level" fill="var(--accent-2)" fill-opacity="0.45" stroke="none" />
        <text class="num" :x="s.x" :y="TUBE_TOP - 10" font-size="12" fill="var(--muted)" text-anchor="middle">{{ s.label }}</text>
      </g>

      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">drag horizontally to change the throat/inlet area ratio</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
