<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { makeFn, derivativeExpr, numericSlope, riemannSamples, riemannSum, integrate, estimateLimit, fmt } from '../engine/math'
import type { RiemannRule } from '../engine/math'
import Readouts from '../components/Readouts.vue'

interface PlotOptions {
  /** mathjs expression in x; may reference lesson parameters by name. */
  expr: string
  domain: [number, number]
  range: [number, number]
  mode: 'plain' | 'secant' | 'tangent' | 'limit' | 'riemann' | 'area'
  showDerivative?: boolean
  limitAt?: number
  rule?: RiemannRule
  /** x-values to mark on the axis (equation solver). */
  roots?: number[]
  /** Advance a parameter in real time (units per second), wrapping inside `loop`. */
  animate?: { param: string; speed: number; loop: [number, number] }
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const o = computed(() => props.options as PlotOptions)

const sx = computed(() => scaleLinear().domain(o.value.domain).range([0, W]))
const sy = computed(() => scaleLinear().domain(o.value.range).range([H, 0]))

const f = computed(() => {
  const fn = makeFn(o.value.expr)
  return (x: number) => fn(x, props.params)
})
const df = computed(() => {
  const d = derivativeExpr(o.value.expr)
  if (!d) return (x: number) => numericSlope(f.value, x)
  const fn = makeFn(d)
  return (x: number) => fn(x, props.params)
})

function pathOf(fn: (x: number) => number) {
  const [x0, x1] = o.value.domain
  const [y0, y1] = o.value.range
  const span = y1 - y0
  const pts: [number, number][] = []
  for (let i = 0; i <= 400; i++) {
    const x = x0 + ((x1 - x0) * i) / 400
    pts.push([x, fn(x)])
  }
  return (
    line<[number, number]>()
      .defined((p) => Number.isFinite(p[1]) && p[1] > y0 - span && p[1] < y1 + span)
      .x((p) => sx.value(p[0]))
      .y((p) => sy.value(p[1]))(pts) ?? ''
  )
}

const curve = computed(() => pathOf(f.value))
const dCurve = computed(() => (o.value.showDerivative ? pathOf(df.value) : ''))

/** A straight line through (px, py) with slope m, spanning the whole domain. */
function lineThrough(px: number, py: number, m: number) {
  const [x0, x1] = o.value.domain
  return { x1: sx.value(x0), y1: sy.value(py + m * (x0 - px)), x2: sx.value(x1), y2: sy.value(py + m * (x1 - px)) }
}

const x = computed(() => props.params.x ?? 0)
const point = computed(() => ({ cx: sx.value(x.value), cy: sy.value(f.value(x.value)) }))

const secant = computed(() => {
  const xa = x.value
  const xb = xa + (props.params.h ?? 1)
  const ya = f.value(xa)
  const yb = f.value(xb)
  const m = (yb - ya) / (xb - xa)
  return { xa, xb, ya, yb, m, line: lineThrough(xa, ya, m) }
})

const tangent = computed(() => {
  const m = df.value(x.value)
  return { m, line: lineThrough(x.value, f.value(x.value), m) }
})

const limit = computed(() => {
  const a = o.value.limitAt ?? 0
  const d = props.params.d ?? 1
  return { a, d, L: estimateLimit(f.value, a), left: a - d, right: a + d }
})

const rects = computed(() => {
  const mode = o.value.mode
  if (mode !== 'riemann' && mode !== 'area') return []
  const { a = 0, b = 1 } = props.params
  const n = mode === 'area' ? 300 : Math.max(1, Math.round(props.params.n ?? 10))
  const y0 = sy.value(0)
  return riemannSamples(f.value, a, b, n, mode === 'area' ? 'mid' : o.value.rule).map((r) => {
    const xa = sx.value(r.x0)
    const xb = sx.value(r.x0 + r.dx)
    const y = sy.value(Number.isFinite(r.y) ? r.y : 0)
    return { x: Math.min(xa, xb), w: Math.abs(xb - xa), y: Math.min(y, y0), h: Math.abs(y - y0), pos: r.y * r.dx >= 0 }
  })
})

const readouts = computed(() => {
  const p = props.params
  switch (o.value.mode) {
    case 'secant': {
      const s = secant.value
      return [
        { label: 'run Δx', value: fmt(s.xb - s.xa) },
        { label: 'rise Δy', value: fmt(s.yb - s.ya) },
        { label: 'slope Δy/Δx', value: fmt(s.m), color: 'var(--accent-2)' },
      ]
    }
    case 'tangent':
      return [
        { label: 'x', value: fmt(x.value) },
        { label: 'f(x)', value: fmt(f.value(x.value)) },
        { label: "slope f'(x)", value: fmt(tangent.value.m), color: 'var(--accent-2)' },
      ]
    case 'limit': {
      const { a, L } = limit.value
      return [
        ...[1, 0.1, 0.01].map((k) => {
          const xv = a + limit.value.d * k
          return { label: `f(${fmt(xv, 5)})`, value: fmt(f.value(xv), 6) }
        }),
        { label: `limit as x→${fmt(a)}`, value: fmt(L, 6), color: 'var(--accent-2)' },
      ]
    }
    case 'riemann': {
      const n = Math.max(1, Math.round(p.n ?? 10))
      const approx = riemannSum(f.value, p.a, p.b, n, o.value.rule)
      const exact = integrate(f.value, p.a, p.b)
      return [
        { label: 'rectangles', value: String(n) },
        { label: 'sum of rectangles', value: fmt(approx), color: 'var(--accent)' },
        { label: 'exact integral', value: fmt(exact), color: 'var(--accent-2)' },
        { label: 'error', value: fmt(Math.abs(exact - approx)) },
      ]
    }
    case 'area': {
      const fn = f.value
      const net = integrate(fn, p.a, p.b)
      const total = integrate((t) => Math.abs(fn(t)), p.a, p.b)
      return [
        { label: 'area above axis', value: fmt((total + net) / 2), color: 'var(--pos)' },
        { label: 'area below axis', value: fmt((total - net) / 2), color: 'var(--neg)' },
        { label: 'signed area ∫', value: fmt(net), color: 'var(--accent-2)' },
      ]
    }
    default:
      return [
        { label: 'x', value: fmt(x.value) },
        { label: 'f(x)', value: fmt(f.value(x.value)), color: 'var(--accent-2)' },
      ]
  }
})

const playing = ref(true)
let raf = 0
let lastT = 0
function tick(t: number) {
  const a = o.value.animate
  if (a && playing.value && !dragging.value && lastT) {
    const next = (props.params[a.param] ?? a.loop[0]) + (a.speed * Math.min(t - lastT, 50)) / 1000
    emit('set', a.param, next > a.loop[1] ? a.loop[0] : next)
  }
  lastT = t
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!o.value.animate) return
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

// Direct manipulation: drag anywhere on the plot.
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const xv = sx.value.invert(((e.clientX - box.left) / box.width) * W)
  const mode = o.value.mode
  if (mode === 'limit') emit('set', 'd', Math.abs(xv - limit.value.a))
  else if (mode === 'riemann' || mode === 'area') emit('set', 'b', xv)
  else emit('set', 'x', xv)
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
</script>

<template>
  <div class="relative">
    <button
      v-if="o.animate"
      class="num absolute right-3 top-3 rounded-lg border px-2.5 py-1 text-xs"
      style="border-color: var(--line); background: var(--panel); color: var(--muted)"
      @click="playing = !playing"
    >
      {{ playing ? '❚❚ pause' : '▶ play' }}
    </button>
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
        <template v-for="t in sx.ticks(10)" :key="`x${t}`">
          <line :x1="sx(t)" :x2="sx(t)" y1="0" :y2="H" stroke="var(--grid)" />
          <text v-if="t !== 0" :x="sx(t)" :y="Math.min(H - 6, Math.max(12, sy(0) + 14))" text-anchor="middle">{{ t }}</text>
        </template>
        <template v-for="t in sy.ticks(8)" :key="`y${t}`">
          <line x1="0" :x2="W" :y1="sy(t)" :y2="sy(t)" stroke="var(--grid)" />
          <text v-if="t !== 0" :x="Math.min(W - 24, Math.max(6, sx(0) + 6))" :y="sy(t) + 4">{{ t }}</text>
        </template>
      </g>
      <line x1="0" :x2="W" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <line :x1="sx(0)" :x2="sx(0)" y1="0" :y2="H" stroke="var(--muted)" />

      <rect
        v-for="(r, i) in rects"
        :key="i"
        :x="r.x"
        :y="r.y"
        :width="r.w"
        :height="r.h"
        :fill="o.mode === 'area' ? (r.pos ? 'var(--pos)' : 'var(--neg)') : 'var(--accent)'"
        :fill-opacity="o.mode === 'area' ? 0.35 : 0.22"
        :stroke="o.mode === 'riemann' && rects.length <= 120 ? 'var(--accent)' : 'none'"
        stroke-width="1"
      />

      <path v-if="dCurve" :d="dCurve" fill="none" stroke="var(--accent-2)" stroke-width="1.5" stroke-dasharray="5 4" />
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />

      <g v-for="root in o.roots ?? []" :key="root">
        <circle :cx="sx(root)" :cy="sy(0)" r="6" fill="var(--bg)" stroke="var(--pos)" stroke-width="2.5" />
        <text class="num" :x="sx(root)" :y="sy(0) + 24" text-anchor="middle" font-size="12" fill="var(--pos)">x = {{ fmt(root) }}</text>
      </g>

      <template v-if="o.mode === 'plain'">
        <line :x1="point.cx" :x2="point.cx" :y1="sy(0)" :y2="point.cy" stroke="var(--accent-2)" stroke-dasharray="3 3" />
        <line :x1="sx(0)" :x2="point.cx" :y1="point.cy" :y2="point.cy" stroke="var(--accent-2)" stroke-dasharray="3 3" />
        <circle v-bind="point" r="6" fill="var(--accent-2)" />
      </template>

      <template v-else-if="o.mode === 'secant'">
        <line v-bind="secant.line" stroke="var(--accent-2)" stroke-width="1.5" />
        <path
          :d="`M${sx(secant.xa)},${sy(secant.ya)} H${sx(secant.xb)} V${sy(secant.yb)}`"
          fill="none"
          stroke="var(--fg)"
          stroke-dasharray="4 3"
        />
        <circle :cx="sx(secant.xa)" :cy="sy(secant.ya)" r="6" fill="var(--accent-2)" />
        <circle :cx="sx(secant.xb)" :cy="sy(secant.yb)" r="5" fill="var(--bg)" stroke="var(--accent-2)" stroke-width="2" />
      </template>

      <template v-else-if="o.mode === 'tangent'">
        <line v-bind="tangent.line" stroke="var(--accent-2)" stroke-width="2" />
        <circle v-if="o.showDerivative" :cx="point.cx" :cy="sy(tangent.m)" r="4" fill="var(--accent-2)" />
        <circle v-bind="point" r="6" fill="var(--fg)" />
      </template>

      <template v-else-if="o.mode === 'limit'">
        <line x1="0" :x2="W" :y1="sy(limit.L)" :y2="sy(limit.L)" stroke="var(--accent-2)" stroke-dasharray="5 4" />
        <line :x1="sx(limit.a)" :x2="sx(limit.a)" y1="0" :y2="H" stroke="var(--accent-2)" stroke-dasharray="5 4" />
        <circle :cx="sx(limit.left)" :cy="sy(f(limit.left))" r="6" fill="var(--fg)" />
        <circle :cx="sx(limit.right)" :cy="sy(f(limit.right))" r="6" fill="var(--fg)" />
        <circle :cx="sx(limit.a)" :cy="sy(limit.L)" r="5" fill="var(--bg)" stroke="var(--accent-2)" stroke-width="2" />
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
