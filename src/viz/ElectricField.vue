<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PX = 100 // pixels per metre
const OX = W / 2
const OY = H / 2
const K = 8.99e9

const sx = (x: number) => OX + x * PX
const sy = (y: number) => OY - y * PX
const wx = (gx: number) => (gx - OX) / PX
const wy = (gy: number) => (OY - gy) / PX

const q1 = computed(() => props.params.q1 ?? 2)
const q2 = computed(() => props.params.q2 ?? -2)
const d = computed(() => props.params.d ?? 3)
const px = computed(() => props.params.px ?? 0.5)
const py = computed(() => props.params.py ?? 1.2)

const pos1 = computed<[number, number]>(() => [-d.value / 2, 0])
const pos2 = computed<[number, number]>(() => [d.value / 2, 0])

function fieldFrom(qC: number, from: [number, number], x: number, y: number): [number, number] {
  const dx = x - from[0]
  const dy = y - from[1]
  const r2 = Math.max(dx * dx + dy * dy, 1e-4)
  const r = Math.sqrt(r2)
  const mag = (K * qC) / r2
  return [mag * (dx / r), mag * (dy / r)]
}

function eAt(x: number, y: number) {
  const [e1x, e1y] = fieldFrom(q1.value * 1e-6, pos1.value, x, y)
  const [e2x, e2y] = fieldFrom(q2.value * 1e-6, pos2.value, x, y)
  return { ex: e1x + e2x, ey: e1y + e2y, e1x, e1y, e2x, e2y }
}

const testField = computed(() => eAt(px.value, py.value))
const eMag = computed(() => Math.hypot(testField.value.ex, testField.value.ey))

const QT = 1e-6 // test charge, +1 µC
const forceNet = computed<[number, number]>(() => [QT * testField.value.ex, QT * testField.value.ey])
const force1 = computed<[number, number]>(() => [QT * testField.value.e1x, QT * testField.value.e1y])
const force2 = computed<[number, number]>(() => [QT * testField.value.e2x, QT * testField.value.e2y])

const forceBetween = computed(() => {
  const r = Math.max(d.value, 1e-3)
  return (K * q1.value * 1e-6 * q2.value * 1e-6) / (r * r)
})
const interactionLabel = computed(() => (q1.value * q2.value >= 0 ? 'repel' : 'attract'))

function dist(from: [number, number], x: number, y: number) {
  return Math.max(Math.hypot(x - from[0], y - from[1]), 1e-3)
}
const potential = computed(
  () => (K * q1.value * 1e-6) / dist(pos1.value, px.value, py.value) + (K * q2.value * 1e-6) / dist(pos2.value, px.value, py.value),
)

const arrows = computed(() => {
  const out: { x1: number; y1: number; x2: number; y2: number; op: number }[] = []
  for (let gx = 20; gx <= W - 20; gx += 40) {
    for (let gy = 20; gy <= H - 20; gy += 40) {
      const { ex, ey } = eAt(wx(gx), wy(gy))
      const mag = Math.hypot(ex, ey)
      if (!Number.isFinite(mag) || mag < 1e-6) continue
      const ux = ex / mag
      const uy = -ey / mag // screen y is flipped
      const len = 13
      const op = Math.max(0.06, Math.min(0.85, (Math.log10(mag) - 2) / 4.2))
      out.push({ x1: gx - (ux * len) / 2, y1: gy - (uy * len) / 2, x2: gx + (ux * len) / 2, y2: gy + (uy * len) / 2, op })
    }
  }
  return out
})

function unit(v: [number, number]): [number, number] {
  const m = Math.hypot(v[0], v[1]) || 1e-9
  return [v[0] / m, v[1] / m]
}
function vec(from: [number, number], v: [number, number], len: number) {
  const [ux, uy] = unit(v)
  return { x1: sx(from[0]), y1: sy(from[1]), x2: sx(from[0]) + ux * len, y2: sy(from[1]) - uy * len }
}

const netArrow = computed(() => vec([px.value, py.value], forceNet.value, 70))
const f1Arrow = computed(() => vec([px.value, py.value], force1.value, 44))
const f2Arrow = computed(() => vec([px.value, py.value], force2.value, 44))

const chargeR = (q: number) => 12 + 5 * Math.sqrt(Math.abs(q))

let dragging = false
function toWorld(e: PointerEvent, el: SVGSVGElement): [number, number] {
  const r = el.getBoundingClientRect()
  const gx = ((e.clientX - r.left) / r.width) * W
  const gy = ((e.clientY - r.top) / r.height) * H
  return [wx(gx), wy(gy)]
}
function down(e: PointerEvent) {
  dragging = true
  ;(e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId)
  drag(e)
}
function drag(e: PointerEvent) {
  if (!dragging) return
  const [x, y] = toWorld(e, e.currentTarget as SVGSVGElement)
  emit('set', 'px', Math.max(-4, Math.min(4, x)))
  emit('set', 'py', Math.max(-2.4, Math.min(2.4, y)))
}
function up() {
  dragging = false
}

const readouts = computed(() => [
  { label: '|E| at point', value: `${fmt(eMag.value)} N/C` },
  { label: 'force on test charge', value: `${fmt(Math.hypot(...forceNet.value))} N`, color: 'var(--accent-2)' },
  { label: 'force between charges', value: `${fmt(Math.abs(forceBetween.value))} N (${interactionLabel.value})` },
  { label: 'potential V at point', value: `${fmt(potential.value)} V` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="drag" @pointerup="up" @pointercancel="up">
      <line :x1="0" :y1="OY" :x2="W" :y2="OY" stroke="var(--grid)" stroke-width="1" />
      <line :x1="OX" :y1="0" :x2="OX" :y2="H" stroke="var(--grid)" stroke-width="1" />

      <line v-for="(a, i) in arrows" :key="i" :x1="a.x1" :y1="a.y1" :x2="a.x2" :y2="a.y2" stroke="var(--fg)" :stroke-opacity="a.op" stroke-width="1.4" stroke-linecap="round" />

      <line :x1="f1Arrow.x1" :y1="f1Arrow.y1" :x2="f1Arrow.x2" :y2="f1Arrow.y2" stroke="var(--muted)" stroke-width="1.4" />
      <line :x1="f2Arrow.x1" :y1="f2Arrow.y1" :x2="f2Arrow.x2" :y2="f2Arrow.y2" stroke="var(--muted)" stroke-width="1.4" />
      <line :x1="netArrow.x1" :y1="netArrow.y1" :x2="netArrow.x2" :y2="netArrow.y2" stroke="var(--accent-2)" stroke-width="2.5" stroke-linecap="round" />
      <circle :cx="netArrow.x2" :cy="netArrow.y2" r="3.5" fill="var(--accent-2)" />

      <circle :cx="sx(pos1[0])" :cy="sy(pos1[1])" :r="chargeR(q1)" :fill="q1 >= 0 ? 'var(--neg)' : 'var(--accent)'" />
      <text class="num" :x="sx(pos1[0])" :y="sy(pos1[1]) + 4" text-anchor="middle" font-size="13" fill="var(--bg)">{{ q1 >= 0 ? '+' : '−' }}</text>
      <text class="num" :x="sx(pos1[0])" :y="sy(pos1[1]) - chargeR(q1) - 6" text-anchor="middle" font-size="12" fill="var(--muted)">q1</text>

      <circle :cx="sx(pos2[0])" :cy="sy(pos2[1])" :r="chargeR(q2)" :fill="q2 >= 0 ? 'var(--neg)' : 'var(--accent)'" />
      <text class="num" :x="sx(pos2[0])" :y="sy(pos2[1]) + 4" text-anchor="middle" font-size="13" fill="var(--bg)">{{ q2 >= 0 ? '+' : '−' }}</text>
      <text class="num" :x="sx(pos2[0])" :y="sy(pos2[1]) - chargeR(q2) - 6" text-anchor="middle" font-size="12" fill="var(--muted)">q2</text>

      <circle :cx="sx(px)" :cy="sy(py)" r="7" fill="var(--fg)" stroke="var(--bg)" stroke-width="1.5" />
      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">drag the black test charge · arrows show field direction, faint = weak</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
