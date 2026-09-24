<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'
import { STABLE_N, meanStableN, classify, symbolFor, bindingEnergyPerNucleon } from './nuclideData'

// The N-vs-Z chart of nuclides. Every dot at a known-stable (Z, N) forms the "valley of stability",
// a band that bends above the N=Z line as protons pile up their mutual Coulomb repulsion and need
// extra neutrons to dilute it. The chosen nuclide is coloured by which side of the band it falls on:
// too many neutrons decays by β⁻ (a neutron turns into a proton), too few by β⁺/electron capture.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const ZMAX = 30
const NMAX = 45
const Z = computed(() => Math.round(Math.min(ZMAX, Math.max(1, props.params.Z ?? 26))))
const N = computed(() => Math.round(Math.min(NMAX, Math.max(0, props.params.N ?? 30))))
const A = computed(() => Z.value + N.value)
const mode = computed(() => classify(Z.value, N.value))
const bpa = computed(() => bindingEnergyPerNucleon(Z.value, N.value))

const W = 800
const H = 480
const PAD = { l: 56, r: 20, t: 24, b: 44 }
const sx = (z: number) => PAD.l + (z / ZMAX) * (W - PAD.l - PAD.r)
const sy = (n: number) => H - PAD.b - (n / NMAX) * (H - PAD.t - PAD.b)

const stableDots = computed(() => {
  const out: { x: number; y: number }[] = []
  for (const [zStr, ns] of Object.entries(STABLE_N)) for (const n of ns) out.push({ x: sx(+zStr), y: sy(n) })
  return out
})
const bandPath = computed(() => {
  let d = ''
  for (let z = 1; z <= ZMAX; z++) {
    const mean = meanStableN(z)
    if (mean === undefined) continue
    d += `${d ? 'L' : 'M'}${sx(z).toFixed(1)},${sy(mean).toFixed(1)}`
  }
  return d
})
const nzLine = computed(() => `M${sx(0)},${sy(0)} L${sx(ZMAX)},${sy(ZMAX)}`)

const modeColor = computed(() => (mode.value === 'stable' ? 'var(--pos)' : mode.value === 'n-rich' ? 'var(--accent)' : 'var(--accent-2)'))
const modeLabel = computed(() => t(mode.value === 'stable' ? 'chart.stable' : mode.value === 'n-rich' ? 'chart.nRich' : 'chart.pRich'))

const readouts = computed(() => [
  { label: t('chart.protons'), value: fmt(Z.value) },
  { label: t('chart.neutrons'), value: fmt(N.value) },
  { label: t('chart.mass'), value: fmt(A.value) },
  { label: t('chart.mode'), value: modeLabel.value, color: modeColor.value },
  { label: t('chart.bpa'), value: `${fmt(bpa.value, 2)} MeV`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="18" font-size="12" fill="var(--muted)">{{ t('chart.hint') }}</text>

      <g class="num" font-size="10" fill="var(--muted)">
        <template v-for="z in [0, 5, 10, 15, 20, 25, 30]" :key="'z' + z">
          <line :x1="sx(z)" :x2="sx(z)" :y1="PAD.t" :y2="H - PAD.b" stroke="var(--grid)" />
          <text :x="sx(z)" :y="H - PAD.b + 16" text-anchor="middle">{{ z }}</text>
        </template>
        <template v-for="n in [0, 10, 20, 30, 40]" :key="'n' + n">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(n)" :y2="sy(n)" stroke="var(--grid)" />
          <text :x="PAD.l - 8" :y="sy(n) + 3" text-anchor="end">{{ n }}</text>
        </template>
      </g>
      <text class="num" :x="(PAD.l + W - PAD.r) / 2" :y="H - 8" font-size="11" fill="var(--muted)" text-anchor="middle">{{ t('chart.zAxis') }}</text>
      <text class="num" x="14" :y="(PAD.t + H - PAD.b) / 2" font-size="11" fill="var(--muted)" text-anchor="middle" :transform="`rotate(-90 14 ${(PAD.t + H - PAD.b) / 2})`">{{ t('chart.nAxis') }}</text>

      <path :d="nzLine" stroke="var(--line)" stroke-dasharray="4 4" fill="none" />
      <path :d="bandPath" stroke="var(--pos)" stroke-width="6" stroke-opacity="0.18" fill="none" stroke-linecap="round" />
      <circle v-for="(d, i) in stableDots" :key="i" :cx="d.x" :cy="d.y" r="2.6" fill="var(--pos)" />

      <circle :cx="sx(Z)" :cy="sy(N)" r="8" :fill="modeColor" stroke="var(--panel)" stroke-width="2" />
      <text class="num" :x="sx(Z) + 12" :y="sy(N) - 10" font-size="13" :fill="modeColor">{{ symbolFor(Z) }}-{{ A }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
