<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A fixed-size circular body in a flow; only the WAKE's character changes with Re — smooth and
// attached at low Re, a chaotic swirling wake at high Re — plus a log-scale position marker so
// the learner can see where a bee, a ball and a jet sit on the very same dial.
// params: L (length scale, m), v (speed, m/s). Air is fixed: rho = 1.225, mu = 1.81e-5.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 230
const CY = 210
const R = 46

const L = computed(() => Math.max(0.0001, props.params.L ?? 0.01))
const v = computed(() => Math.max(0.001, props.params.v ?? 3))
const Re = computed(() => (1.225 * v.value * L.value) / 1.81e-5)
const logRe = computed(() => Math.log10(Re.value))
const turb = computed(() => Math.max(0, Math.min(1, (logRe.value - 3) / 5)))

const regimeKey = computed(() => (turb.value < 0.15 ? 're.laminar' : turb.value > 0.85 ? 're.turbulent' : 're.transitional'))

const time = ref(0)
let rafId: number | null = null
function tick(ts: number) {
  time.value = ts / 1000
  rafId = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

const N_LINES = 11
const streamlines = computed(() => {
  const tt = turb.value
  const t0 = time.value
  const lines: { d: string }[] = []
  for (let i = 0; i < N_LINES; i++) {
    const Y0 = 70 + (280 * i) / (N_LINES - 1)
    const s = Y0 - CY
    const sign = s < 0 ? -1 : 1
    let d = ''
    for (let j = 0; j <= 70; j++) {
      const x = (W - 30) * (j / 70) + 10
      const dxc = x - CX
      const distC = Math.hypot(dxc, s)
      const behind = x > CX && Math.abs(s) < R + 40
      let y = Y0
      if (distC < R + 10 && x < CX + R) {
        // bend around the front of the body
        const bend = Math.max(0, (R + 10 - distC) / (R + 10))
        y = Y0 + sign * bend * (R + 10 - Math.abs(dxc) * 0.15)
      }
      if (behind) {
        const dist = x - CX
        const envelope = Math.min(1, dist / 80) * Math.max(0, 1 - dist / 420)
        const wiggle = tt * envelope * 26 * Math.sin(dist * 0.05 - t0 * 3.2 + i * 1.1)
        const spread = (1 - tt * 0.5) * sign * Math.min(18, dist * 0.06)
        y = CY + s * 0.4 + spread + wiggle
      }
      d += `${j ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
    }
    lines.push({ d })
  }
  return lines
})

// log-scale Re dial, -4 .. 9
const AX0 = 60
const AX1 = 760
const AY = 410
const LMIN = -4
const LMAX = 9
const markerX = computed(() => AX0 + ((Math.max(LMIN, Math.min(LMAX, logRe.value)) - LMIN) / (LMAX - LMIN)) * (AX1 - AX0))
const ticks = [-4, -1, 2, 3, 5, 7, 9]

const readouts = computed(() => [
  { label: 'Re', value: Re.value >= 1000 ? Re.value.toExponential(2) : fmt(Re.value, 1) },
  { label: 'log₁₀ Re', value: fmt(logRe.value, 2) },
  { label: 'L', value: `${fmt(L.value, 4)} m` },
  { label: 'v', value: `${fmt(v.value, 2)} m/s` },
  { label: t('re.regime'), value: t(regimeKey.value as any), color: turb.value > 0.5 ? 'var(--accent-2)' : 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('re.hint') }}</text>

      <path v-for="(ln, i) in streamlines" :key="i" :d="ln.d" fill="none" :stroke="turb < 0.5 ? 'var(--accent)' : 'var(--accent-2)'" stroke-width="1.4" stroke-opacity="0.7" />
      <circle :cx="CX" :cy="CY" :r="R" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />

      <line :x1="AX0" :x2="AX1" :y1="AY" :y2="AY" stroke="var(--line)" stroke-width="2" />
      <g v-for="tk in ticks" :key="tk">
        <line :x1="AX0 + ((tk - LMIN) / (LMAX - LMIN)) * (AX1 - AX0)" :x2="AX0 + ((tk - LMIN) / (LMAX - LMIN)) * (AX1 - AX0)" :y1="AY - 6" :y2="AY + 6" stroke="var(--muted)" />
        <text :x="AX0 + ((tk - LMIN) / (LMAX - LMIN)) * (AX1 - AX0)" :y="AY + 22" font-size="10" fill="var(--muted)" text-anchor="middle">10^{{ tk }}</text>
      </g>
      <circle :cx="markerX" :cy="AY" r="7" fill="var(--fg)" />
      <text x="16" y="378" font-size="11" fill="var(--muted)">{{ t('re.axisHint') }}</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('re.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
