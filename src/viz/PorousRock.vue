<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Site percolation. Each cell is open (pore) with probability `porosity`. Water floods from the
// top row through open neighbours; above the critical porosity (~0.59) it almost always reaches
// the bottom. params: porosity (fraction open), seed (which random rock), step (BFS depth shown).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 48
const ROWS = 28
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40

const porosity = computed(() => Math.max(0.2, Math.min(0.8, props.params.porosity ?? 0.55)))
const seed = computed(() => Math.max(1, Math.min(9, Math.round(props.params.seed ?? 1))))
const step = computed(() => Math.max(0, Math.min(60, Math.round(props.params.step ?? 0))))

function rng(s: number) {
  let x = s
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// grid: true = open pore, false = rock. Deterministic for a given (seed, porosity).
const world = computed(() => {
  const rnd = rng(seed.value * 7919 + 13)
  const open = new Array(COLS * ROWS)
  for (let i = 0; i < open.length; i++) open[i] = rnd() < porosity.value

  // BFS from the top row through open cells; dist[i] = number of steps to reach it.
  const dist = new Array(COLS * ROWS).fill(-1)
  let frontier: number[] = []
  for (let x = 0; x < COLS; x++) {
    const i = x
    if (open[i]) { dist[i] = 0; frontier.push(i) }
  }
  let depth = 0
  while (frontier.length) {
    depth++
    const next: number[] = []
    for (const i of frontier) {
      const x = i % COLS
      const y = Math.floor(i / COLS)
      const neigh = [x > 0 ? i - 1 : -1, x < COLS - 1 ? i + 1 : -1, y > 0 ? i - COLS : -1, y < ROWS - 1 ? i + COLS : -1]
      for (const n of neigh) if (n >= 0 && open[n] && dist[n] === -1) { dist[n] = depth; next.push(n) }
    }
    frontier = next
  }
  const maxDepth = dist.reduce((m, d) => Math.max(m, d), 0)
  const percolates = Array.from({ length: COLS }, (_, x) => dist[(ROWS - 1) * COLS + x]).some((d) => d >= 0)
  return { open, dist, maxDepth, percolates }
})

const wet = computed(() => world.value.dist.filter((d) => d >= 0 && d <= step.value).length)
const percolatedNow = computed(() => {
  for (let x = 0; x < COLS; x++) { const d = world.value.dist[(ROWS - 1) * COLS + x]; if (d >= 0 && d <= step.value) return true }
  return false
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 55) {
    last = now
    if (step.value >= Math.min(60, world.value.maxDepth + 4)) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

function shuffle() { emit('set', 'seed', (seed.value % 9) + 1); emit('set', 'step', 0) }

const readouts = computed(() => [
  { label: t('rock.porosity'), value: fmt(porosity.value, 2) },
  { label: t('rock.step'), value: String(step.value) },
  { label: t('rock.wet'), value: String(wet.value), color: 'var(--accent)' },
  { label: t('rock.percolates'), value: percolatedNow.value ? t('rock.yes') : t('rock.no'), color: percolatedNow.value ? 'var(--pos)' : 'var(--muted)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="shuffle">{{ t('rock.shuffle') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('rock.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('rock.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(o, i) in world.open"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          rx="1"
          :fill="!o ? 'var(--muted)' : (world.dist[i] >= 0 && world.dist[i] <= step) ? 'var(--accent)' : 'var(--panel)'"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
