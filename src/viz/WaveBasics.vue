<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/wave-basics. A rope y(x,t) = A sin(2*pi*(x/lambda - f*t)), x in metres
// along the rope (0..8 m), shaken from the left edge. v = f*lambda is the headline formula.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const LEN = 8 // metres of rope shown
const PX0 = 50
const PX1 = 760
const BASE = 240
const PXPM = (PX1 - PX0) / LEN // px per metre, x axis
const AMPPX = 150 // px per metre of amplitude (exaggerated for legibility)

const f = computed(() => props.params.f ?? 0.5)
const lambda = computed(() => props.params.lambda ?? 2)
const A = computed(() => props.params.A ?? 0.4)
const v = computed(() => f.value * lambda.value)

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

function yAt(xm: number): number {
  return A.value * Math.sin(2 * Math.PI * (xm / lambda.value - f.value * clock.value))
}
const N = 160
const path = computed(() => {
  let d = ''
  for (let i = 0; i <= N; i++) {
    const xm = (i / N) * LEN
    const px = PX0 + xm * PXPM
    const py = BASE - yAt(xm) * AMPPX
    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1)
  }
  return d
})
// particle that only bobs vertically (transverse motion), fixed at x = 4 m
const partX = 4
const partPy = computed(() => BASE - yAt(partX) * AMPPX)
// crest tracker: a fixed point of constant phase (a crest), so it visibly rides along at speed v
const crestPx = computed(() => {
  const x = (lambda.value / 4 + v.value * clock.value) % LEN
  return PX0 + x * PXPM
})

const readouts = computed(() => [
  { label: t('wavebasics.lambda'), value: fmt(lambda.value, 2) + ' m', color: 'var(--accent)' },
  { label: t('wavebasics.f'), value: fmt(f.value, 2) + ' Hz' },
  { label: t('wavebasics.v'), value: fmt(v.value, 2) + ' m/s', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('wavebasics.hint') }}</text>
      <line :x1="PX0" :x2="PX1" :y1="BASE" :y2="BASE" stroke="var(--grid)" stroke-dasharray="4 4" />
      <!-- hand shaking the rope at the left edge -->
      <circle :cx="PX0" :cy="BASE - yAt(0) * AMPPX" r="8" fill="var(--fg)" />
      <path :d="path" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
      <!-- wavelength annotation between two crests near the middle -->
      <g v-if="lambda <= LEN - 1">
        <line :x1="PX0 + (LEN / 2 - lambda / 2) * PXPM" :x2="PX0 + (LEN / 2 + lambda / 2) * PXPM" :y1="60" :y2="60" stroke="var(--muted)" marker-start="url(#wb-arrow)" marker-end="url(#wb-arrow)" />
        <text class="num" :x="PX0 + (LEN / 2) * PXPM" y="50" text-anchor="middle" font-size="13" fill="var(--muted)">λ</text>
      </g>
      <!-- amplitude annotation -->
      <line :x1="PX0 + 1 * PXPM" :x2="PX0 + 1 * PXPM" :y1="BASE" :y2="BASE - A * AMPPX" stroke="var(--neg)" />
      <text class="num" :x="PX0 + 1 * PXPM + 8" :y="BASE - A * AMPPX * 0.5" font-size="13" fill="var(--neg)">A</text>
      <!-- particle: bobs only vertically -->
      <circle :cx="PX0 + partX * PXPM" :cy="partPy" r="7" fill="var(--pos)" />
      <text class="num" :x="PX0 + partX * PXPM" :y="H - 60" text-anchor="middle" font-size="11" fill="var(--pos)">{{ t('wavebasics.particle') }}</text>
      <!-- crest tracker: travels at wave speed v -->
      <circle :cx="crestPx" :cy="BASE - A * AMPPX - 10" r="6" fill="var(--accent-2)" />
      <text class="num" :x="crestPx" y="H - 40" text-anchor="middle" font-size="11" fill="var(--accent-2)">{{ t('wavebasics.crest') }}</text>
      <defs>
        <marker id="wb-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L7,4 L0,7" fill="none" stroke="var(--muted)" />
        </marker>
      </defs>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
