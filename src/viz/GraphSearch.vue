<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A fixed 10-node weighted graph. options.algorithm: 'bfs' | 'dfs' | 'dijkstra'.
// params: start (node index), step (0..1 progress through the trace). Tapping a node sets the start.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const nodes = [[90, 120], [230, 70], [380, 110], [540, 70], [690, 130], [140, 280], [300, 250], [450, 300], [600, 250], [720, 330]]
const edges: [number, number, number][] = [[0, 1, 4], [0, 5, 3], [1, 2, 5], [1, 6, 6], [2, 3, 3], [2, 6, 2], [2, 7, 7], [3, 4, 4], [3, 8, 5], [4, 9, 6], [5, 6, 4], [6, 7, 3], [7, 8, 2], [8, 9, 3], [4, 8, 2]]
const adj = nodes.map((_, i) => edges.filter((e) => e[0] === i || e[1] === i).map((e) => ({ to: e[0] === i ? e[1] : e[0], w: e[2] })).sort((a, b) => a.to - b.to))

interface Frame { visited: number[]; frontier: number[]; current: number; dist: number[]; parent: number[] }
const start = computed(() => Math.min(9, Math.max(0, Math.round(props.params.start ?? 0))))
const target = computed(() => Math.min(9, Math.max(0, Math.round(props.options.target ?? 9))))

const trace = computed<Frame[]>(() => {
  const alg = props.options.algorithm ?? 'bfs'
  const frames: Frame[] = []
  const visited: number[] = []
  const dist = Array(10).fill(Infinity)
  const parent = Array(10).fill(-1)
  dist[start.value] = 0
  const rec = (frontier: number[], current: number) => frames.push({ visited: visited.slice(), frontier: frontier.slice(), current, dist: dist.slice(), parent: parent.slice() })
  if (alg === 'dijkstra') {
    const open = [start.value]
    rec(open, -1)
    while (open.length) {
      open.sort((a, b) => dist[a] - dist[b])
      const u = open.shift()!
      if (visited.includes(u)) continue
      visited.push(u)
      rec(open, u)
      for (const { to, w } of adj[u]) if (dist[u] + w < dist[to]) (dist[to] = dist[u] + w), (parent[to] = u), open.includes(to) || visited.includes(to) || open.push(to)
      rec(open, u)
    }
  } else {
    const open = [start.value]
    const seen = new Set([start.value])
    rec(open, -1)
    while (open.length) {
      const u = alg === 'bfs' ? open.shift()! : open.pop()!
      visited.push(u)
      rec(open, u)
      for (const { to, w } of adj[u]) if (!seen.has(to)) seen.add(to), (parent[to] = u), (dist[to] = dist[u] + w), open.push(to)
      rec(open, u)
    }
  }
  rec([], -1)
  return frames
})
const fi = computed(() => Math.round(Math.min(1, Math.max(0, props.params.step ?? 1)) * (trace.value.length - 1)))
const f = computed(() => trace.value[fi.value])
const done = computed(() => fi.value === trace.value.length - 1)
const pathTo = computed(() => {
  const out: number[] = []
  for (let v = target.value; v !== -1 && out.length < 12; v = f.value.parent[v]) out.unshift(v)
  return out[0] === start.value ? out : []
})
const onPath = (a: number, b: number) => done.value && pathTo.value.some((v, i) => i && ((pathTo.value[i - 1] === a && v === b) || (pathTo.value[i - 1] === b && v === a)))
const pathLen = computed(() => (pathTo.value.length ? pathTo.value.slice(1).reduce((s, v, i) => s + edges.find((e) => (e[0] === pathTo.value[i] && e[1] === v) || (e[1] === pathTo.value[i] && e[0] === v))![2], 0) : NaN))

const readouts = computed(() => [
  { label: t('gsearch.visited'), value: `${f.value.visited.length} / 10`, color: 'var(--pos)' },
  { label: t('gsearch.frontier'), value: String(f.value.frontier.length), color: 'var(--accent-2)' },
  { label: t('gsearch.order'), value: f.value.visited.map((v) => String.fromCharCode(65 + v)).join(' ') || '—' },
  ...(done.value ? [{ label: `${t('gsearch.pathLen')} ${String.fromCharCode(65 + start.value)}→${String.fromCharCode(65 + target.value)}`, value: fmt(pathLen.value, 0), color: 'var(--accent)' }] : []),
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('gsearch.hint') }}</text>
      <g v-for="(e, i) in edges" :key="i">
        <line :x1="nodes[e[0]][0]" :y1="nodes[e[0]][1]" :x2="nodes[e[1]][0]" :y2="nodes[e[1]][1]" :stroke="onPath(e[0], e[1]) ? 'var(--accent)' : (f.parent[e[1]] === e[0] || f.parent[e[0]] === e[1]) && (f.visited.includes(e[0]) || f.visited.includes(e[1])) ? 'var(--pos)' : 'var(--line)'" :stroke-width="onPath(e[0], e[1]) ? 5 : 2" />
        <rect :x="(nodes[e[0]][0] + nodes[e[1]][0]) / 2 - 10" :y="(nodes[e[0]][1] + nodes[e[1]][1]) / 2 - 9" width="20" height="18" rx="4" fill="var(--panel)" />
        <text class="num" :x="(nodes[e[0]][0] + nodes[e[1]][0]) / 2" :y="(nodes[e[0]][1] + nodes[e[1]][1]) / 2 + 4" text-anchor="middle" font-size="11" fill="var(--muted)">{{ e[2] }}</text>
      </g>
      <g v-for="(p, i) in nodes" :key="'n' + i" class="cursor-pointer" @click="emit('set', 'start', i)">
        <circle :cx="p[0]" :cy="p[1]" r="20" :fill="i === f.current ? 'var(--accent-2)' : f.visited.includes(i) ? 'var(--pos)' : f.frontier.includes(i) ? 'var(--accent-soft)' : 'var(--panel)'" :stroke="i === start ? 'var(--fg)' : i === target ? 'var(--accent)' : 'var(--line)'" :stroke-width="i === start || i === target ? 3 : 1.5" />
        <text class="num" :x="p[0]" :y="p[1] + 5" text-anchor="middle" font-size="14" :fill="i === f.current || f.visited.includes(i) ? '#fff' : 'var(--fg)'">{{ String.fromCharCode(65 + i) }}</text>
        <text v-if="Number.isFinite(f.dist[i])" class="num" :x="p[0] + 24" :y="p[1] - 14" font-size="11" fill="var(--accent)">{{ f.dist[i] }}</text>
      </g>
      <text class="num" :x="nodes[start][0]" :y="nodes[start][1] + 38" text-anchor="middle" font-size="11" fill="var(--muted)">start</text>
      <text class="num" :x="nodes[target][0]" :y="nodes[target][1] + 38" text-anchor="middle" font-size="11" fill="var(--accent)">goal</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
