<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A spacetime diagram: distance x (light-years) across, time ct (years) up. Earth's worldline runs
// straight up the middle; the traveler's worldline goes out to the star and back, bending sharply at
// the turnaround — the one non-inertial event that breaks the twins' symmetry. Tick marks along each
// worldline count that traveler's own elapsed years, spaced by γ along the ship's line.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const X0 = 110
const Y0 = 430
const PLOT_W = W - X0 - 50
const PLOT_H = Y0 - 50

const v = computed(() => Math.min(0.999, Math.max(0.01, props.params.v ?? 0.8)))
const D = computed(() => Math.max(0.1, props.params.D ?? 4.24))
const gamma = computed(() => 1 / Math.sqrt(1 - v.value * v.value))
const Tout = computed(() => D.value / v.value) // years, Earth-frame time to reach the star
const T = computed(() => 2 * Tout.value) // years, Earth-frame round trip
const tau = computed(() => T.value / gamma.value) // years, traveler's own elapsed time
const diff = computed(() => T.value - tau.value)

const S = computed(() => Math.min(PLOT_W / (1.3 * D.value + 1), PLOT_H / (1.3 * T.value + 1)))
const px = (x: number) => X0 + x * S.value
const py = (yr: number) => Y0 - yr * S.value

const earthTop = computed(() => ({ x: px(0), y: py(T.value) }))
const turn = computed(() => ({ x: px(D.value), y: py(Tout.value) }))
const home = computed(() => ({ x: px(0), y: py(T.value) }))
const lightEnd = computed(() => ({ x: px(D.value), y: py(D.value) }))

const earthTicks = computed(() => {
  const step = Math.max(1, Math.ceil(T.value / 11))
  const out: { x: number; y: number; n: number }[] = []
  for (let n = step; n <= T.value + 1e-6; n += step) out.push({ x: px(0), y: py(n), n })
  return out
})

const travelerTicks = computed(() => {
  const g = gamma.value
  const out: { x: number; y: number; n: number }[] = []
  // outbound leg: coordinate time n = γ, 2γ, … up to Tout, each the traveler's own n/γ proper years
  let n = g
  while (n <= Tout.value + 1e-6) {
    out.push({ x: px((n / Tout.value) * D.value), y: py(n), n: Math.round((n / g) * 10) / 10 })
    n += g
  }
  // inbound leg: continue at the same γ spacing of coordinate time, from where outbound left off to T
  for (let tYear = n; tYear <= T.value + 1e-6; tYear += g) {
    const f = (tYear - Tout.value) / Tout.value
    out.push({ x: px(D.value - f * D.value), y: py(tYear), n: Math.round((tYear / g) * 10) / 10 })
  }
  return out
})

const readouts = computed(() => [
  { label: 'v', value: `${fmt(v.value, 3)} c`, color: 'var(--accent)' },
  { label: 'γ', value: fmt(gamma.value, 3), color: 'var(--accent-2)' },
  { label: t('twin.earth'), value: `${fmt(T.value, 2)} yr` },
  { label: t('twin.traveler'), value: `${fmt(tau.value, 2)} yr`, color: 'var(--pos)' },
  { label: t('twin.diff'), value: `${fmt(diff.value, 2)} yr`, color: 'var(--neg)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('twin.hint') }}</text>

      <line :x1="X0" :x2="X0" y1="440" y2="40" stroke="var(--line)" stroke-width="1.5" />
      <line :x1="X0" :x2="W - 30" :y1="Y0" :y2="Y0" stroke="var(--line)" stroke-width="1.5" />
      <text class="num" :x="X0 - 8" y="30" text-anchor="end" font-size="11" fill="var(--muted)">ct ({{ t('twin.years') }})</text>
      <text class="num" :x="W - 30" :y="Y0 + 18" text-anchor="end" font-size="11" fill="var(--muted)">x ({{ t('twin.lightyears') }})</text>

      <!-- light reference -->
      <line :x1="X0" :y1="Y0" :x2="lightEnd.x" :y2="lightEnd.y" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />
      <text class="num" :x="lightEnd.x + 6" :y="lightEnd.y" font-size="10" fill="var(--muted)">{{ t('twin.lightPath') }}</text>

      <!-- Earth worldline -->
      <line :x1="X0" :y1="Y0" :x2="earthTop.x" :y2="earthTop.y" stroke="var(--fg)" stroke-width="3" />
      <circle v-for="(tk, i) in earthTicks" :key="'e' + i" :cx="tk.x" :cy="tk.y" r="2.6" fill="var(--fg)" />
      <text class="num" :x="X0 + 8" y="415" font-size="11" fill="var(--fg)" font-weight="600">{{ t('twin.earth') }}</text>

      <!-- traveler worldline -->
      <polyline :points="`${X0},${Y0} ${turn.x},${turn.y} ${home.x},${home.y}`" fill="none" stroke="var(--accent)" stroke-width="3" />
      <circle v-for="(tk, i) in travelerTicks" :key="'t' + i" :cx="tk.x" :cy="tk.y" r="2.6" fill="var(--accent)" />
      <circle :cx="turn.x" :cy="turn.y" r="6" fill="var(--accent-2)" />
      <text class="num" :x="turn.x + 8" :y="turn.y - 8" font-size="11" fill="var(--accent-2)" font-weight="600">{{ t('twin.turnaround') }}</text>
      <text class="num" :x="home.x - 8" :y="home.y - 10" text-anchor="end" font-size="11" fill="var(--accent)" font-weight="600">{{ t('twin.traveler') }}</text>

      <text class="num" :x="(X0 + W - 30) / 2" y="465" text-anchor="middle" font-size="12" fill="var(--fg)">
        {{ t('twin.earth') }}: {{ fmt(T, 2) }} {{ t('twin.years') }} — {{ t('twin.traveler') }}: {{ fmt(tau, 2) }} {{ t('twin.years') }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
