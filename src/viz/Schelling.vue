<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Schelling's segregation model. Two kinds of agents sit on a grid; an agent is unhappy when more
// than `tolerance` of its occupied neighbours are the other kind, and unhappy agents move to a
// random empty cell that makes them happy. Mild tolerance still produces sharp segregation.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 26
const ROWS = 15
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40
const N = COLS * ROWS
const ATTEMPTS = 10

const tolerance = computed(() => Math.max(0.1, Math.min(0.9, props.params.tolerance ?? 0.3)))
const density = computed(() => Math.max(0.3, Math.min(0.95, props.params.density ?? 0.7)))
const gen = computed(() => Math.max(0, Math.min(45, Math.round(props.params.gen ?? 0))))

function rng(s: number) {
  let x = s
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648)
}

const neigh = (i: number) => {
  const x = i % COLS
  const y = Math.floor(i / COLS)
  const out: number[] = []
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    if (!dx && !dy) continue
    out.push(((y + dy + ROWS) % ROWS) * COLS + ((x + dx + COLS) % COLS))
  }
  return out
}
const NEIGH = Array.from({ length: N }, (_, i) => neigh(i))

function unlikeFraction(grid: number[], i: number, type: number) {
  let occ = 0
  let unlike = 0
  for (const n of NEIGH[i]) { const g = grid[n]; if (g > 0) { occ++; if (g !== type) unlike++ } }
  return occ === 0 ? 0 : unlike / occ
}

// Recomputes the whole history from a fixed seed up to `gen`, so the same sliders always give the
// same picture (matches the seeded-shuffle pattern used elsewhere in the site).
const world = computed(() => {
  const rnd = rng(20260101)
  let grid = new Array<number>(N).fill(0)
  const order = [...Array(N).keys()]
  const occupiedCount = Math.round(N * density.value)
  const cells = [...order]
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }
  for (let k = 0; k < occupiedCount; k++) { grid[cells[k]] = rnd() < 0.5 ? 1 : 2 }

  let moved = 0
  for (let round = 0; round < gen.value; round++) {
    moved = 0
    const empties = () => { const e: number[] = []; for (let i = 0; i < N; i++) if (grid[i] === 0) e.push(i); return e }
    for (const i of order) {
      const type = grid[i]
      if (type === 0) continue
      if (unlikeFraction(grid, i, type) <= tolerance.value) continue
      const empty = empties()
      if (!empty.length) continue
      let target = -1
      for (let a = 0; a < ATTEMPTS; a++) {
        const cand = empty[Math.floor(rnd() * empty.length)]
        if (unlikeFraction(grid, cand, type) <= tolerance.value) { target = cand; break }
      }
      if (target >= 0) { grid = grid.slice(); grid[target] = type; grid[i] = 0; moved++ }
    }
  }
  const unhappy = order.filter((i) => grid[i] > 0 && unlikeFraction(grid, i, grid[i]) > tolerance.value).length
  const occupied = order.filter((i) => grid[i] > 0).length
  return { grid, moved, unhappy, occupied }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 130) {
    last = now
    if (gen.value >= 45) playing.value = false
    else emit('set', 'gen', gen.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('sch.gen'), value: String(gen.value) },
  { label: t('sch.unhappy'), value: world.value.occupied ? `${fmt((100 * world.value.unhappy) / world.value.occupied, 0)}%` : '0%', color: 'var(--accent-2)' },
  { label: t('sch.moved'), value: String(world.value.moved) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'gen', 0)">{{ t('sch.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sch.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <circle
          v-for="(c, i) in world.grid"
          v-show="c > 0"
          :key="i"
          :cx="X0 + (i % COLS) * CELL + CELL / 2"
          :cy="Y0 + Math.floor(i / COLS) * CELL + CELL / 2"
          :r="CELL * 0.38"
          :fill="c === 1 ? 'var(--accent)' : 'var(--accent-2)'"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
