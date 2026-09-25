<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params Q (J added, starting from ice at -20°C), m (kg). A pot's ice/water/steam fractions and its
// temperature both follow the same four-stage curve the "Formal" section describes. A fixed callout
// compares the energy a gram of steam vs a gram of boiling water delivers on skin.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const C_ICE = 2100
const C_WATER = 4186
const L_FUSION = 334000
const L_VAPOR = 2256000

const Q = computed(() => Math.max(0, props.params.Q ?? 100000))
const m = computed(() => Math.max(0.01, props.params.m ?? 0.1))
const E1 = computed(() => m.value * C_ICE * 20)
const E2 = computed(() => E1.value + m.value * L_FUSION)
const E3 = computed(() => E2.value + m.value * C_WATER * 100)
const E4 = computed(() => E3.value + m.value * L_VAPOR)

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const meltFrac = computed(() => clamp01((Q.value - E1.value) / Math.max(1, E2.value - E1.value)))
const boilFrac = computed(() => clamp01((Q.value - E3.value) / Math.max(1, E4.value - E3.value)))
const solidFrac = computed(() => 1 - meltFrac.value)
const vaporFrac = computed(() => meltFrac.value * boilFrac.value)
const liquidFrac = computed(() => 1 - solidFrac.value - vaporFrac.value)

const temp = computed(() => {
  const q = Q.value
  if (q < E1.value) return -20 + q / (m.value * C_ICE)
  if (q < E2.value) return 0
  if (q < E3.value) return (q - E2.value) / (m.value * C_WATER)
  if (q < E4.value) return 100
  return 100
})
const stateLabel = computed(() => {
  const q = Q.value
  if (q < E1.value) return t('phase.ice')
  if (q < E2.value) return t('phase.melting')
  if (q < E3.value) return t('phase.water')
  if (q < E4.value) return t('phase.boiling')
  return t('phase.steam')
})

const POT = { x: 260, y: 90, w: 220, h: 300 }
const solidH = computed(() => solidFrac.value * POT.h)
const liquidH = computed(() => liquidFrac.value * POT.h)
const steamCount = computed(() => Math.round(6 * vaporFrac.value))

const readouts = computed(() => [
  { label: 'T', value: `${fmt(temp.value, 1)} °C`, color: 'var(--accent-2)' },
  { label: t('phase.state'), value: stateLabel.value },
  { label: 'Q', value: `${fmt(Q.value / 1000, 1)} kJ` },
  { label: 'm', value: `${fmt(m.value, 2)} kg` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('phase.hint') }}</text>

      <!-- pot -->
      <rect :x="POT.x" :y="POT.y" :width="POT.w" :height="POT.h" fill="none" stroke="var(--fg)" stroke-width="2" />
      <rect :x="POT.x + 2" :y="POT.y + POT.h - liquidH" :width="POT.w - 4" :height="liquidH" fill="var(--accent)" fill-opacity="0.6" />
      <rect :x="POT.x + 2" :y="POT.y + POT.h - liquidH - solidH" :width="POT.w - 4" :height="solidH" fill="#dbeeff" fill-opacity="0.9" />
      <g v-for="i in steamCount" :key="i">
        <path
          :d="`M${POT.x + 20 + i * 30},${POT.y - 10} q-10,-20 0,-40 q10,-20 0,-40`"
          fill="none"
          stroke="var(--muted)"
          stroke-width="3"
          stroke-linecap="round"
          opacity="0.7"
        />
      </g>
      <text class="num" :x="POT.x + POT.w / 2" :y="POT.y + POT.h + 26" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ stateLabel }} — {{ fmt(temp, 1) }}°C</text>

      <!-- steam-vs-water burn comparison (fixed real numbers) -->
      <g transform="translate(560, 110)">
        <text class="num" x="60" y="-22" text-anchor="middle" font-size="11" fill="var(--fg)" font-weight="600">{{ t('phase.burnTitle1') }}</text>
        <text class="num" x="60" y="-8" text-anchor="middle" font-size="11" fill="var(--fg)" font-weight="600">{{ t('phase.burnTitle2') }}</text>
        <rect x="0" y="16" width="40" :height="Math.min(180, 83.7 * 0.7)" fill="var(--accent)" />
        <text class="num" x="20" y="14" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('phase.water') }}</text>
        <text class="num" x="20" :y="16 + Math.min(180, 83.7 * 0.7) + 16" text-anchor="middle" font-size="11" fill="var(--muted)">84 J/g</text>
        <rect x="80" y="16" width="40" :height="Math.min(180, 2339.7 * 0.07)" fill="var(--pos)" />
        <text class="num" x="100" y="14" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('phase.steam') }}</text>
        <text class="num" x="100" :y="16 + Math.min(180, 2339.7 * 0.07) + 16" text-anchor="middle" font-size="11" fill="var(--muted)">2340 J/g</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
