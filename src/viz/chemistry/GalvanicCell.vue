<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRafLoop } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// chemistry/electrochemistry-cells. params E0 (standard potential), n (electrons per transfer),
// x = Q (reaction quotient). Two beakers, a salt bridge, and electrons animated along the wire at
// a speed set by the live Nernst voltage E = E0 − (0.05916/n)·log10(Q). Crowding the product side
// (large Q) pushes the voltage down until the battery dies at equilibrium.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const E0 = computed(() => Math.max(props.params.E0 ?? 1.1, 0.01))
const n = computed(() => Math.min(Math.max(Math.round(props.params.n ?? 2), 1), 3))
const Q = computed(() => Math.max(props.params.x ?? 1, 0.0001))
const logQ = computed(() => Math.log10(Q.value))
const nernst = computed(() => (0.05916 / n.value) * logQ.value)
const E = computed(() => E0.value - nernst.value)
const dead = computed(() => E.value <= 0)

// deterministic "random" ion positions inside each beaker
const rnd = (i: number) => {
  const v = Math.sin(i * 12.9898) * 43758.5453
  return v - Math.floor(v)
}
const prodCount = computed(() => Math.round(10 + logQ.value * 2.8))
const reacCount = computed(() => Math.round(10 - logQ.value * 2.8))
const ions = (count: number, bx: number, seed: number) =>
  Array.from({ length: Math.max(count, 1) }, (_, i) => ({
    x: bx + 16 + rnd(i * 2 + seed) * 128,
    y: 300 + rnd(i * 2 + 1 + seed) * 110,
  }))
const prodIons = computed(() => ions(prodCount.value, 450, 7))
const reacIons = computed(() => ions(reacCount.value, 190, 3))

// --- electrons crawling along the wire, anode → bulb → cathode ---
// wire path: up from anode (250,250→250,120), across (250,120→550,120), down (550,120→550,250)
const PATH = 130 + 300 + 130
const shift = ref(0)
useRafLoop((dt) => {
  shift.value = (shift.value + Math.max(E.value, 0) * 60 * dt) % (PATH / 8)
})
const electronXY = (dist: number) => {
  const s = dist % PATH
  if (s < 130) return { x: 250, y: 250 - s }
  if (s < 430) return { x: 250 + (s - 130), y: 120 }
  return { x: 550, y: 120 + (s - 430) }
}
const electrons = computed(() => Array.from({ length: 8 }, (_, i) => electronXY(i * (PATH / 8) + shift.value)))

const readouts = computed(() => [
  { label: 'E⁰', value: `${fmt(E0.value, 2)} V` },
  { label: 'n', value: String(n.value) },
  { label: 'Q', value: fmt(Q.value, 3), color: 'var(--accent-2)' },
  { label: '(0.05916/n)·log₁₀Q', value: `${fmt(nernst.value, 3)} V` },
  { label: 'E', value: `${fmt(E.value, 3)} V`, color: dead.value ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('cell.hint') }}</text>
      <!-- voltmeter in the middle of the wire -->
      <line x1="250" y1="250" x2="250" y2="120" stroke="var(--line)" stroke-width="3" />
      <line x1="250" y1="120" x2="352" y2="120" stroke="var(--line)" stroke-width="3" />
      <line x1="448" y1="120" x2="550" y2="120" stroke="var(--line)" stroke-width="3" />
      <line x1="550" y1="120" x2="550" y2="250" stroke="var(--line)" stroke-width="3" />
      <circle cx="400" cy="120" r="48" fill="var(--panel)" :stroke="dead ? 'var(--neg)' : 'var(--pos)'" stroke-width="3" />
      <text x="400" y="116" text-anchor="middle" font-size="17" :fill="dead ? 'var(--neg)' : 'var(--pos)'" class="num">{{ fmt(Math.max(E, 0), 2) }} V</text>
      <text x="400" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">{{ dead ? t('cell.dead') : t('cell.volts') }}</text>
      <circle v-for="(el, i) in electrons" :key="i" :cx="el.x" :cy="el.y" r="5" fill="var(--accent)" :opacity="dead ? 0.25 : 1" />
      <text x="285" y="104" font-size="11" fill="var(--accent)">e⁻ →</text>
      <!-- anode beaker (left): metal dissolves, electrons leave -->
      <rect x="170" y="270" width="170" height="160" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="236" y="250" width="28" height="130" rx="4" fill="var(--muted)" />
      <text x="255" y="446" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('cell.anode') }}</text>
      <text x="255" y="464" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('cell.anodeNote') }}</text>
      <circle v-for="(ion, i) in reacIons" :key="'r' + i" :cx="ion.x" :cy="ion.y" r="4" fill="var(--accent)" opacity="0.7" />
      <!-- cathode beaker (right): ions plate onto the metal -->
      <rect x="430" y="270" width="170" height="160" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="536" y="250" width="28" height="130" rx="4" fill="var(--accent-2)" />
      <text x="515" y="446" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('cell.cathode') }}</text>
      <text x="515" y="464" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('cell.cathodeNote') }}</text>
      <circle v-for="(ion, i) in prodIons" :key="'p' + i" :cx="ion.x" :cy="ion.y" r="4" fill="var(--accent-2)" opacity="0.7" />
      <!-- salt bridge keeping both sides neutral -->
      <path d="M330,300 v-14 a55,34 0 0 1 110,0 v14" fill="none" stroke="var(--accent-2)" stroke-width="14" opacity="0.5" />
      <text x="385" y="262" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('cell.bridge') }}</text>
      <!-- crowding note -->
      <text x="660" y="300" font-size="11" fill="var(--fg)">{{ t('cell.qLabel') }}</text>
      <text x="660" y="320" font-size="12" fill="var(--accent-2)" class="num">Q = {{ fmt(Q, 3) }}</text>
      <text x="660" y="344" font-size="10" fill="var(--muted)">{{ t('cell.qNote') }}</text>
      <text :x="W / 2" :y="H - 4" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('cell.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
