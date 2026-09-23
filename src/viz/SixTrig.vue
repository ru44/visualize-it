<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// All six trig functions as lengths on one unit circle: sin/cos as the point's coordinates,
// tan/cot as the segments cut on the two tangent lines (x=1 and y=1), sec/csc as the segments
// from the centre out to those same tangent lines. params: theta (degrees).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const cx = 300
const cy = 250
const R = 130
const MAXV = 6 // hide tan/cot/sec/csc once they run this many radii past the circle

const sx = (x: number) => cx + R * x
const sy = (y: number) => cy - R * y

const theta = computed(() => props.params.theta ?? 30)
const rad = computed(() => (theta.value * Math.PI) / 180)
const c = computed(() => Math.cos(rad.value))
const s = computed(() => Math.sin(rad.value))
const tanV = computed(() => s.value / c.value)
const cotV = computed(() => c.value / s.value)
const okTan = computed(() => Math.abs(c.value) > 1 / (MAXV * 2) && Math.abs(tanV.value) <= MAXV)
const okCot = computed(() => Math.abs(s.value) > 1 / (MAXV * 2) && Math.abs(cotV.value) <= MAXV)

const P = computed(() => ({ x: sx(c.value), y: sy(s.value) }))
const F = computed(() => ({ x: sx(c.value), y: sy(0) })) // foot of sin
const T = computed(() => ({ x: sx(1), y: sy(tanV.value) })) // on tangent line x=1
const Cc = computed(() => ({ x: sx(cotV.value), y: sy(1) })) // on tangent line y=1

const readouts = computed(() => [
  { label: 'θ', value: `${fmt(theta.value, 1)}°` },
  { label: t('sixtrig.sin'), value: fmt(s.value, 4), color: 'var(--accent-2)' },
  { label: t('sixtrig.cos'), value: fmt(c.value, 4), color: 'var(--accent)' },
  { label: t('sixtrig.tan'), value: okTan.value ? fmt(tanV.value, 4) : '±∞', color: 'var(--pos)' },
  { label: t('sixtrig.cot'), value: okCot.value ? fmt(cotV.value, 4) : '±∞', color: 'var(--neg)' },
  { label: t('sixtrig.sec'), value: okTan.value ? fmt(1 / c.value, 4) : '±∞', color: 'var(--fg)' },
  { label: t('sixtrig.csc'), value: okCot.value ? fmt(1 / s.value, 4) : '±∞', color: 'var(--muted)' },
])

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function angleAt(clientX: number, clientY: number) {
  if (!svg.value) return theta.value
  const box = svg.value.getBoundingClientRect()
  const x = ((clientX - box.left) / box.width) * W
  const y = ((clientY - box.top) / box.height) * H
  const deg = (Math.atan2(-(y - cy), x - cx) * 180) / Math.PI
  return ((deg % 360) + 360) % 360
}
function drag(e: PointerEvent) {
  if (!dragging.value) return
  emit('set', 'theta', Math.round(angleAt(e.clientX, e.clientY)))
}
function down(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  drag(e)
}
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full touch-none select-none" @pointerdown="down" @pointermove="drag" @pointerup="dragging = false" @pointercancel="dragging = false">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sixtrig.hint') }}</text>
      <line :x1="sx(1)" :x2="sx(1)" :y1="sy(-MAXV)" :y2="sy(MAXV)" stroke="var(--line)" stroke-dasharray="4 4" />
      <line :x1="sx(-MAXV)" :x2="sx(MAXV)" :y1="sy(1)" :y2="sy(1)" stroke="var(--line)" stroke-dasharray="4 4" />
      <line :x1="sx(-1.6)" :x2="sx(1.6)" :y1="sy(0)" :y2="sy(0)" stroke="var(--line)" />
      <line :x1="sx(0)" :x2="sx(0)" :y1="sy(-1.6)" :y2="sy(1.6)" stroke="var(--line)" />
      <circle :cx="sx(0)" :cy="sy(0)" :r="R" fill="var(--sunken)" fill-opacity="0.4" stroke="var(--line)" />

      <line v-if="okCot" :x1="sx(0)" :y1="sy(0)" :x2="Cc.x" :y2="Cc.y" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4" />
      <line v-if="okTan" :x1="sx(0)" :y1="sy(0)" :x2="T.x" :y2="T.y" stroke="var(--fg)" stroke-width="2" stroke-dasharray="6 4" />
      <line :x1="sx(0)" :y1="sy(0)" :x2="P.x" :y2="P.y" stroke="var(--muted)" stroke-width="1.5" />

      <line :x1="sx(0)" :y1="sy(0)" :x2="F.x" :y2="F.y" stroke="var(--accent)" stroke-width="3.5" />
      <line :x1="F.x" :y1="F.y" :x2="P.x" :y2="P.y" stroke="var(--accent-2)" stroke-width="3.5" />
      <line v-if="okTan" :x1="sx(1)" :y1="sy(0)" :x2="T.x" :y2="T.y" stroke="var(--pos)" stroke-width="3.5" />
      <line v-if="okCot" :x1="sx(0)" :y1="sy(1)" :x2="Cc.x" :y2="Cc.y" stroke="var(--neg)" stroke-width="3.5" />

      <circle :cx="P.x" :cy="P.y" r="6" fill="var(--fg)" />
      <circle v-if="okTan" :cx="T.x" :cy="T.y" r="4" fill="var(--pos)" />
      <circle v-if="okCot" :cx="Cc.x" :cy="Cc.y" r="4" fill="var(--neg)" />

      <g class="num" font-size="12">
        <text :x="(sx(0) + F.x) / 2" :y="sy(0) + 16" text-anchor="middle" fill="var(--accent)">cos</text>
        <text :x="F.x + (P.y < F.y ? 12 : -12)" :y="(F.y + P.y) / 2" text-anchor="middle" fill="var(--accent-2)">sin</text>
        <text v-if="okTan" :x="T.x + 12" :y="(sy(0) + T.y) / 2" fill="var(--pos)">tan</text>
        <text v-if="okCot" :x="(sx(0) + Cc.x) / 2" :y="Cc.y - 8" text-anchor="middle" fill="var(--neg)">cot</text>
        <text v-if="okTan" :x="(sx(0) + T.x) / 2 + 6" :y="(sy(0) + T.y) / 2 - 22" fill="var(--fg)">sec</text>
        <text v-if="okCot" :x="(sx(0) + Cc.x) / 2 - 30" :y="(sy(0) + Cc.y) / 2 + 4" fill="var(--muted)">csc</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
