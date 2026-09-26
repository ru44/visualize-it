<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/generators-and-ac. params: N, B, A, rpm, t. f = rpm/60, Vpeak = N*B*A*2*pi*f,
// v(t) = Vpeak*sin(2*pi*f*t). The wave on the right is auto-scaled to +-Vpeak (which spans volts to
// kilovolts across presets); the small schematic on the left shows the coil at its matching angle
// 2*pi*f*t, and a lamp whose brightness follows |v(t)|/Vpeak.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const X0 = 80
const X1 = 730
const Y0 = 380
const AMP_PX = 130
const T_MAX = 0.1

const N = computed(() => Math.max(props.params.N ?? 100, 1))
const B = computed(() => Math.max(props.params.B ?? 0.5, 0))
const A = computed(() => Math.max(props.params.A ?? 0.05, 0))
const rpm = computed(() => Math.max(props.params.rpm ?? 3000, 1))
const time = computed(() => props.params.t ?? 0.02)

const f = computed(() => rpm.value / 60)
const Vpeak = computed(() => N.value * B.value * A.value * 2 * Math.PI * f.value)
const v = computed(() => Vpeak.value * Math.sin(2 * Math.PI * f.value * time.value))
const phi = computed(() => (2 * Math.PI * f.value * time.value) % (2 * Math.PI))

const timeToX = (tt: number) => X0 + (tt / T_MAX) * (X1 - X0)
const vToY = (vv: number) => Y0 - (Vpeak.value > 0 ? vv / Vpeak.value : 0) * AMP_PX

const wavePath = computed(() => {
  const N_SAMPLES = 220
  let d = ''
  for (let i = 0; i <= N_SAMPLES; i++) {
    const tt = (i / N_SAMPLES) * T_MAX
    const vv = Vpeak.value * Math.sin(2 * Math.PI * f.value * tt)
    const x = timeToX(tt)
    const y = vToY(vv)
    d += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1)
  }
  return d
})

const markerX = computed(() => timeToX(time.value))
const markerY = computed(() => vToY(v.value))

// --- drag along the wave to set t ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const tt = ((px - X0) / (X1 - X0)) * T_MAX
  emit('set', 't', Math.min(T_MAX, Math.max(0, tt)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

// --- schematic (top-left): coil at angle phi, slip rings, a lamp brightness ~ |v|/Vpeak ---
const SC_CX = 155
const SC_CY = 110
const SC_R = 46
const outward = computed(() => v.value >= 0)
const coilEnd1 = computed(() => ({ x: SC_CX + SC_R * Math.cos(phi.value), y: SC_CY - SC_R * Math.sin(phi.value) }))
const coilEnd2 = computed(() => ({ x: SC_CX - SC_R * Math.cos(phi.value), y: SC_CY + SC_R * Math.sin(phi.value) }))
const lampFrac = computed(() => (Vpeak.value > 0 ? Math.abs(v.value) / Vpeak.value : 0))

const readouts = computed(() => [
  { label: 'f = rpm/60', value: `${fmt(f.value, 3)} Hz` },
  { label: 'V_peak', value: `${fmt(Vpeak.value, 4)} V`, color: 'var(--accent-2)' },
  { label: 'v(t)', value: `${fmt(v.value, 4)} V`, color: 'var(--accent)' },
  { label: 't', value: `${fmt(time.value * 1000, 3)} ms` },
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
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('gac.hint') }}</text>

      <!-- schematic -->
      <g>
        <rect :x="SC_CX - SC_R - 44" :y="SC_CY - 34" width="26" height="68" rx="4" fill="var(--neg)" />
        <rect :x="SC_CX + SC_R + 18" :y="SC_CY - 34" width="26" height="68" rx="4" fill="var(--accent)" />
        <line :x1="coilEnd1.x" :y1="coilEnd1.y" :x2="coilEnd2.x" :y2="coilEnd2.y" stroke="var(--muted)" stroke-width="3" />
        <circle :cx="coilEnd1.x" :cy="coilEnd1.y" r="8" :fill="outward ? 'var(--accent-2)' : 'var(--accent)'" />
        <circle :cx="coilEnd2.x" :cy="coilEnd2.y" r="8" :fill="outward ? 'var(--accent)' : 'var(--accent-2)'" />
        <!-- slip rings + brushes -->
        <rect :x="SC_CX - 10" :y="SC_CY + SC_R + 6" width="20" height="10" rx="3" fill="var(--muted)" />
        <rect :x="SC_CX - 10" :y="SC_CY + SC_R + 20" width="20" height="10" rx="3" fill="var(--muted)" />
        <line :x1="SC_CX" :y1="SC_CY" :x2="SC_CX" :y2="SC_CY + SC_R + 11" stroke="var(--muted)" stroke-width="2" />
        <!-- lamp -->
        <line :x1="SC_CX + 24" :y1="SC_CY + SC_R + 25" :x2="290" :y2="SC_CY + SC_R + 25" stroke="var(--line)" stroke-width="2" />
        <line :x1="SC_CX - 24" :y1="SC_CY + SC_R + 11" :x2="290" :y2="SC_CY + SC_R + 11" stroke="var(--line)" stroke-width="2" />
        <line :x1="290" :y1="SC_CY + SC_R + 11" :x2="290" :y2="SC_CY + SC_R + 25" stroke="var(--line)" stroke-width="2" />
        <circle cx="290" :cy="SC_CY + SC_R + 18" r="16" fill="var(--sunken)" stroke="var(--line)" />
        <circle cx="290" :cy="SC_CY + SC_R + 18" r="16" fill="var(--accent-2)" :fill-opacity="lampFrac" />
        <text :x="SC_CX" y="196" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('gac.schematicCaption') }}</text>
      </g>

      <!-- wave -->
      <line :x1="X0" :y1="Y0" :x2="X1" :y2="Y0" stroke="var(--line)" stroke-width="1.5" />
      <line :x1="X0" :y1="Y0 - AMP_PX" :x2="X1" :y2="Y0 - AMP_PX" stroke="var(--grid)" stroke-width="1" stroke-dasharray="3 5" />
      <line :x1="X0" :y1="Y0 + AMP_PX" :x2="X1" :y2="Y0 + AMP_PX" stroke="var(--grid)" stroke-width="1" stroke-dasharray="3 5" />
      <text :x="X1 + 4" :y="Y0 - AMP_PX + 4" font-size="11" fill="var(--muted)">+V_peak</text>
      <text :x="X1 + 4" :y="Y0 + AMP_PX + 4" font-size="11" fill="var(--muted)">-V_peak</text>
      <path :d="wavePath" fill="none" stroke="var(--accent)" stroke-width="2.4" />
      <line :x1="markerX" :y1="Y0 - AMP_PX - 10" :x2="markerX" :y2="Y0 + AMP_PX + 10" stroke="var(--muted)" stroke-width="1" stroke-dasharray="2 4" />
      <circle :cx="markerX" :cy="markerY" r="6" fill="var(--fg)" />
      <text :x="(X0 + X1) / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">t (s), 0 to 0.1</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
