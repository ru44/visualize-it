<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Flocking written as a fluid (Toner–Tu): instead of tracking every animal, track a density and
// a velocity at every point of a ring of cells. Each cell relaxes toward a preferred speed,
// smooths out against its neighbours, and pressure pushes flock away from crowded cells. Together
// these turn a small starting ripple into a density wave that keeps travelling around the ring.
// params: diffusion (how strongly neighbours match velocity), pressure (how hard crowding pushes
// back), step (ticks shown; scrubs the simulation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 32
const V0 = 1
const DT = 0.06
const MAX_STEP = 200
const STRIP = { x0: 60, x1: 740, yMid: 260, cellH: 130 }
const CELL_W = (STRIP.x1 - STRIP.x0) / N

const diffusion = computed(() => Math.max(0.1, Math.min(2, props.params.diffusion ?? 0.6)))
const pressure = computed(() => Math.max(0, Math.min(2, props.params.pressure ?? 0.8)))
const step = computed(() => Math.max(0, Math.min(MAX_STEP, Math.round(props.params.step ?? 0))))

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
}

const sim = computed(() => {
  const rnd = seeded(777)
  let rho = Array.from({ length: N }, (_, i) => 1 + 0.4 * Math.cos((2 * Math.PI * i) / N))
  let v = Array.from({ length: N }, () => V0 + (rnd() - 0.5) * 0.2)
  const D = diffusion.value
  const P = pressure.value
  for (let tt = 0; tt < step.value; tt++) {
    const newRho = new Array<number>(N)
    const newV = new Array<number>(N)
    for (let i = 0; i < N; i++) {
      const im = (i - 1 + N) % N
      const ip = (i + 1) % N
      const lap = v[im] + v[ip] - 2 * v[i]
      const pref = (V0 * V0 - v[i] * v[i]) * v[i]
      const pgrad = rho[ip] - rho[im]
      const dv = D * lap + 0.5 * pref - P * 0.5 * pgrad
      let nv = v[i] + dv * DT
      nv = Math.max(-3, Math.min(3, nv))
      const flux = rho[ip] * v[ip] - rho[im] * v[im]
      let nr = rho[i] - 0.5 * flux * DT
      nr = Math.max(0.05, Math.min(3, nr))
      newV[i] = nv
      newRho[i] = nr
    }
    rho = newRho
    v = newV
  }
  const meanV = v.reduce((s, x) => s + Math.abs(x), 0) / N
  const meanRho = rho.reduce((s, x) => s + x, 0) / N
  const variance = Math.sqrt(rho.reduce((s, x) => s + (x - meanRho) ** 2, 0) / N)
  return { rho, v, meanV, variance }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 40) {
    last = now
    if (step.value >= MAX_STEP) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('toner.step'), value: String(step.value) },
  { label: t('toner.speed'), value: fmt(sim.value.meanV, 2), color: 'var(--accent)' },
  { label: t('toner.wave'), value: fmt(sim.value.variance, 2), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('toner.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('toner.hint') }}</text>
      <text class="num" x="16" y="42" font-size="11" fill="var(--muted)">{{ t('toner.ring') }}</text>
      <g v-for="(r, i) in sim.rho" :key="i">
        <rect :x="STRIP.x0 + i * CELL_W" :y="STRIP.yMid - STRIP.cellH / 2" :width="CELL_W - 1" :height="STRIP.cellH" fill="var(--accent)" :fill-opacity="Math.min(0.85, r * 0.32)" />
        <line
          :x1="STRIP.x0 + i * CELL_W + CELL_W / 2"
          :y1="STRIP.yMid"
          :x2="STRIP.x0 + i * CELL_W + CELL_W / 2 + sim.v[i] * 16"
          :y2="STRIP.yMid"
          :stroke="sim.v[i] >= 0 ? 'var(--pos)' : 'var(--neg)'"
          stroke-width="2.5"
        />
      </g>
      <rect :x="STRIP.x0" :y="STRIP.yMid - STRIP.cellH / 2" :width="STRIP.x1 - STRIP.x0" :height="STRIP.cellH" fill="none" stroke="var(--line)" rx="4" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
