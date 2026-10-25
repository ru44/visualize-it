<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// The closest-vector problem behind post-quantum lattice cryptography. The same grid of points is
// described by a short, near-perpendicular basis or by a long, skewed one. Rounding the target's
// coordinates (Babai's step) finds the closest point with the good basis — and misses with the bad one.
// params tx, ty (drag the target) and basis (0 good, 1 bad).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const U = 40 // pixels per unit
const C = { x: 400, y: 250 }
const GOOD = [[2, 1], [1, 2]] as const
const BAD = [[5, 4], [3, 3]] as const // the same lattice: [5,4] = 2u+v, [3,3] = u+v
const bad = computed(() => Math.round(props.params.basis ?? 0) >= 1)
const B = computed(() => (bad.value ? BAD : GOOD))
const tx = computed(() => Math.max(-8, Math.min(8, props.params.tx ?? 3.25)))
const ty = computed(() => Math.max(-8, Math.min(8, props.params.ty ?? 2.5)))
const px = (x: number) => C.x + x * U
const py = (y: number) => C.y - y * U
// Babai: write the target in basis coordinates, round, map back
const babai = computed(() => {
  const [[a, b], [c, d]] = B.value
  const det = a * d - b * c
  const ca = Math.round((tx.value * d - ty.value * c) / det)
  const cb = Math.round((ty.value * a - tx.value * b) / det)
  return { ca, cb, x: ca * a + cb * c, y: ca * b + cb * d }
})
// the true closest lattice point, by brute force
const best = computed(() => {
  let bst = { x: 0, y: 0, d: Infinity }
  for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) { const x = i * 2 + j; const y = i + j * 2; const d = Math.hypot(x - tx.value, y - ty.value); if (d < bst.d) bst = { x, y, d } }
  return bst
})
const found = computed(() => Math.hypot(babai.value.x - tx.value, babai.value.y - ty.value))
const hit = computed(() => Math.abs(found.value - best.value.d) < 1e-9)
const points = computed(() => { const out: { x: number; y: number }[] = []; for (let i = -10; i <= 10; i++) for (let j = -10; j <= 10; j++) { const x = i * 2 + j; const y = i + j * 2; if (Math.abs(x) <= 9.6 && Math.abs(y) <= 5.6) out.push({ x, y }) } return out })
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const r = svg.value.getBoundingClientRect()
  emit('set', 'tx', Math.round((((e.clientX - r.left) / r.width) * W - C.x) / U / 0.25) * 0.25)
  emit('set', 'ty', Math.round((-(((e.clientY - r.top) / r.height) * H - C.y)) / U / 0.25) * 0.25)
}
const readouts = computed(() => [
  { label: t('lattice.basis'), value: bad.value ? t('lattice.bad') : t('lattice.good'), color: bad.value ? 'var(--neg)' : 'var(--pos)' },
  { label: t('lattice.rounded'), value: `(${babai.value.ca}, ${babai.value.cb})` },
  { label: t('lattice.dist'), value: found.value.toFixed(2), color: hit.value ? 'var(--pos)' : 'var(--neg)' },
  { label: t('lattice.best'), value: best.value.d.toFixed(2), color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="dragging = true; svg?.setPointerCapture($event.pointerId); pick($event)" @pointermove="dragging && pick($event)" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('lattice.hint') }}</text>
      <!-- the lattice -->
      <circle v-for="(p, i) in points" :key="i" :cx="px(p.x)" :cy="py(p.y)" r="4" fill="var(--sunken)" stroke="var(--line)" />
      <!-- basis arrows -->
      <g v-for="(v, i) in B" :key="'b' + i">
        <line :x1="px(0)" :y1="py(0)" :x2="px(v[0])" :y2="py(v[1])" :stroke="bad ? 'var(--neg)' : 'var(--pos)'" stroke-width="3" />
        <circle :cx="px(v[0])" :cy="py(v[1])" r="5" :fill="bad ? 'var(--neg)' : 'var(--pos)'" />
        <text class="num" :x="px(v[0]) + 10" :y="py(v[1]) - 6" font-size="12" :fill="bad ? 'var(--neg)' : 'var(--pos)'">{{ i ? 'v' : 'u' }} ({{ v[0] }}, {{ v[1] }})</text>
      </g>
      <!-- Babai's answer and the true closest -->
      <line :x1="px(tx)" :y1="py(ty)" :x2="px(babai.x)" :y2="py(babai.y)" :stroke="hit ? 'var(--pos)' : 'var(--neg)'" stroke-width="2" stroke-dasharray="5 3" />
      <circle :cx="px(babai.x)" :cy="py(babai.y)" r="8" fill="none" :stroke="hit ? 'var(--pos)' : 'var(--neg)'" stroke-width="3" />
      <circle v-if="!hit" :cx="px(best.x)" :cy="py(best.y)" r="8" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-dasharray="3 3" />
      <text v-if="!hit" class="num" :x="px(best.x) + 12" :y="py(best.y) + 4" font-size="11" fill="var(--accent-2)">{{ t('lattice.actual') }}</text>
      <!-- the target -->
      <g class="num">
        <circle :cx="px(tx)" :cy="py(ty)" r="7" fill="var(--accent)" />
        <text :x="px(tx) + 12" :y="py(ty) + 4" font-size="12" fill="var(--accent)">t ({{ tx }}, {{ ty }})</text>
      </g>
      <text x="400" y="468" text-anchor="middle" font-size="12" :fill="hit ? 'var(--pos)' : 'var(--neg)'" font-weight="600">{{ hit ? t('lattice.hit') : t('lattice.miss') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
