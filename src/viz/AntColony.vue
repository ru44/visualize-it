<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Each generation, every ant builds a tour biased toward strong pheromone and short edges. All
// pheromone evaporates a little, then the generation's best tour gets more laid on it — so weak
// trails fade and the colony's routes converge on a short one, without any ant seeing the map.
// params: n (cities), rho (evaporation rate), iter (generation shown, 0 = starting pheromone).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 40
const MAX_ITER = 30
const ALPHA = 1
const BETA = 3
const n = computed(() => Math.max(5, Math.min(11, Math.round(props.params.n ?? 8))))
const rho = computed(() => Math.max(0.05, Math.min(0.9, props.params.rho ?? 0.3)))
const seed = ref(1)

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}
const cities = computed(() => {
  const rng = makeRng(seed.value * 100 + n.value)
  return Array.from({ length: n.value }, () => ({ x: 0.1 + rng() * 0.8, y: 0.12 + rng() * 0.76 }))
})
const dist = computed(() => {
  const c = cities.value
  return c.map((a, i) => c.map((b, j) => (i === j ? 0 : Math.hypot(a.x - b.x, a.y - b.y))))
})
const tourLen = (order: number[]) => { const d = dist.value; let s = 0; for (let i = 0; i < order.length; i++) s += d[order[i]][order[(i + 1) % order.length]]; return s }

interface Gen { pher: number[][]; best: number[]; bestLen: number; globalBest: number[]; globalLen: number }
const history = computed<Gen[]>(() => {
  const N = n.value
  const rng = makeRng(seed.value * 733 + N * 17 + Math.round(rho.value * 1000))
  let tau: number[][] = Array.from({ length: N }, () => new Array(N).fill(1))
  const gens: Gen[] = []
  let globalBest: number[] = Array.from({ length: N }, (_, i) => i)
  let globalLen = tourLen(globalBest)
  gens.push({ pher: tau.map((r) => r.slice()), best: globalBest, bestLen: globalLen, globalBest, globalLen })
  for (let g = 0; g < MAX_ITER; g++) {
    let genBest: number[] = []
    let genLen = Infinity
    for (let a = 0; a < N; a++) {
      const visited = [a]
      const remaining = new Set(Array.from({ length: N }, (_, i) => i).filter((i) => i !== a))
      while (remaining.size) {
        const last = visited[visited.length - 1]
        const opts = [...remaining]
        const weights = opts.map((k) => Math.pow(tau[last][k], ALPHA) * Math.pow(1 / Math.max(dist.value[last][k], 0.001), BETA))
        const total = weights.reduce((s, w) => s + w, 0)
        let r = rng() * total
        let pick = opts[opts.length - 1]
        for (let i = 0; i < opts.length; i++) { r -= weights[i]; if (r <= 0) { pick = opts[i]; break } }
        visited.push(pick)
        remaining.delete(pick)
      }
      const len = tourLen(visited)
      if (len < genLen) { genLen = len; genBest = visited }
    }
    const next = tau.map((row) => row.map((v) => v * (1 - rho.value)))
    const dep = 1 / genLen
    for (let i = 0; i < N; i++) { const a = genBest[i], b = genBest[(i + 1) % N]; next[a][b] += dep; next[b][a] += dep }
    tau = next
    if (genLen < globalLen) { globalLen = genLen; globalBest = genBest }
    gens.push({ pher: tau.map((r) => r.slice()), best: genBest, bestLen: genLen, globalBest, globalLen })
  }
  return gens
})

const iter = computed(() => Math.max(0, Math.min(MAX_ITER, Math.round(props.params.iter ?? 0))))
const frame = computed(() => history.value[iter.value])
const maxPher = computed(() => Math.max(1, ...frame.value.pher.flat()))

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 160) {
    last = now
    if (iter.value >= MAX_ITER) playing.value = false
    else emit('set', 'iter', iter.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([n, rho, seed], () => (emit('set', 'iter', 0), (playing.value = true)))

const px = (x: number) => PAD + x * (W - PAD * 2)
const py = (y: number) => PAD + y * (H - PAD * 2 - 30)
const pathD = (order: number[]) => order.map((c, i) => `${i ? 'L' : 'M'}${px(cities.value[c].x).toFixed(1)},${py(cities.value[c].y).toFixed(1)}`).join(' ') + ' Z'
const edges = computed(() => {
  const N = n.value
  const out: { x1: number; y1: number; x2: number; y2: number; w: number }[] = []
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) out.push({ x1: px(cities.value[i].x), y1: py(cities.value[i].y), x2: px(cities.value[j].x), y2: py(cities.value[j].y), w: frame.value.pher[i][j] / maxPher.value })
  return out
})

const readouts = computed(() => [
  { label: t('aco.iter'), value: `${iter.value} / ${MAX_ITER}` },
  { label: t('aco.genBest'), value: fmt(frame.value.bestLen, 3), color: 'var(--accent-2)' },
  { label: t('aco.globalBest'), value: fmt(frame.value.globalLen, 3), color: 'var(--pos)' },
  { label: t('aco.rho'), value: fmt(rho.value, 2), color: 'var(--accent)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && iter >= 30) $emit('set', 'iter', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="seed++">{{ t('aco.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('aco.hint') }}</text>
      <line v-for="(e, i) in edges" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" stroke="var(--accent)" :stroke-width="0.5 + e.w * 5" :stroke-opacity="0.1 + e.w * 0.7" />
      <path :d="pathD(frame.globalBest)" fill="none" stroke="var(--pos)" stroke-width="2.5" />
      <g v-for="(c, i) in cities" :key="i">
        <circle :cx="px(c.x)" :cy="py(c.y)" r="6" fill="var(--fg)" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
