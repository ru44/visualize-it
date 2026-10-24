<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// statistics/confidence-intervals. params n (sample size), z (interval half-width in standard
// errors). Thirty labs each draw their own sample from the same population (μ = 50, σ = 10) and
// publish m ± z·σ/√n. The red ones missed — and with z = 1.96 about 95 of 100 catch the truth.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const MU = 50
const SIGMA = 10
const n = computed(() => Math.max(Math.round(props.params.n ?? 25), 2))
const z = computed(() => Math.min(Math.max(props.params.z ?? 1.96, 0.5), 3.5))
const se = computed(() => SIGMA / Math.sqrt(n.value))
const margin = computed(() => z.value * se.value)

// deterministic standard normals (Box–Muller over a fixed seed) — the same 30 labs every visit
const rnd = (i: number) => {
  const v = Math.sin(i * 12.9898 + 4.1414) * 43758.5453
  return v - Math.floor(v)
}
const gauss = (i: number) => Math.sqrt(-2 * Math.log(rnd(i * 2 + 1) * 0.998 + 0.001)) * Math.cos(2 * Math.PI * rnd(i * 2 + 2))
const LABS = 30
const rows = computed(() =>
  Array.from({ length: LABS }, (_, i) => {
    const mean = MU + se.value * gauss(i)
    return { mean, hit: Math.abs(mean - MU) <= margin.value }
  }),
)
const hits = computed(() => rows.value.filter((r) => r.hit).length)
// normal CDF (Abramowitz–Stegun) for the theoretical coverage
const phi = (x: number) => {
  const t1 = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp((-x * x) / 2)
  let p = d * t1 * (0.3193815 + t1 * (-0.3565638 + t1 * (1.781478 + t1 * (-1.821256 + t1 * 1.330274))))
  if (x > 0) p = 1 - p
  return p
}
const coverage = computed(() => phi(z.value) - phi(-z.value))

const PX = { x: 110, w: 580 } // value 30 … 70 maps across
const vx = (val: number) => PX.x + ((Math.min(Math.max(val, 30), 70) - 30) / 40) * PX.w
const rowY = (i: number) => 86 + i * 11.4

const readouts = computed(() => [
  { label: 'n', value: String(n.value) },
  { label: 'z', value: fmt(z.value, 2), color: 'var(--accent-2)' },
  { label: '± z·σ/√n', value: `± ${fmt(margin.value, 2)}`, color: 'var(--accent)' },
  { label: t('ci.forest'), value: `${hits.value}/${LABS}`, color: hits.value === LABS ? 'var(--pos)' : undefined },
  { label: t('ci.theory'), value: `${fmt(coverage.value * 100, 1)}%`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('ci.hint') }}</text>
      <!-- the truth, unknown to every lab -->
      <line :x1="vx(MU)" y1="56" :x2="vx(MU)" y2="436" stroke="var(--pos)" stroke-width="2" stroke-dasharray="5 4" />
      <text :x="vx(MU)" y="46" text-anchor="middle" font-size="12" font-weight="600" fill="var(--pos)" class="num">μ = 50</text>
      <!-- thirty published intervals -->
      <g v-for="(r, i) in rows" :key="i">
        <line :x1="vx(r.mean - margin)" :y1="rowY(i)" :x2="vx(r.mean + margin)" :y2="rowY(i)" :stroke="r.hit ? 'var(--accent)' : 'var(--neg)'" :stroke-width="r.hit ? 2.5 : 3.5" stroke-linecap="round" :opacity="r.hit ? 0.85 : 1" />
        <circle :cx="vx(r.mean)" :cy="rowY(i)" r="3" :fill="r.hit ? 'var(--accent)' : 'var(--neg)'" />
      </g>
      <text x="740" y="90" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('ci.labs') }}</text>
      <text x="740" y="110" text-anchor="end" font-size="12" :fill="hits === 30 ? 'var(--pos)' : 'var(--neg)'" class="num">{{ t('ci.missed', { n: 30 - hits }) }}</text>
      <text :x="vx(30)" y="452" font-size="10" fill="var(--muted)" class="num">30</text>
      <text :x="vx(70)" y="452" text-anchor="end" font-size="10" fill="var(--muted)" class="num">70</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('ci.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
