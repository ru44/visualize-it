<script setup lang="ts">
import { computed, ref } from 'vue'
import { scaleLinear } from 'd3-scale'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

// A straight line f(x) = mx + b, its inverse f^{-1}, and the y = x mirror line, all drawn on a
// square area so the reflection is a true 45°. Dragging moves the point (x, f(x)) on f; its
// mirror image (f(x), x) sits on f^{-1} by construction.
interface InvOptions {
  domain: [number, number]
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 20
const SIZE = H - PAD * 2
const X0 = (W - SIZE) / 2

const o = computed(() => props.options as InvOptions)
const scale = computed(() => scaleLinear().domain(o.value.domain).range([0, SIZE]))

const sx = (v: number) => X0 + scale.value(v)
const sy = (v: number) => PAD + SIZE - scale.value(v)

const m = computed(() => {
  const v = props.params.m ?? 1
  return Math.abs(v) < 0.05 ? (v < 0 ? -0.05 : 0.05) : v
})
const b = computed(() => props.params.b ?? 0)
const x = computed(() => props.params.x ?? 0)

const f = (v: number) => m.value * v + b.value
const finv = (v: number) => (v - b.value) / m.value

/** A straight segment across the whole (square) domain. */
function seg(fn: (v: number) => number) {
  const [d0, d1] = o.value.domain
  return { x1: sx(d0), y1: sy(fn(d0)), x2: sx(d1), y2: sy(fn(d1)) }
}

const fLine = computed(() => seg(f))
const invLine = computed(() => seg(finv))
const diag = computed(() => seg((v) => v))

const A = computed(() => ({ x: sx(x.value), y: sy(f(x.value)) }))
const B = computed(() => ({ x: sx(f(x.value)), y: sy(x.value) }))

const readouts = computed(() => [
  { label: 'x', value: fmt(x.value) },
  { label: 'f(x)', value: fmt(f(x.value)), color: 'var(--accent)' },
  { label: 'f⁻¹(f(x))', value: fmt(finv(f(x.value))), color: 'var(--accent-2)' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function toX(e: PointerEvent) {
  const box = svg.value!.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  return scale.value.invert(px - X0)
}
function drag(e: PointerEvent) {
  if (!dragging.value) return
  emit('set', 'x', toX(e))
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
      class="block w-full cursor-crosshair touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="tk in scale.ticks(6)" :key="tk">
          <line :x1="sx(tk)" :x2="sx(tk)" :y1="PAD" :y2="PAD + SIZE" stroke="var(--grid)" />
          <line :x1="X0" :x2="X0 + SIZE" :y1="sy(tk)" :y2="sy(tk)" stroke="var(--grid)" />
        </template>
      </g>
      <rect :x="X0" :y="PAD" :width="SIZE" :height="SIZE" fill="none" stroke="var(--line)" />

      <line v-bind="diag" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4" />
      <text :x="diag.x2 - 22" :y="diag.y2 - 8" font-size="12" fill="var(--muted)">y = x</text>

      <line v-bind="fLine" stroke="var(--accent)" stroke-width="2.5" />
      <text :x="fLine.x2 - 18" :y="fLine.y2 + 16" font-size="13" fill="var(--accent)">f</text>

      <line v-bind="invLine" stroke="var(--accent-2)" stroke-width="2.5" />
      <text :x="invLine.x2 - 18" :y="invLine.y2 - 8" font-size="13" fill="var(--accent-2)">f⁻¹</text>

      <line :x1="A.x" :y1="A.y" :x2="B.x" :y2="B.y" stroke="var(--muted)" stroke-dasharray="3 3" />
      <circle :cx="A.x" :cy="A.y" r="7" fill="var(--accent)" />
      <circle :cx="B.x" :cy="B.y" r="6" fill="var(--bg)" stroke="var(--accent-2)" stroke-width="2.5" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
