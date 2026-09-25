<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params alpha (×10⁻⁶/°C), L0 (m), dT (°C). Left: a rail with an expansion gap that closes/opens by
// ΔL = αL0ΔT. Right: a bimetallic strip (fixed steel/brass α) bending the same ΔT into an angle,
// the mechanism inside a thermostat.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const ALPHA_STEEL = 12
const ALPHA_BRASS = 19

const alpha = computed(() => props.params.alpha ?? 12)
const L0 = computed(() => Math.max(0.1, props.params.L0 ?? 18))
const dT = computed(() => props.params.dT ?? 35)
const dL = computed(() => alpha.value * 1e-6 * L0.value * dT.value)
const dLmm = computed(() => dL.value * 1000)

// Rail gap: base gap 30 px, closes as dL grows (positive dT), opens as it shrinks (negative dT).
const gap = computed(() => Math.max(2, Math.min(56, 30 - dLmm.value * 1.2)))
const railY = 140

// Bimetallic strip: curls toward the steel side; angle scaled from the α mismatch times dT.
const bendAngle = computed(() => Math.max(-55, Math.min(55, (ALPHA_BRASS - ALPHA_STEEL) * dT.value * 0.08)))

const readouts = computed(() => [
  { label: 'ΔL', value: `${fmt(dLmm.value, 2)} mm`, color: 'var(--accent-2)' },
  { label: 'α', value: `${fmt(alpha.value, 0)} ×10⁻⁶/°C` },
  { label: 'L₀', value: `${fmt(L0.value, 0)} m` },
  { label: 'ΔT', value: `${fmt(dT.value, 0)} °C` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('texp.hint') }}</text>

      <!-- Rail with expansion gap -->
      <text class="num" x="220" y="60" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ t('texp.railTitle') }}</text>
      <rect x="40" :y="railY - 8" :width="220 - gap / 2 - 40" height="16" fill="var(--accent-2)" />
      <rect :x="220 + gap / 2" :y="railY - 8" :width="400 - (220 + gap / 2)" height="16" fill="var(--accent-2)" />
      <rect :x="220 - gap / 2" :y="railY - 14" :width="gap" height="28" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1" />
      <text class="num" x="220" y="180" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('texp.gap') }}: {{ fmt(gap, 0) }} px</text>
      <text class="num" x="220" y="200" text-anchor="middle" font-size="12" fill="var(--muted)">ΔL = {{ fmt(dLmm, 2) }} mm ({{ t('texp.of') }} L₀ = {{ fmt(L0, 0) }} m)</text>

      <!-- Bimetallic strip thermostat -->
      <text class="num" x="600" y="60" text-anchor="middle" font-size="13" fill="var(--fg)" font-weight="600">{{ t('texp.thermoTitle') }}</text>
      <circle cx="600" cy="120" r="6" fill="var(--muted)" />
      <g :transform="`rotate(${bendAngle}, 600, 120)`">
        <rect x="600" y="114" width="140" height="6" fill="var(--accent)" />
        <rect x="600" y="120" width="140" height="6" fill="var(--accent-2)" />
      </g>
      <text class="num" x="600" y="300" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('texp.bend') }}: {{ fmt(Math.abs(bendAngle), 0) }}°</text>
      <text class="num" x="510" y="118" font-size="11" fill="var(--accent)">{{ t('texp.steel') }}</text>
      <text class="num" x="510" y="140" font-size="11" fill="var(--accent-2)">{{ t('texp.brass') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
