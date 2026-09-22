<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// z = a + bi and w = c + di on the complex plane, with z·w (or z^n) shown. options.op: 'mul' | 'pow'.
// params a, b, c, d (or n for pow). Drag sets z.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const U = 55
const O = { x: W / 2, y: H / 2 }
const sx = (x: number) => O.x + x * U
const sy = (y: number) => O.y - y * U
const z = computed(() => [props.params.a ?? 1, props.params.b ?? 1] as [number, number])
const w = computed(() => [props.params.c ?? 0, props.params.d ?? 1] as [number, number])
const mul = (p: [number, number], q: [number, number]): [number, number] => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]]
const polar = (p: [number, number]) => ({ r: Math.hypot(p[0], p[1]), th: Math.atan2(p[1], p[0]) })
const isPow = computed(() => props.options.op === 'pow')
const n = computed(() => Math.max(1, Math.round(props.params.n ?? 2)))
const result = computed(() => {
  if (!isPow.value) return mul(z.value, w.value)
  let r: [number, number] = [1, 0]
  for (let i = 0; i < n.value; i++) r = mul(r, z.value)
  return r
})
const powers = computed(() => {
  if (!isPow.value) return []
  const out: [number, number][] = []
  let r: [number, number] = [1, 0]
  for (let i = 0; i < n.value; i++) (r = mul(r, z.value)), out.push(r)
  return out
})
const arc = (p: [number, number], rad: number) => {
  const th = Math.atan2(p[1], p[0])
  const large = Math.abs(th) > Math.PI ? 1 : 0
  return `M${sx(rad / U)},${sy(0)} A${rad},${rad} 0 ${large} ${th >= 0 ? 0 : 1} ${sx((rad / U) * Math.cos(th))},${sy((rad / U) * Math.sin(th))}`
}
const pz = computed(() => polar(z.value))
const pr = computed(() => polar(result.value))
const readouts = computed(() => [
  { label: 'z', value: `${fmt(z.value[0], 2)} ${z.value[1] < 0 ? '−' : '+'} ${fmt(Math.abs(z.value[1]), 2)}i`, color: 'var(--accent)' },
  { label: '|z|, arg z', value: `${fmt(pz.value.r, 3)}, ${fmt((pz.value.th * 180) / Math.PI, 1)}°` },
  ...(isPow.value ? [] : [{ label: 'w', value: `${fmt(w.value[0], 2)} ${w.value[1] < 0 ? '−' : '+'} ${fmt(Math.abs(w.value[1]), 2)}i`, color: 'var(--pos)' }]),
  { label: isPow.value ? `z^${n.value}` : 'z·w', value: `${fmt(result.value[0], 2)} ${result.value[1] < 0 ? '−' : '+'} ${fmt(Math.abs(result.value[1]), 2)}i`, color: 'var(--accent-2)' },
  { label: isPow.value ? `|z|^${n.value}, ${n.value}·arg z` : '|z||w|, arg z + arg w', value: `${fmt(pr.value.r, 3)}, ${fmt((pr.value.th * 180) / Math.PI, 1)}°` },
])
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const bx = svg.value.getBoundingClientRect()
  emit('set', 'a', (((e.clientX - bx.left) / bx.width) * W - O.x) / U)
  emit('set', 'b', (O.y - ((e.clientY - bx.top) / bx.height) * H) / U)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('complex.hint') }}</text>
      <g stroke="var(--grid)"><line v-for="k in 15" :key="'g' + k" :x1="sx(k - 8)" :x2="sx(k - 8)" y1="0" :y2="H" /><line v-for="k in 9" :key="'h' + k" x1="0" :x2="W" :y1="sy(k - 5)" :y2="sy(k - 5)" /></g>
      <circle :cx="sx(0)" :cy="sy(0)" :r="U" fill="none" stroke="var(--line)" stroke-dasharray="4 4" />
      <line x1="0" :x2="W" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" /><line :x1="sx(0)" :x2="sx(0)" y1="0" :y2="H" stroke="var(--muted)" />
      <text class="num" :x="W - 16" :y="sy(0) - 8" text-anchor="end" font-size="12" fill="var(--muted)">Re</text><text class="num" :x="sx(0) + 8" y="16" font-size="12" fill="var(--muted)">Im</text>
      <path :d="arc(z, 34)" fill="none" stroke="var(--accent)" stroke-width="2" />
      <path :d="arc(result, 46)" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <template v-if="isPow"><circle v-for="(p, i) in powers" :key="i" :cx="sx(p[0])" :cy="sy(p[1])" r="4" fill="var(--accent-2)" fill-opacity="0.5" /><polyline :points="[[1, 0], ...powers].map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ')" fill="none" stroke="var(--accent-2)" stroke-opacity="0.4" /></template>
      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(z[0])" :y2="sy(z[1])" stroke="var(--accent)" stroke-width="2.5" /><circle :cx="sx(z[0])" :cy="sy(z[1])" r="6" fill="var(--accent)" /><text class="num" :x="sx(z[0]) + 8" :y="sy(z[1]) - 6" font-size="13" fill="var(--accent)">z</text>
      <template v-if="!isPow"><line :x1="sx(0)" :y1="sy(0)" :x2="sx(w[0])" :y2="sy(w[1])" stroke="var(--pos)" stroke-width="2.5" /><circle :cx="sx(w[0])" :cy="sy(w[1])" r="5" fill="var(--pos)" /><text class="num" :x="sx(w[0]) + 8" :y="sy(w[1]) - 6" font-size="13" fill="var(--pos)">w</text></template>
      <line :x1="sx(0)" :y1="sy(0)" :x2="sx(result[0])" :y2="sy(result[1])" stroke="var(--accent-2)" stroke-width="3" /><circle :cx="sx(result[0])" :cy="sy(result[1])" r="6" fill="var(--accent-2)" /><text class="num" :x="sx(result[0]) + 8" :y="sy(result[1]) - 6" font-size="13" fill="var(--accent-2)">{{ isPow ? `z^${n}` : 'z·w' }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
