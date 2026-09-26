<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Light-response curve: net photosynthesis rises with light I, then plateaus once something else
// becomes the limiting factor — here CO2. Pmax(C) is the plateau height at the current CO2 level;
// K, R, P0, Cref are fixed leaf constants typical of a C3 plant (K ~ half-saturation, R ~ dark
// respiration, P0 ~ the highest possible plateau, Cref ~ the CO2 level that stops being limiting).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()

const K = 200
const R = 1
const P0 = 20
const CREF = 800

const W = 800
const H = 480
const I = computed(() => Math.max(0, props.params.I ?? 400))
const C = computed(() => Math.max(1, props.params.C ?? 420))
const Pmax = computed(() => P0 * Math.min(1, C.value / CREF))
const net = (x: number, pmax: number) => (pmax * x) / (K + x) - R
const P = computed(() => net(I.value, Pmax.value))
const compensation = computed(() => (Pmax.value > R ? (R * K) / (Pmax.value - R) : NaN))

const chartX = [70, 760] as const
const chartY = [60, 380] as const
const xMax = 2000
const yDom = [-2, 22] as const
const px = (x: number) => chartX[0] + ((chartX[1] - chartX[0]) * x) / xMax
const py = (y: number) => chartY[1] - ((chartY[1] - chartY[0]) * (y - yDom[0])) / (yDom[1] - yDom[0])
const curvePts = computed(() => Array.from({ length: 41 }, (_, i) => { const x = (xMax * i) / 40; return `${px(x)},${py(net(x, Pmax.value))}` }).join(' '))

const readouts = computed(() => [
  { label: t('ph.i'), value: `${fmt(I.value, 0)} μmol/m²/s` },
  { label: t('ph.c'), value: `${fmt(C.value, 0)} ppm` },
  { label: t('ph.p'), value: `${fmt(P.value, 2)} μmol CO₂/m²/s`, color: 'var(--accent)' },
  { label: t('ph.pmax'), value: fmt(Pmax.value, 2), color: 'var(--accent-2)' },
  { label: t('ph.comp'), value: Number.isFinite(compensation.value) && compensation.value <= xMax ? `${fmt(compensation.value, 0)} μmol/m²/s` : '—' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="24" y="28" font-size="13" fill="var(--muted)">{{ t('ph.hint') }}</text>

      <line :x1="chartX[0]" :y1="chartY[1]" :x2="chartX[1]" :y2="chartY[1]" stroke="var(--line)" />
      <line :x1="chartX[0]" :y1="chartY[0]" :x2="chartX[0]" :y2="chartY[1]" stroke="var(--line)" />
      <line :x1="chartX[0]" :y1="py(0)" :x2="chartX[1]" :y2="py(0)" stroke="var(--grid)" stroke-dasharray="3 3" />
      <line :x1="chartX[0]" :y1="py(P0)" :x2="chartX[1]" :y2="py(P0)" stroke="var(--muted)" stroke-dasharray="4 4" opacity="0.6" />
      <text :x="chartX[1]" :y="py(P0) - 6" font-size="11" text-anchor="end" fill="var(--muted)">{{ t('ph.p0line') }}</text>
      <text :x="(chartX[0] + chartX[1]) / 2" :y="chartY[1] + 24" font-size="12" text-anchor="middle" fill="var(--muted)">{{ t('ph.xaxis') }}</text>
      <text :x="chartX[0] - 10" :y="chartY[0] - 8" font-size="12" text-anchor="start" fill="var(--muted)">{{ t('ph.yaxis') }}</text>

      <polyline :points="curvePts" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="px(I)" :cy="py(P)" r="6" fill="var(--accent-2)" />

      <text x="24" :y="H - 16" font-size="11" fill="var(--muted)">{{ t('ph.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
