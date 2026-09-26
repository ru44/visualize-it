<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Elastic-then-plastic model: below the yield stress Y, strain = sigma/E (Hooke's law, fully
// reversible). Above it, stress keeps climbing but only slowly (a hardening stiffness Ep = 5% of E),
// and unloading no longer returns to zero strain — a permanent, residual stretch remains.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD_L = 70
const PAD_R = 30
const PAD_T = 52
const PAD_B = 50

const E = computed(() => Math.max(0.001, props.params.E ?? 200))
const Y = computed(() => Math.max(0.1, props.params.Y ?? 250))
const sigma = computed(() => Math.max(0, props.params.sigma ?? 100))
const Emax = computed(() => E.value * 1000) // MPa
const strainY = computed(() => Y.value / Emax.value)
const Ep = computed(() => 0.05 * Emax.value)
const plastic = computed(() => sigma.value > Y.value)
const strain = computed(() => (plastic.value ? strainY.value + (sigma.value - Y.value) / Ep.value : sigma.value / Emax.value))
const residual = computed(() => (plastic.value ? strain.value - sigma.value / Emax.value : 0))

const domainStrain = computed(() => Math.max(strain.value * 1.3, strainY.value * 2.5, 0.002))
const domainStress = computed(() => Math.max(sigma.value * 1.3, Y.value * 1.3, 50))
const sx = (e: number) => PAD_L + (e / domainStrain.value) * (W - PAD_L - PAD_R)
const sy = (s: number) => H - PAD_B - (s / domainStress.value) * (H - PAD_T - PAD_B)

const curve = computed(() => {
  const yEnd = Math.min(domainStress.value, Y.value + Ep.value * (domainStrain.value - strainY.value))
  const p1 = `M${sx(0).toFixed(1)},${sy(0).toFixed(1)}`
  const p2 = `L${sx(strainY.value).toFixed(1)},${sy(Y.value).toFixed(1)}`
  const p3 = `L${sx(domainStrain.value).toFixed(1)},${sy(yEnd).toFixed(1)}`
  return p1 + p2 + p3
})
const unloadLine = computed(() => (plastic.value ? `M${sx(strain.value).toFixed(1)},${sy(sigma.value).toFixed(1)} L${sx(residual.value).toFixed(1)},${sy(0).toFixed(1)}` : ''))
const pointColor = computed(() => (plastic.value ? 'var(--neg)' : 'var(--pos)'))

const readouts = computed(() => [
  { label: t('stress.strain'), value: fmt(strain.value * 100, 3) + ' %', color: pointColor.value },
  { label: t('stress.state'), value: plastic.value ? t('stress.plastic') : t('stress.elastic'), color: pointColor.value },
  { label: t('stress.residual'), value: fmt(residual.value * 100, 3) + ' %' },
  { label: t('stress.yieldStrain'), value: fmt(strainY.value * 100, 3) + ' %' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('stress.hint') }}</text>
      <line :x1="PAD_L" :x2="W - PAD_R" :y1="H - PAD_B" :y2="H - PAD_B" stroke="var(--line)" />
      <line :x1="PAD_L" :x2="PAD_L" :y1="PAD_T" :y2="H - PAD_B" stroke="var(--line)" />
      <line :x1="sx(strainY)" :x2="sx(strainY)" :y1="PAD_T" :y2="H - PAD_B" stroke="var(--grid)" stroke-dasharray="3 4" />
      <text class="num" :x="sx(strainY)" :y="H - PAD_B + 16" text-anchor="middle" font-size="10" fill="var(--muted)">ε_Y</text>

      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <path v-if="plastic" :d="unloadLine" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 4" />
      <circle :cx="sx(strain)" :cy="sy(sigma)" r="7" :fill="pointColor" />

      <text class="num" x="16" :y="H - 14" font-size="11" fill="var(--muted)">{{ t('stress.xlabel') }}</text>
      <text class="num" x="16" :y="PAD_T - 12" font-size="11" fill="var(--muted)">{{ t('stress.ylabel') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
