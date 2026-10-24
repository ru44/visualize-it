<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// economics/loan-amortization. params L (loan), r (%/yr), N (months), x = the month you inspect.
// Every monthly payment is the same height, but its split changes: the bank's interest slice
// (red) shrinks as the balance falls and the principal slice (green) grows. The thin line is the
// remaining balance; the dashed flag marks the tipping month where principal first wins.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const L = computed(() => Math.max(props.params.L ?? 100000, 100))
const r = computed(() => Math.max(props.params.r ?? 6, 0.01))
const N = computed(() => Math.max(Math.round(props.params.N ?? 240), 2))
const month = computed(() => Math.min(Math.max(Math.round(props.params.x ?? 60), 1), N.value))
const i = computed(() => r.value / 1200)
const payment = computed(() => (L.value * i.value) / (1 - (1 + i.value) ** -N.value))
const balance = (m: number) => (L.value * ((1 + i.value) ** N.value - (1 + i.value) ** m)) / ((1 + i.value) ** N.value - 1)
const interestAt = (m: number) => balance(m - 1) * i.value
const intNow = computed(() => interestAt(month.value))
const prinNow = computed(() => payment.value - intNow.value)
const totalInterest = computed(() => payment.value * N.value - L.value)
const tipping = computed(() => {
  for (let m = 1; m <= N.value; m++) if (payment.value - interestAt(m) > interestAt(m)) return m
  return N.value
})

// --- bars: up to 60 of them, bucketing months for long loans ---
const CH = { x: 80, y: 110, w: 620, h: 250 }
const bars = computed(() => {
  const step = Math.ceil(N.value / 60)
  const out: { m: number; x: number; w: number; intFrac: number; bal: number }[] = []
  for (let m = 1; m <= N.value; m += step) {
    out.push({
      m,
      x: CH.x + ((m - 1) / N.value) * CH.w,
      w: Math.max((CH.w / N.value) * step - 1.5, 2),
      intFrac: interestAt(m) / payment.value,
      bal: balance(m) / L.value,
    })
  }
  return out
})
const balLine = computed(() => bars.value.map((bar) => `${bar.x + bar.w / 2},${CH.y + CH.h - bar.bal * CH.h}`).join(' '))
const monthX = computed(() => CH.x + ((month.value - 0.5) / N.value) * CH.w)
const tipX = computed(() => CH.x + ((tipping.value - 0.5) / N.value) * CH.w)

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.min(N.value, Math.max(1, Math.round(((px - CH.x) / CH.w) * N.value))))
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const money = (v: number) => (v >= 1000 ? `${fmt(v / 1000, 1)}k` : fmt(v, 0))
const readouts = computed(() => [
  { label: t('loan.payment'), value: money(payment.value) },
  { label: t('loan.interestNow', { m: month.value }), value: money(intNow.value), color: 'var(--neg)' },
  { label: t('loan.principalNow'), value: money(prinNow.value), color: 'var(--pos)' },
  { label: t('loan.balance'), value: money(balance(month.value)), color: 'var(--accent)' },
  { label: t('loan.totalInterest'), value: money(totalInterest.value), color: 'var(--accent-2)' },
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
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('loan.hint') }}</text>
      <text :x="CH.x" y="64" font-size="13" font-weight="600" fill="var(--fg)">{{ t('loan.title', { pay: money(payment) }) }}</text>
      <!-- every bar is one identical payment, split into the bank's slice and yours -->
      <g v-for="bar in bars" :key="bar.m">
        <rect :x="bar.x" :y="CH.y" :width="bar.w" :height="bar.intFrac * CH.h" fill="var(--neg)" opacity="0.75" />
        <rect :x="bar.x" :y="CH.y + bar.intFrac * CH.h" :width="bar.w" :height="(1 - bar.intFrac) * CH.h" fill="var(--pos)" opacity="0.75" />
      </g>
      <polyline :points="balLine" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <!-- tipping month: principal first beats interest -->
      <line :x1="tipX" :y1="CH.y - 14" :x2="tipX" :y2="CH.y + CH.h" stroke="var(--fg)" stroke-dasharray="4 3" />
      <text :x="tipX" :y="CH.y - 20" text-anchor="middle" font-size="10" fill="var(--fg)">{{ t('loan.tipping', { m: tipping }) }}</text>
      <!-- the inspected month -->
      <line :x1="monthX" :y1="CH.y" :x2="monthX" :y2="CH.y + CH.h + 16" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="monthX" :y="CH.y + CH.h + 32" text-anchor="middle" font-size="11" fill="var(--accent-2)" class="num">{{ t('loan.month', { m: month }) }}</text>
      <!-- axis + legend -->
      <text :x="CH.x" :y="CH.y + CH.h + 32" font-size="10" fill="var(--muted)" class="num">1</text>
      <text :x="CH.x + CH.w" :y="CH.y + CH.h + 32" text-anchor="end" font-size="10" fill="var(--muted)" class="num">{{ N }}</text>
      <rect :x="CH.x" :y="H - 62" width="12" height="12" fill="var(--neg)" opacity="0.75" />
      <text :x="CH.x + 18" :y="H - 52" font-size="11" fill="var(--fg)">{{ t('loan.legendInterest') }}</text>
      <rect :x="CH.x + 190" :y="H - 62" width="12" height="12" fill="var(--pos)" opacity="0.75" />
      <text :x="CH.x + 208" :y="H - 52" font-size="11" fill="var(--fg)">{{ t('loan.legendPrincipal') }}</text>
      <line :x1="CH.x + 420" :y1="H - 56" :x2="CH.x + 444" :y2="H - 56" stroke="var(--accent)" stroke-width="2.5" />
      <text :x="CH.x + 450" :y="H - 52" font-size="11" fill="var(--fg)">{{ t('loan.legendBalance') }}</text>
      <text :x="W / 2" :y="H - 20" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('loan.caption', { total: money(totalInterest), loan: money(L) }) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
