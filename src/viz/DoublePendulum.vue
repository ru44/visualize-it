<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two double pendulums (equal masses/lengths) released `sep` degrees apart, integrated with RK4.
// Even a tiny difference in the start angle grows into a completely different swing within seconds.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PIVOT = { x: W / 2, y: 90 }
const G = 9.8
const M1 = 1
const M2 = 1

const theta0 = computed(() => props.params.theta0 ?? 120)
const sep = computed(() => Math.max(0, props.params.sep ?? 0.5))
const L = computed(() => Math.max(0.4, props.params.L ?? 1))
const PXPM = 130 // px per metre of rod length

interface State { t1: number; t2: number; w1: number; w2: number }
function accel(s: State, len: number): [number, number] {
  const d = s.t1 - s.t2
  const den = 2 * M1 + M2 - M2 * Math.cos(2 * d)
  const num1 = -G * (2 * M1 + M2) * Math.sin(s.t1) - M2 * G * Math.sin(s.t1 - 2 * s.t2) - 2 * Math.sin(d) * M2 * (s.w2 * s.w2 * len + s.w1 * s.w1 * len * Math.cos(d))
  const a1 = num1 / (len * den)
  const num2 = 2 * Math.sin(d) * (s.w1 * s.w1 * len * (M1 + M2) + G * (M1 + M2) * Math.cos(s.t1) + s.w2 * s.w2 * len * M2 * Math.cos(d))
  const a2 = num2 / (len * den)
  return [a1, a2]
}
function deriv(s: State, len: number) {
  const [a1, a2] = accel(s, len)
  return { t1: s.w1, t2: s.w2, w1: a1, w2: a2 }
}
function rk4Step(s: State, len: number, dt: number): State {
  const add = (a: State, b: State, h: number): State => ({ t1: a.t1 + h * b.t1, t2: a.t2 + h * b.t2, w1: a.w1 + h * b.w1, w2: a.w2 + h * b.w2 })
  const k1 = deriv(s, len)
  const k2 = deriv(add(s, k1, dt / 2), len)
  const k3 = deriv(add(s, k2, dt / 2), len)
  const k4 = deriv(add(s, k3, dt), len)
  return {
    t1: s.t1 + (dt / 6) * (k1.t1 + 2 * k2.t1 + 2 * k3.t1 + k4.t1),
    t2: s.t2 + (dt / 6) * (k1.t2 + 2 * k2.t2 + 2 * k3.t2 + k4.t2),
    w1: s.w1 + (dt / 6) * (k1.w1 + 2 * k2.w1 + 2 * k3.w1 + k4.w1),
    w2: s.w2 + (dt / 6) * (k1.w2 + 2 * k2.w2 + 2 * k3.w2 + k4.w2),
  }
}

const STEPS = 1600
const DT = 0.008
function integrate(t1deg: number) {
  let s: State = { t1: (t1deg * Math.PI) / 180, t2: (theta0.value * Math.PI) / 180, w1: 0, w2: 0 }
  const out: State[] = [s]
  for (let i = 0; i < STEPS; i++) {
    s = rk4Step(s, L.value, DT)
    out.push(s)
  }
  return out
}
const trajA = computed(() => integrate(theta0.value))
const trajB = computed(() => integrate(theta0.value + sep.value))

const tMax = computed(() => STEPS * DT)
const tView = computed(() => Math.min(tMax.value, Math.max(0, props.params.t ?? 0)))
const idx = computed(() => Math.min(STEPS, Math.round(tView.value / DT)))

function bobs(s: State) {
  const len = L.value * PXPM
  const x1 = PIVOT.x + len * Math.sin(s.t1)
  const y1 = PIVOT.y + len * Math.cos(s.t1)
  const x2 = x1 + len * Math.sin(s.t2)
  const y2 = y1 + len * Math.cos(s.t2)
  return { x1, y1, x2, y2 }
}
const poseA = computed(() => bobs(trajA.value[idx.value]))
const poseB = computed(() => bobs(trajB.value[idx.value]))

const TRAIL = 220
const trailB = computed(() => {
  const from = Math.max(0, idx.value - TRAIL)
  let d = ''
  for (let i = from; i <= idx.value; i++) {
    const p = bobs(trajB.value[i])
    d += `${i === from ? 'M' : 'L'}${p.x2.toFixed(1)},${p.y2.toFixed(1)}`
  }
  return d
})

const drift = computed(() => Math.hypot(poseA.value.x2 - poseB.value.x2, poseA.value.y2 - poseB.value.y2) / PXPM)

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tView.value + dt
    if (v >= tMax.value) (v = 0)
    emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = true
    raf = requestAnimationFrame(tick)
  }
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('dpend.t'), value: `${fmt(tView.value, 1)} s` },
  { label: t('dpend.drift'), value: `${fmt(drift.value, 2)} m`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <button class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('dpend.hint') }}</text>
      <circle :cx="PIVOT.x" :cy="PIVOT.y" r="4" fill="var(--muted)" />
      <path :d="trailB" fill="none" stroke="var(--accent-2)" stroke-width="1.3" stroke-opacity="0.7" />

      <line :x1="PIVOT.x" :y1="PIVOT.y" :x2="poseA.x1" :y2="poseA.y1" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="poseA.x1" :y1="poseA.y1" :x2="poseA.x2" :y2="poseA.y2" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="poseA.x1" :cy="poseA.y1" r="6" fill="var(--accent)" />
      <circle :cx="poseA.x2" :cy="poseA.y2" r="8" fill="var(--accent)" />

      <line :x1="PIVOT.x" :y1="PIVOT.y" :x2="poseB.x1" :y2="poseB.y1" stroke="var(--accent-2)" stroke-width="2" stroke-opacity="0.85" />
      <line :x1="poseB.x1" :y1="poseB.y1" :x2="poseB.x2" :y2="poseB.y2" stroke="var(--accent-2)" stroke-width="2" stroke-opacity="0.85" />
      <circle :cx="poseB.x1" :cy="poseB.y1" r="5" fill="var(--accent-2)" />
      <circle :cx="poseB.x2" :cy="poseB.y2" r="7" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
