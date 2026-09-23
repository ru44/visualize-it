<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Spatial public goods game. Each cell is a loner (fixed payoff sigma), a cooperator (pays 1 into
// the shared pot) or a defector (pays 0). Every group of 9 (a cell and its 8 neighbours) multiplies
// its pot by r and splits it among the contributors; a cell copies whichever neighbour (or itself)
// earned the most. Free-riding wins locally, but a high enough r keeps cooperators alive.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 36
const ROWS = 22
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const N = COLS * ROWS

const r = computed(() => Math.max(1, Math.min(8, props.params.r ?? 3)))
const sigma = computed(() => Math.max(-1, Math.min(2, props.params.sigma ?? 1)))
const gen = computed(() => Math.max(0, Math.min(40, Math.round(props.params.gen ?? 0))))

function rng(s: number) {
  let x = s
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648)
}

const block = (i: number) => {
  const x = i % COLS
  const y = Math.floor(i / COLS)
  const out: number[] = []
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) out.push(((y + dy + ROWS) % ROWS) * COLS + ((x + dx + COLS) % COLS))
  return out
}
const BLOCK = Array.from({ length: N }, (_, i) => block(i))

function fitnessOf(grid: number[], i: number) {
  const type = grid[i]
  if (type === 0) return sigma.value
  let participating = 0
  let cooperating = 0
  for (const n of BLOCK[i]) { if (grid[n] > 0) participating++; if (grid[n] === 1) cooperating++ }
  if (participating <= 1) return sigma.value
  return type === 1 ? (r.value * cooperating) / participating - 1 : (r.value * cooperating) / participating
}

// Recomputes the whole history from a fixed seed up to `gen`, so the same sliders always give the
// same picture.
const world = computed(() => {
  const rnd = rng(19700101)
  let grid = Array.from({ length: N }, () => Math.floor(rnd() * 3))
  for (let round = 0; round < gen.value; round++) {
    const fitness = grid.map((_, i) => fitnessOf(grid, i))
    const next = grid.map((_, i) => {
      let best = -Infinity
      let bestType = grid[i]
      for (const n of BLOCK[i]) if (fitness[n] > best) { best = fitness[n]; bestType = grid[n] }
      return bestType
    })
    grid = next
  }
  let loners = 0
  let cooperators = 0
  let defectors = 0
  for (const g of grid) { if (g === 0) loners++; else if (g === 1) cooperators++; else defectors++ }
  return { grid, loners, cooperators, defectors }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 150) {
    last = now
    if (gen.value >= 40) playing.value = false
    else emit('set', 'gen', gen.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('pg.gen'), value: String(gen.value) },
  { label: t('pg.cooperators'), value: `${fmt((100 * world.value.cooperators) / N, 0)}%`, color: 'var(--pos)' },
  { label: t('pg.defectors'), value: `${fmt((100 * world.value.defectors) / N, 0)}%`, color: 'var(--neg)' },
  { label: t('pg.loners'), value: `${fmt((100 * world.value.loners) / N, 0)}%`, color: 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'gen', 0)">{{ t('pg.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('pg.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(c, i) in world.grid"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          :fill="c === 1 ? 'var(--pos)' : c === 2 ? 'var(--neg)' : 'var(--muted)'"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
