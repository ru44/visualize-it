<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Copying N bases with a per-base error rate μ makes about Nμ new mistakes each generation; after g
// generations the expected count adds up to E ≈ Nμg (valid while μg ≪ 1, i.e. differences are rare
// enough not to overlap). This is the "molecular clock" biologists use to date when two species split.
// mu is entered in millionths per base per generation, so the true rate is mu * 1e-6.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()

const W = 800
const H = 480
const N = computed(() => Math.max(1, props.params.N ?? 1000))
const mu = computed(() => Math.max(0, props.params.mu ?? 1))
const muTrue = computed(() => mu.value * 1e-6)
const g = computed(() => Math.max(0, props.params.g ?? 100))
const fracMutated = computed(() => Math.min(1, muTrue.value * g.value))
const E = computed(() => N.value * muTrue.value * g.value)

// A 60-base strip. Each box's random threshold is fixed once, so raising the mutation fraction
// lights up more boxes without the already-mutated ones flickering to a new random spot.
const N_BOXES = 60
let seed = 42
const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
const thresholds = Array.from({ length: N_BOXES }, () => rand())
const boxes = computed(() => thresholds.map((th) => th < fracMutated.value))

const stripX = 40
const stripY = 90
const boxW = 11
const boxGap = 2.2

// Accumulation line: E(x) = N·μ·x for x in [0, g], scaled to fit the panel.
const chartX = [460, 760] as const
const chartY = [60, 380] as const
const yMax = computed(() => Math.max(10, E.value * 1.2))
const px = (x: number) => chartX[0] + ((chartX[1] - chartX[0]) * x) / Math.max(1, g.value)
const py = (y: number) => chartY[1] - ((chartY[1] - chartY[0]) * y) / yMax.value
const linePoints = computed(() => `${px(0)},${py(0)} ${px(g.value)},${py(E.value)}`)

const readouts = computed(() => [
  { label: t('mut.n'), value: fmt(N.value, 0) },
  { label: t('mut.mu'), value: `${fmt(muTrue.value * 1e6, 2)}×10⁻⁶/base/gen` },
  { label: t('mut.g'), value: fmt(g.value, 0) },
  { label: t('mut.e'), value: fmt(E.value, 2), color: 'var(--accent)' },
  { label: t('mut.frac'), value: `${fmt(fracMutated.value * 100, 2)}%`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="24" y="28" font-size="13" fill="var(--muted)">{{ t('mut.hint') }}</text>

      <!-- sequence strip -->
      <text :x="stripX" :y="stripY - 14" font-size="12" fill="var(--muted)">{{ t('mut.strip') }}</text>
      <g v-for="(m, i) in boxes" :key="i">
        <rect :x="stripX + i * (boxW + boxGap)" :y="stripY" :width="boxW" height="26" rx="2" :fill="m ? 'var(--neg)' : 'var(--line)'" />
      </g>

      <!-- accumulation chart -->
      <line :x1="chartX[0]" :y1="chartY[1]" :x2="chartX[1]" :y2="chartY[1]" stroke="var(--line)" />
      <line :x1="chartX[0]" :y1="chartY[0]" :x2="chartX[0]" :y2="chartY[1]" stroke="var(--line)" />
      <text :x="(chartX[0] + chartX[1]) / 2" :y="chartY[1] + 22" font-size="12" text-anchor="middle" fill="var(--muted)">{{ t('mut.xaxis') }}</text>
      <text :x="chartX[0] - 10" :y="chartY[0] - 6" font-size="12" text-anchor="start" fill="var(--muted)">{{ t('mut.yaxis') }}</text>
      <polyline :points="linePoints" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="px(g)" :cy="py(E)" r="5" fill="var(--accent)" />

      <text x="24" :y="H - 16" font-size="11" fill="var(--muted)">{{ t('mut.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
