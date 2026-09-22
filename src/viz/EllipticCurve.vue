<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Adding points on y² = x³ + a·x + b: draw the line through P and Q, find where it meets the curve a third time,
// flip that point over the x-axis: that is P + Q. Repeating this is the "multiplication" used by modern encryption.
// params a, b, px, qx (x-coordinates of P and Q; both taken on the upper half of the curve).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const a = computed(() => props.params.a ?? -1)
const b = computed(() => props.params.b ?? 1)
const rhs = (x: number) => x ** 3 + a.value * x + b.value
const U = 70
const O = { x: 360, y: 240 }
const sx = (x: number) => O.x + x * U
const sy = (y: number) => O.y - y * U
const branch = (sign: number) => { const pts: string[] = []; let pen = false; for (let i = 0; i <= 600; i++) { const x = -3 + (i / 600) * 8; const r = rhs(x); if (r < 0) { pen = false; continue } pts.push(`${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(sign * Math.sqrt(r)).toFixed(1)}`); pen = true } return pts.join('') }
const point = (x: number) => (rhs(x) >= 0 ? { x, y: Math.sqrt(rhs(x)) } : null)
const P = computed(() => point(props.params.px ?? -1))
const Q = computed(() => point(props.params.qx ?? 0.5))
const singular = computed(() => Math.abs(4 * a.value ** 3 + 27 * b.value ** 2) < 1e-6)
const sum = computed(() => {
  if (!P.value || !Q.value) return null
  const p = P.value, q = Q.value
  const same = Math.abs(p.x - q.x) < 1e-9
  if (same && p.y === 0) return null
  const lam = same ? (3 * p.x ** 2 + a.value) / (2 * p.y) : (q.y - p.y) / (q.x - p.x)
  const x3 = lam ** 2 - p.x - q.x
  const y3 = lam * (p.x - x3) - p.y
  return { lam, x3, y3 }
})
const lineEnds = computed(() => { if (!sum.value || !P.value) return null; const { lam } = sum.value; const f = (x: number) => P.value!.y + lam * (x - P.value!.x); return { x1: sx(-3), y1: sy(f(-3)), x2: sx(5), y2: sy(f(5)) } })
const readouts = computed(() => [
  { label: 'P', value: P.value ? `(${fmt(P.value.x, 2)}, ${fmt(P.value.y, 2)})` : t('ec.off'), color: 'var(--accent)' },
  { label: 'Q', value: Q.value ? `(${fmt(Q.value.x, 2)}, ${fmt(Q.value.y, 2)})` : t('ec.off'), color: 'var(--pos)' },
  { label: 'P + Q', value: sum.value ? `(${fmt(sum.value.x3, 2)}, ${fmt(sum.value.y3, 2)})` : '—', color: 'var(--accent-2)' },
  ...(singular.value ? [{ label: t('ec.warning'), value: t('ec.singular'), color: 'var(--neg)' }] : []),
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('ec.hint') }}</text>
      <line x1="0" :x2="W" :y1="O.y" :y2="O.y" stroke="var(--line)" /><line :x1="O.x" :x2="O.x" y1="0" :y2="H" stroke="var(--line)" />
      <path :d="branch(1)" fill="none" stroke="var(--fg)" stroke-width="2.5" /><path :d="branch(-1)" fill="none" stroke="var(--fg)" stroke-width="2.5" />
      <template v-if="sum && lineEnds">
        <line v-bind="lineEnds" stroke="var(--muted)" stroke-dasharray="6 4" />
        <circle :cx="sx(sum.x3)" :cy="sy(-sum.y3)" r="6" fill="none" stroke="var(--muted)" stroke-width="2" />
        <line :x1="sx(sum.x3)" :x2="sx(sum.x3)" :y1="sy(-sum.y3)" :y2="sy(sum.y3)" stroke="var(--accent-2)" stroke-dasharray="4 3" />
        <circle :cx="sx(sum.x3)" :cy="sy(sum.y3)" r="8" fill="var(--accent-2)" /><text class="num" :x="sx(sum.x3) + 12" :y="sy(sum.y3) + 4" font-size="14" fill="var(--accent-2)">P + Q</text>
      </template>
      <template v-if="P"><circle :cx="sx(P.x)" :cy="sy(P.y)" r="7" fill="var(--accent)" /><text class="num" :x="sx(P.x) - 12" :y="sy(P.y) - 10" font-size="14" fill="var(--accent)">P</text></template>
      <template v-if="Q"><circle :cx="sx(Q.x)" :cy="sy(Q.y)" r="7" fill="var(--pos)" /><text class="num" :x="sx(Q.x) + 10" :y="sy(Q.y) - 10" font-size="14" fill="var(--pos)">Q</text></template>
      <text class="num" x="16" y="460" font-size="12" fill="var(--muted)">y² = x³ {{ a < 0 ? '−' : '+' }} {{ fmt(Math.abs(a), 1) }}x {{ b < 0 ? '−' : '+' }} {{ fmt(Math.abs(b), 1) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
