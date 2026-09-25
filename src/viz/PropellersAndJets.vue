<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A disc (propeller/fan) in a duct: the incoming stream tube narrows and speeds up as it passes
// through, exactly as mass conservation requires. Two very different ways to make similar
// thrust — big & gentle vs small & violent — read very differently in efficiency.
// params: A (disc area, m²), v (aircraft speed, m/s), dv (speed added, m/s).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CY = 240
const DISC_X = 300

const A = computed(() => Math.max(0.05, props.params.A ?? 8))
const v = computed(() => Math.max(0, props.params.v ?? 230))
const dv = computed(() => Math.max(1, props.params.dv ?? 60))

const mdot = computed(() => 1.225 * A.value * (v.value + dv.value / 2))
const thrust = computed(() => mdot.value * dv.value)
const eta = computed(() => (2 * v.value) / (2 * v.value + dv.value))

const discR = computed(() => Math.min(140, 16 + Math.sqrt(A.value / Math.PI) * 55))
const exitR = computed(() => discR.value * Math.sqrt((v.value + dv.value / 2) / (v.value + dv.value)))

const entryPath = computed(() => `M40,${CY - discR.value} L${DISC_X},${CY - discR.value} M40,${CY + discR.value} L${DISC_X},${CY + discR.value}`)
const exitPath = computed(() => {
  const x1 = DISC_X
  const x2 = W - 40
  const r1 = discR.value
  const r2 = exitR.value
  return `M${x1},${CY - r1} C${x1 + 90},${CY - r1} ${x1 + 70},${CY - r2} ${x2},${CY - r2} M${x1},${CY + r1} C${x1 + 90},${CY + r1} ${x1 + 70},${CY + r2} ${x2},${CY + r2}`
})

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

const entryDash = computed(() => -(time.value * (20 + v.value * 0.4)))
const exitDash = computed(() => -(time.value * (20 + (v.value + dv.value) * 0.4)))

const readouts = computed(() => [
  { label: 'A', value: `${fmt(A.value, 2)} m²` },
  { label: 'v', value: `${fmt(v.value, 0)} m/s` },
  { label: 'Δv', value: `${fmt(dv.value, 0)} m/s` },
  { label: t('pj.mdot'), value: `${fmt(mdot.value, 0)} kg/s` },
  { label: 'T', value: `${fmt(thrust.value, 0)} N`, color: 'var(--pos)' },
  { label: t('pj.eta'), value: `${fmt(eta.value * 100, 1)}%`, color: eta.value > 0.75 ? 'var(--pos)' : 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('pj.hint') }}</text>

      <path :d="entryPath" fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="10 8" :stroke-dashoffset="entryDash" />
      <path :d="exitPath" fill="none" stroke="var(--accent-2)" stroke-width="2.4" stroke-dasharray="10 8" :stroke-dashoffset="exitDash" />

      <rect :x="DISC_X - 6" :y="CY - discR" width="12" :height="discR * 2" fill="var(--accent)" opacity="0.75" rx="3" />

      <text :x="DISC_X" :y="CY - discR - 12" font-size="11" fill="var(--accent)" text-anchor="middle">{{ t('pj.discLabel') }}</text>
      <text x="70" :y="CY - discR - 12" font-size="11" fill="var(--muted)">{{ t('pj.inLabel') }}</text>
      <text :x="W - 130" :y="CY - exitR - 12" font-size="11" fill="var(--accent-2)">{{ t('pj.outLabel') }}</text>

      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('pj.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
