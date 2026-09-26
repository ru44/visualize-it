<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/electric-motors. params: N, I, A, B, theta (rad). tau = N*I*A*B*sin(theta).
// The two dots are the coil's near and far wires, seen end-on, at angle theta from the field axis
// (horizontal, N pole left, S pole right). A dot (out of the page) and a cross (into the page) show
// current direction; the split-ring commutator below flips which wire is which exactly at theta = 0
// and pi, keeping the torque arrow's sense the same all the way round.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 400
const CY = 220
const RC = 110

const N = computed(() => Math.max(props.params.N ?? 100, 1))
const I = computed(() => Math.max(props.params.I ?? 0.5, 0))
const A = computed(() => Math.max(props.params.A ?? 0.001, 0))
const B = computed(() => Math.max(props.params.B ?? 0.4, 0))
const theta = computed(() => props.params.theta ?? Math.PI / 2)

const tau = computed(() => N.value * I.value * A.value * B.value * Math.sin(theta.value))

const wire1 = computed(() => ({ x: CX + RC * Math.cos(theta.value), y: CY - RC * Math.sin(theta.value) }))
const wire2 = computed(() => ({ x: CX - RC * Math.cos(theta.value), y: CY + RC * Math.sin(theta.value) }))
const outward = computed(() => Math.sin(theta.value) >= 0) // wire1 current direction

// torque arc: a curved arrow whose sweep length shows |tau|; always drawn counter-clockwise, the
// sense the commutator maintains once the coil is turning.
const torqueSweep = computed(() => Math.min(140, 10 + Math.abs(tau.value) * 900))
const torqueArc = computed(() => {
  const r = 150
  const a0 = -Math.PI / 2 - 0.3
  const a1 = a0 - (torqueSweep.value / 180) * Math.PI
  const p0 = { x: CX + r * Math.cos(a0), y: CY + r * Math.sin(a0) }
  const p1 = { x: CX + r * Math.cos(a1), y: CY + r * Math.sin(a1) }
  return `M${p0.x},${p0.y} A${r},${r} 0 0 0 ${p1.x},${p1.y}`
})

// --- commutator: a split ring that rotates with the coil, brushes fixed left/right ---
const COM_Y = 400
const COM_R = 34
const commAngle = computed(() => theta.value)
function halfArc(startOffset: number) {
  const a0 = commAngle.value + startOffset
  const a1 = a0 + Math.PI
  const p0 = { x: CX + COM_R * Math.cos(a0), y: COM_Y + COM_R * Math.sin(a0) }
  const p1 = { x: CX + COM_R * Math.cos(a1), y: COM_Y + COM_R * Math.sin(a1) }
  return `M${p0.x},${p0.y} A${COM_R},${COM_R} 0 0 1 ${p1.x},${p1.y}`
}

// --- drag anywhere to set theta from the pointer angle around the axle ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const py = ((e.clientY - box.top) / box.height) * H
  let ang = Math.atan2(-(py - CY), px - CX)
  if (ang < 0) ang += 2 * Math.PI
  emit('set', 'theta', ang)
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => [
  { label: 'θ', value: `${fmt((theta.value * 180) / Math.PI, 3)}°` },
  { label: 'N, I, A, B', value: `${fmt(N.value, 3)}, ${fmt(I.value, 2)} A, ${fmt(A.value * 1e4, 2)} cm², ${fmt(B.value, 2)} T` },
  { label: 'τ = NIAB sinθ', value: `${fmt(tau.value, 4)} N·m`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('em.hint') }}</text>

      <!-- fixed magnet poles -->
      <rect x="20" y="80" width="90" height="280" rx="8" fill="var(--neg)" />
      <text x="65" y="230" text-anchor="middle" font-size="28" font-weight="700" fill="white">N</text>
      <rect :x="W - 110" y="80" width="90" height="280" rx="8" fill="var(--accent)" />
      <text :x="W - 65" y="230" text-anchor="middle" font-size="28" font-weight="700" fill="white">S</text>

      <!-- field lines, N to S -->
      <line v-for="i in 5" :key="'fl' + i" :x1="118" :x2="W - 118" :y1="110 + i * 40" :y2="110 + i * 40" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="2 6" marker-end="url(#emArrow)" />
      <defs>
        <marker id="emArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--muted)" />
        </marker>
      </defs>

      <!-- axle and coil (two wires, end-on) -->
      <circle :cx="CX" :cy="CY" r="4" fill="var(--muted)" />
      <line :x1="wire1.x" :y1="wire1.y" :x2="wire2.x" :y2="wire2.y" stroke="var(--muted)" stroke-width="3" />
      <circle :cx="wire1.x" :cy="wire1.y" r="14" :fill="outward ? 'var(--accent-2)' : 'var(--accent)'" />
      <circle :cx="wire2.x" :cy="wire2.y" r="14" :fill="outward ? 'var(--accent)' : 'var(--accent-2)'" />
      <circle :cx="wire1.x" :cy="wire1.y" r="3.5" fill="white" v-if="outward" />
      <g v-if="!outward">
        <line :x1="wire1.x - 6" :y1="wire1.y - 6" :x2="wire1.x + 6" :y2="wire1.y + 6" stroke="white" stroke-width="2" />
        <line :x1="wire1.x - 6" :y1="wire1.y + 6" :x2="wire1.x + 6" :y2="wire1.y - 6" stroke="white" stroke-width="2" />
      </g>
      <circle :cx="wire2.x" :cy="wire2.y" r="3.5" fill="white" v-if="!outward" />
      <g v-if="outward">
        <line :x1="wire2.x - 6" :y1="wire2.y - 6" :x2="wire2.x + 6" :y2="wire2.y + 6" stroke="white" stroke-width="2" />
        <line :x1="wire2.x - 6" :y1="wire2.y + 6" :x2="wire2.x + 6" :y2="wire2.y - 6" stroke="white" stroke-width="2" />
      </g>

      <!-- torque arc -->
      <path :d="torqueArc" fill="none" stroke="var(--pos)" stroke-width="4" stroke-linecap="round" marker-end="url(#emTorqueArrow)" />
      <defs>
        <marker id="emTorqueArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="var(--pos)" />
        </marker>
      </defs>
      <text :x="CX" :y="60" text-anchor="middle" font-size="13" fill="var(--pos)">{{ t('em.torque') }}</text>

      <!-- commutator + brushes -->
      <path :d="halfArc(0)" fill="none" :stroke="outward ? 'var(--accent-2)' : 'var(--accent)'" stroke-width="10" />
      <path :d="halfArc(Math.PI)" fill="none" :stroke="outward ? 'var(--accent)' : 'var(--accent-2)'" stroke-width="10" />
      <line :x1="CX" :y1="CY" :x2="CX" :y2="COM_Y - COM_R" stroke="var(--muted)" stroke-width="2.5" />
      <rect :x="CX - COM_R - 20" :y="COM_Y - 6" width="16" height="12" fill="var(--fg)" />
      <rect :x="CX + COM_R + 4" :y="COM_Y - 6" width="16" height="12" fill="var(--fg)" />
      <text :x="CX" :y="COM_Y + 56" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('em.commutatorCaption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
