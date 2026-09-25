<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// params V (L), T (K), n (mol). PV = nRT, the one law behind Boyle/Charles/Gay-Lussac. Drag the piston
// to set V, drag the thermometer to set T; the pressure gauge always reads nRT/V for whichever two
// sliders you moved.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const R_GAS = 8.314

const V = computed(() => Math.max(0.1, props.params.V ?? 10))
const T = computed(() => Math.max(1, props.params.T ?? 293))
const n = computed(() => Math.max(0.1, props.params.n ?? 1))
const P = computed(() => (n.value * R_GAS * T.value) / V.value) // kPa

// Cylinder: piston drag sets V (1–30 L over a 60–360 px span).
const CYL = { x: 60, y: 100, h: 260, maxW: 300 }
const SCALE_V = CYL.maxW / 30
const pistonX = computed(() => CYL.x + V.value * SCALE_V)

// Thermometer: vertical drag sets T (200–400 K over the tube height).
const TUBE = { x: 470, top: 100, bottom: 360, w: 24 }
const tFrac = computed(() => Math.min(1, Math.max(0, (T.value - 200) / 200)))
const fillY = computed(() => TUBE.bottom - tFrac.value * (TUBE.bottom - TUBE.top))

// Pressure gauge bar, clamped for display at 3000 kPa (the readout below shows the true number).
const GAUGE = { x: 560, y: 100, w: 24, h: 260, max: 3000 }
const gaugeFill = computed(() => Math.min(1, P.value / GAUGE.max) * GAUGE.h)

const svg = ref<SVGSVGElement>()
const dragging = ref<'piston' | 'therm' | null>(null)
function toLogical(e: PointerEvent) {
  const box = svg.value!.getBoundingClientRect()
  return { x: ((e.clientX - box.left) / box.width) * W, y: ((e.clientY - box.top) / box.height) * H }
}
function move(e: PointerEvent) {
  if (!dragging.value) return
  const p = toLogical(e)
  if (dragging.value === 'piston') emit('set', 'V', Math.max(1, Math.min(30, (p.x - CYL.x) / SCALE_V)))
  else {
    const f = Math.min(1, Math.max(0, (TUBE.bottom - p.y) / (TUBE.bottom - TUBE.top)))
    emit('set', 'T', 200 + f * 200)
  }
}
function down(which: 'piston' | 'therm', e: PointerEvent) {
  dragging.value = which
  svg.value?.setPointerCapture(e.pointerId)
  move(e)
}

const readouts = computed(() => [
  { label: 'P', value: `${fmt(P.value, 0)} kPa`, color: 'var(--accent-2)' },
  { label: 'V', value: `${fmt(V.value, 1)} L` },
  { label: 'T', value: `${fmt(T.value, 0)} K` },
  { label: 'n', value: `${fmt(n.value, 1)} mol` },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none touch-none" @pointermove="move" @pointerup="dragging = null" @pointercancel="dragging = null">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('gl.hint') }}</text>

      <!-- cylinder + piston (drag) -->
      <line :x1="CYL.x" :x2="CYL.x" :y1="CYL.y" :y2="CYL.y + CYL.h" stroke="var(--fg)" stroke-width="2" />
      <line :x1="CYL.x" :x2="pistonX" :y1="CYL.y" :y2="CYL.y" stroke="var(--fg)" stroke-width="2" />
      <line :x1="CYL.x" :x2="pistonX" :y1="CYL.y + CYL.h" :y2="CYL.y + CYL.h" stroke="var(--fg)" stroke-width="2" />
      <rect :x="CYL.x" :y="CYL.y + 3" :width="pistonX - CYL.x" :height="CYL.h - 6" fill="var(--accent)" fill-opacity="0.18" />
      <rect :x="pistonX - 8" :y="CYL.y - 8" width="16" :height="CYL.h + 16" fill="var(--fg)" class="cursor-ew-resize" @pointerdown="down('piston', $event)" />
      <text class="num" :x="CYL.x + (pistonX - CYL.x) / 2" :y="CYL.y + CYL.h + 26" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('gl.drag') }}</text>

      <!-- pressure gauge -->
      <rect :x="GAUGE.x" :y="GAUGE.y" :width="GAUGE.w" :height="GAUGE.h" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <rect :x="GAUGE.x" :y="GAUGE.y + GAUGE.h - gaugeFill" :width="GAUGE.w" :height="gaugeFill" fill="var(--accent-2)" />
      <text class="num" :x="GAUGE.x + GAUGE.w / 2" :y="GAUGE.y - 10" text-anchor="middle" font-size="12" fill="var(--muted)">P</text>

      <!-- thermometer (drag) -->
      <rect :x="TUBE.x - TUBE.w / 2" :y="TUBE.top" :width="TUBE.w" :height="TUBE.bottom - TUBE.top" rx="12" fill="none" stroke="var(--line)" stroke-width="2" />
      <rect :x="TUBE.x - TUBE.w / 2 + 3" :y="fillY" :width="TUBE.w - 6" :height="TUBE.bottom - fillY - 3" rx="9" fill="var(--pos)" />
      <circle :cx="TUBE.x" :cy="TUBE.bottom + 14" r="16" fill="var(--pos)" />
      <rect :x="TUBE.x - 20" :y="TUBE.top - 10" width="40" :height="TUBE.bottom - TUBE.top + 20" fill="transparent" class="cursor-ns-resize" @pointerdown="down('therm', $event)" />
      <text class="num" :x="TUBE.x" :y="TUBE.top - 16" text-anchor="middle" font-size="12" fill="var(--muted)">T</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
