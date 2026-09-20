<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PX_PER_M = 40
const MARGIN = 60
const GROUND_Y = 380

const F = computed(() => props.params.F ?? 10)
const m = computed(() => props.params.m ?? 2)
const a = computed(() => F.value / Math.max(m.value, 1e-6))

const sideLenPx = computed(() => Math.max(10, Math.cbrt(Math.max(m.value, 0.001)) * 18))

const t = ref(0)
const v = ref(0)
const xM = ref(0)

let raf = 0
let last = 0

function resetSim() {
  t.value = 0
  v.value = 0
  xM.value = 0
  last = 0
}

function step(now: number) {
  if (!last) last = now
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  t.value += dt
  v.value = a.value * t.value
  xM.value = 0.5 * a.value * t.value * t.value
  const rightEdgePx = MARGIN + xM.value * PX_PER_M + sideLenPx.value
  if (rightEdgePx > W) resetSim()
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  raf = requestAnimationFrame(step)
})
onUnmounted(() => cancelAnimationFrame(raf))

watch([F, m], () => resetSim())

const blockX = computed(() => MARGIN + xM.value * PX_PER_M)
const blockY = computed(() => GROUND_Y - sideLenPx.value)

const ticks = computed(() => {
  const n = Math.floor((W - MARGIN) / PX_PER_M)
  return Array.from({ length: n + 1 }, (_, i) => i)
})

const forceArrow = computed(() => {
  const len = Math.min(Math.max(F.value, 0) * 3, 260)
  const y = blockY.value + sideLenPx.value / 2
  const x2 = blockX.value
  const x1 = x2 - len
  return { x1, y1: y, x2, y2: y }
})

const accelArrow = computed(() => {
  const len = Math.min(Math.max(a.value, 0) * 16, 260)
  const y = Math.max(20, blockY.value - 24)
  const x1 = blockX.value + sideLenPx.value / 2
  const x2 = x1 + len
  return { x1, y1: y, x2, y2: y }
})

function headPoints(x2: number, y2: number) {
  return `${x2},${y2} ${x2 - 8},${y2 - 5} ${x2 - 8},${y2 + 5}`
}

const readouts = computed(() => [
  { label: 'force F', value: fmt(F.value) + ' N', color: 'var(--accent-2)' },
  { label: 'mass m', value: fmt(m.value) + ' kg' },
  { label: 'acceleration a = F/m', value: fmt(a.value) + ' m/s²', color: 'var(--pos)' },
  { label: 'velocity v', value: fmt(v.value) + ' m/s' },
  { label: 'time t', value: fmt(t.value) + ' s' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  emit('set', 'F', Math.max(0, Math.min(50, (px / W) * 50)))
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
      <line x1="0" :x2="W" :y1="GROUND_Y" :y2="GROUND_Y" stroke="var(--fg)" stroke-width="1.5" />
      <g stroke="var(--grid)">
        <line v-for="i in ticks" :key="i" :x1="MARGIN + i * PX_PER_M" :x2="MARGIN + i * PX_PER_M" :y1="GROUND_Y" :y2="GROUND_Y + 8" />
      </g>

      <rect :x="blockX" :y="blockY" :width="sideLenPx" :height="sideLenPx" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />

      <line v-bind="forceArrow" stroke="var(--accent-2)" stroke-width="2.5" />
      <polygon :points="headPoints(forceArrow.x2, forceArrow.y2)" fill="var(--accent-2)" />

      <line v-bind="accelArrow" stroke="var(--pos)" stroke-width="2" />
      <polygon :points="headPoints(accelArrow.x2, accelArrow.y2)" fill="var(--pos)" />

      <text class="num" :x="forceArrow.x1" :y="forceArrow.y1 - 8" font-size="12" fill="var(--accent-2)">F</text>
      <text class="num" :x="accelArrow.x1" :y="accelArrow.y1 - 8" font-size="12" fill="var(--pos)">a</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
