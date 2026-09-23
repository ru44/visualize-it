<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A triangle built from three side lengths a, b, c (SSS): A=(0,0), B=(c,0), and C is where a
// circle of radius b around A meets a circle of radius a around B. Those two construction circles
// are drawn dashed: when they don't reach each other the triangle inequality fails and there is
// no such triangle — the same picture explains both facts at once.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const R2D = 180 / Math.PI

const a = computed(() => Math.max(0.2, props.params.a ?? 5))
const b = computed(() => Math.max(0.2, props.params.b ?? 6))
const c = computed(() => Math.max(0.2, props.params.c ?? 7))

function angleOpp(opp: number, s1: number, s2: number) {
  return Math.acos(Math.min(1, Math.max(-1, (s1 * s1 + s2 * s2 - opp * opp) / (2 * s1 * s2)))) * R2D
}

const geo = computed(() => {
  const A = { x: 0, y: 0 }
  const B = { x: c.value, y: 0 }
  const x = (b.value ** 2 - a.value ** 2 + c.value ** 2) / (2 * c.value)
  const ySq = b.value ** 2 - x * x
  const valid = ySq > 1e-6
  const C = { x, y: Math.sqrt(Math.max(0, ySq)) }
  return {
    A,
    B,
    C,
    valid,
    angA: valid ? angleOpp(a.value, b.value, c.value) : NaN,
    angB: valid ? angleOpp(b.value, a.value, c.value) : NaN,
    angC: valid ? angleOpp(c.value, a.value, b.value) : NaN,
  }
})

const sides = computed(() => [
  { key: 'a', val: a.value, angle: 'angA' as const, vertex: 'A' as const },
  { key: 'b', val: b.value, angle: 'angB' as const, vertex: 'B' as const },
  { key: 'c', val: c.value, angle: 'angC' as const, vertex: 'C' as const },
])
const longestKey = computed(() => sides.value.reduce((m, s) => (s.val > m.val ? s : m)).key)
const shortestKey = computed(() => sides.value.reduce((m, s) => (s.val < m.val ? s : m)).key)
function sideColor(k: string) {
  return k === longestKey.value ? 'var(--accent)' : k === shortestKey.value ? 'var(--accent-2)' : 'var(--fg)'
}

// Fit A, B, C and the upper half of both construction circles into the viewBox.
const layout = computed(() => {
  const { A, B, C } = geo.value
  const pts = [
    { x: A.x - b.value, y: 0 }, { x: A.x + b.value, y: 0 }, { x: A.x, y: b.value },
    { x: B.x - a.value, y: 0 }, { x: B.x + a.value, y: 0 }, { x: B.x, y: a.value },
    A, B, C,
  ]
  const minX = Math.min(...pts.map((p) => p.x))
  const maxX = Math.max(...pts.map((p) => p.x))
  const minY = -0.2
  const maxY = Math.max(...pts.map((p) => p.y), 0.4)
  const margin = 60
  const bw = Math.max(maxX - minX, 0.001)
  const bh = Math.max(maxY - minY, 0.001)
  const scale = Math.min((W - margin * 2) / bw, (H - 120 - margin) / bh)
  const offX = margin + (W - margin * 2 - bw * scale) / 2 - minX * scale
  const top = 50
  const tf = (p: { x: number; y: number }) => ({ x: p.x * scale + offX, y: top + (maxY - p.y) * scale })
  return { scale, A: tf(A), B: tf(B), C: tf(C) }
})

function mid(p: { x: number; y: number }, q: { x: number; y: number }, away: { x: number; y: number }, d: number) {
  const mx = (p.x + q.x) / 2
  const my = (p.y + q.y) / 2
  const dx = q.x - p.x
  const dy = q.y - p.y
  const len = Math.hypot(dx, dy) || 1
  const n1 = { x: -dy / len, y: dx / len }
  const n2 = { x: dy / len, y: -dx / len }
  const toAway = { x: away.x - mx, y: away.y - my }
  const n = n1.x * toAway.x + n1.y * toAway.y > 0 ? n2 : n1
  return { x: mx + n.x * d, y: my + n.y * d }
}

function ratio(side: number, angleDeg: number, valid: boolean) {
  if (!valid) return '—'
  const s = Math.sin((angleDeg * Math.PI) / 180)
  return Math.abs(s) < 1e-6 ? '—' : fmt(side / s, 3)
}

const readouts = computed(() => {
  const g = geo.value
  const sorted = [...sides.value].map((s) => s.val).sort((x, y) => x - y)
  const ok = sorted[0] + sorted[1] > sorted[2]
  return [
    { label: 'A', value: g.valid ? `${fmt(g.angA, 1)}°` : '—', color: sideColor('a') },
    { label: 'B', value: g.valid ? `${fmt(g.angB, 1)}°` : '—', color: sideColor('b') },
    { label: 'C', value: g.valid ? `${fmt(g.angC, 1)}°` : '—', color: sideColor('c') },
    { label: t('triangle.ratioA'), value: ratio(a.value, g.angA, g.valid), color: sideColor('a') },
    { label: t('triangle.ratioB'), value: ratio(b.value, g.angB, g.valid), color: sideColor('b') },
    { label: t('triangle.ratioC'), value: ratio(c.value, g.angC, g.valid), color: sideColor('c') },
    { label: t('triangle.inequality'), value: `${fmt(sorted[0] + sorted[1], 1)} ${ok ? '>' : '≤'} ${fmt(sorted[2], 1)}`, color: ok ? 'var(--pos)' : 'var(--neg)' },
  ]
})
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <path :d="`M${layout.A.x - b * layout.scale},${layout.A.y} A${b * layout.scale},${b * layout.scale} 0 0 1 ${layout.A.x + b * layout.scale},${layout.A.y}`" fill="none" stroke="var(--line)" stroke-width="1" stroke-dasharray="4 4" />
      <path :d="`M${layout.B.x - a * layout.scale},${layout.B.y} A${a * layout.scale},${a * layout.scale} 0 0 1 ${layout.B.x + a * layout.scale},${layout.B.y}`" fill="none" stroke="var(--line)" stroke-width="1" stroke-dasharray="4 4" />

      <polygon v-if="geo.valid" :points="`${layout.A.x},${layout.A.y} ${layout.B.x},${layout.B.y} ${layout.C.x},${layout.C.y}`" fill="var(--accent)" fill-opacity="0.08" stroke="var(--fg)" stroke-width="2" />
      <polyline v-else :points="`${layout.A.x},${layout.A.y} ${layout.C.x},${layout.C.y} ${layout.B.x},${layout.B.y}`" fill="none" stroke="var(--neg)" stroke-width="2" stroke-dasharray="6 4" />

      <g class="num" font-size="13">
        <text :x="mid(layout.B, layout.C, layout.A, 20).x" :y="mid(layout.B, layout.C, layout.A, 20).y" text-anchor="middle" :fill="sideColor('a')">a = {{ fmt(a, 2) }}</text>
        <text :x="mid(layout.C, layout.A, layout.B, 20).x" :y="mid(layout.C, layout.A, layout.B, 20).y" text-anchor="middle" :fill="sideColor('b')">b = {{ fmt(b, 2) }}</text>
        <text :x="mid(layout.A, layout.B, layout.C, 20).x" :y="mid(layout.A, layout.B, layout.C, 20).y" text-anchor="middle" :fill="sideColor('c')">c = {{ fmt(c, 2) }}</text>
      </g>
      <g class="num" font-size="13" fill="var(--fg)">
        <text :x="layout.A.x" :y="layout.A.y - 12" text-anchor="middle">A{{ geo.valid ? ` ${fmt(geo.angA, 0)}°` : '' }}</text>
        <text :x="layout.B.x" :y="layout.B.y - 12" text-anchor="middle">B{{ geo.valid ? ` ${fmt(geo.angB, 0)}°` : '' }}</text>
        <text :x="layout.C.x" :y="layout.C.y - 14" text-anchor="middle">C{{ geo.valid ? ` ${fmt(geo.angC, 0)}°` : '' }}</text>
      </g>

      <circle v-for="p in [layout.A, layout.B, layout.C]" :key="`${p.x},${p.y}`" :cx="p.x" :cy="p.y" r="3.5" fill="var(--muted)" />

      <text v-if="!geo.valid" class="num" x="400" y="40" text-anchor="middle" font-size="14" fill="var(--neg)">{{ t('triangle.invalid') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
