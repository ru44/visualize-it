<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A mass on a spring with damping: m x'' + c x' + k x = 0, released from x0 with zero velocity.
// The damping ratio zeta = c / (2 sqrt(km)) decides the shape: zeta<1 oscillates and shrinks,
// zeta=1 returns without a single swing in the shortest possible time, zeta>1 creeps back slowly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const T_MAX = 10

const k = computed(() => Math.max(1, props.params.k ?? 20))
const m = computed(() => Math.max(0.1, props.params.m ?? 1))
const c = computed(() => Math.max(0, props.params.c ?? 2))
const x0 = computed(() => Math.max(0.1, props.params.x0 ?? 1))
const tNow = computed(() => Math.max(0, Math.min(T_MAX, props.params.t ?? 0)))

const w0 = computed(() => Math.sqrt(k.value / m.value))
const zeta = computed(() => c.value / (2 * Math.sqrt(k.value * m.value)))
const regime = computed(() => (zeta.value < 0.98 ? 'under' : zeta.value > 1.02 ? 'over' : 'critical'))

function xAt(tt: number): number {
  const z = zeta.value
  const w = w0.value
  if (z < 0.999) {
    const wd = w * Math.sqrt(1 - z * z)
    return x0.value * Math.exp(-z * w * tt) * (Math.cos(wd * tt) + ((z * w) / wd) * Math.sin(wd * tt))
  }
  if (z < 1.001) return x0.value * (1 + w * tt) * Math.exp(-w * tt)
  const s = w * Math.sqrt(z * z - 1)
  const r1 = -w * z + s
  const r2 = -w * z - s
  return x0.value * ((r2 * Math.exp(r1 * tt) - r1 * Math.exp(r2 * tt)) / (r2 - r1))
}

const N = 300
const curve = computed(() => {
  const pts: number[] = []
  for (let i = 0; i <= N; i++) pts.push(xAt((i / N) * T_MAX))
  return pts
})
const xMax = computed(() => Math.max(0.2, x0.value * 1.05))

// physical spring animation
const CX = 400
const ANCHOR_Y = 60
const REST_Y = 220
const PXPM = 90
const massY = computed(() => REST_Y + xAt(tNow.value) * PXPM)
const COILS = 10
const springPath = computed(() => {
  const y1 = ANCHOR_Y
  const y2 = massY.value - 26
  const len = y2 - y1
  let d = `M${CX},${y1}`
  for (let i = 1; i < COILS; i++) {
    const y = y1 + (len * i) / COILS
    const x = CX + (i % 2 === 0 ? -26 : 26)
    d += ` L${x},${y}`
  }
  d += ` L${CX},${y2}`
  return d
})

// scrolling position-vs-time trace
const PAD = { l: 56, r: 20, t: 300, b: 40 }
const sx = (tt: number) => PAD.l + (tt / T_MAX) * (W - PAD.l - PAD.r)
const sy = (x: number) => PAD.t + (H - PAD.t - PAD.b) / 2 - (x / xMax.value) * ((H - PAD.t - PAD.b) / 2)
const tracePath = computed(() => curve.value.map((x, i) => `${i ? 'L' : 'M'}${sx((i / N) * T_MAX).toFixed(1)},${sy(x).toFixed(1)}`).join(''))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tNow.value + dt
    if (v >= T_MAX) (v = 0)
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
  { label: t('damp.zeta'), value: fmt(zeta.value, 2), color: 'var(--accent)' },
  { label: t('damp.regime'), value: t(`damp.${regime.value}`), color: 'var(--accent-2)' },
  { label: t('damp.x'), value: `${fmt(xAt(tNow.value), 3)} m` },
])
</script>

<template>
  <div class="relative">
    <button class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('damp.hint') }}</text>
      <line :x1="60" :x2="740" :y1="REST_Y" :y2="REST_Y" stroke="var(--line)" stroke-dasharray="3 3" />
      <path :d="springPath" fill="none" stroke="var(--muted)" stroke-width="2" />
      <rect :x="CX - 26" :y="massY - 26" width="52" height="52" rx="6" fill="var(--accent)" />

      <g class="num" font-size="11" fill="var(--muted)">
        <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--grid)" />
        <text :x="PAD.l - 6" :y="sy(0) + 4" text-anchor="end">0</text>
      </g>
      <path :d="tracePath" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <circle :cx="sx(tNow)" :cy="sy(xAt(tNow))" r="4.5" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
