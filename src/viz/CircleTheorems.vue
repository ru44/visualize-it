<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The inscribed-angle theorem: drag C around the far arc and its angle ACB stays fixed at
// half the central angle AOB. arc is the central angle in degrees (0-180); pos is C's place
// along the far arc, as a fraction from B's side to A's side. A fixed tangent at A shows it is
// always perpendicular to the radius OA.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const cx = 400
const cy = 235
const R = 150
const thetaA = 200

const deg2rad = (d: number) => (d * Math.PI) / 180
const ptAt = (deg: number) => ({ x: cx + R * Math.cos(deg2rad(deg)), y: cy + R * Math.sin(deg2rad(deg)) })
const angleOf = (p: { x: number; y: number }) => {
  let d = (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI
  if (d < 0) d += 360
  return d
}

const layout = computed(() => {
  const arc = Math.min(180, Math.max(20, props.params.arc ?? 100))
  const pos = Math.min(0.95, Math.max(0.05, props.params.pos ?? 0.5))
  const thetaB = thetaA - arc
  const thetaC = thetaA + pos * (360 - arc)

  const O = { x: cx, y: cy }
  const A = ptAt(thetaA)
  const B = ptAt(thetaB)
  const C = ptAt(thetaC)

  const angleBetween = (p: { x: number; y: number }, q: { x: number; y: number }, at: { x: number; y: number }) => {
    const v1 = { x: p.x - at.x, y: p.y - at.y }
    const v2 = { x: q.x - at.x, y: q.y - at.y }
    const dot = v1.x * v2.x + v1.y * v2.y
    const mag = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y) || 1
    return (Math.acos(Math.min(1, Math.max(-1, dot / mag))) * 180) / Math.PI
  }
  const inscribed = angleBetween(A, B, C)

  // tangent at A: perpendicular to the radius OA. Compute the angle between them (not assumed)
  // so the readout genuinely reflects the geometry rather than a hard-coded 90.
  const u = { x: (A.x - cx) / R, y: (A.y - cy) / R }
  const tdir = { x: -u.y, y: u.x }
  const tanP1 = { x: A.x - tdir.x * 75, y: A.y - tdir.y * 75 }
  const tanP2 = { x: A.x + tdir.x * 75, y: A.y + tdir.y * 75 }
  const dot = u.x * tdir.x + u.y * tdir.y
  const tangentAngle = (Math.acos(Math.min(1, Math.max(-1, dot))) * 180) / Math.PI
  const rm = { p1: { x: A.x - u.x * 16, y: A.y - u.y * 16 }, p2: { x: A.x - u.x * 16 + tdir.x * 16, y: A.y - u.y * 16 + tdir.y * 16 }, p3: { x: A.x + tdir.x * 16, y: A.y + tdir.y * 16 } }

  // small arc markers for the two angles
  const arcPath = (at: { x: number; y: number }, from: number, to: number, rad: number) => {
    const p1 = { x: at.x + rad * Math.cos(deg2rad(from)), y: at.y + rad * Math.sin(deg2rad(from)) }
    const p2 = { x: at.x + rad * Math.cos(deg2rad(to)), y: at.y + rad * Math.sin(deg2rad(to)) }
    let sweep = to - from
    if (sweep < 0) sweep += 360
    const large = sweep > 180 ? 1 : 0
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${rad} ${rad} 0 ${large} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  const centralArcPath = arcPath(O, thetaB, thetaA, 34)
  const angleOfVec = (dx: number, dy: number) => { let d = (Math.atan2(dy, dx) * 180) / Math.PI; if (d < 0) d += 360; return d }
  const angA = angleOfVec(A.x - C.x, A.y - C.y)
  const angB = angleOfVec(B.x - C.x, B.y - C.y)
  const inscribedArcPath = arcPath(C, angA, angB, 26)

  return { arc, pos, O, A, B, C, inscribed, tanP1, tanP2, rightMark: [rm.p1, rm.p2, rm.p3], centralArcPath, inscribedArcPath, tangentAngle }
})

const readouts = computed(() => {
  const l = layout.value
  return [
    { label: t('ctheo.central'), value: `${fmt(l.arc, 1)}°`, color: 'var(--accent-2)' },
    { label: t('ctheo.inscribed'), value: `${fmt(l.inscribed, 1)}°`, color: 'var(--pos)' },
    { label: t('ctheo.ratio'), value: fmt(l.arc / l.inscribed, 3) },
    { label: t('ctheo.tangent'), value: `${fmt(l.tangentAngle, 0)}°` },
  ]
})

const svg = ref<SVGSVGElement>()
const draggingC = ref(false)
function setCFromEvent(e: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sxp = ((e.clientX - box.left) / box.width) * W
  const syp = ((e.clientY - box.top) / box.height) * H
  const deg = angleOf({ x: sxp, y: syp })
  const { arc } = layout.value
  let rel = deg - thetaA
  rel = ((rel % 360) + 360) % 360
  const span = 360 - arc
  const p = Math.min(0.95, Math.max(0.05, rel / span))
  emit('set', 'pos', p)
}
function down(e: PointerEvent) {
  draggingC.value = true
  svg.value?.setPointerCapture(e.pointerId)
  setCFromEvent(e)
}
function move(e: PointerEvent) {
  if (draggingC.value) setCFromEvent(e)
}
function up() {
  draggingC.value = false
}
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointermove="move"
      @pointerup="up"
      @pointercancel="up"
    >
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ctheo.hint') }}</text>

      <circle :cx="cx" :cy="cy" :r="R" fill="var(--accent)" fill-opacity="0.04" stroke="var(--line)" stroke-width="2" />

      <line :x1="layout.tanP1.x" :y1="layout.tanP1.y" :x2="layout.tanP2.x" :y2="layout.tanP2.y" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 5" />
      <polyline :points="layout.rightMark.map((p) => `${p.x},${p.y}`).join(' ')" fill="none" stroke="var(--muted)" stroke-width="1.5" />

      <line :x1="layout.O.x" :y1="layout.O.y" :x2="layout.A.x" :y2="layout.A.y" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="layout.O.x" :y1="layout.O.y" :x2="layout.B.x" :y2="layout.B.y" stroke="var(--fg)" stroke-width="1.5" />
      <line :x1="layout.C.x" :y1="layout.C.y" :x2="layout.A.x" :y2="layout.A.y" stroke="var(--pos)" stroke-width="2" />
      <line :x1="layout.C.x" :y1="layout.C.y" :x2="layout.B.x" :y2="layout.B.y" stroke="var(--pos)" stroke-width="2" />
      <line :x1="layout.A.x" :y1="layout.A.y" :x2="layout.B.x" :y2="layout.B.y" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 4" />

      <path :d="layout.centralArcPath" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <path :d="layout.inscribedArcPath" fill="none" stroke="var(--pos)" stroke-width="2.5" />

      <circle :cx="layout.O.x" :cy="layout.O.y" r="3" fill="var(--muted)" />
      <circle :cx="layout.A.x" :cy="layout.A.y" r="5" fill="var(--fg)" />
      <circle :cx="layout.B.x" :cy="layout.B.y" r="5" fill="var(--fg)" />
      <circle :cx="layout.C.x" :cy="layout.C.y" r="8" fill="var(--pos)" stroke="var(--panel)" stroke-width="2" class="cursor-grab" @pointerdown="down" />

      <g class="num" font-size="13" fill="var(--fg)">
        <text :x="layout.O.x - 16" :y="layout.O.y + 4" text-anchor="end">O</text>
        <text :x="layout.A.x - 10" :y="layout.A.y - 8" text-anchor="middle">A</text>
        <text :x="layout.B.x - 10" :y="layout.B.y - 8" text-anchor="middle">B</text>
        <text :x="layout.C.x" :y="layout.C.y - 14" text-anchor="middle" fill="var(--pos)">C</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
