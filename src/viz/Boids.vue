<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'
import { type Boid, boidPoints, polarization, seedBoids, torusDelta, wrap } from './boidsCore'

// Shared boid engine for three lessons (flocking-boids, couzin-zones, predators-and-flocks),
// picked by options.mode so the near-identical neighbour/steer/move plumbing lives once.
// flock:    params sep, align, coh (body-lengths) — classic separation/alignment/cohesion.
// couzin:   params rep, orient, attract (body-lengths) — nested zones, no separate alignment rule.
// predator: params fear (px), speed (predator's speed multiplier) — one hunter, a fleeing flock.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const BL = 10 // px per "body length" slider unit
const SPEED = 2.6
const T_MAX = 240
const mode = computed<'flock' | 'couzin' | 'predator'>(() => props.options.mode ?? 'flock')
const N = computed(() => (mode.value === 'predator' ? 26 : 36))
const stepN = computed(() => Math.max(0, Math.min(T_MAX, Math.round(props.params.t ?? 0))))
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const angleTo = (dx: number, dy: number) => Math.atan2(dy, dx)
const turnToward = (from: number, to: number, rate: number) => {
  let d = to - from
  while (d > Math.PI) d -= 2 * Math.PI
  while (d < -Math.PI) d += 2 * Math.PI
  return from + clamp(d, -rate, rate)
}

function flockStep(bs: Boid[], sep: number, align: number, coh: number, turn: number): Boid[] {
  return bs.map((bi, i) => {
    let sx = 0, sy = 0, sc = 0, ax = 0, ay = 0, ac = 0, cx = 0, cy = 0, cc = 0
    for (let j = 0; j < bs.length; j++) {
      if (j === i) continue
      const bj = bs[j]
      const dx = torusDelta(bj.x, bi.x, W)
      const dy = torusDelta(bj.y, bi.y, H)
      const d = Math.hypot(dx, dy)
      if (d < sep) { sx -= dx; sy -= dy; sc++ }
      if (d < align) { ax += Math.cos(bj.h); ay += Math.sin(bj.h); ac++ }
      if (d < coh) { cx += dx; cy += dy; cc++ }
    }
    let vx = Math.cos(bi.h) * 0.6
    let vy = Math.sin(bi.h) * 0.6
    if (sc) { vx += (sx / sc) * 1.6; vy += (sy / sc) * 1.6 }
    if (ac) { vx += ax / ac; vy += ay / ac }
    if (cc) { vx += cx / cc; vy += cy / cc }
    const h = turnToward(bi.h, vx || vy ? angleTo(vx, vy) : bi.h, turn)
    return { x: wrap(bi.x + Math.cos(h) * SPEED, W), y: wrap(bi.y + Math.sin(h) * SPEED, H), h }
  })
}

function couzinStep(bs: Boid[], rep: number, orient: number, attract: number, turn: number): Boid[] {
  return bs.map((bi, i) => {
    let rx = 0, ry = 0, rc = 0, ox = 0, oy = 0, oc = 0, ax = 0, ay = 0, ac = 0
    for (let j = 0; j < bs.length; j++) {
      if (j === i) continue
      const bj = bs[j]
      const dx = torusDelta(bj.x, bi.x, W)
      const dy = torusDelta(bj.y, bi.y, H)
      const d = Math.hypot(dx, dy)
      if (d < rep) { rx -= dx; ry -= dy; rc++ }
      else {
        if (d < orient) { ox += Math.cos(bj.h); oy += Math.sin(bj.h); oc++ }
        if (d < attract) { ax += dx; ay += dy; ac++ }
      }
    }
    let desired = bi.h
    if (rc) desired = angleTo(rx, ry)
    else if (oc && ac) desired = angleTo(ox / oc + ax / ac, oy / oc + ay / ac)
    else if (oc) desired = angleTo(ox, oy)
    else if (ac) desired = angleTo(ax, ay)
    const h = turnToward(bi.h, desired, turn)
    return { x: wrap(bi.x + Math.cos(h) * SPEED, W), y: wrap(bi.y + Math.sin(h) * SPEED, H), h }
  })
}

function predatorStep(bs: Boid[], pred: Boid, fear: number, predSpeed: number, turn: number) {
  const next = bs.map((bi, i) => {
    let sx = 0, sy = 0, sc = 0, ax = 0, ay = 0, ac = 0, cx = 0, cy = 0, cc = 0
    for (let j = 0; j < bs.length; j++) {
      if (j === i) continue
      const bj = bs[j]
      const dx = torusDelta(bj.x, bi.x, W)
      const dy = torusDelta(bj.y, bi.y, H)
      const d = Math.hypot(dx, dy)
      if (d < 15) { sx -= dx; sy -= dy; sc++ }
      if (d < 45) { ax += Math.cos(bj.h); ay += Math.sin(bj.h); ac++ }
      if (d < 60) { cx += dx; cy += dy; cc++ }
    }
    let vx = Math.cos(bi.h) * 0.6
    let vy = Math.sin(bi.h) * 0.6
    if (sc) { vx += (sx / sc) * 1.6; vy += (sy / sc) * 1.6 }
    if (ac) { vx += ax / ac; vy += ay / ac }
    if (cc) { vx += cx / cc; vy += cy / cc }
    const pdx = torusDelta(bi.x, pred.x, W)
    const pdy = torusDelta(bi.y, pred.y, H)
    const pd = Math.hypot(pdx, pdy)
    const fleeing = pd < fear
    if (fleeing) { vx = pdx * 3; vy = pdy * 3 }
    const h = turnToward(bi.h, angleTo(vx, vy), fleeing ? turn * 1.6 : turn)
    return { b: { x: wrap(bi.x + Math.cos(h) * SPEED, W), y: wrap(bi.y + Math.sin(h) * SPEED, H), h }, fleeing }
  })
  let nx = Infinity, ny = 0, nd = Infinity
  for (const { b } of next) {
    const dx = torusDelta(b.x, pred.x, W)
    const dy = torusDelta(b.y, pred.y, H)
    const d = Math.hypot(dx, dy)
    if (d < nd) { nd = d; nx = dx; ny = dy }
  }
  const ph = turnToward(pred.h, nx === Infinity ? pred.h : angleTo(nx, ny), 0.3)
  const nextPred = { x: wrap(pred.x + Math.cos(ph) * SPEED * predSpeed, W), y: wrap(pred.y + Math.sin(ph) * SPEED * predSpeed, H), h: ph }
  return { prey: next.map((r) => r.b), pred: nextPred, fleeing: next.filter((r) => r.fleeing).length }
}

// Recomputed deterministically from t=0 every time, like GameOfLife.vue — scrubbing the "t"
// slider always gives the same frame, and there is nothing to keep mutable state for.
const world = computed(() => {
  const m = mode.value
  let prey = seedBoids(N.value, W, H, 7)
  let pred: Boid = { x: W * 0.15, y: H * 0.5, h: 0 }
  let fleeing = 0
  for (let i = 0; i < stepN.value; i++) {
    if (m === 'flock') prey = flockStep(prey, (props.params.sep ?? 2) * BL, (props.params.align ?? 6) * BL, (props.params.coh ?? 8) * BL, 0.3)
    else if (m === 'couzin') prey = couzinStep(prey, (props.params.rep ?? 1) * BL, (props.params.orient ?? 3) * BL, (props.params.attract ?? 12) * BL, 0.28)
    else { const r = predatorStep(prey, pred, props.params.fear ?? 70, props.params.speed ?? 1.6, 0.3); prey = r.prey; pred = r.pred; fleeing = r.fleeing }
  }
  return { prey, pred, fleeing }
})
const order = computed(() => polarization(world.value.prey.map((b) => b.h)))
const clusters = computed(() => {
  const bs = world.value.prey
  const seen = new Array(bs.length).fill(false)
  let groups = 0
  for (let i = 0; i < bs.length; i++) {
    if (seen[i]) continue
    groups++
    const stack = [i]
    seen[i] = true
    while (stack.length) {
      const k = stack.pop()!
      for (let j = 0; j < bs.length; j++) {
        if (seen[j]) continue
        const d = Math.hypot(torusDelta(bs[j].x, bs[k].x, W), torusDelta(bs[j].y, bs[k].y, H))
        if (d < 55) { seen[j] = true; stack.push(j) }
      }
    }
  }
  return groups
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 60) {
    last = now
    if (stepN.value >= T_MAX) playing.value = false
    else emit('set', 't', stepN.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => {
  const base = [{ label: t('boids.t'), value: String(stepN.value) }, { label: t('boids.order'), value: fmt(order.value, 2), color: 'var(--accent)' }]
  if (mode.value === 'predator') return [...base, { label: t('boids.fleeing'), value: String(world.value.fleeing), color: 'var(--neg)' }, { label: t('boids.clusters'), value: String(clusters.value) }]
  if (mode.value === 'couzin') return [...base, { label: t('boids.clusters'), value: String(clusters.value) }]
  return base
})
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0)">{{ t('boids.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('boids.hint') }}</text>
      <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <polygon v-for="(b, i) in world.prey" :key="i" :points="boidPoints(b.x, b.y, b.h)" fill="var(--accent)" opacity="0.9" />
      <polygon v-if="mode === 'predator'" :points="boidPoints(world.pred.x, world.pred.y, world.pred.h, 16, 10)" fill="var(--neg)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
