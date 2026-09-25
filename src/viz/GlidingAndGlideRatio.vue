<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A schematic descent: the SLOPE drawn is not to true angle (a real 17:1 glide is far shallower
// than any legible line on screen) but the numbers in the readouts are exact. params: LD
// (lift-to-drag ratio), h (starting height, m).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const GROUND_Y = 420
const X0 = 90
const Y0 = 60

const LD = computed(() => Math.max(1, props.params.LD ?? 17))
const h = computed(() => Math.max(1, props.params.h ?? 3000))

const gammaDeg = computed(() => (Math.atan(1 / LD.value) * 180) / Math.PI)
const distance = computed(() => h.value * LD.value)

// purely illustrative slope, clamped to stay legible regardless of the real (much shallower) angle
const visualAngleDeg = computed(() => 40 - (Math.min(70, LD.value) - 2) * (34 / 68))
const touchdownX = computed(() => {
  const run = (GROUND_Y - Y0) / Math.tan((visualAngleDeg.value * Math.PI) / 180)
  return Math.min(W - 70, X0 + run)
})

const craftKind = computed(() => (LD.value < 8 ? 'paper' : LD.value < 25 ? 'prop' : 'glider'))
const rot = computed(() => visualAngleDeg.value)

const time = ref(0)
let rafId: number | null = null
function tick(ts: number) {
  time.value = ts / 1000
  rafId = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

const markerFrac = computed(() => (time.value * 0.18) % 1)
const markerPos = computed(() => {
  const f = markerFrac.value
  return [X0 + (touchdownX.value - X0) * f, Y0 + (GROUND_Y - Y0) * f] as [number, number]
})

const readouts = computed(() => [
  { label: 'L/D', value: fmt(LD.value, 1) },
  { label: 'h', value: `${fmt(h.value, 0)} m` },
  { label: 'γ', value: `${fmt(gammaDeg.value, 2)}°` },
  { label: t('ggr.distance'), value: distance.value >= 1000 ? `${fmt(distance.value / 1000, 1)} km` : `${fmt(distance.value, 1)} m`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ggr.hint') }}</text>

      <line x1="20" :y1="GROUND_Y" :x2="W - 20" :y2="GROUND_Y" stroke="var(--line)" stroke-width="2" />
      <line :x1="X0" :y1="Y0" :x2="X0" :y2="GROUND_Y" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />
      <text :x="X0 - 8" :y="(Y0 + GROUND_Y) / 2" font-size="11" fill="var(--muted)" text-anchor="end" :transform="`rotate(-90 ${X0 - 8} ${(Y0 + GROUND_Y) / 2})`">h = {{ fmt(h, 0) }} m</text>

      <line :x1="X0" :y1="Y0" :x2="touchdownX" :y2="GROUND_Y" stroke="var(--accent)" stroke-width="2" stroke-dasharray="7 5" />
      <circle :cx="markerPos[0]" :cy="markerPos[1]" r="6" fill="var(--accent)" />

      <g :transform="`translate(${X0},${Y0}) rotate(${rot})`">
        <path v-if="craftKind === 'paper'" d="M0,-10 L34,0 L0,10 L8,0 Z" fill="var(--fg)" opacity="0.8" />
        <path v-else-if="craftKind === 'prop'" d="M0,-9 L38,0 L0,9 L10,0 Z" fill="var(--fg)" opacity="0.8" />
        <path v-else d="M0,-24 L44,0 L0,24 L15,0 Z" fill="var(--fg)" opacity="0.8" />
      </g>

      <circle :cx="touchdownX" :cy="GROUND_Y" r="5" fill="var(--pos)" />
      <text :x="touchdownX" :y="GROUND_Y - 12" font-size="12" fill="var(--pos)" text-anchor="middle">{{ t('ggr.touchdown') }}</text>

      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('ggr.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
