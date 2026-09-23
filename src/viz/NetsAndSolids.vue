<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A cube's cross-shaped net, folding shut as `fold` goes 0 → 1. The bottom face C never moves;
// the four side faces (N, S, E, W) hinge up from its edges by fold·90°, and the top face T hinges
// a second time off the far edge of N. Every face keeps the same 3D corner math (a point at
// (u, v) on a face is its hinge origin plus u along the hinge and v along the face's own "up"
// direction, which rotates from lying flat to standing as the hinge angle grows), so nothing here
// is a hard-coded animation — it is the actual geometry of folding a hinged sheet.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const SCALE = 100
const ORIGIN = { x: 400, y: 230 }
const COS_A = Math.cos(Math.PI / 6)
const SIN_A = Math.sin(Math.PI / 6)

type P3 = { x: number; y: number; z: number }
const project = (p: P3) => ({ x: ORIGIN.x + (p.x - p.y) * COS_A * SCALE, y: ORIGIN.y + (p.x + p.y) * SIN_A * SCALE - p.z * SCALE })
const corners = [
  { u: -0.5, v: 0 },
  { u: 0.5, v: 0 },
  { u: 0.5, v: 1 },
  { u: -0.5, v: 1 },
]

function sideFace(O: P3, eu: P3, ev: P3) {
  return corners.map((c) => ({ x: O.x + c.u * eu.x + c.v * ev.x, y: O.y + c.u * eu.y + c.v * ev.y, z: c.v * ev.z }))
}

const layout = computed(() => {
  const fold = Math.min(1, Math.max(0, props.params.fold ?? 0))
  const a = (fold * Math.PI) / 2
  const cosA = Math.cos(a)
  const sinA = Math.sin(a)

  const C: P3[] = [
    { x: -0.5, y: -0.5, z: 0 },
    { x: 0.5, y: -0.5, z: 0 },
    { x: 0.5, y: 0.5, z: 0 },
    { x: -0.5, y: 0.5, z: 0 },
  ]
  const N_ev = { x: 0, y: cosA, z: sinA }
  const N_O = { x: 0, y: 0.5, z: 0 }
  const N_eu = { x: 1, y: 0, z: 0 }
  const N = sideFace(N_O, N_eu, N_ev)
  const S = sideFace({ x: 0, y: -0.5, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: -cosA, z: sinA })
  const E = sideFace({ x: 0.5, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: cosA, y: 0, z: sinA })
  const We = sideFace({ x: -0.5, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: -cosA, y: 0, z: sinA })

  // T hinges off N's far edge (v = 1); its own direction is N's "up" turned through a second
  // copy of the same angle, which works out to (0, cos 2a, sin 2a).
  const Nfar = (u: number): P3 => ({ x: u, y: N_O.y + N_ev.y, z: N_ev.z })
  const Tdir: P3 = { x: 0, y: Math.cos(2 * a), z: Math.sin(2 * a) }
  const T = corners.map((c) => {
    const base = Nfar(c.u)
    return { x: base.x + c.v * Tdir.x, y: base.y + c.v * Tdir.y, z: base.z + c.v * Tdir.z }
  })

  const faces = [
    { pts: C, fill: 'var(--panel)' },
    { pts: N, fill: 'var(--accent)' },
    { pts: S, fill: 'var(--accent-2)' },
    { pts: E, fill: 'var(--pos)' },
    { pts: We, fill: 'var(--pos)' },
    { pts: T, fill: 'var(--accent-2)' },
  ].map((f) => ({ ...f, screen: f.pts.map(project) }))

  return { fold, hinge: fold * 90, faces }
})

const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

const readouts = computed(() => {
  const l = layout.value
  return [
    { label: t('nets.fold'), value: fmt(l.fold, 2), color: 'var(--accent-2)' },
    { label: t('nets.hinge'), value: `${fmt(l.hinge, 0)}°` },
    { label: t('nets.area'), value: '6 L²', color: 'var(--pos)' },
    { label: t('nets.state'), value: l.fold > 0.98 ? t('nets.closed') : l.fold < 0.02 ? t('nets.flat') : t('nets.folding') },
  ]
})
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('nets.hint') }}</text>
      <g stroke="var(--fg)" stroke-width="1.5" stroke-linejoin="round">
        <polygon v-for="(f, i) in layout.faces" :key="i" :points="poly(f.screen)" :fill="f.fill" fill-opacity="0.55" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
