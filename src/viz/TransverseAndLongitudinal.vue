<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/transverse-and-longitudinal. Same s(x,t) = A sin(kx - wt) drawn two ways:
// top, as a transverse displacement (rope, y-axis); bottom, as a longitudinal displacement applied
// sideways to a row of resting particles (air/spring), so they visibly bunch into compressions and
// spread into rarefactions.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const LEN = 8
const PX0 = 60
const PX1 = 740
const PXPM = (PX1 - PX0) / LEN
const BASE_T = 130 // transverse baseline
const BASE_L = 360 // longitudinal row baseline
const AMPPX = 90

const f = computed(() => props.params.f ?? 0.8)
const lambda = computed(() => props.params.lambda ?? 2)
const A = computed(() => props.params.A ?? 0.5)
const k = computed(() => (2 * Math.PI) / lambda.value)
const w = computed(() => 2 * Math.PI * f.value)

const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  clock.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

function sAt(xm: number): number {
  return A.value * Math.sin(k.value * xm - w.value * clock.value)
}
const N = 160
const path = computed(() => {
  let d = ''
  for (let i = 0; i <= N; i++) {
    const xm = (i / N) * LEN
    const px = PX0 + xm * PXPM
    const py = BASE_T - sAt(xm) * AMPPX
    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1)
  }
  return d
})
const NDOTS = 34
const NOMINAL_GAP = (LEN / NDOTS) * PXPM
const dots = computed(() => {
  const xs: number[] = []
  for (let i = 0; i < NDOTS; i++) {
    const rest = ((i + 0.5) / NDOTS) * LEN
    xs.push(PX0 + (rest + sAt(rest)) * PXPM)
  }
  return xs.map((x, i) => {
    const left = i > 0 ? xs[i - 1]! : x - NOMINAL_GAP
    const right = i < xs.length - 1 ? xs[i + 1]! : x + NOMINAL_GAP
    const gap = (right - left) / 2
    return { x, comp: NOMINAL_GAP - gap } // positive = squeezed together (compression)
  })
})

const readouts = computed(() => [
  { label: t('translong.lambda'), value: fmt(lambda.value, 2) + ' m', color: 'var(--accent)' },
  { label: t('translong.f'), value: fmt(f.value, 2) + ' Hz' },
  { label: t('translong.A'), value: fmt(A.value, 2) + ' m', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('translong.hintT') }}</text>
      <line :x1="PX0" :x2="PX1" :y1="BASE_T" :y2="BASE_T" stroke="var(--grid)" stroke-dasharray="4 4" />
      <path :d="path" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />

      <line x1="10" :x2="W - 10" y1="230" y2="230" stroke="var(--line)" />
      <text class="num" x="16" y="252" font-size="12" fill="var(--muted)">{{ t('translong.hintL') }}</text>
      <rect :x="PX0" y="330" :width="PX1 - PX0" height="60" fill="var(--sunken)" />
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="BASE_L" r="7" :fill="d.comp > 1.5 ? 'var(--neg)' : d.comp < -1.5 ? 'var(--pos)' : 'var(--muted)'" />
      <text class="num" :x="PX0" y="440" font-size="11" fill="var(--neg)">{{ t('translong.compression') }}</text>
      <text class="num" :x="PX1 - 90" y="440" font-size="11" fill="var(--pos)">{{ t('translong.rarefaction') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
