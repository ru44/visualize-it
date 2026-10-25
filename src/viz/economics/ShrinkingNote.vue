<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// economics/inflation. params p (yearly inflation %), x (years). A 100-note shrinks to its real
// purchasing power V = 100/(1+p/100)^x while the same basket's price tag climbs — ten loaves show
// what the note still buys.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const p = computed(() => Math.max(props.params.p ?? 3, 0))
const years = computed(() => Math.max(props.params.x ?? 20, 0))
const V = computed(() => 100 / (1 + p.value / 100) ** years.value)
const index = computed(() => 100 * (1 + p.value / 100) ** years.value)
const halve = computed(() => (p.value > 0 ? 72 / p.value : Infinity))
const scale = computed(() => Math.sqrt(V.value / 100))

const NOTE = { x: 110, y: 120, w: 240, h: 110 }
const loaves = computed(() => Array.from({ length: 10 }, (_, i) => ({ on: (i + 1) * 10 <= V.value + 5 ? 1 : 0.18 })))

const readouts = computed(() => [
  { label: 'p', value: `${fmt(p.value, 2)}%` },
  { label: t('inf.years'), value: fmt(years.value, 1) },
  { label: t('inf.power'), value: fmt(V.value, 1), color: 'var(--neg)' },
  { label: t('inf.index'), value: fmt(index.value, 0), color: 'var(--accent-2)' },
  { label: t('inf.halve'), value: p.value > 0 ? t('inf.halveYears', { n: fmt(halve.value, 0) }) : '—', color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('inf.hint') }}</text>
      <!-- the note: year-0 ghost and today's real size -->
      <text :x="NOTE.x + NOTE.w / 2" :y="NOTE.y - 16" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('inf.note') }}</text>
      <rect :x="NOTE.x" :y="NOTE.y" :width="NOTE.w" :height="NOTE.h" rx="10" fill="none" stroke="var(--line)" stroke-dasharray="5 4" />
      <text :x="NOTE.x + NOTE.w - 6" :y="NOTE.y + 16" text-anchor="end" font-size="9" fill="var(--muted)">{{ t('inf.yearZero') }}</text>
      <rect :x="NOTE.x + (NOTE.w * (1 - scale)) / 2" :y="NOTE.y + (NOTE.h * (1 - scale)) / 2" :width="NOTE.w * scale" :height="NOTE.h * scale" rx="8" fill="var(--pos)" opacity="0.85" />
      <text :x="NOTE.x + NOTE.w / 2" :y="NOTE.y + NOTE.h / 2 + 6" text-anchor="middle" :font-size="Math.max(13, 24 * scale)" fill="#fff" class="num">100</text>
      <text :x="NOTE.x + NOTE.w / 2" :y="NOTE.y + NOTE.h + 24" text-anchor="middle" font-size="12" fill="var(--neg)" class="num">{{ t('inf.worth', { v: fmt(V, 1) }) }}</text>
      <!-- what it still buys -->
      <text x="130" y="310" font-size="12" font-weight="600" fill="var(--fg)">{{ t('inf.buys') }}</text>
      <text v-for="(l, i) in loaves" :key="i" :x="116 + i * 32" y="348" font-size="24" :opacity="l.on">🍞</text>
      <text x="130" y="382" font-size="11" fill="var(--muted)">{{ t('inf.buysNote', { n: fmt(V / 10, 1) }) }}</text>
      <!-- the same basket's price tag -->
      <g transform="translate(520, 120)">
        <rect x="0" y="0" width="200" height="130" rx="10" fill="var(--sunken)" stroke="var(--line)" />
        <text x="100" y="28" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('inf.basket') }}</text>
        <text x="100" y="52" text-anchor="middle" font-size="18">🧺</text>
        <text x="100" y="90" text-anchor="middle" font-size="26" font-weight="700" fill="var(--accent-2)" class="num">{{ fmt(index, 0) }}</text>
        <text x="100" y="114" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('inf.wasHundred') }}</text>
      </g>
      <text x="620" y="300" text-anchor="middle" font-size="12" fill="var(--accent)">{{ p > 0 ? t('inf.rule', { p: fmt(p, 1), n: fmt(halve, 0) }) : t('inf.zero') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('inf.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
