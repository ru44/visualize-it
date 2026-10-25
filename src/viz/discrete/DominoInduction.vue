<script setup lang="ts">
import { computed, ref } from 'vue'
import { t } from '../../i18n'
import Readouts from '../../components/Readouts.vue'

// discrete/proof-by-induction. param x = n. Top: a row of dominoes — the base case is the push on
// domino 1, the inductive step is "any falling domino knocks over the next", and together they
// flatten the first n. Bottom: the staircase 1+2+…+n paired with its upside-down ghost to fill an
// n×(n+1) rectangle — the picture behind the formula n(n+1)/2.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const n = computed(() => Math.min(Math.max(Math.round(props.params.x ?? 10), 0), 20))
const sum = computed(() => (n.value * (n.value + 1)) / 2)

const DX0 = 70
const DSP = 32
const DW = 13
const DH = 58
const DY = 160 // baseline of the dominoes
const dominoes = computed(() =>
  Array.from({ length: 20 }, (_, idx) => {
    const k = idx + 1
    return { k, x: DX0 + idx * DSP, fallen: k <= n.value }
  }),
)

// staircase panel: columns 1..n of unit cells plus the inverted ghost = n × (n+1) rectangle
const CS = computed(() => (n.value >= 16 ? 10 : n.value >= 9 ? 13 : 18))
const GX = 110
const GY = 452 // bottom edge
const cells = computed(() => {
  const real: { x: number; y: number }[] = []
  const ghost: { x: number; y: number }[] = []
  for (let col = 1; col <= n.value; col++)
    for (let row = 1; row <= n.value + 1; row++) {
      const c = { x: GX + (col - 1) * CS.value, y: GY - row * CS.value }
      if (row <= col) real.push(c)
      else ghost.push(c)
    }
  return { real, ghost }
})

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'x', Math.min(20, Math.max(0, Math.round((px - DX0 + DSP / 2) / DSP))))
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  if (((ev.clientY - box.top) / box.height) * H > 230) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: 'n', value: String(n.value) },
  { label: '1 + 2 + … + n', value: String(sum.value), color: 'var(--accent)' },
  { label: 'n(n+1)/2', value: String(sum.value), color: 'var(--accent-2)' },
  { label: t('dom.rect'), value: `${n.value} × ${n.value + 1} = ${n.value * (n.value + 1)}` },
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
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('dom.hint') }}</text>
      <!-- the dominoes -->
      <line :x1="DX0 - 20" :y1="DY" :x2="DX0 + 19 * DSP + 40" :y2="DY" stroke="var(--line)" />
      <g v-for="d in dominoes" :key="d.k" :transform="d.fallen ? `rotate(72, ${d.x + DW}, ${DY})` : ''">
        <rect :x="d.x" :y="DY - DH" :width="DW" :height="DH" rx="3" :fill="d.fallen ? 'var(--accent)' : 'var(--panel)'" :stroke="d.fallen ? 'var(--accent)' : 'var(--line)'" stroke-width="1.5" />
      </g>
      <text v-for="lbl in [1, 5, 10, 15, 20]" :key="'l' + lbl" :x="DX0 + (lbl - 1) * DSP + DW / 2" :y="DY + 18" text-anchor="middle" font-size="10" fill="var(--muted)" class="num">{{ lbl }}</text>
      <!-- base case: the push -->
      <text :x="DX0 - 36" :y="DY - DH + 14" font-size="16" fill="var(--accent)">👉</text>
      <text :x="DX0 - 8" :y="DY + 36" font-size="10" fill="var(--accent)">{{ t('dom.base') }}</text>
      <!-- inductive step: k knocks over k+1 -->
      <g v-if="n >= 1 && n < 20">
        <path :d="`M${DX0 + (n - 1) * DSP + DW},${DY - DH - 12} q${DSP / 2},-14 ${DSP},0`" fill="none" stroke="var(--accent-2)" stroke-width="2" />
        <text :x="DX0 + (n - 0.5) * DSP + DW" :y="DY - DH - 30" text-anchor="middle" font-size="10" fill="var(--accent-2)">{{ t('dom.step') }}</text>
      </g>
      <text :x="DX0 + 19 * DSP + 40" :y="DY - 20" text-anchor="end" font-size="11" fill="var(--fg)" class="num">n = {{ n }}</text>
      <!-- the staircase proof of the formula -->
      <g v-if="n >= 1">
        <rect v-for="(c, idx) in cells.ghost" :key="'g' + idx" :x="c.x" :y="c.y" :width="CS - 1" :height="CS - 1" fill="var(--sunken)" stroke="var(--line)" stroke-width="0.5" />
        <rect v-for="(c, idx) in cells.real" :key="'r' + idx" :x="c.x" :y="c.y" :width="CS - 1" :height="CS - 1" fill="var(--accent)" opacity="0.85" />
        <rect :x="GX" :y="GY - (n + 1) * CS" :width="n * CS" :height="(n + 1) * CS" fill="none" stroke="var(--accent-2)" stroke-width="1.5" />
        <text :x="GX + (n * CS) / 2" :y="GY + 16" text-anchor="middle" font-size="11" fill="var(--accent-2)" class="num">n = {{ n }}</text>
        <text :x="GX - 8" :y="GY - ((n + 1) * CS) / 2" text-anchor="end" font-size="11" fill="var(--accent-2)" class="num">n+1</text>
        <text :x="GX + n * CS + 28" :y="GY - (n + 1) * CS + 24" font-size="13" fill="var(--fg)" class="num">1 + 2 + … + {{ n }} = {{ sum }}</text>
        <text :x="GX + n * CS + 28" :y="GY - (n + 1) * CS + 50" font-size="13" fill="var(--accent)" class="num">{{ n }} · {{ n + 1 }} / 2 = {{ sum }}</text>
        <text :x="GX + n * CS + 28" :y="GY - (n + 1) * CS + 74" font-size="11" fill="var(--muted)">{{ t('dom.twin') }}</text>
      </g>
      <text v-if="n === 0" x="400" y="340" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('dom.empty') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
