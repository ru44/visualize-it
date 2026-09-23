<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A lopsided L-shaped tile, so mirroring it is visibly different from just rotating it. The solid
// copy is the dashed original after: an optional flip across the vertical through the pivot O,
// then a rotation by `angle` about O, then a translation by (tx, ty). A strip along the bottom
// repeats the tile at fixed spacing to show a frieze pattern — mirrored on alternate copies when
// flip is on, so the same control doubles as a symmetry demonstration.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const U = 55 // px per unit
const O = { x: 260, y: 230 }

// A small asymmetric L-tile, in units, sitting up-and-right of the local origin.
const LOCAL = [
  { x: 1, y: -3 },
  { x: 3, y: -3 },
  { x: 3, y: -2 },
  { x: 2, y: -2 },
  { x: 2, y: -1 },
  { x: 1, y: -1 },
]

function transform(p: { x: number; y: number }, angleDeg: number, tx: number, ty: number, flip: boolean, scale: number) {
  const rad = (angleDeg * Math.PI) / 180
  const q = flip ? { x: -p.x, y: p.y } : p
  const r = { x: q.x * Math.cos(rad) - q.y * Math.sin(rad), y: q.x * Math.sin(rad) + q.y * Math.cos(rad) }
  return { x: r.x * scale + tx * scale, y: r.y * scale + ty * scale }
}
const poly = (pts: { x: number; y: number }[], origin: { x: number; y: number }) =>
  pts.map((p) => `${(p.x + origin.x).toFixed(1)},${(p.y + origin.y).toFixed(1)}`).join(' ')

const layout = computed(() => {
  const angle = ((props.params.angle ?? 40) % 360 + 360) % 360
  const tx = Math.min(3, Math.max(-3, props.params.tx ?? 1.5))
  const ty = Math.min(3, Math.max(-3, props.params.ty ?? 0.5))
  const flip = (props.params.flip ?? 0) >= 0.5

  const original = LOCAL.map((p) => ({ x: p.x * U, y: p.y * U }))
  const transformed = LOCAL.map((p) => transform(p, angle, tx, ty, flip, U))

  // strip of copies along the bottom: pure translation, mirrored on alternate tiles when flip is on
  const stripU = 16
  const strip = Array.from({ length: 5 }, (_, i) => {
    const anchor = { x: 70 + i * 130, y: 420 }
    const mirrored = flip && i % 2 === 1
    return LOCAL.map((p) => ({ x: (mirrored ? -p.x : p.x) * stripU + anchor.x, y: p.y * stripU + anchor.y }))
  })

  const centroid = (pts: { x: number; y: number }[]) => pts.reduce((a, p) => ({ x: a.x + p.x / pts.length, y: a.y + p.y / pts.length }), { x: 0, y: 0 })
  const c0 = centroid(original)
  const c1 = centroid(transformed)

  return { angle, tx, ty, flip, original, transformed, strip, c0, c1 }
})

const readouts = computed(() => {
  const l = layout.value
  return [
    { label: t('trsy.angle'), value: `${fmt(l.angle, 0)}°`, color: 'var(--accent-2)' },
    { label: t('trsy.translate'), value: `(${fmt(l.tx, 1)}, ${fmt(l.ty, 1)})`, color: 'var(--pos)' },
    { label: t('trsy.flip'), value: l.flip ? t('trsy.on') : t('trsy.off') },
  ]
})
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('trsy.hint') }}</text>

      <g stroke="var(--line)"><line v-for="i in 15" :key="'g' + i" :x1="i * 55" :x2="i * 55" y1="0" y2="380" /><line v-for="i in 7" :key="'h' + i" x1="0" x2="800" :y1="i * 55" :y2="i * 55" /></g>

      <polygon :points="poly(layout.original, O)" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 5" />
      <polygon :points="poly(layout.transformed, O)" fill="var(--accent)" fill-opacity="0.28" stroke="var(--accent)" stroke-width="2.5" />

      <line v-if="layout.flip" :x1="O.x" :y1="20" :x2="O.x" :y2="360" stroke="var(--neg)" stroke-width="1.5" stroke-dasharray="3 4" />

      <line :x1="O.x + layout.c0.x" :y1="O.y + layout.c0.y" :x2="O.x + layout.c1.x" :y2="O.y + layout.c1.y" stroke="var(--pos)" stroke-width="1.5" stroke-dasharray="2 4" />
      <circle :cx="O.x" :cy="O.y" r="4" fill="var(--fg)" />
      <text class="num" font-size="12" fill="var(--fg)" :x="O.x - 12" :y="O.y - 10" text-anchor="end">O</text>

      <g v-for="(s, i) in layout.strip" :key="i">
        <polygon :points="poly(s, { x: 0, y: 0 })" :fill="i % 2 && layout.flip ? 'var(--pos)' : 'var(--accent-2)'" fill-opacity="0.35" :stroke="i % 2 && layout.flip ? 'var(--pos)' : 'var(--accent-2)'" stroke-width="1.5" />
      </g>
      <text class="num" font-size="11" fill="var(--muted)" x="400" y="455" text-anchor="middle">{{ layout.flip ? t('trsy.pattern2') : t('trsy.pattern1') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
