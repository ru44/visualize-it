<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A gain medium between two mirrors. Pump enough atoms into the excited state (population inversion
// ΔN > 0) and each pass through the medium multiplies the light instead of absorbing it: G = e^(g0·ΔN·p).
// Only photons bouncing exactly along the cavity axis get copied every pass, so what leaks out through
// the output mirror is one narrow beam of one colour — everything else escapes sideways, unamplified.
// params eta (pump fraction 0..1), p (cavity passes).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const G0 = 0.35
const eta = computed(() => props.params.eta ?? 0.5)
const passes = computed(() => Math.max(1, Math.round(props.params.p ?? 5)))
const dN = computed(() => 2 * eta.value - 1)
const gain = computed(() => Math.exp(G0 * dN.value * passes.value))

const N_ATOMS = 24
const atoms = computed(() => {
  const excited = Math.round(eta.value * N_ATOMS)
  return Array.from({ length: N_ATOMS }, (_, i) => {
    const col = i % 8
    const row = Math.floor(i / 8)
    return { x: 220 + col * 50, y: 170 + row * 60, excited: i < excited }
  })
})

const bars = computed(() => Array.from({ length: passes.value + 1 }, (_, k) => {
  const val = Math.exp(G0 * dN.value * k)
  return { x: 210 + k * (380 / Math.max(1, passes.value)), h: Math.max(-140, Math.min(140, 35 * Math.log(val))), val }
}))

const beamWidth = computed(() => Math.max(2, Math.min(28, 2 + 6 * Math.log2(1 + gain.value))))
const beamOpacity = computed(() => Math.max(0.15, Math.min(1, gain.value / 8)))

const SPONT_ANGLES = [15, 60, 115, 195, 245, 300]
const spont = SPONT_ANGLES.map((deg) => {
  const r = (deg * Math.PI) / 180
  return { x1: 400 + Math.cos(r) * 70, y1: 230 + Math.sin(r) * 70, x2: 400 + Math.cos(r) * 105, y2: 230 + Math.sin(r) * 105 }
})

const readouts = computed(() => [
  { label: t('las.amplification'), value: '×' + fmt(gain.value, 2), color: gain.value >= 1 ? 'var(--pos)' : 'var(--neg)' },
  { label: t('las.inversion'), value: fmt(dN.value, 2) },
  { label: t('las.pump'), value: fmt(eta.value * 100, 0) + ' %' },
  { label: t('las.passes'), value: String(passes.value) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('las.hint') }}</text>

      <!-- mirrors -->
      <line x1="140" y1="80" x2="140" y2="380" stroke="var(--fg)" stroke-width="6" />
      <text class="num" x="140" y="400" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('las.mirror1') }}</text>
      <line x1="660" y1="80" x2="660" y2="380" stroke="var(--muted)" stroke-width="4" stroke-dasharray="10 6" />
      <text class="num" x="660" y="400" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('las.mirror2') }}</text>

      <!-- gain medium with the population -->
      <rect x="200" y="140" width="400" height="180" fill="var(--sunken)" stroke="var(--line)" />
      <text class="num" x="400" y="128" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('las.medium') }}</text>
      <circle v-for="(a, i) in atoms" :key="i" :cx="a.x" :cy="a.y" r="10" :fill="a.excited ? 'var(--accent)' : 'var(--muted)'" :fill-opacity="a.excited ? 0.9 : 0.4" />

      <!-- spontaneous emission: unamplified, every direction -->
      <line v-for="(s, i) in spont" :key="i" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" stroke="var(--neg)" stroke-width="1.5" stroke-opacity="0.5" />
      <text class="num" x="400" y="470" text-anchor="middle" font-size="10" fill="var(--neg)">{{ t('las.spontaneous') }}</text>

      <!-- amplification ladder, one bar per pass -->
      <g transform="translate(0, 355)">
        <line x1="200" y1="0" x2="600" y2="0" stroke="var(--line)" />
        <rect v-for="(bar, i) in bars" :key="i" :x="bar.x - 10" :y="bar.h < 0 ? 0 : -bar.h" width="20" :height="Math.abs(bar.h)" :fill="bar.val >= 1 ? 'var(--pos)' : 'var(--neg)'" fill-opacity="0.75" />
      </g>

      <!-- output beam: one colour, one direction -->
      <line x1="660" y1="230" x2="770" y2="230" stroke="var(--accent)" :stroke-width="beamWidth" :stroke-opacity="beamOpacity" stroke-linecap="round" />
      <text class="num" x="715" y="200" text-anchor="middle" font-size="10" fill="var(--accent)">{{ t('las.output') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
