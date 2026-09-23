<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Kuramoto oscillators that also move: each one flocks toward nearby neighbours (and keeps clear
// of ones too close), while its phase locks to neighbours the same way fireflies do. Watch a
// flock that both gathers in space and falls into a shared rhythm at once.
// params: n (boids), k (coupling strength), step (generation shown; scrubs the simulation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const MAX_STEP = 150
const R_NEIGHBOUR = 95
const R_CLOSE = 22
const SPEED = 1.7
const BASE_OMEGA = (2 * Math.PI) / 50

const n = computed(() => Math.max(8, Math.min(30, Math.round(props.params.n ?? 18))))
const k = computed(() => Math.max(0, Math.min(2, props.params.k ?? 0.6)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

interface Boid { x: number; y: number; heading: number; phase: number }
const start = computed<Boid[]>(() => {
  const rnd = seeded(2000 + n.value)
  return Array.from({ length: n.value }, () => ({
    x: rnd() * W,
    y: 40 + rnd() * (H - 80),
    heading: rnd() * 2 * Math.PI,
    phase: rnd() * 2 * Math.PI,
  }))
})

const sim = computed(() => {
  const N = n.value
  const K = k.value
  let boids = start.value.map((b) => ({ ...b }))
  for (let tt = 0; tt < step.value; tt++) {
    const next = boids.map((b) => ({ ...b }))
    for (let i = 0; i < N; i++) {
      let cx = 0, cy = 0, cnt = 0, awayX = 0, awayY = 0, close = 0, nudge = 0
      for (let j = 0; j < N; j++) {
        if (j === i) continue
        const dx = boids[j].x - boids[i].x
        const dy = boids[j].y - boids[i].y
        const d = Math.hypot(dx, dy)
        if (d < R_NEIGHBOUR) {
          cx += boids[j].x; cy += boids[j].y; cnt++
          nudge += Math.sin(boids[j].phase - boids[i].phase)
          if (d < R_CLOSE) { awayX -= dx; awayY -= dy; close++ }
        }
      }
      if (close > 0) next[i].heading = Math.atan2(awayY, awayX)
      else if (cnt > 0) next[i].heading = Math.atan2(cy / cnt - boids[i].y, cx / cnt - boids[i].x)
      let x = boids[i].x + Math.cos(next[i].heading) * SPEED
      let y = boids[i].y + Math.sin(next[i].heading) * SPEED
      if (x < 0) x += W; if (x > W) x -= W
      if (y < 20) y += H - 40; if (y > H - 20) y -= H - 40
      next[i].x = x; next[i].y = y
      let p = boids[i].phase + BASE_OMEGA + (cnt > 0 ? (K / cnt) * nudge : 0)
      p = p % (2 * Math.PI)
      if (p < 0) p += 2 * Math.PI
      next[i].phase = p
    }
    boids = next
  }
  let scx = 0, scy = 0
  for (const b of boids) { scx += Math.cos(b.phase); scy += Math.sin(b.phase) }
  return { boids, order: Math.hypot(scx, scy) / N }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 80) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('swarm.step'), value: String(step.value) },
  { label: t('swarm.order'), value: fmt(sim.value.order, 2), color: 'var(--accent)' },
  { label: 'n', value: String(n.value) },
  { label: 'K', value: fmt(k.value, 2) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('swarm.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('swarm.hint') }}</text>
      <g v-for="(b, i) in sim.boids" :key="i">
        <line :x1="b.x" :y1="b.y" :x2="b.x + Math.cos(b.heading) * 12" :y2="b.y + Math.sin(b.heading) * 12" stroke="var(--muted)" stroke-width="1.5" />
        <circle :cx="b.x" :cy="b.y" r="6" fill="var(--accent)" :fill-opacity="0.35 + 0.65 * ((1 + Math.cos(b.phase)) / 2)" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
