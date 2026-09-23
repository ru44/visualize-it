<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Conway's Game of Life. Four rules on a grid of cells produce gliders, blinkers and still lifes.
// params: start (0 random, 1 glider, 2 pulsar), density (% alive at generation 0), gen (generation shown).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const COLS = 48
const ROWS = 28
const CELL = Math.min((W - 40) / COLS, (H - 60) / ROWS)
const X0 = (W - COLS * CELL) / 2
const Y0 = 40

const start = computed(() => Math.round(props.params.start ?? 0))
const density = computed(() => Math.max(2, Math.min(60, props.params.density ?? 25)))
const gen = computed(() => Math.max(0, Math.min(120, Math.round(props.params.gen ?? 0))))

const GLIDER = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
const PULSAR = [[2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0], [0, 2], [5, 2], [7, 2], [12, 2], [0, 3], [5, 3], [7, 3], [12, 3], [0, 4], [5, 4], [7, 4], [12, 4], [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5]]

function seedGrid(): boolean[] {
  const g = new Array(COLS * ROWS).fill(false)
  if (start.value === 1) {
    for (let k = 0; k < 6; k++) for (const [x, y] of GLIDER) g[(3 + y + k * 4) * COLS + (3 + x + k * 7)] = true
  } else if (start.value === 2) {
    for (const [x, y] of PULSAR) g[(7 + y) * COLS + (17 + x)] = true
    for (const [x, y] of PULSAR) g[(7 + y) * COLS + (2 + x)] = true
  } else {
    let s = 12345
    const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
    for (let i = 0; i < g.length; i++) g[i] = rnd() * 100 < density.value
  }
  return g
}

function stepOnce(g: boolean[]) {
  const out = new Array(COLS * ROWS).fill(false)
  let born = 0
  let died = 0
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++) {
      let n = 0
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          const nx = (x + dx + COLS) % COLS
          const ny = (y + dy + ROWS) % ROWS
          if (g[ny * COLS + nx]) n++
        }
      const alive = g[y * COLS + x]
      const next = alive ? n === 2 || n === 3 : n === 3
      out[y * COLS + x] = next
      if (next && !alive) born++
      if (!next && alive) died++
    }
  return { out, born, died }
}

const world = computed(() => {
  let g = seedGrid()
  let born = 0
  let died = 0
  for (let i = 0; i < gen.value; i++) {
    const r = stepOnce(g)
    g = r.out
    born = r.born
    died = r.died
  }
  return { g, born, died }
})
const alive = computed(() => world.value.g.reduce((s, c) => s + (c ? 1 : 0), 0))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (gen.value >= 120) playing.value = false
    else emit('set', 'gen', gen.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('life.gen'), value: String(gen.value) },
  { label: t('life.alive'), value: String(alive.value), color: 'var(--accent)' },
  { label: t('life.born'), value: String(world.value.born), color: 'var(--pos)' },
  { label: t('life.died'), value: String(world.value.died), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'gen', 0)">{{ t('life.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('life.hint') }}</text>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="COLS * CELL + 4" :height="ROWS * CELL + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g>
        <rect
          v-for="(c, i) in world.g"
          v-show="c"
          :key="i"
          :x="X0 + (i % COLS) * CELL + 0.5"
          :y="Y0 + Math.floor(i / COLS) * CELL + 0.5"
          :width="CELL - 1"
          :height="CELL - 1"
          rx="2"
          fill="var(--accent)"
        />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
