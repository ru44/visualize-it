<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Gravity between every pair of bodies (leapfrog integration, G folded in). A star plus one planet is a
// stable ellipse; add a second planet and, past a certain mass, its pull on the first stops being a small
// nudge and the orbit stops repeating. params: n (2 or 3 bodies), m2 (mass of the second planet), t (0..1
// scrubs through a fixed, precomputed trajectory so the same sliders always draw the same picture).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 330
const CY = 250
const SCALE = 1.7
const STEPS = 700
const DT = 0.06

const n = computed(() => (Math.round(props.params.n ?? 3) >= 3 ? 3 : 2))
const m2 = computed(() => Math.max(0, Math.min(400, props.params.m2 ?? 120)))
const tProg = computed(() => Math.max(0, Math.min(1, props.params.t ?? 0)))

interface Body { m: number; x: number; y: number; vx: number; vy: number }
interface Track { pos: { x: number; y: number }[]; m: number; minSep: number }

const sim = computed<Track[]>(() => {
  const bodies: Body[] = [{ m: 900, x: 0, y: 0, vx: 0, vy: 0 }, { m: 15, x: 110, y: 0, vx: 0, vy: Math.sqrt(900 / 110) }]
  if (n.value === 3) bodies.push({ m: Math.max(m2.value, 0.001), x: 0, y: -190, vx: Math.sqrt(900 / 190) * 1.05, vy: 0 })
  const N = bodies.length
  const st = bodies.map((b) => ({ ...b }))
  const pos: { x: number; y: number }[][] = st.map((b) => [{ x: b.x, y: b.y }])
  const accel = (i: number) => {
    let ax = 0
    let ay = 0
    for (let j = 0; j < N; j++) {
      if (j === i) continue
      const dx = st[j].x - st[i].x
      const dy = st[j].y - st[i].y
      const r2 = dx * dx + dy * dy + 4
      const r = Math.sqrt(r2)
      ax += (st[j].m * dx) / (r2 * r)
      ay += (st[j].m * dy) / (r2 * r)
    }
    return { ax, ay }
  }
  let acc = st.map((_, i) => accel(i))
  for (let s = 0; s < STEPS; s++) {
    for (let i = 0; i < N; i++) { st[i].vx += 0.5 * acc[i].ax * DT; st[i].vy += 0.5 * acc[i].ay * DT; st[i].x += st[i].vx * DT; st[i].y += st[i].vy * DT }
    acc = st.map((_, i) => accel(i))
    for (let i = 0; i < N; i++) { st[i].vx += 0.5 * acc[i].ax * DT; st[i].vy += 0.5 * acc[i].ay * DT; pos[i].push({ x: st[i].x, y: st[i].y }) }
  }
  let minSep = Infinity
  if (N === 3) for (let s = 0; s <= STEPS; s++) minSep = Math.min(minSep, Math.hypot(pos[1][s].x - pos[2][s].x, pos[1][s].y - pos[2][s].y))
  return bodies.map((b, i) => ({ pos: pos[i], m: b.m, minSep }))
})

const idx = computed(() => Math.round(tProg.value * STEPS))
const px = (x: number) => CX + x * SCALE
const py = (y: number) => CY + y * SCALE
const trail = (i: number) => {
  const p = sim.value[i].pos
  const from = Math.max(0, idx.value - 220)
  let d = ''
  for (let s = from; s <= idx.value; s++) d += `${s === from ? 'M' : 'L'}${px(p[s].x).toFixed(1)},${py(p[s].y).toFixed(1)}`
  return d
}
const COLORS = ['var(--accent-2)', 'var(--accent)', 'var(--pos)']
const RADII = [10, 5, 5]

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tProg.value + dt / 22
    if (v >= 1) v -= 1
    emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const dist = (i: number) => Math.hypot(sim.value[i].pos[idx.value].x, sim.value[i].pos[idx.value].y)
const speed = (i: number) => {
  const p = sim.value[i].pos
  const a = p[Math.max(0, idx.value - 1)]
  const b = p[Math.min(STEPS, idx.value + 1)]
  return Math.hypot(b.x - a.x, b.y - a.y) / (2 * DT)
}
const readouts = computed(() => {
  const items = [
    { label: t('nbody.bodies'), value: String(n.value) },
    { label: t('nbody.r1'), value: fmt(dist(1), 1), color: COLORS[1] },
    { label: t('nbody.v1'), value: fmt(speed(1), 2), color: COLORS[1] },
  ]
  if (n.value === 3) items.push(
    { label: t('nbody.r2'), value: fmt(dist(2), 1), color: COLORS[2] },
    { label: t('nbody.minsep'), value: fmt(sim.value[0].minSep === Infinity ? 0 : sim.value[0].minSep, 1), color: sim.value[0].minSep < 60 ? 'var(--neg)' : 'var(--fg)' },
  )
  return items
})
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0)">{{ t('nbody.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('nbody.hint') }}</text>
      <g v-for="(b, i) in sim" :key="i">
        <path :d="trail(i)" fill="none" :stroke="COLORS[i]" stroke-width="1.5" stroke-opacity="0.45" />
        <circle :cx="px(b.pos[idx].x)" :cy="py(b.pos[idx].y)" :r="RADII[i]" :fill="COLORS[i]" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
