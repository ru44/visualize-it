<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { fmt } from '../engine/math'
import Readouts from '../components/Readouts.vue'

const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const MASS_H = 1.008
const MASS_O = 15.999
const MASS_H2 = 2 * MASS_H
const MASS_O2 = 2 * MASS_O
const MASS_H2O = 2 * MASS_H + MASS_O

const h2Count = computed(() => Math.round(Math.min(12, Math.max(0, props.params.h2 ?? 6))))
const o2Count = computed(() => Math.round(Math.min(8, Math.max(0, props.params.o2 ?? 2))))
const progress = computed(() => Math.min(1, Math.max(0, props.params.progress ?? 0)))

interface Atom {
  elem: 'H' | 'O'
  x0: number
  y0: number
  x1: number
  y1: number
  leftover: boolean
}
interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}

function gridPos(i: number, cols: number, cellW: number, cellH: number, ox: number, oy: number): [number, number] {
  const col = i % cols
  const row = Math.floor(i / cols)
  return [ox + col * cellW, oy + row * cellH]
}

const scene = computed(() => {
  const nH2 = h2Count.value
  const nO2 = o2Count.value
  const n = Math.min(Math.floor(nH2 / 2), nO2)
  const ease = progress.value * progress.value * (3 - 2 * progress.value)

  const H2_OFF: [number, number][] = [
    [-7, 0],
    [7, 0],
  ]
  const O2_OFF: [number, number][] = [
    [-10, 0],
    [10, 0],
  ]
  const O_OFF: [number, number] = [0, -4]
  const H1_OFF: [number, number] = [-12.65, 5.8]
  const H2_TARGET_OFF: [number, number] = [12.65, 5.8]

  const h2Centers = Array.from({ length: nH2 }, (_, i) => gridPos(i, 4, 80, 72, 70, 60))
  const o2Centers = Array.from({ length: nO2 }, (_, i) => gridPos(i, 4, 80, 72, 70, 60 + 3 * 72 + 36))
  const productCenters = Array.from({ length: 2 * n }, (_, i) => gridPos(i, 4, 80, 100, 470, 70))

  const h2Atoms: Atom[][] = h2Centers.map(([cx, cy], i) =>
    H2_OFF.map(([ox, oy]) => ({ elem: 'H' as const, x0: cx + ox, y0: cy + oy, x1: cx + ox, y1: cy + oy, leftover: i >= 2 * n })),
  )
  const o2Atoms: Atom[][] = o2Centers.map(([cx, cy], i) =>
    O2_OFF.map(([ox, oy]) => ({ elem: 'O' as const, x0: cx + ox, y0: cy + oy, x1: cx + ox, y1: cy + oy, leftover: i >= n })),
  )

  const newBondGroups: [Atom, Atom, Atom][] = []
  for (let e = 0; e < n; e++) {
    const A = h2Atoms[2 * e]!
    const B = h2Atoms[2 * e + 1]!
    const O = o2Atoms[e]!
    const w1 = productCenters[2 * e]!
    const w2 = productCenters[2 * e + 1]!
    O[0]!.x1 = w1[0] + O_OFF[0]; O[0]!.y1 = w1[1] + O_OFF[1]
    O[1]!.x1 = w2[0] + O_OFF[0]; O[1]!.y1 = w2[1] + O_OFF[1]
    A[0]!.x1 = w1[0] + H1_OFF[0]; A[0]!.y1 = w1[1] + H1_OFF[1]
    B[0]!.x1 = w1[0] + H2_TARGET_OFF[0]; B[0]!.y1 = w1[1] + H2_TARGET_OFF[1]
    A[1]!.x1 = w2[0] + H1_OFF[0]; A[1]!.y1 = w2[1] + H1_OFF[1]
    B[1]!.x1 = w2[0] + H2_TARGET_OFF[0]; B[1]!.y1 = w2[1] + H2_TARGET_OFF[1]
    newBondGroups.push([O[0]!, A[0]!, B[0]!])
    newBondGroups.push([O[1]!, A[1]!, B[1]!])
  }

  function pos(a: Atom): [number, number] {
    if (a.leftover) return [a.x0, a.y0]
    return [a.x0 + (a.x1 - a.x0) * ease, a.y0 + (a.y1 - a.y0) * ease]
  }

  const oldBonds: Line[] = [...h2Atoms, ...o2Atoms].map(([a, b]) => {
    const p1 = pos(a!)
    const p2 = pos(b!)
    return { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], opacity: a!.leftover ? 1 : 1 - ease }
  })

  const newBonds: Line[] = []
  for (const [o, h1, h2] of newBondGroups) {
    const po = pos(o)
    const p1 = pos(h1)
    const p2 = pos(h2)
    newBonds.push({ x1: po[0], y1: po[1], x2: p1[0], y2: p1[1], opacity: ease })
    newBonds.push({ x1: po[0], y1: po[1], x2: p2[0], y2: p2[1], opacity: ease })
  }

  const atoms = [...h2Atoms.flat(), ...o2Atoms.flat()].map((a) => {
    const p = pos(a)
    return { elem: a.elem, x: p[0], y: p[1] }
  })

  const excessRings = [
    ...h2Centers.slice(2 * n).map(([cx, cy]) => ({ cx, cy, r: 16 })),
    ...o2Centers.slice(n).map(([cx, cy]) => ({ cx, cy, r: 20 })),
  ]

  const h2Used = 2 * n
  const o2Used = n
  const h2oFormed = 2 * n
  const leftoverH2 = nH2 - h2Used
  const leftoverO2 = nO2 - o2Used
  const ratioH2 = nH2 / 2
  let limiting = 'exact ratio — none'
  if (ratioH2 < nO2) limiting = 'H₂'
  else if (nO2 < ratioH2) limiting = 'O₂'

  const massBefore = nH2 * MASS_H2 + nO2 * MASS_O2
  const massAfter = h2oFormed * MASS_H2O + leftoverH2 * MASS_H2 + leftoverO2 * MASS_O2

  return { atoms, oldBonds, newBonds, excessRings, h2Used, o2Used, h2oFormed, leftoverH2, leftoverO2, limiting, massBefore, massAfter }
})

const readouts = computed(() => [
  { label: 'H₂ used', value: fmt(scene.value.h2Used) },
  { label: 'O₂ used', value: fmt(scene.value.o2Used) },
  { label: 'H₂O formed', value: fmt(scene.value.h2oFormed), color: 'var(--accent-2)' },
  { label: 'limiting reactant', value: scene.value.limiting },
  { label: 'leftover', value: `H₂ ${fmt(scene.value.leftoverH2)} · O₂ ${fmt(scene.value.leftoverO2)}` },
  { label: 'mass check', value: `${fmt(scene.value.massBefore)} g = ${fmt(scene.value.massAfter)} g` },
])

let dragging = false
function clientToX(e: PointerEvent): number {
  const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
  return ((e.clientX - rect.left) / rect.width) * 800
}
function updateFromEvent(e: PointerEvent) {
  const x = clientToX(e)
  const p = Math.min(1, Math.max(0, (x - 40) / 720))
  emit('set', 'progress', Math.round(p * 100) / 100)
}
function onDown(e: PointerEvent) {
  dragging = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  updateFromEvent(e)
}
function onMove(e: PointerEvent) {
  if (!dragging) return
  updateFromEvent(e)
}
function onUp() {
  dragging = false
}

const playing = ref(false)
let rafId: number | null = null
function stopPlay() {
  playing.value = false
  if (rafId !== null) cancelAnimationFrame(rafId)
  rafId = null
}
function togglePlay() {
  if (playing.value) {
    stopPlay()
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const target = progress.value >= 1 ? 0 : 1
  if (reduced) {
    emit('set', 'progress', target)
    return
  }
  playing.value = true
  const from = progress.value
  const dur = 3000
  const start = performance.now()
  function step(now: number) {
    const t = Math.min(1, (now - start) / dur)
    emit('set', 'progress', Math.round((from + (target - from) * t) * 100) / 100)
    if (t < 1 && playing.value) rafId = requestAnimationFrame(step)
    else stopPlay()
  }
  rafId = requestAnimationFrame(step)
}
onUnmounted(stopPlay)
</script>

<template>
  <div>
    <svg viewBox="0 0 800 480" class="block w-full touch-none select-none" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp">
      <rect x="0" y="0" width="800" height="480" fill="var(--bg)" />
      <line x1="420" y1="20" x2="420" y2="450" stroke="var(--grid)" stroke-dasharray="2 4" />
      <text class="num" x="70" y="28" font-size="12" fill="var(--muted)">reactants</text>
      <text class="num" x="470" y="28" font-size="12" fill="var(--muted)">products</text>

      <line v-for="(b, i) in scene.oldBonds" :key="'ob' + i" :x1="b.x1" :y1="b.y1" :x2="b.x2" :y2="b.y2" stroke="var(--line)" stroke-width="1.4" :opacity="b.opacity" />
      <line v-for="(b, i) in scene.newBonds" :key="'nb' + i" :x1="b.x1" :y1="b.y1" :x2="b.x2" :y2="b.y2" stroke="var(--line)" stroke-width="1.4" :opacity="b.opacity" />
      <circle v-for="(r, i) in scene.excessRings" :key="'ex' + i" :cx="r.cx" :cy="r.cy" :r="r.r" fill="none" stroke="var(--muted)" stroke-dasharray="3 3" stroke-width="1" />
      <circle v-for="(a, i) in scene.atoms" :key="'a' + i" :cx="a.x" :cy="a.y" :r="a.elem === 'H' ? 5 : 9" :fill="a.elem === 'H' ? 'var(--accent)' : 'var(--neg)'" />

      <text v-if="scene.excessRings.length" class="num" x="784" y="466" text-anchor="end" font-size="12" fill="var(--muted)">dashed ring = excess (unreacted)</text>

      <g class="cursor-pointer" @pointerdown.stop="togglePlay">
        <rect x="736" y="14" width="48" height="26" rx="4" fill="var(--panel)" stroke="var(--line)" />
        <path v-if="!playing" d="M752 21 L752 33 L768 27 Z" fill="var(--fg)" />
        <g v-else>
          <rect x="751" y="20" width="4" height="14" fill="var(--fg)" />
          <rect x="761" y="20" width="4" height="14" fill="var(--fg)" />
        </g>
      </g>

      <text class="num" x="16" y="466" font-size="12" fill="var(--muted)">drag horizontally to scrub progress · {{ (progress * 100).toFixed(0) }}%</text>
    </svg>
    <p class="mt-2 text-xs" style="color: var(--muted)">Conceptual rearrangement — real reactions proceed through collisions and intermediates.</p>
    <Readouts :items="readouts" />
  </div>
</template>
