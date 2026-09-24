<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A branching tree: generation 0 is one neutron that causes one fission. Each fission's node spawns
// floor(k) children plus, with probability equal to k's fractional part, one more — a Galton-Watson
// branching process whose average is exactly k, the multiplication factor. Below k = 1 lineages tend
// to die out, at k = 1 each node has exactly one child (a straight, steady line), above k = 1 the row
// widths grow every generation. Drawing is capped per row for speed; the population readout is the
// exact closed form k^generations, so it stays correct even past the cap.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const X0 = 60
const X1 = 740
const Y0 = 56
const Y1 = 420
const MAX_GEN = 12
const CAP = 28

const k = computed(() => Math.max(0.5, Math.min(2.5, props.params.k ?? 1)))
const generations = computed(() => Math.max(0, Math.min(MAX_GEN, Math.round(props.params.generations ?? 0))))

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

interface Node { x: number; y: number; parent: number }

const tree = computed(() => {
  const G = generations.value
  const rnd = makeRng(1000 + Math.round(k.value * 1000))
  const floorK = Math.floor(k.value)
  const frac = k.value - floorK
  const rows: Node[][] = [[{ x: (X0 + X1) / 2, y: Y0, parent: -1 }]]
  const rowH = G > 0 ? (Y1 - Y0) / G : 0
  const overflow: number[] = [0]
  for (let g = 1; g <= G; g++) {
    const prev = rows[g - 1]
    const parents: number[] = []
    for (let pi = 0; pi < prev.length && parents.length < CAP; pi++) {
      let children = floorK
      if (rnd() < frac) children++
      for (let c = 0; c < children && parents.length < CAP; c++) parents.push(pi)
    }
    const y = Y0 + rowH * g
    const n = parents.length
    rows.push(parents.map((pi, i) => ({ x: n === 1 ? (X0 + X1) / 2 : X0 + ((i + 0.5) / n) * (X1 - X0), y, parent: pi })))
    overflow.push(Math.max(0, Math.round(k.value ** g) - n))
  }
  return { rows, overflow }
})

// Matches the tree exactly while it fits on screen; once a row hits the cap, falls back to the
// exact closed form k^generations so the number stays honest even where the drawing cannot keep up.
const population = computed(() => {
  const row = tree.value.rows[generations.value] ?? []
  return row.length < CAP ? row.length : Math.round(k.value ** generations.value)
})
const status = computed(() => (k.value < 0.98 ? { key: 'chain.dying' as const, color: 'var(--neg)' } : k.value > 1.02 ? { key: 'chain.growing' as const, color: 'var(--pos)' } : { key: 'chain.steady' as const, color: 'var(--accent)' }))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 500) {
    last = now
    if (generations.value >= MAX_GEN) playing.value = false
    else emit('set', 'generations', generations.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: 'k', value: fmt(k.value, 2) },
  { label: t('chain.generations'), value: String(generations.value) },
  { label: t('chain.population'), value: fmt(population.value, 0), color: status.value.color },
  { label: t('chain.status'), value: t(status.value.key), color: status.value.color },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'generations', 0)">{{ t('chain.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('chain.hint') }}</text>
      <g stroke="var(--line)" stroke-width="1">
        <template v-for="(row, g) in tree.rows" :key="'l' + g">
          <template v-if="g > 0">
            <line v-for="(nd, i) in row" :key="'ln' + i" :x1="tree.rows[g - 1][nd.parent].x" :y1="tree.rows[g - 1][nd.parent].y" :x2="nd.x" :y2="nd.y" />
          </template>
        </template>
      </g>
      <g v-for="(row, g) in tree.rows" :key="'r' + g">
        <circle v-for="(nd, i) in row" :key="'n' + i" :cx="nd.x" :cy="nd.y" r="5.5" :fill="status.color" />
        <text v-if="row.length && tree.overflow[g] > 0" class="num" :x="X1 + 4" :y="row[0].y + 4" font-size="11" fill="var(--muted)">{{ t('chain.more', { n: fmt(tree.overflow[g], 0) }) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
