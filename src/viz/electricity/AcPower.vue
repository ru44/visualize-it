<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRafLoop } from '../../composables/useAnimationClock'
import { fmt } from '../../engine/math'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// electricity/ac-power. params V0, I0, phi (phase lag of current), and a window [a, b] in seconds.
// Left: the two phasors actually spinning at 50 Hz (slowed), with the lag φ held between them.
// Right: a lamp glowing with the real power ½V0I0cosφ. Below: p(t) with the [a,b] window shaded
// and its numeric average — slide φ toward 90° and watch the lamp starve while volts and amps stay.
const props = defineProps<{ params: Record<number | string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const V0 = computed(() => Math.max(props.params.V0 ?? 10, 0.1))
const I0 = computed(() => Math.max(props.params.I0 ?? 5, 0.1))
const phi = computed(() => Math.min(Math.max(props.params.phi ?? 0.8, 0), 3.14))
const a = computed(() => Math.min(Math.max(props.params.a ?? 0, 0), 0.04))
const b = computed(() => Math.min(Math.max(props.params.b ?? 0.02, 0), 0.04))
const OMEGA = 2 * Math.PI * 50
const pAvg = computed(() => 0.5 * V0.value * I0.value * Math.cos(phi.value))
const pWindow = computed(() => {
  const lo = Math.min(a.value, b.value)
  const hi = Math.max(a.value, b.value)
  if (hi - lo < 1e-6) return 0
  let sum = 0
  const STEPS = 240
  for (let i = 0; i < STEPS; i++) {
    const tt = lo + ((i + 0.5) / STEPS) * (hi - lo)
    sum += V0.value * I0.value * Math.sin(OMEGA * tt) * Math.sin(OMEGA * tt - phi.value)
  }
  return sum / STEPS
})

// --- spinning phasors ---
const theta = ref(0.9)
useRafLoop((dt) => {
  theta.value += dt * 1.6
})
const PC = { x: 170, y: 170, r: 110 }
const vTip = computed(() => ({
  x: PC.x + Math.cos(theta.value) * (V0.value / 20) * PC.r,
  y: PC.y - Math.sin(theta.value) * (V0.value / 20) * PC.r,
}))
const iTip = computed(() => ({
  x: PC.x + Math.cos(theta.value - phi.value) * (I0.value / 10) * PC.r,
  y: PC.y - Math.sin(theta.value - phi.value) * (I0.value / 10) * PC.r,
}))
const glow = computed(() => Math.max(pAvg.value, 0) / 100) // 0..1 at max 0.5·20·10

// --- p(t) strip with the [a,b] window shaded ---
const CH = { x: 90, y: 330, w: 620, h: 120 }
const PMAX = 110
const px = (tt: number) => CH.x + (tt / 0.04) * CH.w
const py = (pp: number) => CH.y + CH.h / 2 - (pp / PMAX) * (CH.h / 2)
const pts = computed(() => {
  const out: string[] = []
  for (let i = 0; i <= 160; i++) {
    const tt = (i / 160) * 0.04
    out.push(`${px(tt)},${py(V0.value * I0.value * Math.sin(OMEGA * tt) * Math.sin(OMEGA * tt - phi.value))}`)
  }
  return out.join(' ')
})

const readouts = computed(() => [
  { label: 'cos φ', value: fmt(Math.cos(phi.value), 3), color: 'var(--accent)' },
  { label: 'P = ½V₀I₀cos φ', value: `${fmt(pAvg.value, 2)} W`, color: pAvg.value >= 0 ? 'var(--pos)' : 'var(--neg)' },
  { label: t('acp.window'), value: `${fmt(pWindow.value, 2)} W`, color: 'var(--accent-2)' },
  { label: 'φ', value: `${fmt((phi.value * 180) / Math.PI, 0)}°` },
  { label: 'V₀ · I₀', value: `${fmt(V0.value, 1)} V · ${fmt(I0.value, 1)} A` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('acp.hint') }}</text>
      <!-- phasor dial: v leads, i lags by φ -->
      <circle :cx="PC.x" :cy="PC.y" :r="PC.r" fill="var(--sunken)" stroke="var(--line)" />
      <line :x1="PC.x" :y1="PC.y" :x2="vTip.x" :y2="vTip.y" stroke="var(--accent)" stroke-width="3" />
      <circle :cx="vTip.x" :cy="vTip.y" r="5" fill="var(--accent)" />
      <line :x1="PC.x" :y1="PC.y" :x2="iTip.x" :y2="iTip.y" stroke="var(--accent-2)" stroke-width="3" />
      <circle :cx="iTip.x" :cy="iTip.y" r="5" fill="var(--accent-2)" />
      <text :x="PC.x" :y="PC.y + PC.r + 22" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('acp.phasors') }}</text>
      <text :x="PC.x - PC.r" :y="PC.y - PC.r - 8" font-size="12" fill="var(--accent)" class="num">v(t)</text>
      <text :x="PC.x - PC.r + 44" :y="PC.y - PC.r - 8" font-size="12" fill="var(--accent-2)" class="num">i(t)</text>
      <!-- the lag held between them -->
      <text x="330" y="120" font-size="12" fill="var(--fg)" class="num">φ = {{ fmt((phi * 180) / Math.PI, 0) }}°</text>
      <text x="330" y="142" font-size="11" fill="var(--muted)">{{ t('acp.lag') }}</text>
      <!-- the lamp fed by real power only -->
      <circle cx="600" cy="150" r="46" fill="var(--panel)" stroke="var(--line)" stroke-width="2" />
      <circle cx="600" cy="150" :r="10 + glow * 34" fill="var(--accent)" :opacity="0.15 + glow * 0.85" />
      <text x="600" y="156" text-anchor="middle" font-size="13" fill="var(--fg)" class="num">{{ fmt(pAvg, 1) }} W</text>
      <text x="600" y="222" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('acp.lamp') }}</text>
      <text x="600" y="242" text-anchor="middle" font-size="11" :fill="Math.cos(phi) < 0.1 ? 'var(--neg)' : 'var(--muted)'">{{ Math.cos(phi) < 0.1 ? t('acp.starved') : t('acp.pf', { pf: fmt(Math.cos(phi), 2) }) }}</text>
      <!-- p(t) with the averaging window -->
      <rect :x="CH.x" :y="CH.y" :width="CH.w" :height="CH.h" fill="var(--sunken)" stroke="var(--line)" rx="6" />
      <rect :x="px(Math.min(a, b))" :y="CH.y" :width="Math.max(px(Math.max(a, b)) - px(Math.min(a, b)), 1)" :height="CH.h" fill="var(--accent-2)" opacity="0.15" />
      <line :x1="CH.x" :y1="py(0)" :x2="CH.x + CH.w" :y2="py(0)" stroke="var(--line)" />
      <line :x1="CH.x" :y1="py(pAvg)" :x2="CH.x + CH.w" :y2="py(pAvg)" stroke="var(--pos)" stroke-dasharray="4 3" />
      <polyline :points="pts" fill="none" stroke="var(--accent)" stroke-width="2" />
      <text :x="CH.x + 6" :y="py(pAvg) - 6" font-size="10" fill="var(--pos)" class="num">P = {{ fmt(pAvg, 1) }} W</text>
      <text :x="CH.x + 6" :y="CH.y + 14" font-size="10" fill="var(--muted)" class="num">p(t) = v(t)·i(t)</text>
      <text :x="px(Math.min(a, b) / 2 + Math.max(a, b) / 2)" :y="CH.y + CH.h + 16" text-anchor="middle" font-size="10" fill="var(--accent-2)">{{ t('acp.windowLabel', { w: fmt(pWindow, 1) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
