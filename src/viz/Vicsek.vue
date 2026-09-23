<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'
import { type Boid, boidPoints, polarization, seedBoids, torusDelta, wrap } from './boidsCore'

// The Vicsek model: no separation and no explicit cohesion, just "copy the average heading of
// everyone within r, then add noise". Order (all headings roughly equal) appears once the noise
// amplitude drops below a critical value — a genuine phase transition, unlike the boids lessons.
// params: r (interaction radius, px), noise (degrees of random wobble added each step), t (step).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 90
const SPEED = 2.4
const T_MAX = 220
const r = computed(() => Math.max(10, Math.min(120, props.params.r ?? 40)))
const noise = computed(() => Math.max(0, Math.min(360, props.params.noise ?? 40)) * (Math.PI / 180))
const step = computed(() => Math.max(0, Math.min(T_MAX, Math.round(props.params.t ?? 0))))

function rngFor(step: number) {
  // A fresh deterministic noise draw per step, so replaying to the same "t" always looks the same.
  let s = (step * 2654435761 + 1) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function vicsekStep(bs: Boid[], radius: number, amp: number, seed: number): Boid[] {
  const rnd = rngFor(seed)
  return bs.map((bi, i) => {
    let sx = Math.cos(bi.h)
    let sy = Math.sin(bi.h)
    for (let j = 0; j < bs.length; j++) {
      if (j === i) continue
      const bj = bs[j]
      const dx = torusDelta(bj.x, bi.x, W)
      const dy = torusDelta(bj.y, bi.y, H)
      if (Math.hypot(dx, dy) < radius) { sx += Math.cos(bj.h); sy += Math.sin(bj.h) }
    }
    const h = Math.atan2(sy, sx) + (rnd() - 0.5) * amp
    return { x: wrap(bi.x + Math.cos(h) * SPEED, W), y: wrap(bi.y + Math.sin(h) * SPEED, H), h }
  })
}

// Recomputed from step 0 every time, like GameOfLife.vue: scrubbing "step" always draws the same
// frame, since every draw of noise is derived from the step index rather than kept as live state.
const world = computed(() => {
  let bs = seedBoids(N, W, H, 3)
  for (let i = 0; i < step.value; i++) bs = vicsekStep(bs, r.value, noise.value, i)
  return bs
})
const order = computed(() => polarization(world.value.map((b) => b.h)))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 55) {
    last = now
    if (step.value >= T_MAX) playing.value = false
    else emit('set', 't', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('boids.t'), value: String(step.value) },
  { label: t('boids.order'), value: fmt(order.value, 3), color: 'var(--accent)' },
  { label: t('vicsek.noiseDeg'), value: String(Math.round(props.params.noise ?? 40)) + '°' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 't', 0)">{{ t('boids.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('vicsek.hint') }}</text>
      <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <polygon v-for="(b, i) in world" :key="i" :points="boidPoints(b.x, b.y, b.h, 7, 5)" fill="var(--accent-2)" opacity="0.9" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
