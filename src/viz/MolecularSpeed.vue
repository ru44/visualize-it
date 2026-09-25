<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Temperature as molecular motion. params T (K), M (molar mass, kg/mol). A thermometer on the left shows
// T on the Kelvin/Celsius scale; a box of particles on the right jiggles faster as T rises, with each
// particle's streak length showing v_rms = sqrt(3RT/M) — same formula the "Formal" section derives.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const R_GAS = 8.314
const KB = 1.380649e-23

const T = computed(() => Math.max(1, props.params.T ?? 293))
const M = computed(() => Math.max(0.001, props.params.M ?? 0.029))
const vrms = computed(() => Math.sqrt((3 * R_GAS * T.value) / M.value))
const ke = computed(() => 1.5 * KB * T.value)
const celsius = computed(() => T.value - 273.15)

// Thermometer: 1 K to 1000 K mapped onto a vertical tube.
const TUBE = { x: 90, top: 70, bottom: 420, w: 26 }
const frac = computed(() => Math.min(1, Math.max(0, (T.value - 1) / 999)))
const fillY = computed(() => TUBE.bottom - frac.value * (TUBE.bottom - TUBE.top))
// 273 K and 293 K sit only 20 K apart on a 1–1000 K scale, so their labels are nudged apart (dy) to
// keep them legible instead of overlapping.
const ticks = [
  { k: 1, label: 'kin.absZero', dy: 0 },
  { k: 273, label: 'kin.ice', dy: 7 },
  { k: 293, label: 'kin.room', dy: -7 },
  { k: 373, label: 'kin.boil', dy: 0 },
] as const

// Particle box: deterministic jittered positions, streak length ∝ vrms (capped for legibility).
const BOX = { x: 220, y: 70, w: 520, h: 340 }
const N = 24
const streak = computed(() => Math.min(70, 6 + vrms.value * 0.11))
const dots = computed(() =>
  Array.from({ length: N }, (_, i) => {
    const seed = i * 137.5
    const px = BOX.x + 30 + ((Math.sin(seed) * 0.5 + 0.5) * (BOX.w - 60))
    const py = BOX.y + 30 + ((Math.cos(seed * 1.3) * 0.5 + 0.5) * (BOX.h - 60))
    const ang = Math.sin(seed * 2.1) * Math.PI
    return { x: px, y: py, dx: Math.cos(ang) * streak.value, dy: Math.sin(ang) * streak.value }
  }),
)

const readouts = computed(() => [
  { label: 'T', value: `${fmt(T.value, 0)} K`, color: 'var(--accent-2)' },
  { label: '°C', value: fmt(celsius.value, 1) },
  { label: t('kin.vrms'), value: `${fmt(vrms.value, 0)} m/s`, color: 'var(--accent)' },
  { label: t('kin.ke'), value: `${ke.value.toExponential(2)} J` },
  { label: 'M', value: `${fmt(M.value * 1000, 1)} g/mol` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('kin.hint') }}</text>

      <!-- thermometer -->
      <rect :x="TUBE.x - TUBE.w / 2" :y="TUBE.top" :width="TUBE.w" :height="TUBE.bottom - TUBE.top" rx="13" fill="none" stroke="var(--line)" stroke-width="2" />
      <rect :x="TUBE.x - TUBE.w / 2 + 3" :y="fillY" :width="TUBE.w - 6" :height="TUBE.bottom - fillY - 3" rx="10" fill="var(--accent-2)" />
      <circle :cx="TUBE.x" :cy="TUBE.bottom + 16" r="20" fill="var(--accent-2)" />
      <g v-for="tk in ticks" :key="tk.k">
        <line :x1="TUBE.x + TUBE.w / 2" :x2="TUBE.x + TUBE.w / 2 + 8" :y1="TUBE.bottom - ((tk.k - 1) / 999) * (TUBE.bottom - TUBE.top)" :y2="TUBE.bottom - ((tk.k - 1) / 999) * (TUBE.bottom - TUBE.top)" stroke="var(--muted)" />
        <text class="num" :x="TUBE.x + TUBE.w / 2 + 12" :y="TUBE.bottom - ((tk.k - 1) / 999) * (TUBE.bottom - TUBE.top) + 4 + tk.dy" font-size="10" fill="var(--muted)">{{ t(tk.label) }} ({{ tk.k }} K)</text>
      </g>

      <!-- particle box -->
      <rect :x="BOX.x" :y="BOX.y" :width="BOX.w" :height="BOX.h" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <g v-for="(d, i) in dots" :key="i">
        <line :x1="d.x - d.dx / 2" :y1="d.y - d.dy / 2" :x2="d.x + d.dx / 2" :y2="d.y + d.dy / 2" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
        <circle :cx="d.x + d.dx / 2" :cy="d.y + d.dy / 2" r="4" fill="var(--accent)" />
      </g>
      <text class="num" :x="BOX.x + BOX.w / 2" :y="BOX.y + BOX.h + 22" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('kin.vrms') }} ≈ {{ fmt(vrms, 0) }} m/s</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
