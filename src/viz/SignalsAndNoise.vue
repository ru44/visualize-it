<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A fixed pulse (the true signal) repeats identically on every trial, buried under independent
// random noise each time. Averaging N trials leaves the signal untouched but shrinks the noise's
// standard deviation to sigma/sqrt(N), so the signal-to-noise ratio improves by sqrt(N).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD_L = 50
const PAD_R = 20
const PAD_T = 24
const PAD_B = 34
const M = 150 // samples across the window

function hash(x: number) {
  const s = Math.sin(x * 12.9898) * 43758.5453
  return s - Math.floor(s)
}
// A deterministic, reproducible pseudo-gaussian noise sample for (sample i, trial).
function noiseUnit(i: number, trial: number) {
  const h1 = Math.max(1e-6, hash(i * 97 + trial * 131.7 + 1.3))
  const h2 = hash(i * 197.3 + trial * 331.1 + 7.7)
  return Math.sqrt(-2 * Math.log(h1)) * Math.cos(2 * Math.PI * h2)
}
function signalAt(i: number, A: number) {
  const t0 = M / 2
  const w = M * 0.06
  return A * Math.exp(-(((i - t0) / w) ** 2))
}

const A = computed(() => Math.max(0.01, props.params.A ?? 2))
const sigma = computed(() => Math.max(0.01, props.params.sigma ?? 4))
const N = computed(() => Math.max(1, Math.round(props.params.N ?? 1)))
const S = computed(() => A.value / sigma.value)
const sigmaAvg = computed(() => sigma.value / Math.sqrt(N.value))
const SN = computed(() => A.value / sigmaAvg.value)

const single = computed(() => Array.from({ length: M }, (_, i) => signalAt(i, A.value) + noiseUnit(i, 0) * sigma.value))
const avg = computed(() => {
  const out = new Array(M).fill(0)
  for (let n = 0; n < N.value; n++) for (let i = 0; i < M; i++) out[i] += noiseUnit(i, n)
  return out.map((sum, i) => signalAt(i, A.value) + (sum / N.value) * sigma.value)
})
const trueSignal = computed(() => Array.from({ length: M }, (_, i) => signalAt(i, A.value)))

const yRange = computed(() => Math.max(A.value * 1.3, sigma.value * 3.2, 1))
const sx = (i: number) => PAD_L + (i / (M - 1)) * (W - PAD_L - PAD_R)
const sy = (v: number) => H / 2 - (v / yRange.value) * (H / 2 - PAD_T - PAD_B / 2)
const path = (arr: number[]) => arr.map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join('')

const readouts = computed(() => [
  { label: t('snr.single'), value: fmt(S.value, 2), color: 'var(--muted)' },
  { label: t('snr.averaged'), value: fmt(SN.value, 2), color: 'var(--accent)' },
  { label: t('snr.noiseAvg'), value: fmt(sigmaAvg.value, 2) + ' mV' },
  { label: t('snr.n'), value: fmt(N.value, 0) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="16" font-size="12" fill="var(--muted)">{{ t('snr.hint') }}</text>
      <line :x1="PAD_L" :x2="W - PAD_R" :y1="H / 2" :y2="H / 2" stroke="var(--line)" />
      <line :x1="PAD_L" :x2="PAD_L" :y1="PAD_T" :y2="H - PAD_B" stroke="var(--line)" />
      <path :d="path(trueSignal)" fill="none" stroke="var(--accent-2)" stroke-width="1.5" stroke-dasharray="5 4" />
      <path :d="path(single)" fill="none" stroke="var(--muted)" stroke-width="1.3" stroke-opacity="0.7" />
      <path :d="path(avg)" fill="none" stroke="var(--accent)" stroke-width="2.6" />
      <g class="num" font-size="11">
        <text :x="W - PAD_R" :y="PAD_T + 2" text-anchor="end" fill="var(--accent-2)">{{ t('snr.true') }}</text>
        <text :x="W - PAD_R" :y="PAD_T + 18" text-anchor="end" fill="var(--muted)">{{ t('snr.singleTrace') }}</text>
        <text :x="W - PAD_R" :y="PAD_T + 34" text-anchor="end" fill="var(--accent)">{{ t('snr.avgTrace') }}</text>
      </g>
      <text class="num" x="16" :y="H - 10" font-size="11" fill="var(--muted)">{{ t('snr.xlabel') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
