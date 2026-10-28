<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { SPAN, readParams, signal, handoverAt, barsOf } from './cellModel'

// networking/cell-towers. params d (km from tower A; tower B is SPAN km away), n (how fast the
// signal fades) and H (handover margin, dB). Top: the road between the two towers, the phone on it,
// its link to the tower it uses and which stretch of road each tower serves. Bottom, on the same km
// axis: the signal from each tower, the one the phone actually uses (it jumps at the handover), and
// the stretch past the middle where B is already stronger but the phone still waits for the margin.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const pA = computed(() => signal(p.value.d, p.value.n))
const pB = computed(() => signal(SPAN - p.value.d, p.value.n))
const diff = computed(() => pB.value - pA.value)
const onB = computed(() => diff.value > p.value.H)
const used = computed(() => (onB.value ? pB.value : pA.value))
const bars = computed(() => barsOf(used.value))
const hand = computed(() => handoverAt(p.value.n, p.value.H))

// One km axis for the road and the chart, so the handover line runs straight down through both.
const X = (km: number) => 70 + km * 110
const TOP = 232
const BOT = 412
const Y = (dbm: number) => TOP + ((-45 - Math.min(-45, Math.max(-115, dbm))) / 70) * (BOT - TOP)
const ROAD = 150
const KM = Array.from({ length: 57 }, (_, i) => 0.2 + i * 0.1)
const line = (pts: [number, number][]) => pts.map(([k, v], i) => `${i ? 'L' : 'M'}${X(k).toFixed(1)} ${Y(v).toFixed(1)}`).join('')
const curveA = computed(() => line(KM.map((k) => [k, signal(k, p.value.n)])))
const curveB = computed(() => line(KM.map((k) => [k, signal(SPAN - k, p.value.n)])))
// What the phone uses on the walk from A to B: tower A up to the handover, then tower B.
const usedPath = computed(() => {
  const { n } = p.value
  const h = hand.value
  return line([
    ...KM.filter((k) => k < h).map((k): [number, number] => [k, signal(k, n)]),
    [h, signal(h, n)],
    [h, signal(SPAN - h, n)],
    ...KM.filter((k) => k > h).map((k): [number, number] => [k, signal(SPAN - k, n)]),
  ])
})
const GRID = [-45, -55, -65, -75, -85, -95, -105, -115]
const BAR_BANDS = [
  { n: 4, at: -65 },
  { n: 3, at: -90 },
  { n: 2, at: -100 },
  { n: 1, at: -110 },
]
const minus = (v: number | string) => String(v).replace('-', '−')

// Sentences take the reader's direction; a label that grows rightwards from its x flips its anchor in Arabic.
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const end = computed(() => (isRtl() ? 'start' : 'end'))

const TOWERS = [
  { km: 0, color: 'var(--accent)', label: 'towers.towerA' as const, side: 1 },
  { km: SPAN, color: 'var(--accent-2)', label: 'towers.towerB' as const, side: -1 },
]
const arc = (x: number, r: number, side: number) => `M${x + side * r * 0.77} ${72 - r * 0.64} A${r} ${r} 0 0 ${side > 0 ? 1 : 0} ${x + side * r * 0.77} ${72 + r * 0.64}`
const leg = (y: number) => (11 * (y - 64)) / 78 // the mast's half-width at height y

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  emit('set', 'd', Math.round(Math.min(5.8, Math.max(0.2, (px - 70) / 110)) * 10) / 10)
}
function down(ev: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: t('towers.r.dA'), value: `${fmt(p.value.d, 1)} km` },
  { label: t('towers.r.dB'), value: `${fmt(SPAN - p.value.d, 1)} km` },
  { label: t('towers.fromA'), value: `${minus(fmt(pA.value, 1))} dBm`, color: 'var(--accent)' },
  { label: t('towers.fromB'), value: `${minus(fmt(pB.value, 1))} dBm`, color: 'var(--accent-2)' },
  { label: t('towers.r.diff', { h: p.value.H }), value: `${diff.value >= 0 ? '+' : '−'}${fmt(Math.abs(diff.value), 1)} dB` },
  { label: t('towers.r.on'), value: onB.value ? 'B' : 'A', color: onB.value ? 'var(--accent-2)' : 'var(--accent)' },
  { label: t('towers.r.bars'), value: `${bars.value}/4`, color: bars.value >= 3 ? 'var(--pos)' : bars.value >= 1 ? 'var(--fg)' : 'var(--neg)' },
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
      <text x="16" y="20" font-size="12" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('towers.hint') }}</text>

      <!-- the stretch past the middle where B is stronger but the phone waits for the margin -->
      <rect :x="X(3)" y="140" :width="Math.max(0, X(hand) - X(3))" :height="BOT - 140" fill="var(--accent-2)" opacity="0.08" />

      <!-- the road, and which tower serves each stretch of it on the walk from A to B -->
      <rect :x="X(0) - 10" :y="ROAD - 6" :width="X(SPAN) - X(0) + 20" height="14" rx="3" fill="var(--line)" />
      <line :x1="X(0)" :y1="ROAD + 1" :x2="X(SPAN)" :y2="ROAD + 1" stroke="var(--panel)" stroke-width="1.5" stroke-dasharray="8 8" />
      <rect :x="X(0)" :y="ROAD + 11" :width="X(hand) - X(0)" height="5" fill="var(--accent)" opacity="0.6" />
      <rect :x="X(hand)" :y="ROAD + 11" :width="X(SPAN) - X(hand)" height="5" fill="var(--accent-2)" opacity="0.6" />
      <text :x="(X(0) + X(hand)) / 2" :y="ROAD + 32" text-anchor="middle" font-size="11" fill="var(--accent)" :direction="dir">{{ t('towers.onA') }}</text>
      <text :x="(X(hand) + X(SPAN)) / 2" :y="ROAD + 32" text-anchor="middle" font-size="11" fill="var(--accent-2)" :direction="dir">{{ t('towers.onB') }}</text>
      <line :x1="X(3)" :y1="ROAD - 10" :x2="X(3)" :y2="ROAD + 18" stroke="var(--muted)" stroke-width="1" />
      <text :x="X(3)" :y="ROAD + 48" text-anchor="middle" font-size="10" fill="var(--muted)" :direction="dir">{{ t('towers.middle') }}</text>

      <!-- the two towers, calling out towards the road -->
      <g v-for="tw in TOWERS" :key="tw.km">
        <path :d="`M${X(tw.km) - 11} 142 L${X(tw.km)} 64 L${X(tw.km) + 11} 142`" fill="none" :stroke="tw.color" stroke-width="2" stroke-linejoin="round" />
        <line v-for="y in [92, 114, 134]" :key="y" :x1="X(tw.km) - leg(y)" :y1="y" :x2="X(tw.km) + leg(y)" :y2="y" :stroke="tw.color" stroke-width="1.5" />
        <rect :x="X(tw.km) - 3.5" y="66" width="7" height="13" rx="1.5" :fill="tw.color" />
        <path v-for="(r, i) in [18, 30, 42]" :key="r" :d="arc(X(tw.km), r, tw.side)" fill="none" :stroke="tw.color" stroke-width="1.5" :opacity="0.55 - i * 0.15" />
        <text :x="X(tw.km)" y="52" text-anchor="middle" font-size="12" font-weight="600" :fill="tw.color" :direction="dir">{{ t(tw.label) }}</text>
      </g>

      <!-- the handover point, straight down through the road and the chart -->
      <line :x1="X(hand)" y1="62" :x2="X(hand)" :y2="BOT" stroke="var(--fg)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.6" />
      <text :x="X(hand)" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('towers.handover') }}</text>

      <!-- the phone: a link to the tower it uses, a faint one to the tower it keeps measuring -->
      <line :x1="X(p.d)" y1="120" :x2="onB ? X(0) : X(SPAN)" y2="74" stroke="var(--muted)" stroke-width="1" stroke-dasharray="2 4" opacity="0.7" />
      <line :x1="X(p.d)" y1="120" :x2="onB ? X(SPAN) : X(0)" y2="74" :stroke="onB ? 'var(--accent-2)' : 'var(--accent)'" stroke-width="2" stroke-dasharray="6 4" />
      <rect :x="X(p.d) - 8" y="120" width="16" height="26" rx="3" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <rect v-for="b in 4" :key="b" :x="X(p.d) - 15 + (b - 1) * 8" :y="114 - b * 5" width="6" :height="b * 5" rx="1.2" :fill="b <= bars ? 'var(--pos)' : 'var(--sunken)'" :stroke="b <= bars ? 'none' : 'var(--line)'" />
      <text :x="X(p.d)" y="88" text-anchor="middle" font-size="11.5" font-weight="600" class="num" direction="ltr" :fill="bars >= 1 ? 'var(--fg)' : 'var(--neg)'">{{ minus(fmt(used, 0)) }} dBm</text>

      <!-- the chart: signal from each tower along the same road -->
      <g v-for="v in GRID" :key="v">
        <line :x1="X(0)" :x2="X(SPAN)" :y1="Y(v)" :y2="Y(v)" :stroke="[-85, -95, -105, -115].includes(v) ? 'var(--line)' : 'var(--grid)'" stroke-width="1" />
        <text :x="X(0) - 6" :y="Y(v) + 3.5" text-anchor="end" font-size="10" class="num" fill="var(--muted)" direction="ltr">{{ minus(v) }}</text>
      </g>
      <text v-for="bb in BAR_BANDS" :key="bb.n" :x="X(SPAN) + 6" :y="Y(bb.at) + 3.5" font-size="10" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('towers.bars', { n: bb.n }) }}</text>
      <path :d="usedPath" fill="none" stroke="var(--fg)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round" opacity="0.22" />
      <path :d="curveA" fill="none" stroke="var(--accent)" stroke-width="2" />
      <path :d="curveB" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <text :x="X(0.3)" :y="Y(signal(0.3, p.n)) - 9" font-size="11" fill="var(--accent)" :direction="dir" :text-anchor="start">{{ t('towers.fromA') }}</text>
      <text :x="X(SPAN - 0.3)" :y="Y(signal(0.3, p.n)) - 9" font-size="11" fill="var(--accent-2)" :direction="dir" :text-anchor="end">{{ t('towers.fromB') }}</text>
      <line :x1="X(p.d)" :x2="X(p.d)" :y1="TOP" :y2="BOT" stroke="var(--muted)" stroke-width="1" />
      <circle :cx="X(p.d)" :cy="Y(pA)" :r="onB ? 4 : 6.5" :fill="onB ? 'var(--panel)' : 'var(--accent)'" stroke="var(--accent)" stroke-width="2" />
      <circle :cx="X(p.d)" :cy="Y(pB)" :r="onB ? 6.5 : 4" :fill="onB ? 'var(--accent-2)' : 'var(--panel)'" stroke="var(--accent-2)" stroke-width="2" />
      <text v-for="k in [0, 1, 2, 3, 4, 5, 6]" :key="k" :x="X(k)" :y="BOT + 15" text-anchor="middle" font-size="10" class="num" fill="var(--muted)">{{ k }}</text>
      <text :x="X(3)" :y="BOT + 32" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('towers.axisX') }}</text>
      <text :transform="`translate(22 ${(TOP + BOT) / 2}) rotate(-90)`" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('towers.axisY') }}</text>
      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('towers.caption') }}</text>
    </svg>
    <!-- legend: two towers, the line the phone uses, the waiting stretch -->
    <div class="flex flex-wrap gap-x-5 gap-y-1 px-4 pb-2 text-xs" style="color: var(--muted)">
      <span class="flex items-center gap-1.5"><span class="inline-block h-0.5 w-4" style="background: var(--accent)" />{{ t('towers.fromA') }}</span>
      <span class="flex items-center gap-1.5"><span class="inline-block h-0.5 w-4" style="background: var(--accent-2)" />{{ t('towers.fromB') }}</span>
      <span class="flex items-center gap-1.5"><span class="inline-block h-2 w-4 rounded-full" style="background: var(--fg); opacity: 0.3" />{{ t('towers.uses') }}</span>
      <span class="flex items-center gap-1.5"><span class="inline-block h-3 w-4" style="background: var(--accent-2); opacity: 0.18" />{{ t('towers.waits') }}</span>
    </div>
    <Readouts :items="readouts" />
  </div>
</template>
