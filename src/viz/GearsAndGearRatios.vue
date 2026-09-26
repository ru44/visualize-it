<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two meshing gears. Teeth pass the mesh point at the same rate on both wheels, so the driven
// gear's speed is omega2 = omega1*N1/N2; with no losses, power is conserved, so its torque is
// tau2 = tau1*N2/N1. Pitch radius ~ tooth count (same tooth pitch on both gears).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const K = 1.7
const BASE = 22
const CY = 260

const N1 = computed(() => Math.max(1, Math.round(props.params.N1 ?? 20)))
const N2 = computed(() => Math.max(1, Math.round(props.params.N2 ?? 20)))
const w1 = computed(() => props.params.w1 ?? 300)
const tau1 = computed(() => props.params.tau1 ?? 20)
const ratio = computed(() => N2.value / N1.value)
const w2 = computed(() => (w1.value * N1.value) / N2.value)
const tau2 = computed(() => (tau1.value * N2.value) / N1.value)

const r1 = computed(() => BASE + K * N1.value)
const r2 = computed(() => BASE + K * N2.value)
const d = computed(() => r1.value + r2.value)
const cx1 = computed(() => W / 2 - d.value / 2)
const cx2 = computed(() => cx1.value + d.value)

function gearPath(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = []
  for (let i = 0; i < 2 * teeth; i++) {
    const a = (i * Math.PI) / teeth
    const rr = i % 2 === 0 ? r * 1.14 : r * 0.86
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const dur1 = computed(() => Math.max(0.4, Math.min(20, 60 / Math.max(1, Math.abs(w1.value)))))
const dur2 = computed(() => Math.max(0.4, Math.min(20, 60 / Math.max(1, Math.abs(w2.value)))))

const readouts = computed(() => [
  { label: t('gears.ratio'), value: `1 : ${fmt(ratio.value, 2)}`, color: 'var(--accent)' },
  { label: t('gears.w2'), value: fmt(w2.value, 0) + ' rpm' },
  { label: t('gears.tau2'), value: fmt(tau2.value, 1) + ' N·m', color: 'var(--pos)' },
  { label: t('gears.power'), value: fmt((tau1.value * w1.value * 2 * Math.PI) / 60, 0) + ' W' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('gears.hint') }}</text>
      <g>
        <path :d="gearPath(cx1, CY, r1, N1)" fill="var(--accent)" fill-opacity="0.85" stroke="var(--line)">
          <animateTransform v-if="!reduced" :key="`a1-${dur1}`" attributeName="transform" type="rotate" :values="`0 ${cx1} ${CY};360 ${cx1} ${CY}`" :dur="`${dur1}s`" repeatCount="indefinite" />
        </path>
        <path :d="gearPath(cx2, CY, r2, N2)" fill="var(--accent-2)" fill-opacity="0.85" stroke="var(--line)">
          <animateTransform v-if="!reduced" :key="`a2-${dur2}`" attributeName="transform" type="rotate" :values="`360 ${cx2} ${CY};0 ${cx2} ${CY}`" :dur="`${dur2}s`" repeatCount="indefinite" />
        </path>
      </g>
      <circle :cx="cx1" :cy="CY" r="6" fill="var(--fg)" />
      <circle :cx="cx2" :cy="CY" r="6" fill="var(--fg)" />
      <text class="num" :x="cx1" :y="CY + r1 + 20" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('gears.driver') }} N₁={{ N1 }}</text>
      <text class="num" :x="cx2" :y="CY + r2 + 20" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('gears.driven') }} N₂={{ N2 }}</text>
      <text class="num" :x="cx1" :y="CY - r1 - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ fmt(w1, 0) }} rpm</text>
      <text class="num" :x="cx2" :y="CY - r2 - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ fmt(w2, 0) }} rpm</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
