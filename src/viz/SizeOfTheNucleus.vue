<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Rutherford's gold-foil experiment. A beam of alpha particles (charge z=2) is fired at a gold nucleus
// (Z=79); the impact parameter b (how far off-centre each one is aimed) and its kinetic energy E decide
// the scattering angle θ = 2·arctan(Zze²/(8πε₀Eb)). A backdrop of fixed rays at many aims shows most
// pass nearly straight through; the bright ray follows the two sliders exactly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const Z_GOLD = 79
const Z_ALPHA = 2
const E_CHARGE = 1.602176634e-19
const EPS0 = 8.8541878128e-12
const K = (Z_GOLD * Z_ALPHA * E_CHARGE * E_CHARGE) / (8 * Math.PI * EPS0) // J·m

const b = computed(() => Math.max(1, Math.min(300, props.params.b ?? 20)))
const E = computed(() => Math.max(1, Math.min(10, props.params.E ?? 5)))

function thetaDeg(bFm: number, eMeV: number): number {
  const eJ = eMeV * 1.602176634e-13
  const bM = bFm * 1e-15
  return ((2 * Math.atan(K / (eJ * bM))) * 180) / Math.PI
}
const theta = computed(() => thetaDeg(b.value, E.value))
// Head-on (b→0) closest approach: all kinetic energy converts to Coulomb PE, E = 2K/r, so r = 2K/E.
const closestApproachFm = computed(() => (2 * K) / (E.value * 1.602176634e-13) / 1e-15)

const W = 800
const H = 480
const NX = 90 // pixels from left edge to the nucleus
const CX = 360
const CY = 240
const OUT = 260 // outgoing segment length

// b runs up to 300 fm but the canvas is only 480 px tall, so the on-screen offset is compressed with a
// square root while the angle itself always uses the true, uncompressed b — the physics never bends.
function displayOffset(bFm: number): number {
  const mag = Math.min(Math.abs(bFm), 300)
  return Math.sign(bFm) * (18 + 150 * Math.sqrt(mag / 300))
}

function track(bFmSigned: number, deg: number) {
  const off = displayOffset(bFmSigned)
  const y0 = CY - off
  const rad = (deg * Math.PI) / 180
  const sign = bFmSigned >= 0 ? -1 : 1 // repelled away from the axis it approached on
  const kinkX = CX - (18 + 0.35 * Math.abs(off))
  const x2 = kinkX + Math.cos(rad) * OUT
  const y2 = y0 + sign * Math.sin(rad) * OUT
  return `M${NX},${y0.toFixed(1)} L${kinkX.toFixed(1)},${y0.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`
}

const backdrop = computed(() => {
  const offsets = [-190, -150, -115, -85, -60, -40, -22, 22, 40, 60, 85, 115, 150, 190]
  return offsets.map((o) => track(o, thetaDeg(Math.abs(o), E.value)))
})
const highlight = computed(() => track(b.value, theta.value))

const readouts = computed(() => [
  { label: t('ruther.b'), value: `${fmt(b.value, 0)} fm` },
  { label: t('ruther.E'), value: `${fmt(E.value, 1)} MeV` },
  { label: t('ruther.theta'), value: `${fmt(theta.value, 1)}°`, color: 'var(--accent-2)' },
  { label: t('ruther.closest'), value: `${fmt(closestApproachFm.value, 1)} fm` },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ruther.hint') }}</text>

      <line :x1="NX" :y1="16" :x2="NX" :y2="H - 16" stroke="var(--line)" stroke-dasharray="2 4" />
      <text class="num" :x="NX" y="H - 6" font-size="10" fill="var(--muted)" text-anchor="middle">{{ t('ruther.foil') }}</text>

      <path v-for="(tr, i) in backdrop" :key="i" :d="tr" fill="none" stroke="var(--muted)" stroke-width="1" stroke-opacity="0.45" />
      <path :d="highlight" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />

      <circle :cx="CX" :cy="CY" r="7" fill="var(--accent)" />
      <text class="num" :x="CX" :y="CY - 14" font-size="11" fill="var(--accent)" text-anchor="middle">{{ t('ruther.nucleusLabel') }}</text>

      <g class="num" font-size="11" fill="var(--muted)">
        <text :x="W - 20" y="440" text-anchor="end">{{ t('ruther.legend') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
