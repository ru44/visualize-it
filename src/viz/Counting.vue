<script setup lang="ts">
import { computed } from 'vue'
import { combinations, permutations, factorial, fmtBig } from '../engine/stats'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Choose k of n coloured tokens. `ordered` decides whether the arrangements shown are permutations
// (order matters) or combinations (order does not). All arrangements are listed while the count is small.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const n = computed(() => Math.max(1, Math.round(props.params.n ?? 4)))
const k = computed(() => Math.min(n.value, Math.max(0, Math.round(props.params.k ?? 2))))
const ordered = computed(() => !!props.options.ordered)
const colors = ['#2f5bea', '#d9730d', '#0d9488', '#e11d48', '#7c3aed', '#ca8a04', '#0891b2', '#65a30d', '#db2777', '#475569']

const total = computed(() => (ordered.value ? permutations(n.value, k.value) : combinations(n.value, k.value)))
const MAX_SHOWN = 60

const arrangements = computed<number[][]>(() => {
  const out: number[][] = []
  if (total.value > 5000n) return out
  const rec = (start: number, cur: number[]) => {
    if (out.length >= MAX_SHOWN) return
    if (cur.length === k.value) return void out.push([...cur])
    for (let i = ordered.value ? 0 : start; i < n.value; i++) {
      if (cur.includes(i)) continue
      cur.push(i)
      rec(i + 1, cur)
      cur.pop()
    }
  }
  rec(0, [])
  return out
})

// Layout: token pool on top, arrangements in a grid below.
const R = 13
// Token pool shrinks so up to 60 items fit on one row.
const pr = computed(() => Math.min(R, (W - 80) / (2.6 * n.value)))
const pool = computed(() => Array.from({ length: n.value }, (_, i) => ({ i, x: W / 2 + (i - (n.value - 1) / 2) * pr.value * 2.6, y: 40 })))
const grid = computed(() => {
  const cellW = Math.max(k.value, 1) * 2 * R + 26
  const cols = Math.max(1, Math.floor((W - 40) / cellW))
  const rows = Math.ceil(arrangements.value.length / cols)
  const cellH = Math.min(44, (H - 120) / Math.max(rows, 1))
  return arrangements.value.map((a, idx) => ({ a, x: 20 + (idx % cols) * cellW + (W - 40 - cols * cellW) / 2, y: 110 + Math.floor(idx / cols) * cellH, cellH }))
})

const readouts = computed(() => {
  const formulaTex = ordered.value ? `P(${n.value},${k.value})` : `C(${n.value},${k.value})`
  return [
    { label: 'n', value: String(n.value) },
    { label: 'k', value: String(k.value) },
    { label: `${n.value}!`, value: fmtBig(factorial(n.value)) },
    { label: formulaTex, value: fmtBig(total.value), color: 'var(--accent-2)' },
  ]
})

function down(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const box = svg.getBoundingClientRect()
  const x = ((e.clientX - box.left) / box.width) * W
  emit('set', 'k', Math.round(((x - 40) / (W - 80)) * n.value))
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down">
      <text class="num" x="16" y="18" font-size="12" fill="var(--muted)">{{ t(ordered ? 'count.orderedHint' : 'count.unorderedHint') }}</text>
      <g v-for="p in pool" :key="p.i">
        <circle :cx="p.x" :cy="p.y" :r="pr" :fill="colors[p.i % 10]" />
        <text v-if="pr >= 9" class="num" :x="p.x" :y="p.y + 4" text-anchor="middle" font-size="11" fill="#fff">{{ p.i + 1 }}</text>
      </g>
      <line x1="40" :x2="W - 40" y1="78" :y2="78" stroke="var(--line)" />
      <text class="num" :x="W / 2" y="98" text-anchor="middle" font-size="12" fill="var(--muted)">
        {{ t(ordered ? 'count.arrangements' : 'count.selections', { n: fmtBig(total) }) }}{{ arrangements.length < Number(total) ? ` · ${arrangements.length ? t('count.first', { n: arrangements.length }) : t('count.tooMany')}` : '' }}
      </text>
      <g v-for="(g, gi) in grid" :key="gi">
        <rect :x="g.x" :y="g.y" :width="k * 2 * R + 14" :height="Math.min(g.cellH - 6, 34)" rx="8" fill="var(--sunken)" stroke="var(--line)" />
        <circle v-for="(idx, j) in g.a" :key="j" :cx="g.x + 7 + R + j * 2 * R" :cy="g.y + Math.min(g.cellH - 6, 34) / 2" :r="R - 3" :fill="colors[idx % 10]" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
