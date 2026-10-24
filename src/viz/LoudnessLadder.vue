<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// engineering/decibels. param x = the raw power ratio P/P₀ (1 … 1,000,000). Left: the raw ratio on
// a linear bar, hopeless at a glance. Right: the same number as a ladder of equal ×10 rungs,
// L = 10·log₁₀(x) dB, with everyday sounds pinned on it.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const x = computed(() => Math.max(props.params.x ?? 1000, 1))
const L = computed(() => 10 * Math.log10(x.value))

const LAD = { x: 470, y: 60, h: 350 }
const yOf = (db: number) => LAD.y + LAD.h - (db / 60) * LAD.h
const labels = computed(() => [
  { db: 0, label: t('db.ref') },
  { db: 10, label: t('db.leaves') },
  { db: 20, label: t('db.watch') },
  { db: 30, label: t('db.whisper') },
  { db: 40, label: t('db.library') },
  { db: 50, label: t('db.rain') },
  { db: 60, label: t('db.talk') },
])

const BAR = { x: 110, y: 60, h: 350 }
const linFrac = computed(() => x.value / 1e6)

const readouts = computed(() => [
  { label: 'P/P₀', value: x.value >= 1e4 ? `×${x.value.toExponential(1)}` : `×${fmt(x.value, 0)}`, color: 'var(--accent-2)' },
  { label: 'L = 10·log₁₀(P/P₀)', value: `${fmt(L.value, 1)} dB`, color: 'var(--accent)' },
  { label: t('db.doubling'), value: '+3 dB' },
  { label: t('db.tenfold'), value: '+10 dB' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('db.hint') }}</text>
      <!-- linear bar: the raw ratio -->
      <text :x="BAR.x + 20" :y="BAR.y - 18" text-anchor="middle" font-size="12" font-weight="600" fill="var(--fg)">{{ t('db.linear') }}</text>
      <rect :x="BAR.x" :y="BAR.y" width="40" :height="BAR.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="BAR.x" :y="BAR.y + BAR.h - Math.max(linFrac * BAR.h, 1.5)" width="40" :height="Math.max(linFrac * BAR.h, 1.5)" rx="2" fill="var(--accent-2)" />
      <text :x="BAR.x + 20" :y="BAR.y + BAR.h + 22" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">0 … 1,000,000</text>
      <text :x="BAR.x + 70" :y="BAR.y + BAR.h / 2" font-size="11" fill="var(--muted)">{{ t('db.linearNote') }}</text>
      <!-- the decibel ladder -->
      <text :x="LAD.x" :y="LAD.y - 18" font-size="12" font-weight="600" fill="var(--fg)">{{ t('db.ladder') }}</text>
      <line :x1="LAD.x" :y1="LAD.y" :x2="LAD.x" :y2="LAD.y + LAD.h" stroke="var(--line)" stroke-width="3" />
      <g v-for="r in labels" :key="r.db">
        <line :x1="LAD.x - 12" :y1="yOf(r.db)" :x2="LAD.x + 12" :y2="yOf(r.db)" stroke="var(--line)" stroke-width="2" />
        <text :x="LAD.x - 20" :y="yOf(r.db) + 4" text-anchor="end" font-size="11" fill="var(--muted)" class="num">{{ r.db }} dB</text>
        <text :x="LAD.x + 20" :y="yOf(r.db) + 4" font-size="11" fill="var(--fg)">{{ r.label }}</text>
        <text :x="LAD.x + 190" :y="yOf(r.db) + 4" font-size="10" fill="var(--muted)" class="num">×{{ (10 ** (r.db / 10)).toLocaleString('en-US') }}</text>
      </g>
      <!-- your sound -->
      <g :transform="`translate(${LAD.x - 54}, ${yOf(L)})`">
        <path d="M0,-8 v16 l10,8 v-32 z" fill="var(--accent)" />
        <path d="M16,-7 a9,9 0 0 1 0,14 M21,-12 a15,15 0 0 1 0,24" fill="none" stroke="var(--accent)" stroke-width="2" />
      </g>
      <line :x1="LAD.x - 16" :y1="yOf(L)" :x2="LAD.x + 12" :y2="yOf(L)" stroke="var(--accent)" stroke-width="3" />
      <text :x="LAD.x - 70" :y="yOf(L) - 14" text-anchor="end" font-size="13" font-weight="600" fill="var(--accent)" class="num">{{ fmt(L, 1) }} dB</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('db.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
