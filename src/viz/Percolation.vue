<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Bernoulli site percolation: every cell gets a fixed random threshold once; a cell is "open"
// whenever p exceeds its own threshold. Sweeping p from 0 to 1 opens cells one by one — the same
// picture every time for a given p — until, near p ≈ 0.593 on a square lattice, an open cluster
// first connects the top of the grid to the bottom.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 40
const ROWS = 40
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40

const p = computed(() => Math.max(0, Math.min(1, props.params.p ?? 0.3)))

// A fixed random threshold per cell, generated once, so sweeping p reveals the same picture.
function makeThresholds() {
  let s = 24681357
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
  return Array.from({ length: COLS * ROWS }, () => rnd())
}
const thresholds = makeThresholds()

const world = computed(() => {
  const open = thresholds.map((th) => th < p.value)
  // Flood-fill from every open cell in the top row; if it reaches the bottom row, the grid percolates.
  const cluster = new Uint8Array(open.length)
  const stack: number[] = []
  for (let x = 0; x < COLS; x++) if (open[x]) { stack.push(x); cluster[x] = 1 }
  let reachedBottom = false
  while (stack.length) {
    const idx = stack.pop()!
    const x = idx % COLS
    const y = (idx / COLS) | 0
    if (y === ROWS - 1) reachedBottom = true
    const neigh = [x > 0 ? idx - 1 : -1, x < COLS - 1 ? idx + 1 : -1, y > 0 ? idx - COLS : -1, y < ROWS - 1 ? idx + COLS : -1]
    for (const n of neigh) if (n >= 0 && open[n] && !cluster[n]) { cluster[n] = 1; stack.push(n) }
  }
  const openCount = open.reduce((a, b) => a + (b ? 1 : 0), 0)
  return { open, cluster, reachedBottom, openCount }
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 40) {
    last = now
    if (p.value >= 1 || world.value.reachedBottom) playing.value = false
    else emit('set', 'p', Math.round((p.value + 0.005) * 1000) / 1000)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('perc.p'), value: p.value.toFixed(3) },
  { label: t('perc.open'), value: `${((100 * world.value.openCount) / (COLS * ROWS)).toFixed(1)}%` },
  { label: t('perc.status'), value: world.value.reachedBottom ? t('perc.spans') : t('perc.notYet'), color: world.value.reachedBottom ? 'var(--accent)' : 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'p', 0)">{{ t('perc.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('perc.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(open, i) in world.open"
          v-show="open"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 0.5"
          :height="CELL - 0.5"
          :fill="world.cluster[i] ? 'var(--accent)' : 'var(--line)'"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
