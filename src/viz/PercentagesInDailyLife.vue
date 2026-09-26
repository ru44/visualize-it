<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three bars: the starting price P, the price after the first percent change p1, and the price
// after the second percent change p2 — shows that a rise then an equal-sized fall does not cancel.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const baseY = 420
const top = 50

const P = computed(() => Math.max(0, props.params.P ?? 50))
const p1 = computed(() => props.params.p1 ?? 20)
const p2 = computed(() => props.params.p2 ?? 0)
const after1 = computed(() => P.value * (1 + p1.value / 100))
const after2 = computed(() => after1.value * (1 + p2.value / 100))
const maxVal = computed(() => Math.max(P.value, after1.value, after2.value, 1) * 1.15)
const scale = computed(() => (baseY - top) / maxVal.value)
const barH = (v: number) => Math.max(0, v * scale.value)

const bars = computed(() => [
  { x: 90, w: 160, v: P.value, label: t('pctlife.start'), color: 'var(--muted)' },
  { x: 340, w: 160, v: after1.value, label: t('pctlife.after1'), color: p1.value >= 0 ? 'var(--pos)' : 'var(--neg)' },
  { x: 590, w: 160, v: after2.value, label: t('pctlife.after2'), color: p2.value >= 0 ? 'var(--pos)' : 'var(--neg)' },
])
const netPct = computed(() => (after2.value / P.value - 1) * 100)

const readouts = computed(() => [
  { label: t('pctlife.start'), value: `$${fmt(P.value, 2)}`, color: 'var(--muted)' },
  { label: t('pctlife.after1'), value: `$${fmt(after1.value, 2)}`, color: p1.value >= 0 ? 'var(--pos)' : 'var(--neg)' },
  { label: t('pctlife.after2'), value: `$${fmt(after2.value, 2)}`, color: 'var(--accent-2)' },
  { label: t('pctlife.net'), value: `${netPct.value >= 0 ? '+' : ''}${fmt(netPct.value, 1)}%`, color: netPct.value >= 0 ? 'var(--pos)' : 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('pctlife.hint') }}</text>
      <line :x1="60" :x2="760" :y1="baseY" :y2="baseY" stroke="var(--line)" stroke-width="2" />

      <g v-for="(b, i) in bars" :key="i">
        <rect :x="b.x" :y="baseY - barH(b.v)" :width="b.w" :height="barH(b.v)" :fill="b.color" fill-opacity="0.85" rx="6" />
        <text :x="b.x + b.w / 2" :y="baseY - barH(b.v) - 12" text-anchor="middle" font-size="18" class="num" :fill="b.color">${{ fmt(b.v, 2) }}</text>
        <text :x="b.x + b.w / 2" :y="baseY + 24" text-anchor="middle" font-size="13" fill="var(--muted)">{{ b.label }}</text>
      </g>

      <text x="295" y="250" text-anchor="middle" font-size="14" fill="var(--fg)">→ {{ p1 >= 0 ? '+' : '' }}{{ p1 }}%</text>
      <text x="545" y="250" text-anchor="middle" font-size="14" fill="var(--fg)">→ {{ p2 >= 0 ? '+' : '' }}{{ p2 }}%</text>

      <text x="400" y="470" text-anchor="middle" font-size="13" :fill="netPct >= 0 ? 'var(--pos)' : 'var(--neg)'">
        {{ t('pctlife.overall') }}: {{ netPct >= 0 ? '+' : '' }}{{ fmt(netPct, 1) }}%
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
