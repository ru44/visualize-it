<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two points on a 0..10 map grid: their straight-line distance, midpoint, and the equation of the
// road (line) between them. params x1, y1, x2, y2.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const U = 40
const ORIGIN = { x: 200, y: 440 }
const N = 10
const sx = (v: number) => ORIGIN.x + v * U
const sy = (v: number) => ORIGIN.y - v * U
const clamp = (v: number) => Math.min(N, Math.max(0, v))

const x1 = computed(() => clamp(props.params.x1 ?? 1))
const y1 = computed(() => clamp(props.params.y1 ?? 1))
const x2 = computed(() => clamp(props.params.x2 ?? 5))
const y2 = computed(() => clamp(props.params.y2 ?? 4))

const P1 = computed(() => ({ x: sx(x1.value), y: sy(y1.value) }))
const P2 = computed(() => ({ x: sx(x2.value), y: sy(y2.value) }))
const dist = computed(() => Math.hypot(x2.value - x1.value, y2.value - y1.value))
const mid = computed(() => ({ x: (x1.value + x2.value) / 2, y: (y1.value + y2.value) / 2 }))
const slope = computed(() => (Math.abs(x2.value - x1.value) < 1e-6 ? null : (y2.value - y1.value) / (x2.value - x1.value)))
const intercept = computed(() => (slope.value === null ? null : y1.value - slope.value * x1.value))
const lineLabel = computed(() => {
  if (slope.value === null) return `x = ${fmt(x1.value, 2)}`
  return `y = ${fmt(slope.value, 2)}x ${intercept.value! >= 0 ? '+' : '−'} ${fmt(Math.abs(intercept.value!), 2)}`
})

// Extend the line through both points to the edges of the 0..10 grid, for the "road" line.
const extended = computed(() => {
  if (slope.value === null) return { x1: sx(x1.value), y1: sy(0), x2: sx(x1.value), y2: sy(N) }
  const yAt0 = intercept.value!
  const yAtN = slope.value * N + intercept.value!
  return { x1: sx(0), y1: sy(yAt0), x2: sx(N), y2: sy(yAtN) }
})

const readouts = computed(() => [
  { label: t('coordinate-plane.distance'), value: `${fmt(dist.value, 2)} km`, color: 'var(--fg)' },
  { label: t('coordinate-plane.midpoint'), value: `(${fmt(mid.value.x, 2)}, ${fmt(mid.value.y, 2)})`, color: 'var(--pos)' },
  { label: t('coordinate-plane.slope'), value: slope.value === null ? t('coordinate-plane.vertical') : fmt(slope.value, 3) },
  { label: t('coordinate-plane.line'), value: lineLabel.value, color: 'var(--accent)' },
])

const svg = ref<SVGSVGElement>()
const dragTarget = ref<1 | 2 | null>(null)
function drag(e: PointerEvent) {
  if (!dragTarget.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const py = ((e.clientY - box.top) / box.height) * H
  const vx = clamp((px - ORIGIN.x) / U)
  const vy = clamp((ORIGIN.y - py) / U)
  if (dragTarget.value === 1) {
    emit('set', 'x1', vx)
    emit('set', 'y1', vy)
  } else {
    emit('set', 'x2', vx)
    emit('set', 'y2', vy)
  }
}
function down(which: 1 | 2, e: PointerEvent) {
  dragTarget.value = which
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragTarget.value = null
}
const grid = Array.from({ length: N + 1 }, (_, i) => i)
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="drag" @pointerup="up" @pointercancel="up">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('coordinate-plane.hint') }}</text>

      <g stroke="var(--line)" stroke-width="1">
        <line v-for="i in grid" :key="'v' + i" :x1="sx(i)" :y1="sy(0)" :x2="sx(i)" :y2="sy(N)" />
        <line v-for="i in grid" :key="'h' + i" :x1="sx(0)" :y1="sy(i)" :x2="sx(N)" :y2="sy(i)" />
      </g>
      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(N)" :y2="sy(0)" stroke="var(--fg)" stroke-width="2" />
      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(0)" :y2="sy(N)" stroke="var(--fg)" stroke-width="2" />
      <g class="num" font-size="11" fill="var(--muted)">
        <text v-for="i in [0, 5, 10]" :key="'xt' + i" :x="sx(i)" :y="sy(0) + 16" text-anchor="middle">{{ i }}</text>
        <text v-for="i in [0, 5, 10]" :key="'yt' + i" :x="sx(0) - 12" :y="sy(i) + 4" text-anchor="end">{{ i }}</text>
      </g>

      <line :x1="extended.x1" :y1="extended.y1" :x2="extended.x2" :y2="extended.y2" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 5" />
      <line :x1="P1.x" :y1="P1.y" :x2="P2.x" :y2="P2.y" stroke="var(--fg)" stroke-width="2.5" />

      <circle :cx="sx(mid.x)" :cy="sy(mid.y)" r="5" fill="var(--pos)" />
      <text class="num" :x="sx(mid.x) + 10" :y="sy(mid.y) - 8" font-size="12" fill="var(--pos)">{{ t('coordinate-plane.midpoint') }}</text>

      <circle :cx="P1.x" :cy="P1.y" r="8" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" class="cursor-grab" @pointerdown="down(1, $event)" />
      <circle :cx="P2.x" :cy="P2.y" r="8" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" class="cursor-grab" @pointerdown="down(2, $event)" />
      <text class="num" :x="P1.x + 12" :y="P1.y - 10" font-size="12" fill="var(--accent-2)">({{ fmt(x1, 1) }}, {{ fmt(y1, 1) }})</text>
      <text class="num" :x="P2.x + 12" :y="P2.y - 10" font-size="12" fill="var(--accent)">({{ fmt(x2, 1) }}, {{ fmt(y2, 1) }})</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
