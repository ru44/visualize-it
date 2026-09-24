<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Each atom is given its own random decay time in units of half-lives, drawn from the exponential
// distribution that makes P(decayed by k half-lives) = 1 - (1/2)^k exactly — so atom i has decayed
// once "time" (k) passes its personal lifetimes[i]. Same seed and formula as RadioactiveDecay3D.vue,
// so both views agree on exactly which atoms are alive for the same sliders.
const MAX_N = 300
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
const rng = makeRng(20260924)
const LIFETIMES = Array.from({ length: MAX_N }, () => -Math.log2(1 - Math.min(0.999999, rng())))

function fmtDuration(days: number): string {
  if (days < 1) return `${fmt(days * 24, 1)} h`
  if (days < 365.25) return `${fmt(days, 1)} d`
  const years = days / 365.25
  if (years < 1e4) return `${fmt(years, 1)} yr`
  if (years < 1e9) return `${fmt(years / 1e6, 2)} My`
  return `${fmt(years / 1e9, 2)} Gy`
}

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const halfLife = computed(() => Math.max(0, Math.min(13, props.params.halfLife ?? 3)))
const time = computed(() => Math.max(0, Math.min(8, props.params.time ?? 0)))
const N0 = computed(() => Math.max(10, Math.min(MAX_N, Math.round(props.params.N0 ?? 100))))
const halfLifeDays = computed(() => Math.pow(10, halfLife.value))

const aliveCount = computed(() => {
  let n = 0
  for (let i = 0; i < N0.value; i++) if (LIFETIMES[i] > time.value) n++
  return n
})
const expected = computed(() => N0.value * Math.pow(0.5, time.value))

const GRID = { x: 20, y: 68, w: 400, h: 368 }
const cols = computed(() => Math.max(4, Math.ceil(Math.sqrt((N0.value * GRID.w) / GRID.h))))
const rows = computed(() => Math.ceil(N0.value / cols.value))
const cellW = computed(() => GRID.w / cols.value)
const cellH = computed(() => GRID.h / rows.value)
const dotR = computed(() => Math.min(9, Math.min(cellW.value, cellH.value) * 0.34))
const atoms = computed(() =>
  Array.from({ length: N0.value }, (_, i) => ({
    x: GRID.x + (i % cols.value) * cellW.value + cellW.value / 2,
    y: GRID.y + Math.floor(i / cols.value) * cellH.value + cellH.value / 2,
    alive: LIFETIMES[i] > time.value,
  })),
)

const CH = { x: 452, y: 90, w: 328, h: 300 }
const K_MAX = 8
const cx = (k: number) => CH.x + (k / K_MAX) * CH.w
const cy = (frac: number) => CH.y + CH.h - frac * CH.h
const theoryPath = computed(() => Array.from({ length: 81 }, (_, i) => { const k = (i / 80) * K_MAX; return `${i ? 'L' : 'M'}${cx(k).toFixed(1)},${cy(Math.pow(0.5, k)).toFixed(1)}` }).join(''))
// observed fraction sampled at many k up to "now", from the same fixed lifetimes — shows the jagged
// real count settling onto the smooth curve as N0 grows.
const observedPath = computed(() => {
  const steps = Math.max(2, Math.round(time.value * 20))
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const k = (i / steps) * time.value
    let n = 0
    for (let j = 0; j < N0.value; j++) if (LIFETIMES[j] > k) n++
    d += `${i ? 'L' : 'M'}${cx(k).toFixed(1)},${cy(n / N0.value).toFixed(1)}`
  }
  return d
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 60) {
    last = now
    if (time.value >= 8) playing.value = false
    else emit('set', 'time', Math.min(8, time.value + 0.06))
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('rdecay.halfLife'), value: fmtDuration(halfLifeDays.value) },
  { label: t('rdecay.elapsed'), value: fmtDuration(halfLifeDays.value * time.value) },
  { label: t('rdecay.k'), value: fmt(time.value, 2) },
  { label: t('rdecay.alive'), value: `${aliveCount.value} / ${N0.value}`, color: 'var(--accent)' },
  { label: t('rdecay.expected'), value: fmt(expected.value, 1), color: 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'time', 0)">{{ t('rdecay.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="18" font-size="12" fill="var(--muted)">{{ t('rdecay.hint') }}</text>
      <rect :x="GRID.x" :y="GRID.y" :width="GRID.w" :height="GRID.h" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <circle v-for="(a, i) in atoms" :key="i" :cx="a.x" :cy="a.y" :r="dotR" :fill="a.alive ? 'var(--accent)' : 'var(--muted)'" :fill-opacity="a.alive ? 1 : 0.35" />

      <g class="num" font-size="10" fill="var(--muted)">
        <template v-for="v in [0, 0.25, 0.5, 0.75, 1]" :key="'y' + v">
          <line :x1="CH.x" :x2="CH.x + CH.w" :y1="cy(v)" :y2="cy(v)" stroke="var(--grid)" />
          <text :x="CH.x - 6" :y="cy(v) + 3" text-anchor="end">{{ v }}</text>
        </template>
        <template v-for="v in [0, 2, 4, 6, 8]" :key="'x' + v">
          <text :x="cx(v)" :y="CH.y + CH.h + 16" text-anchor="middle">{{ v }}</text>
        </template>
      </g>
      <text class="num" :x="CH.x + CH.w" :y="CH.y + CH.h + 32" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('rdecay.axisK') }}</text>
      <text class="num" :x="CH.x" :y="CH.y - 30" font-size="11" fill="var(--muted)">{{ t('rdecay.axisFrac') }}</text>

      <path :d="theoryPath" fill="none" stroke="var(--fg)" stroke-width="2" />
      <path :d="observedPath" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-opacity="0.85" />
      <line :x1="cx(time)" :x2="cx(time)" :y1="CH.y" :y2="CH.y + CH.h" stroke="var(--pos)" stroke-opacity="0.4" stroke-dasharray="3 3" />
      <circle :cx="cx(time)" :cy="cy(aliveCount / N0)" r="5.5" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="1.5" />
      <circle :cx="cx(time)" :cy="cy(expected / N0)" r="4" fill="none" stroke="var(--fg)" stroke-width="2" />

      <g class="num" font-size="11" text-anchor="start">
        <text :x="CH.x + 6" :y="CH.y + 16" fill="var(--fg)">— {{ t('rdecay.legendTheory') }}</text>
        <text :x="CH.x + 6" :y="CH.y + 32" fill="var(--accent-2)">— {{ t('rdecay.legendActual') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
