<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two things this picture must show that the "lift" lesson's streamline view does not: (1) a
// pressure-difference reading (glow bands, not just streamline curvature) and (2) a direct,
// numeric debunk of the equal-transit-time myth via two timed dots racing the top and bottom
// surfaces. params: alpha (deg, angle of attack), v (m/s, airspeed).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CHORD = 300
const PIVOT_X = 360
const PIVOT_Y = 230
const STALL_DEG = 15
const CHORD_M = 1.5 // reference real chord length, metres — for the race-time readouts only

const M = 0.04
const P = 0.4
const T = 0.12

const alphaDeg = computed(() => props.params.alpha ?? 5)
const v = computed(() => props.params.v ?? 50)
const rho = 1.225
const S = 16
const alphaRad = computed(() => (alphaDeg.value * Math.PI) / 180)

function camber(xc: number) {
  const x = Math.max(0, Math.min(1, xc))
  if (x < P) return { yc: (M / (P * P)) * (2 * P * x - x * x), dyc: (2 * M / (P * P)) * (P - x) }
  return { yc: (M / ((1 - P) * (1 - P))) * (1 - 2 * P + 2 * P * x - x * x), dyc: (2 * M / ((1 - P) * (1 - P))) * (P - x) }
}
function thickness(xc: number) {
  const x = Math.max(0, Math.min(1, xc))
  return 5 * T * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1015 * x ** 4)
}
function project(xf: number, yf: number): [number, number] {
  const dx = xf - 0.25
  const dy = yf
  const a = alphaRad.value
  const rx = dx * Math.cos(a) + dy * Math.sin(a)
  const ry = -dx * Math.sin(a) + dy * Math.cos(a)
  return [PIVOT_X + rx * CHORD, PIVOT_Y - ry * CHORD]
}

const N_OUTLINE = 44
const surface = computed(() => {
  const upper: [number, number][] = []
  const lower: [number, number][] = []
  for (let i = 0; i <= N_OUTLINE; i++) {
    const xc = i / N_OUTLINE
    const { yc, dyc } = camber(xc)
    const yt = thickness(xc)
    const theta = Math.atan(dyc)
    upper.push(project(xc - yt * Math.sin(theta), yc + yt * Math.cos(theta)))
    lower.push(project(xc + yt * Math.sin(theta), yc - yt * Math.cos(theta)))
  }
  return { upper, lower }
})
function pathOf(pts: [number, number][]) {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
}
const airfoilPath = computed(() => `${pathOf(surface.value.upper)} L${pathOf(surface.value.lower).slice(1)} Z`)

// Thin-airfoil lift coefficient (2π·sinα below stall, falling off past it) — the same physics as
// "lift", just built independently here so this lesson stands on its own.
const CL = computed(() => {
  const a = alphaDeg.value
  return a <= STALL_DEG ? 2 * Math.PI * Math.sin((a * Math.PI) / 180) : Math.max(0.3, 1.626 - 0.19 * (a - STALL_DEG))
})
const dP = computed(() => 0.5 * rho * v.value * v.value * CL.value) // pressure difference, Pa
const L = computed(() => dP.value * S)

// --- animation: a repeating race between a dot on the top surface and one on the bottom ---
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

// Faster circulation (higher CL) speeds the top flow up and slows the bottom flow down; the top
// path is only ~2% longer than the bottom, which is nowhere near enough to explain the gap below.
const speedTop = computed(() => Math.max(1, v.value * (1 + 0.5 * CL.value)))
const speedBottom = computed(() => Math.max(1, v.value * (1 - 0.25 * CL.value)))
const timeTop = computed(() => (CHORD_M * 1.02) / speedTop.value)
const timeBottom = computed(() => CHORD_M / speedBottom.value)
const loopT = computed(() => Math.max(timeTop.value, timeBottom.value) * 1.6)
const raceProgress = computed(() => {
  const phase = time.value % loopT.value
  return { top: Math.min(1, phase / timeTop.value), bottom: Math.min(1, phase / timeBottom.value) }
})
function dotAt(pts: [number, number][], frac: number): [number, number] {
  const i = Math.min(pts.length - 1, Math.round(frac * (pts.length - 1)))
  return pts[i]
}
const dotTop = computed(() => dotAt(surface.value.upper, raceProgress.value.top))
const dotBottom = computed(() => dotAt(surface.value.lower, raceProgress.value.bottom))

const glowWidth = computed(() => 3 + 16 * Math.min(1, CL.value / 1.8))

function arrowPts(x1: number, y1: number, x2: number, y2: number): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const s = 8
  return `${x2},${y2} ${x2 + s * Math.cos(ang + 2.6)},${y2 + s * Math.sin(ang + 2.6)} ${x2 + s * Math.cos(ang - 2.6)},${y2 + s * Math.sin(ang - 2.6)}`
}
const liftArrow = computed(() => {
  const px = 14 + 150 * (L.value / (L.value + 4000))
  return { x1: PIVOT_X, y1: PIVOT_Y, x2: PIVOT_X, y2: PIVOT_Y - px }
})

const readouts = computed(() => [
  { label: 'α', value: `${fmt(alphaDeg.value)}°` },
  { label: 'C_L', value: fmt(CL.value) },
  { label: 'Δp', value: `${fmt(dP.value, 0)} Pa` },
  { label: 'L', value: `${fmt(L.value, 0)} N`, color: 'var(--pos)' },
  { label: t('hwl.tTop'), value: `${fmt(timeTop.value * 1000, 0)} ms`, color: 'var(--accent)' },
  { label: t('hwl.tBottom'), value: `${fmt(timeBottom.value * 1000, 0)} ms`, color: 'var(--accent-2)' },
])

let dragStart: { y: number; alpha: number } | null = null
function down(e: PointerEvent) {
  dragStart = { y: e.clientY, alpha: alphaDeg.value }
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!dragStart) return
  emit('set', 'alpha', Math.max(-5, Math.min(20, dragStart.alpha + (dragStart.y - e.clientY) * 0.08)))
}
function up() {
  dragStart = null
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('hwl.hint') }}</text>

      <path :d="pathOf(surface.upper)" fill="none" stroke="var(--accent)" :stroke-width="glowWidth" stroke-opacity="0.5" stroke-linecap="round" />
      <path :d="pathOf(surface.lower)" fill="none" stroke="var(--accent-2)" :stroke-width="glowWidth * 0.65" stroke-opacity="0.5" stroke-linecap="round" />

      <path :d="airfoilPath" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />

      <line :x1="liftArrow.x1" :y1="liftArrow.y1" :x2="liftArrow.x2" :y2="liftArrow.y2" stroke="var(--pos)" stroke-width="2" />
      <polygon :points="arrowPts(liftArrow.x1, liftArrow.y1, liftArrow.x2, liftArrow.y2)" fill="var(--pos)" />

      <circle :cx="dotTop[0]" :cy="dotTop[1]" r="6" fill="var(--accent)" />
      <circle :cx="dotBottom[0]" :cy="dotBottom[1]" r="6" fill="var(--accent-2)" />

      <text x="16" y="46" font-size="12" fill="var(--accent)">{{ t('hwl.topLabel') }}</text>
      <text x="16" y="64" font-size="12" fill="var(--accent-2)">{{ t('hwl.bottomLabel') }}</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('hwl.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
