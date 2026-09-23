<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// XY model: each site is an arrow free to point anywhere on a circle, not just up/down like Ising.
// Below the BKT temperature arrows nearly align; above it, tightly-wound pairs of vortices unbind and roam free.
// params: temperature (T), step (Monte-Carlo sweeps applied so far, drives the animation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 24
const ROWS = 14
const N = COLS * ROWS
const CELL = Math.min((W - 60) / COLS, (H - 80) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 46
const J = 1
const ATTEMPTS_PER_STEP = 260
const ARM = CELL * 0.4

const temperature = computed(() => Math.max(0.1, Math.min(2, props.params.temperature ?? 1.2)))
const step = computed(() => Math.max(0, Math.min(150, Math.round(props.params.step ?? 0))))

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
const TAU = Math.PI * 2
function wrap(a: number) { return a - TAU * Math.round(a / TAU) }

function localEnergy(g: Float32Array, row: number, col: number, angle: number) {
  const up = g[((row - 1 + ROWS) % ROWS) * COLS + col]
  const down = g[((row + 1) % ROWS) * COLS + col]
  const left = g[row * COLS + ((col - 1 + COLS) % COLS)]
  const right = g[row * COLS + ((col + 1) % COLS)]
  return -J * (Math.cos(angle - up) + Math.cos(angle - down) + Math.cos(angle - left) + Math.cos(angle - right))
}

const world = computed(() => {
  const rnd = makeRng(19700411)
  const g = new Float32Array(N)
  for (let i = 0; i < N; i++) g[i] = rnd() * TAU
  const T = temperature.value
  for (let s = 0; s < step.value; s++) {
    for (let a = 0; a < ATTEMPTS_PER_STEP; a++) {
      const row = Math.floor(rnd() * ROWS)
      const col = Math.floor(rnd() * COLS)
      const site = row * COLS + col
      const oldAngle = g[site]
      const newAngle = rnd() * TAU
      const dE = localEnergy(g, row, col, newAngle) - localEnergy(g, row, col, oldAngle)
      if (dE < 0 || rnd() < Math.exp(-dE / T)) g[site] = newAngle
    }
  }
  let sumCos = 0
  let sumSin = 0
  for (let i = 0; i < N; i++) { sumCos += Math.cos(g[i]); sumSin += Math.sin(g[i]) }
  const order = Math.hypot(sumCos, sumSin) / N
  // one plaquette per grid point, wrapping to the point below-right, periodic boundary
  const vortices: { row: number; col: number; sign: 1 | -1 }[] = []
  for (let row = 0; row < ROWS; row++)
    for (let col = 0; col < COLS; col++) {
      const a00 = g[row * COLS + col]
      const a10 = g[row * COLS + ((col + 1) % COLS)]
      const a11 = g[((row + 1) % ROWS) * COLS + ((col + 1) % COLS)]
      const a01 = g[((row + 1) % ROWS) * COLS + col]
      const winding = (wrap(a10 - a00) + wrap(a11 - a10) + wrap(a01 - a11) + wrap(a00 - a01)) / TAU
      if (winding > 0.5) vortices.push({ row, col, sign: 1 })
      else if (winding < -0.5) vortices.push({ row, col, sign: -1 })
    }
  return { g, order, vortices }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= 150) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('xy.temperature'), value: fmt(temperature.value, 2) },
  { label: t('xy.step'), value: String(step.value) },
  { label: t('xy.order'), value: fmt(world.value.order, 3), color: 'var(--accent)' },
  { label: t('xy.vortexPairs'), value: String(Math.floor(world.value.vortices.length / 2)) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('xy.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('xy.hint') }}</text>
      <rect :x="X0 - 10" :y="Y0 - 10" :width="COLS * CELL + 20" :height="ROWS * CELL + 20" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g v-for="(angle, i) in world.g" :key="i">
        <line
          :x1="X0 + (i % COLS) * CELL + CELL / 2 - Math.cos(angle) * ARM"
          :y1="Y0 + Math.floor(i / COLS) * CELL + CELL / 2 - Math.sin(angle) * ARM"
          :x2="X0 + (i % COLS) * CELL + CELL / 2 + Math.cos(angle) * ARM"
          :y2="Y0 + Math.floor(i / COLS) * CELL + CELL / 2 + Math.sin(angle) * ARM"
          stroke="var(--fg)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <circle
        v-for="(v, i) in world.vortices"
        :key="'v' + i"
        :cx="X0 + (v.col + 1) * CELL"
        :cy="Y0 + (v.row + 1) * CELL"
        r="5"
        :fill="v.sign > 0 ? 'var(--pos)' : 'var(--neg)'"
      />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
