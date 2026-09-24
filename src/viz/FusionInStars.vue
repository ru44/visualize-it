<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A star's core temperature decides which fuel is burning: hydrogen fuses into helium first (the
// p-p chain), then, once the core has shrunk and heated further, helium fuses into carbon, then
// carbon into neon, oxygen into silicon, and finally silicon into iron. Each stage releases less
// energy per reaction than the last because binding energy per nucleon (bottom chart) flattens out
// near iron-56 — past it, fusion would cost energy instead of releasing it.
// params: temperature (core temperature, million kelvin), stage (step within the active fuel's chain).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

interface Step { label: string; mev: number | null }
interface Fuel { id: string; minT: number; nameKey: string; productA: number; productLabel: string; steps: Step[] }

const FUELS: Fuel[] = [
  { id: 'h', minT: 10, nameKey: 'star.fuel.h', productA: 4, productLabel: '⁴He', steps: [
    { label: 'p + p → d + e⁺ + ν', mev: 0.42 },
    { label: 'd + p → ³He + γ', mev: 5.49 },
    { label: '³He + ³He → ⁴He + 2p', mev: 12.86 },
  ] },
  { id: 'he', minT: 100, nameKey: 'star.fuel.he', productA: 12, productLabel: '¹²C', steps: [
    { label: '⁴He + ⁴He → ⁸Be', mev: null },
    { label: '⁸Be + ⁴He → ¹²C + γ', mev: 7.27 },
  ] },
  { id: 'c', minT: 600, nameKey: 'star.fuel.c', productA: 20, productLabel: '²⁰Ne', steps: [
    { label: '¹²C + ¹²C → ²⁰Ne + ⁴He', mev: 4.62 },
  ] },
  { id: 'o', minT: 1500, nameKey: 'star.fuel.o', productA: 28, productLabel: '²⁸Si', steps: [
    { label: '¹⁶O + ¹⁶O → ²⁸Si + ⁴He', mev: 9.59 },
  ] },
  { id: 'si', minT: 2700, nameKey: 'star.fuel.si', productA: 56, productLabel: '⁵⁶Fe', steps: [
    { label: '…chain of captures → ⁵⁶Fe', mev: null },
  ] },
]

// Standard binding-energy-per-nucleon anchors (MeV/nucleon) at real mass numbers A.
const BINDING: [number, number][] = [
  [1, 0], [2, 1.11], [3, 2.57], [4, 7.07], [6, 5.33], [7, 5.61], [9, 6.46], [12, 7.68],
  [14, 7.48], [16, 7.98], [20, 8.03], [24, 8.26], [28, 8.45], [32, 8.49], [40, 8.55],
  [48, 8.66], [56, 8.79], [64, 8.74], [80, 8.71], [88, 8.71], [108, 8.55], [120, 8.5],
  [140, 8.38], [160, 8.2], [184, 7.96], [208, 7.87], [224, 7.7], [238, 7.57],
]

const W = 800, H = 480

const temperature = computed(() => Math.max(10, Math.min(3200, props.params.temperature ?? 15)))
const stage = computed(() => Math.max(0, Math.round(props.params.stage ?? 0)))

const activeFuel = computed(() => [...FUELS].reverse().find((f) => temperature.value >= f.minT) ?? FUELS[0])
const stepIndex = computed(() => stage.value % activeFuel.value.steps.length)
const activeStep = computed(() => activeFuel.value.steps[stepIndex.value])

const CX0 = 60, CX1 = 760, CY0 = 260, CY1 = 440, EMAX = 9.3
const xA = (a: number) => CX0 + (Math.log10(Math.max(1, a)) / Math.log10(240)) * (CX1 - CX0)
const yE = (e: number) => CY1 - (e / EMAX) * (CY1 - CY0)
const bindingPath = BINDING.map(([a, e], i) => `${i ? 'L' : 'M'}${xA(a).toFixed(1)},${yE(e).toFixed(1)}`).join(' ')
const peak = BINDING.find((p) => p[0] === 56)!
const productPoint = computed(() => BINDING.find((p) => p[0] === activeFuel.value.productA) ?? peak)

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 700) {
    last = now
    emit('set', 'stage', (stage.value + 1) % activeFuel.value.steps.length)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('star.temperature'), value: `${fmt(temperature.value, 0)} MK` },
  { label: t('star.fuelLabel'), value: t(activeFuel.value.nameKey as any), color: 'var(--accent)' },
  { label: t('star.energy'), value: activeStep.value.mev != null ? `+${fmt(activeStep.value.mev, 2)} MeV` : t('star.unstable'), color: 'var(--pos)' },
  { label: t('star.bindingLabel'), value: `${fmt(productPoint.value[1], 2)} MeV/A` },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('star.hint') }}</text>

      <text x="16" y="46" font-size="13" fill="var(--fg)" font-weight="600">{{ t(activeFuel.nameKey as any) }}</text>
      <g v-for="(s, i) in activeFuel.steps" :key="i">
        <rect x="12" :y="58 + i * 32" width="740" height="26" rx="6" :fill="i === stepIndex ? 'var(--sunken)' : 'transparent'" :stroke="i === stepIndex ? 'var(--accent)' : 'var(--line)'" />
        <circle cx="28" :cy="71 + i * 32" r="5" :fill="i === stepIndex ? 'var(--accent)' : 'var(--muted)'" />
        <text x="44" :y="75 + i * 32" class="num" font-size="13" :fill="i === stepIndex ? 'var(--fg)' : 'var(--muted)'">{{ s.label }}</text>
        <text x="738" :y="75 + i * 32" text-anchor="end" class="num" font-size="12" :fill="i === stepIndex ? 'var(--pos)' : 'var(--muted)'">{{ s.mev != null ? `+${fmt(s.mev, 2)} MeV` : t('star.unstable') }}</text>
      </g>

      <line :x1="CX0" :x2="CX1" :y1="CY1" :y2="CY1" stroke="var(--muted)" />
      <line :x1="CX0" :x2="CX0" :y1="CY0" :y2="CY1" stroke="var(--muted)" />
      <text :x="CX1" :y="CY1 + 20" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('star.chartX') }}</text>
      <text :x="CX0 + 4" :y="CY0 - 6" font-size="11" fill="var(--muted)">{{ t('star.chartY') }}</text>
      <path :d="bindingPath" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <line :x1="xA(peak[0])" :x2="xA(peak[0])" :y1="CY0" :y2="CY1" stroke="var(--neg)" stroke-opacity="0.4" stroke-dasharray="4 4" />
      <text :x="xA(peak[0]) + 6" :y="CY0 + 12" font-size="11" fill="var(--neg)">{{ t('star.peakLabel') }}</text>
      <circle :cx="xA(productPoint[0])" :cy="yE(productPoint[1])" r="7" fill="var(--accent)" />
      <text :x="Math.min(xA(productPoint[0]) + 10, CX1 - 60)" :y="yE(productPoint[1]) - 10" font-size="12" fill="var(--accent)">{{ activeFuel.productLabel }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
