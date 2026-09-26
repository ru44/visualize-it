<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/risk-and-diversification. params: v (single-stock volatility %), n (stock count),
// c (average correlation). w = v*sqrt(1/n + (1-1/n)c) is the portfolio's own volatility. Drawn as
// two rows of the SAME fixed set of sample outcomes (year-end return, in % around a shared 0%
// mean) — one row scaled by v, one by w — so a wide scatter visibly narrows into a tight one.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const v = computed(() => Math.max(props.params.v ?? 35, 0.1))
const n = computed(() => Math.max(Math.round(props.params.n ?? 10), 1))
const c = computed(() => Math.min(1, Math.max(props.params.c ?? 0.3, 0)))
const w = computed(() => v.value * Math.sqrt(1 / n.value + (1 - 1 / n.value) * c.value))

// A fixed set of standardised sample draws (Box-Muller, seeded), reused for both rows so the same
// "outcome" dot only moves closer to the middle as risk shrinks — it never gets re-randomised.
const zScores = (() => {
  let seed = 1337
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  const out: number[] = []
  for (let i = 0; i < 13; i++) {
    const u1 = Math.max(rand(), 1e-6)
    const u2 = rand()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    out.push(Math.max(-2.6, Math.min(2.6, z)))
  }
  return out
})()

const PLOT = { x: 60, y: 130, w: 680 }
const domain = computed(() => Math.max(v.value * 2.4, 10))
const px = (val: number) => PLOT.x + PLOT.w / 2 + (val / domain.value) * (PLOT.w / 2)

const rowSingle = { y: 170 }
const rowPortfolio = { y: 330 }
const dotsSingle = computed(() => zScores.map((z) => px(z * v.value)))
const dotsPortfolio = computed(() => zScores.map((z) => px(z * w.value)))

const ticks = computed(() => {
  const step = Math.max(10, Math.round(domain.value / 4 / 10) * 10)
  const list: number[] = []
  for (let t = -step * 4; t <= step * 4; t += step) if (Math.abs(t) <= domain.value) list.push(t)
  return list
})

const readouts = computed(() => [
  { label: 'v', value: `${fmt(v.value, 0)}%` },
  { label: 'n', value: `${n.value}` },
  { label: 'c', value: `${fmt(c.value, 2)}` },
  { label: 'w', value: `${fmt(w.value, 1)}%`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('risk.hint') }}</text>

      <!-- shared axis -->
      <line :x1="PLOT.x" :x2="PLOT.x + PLOT.w" :y1="H - 60" :y2="H - 60" stroke="var(--line)" />
      <g v-for="tk in ticks" :key="tk">
        <line :x1="px(tk)" :x2="px(tk)" :y1="H - 64" :y2="H - 56" stroke="var(--line)" />
        <text :x="px(tk)" :y="H - 40" text-anchor="middle" font-size="10" fill="var(--muted)">{{ tk > 0 ? '+' : '' }}{{ tk }}%</text>
      </g>
      <line :x1="px(0)" :x2="px(0)" :y1="90" :y2="H - 56" stroke="var(--fg)" stroke-width="1" stroke-dasharray="3 3" />

      <!-- single stock row -->
      <text :x="PLOT.x" :y="rowSingle.y - 34" font-size="12" fill="var(--muted)">{{ t('risk.singleTitle') }}</text>
      <line :x1="px(-v)" :x2="px(v)" :y1="rowSingle.y" :y2="rowSingle.y" stroke="var(--accent-2)" stroke-width="3" stroke-opacity="0.4" />
      <circle v-for="(x, i) in dotsSingle" :key="i" :cx="x" :cy="rowSingle.y" r="6" fill="var(--accent-2)" fill-opacity="0.85" />
      <text :x="PLOT.x + PLOT.w" :y="rowSingle.y + 5" text-anchor="end" font-size="12" font-weight="600" fill="var(--accent-2)">±{{ fmt(v, 0) }}%</text>

      <!-- portfolio row -->
      <text :x="PLOT.x" :y="rowPortfolio.y - 34" font-size="12" fill="var(--muted)">{{ t('risk.portfolioTitle') }} (n = {{ n }})</text>
      <line :x1="px(-w)" :x2="px(w)" :y1="rowPortfolio.y" :y2="rowPortfolio.y" stroke="var(--accent)" stroke-width="3" stroke-opacity="0.4" />
      <circle v-for="(x, i) in dotsPortfolio" :key="i" :cx="x" :cy="rowPortfolio.y" r="6" fill="var(--accent)" fill-opacity="0.85" />
      <text :x="PLOT.x + PLOT.w" :y="rowPortfolio.y + 5" text-anchor="end" font-size="12" font-weight="600" fill="var(--accent)">±{{ fmt(w, 1) }}%</text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('risk.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
