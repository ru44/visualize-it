<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/voltage-and-energy. params: V (volts), Q (charge moved, coulombs). A battery is drawn
// as a pump lifting charge blobs from a low reservoir to a high one — the height of the lift is V,
// so each blob gains the same energy boost E = QV/n as it rises, then "falls" back down the circuit.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const LOW_Y = 380
const BASE_LIFT = 60

const voltage = computed(() => Math.max(props.params.V ?? 9, 0.1))
const charge = computed(() => Math.max(props.params.Q ?? 10, 0.1))
const energy = computed(() => voltage.value * charge.value)

const highY = computed(() => LOW_Y - BASE_LIFT - voltage.value * 12)
const pumpX = 260
const dropX = 540

// --- Animated charge blobs riding the pump then falling down the release chute ---
const BLOB_COUNT = 6
const phase = ref(Array.from({ length: BLOB_COUNT }, (_, i) => i / BLOB_COUNT))
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const speed = 0.15 + Math.min(charge.value, 40) * 0.01
  phase.value = phase.value.map((p) => (p + speed * dt) % 1)
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

function blobPos(p: number) {
  // 0 -> 0.5: rising through the pump; 0.5 -> 1: falling down the release chute back to the low rail
  if (p < 0.5) {
    const f = p / 0.5
    return { x: pumpX, y: LOW_Y - f * (LOW_Y - highY.value) }
  }
  const f = (p - 0.5) / 0.5
  const x = pumpX + f * (dropX - pumpX)
  const y = highY.value + f * (LOW_Y - highY.value)
  return { x, y }
}
const blobs = computed(() => phase.value.map(blobPos))

// --- Drag: vertical drag on the pump sets voltage V ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height))
  emit('set', 'V', 24 * (1 - frac))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => [
  { label: 'V', value: `${fmt(voltage.value)} V` },
  { label: 'Q', value: `${fmt(charge.value)} C` },
  { label: 'E = QV', value: `${fmt(energy.value)} J`, color: 'var(--accent)' },
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
      <text x="16" y="28" font-size="12" fill="var(--muted)">{{ t('ve.hint') }}</text>

      <!-- low and high rails -->
      <line :x1="80" :y1="LOW_Y" :x2="720" :y2="LOW_Y" stroke="var(--line)" stroke-width="2" />
      <line :x1="pumpX - 40" :y1="highY" :x2="dropX + 20" :y2="highY" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 4" />
      <text :x="dropX + 30" :y="highY + 4" font-size="11" fill="var(--accent)">{{ t('ve.highLevel') }}</text>
      <text x="90" :y="LOW_Y + 20" font-size="11" fill="var(--muted)">{{ t('ve.lowLevel') }}</text>

      <!-- pump body -->
      <rect :x="pumpX - 26" :y="highY" width="52" :height="LOW_Y - highY" fill="var(--sunken)" stroke="var(--accent-2)" stroke-width="2" rx="8" />
      <text :x="pumpX - 40" :y="(highY + LOW_Y) / 2" text-anchor="end" font-size="12" fill="var(--fg)">{{ t('ve.pump') }}</text>

      <!-- release chute -->
      <line :x1="pumpX" :y1="highY" :x2="dropX" :y2="LOW_Y" stroke="var(--muted)" stroke-width="2" stroke-dasharray="2 6" />

      <!-- charge blobs -->
      <circle v-for="(b, i) in blobs" :key="i" :cx="b.x" :cy="b.y" r="9" fill="var(--accent-2)" />

      <text :x="pumpX" :y="highY - 16" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">V = {{ fmt(voltage) }} V</text>

      <g :transform="`translate(560, 60)`">
        <rect x="0" y="0" width="180" height="72" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="12" y="24" font-size="11" fill="var(--muted)">{{ t('ve.energyLabel') }}</text>
        <text class="num" x="12" y="52" font-size="20" fill="var(--accent)">{{ fmt(energy) }} J</text>
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('ve.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
