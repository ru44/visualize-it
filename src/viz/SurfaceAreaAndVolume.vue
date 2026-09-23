<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// An isometric cube of edge s, next to a faint fixed reference cube at s = 1, so a learner can
// see directly how much faster the block fills up than its skin grows. Readouts add the same
// ratio for a sphere and a cylinder built at the same s, showing the square-cube law is about
// size, not shape.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PX_PER_M = 55
const F = { x: 400, y: 365 } // front-bottom corner, shared by both cubes

const add = (...vs: { x: number; y: number }[]) => vs.reduce((a, v) => ({ x: a.x + v.x, y: a.y + v.y }), { x: 0, y: 0 })

function cubeFaces(L: number) {
  const up = { x: 0, y: -L }
  const rd = { x: L * 0.866, y: L * 0.5 }
  const ld = { x: -L * 0.866, y: L * 0.5 }
  const left = [F, add(F, ld), add(F, ld, up), add(F, up)]
  const right = [F, add(F, rd), add(F, rd, up), add(F, up)]
  const top = [add(F, up), add(F, up, ld), add(F, up, ld, rd), add(F, up, rd)]
  return { left, right, top }
}
const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

const layout = computed(() => {
  const s = Math.min(4, Math.max(0.2, props.params.s ?? 1))
  const cube = cubeFaces(s * PX_PER_M)
  const ref = cubeFaces(PX_PER_M)

  const A = 6 * s * s
  const V = s * s * s
  const sphereA = 4 * Math.PI * s * s
  const sphereV = (4 / 3) * Math.PI * s ** 3
  const cylA = 6 * Math.PI * s * s
  const cylV = 2 * Math.PI * s ** 3

  return { s, cube, ref, A, V, sphereA, sphereV, cylA, cylV }
})

const readouts = computed(() => {
  const l = layout.value
  return [
    { label: t('sav.side'), value: `${fmt(l.s, 2)} m`, color: 'var(--accent-2)' },
    { label: t('sav.area'), value: `${fmt(l.A, 2)} m²`, color: 'var(--accent)' },
    { label: t('sav.volume'), value: `${fmt(l.V, 2)} m³`, color: 'var(--pos)' },
    { label: t('sav.ratio'), value: fmt(l.A / l.V, 2) },
    { label: t('sav.sphere'), value: fmt(l.sphereA / l.sphereV, 2) },
    { label: t('sav.cylinder'), value: fmt(l.cylA / l.cylV, 2) },
  ]
})
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sav.hint') }}</text>

      <g fill="none" stroke="var(--muted)" stroke-dasharray="4 4" stroke-width="1.5">
        <polygon :points="poly(layout.ref.left)" />
        <polygon :points="poly(layout.ref.right)" />
        <polygon :points="poly(layout.ref.top)" />
      </g>
      <text class="num" font-size="11" fill="var(--muted)" :x="F.x - PX_PER_M * 0.866 - 4" :y="F.y + PX_PER_M * 0.5 + 16" text-anchor="middle">{{ t('sav.refLabel') }}</text>

      <g stroke="var(--fg)" stroke-width="1.5">
        <polygon :points="poly(layout.cube.top)" fill="var(--accent)" fill-opacity="0.35" />
        <polygon :points="poly(layout.cube.left)" fill="var(--accent)" fill-opacity="0.22" />
        <polygon :points="poly(layout.cube.right)" fill="var(--accent)" fill-opacity="0.14" />
      </g>

      <circle :cx="F.x" :cy="F.y" r="3" fill="var(--fg)" />
      <text class="num" font-size="12" fill="var(--fg)" :x="F.x" :y="F.y + 22" text-anchor="middle">s = {{ fmt(layout.s, 2) }} m</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
