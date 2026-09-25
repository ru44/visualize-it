<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// content/lessons/waves/diffraction. theta = asin(min(1, lambda/a)) is the spreading half-angle
// (first-null estimate). Incoming plane wavefronts approach a gap of width a; the shaded wedge past
// it spans +/- theta, wide when the gap is close to the wavelength, narrow when it is much bigger.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const SCALE = 50 // px per metre
const BARRIER_X = 380
const CY = 240

const a = computed(() => props.params.a ?? 1)
const lambda = computed(() => props.params.lambda ?? 0.7)
const ratio = computed(() => Math.min(1, lambda.value / a.value))
const theta = computed(() => Math.asin(ratio.value))
const gapHalfPx = computed(() => Math.max(3, (a.value / 2) * SCALE))
const lambdaPx = computed(() => Math.max(6, lambda.value * SCALE))

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

const incoming = computed(() => {
  const speed = 40 // px/s
  const offset = ((clock.value * speed) % lambdaPx.value) - lambdaPx.value
  const lines: number[] = []
  for (let x = BARRIER_X + offset; x > 20; x -= lambdaPx.value) lines.push(x)
  return lines
})

const wedge = computed(() => {
  const gx = BARRIER_X + 6
  const reach = 340
  const y1 = CY - Math.tan(theta.value) * reach
  const y2 = CY + Math.tan(theta.value) * reach
  return `M${gx},${CY - gapHalfPx.value} L${gx + reach},${Math.max(10, y1)} L${gx + reach},${Math.min(H - 10, y2)} L${gx},${CY + gapHalfPx.value} Z`
})
const arcs = computed(() => {
  const gx = BARRIER_X + 6
  const rs = [90, 170, 250]
  return rs.map((r) => `M${gx + r * Math.cos(theta.value)},${CY - r * Math.sin(theta.value)} A${r},${r} 0 0 1 ${gx + r * Math.cos(theta.value)},${CY + r * Math.sin(theta.value)}`)
})

const readouts = computed(() => [
  { label: t('diffraction.a'), value: fmt(a.value, 2) + ' m', color: 'var(--accent)' },
  { label: t('diffraction.lambda'), value: fmt(lambda.value, 2) + ' m' },
  { label: t('diffraction.theta'), value: fmt((theta.value * 180) / Math.PI, 1) + '°', color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('diffraction.hint') }}</text>
      <path :d="wedge" fill="var(--accent)" fill-opacity="0.12" stroke="none" />
      <path v-for="(p, i) in arcs" :key="i" :d="p" fill="none" stroke="var(--accent-2)" stroke-opacity="0.5" />
      <line v-for="(x, i) in incoming" :key="i" :x1="x" :x2="x" y1="30" y2="450" stroke="var(--muted)" stroke-opacity="0.5" />
      <rect :x="BARRIER_X" y="0" width="8" :height="CY - gapHalfPx" fill="var(--fg)" />
      <rect :x="BARRIER_X" :y="CY + gapHalfPx" width="8" :height="H - (CY + gapHalfPx)" fill="var(--fg)" />
      <text class="num" :x="BARRIER_X - 40" :y="CY - gapHalfPx - 10" font-size="11" fill="var(--muted)">{{ t('diffraction.gap') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
