<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Eight farms need irrigation pipe. Kruskal's algorithm: sort the 14 possible pipes by cost,
// then add each one only if it does not close a loop with pipes already laid. params.step (0-1)
// is how far through that sorted list we've looked; params.town (tap a farm) highlights which
// farms are already linked to it, without changing the algorithm's outcome.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const N = LABELS.length
const POS: [number, number][] = [[100, 340], [250, 120], [250, 420], [420, 80], [420, 260], [420, 440], [600, 160], [650, 380]]
// [from, to, cost in hundred metres of pipe]
const EDGES: [number, number, number][] = [
  [0, 1, 5], [0, 2, 4], [1, 2, 3], [1, 3, 6], [1, 4, 5], [2, 4, 4], [2, 5, 7],
  [3, 4, 3], [4, 5, 5], [3, 6, 4], [4, 6, 6], [4, 7, 7], [5, 7, 4], [6, 7, 3],
]
const sorted = [...EDGES].sort((a, b) => a[2] - b[2])

const step = computed(() => Math.min(1, Math.max(0, props.params.step ?? 1)))
const town = computed(() => Math.min(N - 1, Math.max(0, Math.round(props.params.town ?? 0))))
const count = computed(() => Math.round(step.value * sorted.length))

interface Frame { added: boolean[]; comp: number[]; cost: number }
const frame = computed<Frame>(() => {
  const comp = Array.from({ length: N }, (_, i) => i)
  const find = (x: number): number => (comp[x] === x ? x : (comp[x] = find(comp[x])))
  const added: boolean[] = []
  let cost = 0
  for (let i = 0; i < count.value; i++) {
    const [a, b, w] = sorted[i]
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) { comp[ra] = rb; added.push(true); cost += w } else added.push(false)
  }
  return { added, comp: comp.map((_, i) => find(i)), cost }
})
const treeEdges = computed(() => frame.value.added.filter(Boolean).length)
const rejected = computed(() => count.value - treeEdges.value)
const linkedToTown = computed(() => frame.value.comp.filter((c) => c === frame.value.comp[town.value]).length)
const components = computed(() => new Set(frame.value.comp).size)

const readouts = computed(() => [
  { label: t('mst.considered'), value: `${count.value} / ${sorted.length}` },
  { label: t('mst.treeEdges'), value: `${treeEdges.value} / ${N - 1}`, color: 'var(--pos)' },
  { label: t('mst.cost'), value: fmt(frame.value.cost, 0), color: 'var(--accent-2)' },
  { label: t('mst.rejected'), value: String(rejected.value), color: rejected.value ? 'var(--neg)' : 'var(--muted)' },
  { label: `${t('mst.linked')} ${LABELS[town.value]}`, value: `${linkedToTown.value} / ${N}`, color: 'var(--accent)' },
  { label: t('mst.groups'), value: String(components.value) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('mst.hint') }}</text>
      <line v-for="(e, i) in EDGES" :key="'bg' + i" :x1="POS[e[0]][0]" :y1="POS[e[0]][1]" :x2="POS[e[1]][0]" :y2="POS[e[1]][1]" stroke="var(--line)" stroke-width="1" stroke-opacity="0.5" />
      <template v-for="(e, i) in sorted" :key="'e' + i">
        <g v-if="i < count">
          <line :x1="POS[e[0]][0]" :y1="POS[e[0]][1]" :x2="POS[e[1]][0]" :y2="POS[e[1]][1]"
            :stroke="frame.added[i] ? 'var(--pos)' : 'var(--neg)'" :stroke-width="frame.added[i] ? 4 : 2" :stroke-dasharray="frame.added[i] ? 'none' : '5 4'" :stroke-opacity="frame.added[i] ? 0.95 : 0.7" />
          <rect :x="(POS[e[0]][0] + POS[e[1]][0]) / 2 - 10" :y="(POS[e[0]][1] + POS[e[1]][1]) / 2 - 9" width="20" height="18" rx="4" fill="var(--panel)" />
          <text class="num" :x="(POS[e[0]][0] + POS[e[1]][0]) / 2" :y="(POS[e[0]][1] + POS[e[1]][1]) / 2 + 4" text-anchor="middle" font-size="11" fill="var(--muted)">{{ e[2] }}</text>
        </g>
      </template>
      <g v-for="(p, i) in POS" :key="'n' + i" class="cursor-pointer" @click="emit('set', 'town', i)">
        <circle :cx="p[0]" :cy="p[1]" r="20" :fill="frame.comp[i] === frame.comp[town] ? 'var(--accent-soft)' : 'var(--panel)'" :stroke="i === town ? 'var(--accent-2)' : 'var(--line)'" :stroke-width="i === town ? 3 : 1.5" />
        <text class="num" :x="p[0]" :y="p[1] + 5" text-anchor="middle" font-size="14" fill="var(--fg)">{{ LABELS[i] }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
