<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// physics/kinetic-and-potential-energy. params m, x = launch speed v. A ball fired straight up
// trades all of KE = ½mv² for height: it coasts to h = v²/(2g), where mgh equals the KE it left
// with — the two energy bars stay the same total all the way up.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const G = 9.81
const m = computed(() => Math.max(props.params.m ?? 1, 0.1))
const v = computed(() => Math.max(props.params.x ?? 6, 0))
const ke = computed(() => 0.5 * m.value * v.value * v.value)
const hMax = computed(() => (v.value * v.value) / (2 * G))
const pe = computed(() => m.value * G * hMax.value)

const GROUND = 400
const PXM = 42 // pixels per metre of height (max h = 7.34 m → 308 px)
const topY = computed(() => GROUND - hMax.value * PXM)
const rBall = computed(() => 10 + m.value * 3)

const BAR = { y: 400, h: 300, max: 360 } // energy bars, max ½·5·12² = 360 J
const keH = computed(() => (ke.value / BAR.max) * BAR.h)

const readouts = computed(() => [
  { label: 'm', value: `${fmt(m.value, 1)} kg` },
  { label: 'v', value: `${fmt(v.value, 2)} m/s`, color: 'var(--accent-2)' },
  { label: 'KE = ½mv²', value: `${fmt(ke.value, 1)} J`, color: 'var(--accent)' },
  { label: 'h = v²/2g', value: `${fmt(hMax.value, 2)} m`, color: 'var(--pos)' },
  { label: 'PE = mgh', value: `${fmt(pe.value, 1)} J`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('nrg.hint') }}</text>
      <!-- ground and height scale -->
      <line x1="60" :y1="GROUND" x2="560" :y2="GROUND" stroke="var(--line)" stroke-width="3" />
      <g v-for="hm in [0, 2, 4, 6]" :key="hm">
        <line x1="420" :y1="GROUND - hm * PXM" x2="432" :y2="GROUND - hm * PXM" stroke="var(--line)" />
        <text x="440" :y="GROUND - hm * PXM + 4" font-size="10" fill="var(--muted)" class="num">{{ hm }} m</text>
      </g>
      <!-- the launch: ball with speed arrow -->
      <circle cx="160" :cy="GROUND - rBall" :r="rBall" fill="var(--accent-2)" />
      <line v-if="v > 0.2" x1="160" :y1="GROUND - rBall * 2 - 8" x2="160" :y2="GROUND - rBall * 2 - 8 - v * 8" stroke="var(--accent-2)" stroke-width="3" />
      <path v-if="v > 0.2" :d="`M160,${GROUND - rBall * 2 - 8 - v * 8} l-6,8 h12 z`" fill="var(--accent-2)" />
      <text x="160" :y="GROUND + 24" text-anchor="middle" font-size="11" fill="var(--fg)" class="num">{{ t('nrg.launch', { v: fmt(v, 1) }) }}</text>
      <!-- the coasting arc and the ghost at the top -->
      <path :d="`M${160 + rBall},${GROUND - rBall} Q 235,${topY - 20} 310,${topY}`" fill="none" stroke="var(--muted)" stroke-dasharray="4 4" />
      <circle cx="310" :cy="topY - rBall" :r="rBall" fill="var(--pos)" opacity="0.75" />
      <line x1="310" :y1="GROUND" x2="310" :y2="topY" stroke="var(--pos)" stroke-dasharray="3 4" opacity="0.6" />
      <text x="310" :y="topY - rBall * 2 - 8" text-anchor="middle" font-size="11" fill="var(--pos)" class="num">{{ t('nrg.top', { h: fmt(hMax, 2) }) }}</text>
      <!-- the two bars: same energy, different form -->
      <g transform="translate(600, 0)">
        <rect x="0" :y="BAR.y - BAR.h" width="40" :height="BAR.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
        <rect x="0" :y="BAR.y - keH" width="40" :height="keH" rx="4" fill="var(--accent)" />
        <text x="20" :y="BAR.y + 20" text-anchor="middle" font-size="11" fill="var(--accent)" class="num">KE</text>
        <rect x="70" :y="BAR.y - BAR.h" width="40" :height="BAR.h" rx="6" fill="var(--sunken)" stroke="var(--line)" />
        <rect x="70" :y="BAR.y - keH" width="40" :height="keH" rx="4" fill="var(--pos)" />
        <text x="90" :y="BAR.y + 20" text-anchor="middle" font-size="11" fill="var(--pos)" class="num">PE</text>
        <text x="55" :y="BAR.y - keH - 10" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">{{ fmt(ke, 0) }} J</text>
        <text x="55" :y="BAR.y + 44" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('nrg.bars') }}</text>
      </g>
      <text x="300" y="70" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">½ · {{ fmt(m, 1) }} · {{ fmt(v, 1) }}² = {{ fmt(ke, 1) }} J = {{ fmt(m, 1) }} · 9.81 · {{ fmt(hMax, 2) }}</text>
      <text x="300" y="92" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('nrg.swap') }}</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('nrg.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
