<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Two horizontal parallel lines cut by one transversal at angle `theta` (degrees, dragged from the
// top handle). `pair` (0/1/2) selects which named relationship to highlight: corresponding,
// alternate or co-interior. Both crossings share the same four sectors (S1 top-right of the
// crossing round to S4 bottom-right, in the same local order) because the lines are parallel.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const D2R = Math.PI / 180
const THETA_MIN = 15
const THETA_MAX = 165
const Y1 = 150
const Y2 = 330
const CX = 400

const theta = computed(() => Math.min(THETA_MAX, Math.max(THETA_MIN, props.params.theta ?? 55)))
const pairIdx = computed(() => Math.min(2, Math.max(0, Math.round(props.params.pair ?? 0))))
const pairs = ['corresponding', 'alternate', 'co-interior'] as const

const P1 = { x: CX, y: Y1 }
function pointAtY(y: number) {
  const rad = theta.value * D2R
  const tt = (Y1 - y) / Math.sin(rad)
  return { x: CX + tt * Math.cos(rad), y }
}
const P2 = computed(() => pointAtY(Y2))
const topPt = computed(() => pointAtY(60))
const botPt = computed(() => pointAtY(430))
const centers = computed(() => ({ P1, P2: P2.value }))

const sectors = computed(() => {
  const th = theta.value
  return [
    { id: 'S1', from: 0, to: th, val: th },
    { id: 'S2', from: th, to: 180, val: 180 - th },
    { id: 'S3', from: 180, to: 180 + th, val: th },
    { id: 'S4', from: 180 + th, to: 360, val: 180 - th },
  ]
})
const sectorById = computed(() => Object.fromEntries(sectors.value.map((s) => [s.id, s])))

const HIGHLIGHT: Record<number, [{ pt: 'P1' | 'P2'; s: string }, { pt: 'P1' | 'P2'; s: string }]> = {
  0: [{ pt: 'P1', s: 'S1' }, { pt: 'P2', s: 'S1' }],
  1: [{ pt: 'P1', s: 'S3' }, { pt: 'P2', s: 'S1' }],
  2: [{ pt: 'P1', s: 'S3' }, { pt: 'P2', s: 'S2' }],
}

function arcWedge(center: { x: number; y: number }, from: number, to: number, r: number) {
  const n = 16
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const ang = (from + ((to - from) * i) / n) * D2R
    return `${center.x + r * Math.cos(ang)},${center.y - r * Math.sin(ang)}`
  })
  return `M${center.x},${center.y} L${pts.join(' L')} Z`
}
function bisectorPt(center: { x: number; y: number }, from: number, to: number, r: number) {
  const ang = ((from + to) / 2) * D2R
  return { x: center.x + r * Math.cos(ang), y: center.y - r * Math.sin(ang) }
}

const R_LIGHT = 26
const R_BOLD = 42
const wedges = computed(() =>
  HIGHLIGHT[pairIdx.value].map((h, i) => {
    const c = centers.value[h.pt]
    const s = sectorById.value[h.s]
    return { path: arcWedge(c, s.from, s.to, R_BOLD), label: bisectorPt(c, s.from, s.to, R_BOLD + 22), val: s.val, color: i === 0 ? 'var(--accent)' : 'var(--accent-2)' }
  }),
)
const lightWedges = computed(() => {
  const out: { path: string }[] = []
  for (const pt of ['P1', 'P2'] as const) for (const s of sectors.value) out.push({ path: arcWedge(centers.value[pt], s.from, s.to, R_LIGHT) })
  return out
})

const readouts = computed(() => {
  const [w1, w2] = wedges.value
  const sameSide = pairIdx.value === 2
  return [
    { label: t('parallel-lines.angle1'), value: `${fmt(w1.val, 1)}°`, color: w1.color },
    { label: t('parallel-lines.angle2'), value: `${fmt(w2.val, 1)}°`, color: w2.color },
    { label: sameSide ? t('parallel-lines.sum180') : t('parallel-lines.equalMark'), value: sameSide ? `${fmt(w1.val + w2.val, 1)}°` : Math.abs(w1.val - w2.val) < 0.05 ? '✓' : '' },
    { label: 'θ', value: `${fmt(theta.value, 1)}°` },
  ]
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sx = ((e.clientX - box.left) / box.width) * W
  const sy = ((e.clientY - box.top) / box.height) * H
  const raw = (Math.atan2(P1.y - sy, sx - P1.x) * 180) / Math.PI
  emit('set', 'theta', Math.min(THETA_MAX, Math.max(THETA_MIN, raw)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragging.value = false
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="drag" @pointerup="up" @pointercancel="up">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('parallel-lines.hint') }}</text>

      <line x1="60" :y1="Y1" x2="740" :y2="Y1" stroke="var(--fg)" stroke-width="2" />
      <line x1="60" :y1="Y2" x2="740" :y2="Y2" stroke="var(--fg)" stroke-width="2" />
      <g stroke="var(--muted)" stroke-width="2" fill="none">
        <polyline points="180,142 190,150 180,158" />
        <polyline points="180,322 190,330 180,338" />
      </g>
      <line :x1="topPt.x" :y1="topPt.y" :x2="botPt.x" :y2="botPt.y" stroke="var(--fg)" stroke-width="2" />

      <path v-for="(w, i) in lightWedges" :key="'l' + i" :d="w.path" fill="var(--muted)" fill-opacity="0.07" stroke="var(--line)" stroke-width="1" />
      <path v-for="(w, i) in wedges" :key="'h' + i" :d="w.path" :fill="w.color" fill-opacity="0.28" :stroke="w.color" stroke-width="2" />
      <g class="num" font-size="14">
        <text v-for="(w, i) in wedges" :key="'t' + i" :x="w.label.x" :y="w.label.y" text-anchor="middle" :fill="w.color">{{ fmt(w.val, 0) }}°</text>
      </g>

      <circle :cx="P1.x" :cy="P1.y" r="3" fill="var(--muted)" />
      <circle :cx="P2.x" :cy="P2.y" r="3" fill="var(--muted)" />
      <circle :cx="topPt.x" :cy="topPt.y" r="8" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" class="cursor-grab" @pointerdown="down" />

      <g class="num" font-size="13">
        <rect v-for="(p, i) in pairs" :key="p" :x="60 + i * 230" y="446" width="216" height="26" rx="6" :fill="i === pairIdx ? 'var(--fg)' : 'var(--panel)'" stroke="var(--line)" class="cursor-pointer" @click="emit('set', 'pair', i)" />
        <text v-for="(p, i) in pairs" :key="'b' + p" :x="168 + i * 230" y="463" text-anchor="middle" :fill="i === pairIdx ? 'var(--bg)' : 'var(--fg)'" class="pointer-events-none">{{ t(`parallel-lines.${p}` as any) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
