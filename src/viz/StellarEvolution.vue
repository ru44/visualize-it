<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t, type Key } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A star's mass sets its whole life story. params: mass (solar masses, M☉), age (fraction of the star's own
// main-sequence lifetime, 0..1.15 so the slider can scrub past the main sequence into the star's ending).
// Formulas (shared with StellarEvolution3D.vue so both views always agree):
//   L = M^3.5 (mass-luminosity relation), t_MS = 10 M^-2.5 Gyr, T_eff = 5772 M^0.475 K, R_main = M^0.8 R☉.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const mass = computed(() => Math.max(0.1, props.params.mass ?? 1))
const age = computed(() => Math.max(0, Math.min(1.15, props.params.age ?? 0.5)))

type Fate = 'dwarf' | 'sunlike' | 'massive' | 'hyper'
const fate = (M: number): Fate => (M < 0.5 ? 'dwarf' : M < 8 ? 'sunlike' : M < 20 ? 'massive' : 'hyper')
const lerp = (a: number, b: number, f: number) => a + (b - a) * Math.max(0, Math.min(1, f))

function starState(M: number, A: number) {
  const f = fate(M)
  const L = Math.pow(M, 3.5)
  const tGyr = 10 * Math.pow(M, -2.5)
  const Tms = 5772 * Math.pow(M, 0.475)
  const Rmain = Math.pow(M, 0.8)
  if (f === 'dwarf') return { R: Rmain, T: Tms, stage: 'main' as const, supernova: false, L, tGyr, fate: f }
  const Rpeak = f === 'sunlike' ? 150 * Math.pow(M, 0.3) : 400 * Math.pow(M / 10, 0.5)
  const Rremnant = f === 'sunlike' ? 0.011 : f === 'massive' ? 0.0000172 : Math.max(0.000004, 4.24e-6 * M)
  if (A < 1) return { R: Rmain, T: Tms, stage: 'main' as const, supernova: false, L, tGyr, fate: f }
  if (A < 1.08) return { R: lerp(Rmain, Rpeak, (A - 1) / 0.08), T: lerp(Tms, 3500, (A - 1) / 0.08), stage: 'expanding' as const, supernova: false, L, tGyr, fate: f }
  if (A < 1.12) return { R: Rpeak, T: 3500, stage: f === 'sunlike' ? ('giant' as const) : ('supergiant' as const), supernova: false, L, tGyr, fate: f }
  const cf = (A - 1.12) / 0.03
  const stage = f === 'sunlike' ? ('white-dwarf' as const) : f === 'massive' ? ('neutron-star' as const) : ('black-hole' as const)
  const T = f === 'sunlike' ? lerp(3500, 25000, cf) : f === 'massive' ? 12000 : 0
  return { R: lerp(Rpeak, Rremnant, cf), T, stage, supernova: f !== 'sunlike' && cf < 0.4, L, tGyr, fate: f }
}

const state = computed(() => starState(mass.value, age.value))

function starColor(T: number): string {
  if (T <= 0) return '#111827'
  if (T < 3700) return '#ff5a3c'
  if (T < 5200) return '#ff9a4d'
  if (T < 6000) return '#ffe08a'
  if (T < 7500) return '#ffffff'
  if (T < 10000) return '#cddcff'
  return '#9fb8ff'
}

const rpx = (R: number) => 14 + 40 * Math.log10(1 + R)
const CX = 200
const CY = 190

const STAGE_KEY: Record<string, Key> = {
  main: 'stlife.stageMain',
  expanding: 'stlife.stageExpanding',
  giant: 'stlife.stageGiant',
  supergiant: 'stlife.stageSupergiant',
  'white-dwarf': 'stlife.stageWD',
  'neutron-star': 'stlife.stageNS',
  'black-hole': 'stlife.stageBH',
}

function fmtYears(y: number): string {
  if (y < 1e6) return `${fmt(y / 1e3, 1)} ${t('stlife.kyr')}`
  if (y < 1e9) return `${fmt(y / 1e6, 2)} ${t('stlife.myr')}`
  if (y < 1e12) return `${fmt(y / 1e9, 2)} ${t('stlife.gyr')}`
  return `${fmt(y / 1e12, 2)} ${t('stlife.tyr')}`
}

const LOG_MIN = 5.5
const LOG_MAX = 12.7
const AX_L = 420
const AX_R = 780
const tx = (years: number) => AX_L + ((Math.log10(Math.max(years, 1)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (AX_R - AX_L)
const lifeYears = computed(() => state.value.tGyr * 1e9)
const nowYears = computed(() => age.value * lifeYears.value)

const readouts = computed(() => [
  { label: t('stlife.stage'), value: t(STAGE_KEY[state.value.stage]), color: 'var(--accent-2)' },
  { label: t('stlife.radius'), value: `${fmt(state.value.R, state.value.R < 0.01 ? 6 : state.value.R < 1 ? 3 : 1)} R☉` },
  { label: t('stlife.lifetime'), value: fmtYears(lifeYears.value) },
  { label: t('stlife.age'), value: fmtYears(nowYears.value), color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 800 480`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('stlife.hint') }}</text>
      <circle
        v-if="state.supernova"
        :cx="CX"
        :cy="CY"
        :r="rpx(state.R) + 30"
        fill="none"
        stroke="var(--pos)"
        stroke-width="3"
        opacity="0.7"
      />
      <circle :cx="CX" :cy="CY" :r="Math.max(3, rpx(state.R))" :fill="starColor(state.T)" :stroke="state.stage === 'black-hole' ? 'var(--muted)' : 'none'" stroke-width="1.5" />
      <text :x="CX" y="330" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t(STAGE_KEY[state.stage]) }}</text>
      <text v-if="state.supernova" :x="CX" :y="60" text-anchor="middle" font-size="13" fill="var(--pos)">{{ t('stlife.supernova') }}</text>

      <line :x1="AX_L" :x2="AX_R" y1="430" y2="430" stroke="var(--muted)" />
      <text class="num" :x="AX_L" y="446" font-size="10" fill="var(--muted)">{{ t('stlife.birth') }}</text>
      <line :x1="tx(lifeYears)" :x2="tx(lifeYears)" y1="410" y2="450" stroke="var(--muted)" stroke-dasharray="3 3" />
      <text class="num" :x="tx(lifeYears)" y="446" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('stlife.msEnd') }}</text>
      <line :x1="tx(nowYears)" :x2="tx(nowYears)" y1="404" y2="430" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="tx(nowYears)" cy="404" r="4" fill="var(--accent)" />
      <text class="num" x="600" y="396" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('stlife.timeline') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
