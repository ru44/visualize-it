<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

type Pt = { x: number; y: number }

/** The square built on side p1→p2, extending away from the third vertex. */
function squareOn(p1: Pt, p2: Pt, away: Pt): [Pt, Pt, Pt, Pt] {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const perpA = { x: -dy, y: dx }
  const perpB = { x: dy, y: -dx }
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  const toAway = { x: away.x - mid.x, y: away.y - mid.y }
  const perp = perpA.x * toAway.x + perpA.y * toAway.y > 0 ? perpB : perpA
  return [p1, p2, { x: p2.x + perp.x, y: p2.y + perp.y }, { x: p1.x + perp.x, y: p1.y + perp.y }]
}

/** A point offset from the midpoint of p1→p2, perpendicular, away from the third vertex. */
function labelPos(p1: Pt, p2: Pt, away: Pt, dist: number): Pt {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.hypot(dx, dy) || 1
  const perpA = { x: -dy / len, y: dx / len }
  const perpB = { x: dy / len, y: -dx / len }
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
  const toAway = { x: away.x - mid.x, y: away.y - mid.y }
  const perp = perpA.x * toAway.x + perpA.y * toAway.y > 0 ? perpB : perpA
  return { x: mid.x + perp.x * dist, y: mid.y + perp.y * dist }
}

function poly(pts: Pt[]) {
  return pts.map((p) => `${p.x},${p.y}`).join(' ')
}

const layout = computed(() => {
  const a = Math.max(0.05, props.params.a ?? 3)
  const b = Math.max(0.05, props.params.b ?? 4)
  const c = Math.hypot(a, b)
  const theta = (Math.atan2(a, b) * 180) / Math.PI

  // Local unit space: right angle at the origin, leg a along +x, leg b along -y.
  const Q: Pt = { x: 0, y: 0 }
  const A: Pt = { x: a, y: 0 }
  const B: Pt = { x: 0, y: -b }
  const sqA = squareOn(Q, A, B)
  const sqB = squareOn(B, Q, A)
  const sqC = squareOn(A, B, Q)

  const pts = [Q, A, B, ...sqA, ...sqB, ...sqC]
  const minX = Math.min(...pts.map((p) => p.x))
  const maxX = Math.max(...pts.map((p) => p.x))
  const minY = Math.min(...pts.map((p) => p.y))
  const maxY = Math.max(...pts.map((p) => p.y))

  const margin = 64
  const availW = W - margin * 2
  const availH = H - margin * 2
  const bw = Math.max(maxX - minX, 0.001)
  const bh = Math.max(maxY - minY, 0.001)
  const scale = Math.min(availW / bw, availH / bh)
  const drawW = bw * scale
  const drawH = bh * scale
  const offX = margin + (availW - drawW) / 2 - minX * scale
  const offY = margin + (availH - drawH) / 2 - minY * scale

  const tf = (p: Pt): Pt => ({ x: p.x * scale + offX, y: p.y * scale + offY })

  const rm = Math.min(0.55, Math.max(0.18, Math.min(a, b) * 0.16))
  const rightAngleMark = [
    { x: 0, y: 0 },
    { x: rm, y: 0 },
    { x: rm, y: -rm },
    { x: 0, y: -rm },
  ].map(tf)

  const Qs = tf(Q)
  const As = tf(A)
  const Bs = tf(B)

  return {
    a,
    b,
    c,
    theta,
    scale,
    offX,
    offY,
    Q: Qs,
    A: As,
    B: Bs,
    sqA: sqA.map(tf),
    sqB: sqB.map(tf),
    sqC: sqC.map(tf),
    rightAngleMark,
    labelA: labelPos(Qs, As, Bs, 20),
    labelB: labelPos(Bs, Qs, As, 20),
    labelC: labelPos(As, Bs, Qs, 20),
  }
})

const readouts = computed(() => {
  const { a, b, c, theta } = layout.value
  return [
    { label: 'a²', value: fmt(a * a), color: 'var(--accent)' },
    { label: 'b²', value: fmt(b * b), color: 'var(--pos)' },
    { label: 'a² + b²', value: fmt(a * a + b * b) },
    { label: 'c', value: fmt(c), color: 'var(--accent-2)' },
    { label: 'θ (opposite a)', value: `${fmt(theta)}°` },
  ]
})

// Direct manipulation: drag either far vertex.
const svg = ref<SVGSVGElement>()
const dragTarget = ref<'a' | 'b' | null>(null)

function pointerLocal(e: PointerEvent) {
  const box = svg.value!.getBoundingClientRect()
  const sx = ((e.clientX - box.left) / box.width) * W
  const sy = ((e.clientY - box.top) / box.height) * H
  const { scale, offX, offY } = layout.value
  return { x: (sx - offX) / scale, y: (sy - offY) / scale }
}

function drag(e: PointerEvent) {
  if (!dragTarget.value || !svg.value) return
  const p = pointerLocal(e)
  if (dragTarget.value === 'a') emit('set', 'a', Math.max(0.1, p.x))
  else emit('set', 'b', Math.max(0.1, -p.y))
}
function down(which: 'a' | 'b', e: PointerEvent) {
  dragTarget.value = which
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragTarget.value = null
}
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointermove="drag"
      @pointerup="up"
      @pointercancel="up"
    >
      <polygon
        :points="poly(layout.sqA)"
        fill="var(--accent)"
        fill-opacity="0.12"
        stroke="var(--accent)"
        stroke-opacity="0.6"
        stroke-width="1"
      />
      <polygon
        :points="poly(layout.sqB)"
        fill="var(--pos)"
        fill-opacity="0.12"
        stroke="var(--pos)"
        stroke-opacity="0.6"
        stroke-width="1"
      />
      <polygon
        :points="poly(layout.sqC)"
        fill="var(--accent-2)"
        fill-opacity="0.12"
        stroke="var(--accent-2)"
        stroke-opacity="0.6"
        stroke-width="1"
      />

      <polygon :points="poly([layout.Q, layout.A, layout.B])" fill="none" stroke="var(--fg)" stroke-width="2" />
      <polyline :points="poly(layout.rightAngleMark)" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <circle :cx="layout.Q.x" :cy="layout.Q.y" r="3" fill="var(--muted)" />

      <g class="num" font-size="13" fill="var(--fg)">
        <text :x="layout.labelA.x" :y="layout.labelA.y" text-anchor="middle">a = {{ fmt(layout.a) }}</text>
        <text :x="layout.labelB.x" :y="layout.labelB.y" text-anchor="middle">b = {{ fmt(layout.b) }}</text>
        <text :x="layout.labelC.x" :y="layout.labelC.y" text-anchor="middle">c = {{ fmt(layout.c) }}</text>
      </g>

      <circle
        :cx="layout.A.x"
        :cy="layout.A.y"
        r="7"
        fill="var(--panel)"
        stroke="var(--accent)"
        stroke-width="2"
        class="cursor-grab"
        @pointerdown="down('a', $event)"
      />
      <circle
        :cx="layout.B.x"
        :cy="layout.B.y"
        r="7"
        fill="var(--panel)"
        stroke="var(--pos)"
        stroke-width="2"
        class="cursor-grab"
        @pointerdown="down('b', $event)"
      />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
