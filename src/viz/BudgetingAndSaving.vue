<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/budgeting-and-saving. params: I (income $/mo), X (spending $/mo), m (months). Drawn as
// a budget bar (income split into spent vs saved) above a growth chart of the running total across
// the months, so "a small monthly saving becomes something" is a line climbing, not just a number.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const income = computed(() => Math.max(props.params.I ?? 1200, 0.01))
const spending = computed(() => Math.min(Math.max(props.params.X ?? 900, 0), income.value * 3))
const months = computed(() => Math.max(Math.round(props.params.m ?? 12), 1))
const saving = computed(() => income.value - spending.value)
const total = computed(() => saving.value * months.value)

// -- budget bar: income split into spent (left) and saved (right) --------------------------------
const BAR = { x: 60, y: 70, w: 680, h: 56 }
const spentFrac = computed(() => Math.min(1, Math.max(0, spending.value / income.value)))
const spentW = computed(() => BAR.w * spentFrac.value)
const saveW = computed(() => BAR.w - spentW.value)

// -- growth chart: running total saved from month 0 to month m, auto-scaled to fit ----------------
const PLOT = { x: 60, y: 200, w: 680, h: 220 }
const yMax = computed(() => Math.max(Math.abs(total.value), 1) * 1.15 * Math.sign(total.value || 1))
const yFloor = computed(() => Math.min(0, yMax.value))
const yTop = computed(() => Math.max(0, yMax.value))
const yScale = computed(() => (v: number) => PLOT.y + PLOT.h - ((v - yFloor.value) / (yTop.value - yFloor.value || 1)) * PLOT.h)
const xScale = computed(() => (m: number) => PLOT.x + (m / months.value) * PLOT.w)
const linePoints = computed(() => {
  const n = Math.min(months.value, 60)
  return Array.from({ length: n + 1 }, (_, i) => {
    const m = (i / n) * months.value
    return `${xScale.value(m)},${yScale.value(saving.value * m)}`
  }).join(' ')
})
const areaPoints = computed(() => `${PLOT.x},${yScale.value(0)} ${linePoints.value} ${PLOT.x + PLOT.w},${yScale.value(0)}`)
const zeroY = computed(() => yScale.value(0))

const readouts = computed(() => [
  { label: 'I', value: `$${fmt(income.value, 0)}/mo` },
  { label: 'X', value: `$${fmt(spending.value, 0)}/mo` },
  { label: 'S', value: `$${fmt(saving.value, 0)}/mo`, color: saving.value >= 0 ? 'var(--accent-2)' : 'var(--danger, #d33)' },
  { label: 'm', value: `${months.value} mo` },
  { label: 'T', value: `$${fmt(total.value, 0)}`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('budget.hint') }}</text>

      <!-- budget bar -->
      <text :x="BAR.x" :y="BAR.y - 12" font-size="12" fill="var(--muted)">{{ t('budget.barTitle') }}</text>
      <rect :x="BAR.x" :y="BAR.y" :width="BAR.w" :height="BAR.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="BAR.x" :y="BAR.y" :width="spentW" :height="BAR.h" rx="8" fill="var(--accent-2)" fill-opacity="0.55" />
      <rect :x="BAR.x + spentW" :y="BAR.y" :width="saveW" :height="BAR.h" fill="var(--accent)" fill-opacity="0.85" />
      <text :x="BAR.x + spentW / 2" :y="BAR.y + BAR.h / 2 + 4" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('budget.spentLabel') }}</text>
      <text v-if="saveW > 60" :x="BAR.x + spentW + saveW / 2" :y="BAR.y + BAR.h / 2 + 4" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('budget.savedLabel') }}</text>

      <!-- growth chart -->
      <text :x="PLOT.x" :y="PLOT.y - 12" font-size="12" fill="var(--muted)">{{ t('budget.chartTitle') }}</text>
      <line :x1="PLOT.x" :x2="PLOT.x" :y1="PLOT.y" :y2="PLOT.y + PLOT.h" stroke="var(--line)" />
      <line :x1="PLOT.x" :x2="PLOT.x + PLOT.w" :y1="zeroY" :y2="zeroY" stroke="var(--line)" />
      <polygon :points="areaPoints" fill="var(--accent)" fill-opacity="0.18" />
      <polyline :points="linePoints" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="PLOT.x + PLOT.w" :cy="yScale(total)" r="5" fill="var(--accent)" />
      <text :x="PLOT.x + PLOT.w - 6" :y="yScale(total) - 12" text-anchor="end" font-size="13" font-weight="600" fill="var(--accent)">${{ fmt(total, 0) }}</text>
      <text :x="PLOT.x" :y="PLOT.y + PLOT.h + 22" font-size="11" fill="var(--muted)">0 {{ t('budget.monthsUnit') }}</text>
      <text :x="PLOT.x + PLOT.w" :y="PLOT.y + PLOT.h + 22" text-anchor="end" font-size="11" fill="var(--muted)">{{ months }} {{ t('budget.monthsUnit') }}</text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('budget.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
