<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../engine/math'
import { zeta } from '../engine/zeta'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Left: the zeta curve over real s, solid right of the wall s = 1 (where the sum 1^-s + 2^-s + …
// settles) and dashed left of it (the continuation), with a draggable dot at s.
// Right: the running total of the first N terms as bars, against the curve's value at s.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const s = computed(() => props.params.s ?? 2)
const N = computed(() => Math.max(1, Math.round(props.params.N ?? 10)))
const atWall = computed(() => Math.abs(s.value - 1) < 1e-9)
const z = computed(() => (atWall.value ? NaN : zeta(s.value)))
const settles = computed(() => s.value > 1 && !atWall.value)

// ---- left panel: the curve
const X0 = 50
const X1 = 470
const Y0 = 60
const Y1 = 410
const SLO = -3.5
const SHI = 4.5
const VLO = -1.5
const VHI = 3.5
const sx = (v: number) => X0 + ((v - SLO) / (SHI - SLO)) * (X1 - X0)
const sy = (v: number) => Y1 - ((Math.min(VHI + 1, Math.max(VLO - 1, v)) - VLO) / (VHI - VLO)) * (Y1 - Y0)
const branch = (a: number, b: number) => Array.from({ length: 121 }, (_, i) => a + ((b - a) * i) / 120).map((u) => `${sx(u).toFixed(1)},${sy(zeta(u)).toFixed(1)}`).join(' ')
const leftBranch = branch(SLO, 0.97)
const rightBranch = branch(1.03, SHI)
const sTicks = [-3, -2, -1, 0, 1, 2, 3, 4]
const vTicks = [-1, 1, 2, 3]
const dotY = computed(() => (atWall.value ? Y0 : Math.min(Y1, Math.max(Y0, sy(z.value)))))
const color = computed(() => (settles.value ? 'var(--accent)' : 'var(--accent-2)'))

const svg = ref<SVGSVGElement>()
let dragging = false
function setFrom(e: PointerEvent) {
  const r = svg.value!.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * W
  const v = SLO + ((x - X0) / (X1 - X0)) * (SHI - SLO)
  emit('set', 's', Math.min(4, Math.max(-3, Math.round(v * 20) / 20)))
}
function down(e: PointerEvent) {
  dragging = true
  svg.value?.setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (dragging) setFrom(e)
}
function up() {
  dragging = false
}

// ---- right panel: running totals
const RX0 = 545
const RX1 = 780
const RY0 = 110
const RY1 = 410
const totals = computed(() => {
  let sum = 0
  return Array.from({ length: N.value }, (_, i) => (sum += (i + 1) ** -s.value))
})
const total = computed(() => totals.value[totals.value.length - 1])
const span = computed(() => {
  const vals = [0, ...totals.value, ...(atWall.value ? [] : [z.value])]
  const lo = Math.min(...vals)
  const hi = Math.max(...vals)
  return { lo, hi: hi > lo ? hi : lo + 1 }
})
const ry = (v: number) => RY1 - ((v - span.value.lo) / (span.value.hi - span.value.lo)) * (RY1 - RY0)
const bw = computed(() => (RX1 - RX0) / N.value)
const term = (n: number) => fmt(n ** -s.value, 3)
const terms = computed(() => `1 + ${term(2)} + ${term(3)} + …`)

const readouts = computed(() => [
  { label: t('zeta.total'), value: fmt(total.value, 3), color: color.value },
  { label: t('zeta.curve'), value: atWall.value ? t('zeta.none') : fmt(z.value, 4), color: 'var(--fg)' },
  { label: t('zeta.verdict'), value: settles.value ? t('zeta.settles') : t('zeta.runs'), color: color.value },
])
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none" @pointermove="move" @pointerup="up" @pointercancel="up">
      <defs>
        <clipPath id="zeta-clip"><rect :x="X0" :y="Y0" :width="X1 - X0" :height="Y1 - Y0" /></clipPath>
      </defs>

      <!-- the two sides of the wall -->
      <rect :x="X0" :y="Y0" :width="sx(1) - X0" :height="Y1 - Y0" fill="var(--accent-2)" opacity="0.07" />
      <rect :x="sx(1)" :y="Y0" :width="X1 - sx(1)" :height="Y1 - Y0" fill="var(--accent)" opacity="0.07" />
      <text :x="(X0 + sx(1)) / 2" y="46" text-anchor="middle" font-size="12" fill="var(--accent-2)">{{ t('zeta.fails') }}</text>
      <text :x="(sx(1) + X1) / 2" y="46" text-anchor="middle" font-size="12" fill="var(--accent)">{{ t('zeta.works') }}</text>
      <text :x="(X0 + X1) / 2" y="22" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('zeta.hint') }}</text>

      <!-- axes -->
      <line :x1="X0" :x2="X1" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" stroke-width="1.5" />
      <g v-for="v in sTicks" :key="'s' + v">
        <line :x1="sx(v)" :x2="sx(v)" :y1="sy(0) - 4" :y2="sy(0) + 4" stroke="var(--muted)" />
        <text class="num" :x="sx(v)" :y="Y1 + 18" text-anchor="middle" font-size="11" fill="var(--muted)" style="direction: ltr">{{ v }}</text>
      </g>
      <g v-for="v in vTicks" :key="'v' + v">
        <line :x1="X0" :x2="X1" :y1="sy(v)" :y2="sy(v)" stroke="var(--grid)" />
        <text class="num" :x="X0 - 14" :y="sy(v) + 4" text-anchor="middle" font-size="11" fill="var(--muted)" style="direction: ltr">{{ v }}</text>
      </g>
      <text class="num" :x="X1 + 14" :y="Y1 + 18" text-anchor="middle" font-size="13" fill="var(--muted)">s</text>
      <line :x1="sx(1)" :x2="sx(1)" :y1="Y0" :y2="Y1" stroke="var(--fg)" stroke-width="1.5" stroke-dasharray="5 4" />
      <text :x="sx(1)" :y="Y1 + 36" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('zeta.wall') }}</text>

      <!-- the curve: solid where the sum settles, dashed where only the continuation exists -->
      <g clip-path="url(#zeta-clip)" fill="none" stroke-width="3" stroke-linecap="round">
        <polyline :points="leftBranch" stroke="var(--accent-2)" stroke-dasharray="7 5" />
        <polyline :points="rightBranch" stroke="var(--accent)" />
      </g>

      <!-- the famous spot -->
      <circle :cx="sx(-1)" :cy="sy(-1 / 12)" r="5" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <text class="num" :x="sx(-1)" :y="sy(-1 / 12) + 22" text-anchor="middle" font-size="12" fill="var(--fg)" style="direction: ltr">−1/12</text>

      <!-- the dot -->
      <line :x1="sx(s)" :x2="sx(s)" :y1="sy(0)" :y2="dotY" :stroke="color" stroke-dasharray="3 3" />
      <circle v-if="!atWall" :cx="sx(s)" :cy="dotY" r="9" :fill="color" stroke="var(--panel)" stroke-width="2" />
      <text v-if="!atWall" class="num" :x="sx(s) + (s > 2.9 ? -44 : 44)" :y="dotY - 14" text-anchor="middle" font-size="13" :fill="color" style="direction: ltr">{{ fmt(z, 4) }}</text>
      <circle :cx="sx(s)" :cy="dotY" r="22" fill="transparent" class="cursor-grab" style="touch-action: none" @pointerdown="down" />

      <!-- running totals -->
      <text :x="(RX0 + RX1) / 2" y="40" text-anchor="middle" font-size="13" fill="var(--muted)">{{ t('zeta.adding', { n: N }) }}</text>
      <text class="num" :x="(RX0 + RX1) / 2" y="64" text-anchor="middle" font-size="13" fill="var(--fg)" style="direction: ltr">{{ terms }}</text>
      <rect v-for="(v, i) in totals" :key="i" :x="RX0 + i * bw" :y="Math.min(ry(0), ry(v))" :width="Math.max(1, bw - 1)" :height="Math.max(1, Math.abs(ry(0) - ry(v)))" :fill="color" opacity="0.8" />
      <line :x1="RX0 - 8" :x2="RX1 + 8" :y1="ry(0)" :y2="ry(0)" stroke="var(--muted)" stroke-width="1.5" />
      <template v-if="!atWall">
        <line :x1="RX0 - 8" :x2="RX1 + 8" :y1="ry(z)" :y2="ry(z)" stroke="var(--fg)" stroke-width="2" stroke-dasharray="5 4" />
        <text :x="(RX0 + RX1) / 2" :y="ry(z) > RY1 - 30 ? ry(z) + 18 : ry(z) - 8" text-anchor="middle" font-size="12" fill="var(--fg)">{{ t('zeta.curve') }}</text>
      </template>
      <text class="num" :x="(RX0 + RX1) / 2" :y="H - 16" text-anchor="middle" font-size="14" :fill="color" style="direction: ltr">= {{ fmt(total, 3) }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
