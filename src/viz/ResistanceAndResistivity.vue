<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/resistance-and-resistivity. params: L (m), A (mm²), mat (0 = copper, 1 = nichrome).
// The wire is drawn to scale with the sliders: its on-screen length grows with L and its thickness
// grows with sqrt(A), so "longer resists more, thicker resists less" is visible directly in the shape.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CENTER_Y = 220
const RHO_COPPER = 1.68e-8
const RHO_NICHROME = 1.1e-6

const length = computed(() => Math.max(props.params.L ?? 1, 0.05))
const areaMm2 = computed(() => Math.max(props.params.A ?? 1, 0.02))
const isNichrome = computed(() => (props.params.mat ?? 0) >= 0.5)
const rho = computed(() => (isNichrome.value ? RHO_NICHROME : RHO_COPPER))
const resistance = computed(() => rho.value * length.value / (areaMm2.value * 1e-6))

const wireLenPx = computed(() => 120 + (length.value / 5) * 480)
const wireHalfH = computed(() => 8 + Math.sqrt(areaMm2.value) * 22)
const wireX0 = computed(() => (W - wireLenPx.value) / 2)
const wireX1 = computed(() => wireX0.value + wireLenPx.value)

const glow = computed(() => Math.min(1, resistance.value / 50))

function toggleMaterial() {
  emit('set', 'mat', isNichrome.value ? 0 : 1)
}

const readouts = computed(() => [
  { label: 'L', value: `${fmt(length.value)} m` },
  { label: 'A', value: `${fmt(areaMm2.value)} mm²` },
  { label: 'ρ', value: `${rho.value.toExponential(2)} Ω·m` },
  { label: 'R = ρL/A', value: `${fmt(resistance.value, resistance.value < 1 ? 4 : 2)} Ω`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none cursor-pointer" @click="toggleMaterial">
      <text x="16" y="28" font-size="12" fill="var(--muted)">{{ t('rr.hint') }}</text>

      <!-- terminals -->
      <line :x1="wireX0 - 40" :y1="CENTER_Y" :x2="wireX0" :y2="CENTER_Y" stroke="var(--fg)" stroke-width="2" />
      <line :x1="wireX1" :y1="CENTER_Y" :x2="wireX1 + 40" :y2="CENTER_Y" stroke="var(--fg)" stroke-width="2" />

      <rect
        :x="wireX0"
        :y="CENTER_Y - wireHalfH"
        :width="wireLenPx"
        :height="wireHalfH * 2"
        rx="6"
        :fill="isNichrome ? 'var(--accent-2)' : 'var(--accent)'"
        :fill-opacity="0.35 + glow * 0.5"
        :stroke="isNichrome ? 'var(--accent-2)' : 'var(--accent)'"
        stroke-width="2"
      />

      <text :x="W / 2" :y="CENTER_Y - wireHalfH - 18" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">
        {{ isNichrome ? t('rr.nichrome') : t('rr.copper') }}
      </text>
      <text :x="W / 2" :y="CENTER_Y + wireHalfH + 28" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('rr.toggleHint') }}</text>

      <g :transform="`translate(280, 340)`">
        <rect x="0" y="0" width="240" height="90" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="14" y="24" font-size="11" fill="var(--muted)">{{ t('rr.resultLabel') }}</text>
        <text class="num" x="14" y="54" font-size="22" fill="var(--accent)">R = {{ fmt(resistance, resistance < 1 ? 4 : 2) }} Ω</text>
        <text x="14" y="76" font-size="10" fill="var(--muted)">ρ = {{ rho.toExponential(2) }} Ω·m</text>
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('rr.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
