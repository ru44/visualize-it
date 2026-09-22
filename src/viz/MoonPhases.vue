<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Top view of Earth and Moon with the Sun far to the right; below, what the Moon looks like from Earth.
// param day (0..29.53). Drag around the orbit to set the day.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const P = 29.53
const day = computed(() => ((props.params.day ?? 0) % P + P) % P)
const ang = computed(() => (day.value / P) * 2 * Math.PI) // 0 = new moon (between Earth and Sun)
const C = { x: 300, y: 250 }
const R = 150
const moon = computed(() => ({ x: C.x + R * Math.cos(ang.value), y: C.y - R * Math.sin(ang.value) }))
// Illuminated fraction seen from Earth: (1 − cos(phase angle)) / 2
const lit = computed(() => (1 - Math.cos(ang.value)) / 2)
const waxing = computed(() => Math.sin(ang.value) >= 0 ? false : true)
// Terminator as an ellipse path over the moon disc drawn at (650, 250) radius 70
const disc = { x: 650, y: 250, r: 70 }
const phasePath = computed(() => {
  const r = disc.r
  const k = Math.cos(ang.value) // −1 full, 1 new
  // lit side: right half when waxing (in northern hemisphere view), left half when waning
  const sweep = waxing.value ? 1 : 0
  const rx = Math.abs(k) * r
  const outer = `M${disc.x},${disc.y - r} A${r},${r} 0 0 ${sweep} ${disc.x},${disc.y + r}`
  const inner = `A${rx},${r} 0 0 ${k < 0 ? sweep : 1 - sweep} ${disc.x},${disc.y - r}`
  return outer + ' ' + inner + ' Z'
})
const names = ['new', 'waxingCrescent', 'firstQuarter', 'waxingGibbous', 'full', 'waningGibbous', 'lastQuarter', 'waningCrescent']
const phaseName = computed(() => names[Math.round((day.value / P) * 8) % 8])
const readouts = computed(() => [
  { label: t('moon.day'), value: fmt(day.value, 1) },
  { label: t('moon.lit'), value: fmt(lit.value * 100, 0) + ' %', color: 'var(--accent-2)' },
  { label: t('moon.phase'), value: t(`moon.${phaseName.value}` as any) },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - C.x
  const y = C.y - ((e.clientY - b.top) / b.height) * H
  let a = Math.atan2(y, x)
  if (a < 0) a += 2 * Math.PI
  emit('set', 'day', (a / (2 * Math.PI)) * P)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-pointer touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <defs><clipPath id="moonclip"><circle :cx="disc.x" :cy="disc.y" :r="disc.r" /></clipPath></defs>
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('moon.hint') }}</text>
      <!-- sunlight from the right -->
      <g stroke="var(--accent-2)" stroke-opacity="0.5">
        <line v-for="i in 7" :key="i" :x1="W - 20" :x2="C.x + R + 40" :y1="C.y - 120 + i * 34" :y2="C.y - 120 + i * 34" stroke-dasharray="6 6" />
      </g>
      <text class="num" :x="W - 24" :y="C.y - 130" text-anchor="end" font-size="12" fill="var(--accent-2)">☀ {{ t('moon.sun') }}</text>
      <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="var(--line)" stroke-dasharray="4 4" />
      <!-- Earth, lit on the right -->
      <circle :cx="C.x" :cy="C.y" r="26" fill="var(--accent)" />
      <path :d="`M${C.x},${C.y - 26} A26,26 0 0 0 ${C.x},${C.y + 26} Z`" fill="#000" fill-opacity="0.45" />
      <!-- Moon in orbit, lit on the right -->
      <circle :cx="moon.x" :cy="moon.y" r="12" fill="var(--fg)" fill-opacity="0.9" />
      <path :d="`M${moon.x},${moon.y - 12} A12,12 0 0 0 ${moon.x},${moon.y + 12} Z`" fill="#000" fill-opacity="0.55" />
      <line :x1="C.x" :y1="C.y" :x2="moon.x" :y2="moon.y" stroke="var(--muted)" stroke-dasharray="3 3" />
      <!-- what we see -->
      <text class="num" :x="disc.x" :y="disc.y - disc.r - 16" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('moon.fromEarth') }}</text>
      <circle :cx="disc.x" :cy="disc.y" :r="disc.r" fill="var(--sunken)" stroke="var(--line)" />
      <path :d="phasePath" fill="var(--fg)" fill-opacity="0.9" clip-path="url(#moonclip)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
