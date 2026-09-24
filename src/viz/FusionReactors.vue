<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A fusion reactor needs plasma hot, dense and well-confined all at once. Multiplying those three
// numbers gives the Lawson "triple product" nTτ, plotted on a log scale against a fixed ignition
// line. Every deuterium-tritium fusion event, shown in the corner, releases the same fixed 17.6 MeV
// regardless of the sliders — what the sliders change is how often that event happens.
// params: temperature (keV), density (×10^20 particles/m³), confinement (seconds).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800, H = 480
const IGNITE = 3e21
const ITER = { temperature: 15, density: 1, confinement: 3 }
const ITER_TRIPLE = ITER.density * 1e20 * ITER.temperature * ITER.confinement

const temperature = computed(() => Math.max(1, Math.min(30, props.params.temperature ?? 10)))
const density = computed(() => Math.max(0.1, Math.min(3, props.params.density ?? 1)))
const confinement = computed(() => Math.max(0.1, Math.min(10, props.params.confinement ?? 3)))
const triple = computed(() => density.value * 1e20 * temperature.value * confinement.value)
const ignited = computed(() => triple.value >= IGNITE)

const BARS = [
  { key: 'temperature', labelKey: 'reactor.temperature', min: 1, max: 30, unit: 'keV' },
  { key: 'density', labelKey: 'reactor.density', min: 0.1, max: 3, unit: '×10²⁰ m⁻³' },
  { key: 'confinement', labelKey: 'reactor.confinement', min: 0.1, max: 10, unit: 's' },
]
const values = computed<Record<string, number>>(() => ({ temperature: temperature.value, density: density.value, confinement: confinement.value }))
const barFrac = (b: (typeof BARS)[number]) => (values.value[b.key] - b.min) / (b.max - b.min)

const LOG_MIN = 17, LOG_MAX = 23, GX0 = 70, GX1 = 760
const gx = (v: number) => GX0 + ((Math.log10(Math.max(1e17, Math.min(1e23, v))) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (GX1 - GX0)
const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
const sup = (n: number) => `10${String(n).split('').map((c) => SUP[c] ?? c).join('')}`
const ticks = [18, 20, 22]

const readouts = computed(() => [
  { label: t('reactor.temperature'), value: `${fmt(temperature.value, 1)} keV` },
  { label: t('reactor.density'), value: `${fmt(density.value, 2)} ×10²⁰ m⁻³` },
  { label: t('reactor.confinement'), value: `${fmt(confinement.value, 1)} s` },
  { label: t('reactor.tripleProduct'), value: `${triple.value.toExponential(2)}`, color: ignited.value ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('reactor.hint') }}</text>

      <!-- deuterium-tritium reaction -->
      <g class="num" font-size="12">
        <circle cx="600" cy="55" r="14" fill="var(--accent)" /><text x="600" y="59" text-anchor="middle" fill="var(--panel)" font-size="11">²H</text>
        <circle cx="636" cy="55" r="14" fill="var(--accent-2)" /><text x="636" y="59" text-anchor="middle" fill="var(--panel)" font-size="11">³H</text>
        <text x="660" y="59" fill="var(--muted)">→</text>
        <circle cx="690" cy="48" r="13" fill="var(--pos)" /><text x="690" y="52" text-anchor="middle" fill="var(--panel)" font-size="10">⁴He</text>
        <circle cx="716" cy="66" r="7" fill="var(--fg)" /><text x="716" y="69" text-anchor="middle" fill="var(--panel)" font-size="8">n</text>
        <text x="600" y="84" fill="var(--pos)" font-weight="600">{{ t('reactor.energy') }}</text>
      </g>

      <!-- three mini bars -->
      <g v-for="(b, i) in BARS" :key="b.key" class="num">
        <text x="16" :y="140 + i * 30" font-size="11" fill="var(--muted)">{{ t(b.labelKey as any) }}</text>
        <rect x="170" :y="130 + i * 30" width="560" height="14" rx="7" fill="var(--sunken)" stroke="var(--line)" />
        <rect x="170" :y="130 + i * 30" :width="Math.max(2, barFrac(b) * 560)" height="14" rx="7" fill="var(--accent)" />
      </g>

      <!-- triple-product log gauge -->
      <text x="16" y="250" font-size="12" fill="var(--fg)" font-weight="600">{{ t('reactor.tripleProduct') }}</text>
      <line :x1="GX0" :x2="GX1" y1="290" y2="290" stroke="var(--muted)" />
      <g v-for="e in ticks" :key="e" class="num">
        <line :x1="gx(Math.pow(10, e))" :x2="gx(Math.pow(10, e))" y1="284" y2="296" stroke="var(--muted)" />
        <text :x="gx(Math.pow(10, e))" y="312" text-anchor="middle" font-size="10" fill="var(--muted)">{{ sup(e) }}</text>
      </g>
      <line :x1="gx(IGNITE)" :x2="gx(IGNITE)" y1="264" y2="290" stroke="var(--neg)" stroke-dasharray="4 4" />
      <text :x="gx(IGNITE)" y="256" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('reactor.ignition') }}</text>
      <circle :cx="gx(ITER_TRIPLE)" cy="290" r="5" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="gx(ITER_TRIPLE)" y="330" text-anchor="middle" font-size="10" fill="var(--accent-2)">{{ t('reactor.iter') }}</text>
      <circle :cx="gx(triple)" cy="290" r="8" :fill="ignited ? 'var(--pos)' : 'var(--accent)'" />
      <text x="746" y="238" text-anchor="end" font-size="11" font-weight="600" :fill="ignited ? 'var(--pos)' : 'var(--accent)'">{{ ignited ? t('reactor.status.ignited') : t('reactor.status.below') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
