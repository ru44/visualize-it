<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

// Unit circle occupies the left ~45% of the canvas.
const cx = 180
const cy = 240
const R = 150

// Sin/cos vs. theta graphs occupy the right ~55%. They share the circle's
// vertical scale (cy, R) so the dashed "unrolling" connector lines up exactly.
const gx0 = 400
const gx1 = 780

const theta = computed(() => props.params.theta ?? 0)
const rad = computed(() => (theta.value * Math.PI) / 180)

const px = computed(() => cx + R * Math.cos(rad.value))
const py = computed(() => cy - R * Math.sin(rad.value))

function sxg(deg: number) {
  return gx0 + (deg / 360) * (gx1 - gx0)
}
function invSxg(x: number) {
  return Math.max(0, Math.min(360, ((x - gx0) / (gx1 - gx0)) * 360))
}

const sinDot = computed(() => ({ x: sxg(theta.value), y: cy - R * Math.sin(rad.value) }))
const cosDot = computed(() => ({ x: sxg(theta.value), y: cy - R * Math.cos(rad.value) }))

function buildWave(fn: (rad: number) => number) {
  let d = ''
  for (let deg = 0; deg <= 360; deg += 2) {
    const x = sxg(deg)
    const y = cy - R * fn((deg * Math.PI) / 180)
    d += (deg === 0 ? 'M' : 'L') + x + ',' + y + ' '
  }
  return d.trim()
}
const sinPath = computed(() => buildWave(Math.sin))
const cosPath = computed(() => buildWave(Math.cos))

const arcR = 30
const arcPath = computed(() => {
  const t = theta.value
  if (t <= 0.0001) return ''
  const startX = cx + arcR
  const startY = cy
  const endX = cx + arcR * Math.cos(rad.value)
  const endY = cy - arcR * Math.sin(rad.value)
  const largeArc = t > 180 ? 1 : 0
  return `M ${startX} ${startY} A ${arcR} ${arcR} 0 ${largeArc} 1 ${endX} ${endY}`
})

const tanTheta = computed(() => {
  const c = Math.cos(rad.value)
  return Math.abs(c) < 1e-6 ? null : Math.tan(rad.value)
})

const readouts = computed(() => [
  { label: 'θ (degrees)', value: fmt(theta.value, 1) + '°' },
  { label: 'θ (radians)', value: fmt(rad.value, 4) },
  { label: 'sin θ', value: fmt(Math.sin(rad.value), 4), color: 'var(--pos)' },
  { label: 'cos θ', value: fmt(Math.cos(rad.value), 4), color: 'var(--accent)' },
  { label: 'tan θ', value: tanTheta.value === null ? '—' : fmt(tanTheta.value, 4) },
])

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function angleAt(clientX: number, clientY: number) {
  if (!svg.value) return theta.value
  const box = svg.value.getBoundingClientRect()
  const x = ((clientX - box.left) / box.width) * W
  const y = ((clientY - box.top) / box.height) * H
  if (x < 360) {
    let deg = (Math.atan2(-(y - cy), x - cx) * 180) / Math.PI
    deg = ((deg % 360) + 360) % 360
    return deg
  }
  return invSxg(x)
}
function drag(e: PointerEvent) {
  if (!dragging.value) return
  emit('set', 'theta', angleAt(e.clientX, e.clientY))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
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
      <!-- unit circle -->
      <line x1="20" x2="340" :y1="cy" :y2="cy" stroke="var(--muted)" />
      <line :x1="cx" :x2="cx" y1="80" y2="400" stroke="var(--muted)" />
      <circle :cx="cx" :cy="cy" :r="R" fill="none" stroke="var(--line)" stroke-width="1.5" />

      <path v-if="arcPath" :d="arcPath" fill="none" stroke="var(--muted)" stroke-width="1.5" />

      <line :x1="cx" :y1="cy" :x2="px" :y2="cy" stroke="var(--accent)" stroke-width="2" />
      <line :x1="px" :y1="cy" :x2="px" :y2="py" stroke="var(--pos)" stroke-width="2" />
      <line :x1="cx" :y1="cy" :x2="px" :y2="py" stroke="var(--fg)" stroke-width="1.5" />

      <circle :cx="px" :cy="py" r="6" fill="var(--fg)" />

      <text class="num" :x="cx + (px - cx) / 2" :y="cy - 8" text-anchor="middle" font-size="12" fill="var(--accent)">cos θ</text>
      <text class="num" :x="px + 10" :y="cy + (py - cy) / 2" font-size="12" fill="var(--pos)">sin θ</text>

      <!-- wave graphs -->
      <g class="num" font-size="12" fill="var(--muted)">
        <line :x1="gx0" :x2="gx1" :y1="cy" :y2="cy" stroke="var(--muted)" />
        <line :x1="gx0" :x2="gx0" :y1="cy - R" :y2="cy + R" stroke="var(--muted)" />
        <template v-for="d in [90, 180, 270, 360]" :key="`t${d}`">
          <line :x1="sxg(d)" :x2="sxg(d)" :y1="cy - R" :y2="cy + R" stroke="var(--grid)" />
          <text :x="sxg(d)" :y="cy + R + 16" text-anchor="middle">{{ d }}°</text>
        </template>
        <text :x="gx0 - 8" :y="cy - R + 4" text-anchor="end">1</text>
        <text :x="gx0 - 8" :y="cy + 4" text-anchor="end">0</text>
        <text :x="gx0 - 8" :y="cy + R + 4" text-anchor="end">-1</text>
      </g>

      <line :x1="sxg(theta)" :x2="sxg(theta)" :y1="cy - R" :y2="cy + R" stroke="var(--grid)" stroke-width="2" />

      <path :d="cosPath" fill="none" stroke="var(--accent)" stroke-width="2" />
      <path :d="sinPath" fill="none" stroke="var(--pos)" stroke-width="2" />

      <line :x1="px" :y1="py" :x2="sinDot.x" :y2="sinDot.y" stroke="var(--fg)" stroke-dasharray="3 3" />

      <circle :cx="sinDot.x" :cy="sinDot.y" r="5" fill="var(--pos)" />
      <circle :cx="cosDot.x" :cy="cosDot.y" r="5" fill="var(--accent)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
