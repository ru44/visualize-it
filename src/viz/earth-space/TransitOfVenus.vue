<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, auFrom, errPct, lightTime, AU_REAL, SUN_ARCSEC, K_GAP, EARTH_D } from './transitOfVenusModel'

// earth-space/transit-of-venus. params b (km between the two observers), delta (arcseconds between the
// two tracks, the shift you measure) and t (% of the way Venus has crossed the Sun).
// Left: the Sun's disc as the two observers see it, with their two tracks. The gap between the tracks is
// drawn K_GAP times bigger than it really is (the label says so). Right: a side view, not to scale, with
// the two sight lines crossing at Venus. Drag the lower track to set delta, an observer to set b.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const au = computed(() => auFrom(p.value.b, p.value.delta))
const err = computed(() => errPct(au.value))
const light = computed(() => lightTime(au.value))
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start')) // keeps left-anchored text on the left in RTL
const NORTH = 'var(--accent)'
const SOUTH = 'var(--pos)'

// ---- left: the Sun's disc ----
const CX = 200
const CY = 235
const SR = 130
const D = 2 * SR
const gapPx = computed(() => (K_GAP * p.value.delta * D) / SUN_ARCSEC)
const yN = computed(() => CY + gapPx.value / 2) // seen from the north, Venus crosses lower
const yS = computed(() => CY - gapPx.value / 2)
const half = (y: number) => Math.sqrt(Math.max(0, SR * SR - (y - CY) ** 2))
const venusX = (y: number) => CX - half(y) + p.value.t * 2 * half(y)
const realPct = computed(() => fmt((p.value.delta / SUN_ARCSEC) * 100, 1))

// ---- right: side view ----
const E = { x: 450, y: 260, r: 44 }
const V = { x: 585, y: 260 }
const SUN = { x: 880, y: 260, r: 145 }
const SUN_EDGE = SUN.x - SUN.r
const pxPerKm = E.r / (EARTH_D / 2)
const obsH = computed(() => (p.value.b / 2) * pxPerKm)
const obsX = computed(() => E.x + Math.sqrt(E.r * E.r - obsH.value ** 2))
const landY = (yo: number) => V.y + ((V.y - yo) * (SUN_EDGE - V.x)) / (V.x - obsX.value)
const yoN = computed(() => E.y - obsH.value) // the north observer is the upper one
const yoS = computed(() => E.y + obsH.value)

// ---- dragging ----
const svg = ref<SVGSVGElement>()
const drag = ref<'delta' | 'b' | null>(null)
const svgY = (e: PointerEvent) => {
  const r = svg.value!.getBoundingClientRect()
  return ((e.clientY - r.top) * H) / r.height
}
function down(kind: 'delta' | 'b', e: PointerEvent) {
  drag.value = kind
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  move(e)
}
function move(e: PointerEvent) {
  if (!drag.value) return
  const y = svgY(e)
  if (drag.value === 'delta') {
    const v = (2 * (y - CY) * SUN_ARCSEC) / (K_GAP * D)
    emit('set', 'delta', Math.round(Math.max(2, Math.min(60, v)) * 10) / 10)
  } else {
    const km = (2 * (E.y - y)) / pxPerKm
    emit('set', 'b', Math.round(Math.max(1000, Math.min(12000, km)) / 100) * 100)
  }
}
const up = () => (drag.value = null)

const readouts = computed(() => [
  { label: t('transit-of-venus.r.b'), value: `${Math.round(p.value.b).toLocaleString('en-US')} km` },
  { label: t('transit-of-venus.r.shift'), value: `${fmt(p.value.delta, 1)}″` },
  { label: t('transit-of-venus.r.au'), value: t('transit-of-venus.mkm', { v: fmt(au.value, 1) }), color: 'var(--accent)' },
  { label: t('transit-of-venus.r.real'), value: t('transit-of-venus.mkm', { v: fmt(AU_REAL, 1) }) },
  {
    label: t('transit-of-venus.r.err'),
    value: `${err.value > 0 ? '+' : ''}${fmt(err.value, 1)} %`,
    color: Math.abs(err.value) < 2 ? 'var(--pos)' : 'var(--neg)',
  },
  { label: t('transit-of-venus.r.light'), value: t('transit-of-venus.light', { m: light.value.m, s: light.value.s }) },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text :x="16" y="20" :text-anchor="start" font-size="13" fill="var(--muted)" :direction="dir">{{ t('transit-of-venus.hint') }}</text>
      <line x1="400" y1="34" x2="400" y2="H - 20" stroke="var(--line)" />

      <!-- left: the Sun as the two observers see it -->
      <text :x="CX" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('transit-of-venus.title.left') }}</text>
      <circle :cx="CX" :cy="CY" :r="SR" fill="var(--accent-2)" fill-opacity="0.22" stroke="var(--accent-2)" stroke-width="2" />
      <g>
        <line :x1="CX - half(yS)" :x2="CX + half(yS)" :y1="yS" :y2="yS" :stroke="SOUTH" stroke-width="2.5" />
        <line :x1="CX - half(yN)" :x2="CX + half(yN)" :y1="yN" :y2="yN" :stroke="NORTH" stroke-width="2.5" />
        <circle :cx="venusX(yS)" :cy="yS" r="4.3" fill="var(--fg)" stroke="var(--panel)" stroke-width="1.5" />
        <circle :cx="venusX(yN)" :cy="yN" r="4.3" fill="var(--fg)" stroke="var(--panel)" stroke-width="1.5" />
      </g>
      <!-- grip on the lower track -->
      <g class="touch-none" style="cursor: ns-resize" @pointerdown="down('delta', $event)" @pointermove="move" @pointerup="up" @pointercancel="up">
        <line :x1="CX - half(yN) - 14" :x2="CX - half(yN)" :y1="yN" :y2="yN" :stroke="NORTH" stroke-width="1.5" stroke-dasharray="3 3" />
        <circle :cx="CX - half(yN) - 22" :cy="yN" r="9" fill="var(--panel)" :stroke="NORTH" stroke-width="2.5" />
        <path :d="`M${CX - half(yN) - 22} ${yN - 4} l-3 3 h6 z M${CX - half(yN) - 22} ${yN + 4} l-3 -3 h6 z`" :fill="NORTH" />
        <circle :cx="CX - half(yN) - 22" :cy="yN" r="20" fill="transparent" />
        <rect :x="CX - 60" :y="yN - 11" width="120" height="22" fill="transparent" />
      </g>
      <!-- legend and the honest size of the gap -->
      <line x1="40" x2="62" y1="396" y2="396" :stroke="NORTH" stroke-width="3" />
      <text x="70" y="400" font-size="13" fill="var(--fg)" :direction="dir" :text-anchor="start">{{ t('transit-of-venus.north') }}</text>
      <line x1="40" x2="62" y1="418" y2="418" :stroke="SOUTH" stroke-width="3" />
      <text x="70" y="422" font-size="13" fill="var(--fg)" :direction="dir" :text-anchor="start">{{ t('transit-of-venus.south') }}</text>
      <text :x="CX" y="448" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent-2)" :direction="dir">
        {{ t('transit-of-venus.gap1', { k: K_GAP }) }}
      </text>
      <text :x="CX" y="466" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('transit-of-venus.gap2', { p: realPct }) }}</text>

      <!-- right: side view, not to scale -->
      <text x="600" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('transit-of-venus.title.right') }}
      </text>
      <circle :cx="SUN.x" :cy="SUN.y" :r="SUN.r" fill="var(--accent-2)" fill-opacity="0.22" stroke="var(--accent-2)" stroke-width="2" />
      <text x="772" y="200" text-anchor="middle" font-size="13" fill="var(--fg)" :direction="dir">{{ t('transit-of-venus.sun') }}</text>
      <line :x1="E.x" :x2="SUN_EDGE" :y1="E.y" :y2="E.y" stroke="var(--line)" stroke-dasharray="4 4" />
      <!-- the two sight lines: each runs from its observer through Venus and on to the Sun -->
      <line :x1="obsX" :y1="yoN" :x2="SUN_EDGE" :y2="landY(yoN)" :stroke="NORTH" stroke-width="2" />
      <line :x1="obsX" :y1="yoS" :x2="SUN_EDGE" :y2="landY(yoS)" :stroke="SOUTH" stroke-width="2" />
      <circle :cx="SUN_EDGE" :cy="landY(yoN)" r="5" :fill="NORTH" />
      <circle :cx="SUN_EDGE" :cy="landY(yoS)" r="5" :fill="SOUTH" />
      <circle :cx="E.x" :cy="E.y" :r="E.r" fill="var(--panel)" stroke="var(--muted)" stroke-width="2" />
      <circle :cx="V.x" :cy="V.y" r="6" fill="var(--fg)" stroke="var(--panel)" stroke-width="1.5" />
      <text
        :x="V.x"
        :y="V.y - 26"
        text-anchor="middle"
        font-size="13"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="4"
        stroke-linejoin="round"
      >
        {{ t('transit-of-venus.venus') }}
      </text>
      <text :x="E.x - 6" :y="E.y + E.r + 22" text-anchor="middle" font-size="13" fill="var(--fg)" :direction="dir">{{ t('transit-of-venus.earth') }}</text>
      <text :x="obsX - 12" :y="E.y + 5" text-anchor="end" font-size="14" font-style="italic" fill="var(--muted)">b</text>
      <line :x1="obsX - 5" :x2="obsX - 5" :y1="yoN" :y2="yoS" stroke="var(--muted)" stroke-width="1.5" />
      <!-- observers: the upper one is draggable -->
      <circle :cx="obsX" :cy="yoS" r="6.5" :fill="SOUTH" stroke="var(--panel)" stroke-width="1.5" />
      <g class="touch-none" style="cursor: ns-resize" @pointerdown="down('b', $event)" @pointermove="move" @pointerup="up" @pointercancel="up">
        <circle :cx="obsX" :cy="yoN" r="9" :fill="NORTH" stroke="var(--panel)" stroke-width="2" />
        <circle :cx="obsX" :cy="yoN" r="20" fill="transparent" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
