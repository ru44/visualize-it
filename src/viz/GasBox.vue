<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

// --- Layout ------------------------------------------------------------
const GAUGE_X = 40
const GAUGE_Y = 20
const GAUGE_W = 720
const GAUGE_H = 24
const GAUGE_MAX = 2500 // kPa, clamped

const BOX_LEFT = 80
const BOX_TOP = 90
const BOX_H = 320
const SCALE_V = 12 // px per litre
const ROD_W = 40
const RADIUS = 3

const R_GAS = 8.314
const SPEED_K = 6

function containerWidth() {
  return Math.max(20, SCALE_V * (props.params.V ?? 25))
}
function pressureKPa() {
  const n = props.params.n ?? 1
  const T = props.params.T ?? 300
  const V = Math.max(props.params.V ?? 25, 0.001)
  return (n * R_GAS * T) / V
}

// --- Colours (read from CSS vars, refreshed on theme change) -----------
let colors = {
  fg: '#18181b',
  muted: '#71717a',
  line: '#e4e4e7',
  grid: '#ececee',
  accent: '#2563eb',
  accent2: '#d97706',
  bg: '#fafaf9',
}
function readColors() {
  const cs = getComputedStyle(document.documentElement)
  colors = {
    fg: cs.getPropertyValue('--fg').trim() || colors.fg,
    muted: cs.getPropertyValue('--muted').trim() || colors.muted,
    line: cs.getPropertyValue('--line').trim() || colors.line,
    grid: cs.getPropertyValue('--grid').trim() || colors.grid,
    accent: cs.getPropertyValue('--accent').trim() || colors.accent,
    accent2: cs.getPropertyValue('--accent-2').trim() || colors.accent2,
    bg: cs.getPropertyValue('--bg').trim() || colors.bg,
  }
}

// --- Particles -----------------------------------------------------------
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}
let particles: Particle[] = []

function spawnParticle(w: number): Particle {
  const x = BOX_LEFT + RADIUS + Math.random() * Math.max(1, w - 2 * RADIUS)
  const y = BOX_TOP + RADIUS + Math.random() * Math.max(1, BOX_H - 2 * RADIUS)
  const angle = Math.random() * Math.PI * 2
  return { x, y, vx: Math.cos(angle), vy: Math.sin(angle) }
}

function ensureParticles() {
  const target = Math.max(0, Math.round((props.params.n ?? 1) * 40))
  const w = containerWidth()
  while (particles.length < target) particles.push(spawnParticle(w))
  if (particles.length > target) particles.length = target
}

const hitsPerSec = ref(0)
let hitAccum = 0
let hitTimer = 0

function step(dt: number) {
  ensureParticles()
  const w = containerWidth()
  const leftWall = BOX_LEFT
  const rightWall = BOX_LEFT + w
  const topWall = BOX_TOP
  const bottomWall = BOX_TOP + BOX_H
  const targetSpeed = SPEED_K * Math.sqrt(Math.max(props.params.T ?? 300, 0))

  let hits = 0
  for (const p of particles) {
    const mag = Math.hypot(p.vx, p.vy) || 1
    const scale = targetSpeed / mag
    p.vx *= scale
    p.vy *= scale
    p.x += p.vx * dt
    p.y += p.vy * dt

    if (p.x < leftWall + RADIUS) {
      p.x = leftWall + RADIUS
      p.vx = Math.abs(p.vx)
      hits++
    } else if (p.x > rightWall - RADIUS) {
      p.x = rightWall - RADIUS
      p.vx = -Math.abs(p.vx)
      hits++
    }
    if (p.y < topWall + RADIUS) {
      p.y = topWall + RADIUS
      p.vy = Math.abs(p.vy)
      hits++
    } else if (p.y > bottomWall - RADIUS) {
      p.y = bottomWall - RADIUS
      p.vy = -Math.abs(p.vy)
      hits++
    }
  }

  hitAccum += hits
  hitTimer += dt
  if (hitTimer >= 0.25) {
    const instant = hitAccum / hitTimer
    hitsPerSec.value = hitsPerSec.value * 0.75 + instant * 0.25
    hitAccum = 0
    hitTimer = 0
  }
}

// --- Drawing -------------------------------------------------------------
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = colors.bg
  ctx.fillRect(0, 0, W, H)

  // pressure gauge
  const p = Math.min(Math.max(pressureKPa(), 0), GAUGE_MAX)
  ctx.fillStyle = colors.muted
  ctx.font = '12px ui-monospace, SF Mono, Menlo, monospace'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('pressure gauge (0–2500 kPa)', GAUGE_X, GAUGE_Y - 6)
  ctx.strokeStyle = colors.line
  ctx.lineWidth = 1
  ctx.strokeRect(GAUGE_X, GAUGE_Y, GAUGE_W, GAUGE_H)
  ctx.fillStyle = colors.accent2
  ctx.fillRect(GAUGE_X, GAUGE_Y, GAUGE_W * (p / GAUGE_MAX), GAUGE_H)

  // container (left/top/bottom walls)
  const w = containerWidth()
  const rightWall = BOX_LEFT + w
  ctx.strokeStyle = colors.fg
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(rightWall, BOX_TOP)
  ctx.lineTo(BOX_LEFT, BOX_TOP)
  ctx.lineTo(BOX_LEFT, BOX_TOP + BOX_H)
  ctx.lineTo(rightWall, BOX_TOP + BOX_H)
  ctx.stroke()

  // piston + rod
  ctx.strokeStyle = colors.fg
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(rightWall, BOX_TOP - 6)
  ctx.lineTo(rightWall, BOX_TOP + BOX_H + 6)
  ctx.stroke()
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(rightWall, BOX_TOP + BOX_H / 2)
  ctx.lineTo(rightWall + ROD_W, BOX_TOP + BOX_H / 2)
  ctx.stroke()
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.moveTo(rightWall + ROD_W, BOX_TOP + BOX_H / 2 - 16)
  ctx.lineTo(rightWall + ROD_W, BOX_TOP + BOX_H / 2 + 16)
  ctx.stroke()

  // particles
  ctx.fillStyle = colors.accent
  for (const pt of particles) {
    ctx.beginPath()
    ctx.arc(pt.x, pt.y, RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  // caption
  ctx.fillStyle = colors.muted
  ctx.font = '12px ui-monospace, SF Mono, Menlo, monospace'
  ctx.fillText('Drag the piston to change volume.', BOX_LEFT, BOX_TOP + BOX_H + 26)
}

// --- Animation loop --------------------------------------------------------
let raf = 0
let last = 0
let observer: MutationObserver | null = null

function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  step(dt)
  draw()
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const c = canvas.value
  if (!c) return
  ctx = c.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  c.width = W * dpr
  c.height = H * dpr
  ctx?.scale(dpr, dpr)

  readColors()
  observer = new MutationObserver(readColors)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  ensureParticles()
  last = performance.now()
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})

// --- Drag: horizontal drag on the piston sets V ---------------------------
const dragging = ref(false)
function toLogicalX(e: PointerEvent) {
  const box = canvas.value!.getBoundingClientRect()
  return ((e.clientX - box.left) / box.width) * W
}
function move(e: PointerEvent) {
  if (!dragging.value || !canvas.value) return
  const x = toLogicalX(e)
  const w = Math.max(1, x - BOX_LEFT)
  emit('set', 'V', w / SCALE_V)
}
function down(e: PointerEvent) {
  dragging.value = true
  canvas.value?.setPointerCapture(e.pointerId)
  move(e)
}

const readouts = computed(() => [
  { label: 'P', value: `${fmt(pressureKPa())} kPa`, color: 'var(--accent-2)' },
  { label: 'V', value: `${fmt(props.params.V ?? 0)} L` },
  { label: 'n', value: `${fmt(props.params.n ?? 0)} mol` },
  { label: 'T', value: `${fmt(props.params.T ?? 0)} K` },
  { label: 'wall hits/s', value: fmt(hitsPerSec.value), color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <canvas
      ref="canvas"
      class="block w-full touch-none select-none"
      style="aspect-ratio: 800 / 480"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    />
    <Readouts :items="readouts" />
  </div>
</template>
