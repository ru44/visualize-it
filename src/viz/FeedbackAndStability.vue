<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A thermostat that only sees a reading from d steps ago: Tn = Tn-1 + g*(r - Tn-1-d). With no lag
// this settles smoothly for g<1, oscillates but still settles for 1<g<2, and runs away for g>2;
// delay lowers the safe gain further, roughly to g < 2/(d+1).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD_L = 50
const PAD_R = 20
const PAD_T = 24
const PAD_B = 34
const STEPS = 30

const g = computed(() => Math.max(0, props.params.g ?? 0.5))
const d = computed(() => Math.max(0, Math.round(props.params.d ?? 1)))
const r = computed(() => props.params.r ?? 22)
const T0 = computed(() => props.params.T0 ?? 15)

const series = computed(() => {
  const T: number[] = [T0.value]
  for (let n = 1; n <= STEPS; n++) {
    const idx = n - 1 - d.value
    const past = idx >= 0 ? T[idx] : T0.value
    const next = Math.max(-40, Math.min(140, T[n - 1] + g.value * (r.value - past)))
    T.push(next)
  }
  return T
})
const threshold = computed(() => 2 / (d.value + 1))
const unstable = computed(() => {
  const devs = series.value.map((v) => Math.abs(v - r.value))
  const early = Math.max(...devs.slice(4, 14))
  const late = Math.max(...devs.slice(20, STEPS + 1))
  return late > early * 1.08 && late > 0.3
})
const color = computed(() => (unstable.value ? 'var(--neg)' : 'var(--pos)'))

const yMin = computed(() => Math.min(T0.value, r.value, ...series.value) - 3)
const yMax = computed(() => Math.max(T0.value, r.value, ...series.value) + 3)
const sx = (n: number) => PAD_L + (n / STEPS) * (W - PAD_L - PAD_R)
const sy = (v: number) => H - PAD_B - ((v - yMin.value) / (yMax.value - yMin.value)) * (H - PAD_T - PAD_B)

const path = computed(() => series.value.map((v, n) => `${n ? 'L' : 'M'}${sx(n).toFixed(1)},${sy(v).toFixed(1)}`).join(''))

const readouts = computed(() => [
  { label: t('feedback.threshold'), value: '< ' + fmt(threshold.value, 2), color: 'var(--accent)' },
  { label: t('feedback.verdict'), value: unstable.value ? t('feedback.unstable') : t('feedback.stable'), color: color.value },
  { label: t('feedback.final'), value: fmt(series.value[STEPS], 1) + ' °C' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="16" font-size="12" fill="var(--muted)">{{ t('feedback.hint') }}</text>
      <line :x1="PAD_L" :x2="W - PAD_R" :y1="sy(r)" :y2="sy(r)" stroke="var(--muted)" stroke-dasharray="4 4" />
      <text class="num" :x="W - PAD_R" :y="sy(r) - 6" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('feedback.target') }} {{ fmt(r, 0) }}°C</text>
      <line :x1="PAD_L" :x2="PAD_L" :y1="PAD_T" :y2="H - PAD_B" stroke="var(--line)" />
      <line :x1="PAD_L" :x2="W - PAD_R" :y1="H - PAD_B" :y2="H - PAD_B" stroke="var(--line)" />
      <path :d="path" fill="none" :stroke="color" stroke-width="2.5" />
      <g v-for="(v, n) in series" :key="n">
        <circle :cx="sx(n)" :cy="sy(v)" r="3" :fill="color" />
      </g>
      <text class="num" x="16" :y="H - 10" font-size="11" fill="var(--muted)">{{ t('feedback.xlabel') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
