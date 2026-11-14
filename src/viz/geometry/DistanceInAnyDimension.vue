<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, unitSpiral, working } from './distanceInAnyDimensionModel'

// geometry/distance-in-any-dimension. n directions, a = the step in each. The spiral of right triangles:
// the first leg has length a, every new dimension adds a leg of length a at a right angle to the straight
// line so far, so the hypotenuses are a*sqrt(1), a*sqrt(2), ... and the last one is the distance d.
// Drag the tip of the spiral to change a (the drawing is scaled to fit; a small a is drawn smaller).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const RMAX = 168

const p = computed(() => readParams(props.params))
const rtl = computed(() => isRtl())
const dir = computed(() => (rtl.value ? 'rtl' : 'ltr'))
const physR = computed(() => (rtl.value ? 'end' : 'start'))
const cx = computed(() => (rtl.value ? 550 : 250))
const cy = 240
const PX0 = computed(() => (rtl.value ? 10 : 480))
const PX1 = computed(() => (rtl.value ? 320 : 790))
const pcx = computed(() => (PX0.value + PX1.value) / 2)
const COLS = ['var(--accent)', 'var(--accent-2)', 'var(--pos)', 'var(--neg)']
const col = (k: number) => COLS[(k - 1) % COLS.length]

// the spiral is always scaled to fill its half of the picture (about 340 x 320)
const fitted = computed(() => {
  const { r, ang } = unitSpiral(p.value.n)
  const off = (-20 * Math.PI) / 180
  const raw = [{ x: 0, y: 0 }, ...r.map((rk, i) => ({ x: rk * Math.cos(ang[i] + off), y: -rk * Math.sin(ang[i] + off) }))]
  const xs = raw.map((q) => q.x)
  const ys = raw.map((q) => q.y)
  const x0 = Math.min(...xs)
  const x1 = Math.max(...xs)
  const y0 = Math.min(...ys)
  const y1 = Math.max(...ys)
  const k = Math.min(340 / Math.max(x1 - x0, 1e-6), 320 / Math.max(y1 - y0, 1e-6))
  const mx = cx.value - ((x0 + x1) / 2) * k
  const my = 240 - ((y0 + y1) / 2) * k
  return { k, mx, my, raw }
})
const L = computed(() => fitted.value.k)
const pts = computed(() => fitted.value.raw.slice(1).map((q) => ({ x: fitted.value.mx + q.x * L.value, y: fitted.value.my + q.y * L.value })))
// 1 m in pixels: shrinks as a grows
const meter = computed(() => L.value / p.value.a)
const O = computed(() => ({ x: fitted.value.mx, y: fitted.value.my }))
// the legs: dimension 1 runs from the centre, dimension k from point k-1 to point k
const legs = computed(() =>
  pts.value.map((q, i) => {
    const from = i === 0 ? O.value : pts.value[i - 1]
    return { k: i + 1, x1: from.x, y1: from.y, x2: q.x, y2: q.y }
  }),
)
const norm = (x: number, y: number) => {
  const l = Math.hypot(x, y) || 1
  return { x: x / l, y: y / l }
}
const labelAt = (i: number) => {
  const q = pts.value[i]
  const r = 0.62
  return { x: O.value.x + (q.x - O.value.x) * r, y: O.value.y + (q.y - O.value.y) * r }
}
// right-angle marks at each point k < n, between the line back to the centre and the next leg
const marks = computed(() =>
  pts.value.slice(0, -1).map((q, i) => {
    const nx = pts.value[i + 1]
    const u = norm(O.value.x - q.x, O.value.y - q.y)
    const v = norm(nx.x - q.x, nx.y - q.y)
    const s = Math.min(8, L.value * 0.4)
    return `${q.x + u.x * s},${q.y + u.y * s} ${q.x + (u.x + v.x) * s},${q.y + (u.y + v.y) * s} ${q.x + v.x * s},${q.y + v.y * s}`
  }),
)
const tip = computed(() => pts.value[pts.value.length - 1])
const tipLabel = computed(() => {
  const u = norm(tip.value.x - O.value.x, tip.value.y - O.value.y)
  return { x: tip.value.x + u.x * 34, y: tip.value.y + u.y * 24 + 5 }
})
const showLegNums = computed(() => p.value.n <= 7)
const showHyp = (k: number) => k >= 2 && p.value.n <= 6 && k < p.value.n

// the comparison bars (the edges bar is the full width)
const BAR = 290
const barLeft = (len: number) => (rtl.value ? PX1.value - len : PX0.value)
const dLen = computed(() => BAR / p.value.ratio)
const work = computed(() => working(p.value.n, p.value.a))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  const b = svg.value?.getBoundingClientRect()
  if (!b || !svg.value) return
  const px = ((e.clientX - b.left) / b.width) * W
  if (Math.abs(px - cx.value) > 230) return
  dragging.value = true
  svg.value.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - cx.value
  const y = ((e.clientY - b.top) / b.height) * H - cy
  const f = Math.hypot(x, y) / RMAX
  const a = 1 + (9 * (f - 0.35)) / 0.65
  emit('set', 'a', Math.max(1, Math.min(10, Math.round(a * 2) / 2)))
}

const readouts = computed(() => [
  { label: t('distance-in-any-dimension.r.n'), value: String(p.value.n) },
  { label: t('distance-in-any-dimension.r.a'), value: `${fmt(p.value.a, 1)} m` },
  { label: t('distance-in-any-dimension.r.d'), value: `${fmt(p.value.d, 3)} m`, color: 'var(--accent)' },
  { label: t('distance-in-any-dimension.r.edges'), value: `${fmt(p.value.edges, 1)} m` },
  { label: t('distance-in-any-dimension.r.ratio'), value: `${fmt(p.value.ratio, 3)}×` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full cursor-pointer touch-none select-none"
      @pointerdown="onDown"
      @pointermove="dragging && pick($event)"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text x="16" y="22" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physR">{{ t('distance-in-any-dimension.hint') }}</text>

      <!-- the spiral of right triangles -->
      <g>
        <polygon
          v-for="(q, i) in pts.slice(1)"
          :key="'f' + i"
          :points="`${O.x},${O.y} ${pts[i].x},${pts[i].y} ${q.x},${q.y}`"
          :fill="col(i + 2)"
          :fill-opacity="i + 2 === p.n ? 0.3 : 0.1"
          stroke="none"
        />
        <line
          v-for="(q, i) in pts.slice(0, -1)"
          :key="'h' + i"
          :x1="O.x"
          :y1="O.y"
          :x2="q.x"
          :y2="q.y"
          stroke="var(--muted)"
          stroke-width="1.2"
          :stroke-opacity="p.n <= 6 || i === 0 ? 0.9 : 0.5"
        />
        <polygon v-for="(m, i) in marks" :key="'m' + i" :points="m" fill="none" stroke="var(--muted)" stroke-width="1" />
        <line
          v-for="l in legs"
          :key="'l' + l.k"
          :x1="l.x1"
          :y1="l.y1"
          :x2="l.x2"
          :y2="l.y2"
          :stroke="col(l.k)"
          :stroke-width="l.k === p.n ? 5 : 3"
          stroke-linecap="round"
        />
        <!-- the straight distance d: the thick line from the centre to the tip -->
        <line :x1="O.x" :y1="O.y" :x2="tip.x" :y2="tip.y" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" />
        <circle :cx="O.x" :cy="O.y" r="4" fill="var(--fg)" />
        <template v-if="showLegNums">
          <text
            v-for="(l, i) in legs"
            :key="'n' + l.k"
            :x="(l.x1 + l.x2) / 2 + norm((l.x1 + l.x2) / 2 - O.x, (l.y1 + l.y2) / 2 - O.y).x * 13"
            :y="(l.y1 + l.y2) / 2 + norm((l.x1 + l.x2) / 2 - O.x, (l.y1 + l.y2) / 2 - O.y).y * 13 + 5"
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            :fill="col(l.k)"
            direction="ltr"
          >
            {{ i + 1 }}
          </text>
        </template>
        <template v-for="(_q, i) in pts" :key="'t' + i">
          <text
            v-if="showHyp(i + 1)"
            :x="labelAt(i).x - 4"
            :y="labelAt(i).y + 14"
            text-anchor="middle"
            font-size="13"
            fill="var(--muted)"
            direction="ltr"
            paint-order="stroke"
            stroke="var(--panel)"
            stroke-width="4"
          >
            a√{{ i + 1 }}
          </text>
        </template>
        <circle :cx="tip.x" :cy="tip.y" r="10" fill="var(--panel)" stroke="var(--accent)" stroke-width="3" />
        <text
          :x="tipLabel.x"
          :y="tipLabel.y"
          text-anchor="middle"
          font-size="15"
          font-weight="700"
          fill="var(--accent)"
          direction="ltr"
          paint-order="stroke"
          stroke="var(--panel)"
          stroke-width="4"
        >
          d = {{ fmt(p.d, 3) }}
        </text>
        <line :x1="cx - meter / 2" y1="436" :x2="cx + meter / 2" y2="436" stroke="var(--fg)" stroke-width="3" />
        <line :x1="cx - meter / 2" y1="430" :x2="cx - meter / 2" y2="442" stroke="var(--fg)" stroke-width="2" />
        <line :x1="cx + meter / 2" y1="430" :x2="cx + meter / 2" y2="442" stroke="var(--fg)" stroke-width="2" />
        <text :x="cx + meter / 2 + 8" y="441" font-size="13" fill="var(--fg)" direction="ltr">1 m</text>
        <text :x="cx" y="472" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('distance-in-any-dimension.caption') }}</text>
      </g>

      <!-- the two ways to go, as bars -->
      <g>
        <text :x="rtl ? PX1 : PX0" y="90" font-size="14" fill="var(--fg)" text-anchor="start" :direction="dir">
          {{ t('distance-in-any-dimension.edges', { v: fmt(p.edges, 1) }) }}
        </text>
        <rect :x="barLeft(BAR)" y="100" :width="BAR" height="22" rx="4" fill="var(--accent-2)" />
        <text :x="rtl ? PX1 : PX0" y="156" font-size="14" fill="var(--fg)" text-anchor="start" :direction="dir">
          {{ t('distance-in-any-dimension.straight', { v: fmt(p.d, 3) }) }}
        </text>
        <rect :x="barLeft(dLen)" y="166" :width="dLen" height="22" rx="4" fill="var(--accent)" />
        <text :x="pcx" y="222" text-anchor="middle" font-size="14" font-weight="600" fill="var(--accent)" :direction="dir">
          {{ t('distance-in-any-dimension.shorter', { v: fmt(p.ratio, 3) }) }}
        </text>
        <text :x="pcx" y="282" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('distance-in-any-dimension.working') }}</text>
        <text :x="pcx" y="312" text-anchor="middle" font-size="13" fill="var(--fg)" direction="ltr">{{ work.line1 }}</text>
        <text :x="pcx" y="342" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg)" direction="ltr">{{ work.line2 }}</text>
        <text :x="pcx" y="378" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent)" direction="ltr">
          d = a√n = {{ fmt(p.a, 1) }}·√{{ p.n }}
        </text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
