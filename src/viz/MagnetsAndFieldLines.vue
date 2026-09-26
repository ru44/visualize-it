<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// electromagnetism/magnets-and-field-lines. params: m1, m2 (dipole moments, A·m^2), r (separation, m).
// Two bar magnets are drawn N-to-N (like poles facing) at separation r: B(r) = mu0/(2 pi) m1/r^3 is
// magnet 1's own field at that distance, and F(r) = 3 mu0/(2 pi) m1 m2 / r^4 is the repulsive force
// between them. A small static inset shows the classic single-magnet field-line loop pattern.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CY = 250
const MW = 130 // magnet half-length in px
const MH_BASE = 34

const MU0_OVER_2PI = 2e-7 // mu0 / (2 pi)

const m1 = computed(() => Math.max(props.params.m1 ?? 1, 0.001))
const m2 = computed(() => Math.max(props.params.m2 ?? 1, 0.001))
const r = computed(() => Math.max(props.params.r ?? 0.05, 0.001))

const B1 = computed(() => MU0_OVER_2PI * m1.value / r.value ** 3)
const F = computed(() => 3 * MU0_OVER_2PI * m1.value * m2.value / r.value ** 4)

const gapPx = computed(() => 44 + (r.value / 0.3) * 250)
const heightA = computed(() => MH_BASE + 16 * Math.sqrt(m1.value))
const heightB = computed(() => MH_BASE + 16 * Math.sqrt(m2.value))

const ax2 = computed(() => W / 2 - gapPx.value / 2) // magnet A right edge (its N pole)
const ax1 = computed(() => ax2.value - 2 * MW)
const bx1 = computed(() => W / 2 + gapPx.value / 2) // magnet B left edge (its N pole)
const bx2 = computed(() => bx1.value + 2 * MW)

// --- bulging "repelled" field lines between the two facing N poles ---
const fieldOpacity = computed(() => Math.min(1, 0.25 + (m1.value + m2.value) / 6))
const bulgeLines = computed(() => {
  const rows = [-70, -38, -12, 12, 38, 70]
  return rows.map((dy) => {
    const y0 = CY + dy
    const bow = 30 + Math.abs(dy) * 0.9
    const sign = dy < 0 ? -1 : dy > 0 ? 1 : dy === 0 ? 1 : 1
    const bendY = y0 + sign * bow * (dy === 0 ? 1.4 : 1)
    return `M${ax2.value},${y0} C${ax2.value + gapPx.value * 0.2},${bendY} ${bx1.value - gapPx.value * 0.2},${bendY} ${bx1.value},${y0}`
  })
})

// --- single-magnet inset (static, top-left corner): classic N-to-S loop field lines ---
const INSET_X = 130
const INSET_Y = 92
const insetLoops = [0.55, 0.8, 1.05].map((k) => {
  const rx = 30 * k
  const ry = 46 * k
  return `M${INSET_X + 22},${INSET_Y} C${INSET_X + 22 + rx},${INSET_Y - ry} ${INSET_X - 22 - rx},${INSET_Y - ry} ${INSET_X - 22},${INSET_Y} C${INSET_X - 22 - rx},${INSET_Y + ry} ${INSET_X + 22 + rx},${INSET_Y + ry} ${INSET_X + 22},${INSET_Y}`
})

// --- drag magnet B horizontally to set r ---
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const gap = Math.max(20, 2 * (px - W / 2))
  const newR = ((gap - 44) / 250) * 0.3
  emit('set', 'r', Math.min(0.3, Math.max(0.01, newR)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}

const forceArrow = computed(() => {
  const len = Math.min(90, 18 + Math.log10(1 + F.value * 40) * 45)
  return { len }
})

const readouts = computed(() => [
  { label: 'r', value: `${fmt(r.value * 100, 3)} cm` },
  { label: 'm₁, m₂', value: `${fmt(m1.value, 2)}, ${fmt(m2.value, 2)} A·m²` },
  { label: 'B = μ₀m₁/2πr³', value: `${fmt(B1.value * 1000, 3)} mT`, color: 'var(--accent)' },
  { label: 'F = 3μ₀m₁m₂/2πr⁴', value: `${fmt(F.value, 4)} N`, color: 'var(--neg)' },
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
      <text x="16" y="24" font-size="12" fill="var(--muted)">{{ t('mfl.hint') }}</text>

      <!-- inset: a single magnet's own field lines -->
      <g>
        <path v-for="(d, i) in insetLoops" :key="'ins' + i" :d="d" fill="none" stroke="var(--accent)" stroke-width="1.3" :stroke-opacity="0.55 - i * 0.12" />
        <rect :x="INSET_X - 22" :y="INSET_Y - 10" width="22" height="20" fill="var(--accent)" />
        <rect :x="INSET_X" :y="INSET_Y - 10" width="22" height="20" fill="var(--neg)" />
        <text :x="INSET_X" :y="INSET_Y + 34" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('mfl.singleLabel') }}</text>
      </g>

      <!-- bulging field lines pushed away from the N-N gap -->
      <path v-for="(d, i) in bulgeLines" :key="'b' + i" :d="d" fill="none" stroke="var(--accent-2)" stroke-width="2" :stroke-opacity="fieldOpacity" />

      <!-- magnet A: S (outer, left) | N (inner, right, facing gap) -->
      <g>
        <rect :x="ax1" :y="CY - heightA" :width="MW" :height="heightA * 2" fill="var(--accent)" stroke="var(--line)" />
        <rect :x="ax1 + MW" :y="CY - heightA" :width="MW" :height="heightA * 2" fill="var(--neg)" stroke="var(--line)" />
        <text :x="ax1 + MW / 2" :y="CY + 6" text-anchor="middle" font-size="22" font-weight="700" fill="white">S</text>
        <text :x="ax1 + MW * 1.5" :y="CY + 6" text-anchor="middle" font-size="22" font-weight="700" fill="white">N</text>
      </g>

      <!-- magnet B: N (inner, left, facing gap) | S (outer, right) -->
      <g>
        <rect :x="bx1" :y="CY - heightB" :width="MW" :height="heightB * 2" fill="var(--neg)" stroke="var(--line)" style="cursor: ew-resize" />
        <rect :x="bx1 + MW" :y="CY - heightB" :width="MW" :height="heightB * 2" fill="var(--accent)" stroke="var(--line)" style="cursor: ew-resize" />
        <text :x="bx1 + MW / 2" :y="CY + 6" text-anchor="middle" font-size="22" font-weight="700" fill="white">N</text>
        <text :x="bx1 + MW * 1.5" :y="CY + 6" text-anchor="middle" font-size="22" font-weight="700" fill="white">S</text>
      </g>

      <!-- force arrows pushing the magnets apart -->
      <line :x1="ax1" :y1="CY - 100" :x2="ax1 - forceArrow.len" :y2="CY - 100" stroke="var(--neg)" stroke-width="3" marker-end="url(#mflArrow)" />
      <line :x1="bx2" :y1="CY - 100" :x2="bx2 + forceArrow.len" :y2="CY - 100" stroke="var(--neg)" stroke-width="3" marker-end="url(#mflArrow)" />
      <defs>
        <marker id="mflArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--neg)" />
        </marker>
      </defs>

      <text :x="W / 2" :y="H - 34" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('mfl.repelCaption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
