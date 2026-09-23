<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// One regular n-gon on the left, and on the right the same shape repeated, edge to edge, around
// a single shared point — the classic test for whether it can tile a floor with no gap. Each copy
// occupies a wedge equal to its own interior angle; a full turn is 360°, so the copies only close
// up with nothing left over when the interior angle divides 360° evenly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const deg2rad = (d: number) => (d * Math.PI) / 180

function regularPolygon(n: number, R: number, center: { x: number; y: number }, start = -90) {
  return Array.from({ length: n }, (_, k) => {
    const a = deg2rad(start + (k * 360) / n)
    return { x: center.x + R * Math.cos(a), y: center.y + R * Math.sin(a) }
  })
}

// A copy of the n-gon with one vertex pinned at P, its first edge leaving at heading `start`
// (turtle construction: walk n sides of length L, turning by the exterior angle each time).
function polygonAtVertex(n: number, L: number, P: { x: number; y: number }, start: number) {
  const ext = 360 / n
  let h = start
  let v = { ...P }
  const pts = [v]
  for (let k = 0; k < n; k++) {
    v = { x: v.x + L * Math.cos(deg2rad(h)), y: v.y + L * Math.sin(deg2rad(h)) }
    pts.push(v)
    h += ext
  }
  return pts
}

const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

const layout = computed(() => {
  const n = Math.round(Math.min(12, Math.max(3, props.params.n ?? 6)))
  const S = (n - 2) * 180
  const a = S / n

  const mainCenter = { x: 190, y: 175 }
  const main = regularPolygon(n, 100, mainCenter)

  const P = { x: 560, y: 300 }
  const k = Math.max(1, Math.floor(360 / a + 1e-6))
  const copies = Array.from({ length: Math.min(k, 12) }, (_, i) => polygonAtVertex(n, 46, P, i * a))
  const gap = Math.max(0, 360 - k * a)
  const tiles = gap < 0.5
  const gapWedge = gap >= 0.5 ? `M ${P.x} ${P.y} L ${(P.x + 70 * Math.cos(deg2rad(k * a))).toFixed(1)} ${(P.y + 70 * Math.sin(deg2rad(k * a))).toFixed(1)} A 70 70 0 ${gap > 180 ? 1 : 0} 1 ${(P.x + 70 * Math.cos(deg2rad(360))).toFixed(1)} ${(P.y + 70 * Math.sin(deg2rad(360))).toFixed(1)} Z` : ''

  return { n, S, a, main, mainCenter, P, copies, k, gap, tiles, gapWedge }
})

const readouts = computed(() => {
  const l = layout.value
  return [
    { label: 'n', value: fmt(l.n, 0), color: 'var(--accent-2)' },
    { label: t('poly.sum'), value: `${fmt(l.S, 0)}°` },
    { label: t('poly.each'), value: `${fmt(l.a, 1)}°`, color: 'var(--accent)' },
    { label: t('poly.around'), value: fmt(l.k, 0) },
    { label: t('poly.gap'), value: l.tiles ? t('poly.tiles') : `${fmt(l.gap, 1)}°`, color: l.tiles ? 'var(--pos)' : 'var(--neg)' },
  ]
})
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('poly.hint') }}</text>

      <polygon :points="poly(layout.main)" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="layout.mainCenter.x" :cy="layout.mainCenter.y" r="2.5" fill="var(--muted)" />
      <text class="num" font-size="12" fill="var(--muted)" :x="layout.mainCenter.x" :y="layout.mainCenter.y + 130" text-anchor="middle">{{ t('poly.shape') }}</text>

      <path v-if="layout.gapWedge" :d="layout.gapWedge" fill="var(--neg)" fill-opacity="0.25" stroke="var(--neg)" stroke-width="1.5" />
      <polygon v-for="(c, i) in layout.copies" :key="i" :points="poly(c)" :fill="i % 2 ? 'var(--accent-2)' : 'var(--pos)'" fill-opacity="0.18" :stroke="i % 2 ? 'var(--accent-2)' : 'var(--pos)'" stroke-width="2" />
      <circle :cx="layout.P.x" :cy="layout.P.y" r="3" fill="var(--fg)" />
      <text class="num" font-size="12" fill="var(--muted)" :x="layout.P.x" :y="layout.P.y + 100" text-anchor="middle">{{ layout.tiles ? t('poly.closes') : t('poly.leavesGap') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
