<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A thermometer and a number line, both scaled -80..80, showing T1, the change dT, and T2 = T1+dT.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const LO = -80
const HI = 80

const T1 = computed(() => props.params.T1 ?? 5)
const dT = computed(() => props.params.dT ?? -12)
const T2 = computed(() => T1.value + dT.value)

// ---- thermometer (vertical), x around 120
const tTop = 60
const tBot = 380
const tPy = (tBot - tTop) / (HI - LO)
const ty = (v: number) => tBot - (v - LO) * tPy
const tColor = computed(() => (T2.value >= 0 ? 'var(--neg)' : 'var(--accent)'))

// ---- number line (horizontal), y = 440
const lx0 = 90
const lx1 = 740
const lPx = (lx1 - lx0) / (HI - LO)
const lx = (v: number) => lx0 + (v - LO) * lPx
const lineY = 420

const ticks = computed(() => Array.from({ length: (HI - LO) / 20 + 1 }, (_, i) => LO + i * 20))

const readouts = computed(() => [
  { label: t('negnum.start'), value: `${T1.value >= 0 ? '+' : ''}${fmt(T1.value, 0)}°`, color: 'var(--muted)' },
  { label: t('negnum.change'), value: `${dT.value >= 0 ? '+' : ''}${fmt(dT.value, 0)}°`, color: dT.value >= 0 ? 'var(--neg)' : 'var(--accent)' },
  { label: t('negnum.end'), value: `${T2.value >= 0 ? '+' : ''}${fmt(T2.value, 0)}°`, color: tColor.value },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('negnum.hint') }}</text>

      <!-- thermometer -->
      <line :x1="120" :x2="120" :y1="tTop" :y2="tBot" stroke="var(--line)" stroke-width="18" stroke-linecap="round" />
      <rect :x="112" :y="Math.min(ty(0), ty(T2))" width="16" :height="Math.max(2, Math.abs(ty(0) - ty(T2)))" :fill="tColor" rx="6" />
      <circle cx="120" :cy="ty(T2)" r="11" :fill="tColor" stroke="var(--panel)" stroke-width="2" />
      <line x1="80" x2="160" :y1="ty(0)" :y2="ty(0)" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3" />
      <text x="165" :y="ty(0) + 4" font-size="12" fill="var(--muted)">{{ t('negnum.freezing') }}</text>
      <text x="120" y="48" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('negnum.thermometer') }}</text>

      <!-- number line -->
      <text :x="(lx0 + lx1) / 2" y="330" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('negnum.numberline') }}</text>
      <line :x1="lx0" :x2="lx1" :y1="lineY" :y2="lineY" stroke="var(--line)" stroke-width="2" />
      <g v-for="v in ticks" :key="v">
        <line :x1="lx(v)" :x2="lx(v)" :y1="lineY - 8" :y2="lineY + 8" :stroke="v === 0 ? 'var(--fg)' : 'var(--muted)'" :stroke-width="v === 0 ? 2.5 : 1.5" />
        <text :x="lx(v)" :y="lineY + 26" text-anchor="middle" font-size="11" fill="var(--muted)">{{ v }}</text>
      </g>
      <line :x1="lx(T1)" :x2="lx(T2)" :y1="lineY - 30" :y2="lineY - 30" :stroke="tColor" stroke-width="3" marker-end="url(#neg-arrow)" />
      <defs>
        <marker id="neg-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" :fill="tColor" />
        </marker>
      </defs>
      <circle :cx="lx(T1)" :cy="lineY - 30" r="7" fill="var(--muted)" stroke="var(--panel)" stroke-width="1.5" />
      <text :x="lx(T1)" :y="lineY - 42" text-anchor="middle" font-size="12" fill="var(--muted)">T1={{ fmt(T1, 0) }}</text>
      <circle :cx="lx(T2)" :cy="lineY - 30" r="9" :fill="tColor" stroke="var(--panel)" stroke-width="2" />
      <text :x="lx(T2)" :y="lineY - 46" text-anchor="middle" font-size="14" :fill="tColor">T2={{ fmt(T2, 0) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
