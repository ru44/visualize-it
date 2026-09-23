<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A cubic Bezier curve built by repeated linear interpolation (de Casteljau's algorithm).
// P0 and P3 are fixed endpoints; P1 and P2 are draggable control points.
// params: t (progress along the curve, animated), p1x, p1y, p2x, p2y.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const SX = 68
const SY = -60
const OX = 60
const OY = 420
const px = (x: number) => OX + x * SX
const py = (y: number) => OY + y * SY

const P0 = { x: 0.5, y: 1 }
const P3 = { x: 9.5, y: 1 }
const P1 = computed(() => ({ x: props.params.p1x ?? 2.5, y: props.params.p1y ?? 5.5 }))
const P2 = computed(() => ({ x: props.params.p2x ?? 7.5, y: props.params.p2y ?? 5.5 }))
const progress = computed(() => Math.min(1, Math.max(0, props.params.t ?? 0)))

const lerp = (a: { x: number; y: number }, b: { x: number; y: number }, u: number) => ({ x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u })
const bezierAt = (u: number) => {
  const a = lerp(P0, P1.value, u)
  const b = lerp(P1.value, P2.value, u)
  const c = lerp(P2.value, P3, u)
  const d = lerp(a, b, u)
  const e = lerp(b, c, u)
  return { a, b, c, d, e, point: lerp(d, e, u) }
}
const cons = computed(() => bezierAt(progress.value))
const curvePath = computed(() => {
  let d = ''
  for (let i = 0; i <= 60; i++) {
    const u = i / 60
    const p = bezierAt(u).point
    d += (i ? 'L' : 'M') + px(p.x).toFixed(1) + ',' + py(p.y).toFixed(1)
  }
  return d
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    if (!last) last = now
    const dt = Math.min(now - last, 50) / 1000
    last = now
    let v = progress.value + dt * 0.35
    if (v >= 1) v = 0
    emit('set', 't', v)
  } else last = 0
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: 't', value: fmt(progress.value, 2), color: 'var(--accent)' },
  { label: t('bezier.point'), value: `(${fmt(cons.value.point.x, 2)}, ${fmt(cons.value.point.y, 2)})`, color: 'var(--accent-2)' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref<'p1' | 'p2' | null>(null)
function toPlot(e: PointerEvent) {
  if (!svg.value) return { x: 0, y: 0 }
  const box = svg.value.getBoundingClientRect()
  const sxp = ((e.clientX - box.left) / box.width) * W
  const syp = ((e.clientY - box.top) / box.height) * H
  return { x: (sxp - OX) / SX, y: (syp - OY) / SY }
}
function move(e: PointerEvent) {
  if (!dragging.value) return
  const p = toPlot(e)
  emit('set', dragging.value === 'p1' ? 'p1x' : 'p2x', Math.max(0, Math.min(10, p.x)))
  emit('set', dragging.value === 'p1' ? 'p1y' : 'p2y', Math.max(0, Math.min(6, p.y)))
}
function down(which: 'p1' | 'p2', e: PointerEvent) {
  dragging.value = which
  svg.value?.setPointerCapture(e.pointerId)
}
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="emit('set', 't', 0)">{{ t('bezier.reset') }}</button>
    </div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="move" @pointerup="dragging = null" @pointercancel="dragging = null">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('bezier.hint') }}</text>
      <line :x1="px(0)" :y1="py(0)" :x2="px(10)" :y2="py(0)" stroke="var(--line)" />

      <path :d="curvePath" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />

      <g stroke="var(--line)" stroke-dasharray="4 4"><line :x1="px(P0.x)" :y1="py(P0.y)" :x2="px(P1.x)" :y2="py(P1.y)" /><line :x1="px(P1.x)" :y1="py(P1.y)" :x2="px(P2.x)" :y2="py(P2.y)" /><line :x1="px(P2.x)" :y1="py(P2.y)" :x2="px(P3.x)" :y2="py(P3.y)" /></g>
      <g stroke="var(--muted)" stroke-width="1.5"><line :x1="px(cons.a.x)" :y1="py(cons.a.y)" :x2="px(cons.b.x)" :y2="py(cons.b.y)" /><line :x1="px(cons.b.x)" :y1="py(cons.b.y)" :x2="px(cons.c.x)" :y2="py(cons.c.y)" /></g>
      <line :x1="px(cons.d.x)" :y1="py(cons.d.y)" :x2="px(cons.e.x)" :y2="py(cons.e.y)" stroke="var(--accent)" stroke-width="2" />

      <circle :cx="px(P0.x)" :cy="py(P0.y)" r="5" fill="var(--fg)" />
      <circle :cx="px(P3.x)" :cy="py(P3.y)" r="5" fill="var(--fg)" />
      <circle :cx="px(P1.x)" :cy="py(P1.y)" r="7" fill="var(--panel)" stroke="var(--muted)" stroke-width="2" class="cursor-grab" @pointerdown="down('p1', $event)" />
      <circle :cx="px(P2.x)" :cy="py(P2.y)" r="7" fill="var(--panel)" stroke="var(--muted)" stroke-width="2" class="cursor-grab" @pointerdown="down('p2', $event)" />
      <circle v-for="(pt, i) in [cons.a, cons.b, cons.c]" :key="i" :cx="px(pt.x)" :cy="py(pt.y)" r="4" fill="var(--muted)" />
      <circle :cx="px(cons.d.x)" :cy="py(cons.d.y)" r="4" fill="var(--accent)" />
      <circle :cx="px(cons.e.x)" :cy="py(cons.e.y)" r="4" fill="var(--accent)" />
      <circle :cx="px(cons.point.x)" :cy="py(cons.point.y)" r="7" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
