<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Top-down view of a wing: span grows with aspect ratio, and a spinning spiral at each tip
// stands in for the trailing vortex, sized by how much lift (and how little span efficiency)
// is driving it. params: AR (aspect ratio), alpha (deg), winglets (0/1).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CY = 240
const S_REF = 16 // reference wing area, m^2 — fixed so AR alone controls span
const V_REF = 70 // reference approach speed, m/s — induced drag matters most here

const AR = computed(() => Math.max(1, props.params.AR ?? 9))
const alphaDeg = computed(() => props.params.alpha ?? 8)
const winglets = computed(() => (props.params.winglets ?? 0) > 0.5)

const CL = computed(() => 2 * Math.PI * Math.sin((alphaDeg.value * Math.PI) / 180))
const e = computed(() => (winglets.value ? 0.88 : 0.8))
const CDi = computed(() => (CL.value * CL.value) / (Math.PI * AR.value * e.value))
const Di = computed(() => 0.5 * 1.225 * V_REF * V_REF * S_REF * CDi.value)
const spanM = computed(() => Math.sqrt(AR.value * S_REF))

const halfSpanPx = computed(() => Math.min(360, 30 + spanM.value * 9))
const chordPx = computed(() => Math.max(18, (S_REF / spanM.value) * 22))
const cx = W / 2

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

function spiral(ox: number, oy: number, size: number, spin: number, phase: number) {
  const turns = 2.4
  const n = 40
  let d = ''
  for (let i = 0; i <= n; i++) {
    const t0 = i / n
    const ang = t0 * turns * 2 * Math.PI * spin + phase
    const r = size * t0
    const x = ox + r * Math.cos(ang)
    const y = oy + r * Math.sin(ang) * 0.55
    d += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
  }
  return d
}

const vortexSize = computed(() => Math.min(60, 12 + 34 * CL.value) * (winglets.value ? 0.7 : 1))

const wing = computed(() => {
  const hs = halfSpanPx.value
  const c = chordPx.value
  return `M${cx - hs},${CY - c / 2} L${cx + hs},${CY - c / 2 + 3} L${cx + hs},${CY + c / 2 - 3} L${cx - hs},${CY + c / 2} Z`
})

const readouts = computed(() => [
  { label: 'AR', value: fmt(AR.value, 1) },
  { label: 'α', value: `${fmt(alphaDeg.value)}°` },
  { label: 'C_L', value: fmt(CL.value) },
  { label: 'e', value: fmt(e.value, 2) },
  { label: 'C_{D,i}', value: fmt(CDi.value, 4) },
  { label: t('wtv.di'), value: `${fmt(Di.value, 0)} N`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('wtv.hint') }}</text>

      <path :d="spiral(cx - halfSpanPx, CY, vortexSize, 1, time * 3.4)" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-linecap="round" opacity="0.85" />
      <path :d="spiral(cx + halfSpanPx, CY, vortexSize, -1, -time * 3.4)" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-linecap="round" opacity="0.85" />

      <path :d="wing" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />

      <g v-if="winglets">
        <line :x1="cx - halfSpanPx" :y1="CY - chordPx / 2" :x2="cx - halfSpanPx" :y2="CY - chordPx / 2 - 26" stroke="var(--pos)" stroke-width="4" stroke-linecap="round" />
        <line :x1="cx + halfSpanPx" :y1="CY - chordPx / 2 + 3" :x2="cx + halfSpanPx" :y2="CY - chordPx / 2 - 23" stroke="var(--pos)" stroke-width="4" stroke-linecap="round" />
      </g>

      <text :x="cx - halfSpanPx" :y="CY + 90" font-size="11" fill="var(--accent-2)" text-anchor="middle">{{ t('wtv.vortexLabel') }}</text>
      <text v-if="winglets" x="400" y="70" font-size="12" fill="var(--pos)" text-anchor="middle">{{ t('wtv.wingletsOn') }}</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('wtv.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
