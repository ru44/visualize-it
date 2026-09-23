<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Carves a perfect maze (a spanning tree of the grid) with two algorithms:
// depth-first backtracking (long, winding corridors) and randomized Prim's (short, even branches).
// params: algo (0 DFS, 1 Prim), size (grid side length), step (0..1 progress through the carving).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const algo = computed(() => (Math.round(props.params.algo ?? 0) ? 1 : 0))
const size = computed(() => Math.max(5, Math.min(18, Math.round(props.params.size ?? 10))))
const seed = ref(1)

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}

interface Edge { a: number; b: number }
const trace = computed<Edge[]>(() => {
  const n = size.value
  const V = n * n
  const rng = makeRng(seed.value * 1000 + n)
  const visited = new Array(V).fill(false)
  const nbrs = (k: number) => {
    const i = Math.floor(k / n)
    const j = k % n
    const out: number[] = []
    if (i > 0) out.push(k - n)
    if (i < n - 1) out.push(k + n)
    if (j > 0) out.push(k - 1)
    if (j < n - 1) out.push(k + 1)
    return out
  }
  const frames: Edge[] = []
  if (algo.value === 0) {
    const stack = [0]
    visited[0] = true
    while (stack.length) {
      const cur = stack[stack.length - 1]
      const open = nbrs(cur).filter((x) => !visited[x])
      if (open.length) {
        const next = open[Math.floor(rng() * open.length)]
        visited[next] = true
        frames.push({ a: cur, b: next })
        stack.push(next)
      } else stack.pop()
    }
  } else {
    visited[0] = true
    let frontier = nbrs(0).map((to) => ({ from: 0, to }))
    while (frontier.length) {
      const idx = Math.floor(rng() * frontier.length)
      const w = frontier[idx]
      frontier = frontier.slice(0, idx).concat(frontier.slice(idx + 1))
      if (visited[w.to]) continue
      visited[w.to] = true
      frames.push({ a: w.from, b: w.to })
      frontier = frontier.concat(nbrs(w.to).filter((x) => !visited[x]).map((to) => ({ from: w.to, to })))
    }
  }
  return frames
})

const progress = computed(() => Math.min(1, Math.max(0, props.params.step ?? 0)))
const fi = computed(() => Math.round(progress.value * trace.value.length))
const opened = computed(() => {
  const s = new Set<string>()
  for (let i = 0; i < fi.value; i++) { const e = trace.value[i]; s.add(e.a < e.b ? `${e.a}-${e.b}` : `${e.b}-${e.a}`) }
  return s
})
const isOpen = (a: number, b: number) => opened.value.has(a < b ? `${a}-${b}` : `${b}-${a}`)
const current = computed(() => trace.value[Math.max(0, fi.value - 1)]?.b ?? 0)

const PAD = 24
const cell = computed(() => Math.min((W - PAD * 2) / size.value, (H - PAD * 2 - 20) / size.value))
const X0 = computed(() => (W - size.value * cell.value) / 2)
const Y0 = 40
const cells = computed(() => Array.from({ length: size.value * size.value }, (_, k) => k))

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    const v = progress.value + dt / 3
    if (v >= 1) (emit('set', 'step', 1), (playing.value = false))
    else emit('set', 'step', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([algo, size, seed], () => (emit('set', 'step', 0), (playing.value = true)))

const readouts = computed(() => [
  { label: t('maze.algo'), value: algo.value === 0 ? t('maze.dfs') : t('maze.prim'), color: 'var(--fg)' },
  { label: t('maze.opened'), value: `${fi.value} / ${trace.value.length}`, color: 'var(--accent)' },
  { label: t('maze.cells'), value: String(size.value * size.value) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && progress >= 1) $emit('set', 'step', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="seed++">{{ t('maze.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('maze.hint') }}</text>
      <rect :x="X0 - 1" :y="Y0 - 1" :width="size * cell + 2" :height="size * cell + 2" fill="var(--sunken)" stroke="var(--fg)" stroke-width="2" />
      <g stroke="var(--fg)" stroke-width="2" stroke-linecap="round">
        <template v-for="k in cells" :key="k">
          <line v-if="k % size < size - 1 && !isOpen(k, k + 1)" :x1="X0 + (k % size + 1) * cell" :y1="Y0 + Math.floor(k / size) * cell" :x2="X0 + (k % size + 1) * cell" :y2="Y0 + (Math.floor(k / size) + 1) * cell" />
          <line v-if="Math.floor(k / size) < size - 1 && !isOpen(k, k + size)" :x1="X0 + (k % size) * cell" :y1="Y0 + (Math.floor(k / size) + 1) * cell" :x2="X0 + (k % size + 1) * cell" :y2="Y0 + (Math.floor(k / size) + 1) * cell" />
        </template>
      </g>
      <rect :x="X0 + 2" :y="Y0 + 2" :width="cell - 4" :height="cell - 4" fill="var(--pos)" />
      <rect :x="X0 + (current % size) * cell + 2" :y="Y0 + Math.floor(current / size) * cell + 2" :width="cell - 4" :height="cell - 4" fill="var(--accent-2)" />
      <rect :x="X0 + (size - 1) * cell + 2" :y="Y0 + (size - 1) * cell + 2" :width="cell - 4" :height="cell - 4" fill="none" stroke="var(--neg)" stroke-width="2" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
