<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/capacitors. params: C (µF), V (volts). Two plates, gap between them shown constant;
// the density of +/- marks on each plate scales with Q, and the field-line count/brightness scales
// with V. A "flash" glow pulses brighter as stored energy E rises, echoing the camera-flash example.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PLATE_X0 = 300
const PLATE_X1 = 500
const TOP_Y = 140
const BOT_Y = 340

const capF = computed(() => Math.max(props.params.C ?? 150, 0.1))
const voltage = computed(() => Math.max(props.params.V ?? 300, 0.1))
const charge = computed(() => capF.value * 1e-6 * voltage.value)
const energy = computed(() => 0.5 * capF.value * 1e-6 * voltage.value ** 2)

const chargeMarks = computed(() => Math.max(4, Math.min(22, Math.round((charge.value / 0.5) * 22))))
const fieldLines = computed(() => Math.max(3, Math.min(10, Math.round((voltage.value / 400) * 10))))
const flashOpacity = computed(() => Math.min(1, energy.value / 60))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const frac = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width))
  emit('set', 'V', 400 * frac)
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

let raf = 0
const pulse = ref(0)
function tick(now: number) {
  pulse.value = (Math.sin(now / 260) + 1) / 2
  raf = requestAnimationFrame(tick)
}
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: 'C', value: `${fmt(capF.value)} µF` },
  { label: 'V', value: `${fmt(voltage.value)} V` },
  { label: 'Q = CV', value: `${fmt(charge.value * 1000, 2)} mC`, color: 'var(--accent-2)' },
  { label: 'E = ½CV²', value: `${fmt(energy.value, 3)} J`, color: 'var(--accent)' },
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
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('cap.hint') }}</text>

      <!-- flash glow behind the plates -->
      <circle :cx="(PLATE_X0 + PLATE_X1) / 2" :cy="(TOP_Y + BOT_Y) / 2" :r="120 + pulse * 10" fill="var(--accent)" :opacity="flashOpacity * (0.15 + pulse * 0.15)" />

      <!-- top plate (+) -->
      <rect :x="PLATE_X0" :y="TOP_Y - 8" :width="PLATE_X1 - PLATE_X0" height="8" fill="var(--fg)" />
      <text v-for="i in chargeMarks" :key="'p' + i" :x="PLATE_X0 + ((i - 0.5) / chargeMarks) * (PLATE_X1 - PLATE_X0)" :y="TOP_Y - 16" text-anchor="middle" font-size="14" fill="var(--pos)">+</text>

      <!-- bottom plate (-) -->
      <rect :x="PLATE_X0" :y="BOT_Y" :width="PLATE_X1 - PLATE_X0" height="8" fill="var(--fg)" />
      <text v-for="i in chargeMarks" :key="'n' + i" :x="PLATE_X0 + ((i - 0.5) / chargeMarks) * (PLATE_X1 - PLATE_X0)" :y="BOT_Y + 28" text-anchor="middle" font-size="14" fill="var(--neg)">−</text>

      <!-- field lines between plates -->
      <line
        v-for="i in fieldLines"
        :key="'f' + i"
        :x1="PLATE_X0 + ((i - 0.5) / fieldLines) * (PLATE_X1 - PLATE_X0)"
        :y1="TOP_Y"
        :x2="PLATE_X0 + ((i - 0.5) / fieldLines) * (PLATE_X1 - PLATE_X0)"
        :y2="BOT_Y"
        stroke="var(--accent)"
        stroke-width="1.5"
        marker-end="url(#capArrow)"
      />
      <defs>
        <marker id="capArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>

      <text :x="(PLATE_X0 + PLATE_X1) / 2" :y="TOP_Y - 40" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">V = {{ fmt(voltage) }} V</text>

      <g transform="translate(560, 150)">
        <rect x="0" y="0" width="200" height="110" rx="8" fill="var(--panel)" stroke="var(--line)" />
        <text x="14" y="24" font-size="11" fill="var(--muted)">{{ t('cap.storedLabel') }}</text>
        <text class="num" x="14" y="52" font-size="18" fill="var(--accent-2)">Q = {{ fmt(charge * 1000, 2) }} mC</text>
        <text class="num" x="14" y="80" font-size="18" fill="var(--accent)">E = {{ fmt(energy, 3) }} J</text>
        <text x="14" y="100" font-size="10" fill="var(--muted)">{{ t('cap.flashNote') }}</text>
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('cap.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
