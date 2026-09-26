<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/exchange-rates. params: p (import price, USD), e (EGP per USD), m (EGP to convert).
// Drawn as a rate dial in the middle (weaker currency = dial climbs), with two panels reacting to
// it on either side: the import's pound cost on the left, the converted dollars on the right.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const RATE_MIN = 15
const RATE_MAX = 60

const price = computed(() => Math.max(props.params.p ?? 300, 0))
const rate = computed(() => Math.min(RATE_MAX, Math.max(props.params.e ?? 30, RATE_MIN)))
const pounds = computed(() => Math.max(props.params.m ?? 5000, 0))
const cost = computed(() => price.value * rate.value)
const foreign = computed(() => pounds.value / rate.value)

// -- rate dial (horizontal): weaker currency (higher e) toward the right --------------------------
const DIAL = { x: 220, y: 70, w: 360, h: 22 }
const rateFrac = computed(() => (rate.value - RATE_MIN) / (RATE_MAX - RATE_MIN))
const dialX = computed(() => DIAL.x + rateFrac.value * DIAL.w)

// -- cost panel (left): bar fills as pound cost rises, capped for display at 40000 -----------------
const COST = { x: 60, y: 150, w: 160, h: 220, max: 40000 }
const costFill = computed(() => Math.min(1, cost.value / COST.max) * COST.h)

// -- foreign panel (right): bar fills as dollars obtained rises, capped at 300 --------------------
const FX = { x: 580, y: 150, w: 160, h: 220, max: 300 }
const fxFill = computed(() => Math.min(1, foreign.value / FX.max) * FX.h)

const readouts = computed(() => [
  { label: 'p', value: `$${fmt(price.value, 0)}` },
  { label: 'e', value: `${fmt(rate.value, 1)} EGP/$` },
  { label: 'm', value: `${fmt(pounds.value, 0)} EGP` },
  { label: 'c', value: `${fmt(cost.value, 0)} EGP`, color: 'var(--accent-2)' },
  { label: 'f', value: `$${fmt(foreign.value, 1)}`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('fx.hint') }}</text>

      <!-- rate dial -->
      <text :x="DIAL.x + DIAL.w / 2" :y="DIAL.y - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('fx.dialTitle') }}</text>
      <rect :x="DIAL.x" :y="DIAL.y" :width="DIAL.w" :height="DIAL.h" rx="11" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="DIAL.x" :y="DIAL.y" :width="dialX - DIAL.x" :height="DIAL.h" rx="11" fill="var(--accent)" fill-opacity="0.7" />
      <circle :cx="dialX" :cy="DIAL.y + DIAL.h / 2" r="9" fill="var(--accent)" stroke="var(--panel)" stroke-width="2" />
      <text :x="DIAL.x" :y="DIAL.y + DIAL.h + 18" font-size="11" fill="var(--muted)">{{ t('fx.strong') }}</text>
      <text :x="DIAL.x + DIAL.w" :y="DIAL.y + DIAL.h + 18" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('fx.weak') }}</text>
      <text :x="DIAL.x + DIAL.w / 2" :y="DIAL.y + DIAL.h + 40" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ fmt(rate, 1) }} EGP / $1</text>

      <!-- cost panel -->
      <text :x="COST.x + COST.w / 2" :y="COST.y - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('fx.costTitle') }}</text>
      <rect :x="COST.x" :y="COST.y" :width="COST.w" :height="COST.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="COST.x" :y="COST.y + COST.h - costFill" :width="COST.w" :height="costFill" fill="var(--accent-2)" />
      <text :x="COST.x + COST.w / 2" :y="COST.y + COST.h + 26" text-anchor="middle" font-size="15" font-weight="600" fill="var(--accent-2)">{{ fmt(cost, 0) }} EGP</text>
      <text :x="COST.x + COST.w / 2" :y="COST.y + COST.h + 44" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fx.costCaption') }}</text>

      <!-- foreign panel -->
      <text :x="FX.x + FX.w / 2" :y="FX.y - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('fx.fxTitle') }}</text>
      <rect :x="FX.x" :y="FX.y" :width="FX.w" :height="FX.h" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="FX.x" :y="FX.y + FX.h - fxFill" :width="FX.w" :height="fxFill" fill="var(--accent)" />
      <text :x="FX.x + FX.w / 2" :y="FX.y + FX.h + 26" text-anchor="middle" font-size="15" font-weight="600" fill="var(--accent)">${{ fmt(foreign, 1) }}</text>
      <text :x="FX.x + FX.w / 2" :y="FX.y + FX.h + 44" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('fx.fxCaption') }}</text>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('fx.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
