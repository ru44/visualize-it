<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The plane under a 2×2 matrix [[a, b], [c, d]]: grid, unit square, basis vectors and one draggable vector.
// params a, b, c, d, vx, vy.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const U = 60 // pixels per unit
const O = { x: W / 2, y: H / 2 }
const sx = (x: number) => O.x + x * U
const sy = (y: number) => O.y - y * U
const M = computed(() => ({ a: props.params.a ?? 1, b: props.params.b ?? 0, c: props.params.c ?? 0, d: props.params.d ?? 1 }))
const ap = (x: number, y: number) => [M.value.a * x + M.value.b * y, M.value.c * x + M.value.d * y] as [number, number]
const det = computed(() => M.value.a * M.value.d - M.value.b * M.value.c)
const v = computed(() => [props.params.vx ?? 1, props.params.vy ?? 0.5] as [number, number])
const Mv = computed(() => ap(...v.value))
const gridLines = computed(() => {
  const out: string[] = []
  for (let k = -8; k <= 8; k++) {
    const [x1, y1] = ap(k, -8)
    const [x2, y2] = ap(k, 8)
    out.push(`M${sx(x1)},${sy(y1)}L${sx(x2)},${sy(y2)}`)
    const [x3, y3] = ap(-8, k)
    const [x4, y4] = ap(8, k)
    out.push(`M${sx(x3)},${sy(y3)}L${sx(x4)},${sy(y4)}`)
  }
  return out.join('')
})
const square = computed(() => [[0, 0], [1, 0], [1, 1], [0, 1]].map(([x, y]) => ap(x, y)).map(([x, y]) => `${sx(x)},${sy(y)}`).join(' '))
const arrow = (x: number, y: number, color: string, w = 2.5) => ({ x1: sx(0), y1: sy(0), x2: sx(x), y2: sy(y), stroke: color, 'stroke-width': w })
// Eigen-directions for real eigenvalues
const eig = computed(() => {
  const { a, b, c, d } = M.value
  const tr = a + d
  const disc = tr * tr - 4 * det.value
  if (disc < 0) return null
  const l1 = (tr + Math.sqrt(disc)) / 2
  const l2 = (tr - Math.sqrt(disc)) / 2
  const vec = (l: number) => (Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : Math.abs(a - l) < 1e-9 ? [1, 0] : [0, 1])
  return { l1, l2, v1: vec(l1), v2: vec(l2) }
})
const readouts = computed(() => [
  { label: 'v', value: `(${fmt(v.value[0], 2)}, ${fmt(v.value[1], 2)})`, color: 'var(--accent)' },
  { label: 'Mv', value: `(${fmt(Mv.value[0], 2)}, ${fmt(Mv.value[1], 2)})`, color: 'var(--accent-2)' },
  { label: t('matrix.det'), value: fmt(det.value, 3), color: det.value < 0 ? 'var(--neg)' : 'var(--pos)' },
  { label: t('matrix.area'), value: fmt(Math.abs(det.value), 3) },
  ...(eig.value ? [{ label: 'λ₁, λ₂', value: `${fmt(eig.value.l1, 2)}, ${fmt(eig.value.l2, 2)}` }] : [{ label: 'λ', value: t('matrix.complexEig') }]),
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  emit('set', 'vx', (((e.clientX - bx.left) / bx.width) * W - O.x) / U)
  emit('set', 'vy', (O.y - ((e.clientY - bx.top) / bx.height) * H) / U)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('matrix.hint') }}</text>
      <g stroke="var(--grid)"><line v-for="k in 17" :key="'g' + k" :x1="sx(k - 9)" :x2="sx(k - 9)" y1="0" :y2="H" /><line v-for="k in 9" :key="'h' + k" x1="0" :x2="W" :y1="sy(k - 5)" :y2="sy(k - 5)" /></g>
      <path :d="gridLines" fill="none" stroke="var(--accent)" stroke-opacity="0.35" />
      <polygon :points="square" fill="var(--accent-2)" fill-opacity="0.25" stroke="var(--accent-2)" />
      <line :x1="sx(-8)" :x2="sx(8)" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" /><line :x1="sx(0)" :x2="sx(0)" :y1="sy(-5)" :y2="sy(5)" stroke="var(--muted)" />
      <template v-if="eig">
        <line v-for="(ev, i) in [eig.v1, eig.v2]" :key="'e' + i" :x1="sx(-ev[0] * 8)" :y1="sy(-ev[1] * 8)" :x2="sx(ev[0] * 8)" :y2="sy(ev[1] * 8)" stroke="var(--pos)" stroke-dasharray="6 5" stroke-opacity="0.7" />
      </template>
      <line v-bind="arrow(M.a, M.c, 'var(--accent-2)')" /><text class="num" :x="sx(M.a) + 6" :y="sy(M.c) - 6" font-size="12" fill="var(--accent-2)">î → ({{ fmt(M.a, 1) }}, {{ fmt(M.c, 1) }})</text>
      <line v-bind="arrow(M.b, M.d, 'var(--pos)')" /><text class="num" :x="sx(M.b) + 6" :y="sy(M.d) - 6" font-size="12" fill="var(--pos)">ĵ → ({{ fmt(M.b, 1) }}, {{ fmt(M.d, 1) }})</text>
      <line v-bind="arrow(v[0], v[1], 'var(--muted)', 2)" stroke-dasharray="4 3" /><circle :cx="sx(v[0])" :cy="sy(v[1])" r="6" fill="var(--panel)" stroke="var(--fg)" stroke-width="2" />
      <line v-bind="arrow(Mv[0], Mv[1], 'var(--fg)', 3)" /><circle :cx="sx(Mv[0])" :cy="sy(Mv[1])" r="6" fill="var(--fg)" />
      <text class="num" :x="sx(Mv[0]) + 8" :y="sy(Mv[1]) + 4" font-size="12" fill="var(--fg)">Mv</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
