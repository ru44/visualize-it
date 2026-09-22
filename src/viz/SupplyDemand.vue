<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Linear demand P = a − b·Q and supply P = c + d·Q; equilibrium where they meet.
// params a, b, c, d and optionally `price` (a price floor/ceiling line to show shortage/surplus). Drag sets price.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD = { l: 60, r: 30, t: 30, b: 50 }
const QMAX = 100
const PMAX = 100
const sx = (q: number) => PAD.l + (q / QMAX) * (W - PAD.l - PAD.r)
const sy = (p: number) => H - PAD.b - (p / PMAX) * (H - PAD.t - PAD.b)
const a = computed(() => props.params.a ?? 80)
const b = computed(() => props.params.b ?? 0.8)
const c = computed(() => props.params.c ?? 10)
const d = computed(() => props.params.d ?? 0.6)
const eq = computed(() => {
  const q = (a.value - c.value) / (b.value + d.value)
  return { q, p: a.value - b.value * q }
})
const price = computed(() => props.params.price ?? eq.value.p)
const qd = computed(() => Math.max(0, (a.value - price.value) / b.value))
const qs = computed(() => Math.max(0, (price.value - c.value) / d.value))
const gap = computed(() => qs.value - qd.value) // >0 surplus, <0 shortage
const line = (f: (q: number) => number) => `M${sx(0)},${sy(Math.min(PMAX, Math.max(0, f(0))))} L${sx(QMAX)},${sy(Math.min(PMAX, Math.max(0, f(QMAX))))}`
const readouts = computed(() => [
  { label: t('market.eqPrice'), value: fmt(eq.value.p, 1), color: 'var(--accent-2)' },
  { label: t('market.eqQty'), value: fmt(eq.value.q, 1), color: 'var(--accent-2)' },
  { label: t('market.price'), value: fmt(price.value, 1) },
  { label: t('market.demandAt'), value: fmt(qd.value, 1), color: 'var(--accent)' },
  { label: t('market.supplyAt'), value: fmt(qs.value, 1), color: 'var(--pos)' },
  { label: gap.value >= 0 ? t('market.surplus') : t('market.shortage'), value: fmt(Math.abs(gap.value), 1), color: 'var(--neg)' },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value || !('price' in props.params)) return
  const bx = svg.value.getBoundingClientRect()
  emit('set', 'price', ((H - PAD.b - ((e.clientY - bx.top) / bx.height) * H) / (H - PAD.t - PAD.b)) * PMAX)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-ns-resize touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="i in 5" :key="i">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(i * 20)" :y2="sy(i * 20)" stroke="var(--grid)" />
          <text :x="PAD.l - 8" :y="sy(i * 20) + 4" text-anchor="end">{{ i * 20 }}</text>
          <text :x="sx(i * 20)" :y="H - PAD.b + 16" text-anchor="middle">{{ i * 20 }}</text>
        </template>
        <text :x="W - PAD.r" :y="H - 10" text-anchor="end">{{ t('market.qty') }} →</text>
        <text :x="PAD.l - 8" :y="PAD.t - 10" text-anchor="end">{{ t('market.priceAxis') }}</text>
      </g>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <line :x1="sx(0)" :x2="sx(0)" :y1="PAD.t" :y2="sy(0)" stroke="var(--muted)" />
      <path :d="line((q) => a - b * q)" stroke="var(--accent)" stroke-width="2.5" fill="none" />
      <path :d="line((q) => c + d * q)" stroke="var(--pos)" stroke-width="2.5" fill="none" />
      <text class="num" :x="sx(QMAX) - 4" :y="sy(Math.max(0, a - b * QMAX)) - 8" text-anchor="end" font-size="12" fill="var(--accent)">{{ t('market.demand') }}</text>
      <text class="num" :x="sx(QMAX) - 4" :y="sy(Math.min(PMAX, c + d * QMAX)) - 8" text-anchor="end" font-size="12" fill="var(--pos)">{{ t('market.supply') }}</text>
      <!-- price line, shortage/surplus bracket -->
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(price)" :y2="sy(price)" stroke="var(--accent-2)" stroke-dasharray="6 4" />
      <line :x1="sx(Math.min(qd, qs))" :x2="sx(Math.max(qd, qs))" :y1="sy(price)" :y2="sy(price)" stroke="var(--neg)" stroke-width="5" stroke-opacity="0.8" />
      <circle :cx="sx(qd)" :cy="sy(price)" r="5" fill="var(--accent)" />
      <circle :cx="sx(qs)" :cy="sy(price)" r="5" fill="var(--pos)" />
      <circle :cx="sx(eq.q)" :cy="sy(eq.p)" r="7" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="3" />
      <line :x1="sx(eq.q)" :x2="sx(eq.q)" :y1="sy(eq.p)" :y2="sy(0)" stroke="var(--accent-2)" stroke-dasharray="3 3" />
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('market.hint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
