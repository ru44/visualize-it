<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Quadratic air drag bends a parabola: it clips the range, flattens the peak and — past a certain strength —
// makes 45° stop being the best launch angle. params v0 (launch speed), th (angle, degrees), k (drag strength).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 56, r: 20, t: 24, b: 44 }
const G = 9.81

const v0 = computed(() => Math.max(1, props.params.v0 ?? 25))
const th = computed(() => ((props.params.th ?? 45) * Math.PI) / 180)
const k = computed(() => Math.max(0, props.params.k ?? 0.02))

interface Pt { x: number; y: number }

const noDrag = computed<{ pts: Pt[]; range: number; height: number }>(() => {
  const range = (v0.value ** 2 * Math.sin(2 * th.value)) / G
  const height = (v0.value * Math.sin(th.value)) ** 2 / (2 * G)
  const pts: Pt[] = []
  for (let i = 0; i <= 60; i++) { const t = (i / 60) * (range / (v0.value * Math.cos(th.value)) || 0); pts.push({ x: v0.value * Math.cos(th.value) * t, y: v0.value * Math.sin(th.value) * t - 0.5 * G * t * t }) }
  return { pts, range, height }
})

const drag = computed<{ pts: Pt[]; range: number; height: number }>(() => {
  let x = 0, y = 0, vx = v0.value * Math.cos(th.value), vy = v0.value * Math.sin(th.value)
  const dt = 0.012
  const pts: Pt[] = [{ x, y }]
  let height = 0
  for (let i = 0; i < 4000; i++) {
    const v = Math.hypot(vx, vy)
    vx += -k.value * v * vx * dt
    vy += (-G - k.value * v * vy) * dt
    const px = x + vx * dt
    const py = y + vy * dt
    if (py < 0) { const frac = y / (y - py); x += vx * dt * frac; pts.push({ x, y: 0 }); break }
    x = px; y = py
    if (y > height) height = y
    pts.push({ x, y })
  }
  return { pts, range: x, height }
})

const maxX = computed(() => Math.max(noDrag.value.range, drag.value.range, 10) * 1.1)
const maxY = computed(() => Math.max(noDrag.value.height, drag.value.height, 5) * 1.35)
const sx = (x: number) => PAD.l + (x / maxX.value) * (W - PAD.l - PAD.r)
const sy = (y: number) => H - PAD.b - (y / maxY.value) * (H - PAD.t - PAD.b)
const path = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(Math.max(0, p.y)).toFixed(1)}`).join('')

const anim = ref(0)
let raf = 0
let last = 0
function tick(now: number) { anim.value = ((anim.value + (Math.min(now - last, 50) / 1000) / 2.4) % 1 + 1) % 1; last = now; raf = requestAnimationFrame(tick) }
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const ballIdx = computed(() => Math.min(drag.value.pts.length - 1, Math.floor(anim.value * drag.value.pts.length)))
const ball = computed(() => drag.value.pts[ballIdx.value] ?? { x: 0, y: 0 })

const rangeLostPct = computed(() => (noDrag.value.range > 0 ? (1 - drag.value.range / noDrag.value.range) * 100 : 0))
const readouts = computed(() => [
  { label: t('drag.rangeNo'), value: fmt(noDrag.value.range, 1) + ' m', color: 'var(--muted)' },
  { label: t('drag.rangeDrag'), value: fmt(drag.value.range, 1) + ' m', color: 'var(--accent)' },
  { label: t('drag.lost'), value: fmt(Math.max(0, rangeLostPct.value), 0) + ' %', color: 'var(--neg)' },
  { label: t('drag.height'), value: fmt(drag.value.height, 1) + ' m' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('drag.hint') }}</text>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <line :x1="PAD.l" :x2="PAD.l" :y1="PAD.t" :y2="sy(0)" stroke="var(--muted)" />
      <g class="num" font-size="11" fill="var(--muted)">
        <text v-for="i in 5" :key="'x' + i" :x="sx((maxX * i) / 5)" :y="sy(0) + 16" text-anchor="middle">{{ fmt((maxX * i) / 5, 0) }}</text>
        <text :x="W - PAD.r" :y="H - 6" text-anchor="end">{{ t('drag.xLabel') }}</text>
      </g>
      <path :d="path(noDrag.pts)" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4" />
      <path :d="path(drag.pts)" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="sx(noDrag.range)" :cy="sy(0)" r="4" fill="var(--muted)" />
      <circle :cx="sx(drag.range)" :cy="sy(0)" r="5" fill="var(--accent)" />
      <circle :cx="sx(ball.x)" :cy="sy(Math.max(0, ball.y))" r="6" fill="var(--accent-2)" />
      <g class="num" font-size="12" text-anchor="start">
        <text :x="PAD.l + 6" :y="PAD.t + 16" fill="var(--muted)">- - {{ t('drag.noDrag') }}</text>
        <text :x="PAD.l + 6" :y="PAD.t + 32" fill="var(--accent)">— {{ t('drag.withDrag') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
