<script setup lang="ts">
import { computed, ref } from 'vue'
import { compile } from 'mathjs'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

interface SurfaceOptions {
  /** mathjs expression in x and y. */
  expr: string
  /** x and y both run over [-extent, extent]. */
  extent: number
  zRange: [number, number]
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const S = 185
const N = 24
const o = computed(() => props.options as SurfaceOptions)

const f = computed(() => {
  const code = compile(o.value.expr)
  return (x: number, y: number) => {
    try {
      const v = code.evaluate({ x, y })
      return typeof v === 'number' ? v : NaN
    } catch {
      return NaN
    }
  }
})

// View angles are local state: rotating the camera is not a lesson parameter.
const yaw = ref(-0.65)
const pitch = ref(1.0)

/** World (x, y, z) → screen. x,y are scaled by extent, z by zRange, then rotated and tilted. */
function project(x: number, y: number, z: number): [number, number] {
  const [z0, z1] = o.value.zRange
  const u = x / o.value.extent
  const v = y / o.value.extent
  const w = ((z - z0) / (z1 - z0) - 0.5) * 1.1
  const xr = u * Math.cos(yaw.value) - v * Math.sin(yaw.value)
  const yr = u * Math.sin(yaw.value) + v * Math.cos(yaw.value)
  return [W / 2 + S * xr, H / 2 + 10 + S * yr * Math.cos(pitch.value) - S * w * Math.sin(pitch.value)]
}
const path = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')

const wires = computed(() => {
  const e = o.value.extent
  const [z0, z1] = o.value.zRange
  const at = (i: number) => -e + (2 * e * i) / N
  const clampZ = (z: number) => Math.max(z0, Math.min(z1, Number.isFinite(z) ? z : z0))
  const out: string[] = []
  for (let i = 0; i <= N; i++) {
    out.push(path(Array.from({ length: N + 1 }, (_, j) => project(at(i), at(j), clampZ(f.value(at(i), at(j)))))))
    out.push(path(Array.from({ length: N + 1 }, (_, j) => project(at(j), at(i), clampZ(f.value(at(j), at(i)))))))
  }
  return out
})

const base = computed(() => {
  const e = o.value.extent
  const z = o.value.zRange[0]
  return path([project(-e, -e, z), project(e, -e, z), project(e, e, z), project(-e, e, z)]) + 'Z'
})

const pt = computed(() => {
  const x = props.params.x0 ?? 0
  const y = props.params.y0 ?? 0
  const h = 1e-4
  const z = f.value(x, y)
  const fx = (f.value(x + h, y) - f.value(x - h, y)) / (2 * h)
  const fy = (f.value(x, y + h) - f.value(x, y - h)) / (2 * h)
  return { x, y, z, fx, fy, mag: Math.hypot(fx, fy) }
})

const marks = computed(() => {
  const { x, y, z, fx, fy, mag } = pt.value
  const e = o.value.extent
  const zb = o.value.zRange[0]
  const d = e * 0.28
  const plane = path([[-d, -d], [d, -d], [d, d], [-d, d]].map(([a, b]) => project(x + a, y + b, z + fx * a + fy * b))) + 'Z'
  const len = Math.min(0.7 * e, mag * 0.18 * e)
  const tip = mag ? project(x + (fx / mag) * len, y + (fy / mag) * len, zb) : project(x, y, zb)
  return { plane, on: project(x, y, z), foot: project(x, y, zb), tip }
})

const readouts = computed(() => [
  { label: 'f(x, y)', value: fmt(pt.value.z) },
  { label: '∂f/∂x', value: fmt(pt.value.fx), color: 'var(--accent)' },
  { label: '∂f/∂y', value: fmt(pt.value.fy), color: 'var(--pos)' },
  { label: '|∇f| steepness', value: fmt(pt.value.mag), color: 'var(--accent-2)' },
])

let last: [number, number] | null = null
function down(e: PointerEvent) {
  last = [e.clientX, e.clientY]
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (!last) return
  yaw.value += (e.clientX - last[0]) * 0.008
  pitch.value = Math.max(0.25, Math.min(1.5, pitch.value - (e.clientY - last[1]) * 0.006))
  last = [e.clientX, e.clientY]
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-grab touch-none select-none active:cursor-grabbing" @pointerdown="down" @pointermove="move" @pointerup="last = null" @pointercancel="last = null">
      <path :d="base" fill="var(--sunken)" stroke="var(--line)" />
      <line :x1="marks.foot[0]" :y1="marks.foot[1]" :x2="marks.tip[0]" :y2="marks.tip[1]" stroke="var(--accent-2)" stroke-width="3" stroke-linecap="round" />
      <circle :cx="marks.tip[0]" :cy="marks.tip[1]" r="4.5" fill="var(--accent-2)" />
      <path v-for="(d, i) in wires" :key="i" :d="d" fill="none" stroke="var(--accent)" stroke-opacity="0.45" stroke-width="1" />
      <line :x1="marks.foot[0]" :y1="marks.foot[1]" :x2="marks.on[0]" :y2="marks.on[1]" stroke="var(--muted)" stroke-dasharray="3 3" />
      <path :d="marks.plane" fill="var(--accent-2)" fill-opacity="0.22" stroke="var(--accent-2)" stroke-width="1.2" />
      <circle :cx="marks.on[0]" :cy="marks.on[1]" r="5.5" fill="var(--fg)" />
      <circle :cx="marks.foot[0]" :cy="marks.foot[1]" r="3" fill="var(--muted)" />
      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">drag to rotate · arrow = ∇f, direction of steepest ascent</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
