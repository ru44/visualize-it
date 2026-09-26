<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A log-scale ruler of the universe, in light-years, from the Moon (1.3 light-seconds) to the edge of the
// observable universe (46.5 billion light-years, comoving distance). param: mag, the power of ten of the
// distance in light-years (distance = 10^mag ly). Six real landmarks are marked for scale.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const LANDMARKS = [
  { key: 'scale.moon', mag: -7.391 },
  { key: 'scale.sun', mag: -4.801 },
  { key: 'scale.proxima', mag: 0.628 },
  { key: 'scale.milkyway', mag: 4.415 },
  { key: 'scale.andromeda', mag: 6.398 },
  { key: 'scale.edge', mag: 10.667 },
] as const

const mag = computed(() => Math.max(-8, Math.min(11, props.params.mag ?? 0)))
const distanceLy = computed(() => Math.pow(10, mag.value))

const PAD = { l: 232, r: 40 }
const W = 800
const LOG_MIN = -8
const LOG_MAX = 11
const x = (m: number) => PAD.l + ((m - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (W - PAD.l - PAD.r)

const ROW_Y = [58, 130, 202, 274, 346, 418]
const BAR_H = 24

function fmtDistance(ly: number): string {
  const YEAR_S = 31557600
  const s = ly * YEAR_S
  if (s < 60) return `${s.toFixed(2)} ${t('scale.sec')}`
  if (s < 3600) return `${(s / 60).toFixed(2)} ${t('scale.min')}`
  if (s < 86400) return `${(s / 3600).toFixed(2)} ${t('scale.hour')}`
  if (ly < 1) return `${(s / 86400).toFixed(2)} ${t('scale.day')}`
  if (ly < 1e6) return `${ly < 10 ? ly.toFixed(2) : Math.round(ly)} ${t('scale.year')}`
  if (ly < 1e9) return `${(ly / 1e6).toFixed(2)} ${t('scale.myr')}`
  return `${(ly / 1e9).toFixed(2)} ${t('scale.byr')}`
}

const nearest = computed(() => LANDMARKS.reduce((best, l) => (Math.abs(l.mag - mag.value) < Math.abs(best.mag - mag.value) ? l : best), LANDMARKS[0]))

const readouts = computed(() => [
  { label: t('scale.current'), value: fmtDistance(distanceLy.value), color: 'var(--accent-2)' },
  { label: t('scale.exact'), value: `${distanceLy.value.toExponential(2)} ly` },
  { label: t('scale.nearest'), value: t(nearest.value.key) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} 480`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('scale.hint') }}</text>
      <line :x1="x(mag)" :x2="x(mag)" y1="40" y2="452" stroke="var(--accent)" stroke-width="2" />
      <g v-for="(l, i) in LANDMARKS" :key="l.key">
        <text :x="PAD.l - 12" :y="ROW_Y[i] + BAR_H / 2 + 4" text-anchor="end" font-size="12" fill="var(--fg)">{{ t(l.key) }}</text>
        <rect :x="PAD.l" :y="ROW_Y[i]" :width="Math.max(2, x(l.mag) - PAD.l)" :height="BAR_H" fill="var(--muted)" fill-opacity="0.45" />
        <circle :cx="x(l.mag)" :cy="ROW_Y[i] + BAR_H / 2" r="4" fill="var(--fg)" />
      </g>
      <circle :cx="x(mag)" cy="40" r="5" fill="var(--accent)" />
      <text :x="x(mag)" y="30" text-anchor="middle" font-size="11" fill="var(--accent)">{{ fmtDistance(distanceLy) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
