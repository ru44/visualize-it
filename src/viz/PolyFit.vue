<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Fit a polynomial of degree d to noisy training points; hidden test points show whether it generalises.
// params degree (0..12), noise (0..1). Tap to add a training point.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const PAD = 40
const truth = (x: number) => Math.sin(x * 1.3) * 2 + 4 // the hidden real rule
// deterministic noise so the picture is stable
const rnd = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 - 0.5
const noise = computed(() => props.params.noise ?? 0.5)
const train = ref<[number, number][]>(Array.from({ length: 12 }, (_, i) => [0.6 + i * 0.75, 0]))
const test = Array.from({ length: 30 }, (_, i) => 0.4 + i * 0.32)
const pts = computed(() => train.value.map(([x], i) => [x, truth(x) + rnd(i) * 2 * noise.value] as [number, number]))
const degree = computed(() => Math.min(12, Math.max(0, Math.round(props.params.degree ?? 3))))
// least squares via normal equations with Chebyshev-ish scaling for stability
const coef = computed(() => {
  const d = degree.value
  const n = d + 1
  const X = pts.value.map(([x]) => Array.from({ length: n }, (_, k) => ((x - 5) / 5) ** k))
  const y = pts.value.map(([, v]) => v)
  const A = Array.from({ length: n }, () => Array(n + 1).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) A[i][j] = X.reduce((s, r) => s + r[i] * r[j], 0) + (i === j ? 1e-9 : 0)
    A[i][n] = X.reduce((s, r, k) => s + r[i] * y[k], 0)
  }
  for (let c = 0; c < n; c++) {
    let p = c
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r
    ;[A[c], A[p]] = [A[p], A[c]]
    if (Math.abs(A[c][c]) < 1e-12) continue
    for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= n; k++) A[r][k] -= f * A[c][k] }
  }
  return A.map((row, i) => (Math.abs(row[i]) < 1e-12 ? 0 : row[n] / row[i]))
})
const model = (x: number) => coef.value.reduce((s, c, k) => s + c * ((x - 5) / 5) ** k, 0)
const sx = (x: number) => PAD + (x / 10) * (W - 2 * PAD)
const sy = (y: number) => H - PAD - (y / 8) * (H - 2 * PAD)
const path = (f: (x: number) => number) => Array.from({ length: 201 }, (_, i) => { const x = (10 * i) / 200; const y = Math.max(-2, Math.min(10, f(x))); return `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}` }).join('')
const mse = (xs: [number, number][]) => xs.reduce((s, [x, y]) => s + (model(x) - y) ** 2, 0) / xs.length
const trainErr = computed(() => mse(pts.value))
const testErr = computed(() => mse(test.map((x) => [x, truth(x)] as [number, number])))
const readouts = computed(() => [
  { label: t('fit.degree'), value: String(degree.value) },
  { label: t('fit.trainErr'), value: fmt(trainErr.value, 3), color: 'var(--accent)' },
  { label: t('fit.testErr'), value: fmt(testErr.value, 3), color: testErr.value > 3 * trainErr.value + 0.2 ? 'var(--neg)' : 'var(--pos)' },
  { label: t('fit.verdict'), value: degree.value <= 1 ? t('fit.under') : testErr.value > 3 * trainErr.value + 0.2 ? t('fit.over') : t('fit.good') },
])
function add(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const b = svg.getBoundingClientRect()
  const x = (((e.clientX - b.left) / b.width) * W - PAD) / (W - 2 * PAD) * 10
  if (x < 0 || x > 10) return
  train.value = [...train.value, [x, 0]]
}
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="add">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('fit.hintPoly') }}</text>
      <g stroke="var(--grid)"><line v-for="i in 9" :key="i" :x1="sx(i)" :x2="sx(i)" :y1="PAD" :y2="H - PAD" /><line v-for="i in 7" :key="'h' + i" :x1="PAD" :x2="W - PAD" :y1="sy(i)" :y2="sy(i)" /></g>
      <path :d="path(truth)" fill="none" stroke="var(--pos)" stroke-width="1.5" stroke-dasharray="6 5" />
      <path :d="path(model)" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <circle v-for="([x, y], i) in pts" :key="i" :cx="sx(x)" :cy="sy(y)" r="5.5" fill="var(--accent)" stroke="var(--panel)" stroke-width="1.5" />
      <g class="num" font-size="12"><text :x="W - PAD" :y="PAD + 4" text-anchor="end" fill="var(--pos)">{{ t('fit.truth') }}</text><text :x="W - PAD" :y="PAD + 22" text-anchor="end" fill="var(--accent-2)">{{ t('fit.model') }}</text><text :x="W - PAD" :y="PAD + 40" text-anchor="end" fill="var(--accent)">{{ t('fit.trainPts') }}</text></g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
