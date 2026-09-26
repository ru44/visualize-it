<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A simplified schematic map of 7 regions (styled after Australia's states) that greedily
// colours itself. params.k = how many colours are allowed (1-4); params.order = which region the
// greedy pass starts from (tap a region to set it). Colouring walks the regions starting at
// `order`, wrapping around, giving each the smallest colour number its already-coloured
// neighbours don't use; a region with no colour left among the k allowed is a clash (hatched).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const NAMES = ['WA', 'NT', 'SA', 'QLD', 'NSW', 'VIC', 'TAS']
const N = NAMES.length
const SHAPES: [number, number][][] = [
  [[40, 40], [260, 40], [260, 440], [40, 440]],
  [[260, 40], [420, 40], [420, 220], [260, 220]],
  [[260, 220], [460, 220], [460, 440], [260, 440]],
  [[420, 40], [680, 40], [680, 220], [420, 220]],
  [[460, 220], [680, 220], [680, 340], [460, 340]],
  [[460, 340], [620, 340], [620, 420], [460, 420]],
  [[560, 440], [620, 440], [620, 475], [560, 475]],
]
const CENTROIDS: [number, number][] = [[150, 245], [340, 130], [360, 335], [550, 130], [570, 280], [540, 380], [590, 457]]
// touching borders: WA-NT, WA-SA, NT-SA, NT-QLD, SA-QLD, SA-NSW, SA-VIC, QLD-NSW, NSW-VIC. TAS is an island: no shared border.
const EDGES: [number, number][] = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [2, 5], [3, 4], [4, 5]]
const PALETTE = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)']

const k = computed(() => Math.min(4, Math.max(1, Math.round(props.params.k ?? 2))))
const order = computed(() => ((Math.round(props.params.order ?? 0) % N) + N) % N)

const adj = NAMES.map((_, i) => EDGES.filter((e) => e[0] === i || e[1] === i).map((e) => (e[0] === i ? e[1] : e[0])))

interface Result { colour: number[]; seq: number[] }
const result = computed<Result>(() => {
  const seq = Array.from({ length: N }, (_, i) => (order.value + i) % N)
  const colour = Array(N).fill(0)
  for (const v of seq) {
    const used = new Set(adj[v].map((u) => colour[u]).filter((c) => c > 0))
    let c = 0
    for (let cand = 1; cand <= k.value; cand++) if (!used.has(cand)) { c = cand; break }
    colour[v] = c
  }
  return { colour, seq }
})
const fillOf = (i: number) => { const c = result.value.colour[i]; return c > 0 ? PALETTE[c - 1] : 'var(--sunken)' }
const conflicts = computed(() => result.value.colour.filter((c) => c === 0).length)
const used = computed(() => new Set(result.value.colour.filter((c) => c > 0)).size)
const seqRank = computed(() => { const r = Array(N).fill(0); result.value.seq.forEach((v, i) => (r[v] = i + 1)); return r })

const readouts = computed(() => [
  { label: t('gcol.k'), value: String(k.value) },
  { label: t('gcol.used'), value: String(used.value), color: 'var(--accent-2)' },
  { label: t('gcol.conflicts'), value: String(conflicts.value), color: conflicts.value ? 'var(--neg)' : 'var(--pos)' },
  { label: t('gcol.order'), value: result.value.seq.map((v) => NAMES[v]).join(' → ') },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('gcol.hint') }}</text>
      <g v-for="(shape, i) in SHAPES" :key="i" class="cursor-pointer" @click="emit('set', 'order', i)">
        <polygon :points="shape.map((p) => p.join(',')).join(' ')" :fill="fillOf(i)" :fill-opacity="result.colour[i] > 0 ? 0.85 : 0.35"
          :stroke="result.colour[i] === 0 ? 'var(--neg)' : i === order ? 'var(--fg)' : 'var(--line)'"
          :stroke-width="result.colour[i] === 0 ? 3 : i === order ? 3 : 1.5" :stroke-dasharray="result.colour[i] === 0 ? '6 4' : 'none'" />
      </g>
      <g v-for="(c, i) in CENTROIDS" :key="'lbl' + i" class="num" text-anchor="middle">
        <text :x="c[0]" :y="c[1] - 2" font-size="15" font-weight="600" :fill="result.colour[i] > 0 ? '#fff' : 'var(--fg)'">{{ NAMES[i] }}</text>
        <text :x="c[0]" :y="c[1] + 16" font-size="11" :fill="result.colour[i] > 0 ? '#fff' : 'var(--muted)'">#{{ seqRank[i] }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
