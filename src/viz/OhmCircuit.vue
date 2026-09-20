<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

// --- Loop geometry -------------------------------------------------------
// Rectangular loop: left edge carries the battery, top edge carries the
// zig-zag resistor, right + bottom edges are plain wire.
const LEFT = 150
const RIGHT = 650
const TOP = 100
const BOTTOM = 380
const BAT_TOP = 225 // + terminal
const BAT_BOT = 255 // - terminal
const RES_X0 = 260
const RES_X1 = 560
const RES_AMP = 20

function zigzag(x0: number, x1: number, y: number, amp: number, teeth: number) {
  const pts: { x: number; y: number }[] = []
  const step = (x1 - x0) / teeth
  for (let i = 1; i < teeth; i++) {
    pts.push({ x: x0 + i * step, y: i % 2 === 1 ? y - amp : y + amp })
  }
  return pts
}

const resistorInner = zigzag(RES_X0, RES_X1, TOP, RES_AMP, 6)
const resistorPath = [{ x: RES_X0, y: TOP }, ...resistorInner, { x: RES_X1, y: TOP }]
  .map((p) => `${p.x},${p.y}`)
  .join(' ')

// Full conventional-current loop: + terminal -> top wire -> resistor -> top-right
// corner -> right edge -> bottom edge -> back up to - terminal -> (through the
// battery) -> + terminal again.
const loopPoints: { x: number; y: number }[] = [
  { x: LEFT, y: BAT_TOP },
  { x: LEFT, y: TOP },
  { x: RES_X0, y: TOP },
  ...resistorInner,
  { x: RES_X1, y: TOP },
  { x: RIGHT, y: TOP },
  { x: RIGHT, y: BOTTOM },
  { x: LEFT, y: BOTTOM },
  { x: LEFT, y: BAT_BOT },
  { x: LEFT, y: BAT_TOP },
]

const segLengths: number[] = []
let totalLength = 0
for (let i = 0; i < loopPoints.length - 1; i++) {
  const a = loopPoints[i]
  const b = loopPoints[i + 1]
  const d = Math.hypot(b.x - a.x, b.y - a.y)
  segLengths.push(d)
  totalLength += d
}
const cumLengths: number[] = [0]
for (const d of segLengths) cumLengths.push(cumLengths[cumLengths.length - 1] + d)

function pointAtLength(s: number) {
  let t = s % totalLength
  if (t < 0) t += totalLength
  for (let i = 0; i < segLengths.length; i++) {
    if (t <= cumLengths[i + 1] || i === segLengths.length - 1) {
      const a = loopPoints[i]
      const b = loopPoints[i + 1]
      const segLen = segLengths[i] || 1
      const frac = Math.min(1, Math.max(0, (t - cumLengths[i]) / segLen))
      return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac }
    }
  }
  return loopPoints[0]
}

// --- Electrical quantities -------------------------------------------------
const current = computed(() => (props.params.V ?? 0) / Math.max(props.params.R ?? 1, 0.01))
const power = computed(() => (props.params.V ?? 0) * current.value)

const glow = computed(() => {
  const f = Math.min(Math.max(power.value / 60, 0), 1)
  return { width: 3 + f * 5, opacity: 0.7 + f * 0.3 }
})

// --- Animated current dots --------------------------------------------------
const DOT_COUNT = 24
const baseOffsets = Array.from({ length: DOT_COUNT }, (_, i) => (i * totalLength) / DOT_COUNT)
const dots = ref<{ x: number; y: number }[]>(baseOffsets.map((o) => pointAtLength(o)))

let raf = 0
let last = 0
let distance = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const speed = Math.min(current.value * 150, 600)
  distance = (distance + speed * dt) % totalLength
  dots.value = baseOffsets.map((o) => pointAtLength(distance + o))
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  last = performance.now()
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

// --- Drag: vertical drag sets V (top = 24, bottom = 0) --------------------
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height))
  emit('set', 'V', 24 * (1 - frac))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => [
  { label: 'V', value: `${fmt(props.params.V ?? 0)} V` },
  { label: 'R', value: `${fmt(props.params.R ?? 0)} Ω` },
  { label: 'I = V/R', value: `${fmt(current.value)} A`, color: 'var(--accent-2)' },
  { label: 'P = VI', value: `${fmt(power.value)} W`, color: 'var(--accent)' },
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
      <!-- wires -->
      <line :x1="LEFT" :y1="TOP" :x2="RES_X0" :y2="TOP" stroke="var(--fg)" stroke-width="2" />
      <line :x1="RES_X1" :y1="TOP" :x2="RIGHT" :y2="TOP" stroke="var(--fg)" stroke-width="2" />
      <line :x1="RIGHT" :y1="TOP" :x2="RIGHT" :y2="BOTTOM" stroke="var(--fg)" stroke-width="2" />
      <line :x1="RIGHT" :y1="BOTTOM" :x2="LEFT" :y2="BOTTOM" stroke="var(--fg)" stroke-width="2" />
      <line :x1="LEFT" :y1="BOTTOM" :x2="LEFT" :y2="BAT_BOT" stroke="var(--fg)" stroke-width="2" />
      <line :x1="LEFT" :y1="TOP" :x2="LEFT" :y2="BAT_TOP" stroke="var(--fg)" stroke-width="2" />

      <!-- resistor zig-zag -->
      <polyline
        :points="resistorPath"
        fill="none"
        stroke="var(--accent)"
        :stroke-width="glow.width"
        :stroke-opacity="glow.opacity"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <text :x="(RES_X0 + RES_X1) / 2" :y="TOP - 34" text-anchor="middle" class="num" font-size="14" fill="var(--fg)">R</text>

      <!-- battery symbol: long thin line = +, short thick line = - -->
      <line :x1="LEFT - 22" :y1="BAT_TOP" :x2="LEFT + 22" :y2="BAT_TOP" stroke="var(--fg)" stroke-width="2" />
      <line :x1="LEFT - 13" :y1="BAT_BOT" :x2="LEFT + 13" :y2="BAT_BOT" stroke="var(--fg)" stroke-width="6" />
      <text :x="LEFT - 60" :y="(BAT_TOP + BAT_BOT) / 2 + 5" text-anchor="middle" class="num" font-size="14" fill="var(--fg)">V</text>
      <text :x="LEFT - 34" :y="BAT_TOP - 4" text-anchor="middle" class="num" font-size="12" fill="var(--muted)">+</text>
      <text :x="LEFT - 34" :y="BAT_BOT + 14" text-anchor="middle" class="num" font-size="12" fill="var(--muted)">−</text>

      <!-- current dots -->
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" r="4" fill="var(--accent-2)" />

      <text :x="W / 2" :y="H - 14" text-anchor="middle" class="num" font-size="12" fill="var(--muted)">
        Conceptual model: dots show the direction and relative size of current, not literal electron motion.
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
