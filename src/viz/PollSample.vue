<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// statistics/sampling-and-polls. params p (true support, %), n (people polled), bias (how far the
// polling method leans, %). The poll publishes an interval of width E = 1.96·√(p(1−p)/n) around
// what it measured — honest noise shrinks with √n, but bias shifts the whole interval and no
// sample size can fix it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = computed(() => Math.min(Math.max(props.params.p ?? 52, 20), 80))
const n = computed(() => Math.max(Math.round(props.params.n ?? 1000), 10))
const bias = computed(() => Math.min(Math.max(props.params.bias ?? 0, 0), 10))
const moe = computed(() => 1.96 * Math.sqrt(((p.value / 100) * (1 - p.value / 100)) / n.value) * 100)
// one deterministic wobble inside the honest noise, so the estimate is not suspiciously exact
const wobble = computed(() => {
  const v = Math.sin(n.value * 12.9898 + p.value * 7.77) * 43758.5453
  return ((v - Math.floor(v)) * 2 - 1) * (moe.value / 3)
})
const est = computed(() => p.value + bias.value + wobble.value)
const caught = computed(() => Math.abs(est.value - p.value) <= moe.value)

// the population field: 540 dots, blue above the split, orange below
const rnd = (i: number) => {
  const v = Math.sin(i * 12.9898) * 43758.5453
  return v - Math.floor(v)
}
const dots = computed(() =>
  Array.from({ length: 540 }, (_, i) => ({
    x: 60 + (i % 30) * 15,
    y: 70 + Math.floor(i / 30) * 13,
    blue: rnd(i + 7) * 100 < p.value,
    sampled: rnd(i * 3 + 1) * 540 < (n.value / 5000) * 540 * 0.25,
  })),
)
const SCALE = { x: 90, y: 400, w: 620 } // 20 … 80 %
const sx = (v: number) => SCALE.x + ((Math.min(Math.max(v, 20), 80) - 20) / 60) * SCALE.w

const readouts = computed(() => [
  { label: t('poll.true'), value: `${fmt(p.value, 1)}%`, color: 'var(--pos)' },
  { label: t('poll.asked'), value: n.value.toLocaleString('en-US') },
  { label: 'E = 1.96·√(p(1−p)/n)', value: `± ${fmt(moe.value, 2)}`, color: 'var(--accent)' },
  { label: t('poll.poll'), value: `${fmt(est.value, 1)}%`, color: 'var(--accent-2)' },
  { label: t('poll.verdictL'), value: caught.value ? t('poll.caught') : t('poll.missed'), color: caught.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('poll.hint') }}</text>
      <!-- the country: half a thousand of the millions -->
      <text x="60" y="52" font-size="12" font-weight="600" fill="var(--fg)">{{ t('poll.country', { p: fmt(p, 0) }) }}</text>
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" :r="d.sampled ? 5 : 3" :fill="d.blue ? 'var(--accent)' : 'var(--accent-2)'" :opacity="d.sampled ? 1 : 0.35" :stroke="d.sampled ? 'var(--fg)' : 'none'" stroke-width="1" />
      <text x="740" y="52" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('poll.ringed', { n: n.toLocaleString('en-US') }) }}</text>
      <!-- the published result -->
      <line :x1="SCALE.x" :y1="SCALE.y" :x2="SCALE.x + SCALE.w" :y2="SCALE.y" stroke="var(--line)" stroke-width="2" />
      <text v-for="v in [20, 40, 60, 80]" :key="v" :x="sx(v)" :y="SCALE.y + 20" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ v }}%</text>
      <line :x1="sx(p)" :y1="SCALE.y - 52" :x2="sx(p)" :y2="SCALE.y + 6" stroke="var(--pos)" stroke-width="2" stroke-dasharray="5 4" />
      <text :x="sx(p)" :y="SCALE.y - 60" text-anchor="middle" font-size="11" fill="var(--pos)" class="num">{{ t('poll.truthMark') }}</text>
      <line :x1="sx(est - moe)" :y1="SCALE.y - 26" :x2="sx(est + moe)" :y2="SCALE.y - 26" :stroke="caught ? 'var(--accent)' : 'var(--neg)'" stroke-width="5" stroke-linecap="round" opacity="0.9" />
      <circle :cx="sx(est)" :cy="SCALE.y - 26" r="5" :fill="caught ? 'var(--accent)' : 'var(--neg)'" />
      <text :x="sx(est)" :y="SCALE.y - 38" text-anchor="middle" font-size="11" :fill="caught ? 'var(--accent)' : 'var(--neg)'" class="num">{{ fmt(est, 1) }}% ± {{ fmt(moe, 1) }}</text>
      <text v-if="bias > 0.1" x="400" y="440" text-anchor="middle" font-size="12" :fill="bias > moe ? 'var(--neg)' : 'var(--accent-2)'">{{ t('poll.biasNote', { b: fmt(bias, 1) }) }}</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('poll.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
