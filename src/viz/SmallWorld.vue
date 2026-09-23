<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Watts-Strogatz small-world network. Start from a ring where each node links to its k nearest
// neighbours, then rewire each link to a random node with probability p. A few random shortcuts
// (small p) collapse the path length while the local clustering barely changes.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 16
const CX = W / 2
const CY = H / 2 + 6
const R = 180

const p = computed(() => Math.max(0, Math.min(1, props.params.p ?? 0)))
const k = computed(() => Math.max(2, Math.min(8, Math.round(props.params.k ?? 4) - (Math.round(props.params.k ?? 4) % 2))))

const nodePos = Array.from({ length: N }, (_, i) => {
  const a = (2 * Math.PI * i) / N - Math.PI / 2
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
})

function rng(s: number) {
  let x = s
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648)
}

// Ring lattice + a fixed (per k) random rewiring candidate and propensity for every edge, so the
// same p always rewires the same edges: an edge is rewired once its propensity falls under p.
const base = computed(() => {
  const half = k.value / 2
  const rnd = rng(k.value * 977 + 31)
  const edges: { source: number; original: number; candidate: number; propensity: number }[] = []
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < half; j++) {
      const original = (i + j + 1) % N
      let candidate = i
      while (candidate === i || candidate === original) candidate = Math.floor(rnd() * N)
      edges.push({ source: i, original, candidate, propensity: rnd() })
    }
  }
  return edges
})

const edges = computed(() => base.value.map((e) => ({ source: e.source, target: e.propensity < p.value ? e.candidate : e.original, rewired: e.propensity < p.value })))

const neighbours = computed(() => {
  const adj = Array.from({ length: N }, () => new Set<number>())
  for (const e of edges.value) { adj[e.source].add(e.target); adj[e.target].add(e.source) }
  return adj
})

const clustering = computed(() => {
  let sum = 0
  for (let i = 0; i < N; i++) {
    const nb = [...neighbours.value[i]]
    const m = nb.length
    if (m < 2) continue
    let links = 0
    for (let a = 0; a < m; a++) for (let b = a + 1; b < m; b++) if (neighbours.value[nb[a]].has(nb[b])) links++
    sum += links / ((m * (m - 1)) / 2)
  }
  return sum / N
})

const pathLength = computed(() => {
  let total = 0
  let pairs = 0
  for (let s = 0; s < N; s++) {
    const dist = new Array(N).fill(-1)
    dist[s] = 0
    let frontier = [s]
    while (frontier.length) {
      const next: number[] = []
      for (const u of frontier) for (const v of neighbours.value[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; next.push(v) }
      frontier = next
    }
    for (let tIdx = s + 1; tIdx < N; tIdx++) if (dist[tIdx] >= 0) { total += dist[tIdx]; pairs++ }
  }
  return pairs ? total / pairs : 0
})

const rewiredCount = computed(() => edges.value.filter((e) => e.rewired).length)

const readouts = computed(() => [
  { label: 'p', value: fmt(p.value, 2) },
  { label: 'k', value: String(k.value) },
  { label: t('sw.length'), value: fmt(pathLength.value, 2), color: 'var(--accent)' },
  { label: t('sw.clustering'), value: fmt(clustering.value, 2), color: 'var(--accent-2)' },
  { label: t('sw.rewired'), value: String(rewiredCount.value) },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sw.hint') }}</text>
      <g v-for="(e, i) in edges" :key="i">
        <line
          :x1="nodePos[e.source].x" :y1="nodePos[e.source].y"
          :x2="nodePos[e.target].x" :y2="nodePos[e.target].y"
          :stroke="e.rewired ? 'var(--accent)' : 'var(--line)'"
          :stroke-width="e.rewired ? 1.6 : 1.2"
          :opacity="e.rewired ? 0.9 : 0.6"
        />
      </g>
      <g v-for="(pt, i) in nodePos" :key="'n' + i">
        <circle :cx="pt.x" :cy="pt.y" r="7" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
