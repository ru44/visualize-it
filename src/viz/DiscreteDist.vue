<script setup lang="ts">
import { computed, ref } from 'vue'
import { binomialPmf, poissonPmf } from '../engine/stats'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Bars for a discrete distribution. Drag horizontally to move the highlighted outcome `k`.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 56, r: 20, t: 30, b: 44 }
const kind = computed<'binomial' | 'poisson'>(() => props.options.kind ?? 'binomial')

const support = computed(() => {
  if (kind.value === 'binomial') return Math.max(1, Math.round(props.params.n ?? 10))
  const lam = props.params.lambda ?? 3
  return Math.max(8, Math.ceil(lam + 5 * Math.sqrt(lam) + 2))
})
const pmf = computed(() =>
  Array.from({ length: support.value + 1 }, (_, i) => (kind.value === 'binomial' ? binomialPmf(support.value, i, props.params.p ?? 0.5) : poissonPmf(props.params.lambda ?? 3, i))),
)
const stats = computed(() => {
  if (kind.value === 'binomial') {
    const n = support.value
    const p = props.params.p ?? 0.5
    return { mean: n * p, sd: Math.sqrt(n * p * (1 - p)) }
  }
  const lam = props.params.lambda ?? 3
  return { mean: lam, sd: Math.sqrt(lam) }
})
const k = computed(() => Math.min(support.value, Math.max(0, Math.round(props.params.k ?? 0))))
const maxP = computed(() => Math.max(...pmf.value, 1e-9))
const bw = computed(() => (W - PAD.l - PAD.r) / (support.value + 1))
const sx = (i: number) => PAD.l + i * bw.value
const sy = (p: number) => H - PAD.b - (p / (maxP.value * 1.1)) * (H - PAD.t - PAD.b)
const cumulative = computed(() => pmf.value.slice(0, k.value + 1).reduce((a, b) => a + b, 0))
const yTicks = computed(() => [0.25, 0.5, 0.75, 1].map((f) => f * maxP.value))

const readouts = computed(() => [
  { label: `P(X = ${k.value})`, value: fmt(pmf.value[k.value], 5), color: 'var(--accent-2)' },
  { label: `P(X ≤ ${k.value})`, value: fmt(cumulative.value, 5) },
  { label: t('dist.mean'), value: fmt(stats.value.mean, 3), color: 'var(--accent)' },
  { label: t('dist.sd'), value: fmt(stats.value.sd, 3) },
])

let svgEl: SVGSVGElement | null = null
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svgEl) return
  const box = svgEl.getBoundingClientRect()
  const x = ((e.clientX - box.left) / box.width) * W
  emit('set', 'k', Math.floor((x - PAD.l) / bw.value))
}
function down(e: PointerEvent) {
  svgEl = e.currentTarget as SVGSVGElement
  dragging.value = true
  svgEl.setPointerCapture(e.pointerId)
  pick(e)
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="down" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="p in yTicks" :key="p">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(p)" :y2="sy(p)" stroke="var(--grid)" />
          <text :x="PAD.l - 6" :y="sy(p) + 4" text-anchor="end">{{ fmt(p, 3) }}</text>
        </template>
      </g>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="H - PAD.b" :y2="H - PAD.b" stroke="var(--muted)" />
      <g v-for="(p, i) in pmf" :key="i">
        <rect :x="sx(i) + 2" :y="sy(p)" :width="Math.max(1, bw - 4)" :height="H - PAD.b - sy(p)" :fill="i === k ? 'var(--accent-2)' : i <= k ? 'var(--accent)' : 'var(--accent)'" :fill-opacity="i === k ? 1 : i < k ? 0.55 : 0.28" rx="2" />
        <text v-if="support <= 40 || i % Math.ceil(support / 40) === 0" class="num" :x="sx(i) + bw / 2" :y="H - PAD.b + 16" text-anchor="middle" font-size="11" fill="var(--muted)">{{ i }}</text>
      </g>
      <line :x1="sx(stats.mean + 0.5)" :x2="sx(stats.mean + 0.5)" :y1="PAD.t" :y2="H - PAD.b" stroke="var(--accent)" stroke-dasharray="5 4" />
      <text class="num" :x="sx(stats.mean + 0.5) + 6" :y="PAD.t + 12" font-size="12" fill="var(--accent)">μ = {{ fmt(stats.mean, 2) }}</text>
      <path :d="`M${sx(stats.mean - stats.sd + 0.5)},${PAD.t + 26} H${sx(stats.mean + stats.sd + 0.5)}`" stroke="var(--accent)" stroke-width="2" stroke-opacity="0.5" />
      <text class="num" :x="sx(stats.mean + 0.5)" :y="PAD.t + 40" text-anchor="middle" font-size="11" fill="var(--muted)">μ ± σ</text>
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('dist.dragHint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
