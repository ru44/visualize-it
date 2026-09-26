<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/taxes-and-brackets. params: x (income $/yr), b (bracket threshold $/yr). Rates fixed at
// 10% below b, 25% above. Drawn as an income scale split into the two taxed slices, with two gauge
// bars underneath contrasting the marginal rate (last dollar) against the average rate (whole bill).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const DOMAIN_MAX = 200000
const RATE1 = 0.1
const RATE2 = 0.25

const income = computed(() => Math.max(props.params.x ?? 45000, 0))
const threshold = computed(() => Math.max(props.params.b ?? 40000, 1))
const slice1 = computed(() => Math.min(income.value, threshold.value))
const slice2 = computed(() => Math.max(0, income.value - threshold.value))
const tax1 = computed(() => slice1.value * RATE1)
const tax2 = computed(() => slice2.value * RATE2)
const tax = computed(() => tax1.value + tax2.value)
const avgRate = computed(() => (income.value > 0 ? (tax.value / income.value) * 100 : 0))
const marginalRate = computed(() => (income.value > threshold.value ? RATE2 : RATE1) * 100)

// -- income scale --------------------------------------------------------------------------------
const SCALE = { x: 60, y: 90, w: 680, h: 60 }
const px = (v: number) => SCALE.x + (Math.min(v, DOMAIN_MAX) / DOMAIN_MAX) * SCALE.w
const slice1W = computed(() => px(slice1.value) - SCALE.x)
const slice2W = computed(() => px(income.value) - px(slice1.value))
const thresholdX = computed(() => px(threshold.value))

// -- rate gauges ----------------------------------------------------------------------------------
const GAUGE = { x: 60, y: 260, w: 680, h: 40, gap: 70, max: 30 }
const marginalW = computed(() => (marginalRate.value / GAUGE.max) * GAUGE.w)
const avgW = computed(() => (avgRate.value / GAUGE.max) * GAUGE.w)

const readouts = computed(() => [
  { label: 'x', value: `${fmt(income.value, 0)} ${t('tax.currency')}` },
  { label: 'b', value: `${fmt(threshold.value, 0)} ${t('tax.currency')}` },
  { label: 'T', value: `${fmt(tax.value, 0)} ${t('tax.currency')}`, color: 'var(--accent)' },
  { label: t('tax.marginalShort'), value: `${fmt(marginalRate.value, 0)}%`, color: 'var(--accent-2)' },
  { label: t('tax.averageShort'), value: `${fmt(avgRate.value, 1)}%`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('tax.hint') }}</text>

      <!-- income scale -->
      <text :x="SCALE.x" :y="SCALE.y - 14" font-size="12" fill="var(--muted)">{{ t('tax.scaleTitle') }}</text>
      <rect :x="SCALE.x" :y="SCALE.y" :width="SCALE.w" :height="SCALE.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="SCALE.x" :y="SCALE.y" :width="slice1W" :height="SCALE.h" rx="8" fill="var(--accent-2)" fill-opacity="0.7" />
      <rect :x="px(slice1)" :y="SCALE.y" :width="slice2W" :height="SCALE.h" fill="var(--accent)" fill-opacity="0.85" />
      <line :x1="thresholdX" :x2="thresholdX" :y1="SCALE.y - 8" :y2="SCALE.y + SCALE.h + 8" stroke="var(--fg)" stroke-width="2" stroke-dasharray="4 3" />
      <text :x="thresholdX" :y="SCALE.y + SCALE.h + 24" text-anchor="middle" font-size="11" fill="var(--muted)">b = {{ fmt(threshold, 0) }} {{ t('tax.currency') }}</text>
      <text v-if="slice1W > 70" :x="SCALE.x + slice1W / 2" :y="SCALE.y + SCALE.h / 2 + 4" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">10%</text>
      <text v-if="slice2W > 50" :x="px(slice1) + slice2W / 2" :y="SCALE.y + SCALE.h / 2 + 4" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">25%</text>

      <!-- rate gauges -->
      <text :x="GAUGE.x" :y="GAUGE.y - 16" font-size="12" fill="var(--muted)">{{ t('tax.gaugeTitle') }}</text>

      <text :x="GAUGE.x" :y="GAUGE.y + 14" font-size="12" fill="var(--fg)">{{ t('tax.marginalLabel') }}</text>
      <rect :x="GAUGE.x" :y="GAUGE.y + 22" :width="GAUGE.w" height="16" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="GAUGE.x" :y="GAUGE.y + 22" :width="marginalW" height="16" rx="8" fill="var(--accent-2)" />
      <text :x="GAUGE.x + GAUGE.w + 8" :y="GAUGE.y + 35" font-size="13" font-weight="600" fill="var(--accent-2)">{{ fmt(marginalRate, 0) }}%</text>

      <text :x="GAUGE.x" :y="GAUGE.y + GAUGE.gap + 14" font-size="12" fill="var(--fg)">{{ t('tax.averageLabel') }}</text>
      <rect :x="GAUGE.x" :y="GAUGE.y + GAUGE.gap + 22" :width="GAUGE.w" height="16" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="GAUGE.x" :y="GAUGE.y + GAUGE.gap + 22" :width="avgW" height="16" rx="8" fill="var(--accent)" />
      <text :x="GAUGE.x + GAUGE.w + 8" :y="GAUGE.y + GAUGE.gap + 35" font-size="13" font-weight="600" fill="var(--accent)">{{ fmt(avgRate, 1) }}%</text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('tax.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
