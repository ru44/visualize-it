<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/polarisation. I1 = I0/2 after filter 1 (fixed vertical axis); I2 =
// I1*cos^2(theta) after filter 2, at angle theta to filter 1.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const CY = 240
const F1X = 260
const F2X = 520
const SCREEN_X = 740

const theta = computed(() => ((props.params.theta ?? 90) * Math.PI) / 180)
const I1 = 0.5
const I2 = computed(() => I1 * Math.cos(theta.value) ** 2)

const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min(now - last, 50) / 1000
  last = now
  clock.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const osc = computed(() => Math.sin(clock.value * 3))
const UNPOL_ANGLES = [0, 36, 72, 108, 144]

// A field-oscillation segment centred on the axis, at the current instant's amplitude.
function segment(amp: number): string {
  const dy = amp * osc.value
  return `M0,${-dy} L0,${dy}`
}
const AMP1 = 70
const AMP2 = computed(() => AMP1 * Math.abs(Math.cos(theta.value)))

const readouts = computed(() => [
  { label: t('polar.theta'), value: fmt((theta.value * 180) / Math.PI, 0) + '°', color: 'var(--accent-2)' },
  { label: t('polar.i1'), value: fmt(I1 * 100, 0) + ' %' },
  { label: t('polar.i2'), value: fmt(I2.value * 100, 0) + ' %', color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('polar.hint') }}</text>
      <line x1="30" :x2="SCREEN_X" :y1="CY" :y2="CY" stroke="var(--grid)" stroke-dasharray="4 4" />

      <g v-for="(deg, i) in UNPOL_ANGLES" :key="i" :transform="`translate(${90 + i * 22},${CY}) rotate(${deg})`">
        <path :d="segment(55)" stroke="var(--muted)" stroke-width="2" />
      </g>
      <text class="num" x="100" y="420" font-size="11" fill="var(--muted)">{{ t('polar.unpolarised') }}</text>

      <g :transform="`translate(${F1X},0)`">
        <rect x="-14" y="60" width="28" height="360" fill="var(--sunken)" stroke="var(--fg)" />
        <line x1="0" y1="70" x2="0" y2="410" stroke="var(--fg)" stroke-width="2" />
      </g>
      <text class="num" :x="F1X" y="440" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('polar.filter1') }}</text>

      <g :transform="`translate(${(F1X + F2X) / 2},${CY})`"><path :d="segment(AMP1)" stroke="var(--pos)" stroke-width="3" /></g>

      <g :transform="`translate(${F2X},${CY}) rotate(${(theta * 180) / Math.PI})`">
        <rect x="-14" y="-180" width="28" height="360" fill="var(--sunken)" stroke="var(--accent-2)" />
        <line x1="0" y1="-170" x2="0" y2="170" stroke="var(--accent-2)" stroke-width="2" />
      </g>
      <text class="num" :x="F2X" y="440" text-anchor="middle" font-size="11" fill="var(--accent-2)">{{ t('polar.filter2') }}</text>

      <g :transform="`translate(${(F2X + SCREEN_X) / 2},${CY}) rotate(${(theta * 180) / Math.PI})`"><path :d="segment(AMP2)" stroke="var(--accent)" stroke-width="3" /></g>

      <rect :x="SCREEN_X" y="90" width="40" height="300" fill="var(--accent)" :fill-opacity="Math.max(0.03, I2)" stroke="var(--line)" />
      <text class="num" :x="SCREEN_X + 20" y="410" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('polar.screen') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
