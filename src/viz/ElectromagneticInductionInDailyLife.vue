<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/electromagnetic-induction-in-daily-life. params: B (T), A (m^2), f (Hz), R (ohm).
// eps_rms = A*B*2*pi*f/sqrt(2); P = eps_rms^2 / R. A driver coil above a target loop shows the same
// physics as an induction hob, wireless charger or metal detector, differing only in f and R; the
// meter is log-scaled since P spans microwatts to hundreds of watts across presets.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480

const B = computed(() => Math.max(props.params.B ?? 0.005, 0))
const A = computed(() => Math.max(props.params.A ?? 0.0003, 0))
const f = computed(() => Math.max(props.params.f ?? 25000, 1))
const R = computed(() => Math.max(props.params.R ?? 0.0001, 1e-9))

const epsPeak = computed(() => A.value * B.value * 2 * Math.PI * f.value)
const epsRms = computed(() => epsPeak.value / Math.SQRT2)
const P = computed(() => (epsRms.value * epsRms.value) / R.value)

// --- log-scale power meter, 1e-6 W to 1e7 W ---
const M_X0 = 90
const M_X1 = 710
const LOG_MIN = -6
const LOG_MAX = 7
const logP = computed(() => Math.min(LOG_MAX, Math.max(LOG_MIN, Math.log10(Math.max(1e-9, P.value)))))
const meterX = computed(() => M_X0 + ((logP.value - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (M_X1 - M_X0))
const heating = computed(() => P.value > 20) // above ~20 W, this reads as "heating" rather than "signal"

// --- drag the meter to set f on a log scale ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const frac = Math.min(1, Math.max(0, (px - M_X0) / (M_X1 - M_X0)))
  const newF = 1000 * Math.pow(200, frac)
  emit('set', 'f', Math.min(200000, Math.max(1000, newF)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

// --- schematic: driver coil above a target loop, eddy-current arrow scaled by induced current ---
const CX = 400
const targetSize = computed(() => 30 + 60 * Math.sqrt(A.value / 0.002))
const eddyOpacity = computed(() => Math.min(1, 0.2 + Math.abs(epsRms.value) * 2))

const readouts = computed(() => [
  { label: 'f', value: `${fmt(f.value / 1000, 4)} kHz` },
  { label: 'ε_rms', value: `${epsRms.value < 0.01 ? epsRms.value.toExponential(2) : fmt(epsRms.value, 4)} V`, color: 'var(--accent)' },
  { label: 'P = ε²/R', value: `${P.value < 0.01 || P.value > 1e5 ? P.value.toExponential(2) : fmt(P.value, 4)} W`, color: heating.value ? 'var(--neg)' : 'var(--accent-2)' },
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
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('eid.hint') }}</text>

      <!-- driver coil -->
      <g>
        <ellipse v-for="i in 4" :key="'c' + i" :cx="CX" :cy="90 + i * 9" rx="46" ry="10" fill="none" stroke="var(--accent)" stroke-width="3" />
        <text :x="CX" y="60" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('eid.coil') }}</text>
      </g>

      <!-- field lines -->
      <g stroke="var(--muted)" stroke-width="1.3" stroke-dasharray="3 5">
        <line :x1="CX - 40" y1="130" :x2="CX - 40" y2="210" />
        <line :x1="CX" y1="132" :x2="CX" y2="210" />
        <line :x1="CX + 40" y1="130" :x2="CX + 40" y2="210" />
      </g>

      <!-- target conductor with induced eddy current -->
      <g>
        <rect :x="CX - targetSize" y="210" :width="targetSize * 2" height="34" rx="6" fill="var(--sunken)" stroke="var(--line)" stroke-width="2" />
        <path :d="`M${CX - targetSize * 0.5},227 A${targetSize * 0.5},10 0 1 1 ${CX + targetSize * 0.5},227`" fill="none" :stroke="heating ? 'var(--neg)' : 'var(--accent-2)'" stroke-width="3" :stroke-opacity="eddyOpacity" marker-end="url(#eidArrow)" />
        <defs>
          <marker id="eidArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" :fill="heating ? 'var(--neg)' : 'var(--accent-2)'" />
          </marker>
        </defs>
        <text :x="CX" y="262" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('eid.target') }}</text>
      </g>

      <!-- power meter, log scale -->
      <text :x="W / 2" y="320" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('eid.meterLabel') }}</text>
      <rect :x="M_X0" y="335" :width="M_X1 - M_X0" height="18" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="M_X0" y="335" :width="Math.max(0, meterX - M_X0)" height="18" rx="4" :fill="heating ? 'var(--neg)' : 'var(--accent-2)'" />
      <circle :cx="meterX" cy="344" r="9" fill="var(--fg)" style="cursor: ew-resize" />
      <text :x="M_X0" y="382" font-size="11" fill="var(--muted)">1 µW</text>
      <text :x="M_X1" y="382" text-anchor="end" font-size="11" fill="var(--muted)">10 MW</text>
      <text :x="W / 2" y="420" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">P ≈ {{ P < 0.01 || P > 1e5 ? P.toExponential(2) : fmt(P, 4) }} W</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
