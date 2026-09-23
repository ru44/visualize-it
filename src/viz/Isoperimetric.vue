<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three shapes that all share the same perimeter P: a rectangle whose width is a fraction f of
// half the perimeter (so w + h = P/2 always), a square, and a circle. Dragging the rectangle's
// edge changes f but never the perimeter, so the three areas can be compared honestly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const bandY = 210
const cxRect = 150
const cxSquare = 400
const cxCircle = 650

const P = computed(() => Math.min(32, Math.max(12, props.params.P ?? 24)))
const f = computed(() => Math.min(0.95, Math.max(0.05, props.params.f ?? 0.5)))
const w = computed(() => f.value * (P.value / 2))
const h = computed(() => (1 - f.value) * (P.value / 2))
const areaRect = computed(() => w.value * h.value)

const squareSide = computed(() => P.value / 4)
const areaSquare = computed(() => squareSide.value ** 2)

const circleR = computed(() => P.value / (2 * Math.PI))
const areaCircle = computed(() => Math.PI * circleR.value ** 2)

const PX = computed(() => {
  const maxExtent = Math.max(w.value, h.value, squareSide.value, circleR.value * 2)
  return 300 / maxExtent
})

const readouts = computed(() => [
  { label: 'w', value: `${fmt(w.value, 2)} m`, color: 'var(--accent-2)' },
  { label: 'h', value: `${fmt(h.value, 2)} m`, color: 'var(--accent-2)' },
  { label: t('area-perimeter.rect'), value: `${fmt(areaRect.value, 2)} m²`, color: 'var(--accent-2)' },
  { label: t('area-perimeter.square'), value: `${fmt(areaSquare.value, 2)} m²`, color: 'var(--pos)' },
  { label: t('area-perimeter.circle'), value: `${fmt(areaCircle.value, 2)} m²`, color: 'var(--accent)' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const sx = ((e.clientX - box.left) / box.width) * W
  const dx = Math.abs(sx - cxRect)
  const newW = Math.min(0.95 * (P.value / 2), Math.max(0.05 * (P.value / 2), (2 * dx) / PX.value))
  emit('set', 'f', newW / (P.value / 2))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
function up() {
  dragging.value = false
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointermove="drag" @pointerup="up" @pointercancel="up">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('area-perimeter.hint') }}</text>

      <rect :x="cxRect - (w * PX) / 2" :y="bandY - (h * PX) / 2" :width="w * PX" :height="h * PX" fill="var(--accent-2)" fill-opacity="0.18" stroke="var(--accent-2)" stroke-width="2" />
      <rect :x="cxSquare - (squareSide * PX) / 2" :y="bandY - (squareSide * PX) / 2" :width="squareSide * PX" :height="squareSide * PX" fill="var(--pos)" fill-opacity="0.12" stroke="var(--pos)" stroke-width="2" />
      <circle :cx="cxCircle" :cy="bandY" :r="circleR * PX" fill="var(--accent)" fill-opacity="0.1" stroke="var(--accent)" stroke-width="2" />

      <g class="num" font-size="13">
        <text :x="cxRect" :y="bandY + h * PX * 0.5 + 40" text-anchor="middle" fill="var(--accent-2)">{{ t('area-perimeter.rect') }}: {{ fmt(areaRect, 2) }} m²</text>
        <text :x="cxSquare" :y="bandY + squareSide * PX * 0.5 + 40" text-anchor="middle" fill="var(--pos)">{{ t('area-perimeter.square') }}: {{ fmt(areaSquare, 2) }} m²</text>
        <text :x="cxCircle" :y="bandY + circleR * PX + 40" text-anchor="middle" fill="var(--accent)">{{ t('area-perimeter.circle') }}: {{ fmt(areaCircle, 2) }} m²</text>
      </g>
      <text class="num" x="400" y="440" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('area-perimeter.same') }}: P = {{ fmt(P, 1) }} m</text>

      <circle :cx="cxRect + (w * PX) / 2" :cy="bandY" r="8" fill="var(--panel)" stroke="var(--accent-2)" stroke-width="2" class="cursor-grab" @pointerdown="down" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
