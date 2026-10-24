<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// relativity/special-relativity-time-dilation. param x = v/c. Two light clocks tick side by side:
// yours stands still, the ship's slides right at v. Both photons fly at the same c, but the moving
// photon's path is a longer diagonal, so that clock ticks once every γ of yours — γ = 1/√(1−v²/c²).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const beta = computed(() => Math.min(Math.max(props.params.x ?? 0.5, 0), 0.99))
const gamma = computed(() => 1 / Math.sqrt(1 - beta.value * beta.value))

const TOP = 120
const BOT = 280
const GAP = BOT - TOP
const T0 = 1.6 // seconds of real time per round trip of the resting clock
const TRACK0 = 390
const TRACK1 = 760
const CLOCK_W = 56

const tau = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  tau.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const tri = (p: number) => 1 - Math.abs(2 * p - 1)
const photonYou = computed(() => BOT - tri((tau.value / T0) % 1) * GAP)
const shipPeriod = computed(() => T0 * gamma.value)
const photonShipY = computed(() => BOT - tri((tau.value / shipPeriod.value) % 1) * GAP)
const shipX = computed(() => TRACK0 + ((beta.value * 90 * tau.value) % (TRACK1 - TRACK0 - CLOCK_W)))
const ticksYou = computed(() => Math.floor(tau.value / T0))
const ticksShip = computed(() => Math.floor(tau.value / shipPeriod.value))

// --- Drag anywhere on the right half to set v/c ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (ev.clientX - box.left) / box.width))
  emit('set', 'x', Math.round(Math.min(0.99, Math.max(0, (frac - 0.45) / 0.5)) * 1000) / 1000)
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  if ((ev.clientX - box.left) / box.width < 0.42) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

// --- The triangle that proves it: (ct/2)² = L² + (vt/2)² ---
const TRI_L = 70
const triHalfBase = computed(() => beta.value * TRI_L)
const readouts = computed(() => [
  { label: 'v', value: `${fmt(beta.value, 3)} c` },
  { label: 'γ = 1/√(1−v²/c²)', value: fmt(gamma.value, 4), color: 'var(--accent)' },
  { label: t('lc.oneTick'), value: `${fmt(gamma.value, 3)} s`, color: 'var(--accent-2)' },
  { label: t('lc.afterTen'), value: fmt(10 / gamma.value, 2) },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lc.hint') }}</text>
      <!-- your clock, at rest -->
      <text x="180" y="86" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('lc.you') }}</text>
      <rect x="152" :y="TOP - 10" width="56" height="8" rx="3" fill="var(--line)" />
      <rect x="152" :y="BOT + 2" width="56" height="8" rx="3" fill="var(--line)" />
      <line x1="180" :y1="TOP" x2="180" :y2="BOT" stroke="var(--line)" stroke-dasharray="2 4" />
      <circle cx="180" :cy="photonYou" r="7" fill="var(--accent)" />
      <text x="180" :y="BOT + 34" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">{{ t('lc.ticks', { n: ticksYou }) }}</text>
      <!-- the ship's clock, sliding right at v -->
      <text x="575" y="86" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ t('lc.ship', { v: fmt(beta, 2) }) }}</text>
      <line :x1="TRACK0" :y1="BOT + 10" :x2="TRACK1" :y2="BOT + 10" stroke="var(--line)" />
      <g :transform="`translate(${shipX}, 0)`">
        <rect x="0" :y="TOP - 10" :width="CLOCK_W" height="8" rx="3" fill="var(--accent-2)" />
        <rect x="0" :y="BOT + 2" :width="CLOCK_W" height="8" rx="3" fill="var(--accent-2)" />
        <circle :cx="CLOCK_W / 2" :cy="photonShipY" r="7" fill="var(--accent)" />
      </g>
      <text x="575" :y="BOT + 34" text-anchor="middle" font-size="12" fill="var(--accent-2)" class="num">{{ t('lc.ticks', { n: ticksShip }) }}</text>
      <!-- the geometry that forces the slowdown -->
      <g :transform="`translate(120, ${H - 108})`">
        <line x1="0" y1="70" :x2="triHalfBase * 3" y2="70" stroke="var(--neg)" stroke-width="2" />
        <line :x1="triHalfBase * 3" y1="70" :x2="triHalfBase * 3" y2="0" stroke="var(--line)" stroke-width="2" />
        <line x1="0" y1="70" :x2="triHalfBase * 3" y2="0" stroke="var(--accent)" stroke-width="2" />
        <text :x="triHalfBase * 1.5" y="86" text-anchor="middle" font-size="11" fill="var(--neg)" class="num">v·t/2</text>
        <text :x="triHalfBase * 3 + 16" y="40" font-size="11" fill="var(--muted)" class="num">L</text>
        <text :x="triHalfBase * 1.2" y="24" text-anchor="middle" font-size="11" fill="var(--accent)" class="num">c·t/2</text>
      </g>
      <text x="420" :y="H - 62" font-size="12" fill="var(--fg)" class="num">(c·t/2)² = L² + (v·t/2)²</text>
      <text x="420" :y="H - 40" font-size="12" fill="var(--accent)" class="num">t = γ·t₀, γ = {{ fmt(gamma, 3) }}</text>
      <text x="420" :y="H - 16" font-size="11" fill="var(--muted)">{{ t('lc.geom') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
