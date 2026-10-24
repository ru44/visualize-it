<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// networking/wifi. params d (metres from the router), w (walls in the way), L (dB lost per wall).
// A floor plan: the router's rings fade with distance, walls bite chunks out of the signal, and
// the phone's bars follow P_r = 20 − 40 − 20·log10(d) − w·L dBm.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const d = computed(() => Math.min(Math.max(props.params.d ?? 5, 1), 30))
const w = computed(() => Math.min(Math.max(Math.round(props.params.w ?? 1), 0), 4))
const L = computed(() => Math.min(Math.max(props.params.L ?? 5, 2), 10))
const distLoss = computed(() => 20 * Math.log10(d.value))
const wallLoss = computed(() => w.value * L.value)
const pr = computed(() => 20 - 40 - distLoss.value - wallLoss.value)
const bars = computed(() => (pr.value >= -50 ? 4 : pr.value >= -60 ? 3 : pr.value >= -70 ? 2 : pr.value >= -80 ? 1 : 0))
const SPEEDS = ['0', '~1', '~20', '~150', '~500']

const RX = 90
const RY = 270
const PXM = 20 // pixels per metre
const phoneX = computed(() => RX + d.value * PXM)
const walls = computed(() => Array.from({ length: w.value }, (_, i) => RX + ((i + 1) / (w.value + 1)) * d.value * PXM))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'd', Math.round(Math.min(30, Math.max(1, (px - RX) / PXM)) * 2) / 2)
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'P_r', value: `${fmt(pr.value, 1)} dBm`, color: bars.value >= 3 ? 'var(--pos)' : bars.value >= 1 ? 'var(--accent)' : 'var(--neg)' },
  { label: '20·log₁₀(d)', value: `${fmt(distLoss.value, 1)} dB` },
  { label: `w·L`, value: `${fmt(wallLoss.value, 0)} dB`, color: 'var(--accent-2)' },
  { label: t('wifi.bars'), value: `${bars.value}/4` },
  { label: t('wifi.speed'), value: `${SPEEDS[bars.value]} Mbps` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="drag"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('wifi.hint') }}</text>
      <!-- floor -->
      <line x1="60" :y1="RY + 60" x2="740" :y2="RY + 60" stroke="var(--line)" />
      <text v-for="m in [0, 10, 20, 30]" :key="m" :x="RX + m * PXM" :y="RY + 78" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ m }} m</text>
      <!-- router with fading rings -->
      <rect :x="RX - 16" :y="RY + 18" width="32" height="40" rx="5" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
      <line :x1="RX - 8" :y1="RY + 18" :x2="RX - 12" :y2="RY - 4" stroke="var(--accent)" stroke-width="2" />
      <line :x1="RX + 8" :y1="RY + 18" :x2="RX + 12" :y2="RY - 4" stroke="var(--accent)" stroke-width="2" />
      <circle v-for="r in 5" :key="r" :cx="RX" :cy="RY" :r="r * 90" fill="none" stroke="var(--accent)" :opacity="0.4 / r" />
      <text :x="RX" :y="RY + 102" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('wifi.router') }}</text>
      <!-- walls between router and phone -->
      <g v-for="(wx, i) in walls" :key="i">
        <rect :x="wx - 4" :y="RY - 140" width="8" height="198" fill="var(--muted)" opacity="0.8" rx="2" />
        <text :x="wx" :y="RY - 150" text-anchor="middle" font-size="9" fill="var(--muted)">−{{ fmt(L, 0) }} dB</text>
      </g>
      <!-- the phone and its bars -->
      <rect :x="phoneX - 12" :y="RY + 6" width="24" height="46" rx="5" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <rect v-for="b in 4" :key="'b' + b" :x="phoneX - 16 + (b - 1) * 9" :y="RY - 16 - b * 7" width="6" :height="4 + b * 7" rx="1.5" :fill="b <= bars ? 'var(--pos)' : 'var(--sunken)'" :stroke="b <= bars ? 'none' : 'var(--line)'" />
      <text :x="phoneX" :y="RY + 72" text-anchor="middle" font-size="11" fill="var(--fg)" class="num">{{ fmt(d, 1) }} m</text>
      <text :x="phoneX" :y="RY - 56" text-anchor="middle" font-size="12" :fill="bars >= 1 ? 'var(--fg)' : 'var(--neg)'" class="num">{{ fmt(pr, 0) }} dBm</text>
      <!-- the budget written out -->
      <text x="400" y="56" text-anchor="middle" font-size="12" fill="var(--fg)" class="num">P_r = 20 − 40 − {{ fmt(distLoss, 1) }} − {{ fmt(wallLoss, 0) }} = {{ fmt(pr, 1) }} dBm</text>
      <text x="400" y="76" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('wifi.budget') }}</text>
      <text v-if="bars === 0" x="400" :y="H - 34" text-anchor="middle" font-size="13" fill="var(--neg)" font-weight="600">{{ t('wifi.dead') }}</text>
      <text x="400" :y="H - 12" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('wifi.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
