<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electricity/electric-power-and-energy-bills. params: P (W), t (hours/month), c ($/kWh). Drawn as
// an old-style spinning utility meter disc (spin rate proportional to P, a real meter's own idea of
// "power") next to a receipt showing the monthly kWh and the resulting bill.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const DISC_CX = 220
const DISC_CY = 230
const DISC_R = 90

const power = computed(() => Math.max(props.params.P ?? 2000, 0.1))
const hours = computed(() => Math.max(props.params.t ?? 5, 0))
const price = computed(() => Math.max(props.params.c ?? 0.28, 0))
const kwh = computed(() => (power.value * hours.value) / 1000)
const cost = computed(() => kwh.value * price.value)

const angle = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  angle.value = (angle.value + (30 + power.value * 0.15) * dt) % 360
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  last = performance.now()
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const markX = computed(() => DISC_CX + DISC_R * 0.7 * Math.cos((angle.value * Math.PI) / 180))
const markY = computed(() => DISC_CY + DISC_R * 0.7 * Math.sin((angle.value * Math.PI) / 180))

const barWidth = computed(() => Math.min(320, (kwh.value / 120) * 320))

const readouts = computed(() => [
  { label: 'P', value: `${fmt(power.value)} W` },
  { label: 't', value: `${fmt(hours.value)} h/mo` },
  { label: 'c', value: `${fmt(price.value, 2)} /kWh` },
  { label: 'E', value: `${fmt(kwh.value, 2)} kWh`, color: 'var(--accent-2)' },
  { label: 'Cost', value: `$${fmt(cost.value, 2)}`, color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('bill.hint') }}</text>

      <circle :cx="DISC_CX" :cy="DISC_CY" :r="DISC_R" fill="var(--sunken)" stroke="var(--line)" stroke-width="2" />
      <circle :cx="DISC_CX" :cy="DISC_CY" :r="DISC_R - 14" fill="none" stroke="var(--line)" />
      <line :x1="DISC_CX" :y1="DISC_CY" :x2="markX" :y2="markY" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" />
      <circle :cx="DISC_CX" :cy="DISC_CY" r="5" fill="var(--accent)" />
      <text :x="DISC_CX" :y="DISC_CY + DISC_R + 26" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('bill.meter') }}</text>
      <text :x="DISC_CX" :y="DISC_CY - DISC_R - 14" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)">{{ fmt(power) }} W</text>

      <!-- receipt panel -->
      <g transform="translate(460, 60)">
        <rect x="0" y="0" width="300" height="360" rx="10" fill="var(--panel)" stroke="var(--line)" />
        <text x="150" y="34" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)">{{ t('bill.receiptTitle') }}</text>
        <line x1="20" y1="50" x2="280" y2="50" stroke="var(--line)" />

        <text x="20" y="84" font-size="12" fill="var(--muted)">{{ t('bill.usageLabel') }}</text>
        <text class="num" x="280" y="84" text-anchor="end" font-size="16" fill="var(--fg)">{{ fmt(kwh, 2) }} kWh</text>
        <rect x="20" y="96" width="260" height="10" rx="5" fill="var(--sunken)" />
        <rect x="20" y="96" :width="barWidth" height="10" rx="5" fill="var(--accent-2)" />

        <text x="20" y="140" font-size="12" fill="var(--muted)">{{ t('bill.priceLabel') }}</text>
        <text class="num" x="280" y="140" text-anchor="end" font-size="14" fill="var(--fg)">{{ fmt(price, 2) }} /kWh</text>

        <line x1="20" y1="168" x2="280" y2="168" stroke="var(--line)" stroke-dasharray="3 3" />

        <text x="20" y="210" font-size="13" font-weight="600" fill="var(--fg)">{{ t('bill.totalLabel') }}</text>
        <text class="num" x="280" y="214" text-anchor="end" font-size="26" fill="var(--accent)">${{ fmt(cost, 2) }}</text>

        <text x="20" y="250" font-size="11" fill="var(--muted)">{{ t('bill.note') }}</text>
      </g>

      <text :x="W / 2" :y="H - 14" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('bill.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
