<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const layout = computed(() => {
  const r = Math.max(0.05, props.params.r ?? 2)
  const cx = W / 2
  const cy = 148

  const vBudget = 106 // max on-screen radius, px
  const hBudget = W - 100 // width available for the unrolled line, px
  const scale = Math.min(vBudget / r, hBudget / (2 * Math.PI * r))
  const R = r * scale

  const angle = (-50 * Math.PI) / 180
  const handle = { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) }
  const rLabel = { x: cx + (R / 2) * Math.cos(angle), y: cy + (R / 2) * Math.sin(angle) - 8 }

  const circumLen = 2 * Math.PI * r * scale
  const lineY = 340
  const lineX0 = cx - circumLen / 2
  const lineX1 = lineX0 + circumLen

  const fullTicks = Math.floor(2 * Math.PI) // 6 whole radii fit along the circumference
  const ticks = Array.from({ length: fullTicks + 1 }, (_, i) => lineX0 + i * r * scale)

  return {
    r,
    scale,
    cx,
    cy,
    R,
    handle,
    rLabel,
    circumLen,
    lineY,
    lineX0,
    lineX1,
    ticks,
    d: 2 * r,
    C: 2 * Math.PI * r,
    A: Math.PI * r * r,
  }
})

const readouts = computed(() => {
  const { r, d, C, A } = layout.value
  return [
    { label: 'r', value: fmt(r), color: 'var(--accent-2)' },
    { label: 'diameter', value: fmt(d) },
    { label: 'circumference 2πr', value: fmt(C), color: 'var(--accent)' },
    { label: 'area πr²', value: fmt(A), color: 'var(--pos)' },
    { label: 'ratio C/d', value: fmt(C / d, 6) },
  ]
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)

function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sx = ((e.clientX - box.left) / box.width) * W
  const sy = ((e.clientY - box.top) / box.height) * H
  const { cx, cy, scale } = layout.value
  const newR = Math.hypot(sx - cx, sy - cy) / scale
  emit('set', 'r', Math.max(0.05, newR))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragging.value = false
}
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointermove="drag"
      @pointerup="up"
      @pointercancel="up"
    >
      <circle :cx="layout.cx" :cy="layout.cy" :r="layout.R" fill="var(--accent)" fill-opacity="0.05" stroke="var(--fg)" stroke-width="2" />
      <circle :cx="layout.cx" :cy="layout.cy" r="2.5" fill="var(--muted)" />

      <line :x1="layout.cx" :y1="layout.cy" :x2="layout.handle.x" :y2="layout.handle.y" stroke="var(--accent-2)" stroke-width="2" />
      <text class="num" font-size="13" fill="var(--fg)" :x="layout.rLabel.x" :y="layout.rLabel.y" text-anchor="middle">r</text>

      <line
        :x1="layout.handle.x"
        :y1="layout.handle.y"
        :x2="layout.lineX0"
        :y2="layout.lineY"
        stroke="var(--muted)"
        stroke-dasharray="3 4"
      />

      <line :x1="layout.lineX0" :y1="layout.lineY" :x2="layout.lineX1" :y2="layout.lineY" stroke="var(--accent)" stroke-width="3" />
      <template v-for="(t, i) in layout.ticks" :key="i">
        <line :x1="t" :x2="t" :y1="layout.lineY - 8" :y2="layout.lineY + 8" stroke="var(--muted)" />
      </template>
      <line
        :x1="layout.lineX1"
        :x2="layout.lineX1"
        :y1="layout.lineY - 10"
        :y2="layout.lineY + 10"
        stroke="var(--accent-2)"
        stroke-width="2"
      />

      <g class="num" font-size="12" fill="var(--muted)">
        <text :x="layout.lineX0" :y="layout.lineY + 26" text-anchor="middle">0</text>
        <text :x="layout.lineX1" :y="layout.lineY + 26" text-anchor="middle" fill="var(--accent-2)">2πr = {{ fmt(layout.C) }}</text>
      </g>

      <circle
        :cx="layout.handle.x"
        :cy="layout.handle.y"
        r="7"
        fill="var(--panel)"
        stroke="var(--accent-2)"
        stroke-width="2"
        class="cursor-grab"
        @pointerdown="down"
      />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
