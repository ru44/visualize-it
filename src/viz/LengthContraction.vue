<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A light clock ticks once per round trip of a photon between two mirrors. Send the clock past at speed v and,
// seen from the platform, its own tick takes gamma times longer (time dilation) — a rod carried alongside it
// must then measure gamma times shorter along the direction of travel, or the two frames would disagree about
// when the photon arrives. params v (fraction of c, 0..0.99), L0 (proper length of the rod, metres).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const C = 299792.458 // km/s

const v = computed(() => Math.max(0, Math.min(0.999, props.params.v ?? 0.6)))
const L0 = computed(() => Math.max(0.5, props.params.L0 ?? 10))
const gamma = computed(() => 1 / Math.sqrt(Math.max(1e-6, 1 - v.value * v.value)))
const L = computed(() => L0.value / gamma.value)

const SCALE = 32 // px per metre
const ROD_X = 90
const restY = 130
const movY = 340

const phase = ref(0)
let raf = 0
let last = 0
function tick(now: number) { phase.value += Math.min(now - last, 50) / 1000; last = now; raf = requestAnimationFrame(tick) }
onMounted(() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
const tri = (rate: number) => { const f = (phase.value * rate) % 1; return Math.abs(1 - 2 * f) }
const restFrac = computed(() => tri(0.7))
const movFrac = computed(() => tri(0.7 / gamma.value))

const clockD = 64
function clockPhoton(cy: number, frac: number) { return cy - clockD / 2 + frac * clockD }

const readouts = computed(() => [
  { label: t('lc.v'), value: `${fmt(v.value * 100, 1)} % c (${fmt(v.value * C, 0)} km/s)`, color: 'var(--accent)' },
  { label: t('lc.gamma'), value: fmt(gamma.value, 3), color: 'var(--accent-2)' },
  { label: t('lc.l0'), value: `${fmt(L0.value, 1)} m` },
  { label: t('lc.l'), value: `${fmt(L.value, 2)} m`, color: 'var(--pos)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('lc.hint') }}</text>

      <!-- two light clocks: at rest, and carried on the moving rod -->
      <g transform="translate(620, 60)">
        <text class="num" x="0" y="-8" font-size="11" fill="var(--muted)">{{ t('lc.restClock') }}</text>
        <line x1="0" y1="0" x2="60" y2="0" stroke="var(--line)" stroke-width="3" />
        <line :x1="0" :y1="clockD" :x2="60" :y2="clockD" stroke="var(--line)" stroke-width="3" />
        <circle cx="30" :cy="clockPhoton(clockD / 2, restFrac)" r="6" fill="var(--accent)" />
      </g>
      <g transform="translate(620, 200)">
        <text class="num" x="0" y="-8" font-size="11" fill="var(--muted)">{{ t('lc.movClock') }}</text>
        <line x1="0" y1="0" x2="60" y2="0" stroke="var(--line)" stroke-width="3" />
        <line :x1="0" :y1="clockD" :x2="60" :y2="clockD" stroke="var(--line)" stroke-width="3" />
        <circle cx="30" :cy="clockPhoton(clockD / 2, movFrac)" r="6" fill="var(--accent-2)" />
      </g>
      <text class="num" x="620" y="340" font-size="11" fill="var(--muted)">{{ t('lc.slowerHint') }}</text>

      <!-- rest-frame rod -->
      <text class="num" :x="ROD_X" :y="restY - 20" font-size="12" fill="var(--muted)">{{ t('lc.atRest') }}</text>
      <rect :x="ROD_X" :y="restY" :width="L0 * SCALE" height="34" rx="6" fill="var(--accent)" />
      <text class="num" :x="ROD_X + (L0 * SCALE) / 2" :y="restY + 22" text-anchor="middle" font-size="13" fill="#fff">{{ fmt(L0, 1) }} m</text>

      <!-- moving-frame rod, contracted -->
      <text class="num" :x="ROD_X" :y="movY - 20" font-size="12" fill="var(--muted)">{{ t('lc.passing') }}</text>
      <rect :x="ROD_X" :y="movY" :width="L * SCALE" height="34" rx="6" fill="var(--pos)" />
      <text class="num" :x="ROD_X + (L * SCALE) / 2" :y="movY + 22" text-anchor="middle" font-size="13" fill="#fff">{{ fmt(L, 2) }} m</text>
      <line :x1="ROD_X + L0 * SCALE" :x2="ROD_X + L0 * SCALE" :y1="restY - 8" :y2="movY + 42" stroke="var(--line)" stroke-dasharray="4 3" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
