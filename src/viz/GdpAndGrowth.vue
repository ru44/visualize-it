<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/gdp-and-growth. params: p (GDP today, $bn), g (growth %/yr), t (years elapsed). Drawn as
// the compounding curve Y(t) = p(1+g/100)^t, with a marker where it doubles for real (ln-based) next
// to a dashed marker at the rule-of-70 estimate 70/g, so the estimate's small error is visible.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const p0 = computed(() => Math.max(props.params.p ?? 500, 1))
const g = computed(() => Math.max(props.params.g ?? 3, 0.05))
const tNow = computed(() => Math.max(props.params.t ?? 20, 0))
const output = computed(() => p0.value * (1 + g.value / 100) ** tNow.value)
const exactDouble = computed(() => Math.log(2) / Math.log(1 + g.value / 100))
const ruleDouble = computed(() => 70 / g.value)

const PLOT = { x: 70, y: 60, w: 660, h: 300 }
const xMax = computed(() => Math.max(tNow.value, exactDouble.value, ruleDouble.value) * 1.15)
const yMax = computed(() => Math.max(output.value, p0.value * 2) * 1.15)
const px = (tt: number) => PLOT.x + (tt / xMax.value) * PLOT.w
const py = (v: number) => PLOT.y + PLOT.h - (v / yMax.value) * PLOT.h

const curvePoints = computed(() => {
  const n = 60
  return Array.from({ length: n + 1 }, (_, i) => {
    const tt = (i / n) * xMax.value
    return `${px(tt)},${py(p0.value * (1 + g.value / 100) ** tt)}`
  }).join(' ')
})

const doubleLevel = computed(() => py(p0.value * 2))
const exactX = computed(() => px(exactDouble.value))
const ruleX = computed(() => px(ruleDouble.value))
const nowX = computed(() => px(tNow.value))
const nowY = computed(() => py(output.value))

const readouts = computed(() => [
  { label: 'p', value: `$${fmt(p0.value, 0)}bn` },
  { label: 'g', value: `${fmt(g.value, 2)}%/yr` },
  { label: 't', value: `${fmt(tNow.value, 0)} yr` },
  { label: 'Y', value: `$${fmt(output.value, 0)}bn`, color: 'var(--accent)' },
  { label: 'd (70/g)', value: `${fmt(ruleDouble.value, 1)} yr`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('gdp.hint') }}</text>

      <!-- axes -->
      <line :x1="PLOT.x" :x2="PLOT.x" :y1="PLOT.y" :y2="PLOT.y + PLOT.h" stroke="var(--line)" />
      <line :x1="PLOT.x" :x2="PLOT.x + PLOT.w" :y1="PLOT.y + PLOT.h" :y2="PLOT.y + PLOT.h" stroke="var(--line)" />
      <text :x="PLOT.x" :y="PLOT.y + PLOT.h + 20" font-size="11" fill="var(--muted)">0</text>
      <text :x="PLOT.x + PLOT.w" :y="PLOT.y + PLOT.h + 20" text-anchor="end" font-size="11" fill="var(--muted)">{{ fmt(xMax, 0) }} {{ t('gdp.years') }}</text>

      <!-- doubling reference line -->
      <line :x1="PLOT.x" :x2="PLOT.x + PLOT.w" :y1="doubleLevel" :y2="doubleLevel" stroke="var(--line)" stroke-dasharray="3 3" />
      <text :x="PLOT.x + PLOT.w" :y="doubleLevel - 6" text-anchor="end" font-size="11" fill="var(--muted)">2p = ${{ fmt(2 * p0, 0) }}bn</text>

      <!-- growth curve -->
      <polyline :points="curvePoints" fill="none" stroke="var(--accent)" stroke-width="2.5" />

      <!-- exact doubling marker -->
      <line :x1="exactX" :x2="exactX" :y1="PLOT.y" :y2="PLOT.y + PLOT.h" stroke="var(--accent)" stroke-width="1.5" />
      <circle :cx="exactX" :cy="doubleLevel" r="5" fill="var(--accent)" />
      <text :x="exactX" :y="PLOT.y - 6" text-anchor="middle" font-size="11" font-weight="600" fill="var(--accent)">{{ t('gdp.exactLabel') }} {{ fmt(exactDouble, 1) }}</text>

      <!-- rule-of-70 estimate marker -->
      <line :x1="ruleX" :x2="ruleX" :y1="PLOT.y" :y2="PLOT.y + PLOT.h" stroke="var(--accent-2)" stroke-width="1.5" stroke-dasharray="5 4" />
      <text :x="ruleX" :y="PLOT.y + PLOT.h + 38" text-anchor="middle" font-size="11" font-weight="600" fill="var(--accent-2)">{{ t('gdp.ruleLabel') }} {{ fmt(ruleDouble, 1) }}</text>

      <!-- current point -->
      <circle :cx="nowX" :cy="nowY" r="6" fill="var(--fg)" />
      <text :x="nowX" :y="nowY - 12" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">${{ fmt(output, 0) }}bn</text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('gdp.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
