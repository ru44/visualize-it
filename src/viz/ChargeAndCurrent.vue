<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/charge-and-current. params: I (A), A (mm², wire cross-section), t (s, time elapsed).
// n (copper free-electron density) and e (elementary charge) are physical constants, not sliders.
// Dots on the wire move at a stylised speed proportional to I (for a readable animation); the real
// drift velocity v_d = I/(nAe) is computed exactly and shown as its own tiny readout, in mm/s.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const WIRE_Y = 240
const WIRE_X0 = 90
const WIRE_X1 = 710

const N = 8.5e28 // free electrons per m^3 in copper
const E_CHARGE = 1.6e-19 // coulombs

const current = computed(() => Math.max(props.params.I ?? 2, 0.01))
const areaMm2 = computed(() => Math.max(props.params.A ?? 1.5, 0.01))
const timeS = computed(() => Math.max(props.params.t ?? 60, 0))
const charge = computed(() => current.value * timeS.value)
const driftMps = computed(() => current.value / (N * (areaMm2.value * 1e-6) * E_CHARGE))
const driftMmps = computed(() => driftMps.value * 1000)

const wireHalfWidth = computed(() => 6 + Math.sqrt(areaMm2.value) * 10)

// --- Animated dots: stylised speed so the picture stays readable across the whole slider range ---
const DOT_COUNT = 16
const spacing = (WIRE_X1 - WIRE_X0) / DOT_COUNT
const offsets = Array.from({ length: DOT_COUNT }, (_, i) => i * spacing)
const shift = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const speed = 30 + current.value * 25
  shift.value = (shift.value + speed * dt) % spacing
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const dots = computed(() => offsets.map((o) => {
  const x = WIRE_X0 + ((o + shift.value) % (WIRE_X1 - WIRE_X0))
  return x
}))

// --- Drag: vertical drag on the wire sets the primary parameter, current I ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height))
  emit('set', 'I', 10 * (1 - frac))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => [
  { label: 'I', value: `${fmt(current.value)} A` },
  { label: 'A', value: `${fmt(areaMm2.value)} mm²` },
  { label: 't', value: `${fmt(timeS.value)} s` },
  { label: 'Q = It', value: `${fmt(charge.value)} C`, color: 'var(--accent-2)' },
  { label: 'v_d = I/(nAe)', value: `${driftMmps.value < 0.001 ? driftMmps.value.toExponential(2) : fmt(driftMmps.value, 4)} mm/s`, color: 'var(--accent)' },
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
      <text x="16" y="28" font-size="12" fill="var(--muted)">{{ t('cc.hint') }}</text>

      <rect :x="WIRE_X0" :y="WIRE_Y - wireHalfWidth" :width="WIRE_X1 - WIRE_X0" :height="wireHalfWidth * 2" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <circle v-for="(x, i) in dots" :key="i" :cx="x" :cy="WIRE_Y" r="5" fill="var(--accent-2)" />

      <text :x="(WIRE_X0 + WIRE_X1) / 2" :y="WIRE_Y - wireHalfWidth - 14" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('cc.wireLabel') }}</text>

      <!-- charge accumulation bar -->
      <text x="16" :y="H - 96" font-size="12" fill="var(--muted)">{{ t('cc.chargeLabel') }}</text>
      <rect x="16" :y="H - 84" width="500" height="14" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="16" :y="H - 84" :width="Math.min(500, (charge / 600) * 500)" height="14" rx="4" fill="var(--accent-2)" />

      <!-- drift speed callout -->
      <g :transform="`translate(560, ${H - 150})`">
        <rect x="0" y="0" width="224" height="96" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="12" y="22" font-size="11" fill="var(--muted)">{{ t('cc.driftLabel') }}</text>
        <text class="num" x="12" y="48" font-size="18" fill="var(--accent)">{{ driftMmps < 0.001 ? driftMmps.toExponential(2) : fmt(driftMmps, 4) }} mm/s</text>
        <text x="12" y="72" font-size="10" fill="var(--muted)">{{ t('cc.driftNote') }}</text>
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('cc.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
