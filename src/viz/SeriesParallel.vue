<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const V = computed(() => props.params.V ?? 12)
const R1 = computed(() => Math.max(props.params.R1 ?? 20, 0.01))
const R2 = computed(() => Math.max(props.params.R2 ?? 60, 0.01))
const isParallel = computed(() => (props.params.mode ?? 0) >= 0.5)

const Rtotal = computed(() => (isParallel.value ? (R1.value * R2.value) / (R1.value + R2.value) : R1.value + R2.value))
const Itotal = computed(() => V.value / Rtotal.value)
const I1 = computed(() => (isParallel.value ? V.value / R1.value : Itotal.value))
const I2 = computed(() => (isParallel.value ? V.value / R2.value : Itotal.value))
const V1 = computed(() => (isParallel.value ? V.value : Itotal.value * R1.value))
const V2 = computed(() => (isParallel.value ? V.value : Itotal.value * R2.value))
const Ptotal = computed(() => V.value * Itotal.value)

function toggle() {
  emit('set', 'mode', isParallel.value ? 0 : 1)
}

function zigzagPts(x1: number, y1: number, x2: number, y2: number, n = 6, amp = 9): [number, number][] {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1e-6
  const ux = dx / len
  const uy = dy / len
  const perpx = -uy
  const perpy = ux
  const pts: [number, number][] = [[x1, y1]]
  for (let i = 1; i < n; i++) {
    const t = i / n
    const bx = x1 + dx * t
    const by = y1 + dy * t
    const s = i % 2 === 0 ? -1 : 1
    pts.push([bx + perpx * amp * s, by + perpy * amp * s])
  }
  pts.push([x2, y2])
  return pts
}
const toPath = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')

const TOP = 100
const BOT = 380
const BX = 100

// Battery symbol (short/long plate pair) at the left edge, midway up.
const battY = (TOP + BOT) / 2

const seriesPts = computed<[number, number][]>(() => [
  [BX, TOP],
  [220, TOP],
  ...zigzagPts(220, TOP, 420, TOP),
  [420, TOP],
  [480, TOP],
  ...zigzagPts(480, TOP, 680, TOP),
  [680, TOP],
  [700, TOP],
  [700, BOT],
  [BX, BOT],
])
const branch1Pts = computed<[number, number][]>(() => [
  [BX, TOP],
  [350, TOP],
  ...zigzagPts(350, TOP, 350, BOT),
  [350, BOT],
  [BX, BOT],
])
const branch2Pts = computed<[number, number][]>(() => [
  [BX, TOP],
  [550, TOP],
  ...zigzagPts(550, TOP, 550, BOT),
  [550, BOT],
  [BX, BOT],
])

const wirePath = computed(() => (isParallel.value ? toPath([[BX, TOP], [700, TOP]]) + ' ' + toPath([[BX, BOT], [700, BOT]]) : toPath(seriesPts.value)))
const r1Path = computed(() => (isParallel.value ? toPath(zigzagPts(350, TOP, 350, BOT)) : toPath(zigzagPts(220, TOP, 420, TOP))))
const r2Path = computed(() => (isParallel.value ? toPath(zigzagPts(550, TOP, 550, BOT)) : toPath(zigzagPts(480, TOP, 680, TOP))))

function pathLen(pts: [number, number][]) {
  let total = 0
  const segs: number[] = []
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    segs.push(d)
    total += d
  }
  return { segs, total }
}
function pointAt(pts: [number, number][], t: number): [number, number] {
  const { segs, total } = pathLen(pts)
  let target = ((t % 1) + 1) % 1 * total
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i] || i === segs.length - 1) {
      const f = segs[i] > 0 ? target / segs[i] : 0
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[i + 1]
      return [x1 + (x2 - x1) * f, y1 + (y2 - y1) * f]
    }
    target -= segs[i]
  }
  return pts[0]
}

const phase = reactive({ a: [0, 1 / 3, 2 / 3], b: [0, 1 / 3, 2 / 3] })

function speedFor(current: number) {
  return Math.max(0.0015, Math.min(0.05, Math.abs(current) * 0.02))
}

let raf = 0
function tick() {
  const sa = speedFor(isParallel.value ? I1.value : Itotal.value)
  const sb = speedFor(isParallel.value ? I2.value : Itotal.value)
  phase.a = phase.a.map((p) => p + sa)
  phase.b = phase.b.map((p) => p + sb)
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
})

const dotsA = computed(() => {
  const pts = isParallel.value ? branch1Pts.value : seriesPts.value
  return phase.a.map((t) => pointAt(pts, t))
})
const dotsB = computed(() => {
  if (!isParallel.value) return [] as [number, number][]
  return phase.b.map((t) => pointAt(branch2Pts.value, t))
})

const readouts = computed(() => [
  { label: 'R_total', value: `${fmt(Rtotal.value)} Ω` },
  { label: 'I_total', value: `${fmt(Itotal.value)} A` },
  { label: 'I1', value: `${fmt(I1.value)} A`, color: 'var(--accent-2)' },
  { label: 'I2', value: `${fmt(I2.value)} A`, color: 'var(--accent-2)' },
  { label: 'V1', value: `${fmt(V1.value)} V` },
  { label: 'V2', value: `${fmt(V2.value)} V` },
  { label: 'P_total', value: `${fmt(Ptotal.value)} W` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none cursor-pointer" @click="toggle">
      <line :x1="BX" :y1="TOP" :x2="BX" :y2="battY - 14" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="BX" :y1="battY + 14" :x2="BX" :y2="BOT" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="BX - 16" :y1="battY - 14" :x2="BX + 16" :y2="battY - 14" stroke="var(--fg)" stroke-width="2.5" />
      <line :x1="BX - 9" :y1="battY + 14" :x2="BX + 9" :y2="battY + 14" stroke="var(--fg)" stroke-width="1.5" />
      <text class="num" :x="BX - 28" :y="battY + 4" text-anchor="end" font-size="12" fill="var(--muted)">V = {{ fmt(V) }} V</text>

      <path :d="wirePath" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="r1Path" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <path :d="r2Path" fill="none" stroke="var(--fg)" stroke-width="1.5" />

      <template v-if="isParallel">
        <text class="num" x="350" :y="TOP - 14" text-anchor="middle" font-size="12" fill="var(--muted)">R1 = {{ fmt(R1) }} Ω, V1 = {{ fmt(V1) }} V</text>
        <text class="num" x="550" :y="TOP - 14" text-anchor="middle" font-size="12" fill="var(--muted)">R2 = {{ fmt(R2) }} Ω, V2 = {{ fmt(V2) }} V</text>
      </template>
      <template v-else>
        <text class="num" x="320" :y="TOP - 16" text-anchor="middle" font-size="12" fill="var(--muted)">R1 = {{ fmt(R1) }} Ω, V1 = {{ fmt(V1) }} V</text>
        <text class="num" x="580" :y="TOP - 16" text-anchor="middle" font-size="12" fill="var(--muted)">R2 = {{ fmt(R2) }} Ω, V2 = {{ fmt(V2) }} V</text>
      </template>

      <circle v-for="(p, i) in dotsA" :key="'a' + i" :cx="p[0]" :cy="p[1]" r="4.5" fill="var(--accent-2)" />
      <circle v-for="(p, i) in dotsB" :key="'b' + i" :cx="p[0]" :cy="p[1]" r="4.5" fill="var(--accent-2)" />

      <text class="num" x="16" y="24" font-size="12" fill="var(--muted)">Conceptual model: dots show direction and relative size of current, not literal electron motion.</text>
      <text class="num" x="16" y="42" font-size="12" fill="var(--muted)">tap the diagram to switch {{ isParallel ? 'to series' : 'to parallel' }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
