<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Ising model: each site is a spin +1/-1 that copies its neighbours through the Metropolis rule.
// Below the Curie temperature the spins line up into one big magnet; above it they scramble.
// params: temperature (T), step (Monte-Carlo sweeps applied so far, drives the animation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 40
const ROWS = 24
const N = COLS * ROWS
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const J = 1 // coupling strength, fixed
const ATTEMPTS_PER_STEP = 320

const temperature = computed(() => Math.max(0.5, Math.min(5, props.params.temperature ?? 3.5)))
const step = computed(() => Math.max(0, Math.min(200, Math.round(props.params.step ?? 0))))

// deterministic PRNG: same seed always draws the same sequence, so (temperature, step) fully determine the picture
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

function neighbourSum(g: Int8Array, row: number, col: number) {
  const up = g[((row - 1 + ROWS) % ROWS) * COLS + col]
  const down = g[((row + 1) % ROWS) * COLS + col]
  const left = g[row * COLS + ((col - 1 + COLS) % COLS)]
  const right = g[row * COLS + ((col + 1) % COLS)]
  return up + down + left + right
}

const world = computed(() => {
  const rnd = makeRng(20260923)
  const g = new Int8Array(N)
  for (let i = 0; i < N; i++) g[i] = rnd() < 0.5 ? 1 : -1
  const T = temperature.value
  for (let s = 0; s < step.value; s++) {
    for (let a = 0; a < ATTEMPTS_PER_STEP; a++) {
      const row = Math.floor(rnd() * ROWS)
      const col = Math.floor(rnd() * COLS)
      const site = row * COLS + col
      const dE = 2 * J * g[site] * neighbourSum(g, row, col)
      if (dE < 0 || rnd() < Math.exp(-dE / T)) g[site] = -g[site]
    }
  }
  let mag = 0
  let energy = 0
  for (let row = 0; row < ROWS; row++)
    for (let col = 0; col < COLS; col++) {
      mag += g[row * COLS + col]
      energy += -J * g[row * COLS + col] * (g[row * COLS + ((col + 1) % COLS)] + g[((row + 1) % ROWS) * COLS + col])
    }
  return { g, mag: mag / N, energy: energy / N }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= 200) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('ising.temperature'), value: fmt(temperature.value, 2) },
  { label: t('ising.step'), value: String(step.value) },
  { label: t('ising.magnetization'), value: fmt(Math.abs(world.value.mag), 3), color: 'var(--accent)' },
  { label: t('ising.energy'), value: fmt(world.value.energy, 3) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('ising.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ising.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(spin, i) in world.g"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          :fill="spin > 0 ? 'var(--accent)' : 'var(--accent-2)'"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
