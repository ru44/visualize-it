<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A planet crossing its star dims the star's light; how much reveals the planet's size. params: Rp (planet
// radius, Earth radii), Rs (star radius, solar radii). depth = (Rp/Rs)^2 with both converted to km.
// Duration assumes a close, fast orbit crossing the star at ~130 km/s (an estimate, noted in the lesson text).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const R_EARTH_KM = 6371
const R_SUN_KM = 696000
const V_CROSS = 130 // km/s, assumed crossing speed

const Rp = computed(() => Math.max(0.1, props.params.Rp ?? 1))
const Rs = computed(() => Math.max(0.05, props.params.Rs ?? 1))
const ratio = computed(() => (Rp.value * R_EARTH_KM) / (Rs.value * R_SUN_KM))
const depth = computed(() => ratio.value * ratio.value)
const durationH = computed(() => (2 * Rs.value * R_SUN_KM) / V_CROSS / 3600)

function brightness(hours: number): number {
  const half = durationH.value / 2
  const flat = half * 0.7
  const edge = half * 1.3
  const a = Math.abs(hours)
  if (a <= flat) return 1 - depth.value
  if (a >= edge) return 1
  return 1 - depth.value * (1 - (a - flat) / (edge - flat))
}

const DOM = computed<[number, number]>(() => { const h = durationH.value * 1.4; return [-h, h] })
const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) { const dt = Math.min(now - last, 50) / 1000; last = now; clock.value += dt; raf = requestAnimationFrame(tick) }
onMounted(() => { last = performance.now(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const animT = computed(() => { const [a, b] = DOM.value; const period = 6; const p = (Math.sin((clock.value / period) * 2 * Math.PI) + 1) / 2; return a + p * (b - a) })

// top diagram: star disc + transiting planet, planet drawn with a visibility floor (true ratio is often < 1px)
const SX = 210
const SY = 100
const STAR_PX = 58
const planetPx = computed(() => Math.max(3, STAR_PX * ratio.value))
const planetX = computed(() => { const [a, b] = DOM.value; return SX + (animT.value / Math.max(Math.abs(a), Math.abs(b))) * STAR_PX * 1.6 })

// bottom light curve
const PAD = { l: 420, r: 40, t: 60, b: 420 }
const px = (h: number) => { const [a, b] = DOM.value; return PAD.l + ((h - a) / (b - a)) * (760 - PAD.l) }
// The vertical axis is zoomed to the dip itself (1-depth at bottom, 1 at top), not the full 0..1 brightness
// range — real transit dips are far too shallow to see otherwise (Earth's own transit is only 84 ppm deep).
const py = (y: number) => 60 + ((1 - y) / depth.value) * 340
const curve = computed(() => { const [a, b] = DOM.value; return Array.from({ length: 121 }, (_, i) => { const h = a + (i / 120) * (b - a); return `${i ? 'L' : 'M'}${px(h).toFixed(1)},${py(brightness(h)).toFixed(1)}` }).join('') })

const readouts = computed(() => [
  { label: t('transit.depth'), value: `${(depth.value * 100).toFixed(depth.value * 100 < 0.1 ? 4 : 2)} %`, color: 'var(--accent-2)' },
  { label: t('transit.depthPpm'), value: `${Math.round(depth.value * 1e6)} ppm` },
  { label: t('transit.duration'), value: durationH.value < 1 ? `${fmt(durationH.value * 60, 0)} min` : `${fmt(durationH.value, 2)} h` },
  { label: t('transit.ratio'), value: fmt(Rp.value * R_EARTH_KM / (Rs.value * R_SUN_KM), 4) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 800 480`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('transit.hint') }}</text>
      <circle :cx="SX" :cy="SY" :r="STAR_PX" fill="var(--accent-2)" fill-opacity="0.9" />
      <circle :cx="planetX" :cy="SY" :r="planetPx" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1" />
      <text x="16" :y="SY + STAR_PX + 26" font-size="10" fill="var(--muted)">{{ t('transit.caption') }}</text>

      <line :x1="PAD.l" :x2="760" y1="400" y2="400" stroke="var(--muted)" />
      <line :x1="PAD.l" :x2="PAD.l" y1="60" y2="400" stroke="var(--muted)" />
      <text class="num" x="760" y="416" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('transit.time') }}</text>
      <text class="num" :x="PAD.l + 6" y="72" font-size="11" fill="var(--muted)">{{ t('transit.brightness') }}</text>
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="px(animT)" :x2="px(animT)" y1="60" y2="400" stroke="var(--accent-2)" stroke-opacity="0.4" />
      <circle :cx="px(animT)" :cy="py(brightness(animT))" r="5" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
