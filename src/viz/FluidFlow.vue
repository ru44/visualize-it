<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Particles carried past a round obstacle. Near the obstacle every streamline bulges around it
// (Bernoulli: the gap is smaller there, so the flow must speed up). The Reynolds number Re,
// built from speed, obstacle size and viscosity, decides what happens behind it: below about 47
// the wake stays smooth; above it, it starts to wave — the start of a vortex street.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PXPM = 90 // px per metre
const CX = W / 2
const CY = H / 2
const XSPAN = 4.2 // metres either side of the obstacle
const T_MAX = 8

const U = computed(() => Math.max(0.2, props.params.U ?? 1.2))
const R = computed(() => Math.max(0.15, Math.min(1, props.params.R ?? 0.5)))
const nu = computed(() => Math.max(0.0003, props.params.nu ?? 0.01))
const tNow = computed(() => Math.max(0, Math.min(T_MAX, props.params.t ?? 0)))

const Re = computed(() => (2 * U.value * R.value) / nu.value)
const shedding = computed(() => Re.value > 47)
const strouhal = computed(() => (shedding.value ? Math.max(0.05, Math.min(0.22, 0.2 * (1 - 21 / Re.value))) : 0))
const shedFreq = computed(() => (strouhal.value * U.value) / (2 * R.value))
const wakeAmp = computed(() => R.value * 0.85 * Math.min(1, Math.max(0, (Re.value - 47) / 450)))

function deflect(x: number, y0: number) {
  const bulge = (R.value * R.value * 1.6) / (R.value * R.value + x * x + y0 * y0)
  let y = y0 + Math.sign(y0 || 1) * bulge
  if (Math.abs(x) < R.value * 1.5 && Math.abs(y) < R.value * 1.08) y = Math.sign(y0 || 1) * R.value * 1.08
  if (x > R.value * 1.1 && shedding.value) {
    const k = (2 * Math.PI) / (2 * R.value * 1.4)
    const decay = Math.exp(-(x - R.value) / (6 * R.value))
    y += wakeAmp.value * Math.sin(k * (x - R.value) - 2 * Math.PI * shedFreq.value * tNow.value) * decay
  }
  return y
}

const LANES = [-1.5, -1.05, -0.65, -0.3, 0.3, 0.65, 1.05, 1.5]
const PER_LANE = 3
const particles = computed(() => {
  const out: { x: number; y: number }[] = []
  for (let l = 0; l < LANES.length; l++) {
    for (let k = 0; k < PER_LANE; k++) {
      const phase = k / PER_LANE
      const cycle = ((tNow.value * (U.value / 2.6)) / (2 * XSPAN) + phase + l * 0.11) % 1
      const x = -XSPAN + cycle * 2 * XSPAN
      out.push({ x, y: deflect(x, LANES[l]) })
    }
  }
  return out
})

const streamlines = computed(() =>
  LANES.map((y0) => {
    let d = ''
    for (let i = 0; i <= 60; i++) {
      const x = -XSPAN + (i / 60) * 2 * XSPAN
      const y = deflect(x, y0)
      d += `${i ? 'L' : 'M'}${(CX + x * PXPM).toFixed(1)},${(CY - y * PXPM).toFixed(1)}`
    }
    return d
  }),
)

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    let v = tNow.value + dt
    if (v >= T_MAX) v -= T_MAX
    emit('set', 't', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = true
    raf = requestAnimationFrame(tick)
  }
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: 'Re', value: fmt(Re.value, 0), color: 'var(--accent)' },
  { label: t('flow.regime'), value: shedding.value ? t('flow.vortices') : t('flow.smooth'), color: shedding.value ? 'var(--accent-2)' : 'var(--pos)' },
  { label: t('flow.freq'), value: shedding.value ? `${fmt(shedFreq.value, 2)} Hz` : '—' },
])
</script>

<template>
  <div class="relative">
    <button class="num absolute end-3 top-3 rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('flow.hint') }}</text>
      <path v-for="(d, i) in streamlines" :key="i" :d="d" fill="none" stroke="var(--line)" stroke-width="1" />
      <circle :cx="CX" :cy="CY" :r="R * PXPM" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />
      <circle v-for="(p, i) in particles" :key="i" :cx="CX + p.x * PXPM" :cy="CY - p.y * PXPM" r="3.2" :fill="shedding ? 'var(--accent-2)' : 'var(--accent)'" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
