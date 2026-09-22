<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CHORD = 300
const PIVOT_X = 360
const PIVOT_Y = 230
const STALL_DEG = 15

// NACA 4412-like shape: fixed camber/thickness constants for a plausible cambered outline.
const M = 0.04
const P = 0.4
const T = 0.12

const alphaDeg = computed(() => props.params.alpha ?? 5)
const v = computed(() => props.params.v ?? 50)
const rho = computed(() => props.params.rho ?? 1.225)
const S = computed(() => props.params.S ?? 16)
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
/** Project a point given in chord-fraction coordinates (x along chord 0..1, y perpendicular) to screen space, rotated by -alpha about the quarter chord. */
function project(xf: number, yf: number): [number, number] {
  const dx = xf - 0.25
  const dy = yf
  const a = alphaRad.value
  const rx = dx * Math.cos(a) + dy * Math.sin(a)
  const ry = -dx * Math.sin(a) + dy * Math.cos(a)
  return [PIVOT_X + rx * CHORD, PIVOT_Y - ry * CHORD]
}

const N_OUTLINE = 44
const airfoilPath = computed(() => {
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
  const pts = [...upper, ...lower.reverse()]
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ' Z'
})

const stallSeverity = computed(() => Math.max(0, Math.min(1, (alphaDeg.value - STALL_DEG) / 5)))

const CL = computed(() => (alphaDeg.value <= STALL_DEG ? 0.11 * (alphaDeg.value + 2) : 1.87 - 0.19 * (alphaDeg.value - STALL_DEG)))
const CD = computed(() => 0.02 + (CL.value * CL.value) / (Math.PI * 7 * 0.85) + 0.35 * stallSeverity.value)
const L = computed(() => 0.5 * rho.value * v.value * v.value * S.value * CL.value)
const D = computed(() => 0.5 * rho.value * v.value * v.value * S.value * CD.value)

// --- animation ---
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

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x))
  return t * t * (3 - 2 * t)
}

const N_LINES = 14
// Streamlines are built in screen space: the far-field flow is horizontal, and each line is pushed
// around the body with y = C(x) ± sqrt(s² + R(x)²) — it hugs the surface when it starts close (small s)
// and is barely disturbed when it starts far away.
const surface = computed(() => {
  const top: [number, number][] = []
  const bottom: [number, number][] = []
  for (let k = 0; k <= 40; k++) {
    const xc = k / 40
    const { yc } = camber(xc)
    const th = thickness(xc)
    top.push(project(xc, yc + th))
    bottom.push(project(xc, yc - th))
  }
  return { top, bottom, xLE: Math.min(top[0][0], bottom[0][0]), xTE: Math.max(top[40][0], bottom[40][0]) }
})
function yAt(pts: [number, number][], x: number) {
  for (let k = 1; k < pts.length; k++)
    if (x <= pts[k][0]) {
      const [x0, y0] = pts[k - 1]
      const [x1, y1] = pts[k]
      return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
    }
  return pts[pts.length - 1][1]
}

const streamlines = computed(() => {
  const cl = CL.value
  const sev = stallSeverity.value
  const { top, bottom, xLE, xTE } = surface.value
  const GAP = 9
  const TAPER = 90
  const lines: { d: string; stroke: string; dash: number }[] = []
  for (let i = 0; i < N_LINES; i++) {
    const Y0 = 40 + ((H - 80) * i) / (N_LINES - 1)
    const s = Y0 - PIVOT_Y
    const sign = s < 0 ? -1 : 1
    const isUpper = s < 0
    let d = ''
    for (let j = 0; j <= 80; j++) {
      const x = (W * j) / 80
      const xin = Math.max(xLE, Math.min(xTE, x))
      const t = yAt(top, xin)
      const b = yAt(bottom, xin)
      const outside = x < xLE ? xLE - x : x > xTE ? x - xTE : 0
      const fade = 1 - smoothstep(outside / TAPER)
      const R = ((b - t) / 2 + GAP) * fade
      const C = PIVOT_Y + ((t + b) / 2 - PIVOT_Y) * fade * Math.exp(-Math.abs(s) / 160)
      // Upwash ahead of the wing, downwash behind it — both scale with lift.
      const deflect = cl * (26 * smoothstep((x - xLE) / (xTE - xLE + 160)) - 9 * Math.exp(-(((x - xLE + 50) / 90) ** 2)))
      let y = C + sign * Math.sqrt(s * s + R * R) + deflect * Math.exp(-Math.abs(s) / 260)
      if (sev > 0 && isUpper && Math.abs(s) < 150) {
        const ramp = smoothstep((x - (xLE + 0.35 * (xTE - xLE))) / 90)
        y += -34 * sev * ramp + 16 * sev * ramp * Math.sin(x * 0.06 + time.value * 2.4 + i * 1.3)
      }
      d += `${j ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
    }
    // Air over the top travels faster: its dashes move quicker.
    const speed = (36 + v.value * 0.5) * (isUpper && Math.abs(s) < 120 ? 1 + 0.35 * Math.max(0, cl) : 1)
    lines.push({ d, stroke: sev > 0 && isUpper && Math.abs(s) < 150 ? 'var(--neg)' : 'var(--muted)', dash: -(time.value * speed + i * 5) })
  }
  return lines
})

function arrowPts(x1: number, y1: number, x2: number, y2: number): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const s = 8
  const a1 = ang + 2.6
  const a2 = ang - 2.6
  return `${x2},${y2} ${x2 + s * Math.cos(a1)},${y2 + s * Math.sin(a1)} ${x2 + s * Math.cos(a2)},${y2 + s * Math.sin(a2)}`
}

const arrows = computed(() => {
  const signL = L.value >= 0 ? -1 : 1
  const pxL = 14 + 150 * (Math.abs(L.value) / (Math.abs(L.value) + 4000))
  const pxD = 14 + 150 * (Math.abs(D.value) / (Math.abs(D.value) + 800))
  const liftTip: [number, number] = [PIVOT_X, PIVOT_Y + signL * pxL]
  const dragTip: [number, number] = [PIVOT_X + pxD, PIVOT_Y]
  return { liftTip, dragTip }
})

const readouts = computed(() => [
  { label: 'α', value: `${fmt(alphaDeg.value)}°` },
  { label: 'C_L', value: fmt(CL.value) },
  { label: 'C_D', value: fmt(CD.value) },
  { label: 'L', value: `${fmt(L.value)} N`, color: 'var(--pos)' },
  { label: 'D', value: `${fmt(D.value)} N`, color: 'var(--accent-2)' },
  { label: 'L/D', value: fmt(L.value / D.value) },
])

let dragStart: { y: number; alpha: number } | null = null
function down(e: PointerEvent) {
  dragStart = { y: e.clientY, alpha: alphaDeg.value }
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!dragStart) return
  emit('set', 'alpha', dragStart.alpha + (dragStart.y - e.clientY) * 0.08)
}
function up() {
  dragStart = null
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
      <path
        v-for="(ln, i) in streamlines"
        :key="i"
        :d="ln.d"
        fill="none"
        :stroke="ln.stroke"
        stroke-width="1.4"
        stroke-opacity="0.8"
        stroke-dasharray="10 6"
        :stroke-dashoffset="ln.dash"
      />
      <path :d="airfoilPath" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="PIVOT_X" :y1="PIVOT_Y" :x2="arrows.liftTip[0]" :y2="arrows.liftTip[1]" stroke="var(--pos)" stroke-width="2" />
      <polygon :points="arrowPts(PIVOT_X, PIVOT_Y, arrows.liftTip[0], arrows.liftTip[1])" fill="var(--pos)" />
      <line :x1="PIVOT_X" :y1="PIVOT_Y" :x2="arrows.dragTip[0]" :y2="arrows.dragTip[1]" stroke="var(--accent-2)" stroke-width="2" />
      <polygon :points="arrowPts(PIVOT_X, PIVOT_Y, arrows.dragTip[0], arrows.dragTip[1])" fill="var(--accent-2)" />
      <circle :cx="PIVOT_X" :cy="PIVOT_Y" r="2.5" fill="var(--fg)" />
      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">drag vertically to change α · lift (green) and drag (orange) from the quarter chord</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">Conceptual streamlines — not a CFD solution.</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
