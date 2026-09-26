<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Horizontal bars: hours of daylight on one chosen day, compared across five real cities plus the
// learner's own latitude. Same D = 24/π·arccos(−tanφ·tanδ) as earth-space/seasons, but seasons plots
// one place across the year; this plots many places on one day, to compare across latitude instead.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const W = 800
const H = 480
const EPS = 23.4
const day = computed(() => props.params.day ?? 172)
const lat = computed(() => props.params.lat ?? 45)

function dayLength(latDeg: number, x: number): number {
  const delta = EPS * Math.sin((2 * Math.PI * (x - 80)) / 365)
  const cosH = -Math.tan((latDeg * Math.PI) / 180) * Math.tan((delta * Math.PI) / 180)
  return (24 / Math.PI) * Math.acos(Math.max(-1, Math.min(1, cosH)))
}

const CITIES = [
  { name: 'Quito', lat: 0 },
  { name: 'Cairo', lat: 30 },
  { name: 'Paris', lat: 49 },
  { name: 'Oslo', lat: 60 },
  { name: 'Utqiagvik', lat: 71 },
]
const rows = computed(() => [
  ...CITIES.map((c) => ({ label: `${c.name} (${c.lat}°)`, hours: dayLength(c.lat, day.value), you: false })),
  { label: t('daylen.you') + ` (${fmt(lat.value, 0)}°)`, hours: dayLength(lat.value, day.value), you: true },
])
const X0 = 220
const X1 = 620
const pxPerHour = (X1 - X0) / 24
const rowH = 60
const rowY = (i: number) => 60 + i * rowH

const readouts = computed(() => [
  { label: t('daylen.you'), value: fmt(lat.value, 0) + '°' },
  { label: t('daylen.hours'), value: fmt(dayLength(lat.value, day.value), 1) + ' h', color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('daylen.hint') }}</text>
      <line v-for="m in [0, 6, 12, 18, 24]" :key="m" :x1="X0 + m * pxPerHour" :x2="X0 + m * pxPerHour" y1="40" :y2="rowY(rows.length - 1) + 30" stroke="var(--grid)" />
      <text v-for="m in [0, 6, 12, 18, 24]" :key="'t' + m" :x="X0 + m * pxPerHour" y="34" text-anchor="middle" font-size="11" fill="var(--muted)">{{ m }}h</text>
      <g v-for="(r, i) in rows" :key="r.label">
        <text :x="X0 - 12" :y="rowY(i) + 5" text-anchor="end" font-size="12" :fill="r.you ? 'var(--accent)' : 'var(--fg)'">{{ r.label }}</text>
        <rect
          :x="X0"
          :y="rowY(i) - 14"
          :width="Math.max(2, r.hours * pxPerHour)"
          height="28"
          rx="4"
          :fill="r.hours >= 23.5 ? 'var(--accent-2)' : r.hours <= 0.5 ? 'var(--sunken)' : r.you ? 'var(--accent)' : 'var(--pos)'"
          :stroke="r.hours <= 0.5 ? 'var(--muted)' : 'none'"
        />
        <text :x="X0 + Math.max(2, r.hours * pxPerHour) + 8" :y="rowY(i) + 5" font-size="12" fill="var(--muted)">
          {{ fmt(r.hours, 1) }} h
          <template v-if="r.hours >= 23.5">— {{ t('daylen.midnightSun') }}</template>
          <template v-else-if="r.hours <= 0.5">— {{ t('daylen.polarNight') }}</template>
        </text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
