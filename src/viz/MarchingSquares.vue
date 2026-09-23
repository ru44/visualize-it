<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Samples a smooth field on a grid, marks which corners are above the threshold, then walks
// every cell and draws the piece of contour line that separates "above" from "below" — the
// technique behind elevation maps and MRI/CT slice outlines.
// params: level (contour threshold), res (grid resolution).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 24
const SIDE = H - PAD * 2
const X0 = (W - SIDE) / 2
const level = computed(() => Math.max(0.05, Math.min(0.95, props.params.level ?? 0.5)))
const res = computed(() => Math.max(6, Math.min(28, Math.round(props.params.res ?? 16))))
const seed = ref(1)

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}
const bumps = computed(() => {
  const rng = makeRng(seed.value)
  return Array.from({ length: 3 }, () => ({ cx: 0.18 + rng() * 0.64, cy: 0.18 + rng() * 0.64, s: 0.12 + rng() * 0.1, a: 0.75 + rng() * 0.4 }))
})
function field(x: number, y: number) {
  let v = 0
  for (const b of bumps.value) v += b.a * Math.exp(-((x - b.cx) ** 2 + (y - b.cy) ** 2) / (2 * b.s * b.s))
  return Math.min(1, v)
}

const N = computed(() => res.value)
const grid = computed(() => {
  const n = N.value
  const g: number[][] = []
  for (let i = 0; i <= n; i++) { const row: number[] = []; for (let j = 0; j <= n; j++) row.push(field(j / n, i / n)); g.push(row) }
  return g
})
const lerp = (v0: number, v1: number, lv: number) => (Math.abs(v1 - v0) < 1e-6 ? 0.5 : Math.min(1, Math.max(0, (lv - v0) / (v1 - v0))))

interface Seg { x1: number; y1: number; x2: number; y2: number }
const segments = computed(() => {
  const n = N.value
  const lv = level.value
  const g = grid.value
  const cw = SIDE / n
  const segs: Seg[] = []
  const pt = (edge: 'N' | 'E' | 'S' | 'W', i: number, j: number) => {
    const x0 = X0 + j * cw
    const y0 = PAD + i * cw
    if (edge === 'N') return { x: x0 + lerp(g[i][j], g[i][j + 1], lv) * cw, y: y0 }
    if (edge === 'S') return { x: x0 + lerp(g[i + 1][j], g[i + 1][j + 1], lv) * cw, y: y0 + cw }
    if (edge === 'W') return { x: x0, y: y0 + lerp(g[i][j], g[i + 1][j], lv) * cw }
    return { x: x0 + cw, y: y0 + lerp(g[i][j + 1], g[i + 1][j + 1], lv) * cw }
  }
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const a = g[i][j] >= lv, b = g[i][j + 1] >= lv, c = g[i + 1][j + 1] >= lv, d = g[i + 1][j] >= lv
      const cs = (a ? 1 : 0) + (b ? 2 : 0) + (c ? 4 : 0) + (d ? 8 : 0)
      const avg = (g[i][j] + g[i][j + 1] + g[i + 1][j + 1] + g[i + 1][j]) / 4
      const line = (e1: 'N' | 'E' | 'S' | 'W', e2: 'N' | 'E' | 'S' | 'W') => { const p1 = pt(e1, i, j), p2 = pt(e2, i, j); segs.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }) }
      if (cs === 1 || cs === 14) line('N', 'W')
      else if (cs === 2 || cs === 13) line('N', 'E')
      else if (cs === 3 || cs === 12) line('W', 'E')
      else if (cs === 4 || cs === 11) line('E', 'S')
      else if (cs === 6 || cs === 9) line('N', 'S')
      else if (cs === 7 || cs === 8) line('W', 'S')
      else if (cs === 5) { if (avg >= lv) { line('N', 'E'); line('W', 'S') } else { line('N', 'W'); line('E', 'S') } }
      else if (cs === 10) { if (avg >= lv) { line('N', 'W'); line('E', 'S') } else { line('N', 'E'); line('W', 'S') } }
    }
  return segs
})
const dots = computed(() => {
  const n = N.value
  const cw = SIDE / n
  const out: { x: number; y: number; on: boolean }[] = []
  for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) out.push({ x: X0 + j * cw, y: PAD + i * cw, on: grid.value[i][j] >= level.value })
  return out
})
const above = computed(() => dots.value.filter((d) => d.on).length)

const readouts = computed(() => [
  { label: t('ms.level'), value: fmt(level.value, 2), color: 'var(--accent)' },
  { label: t('ms.res'), value: `${res.value}×${res.value}` },
  { label: t('ms.above'), value: String(above.value), color: 'var(--accent-2)' },
  { label: t('ms.segments'), value: String(segments.value.length) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="seed++">{{ t('ms.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('ms.hint') }}</text>
      <rect :x="X0" :y="PAD" :width="SIDE" :height="SIDE" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" :r="d.on ? 2.6 : 1.6" :fill="d.on ? 'var(--accent-2)' : 'var(--muted)'" :fill-opacity="d.on ? 0.9 : 0.5" />
      <line v-for="(s, i) in segments" :key="i" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
