<script setup lang="ts">
import { computed, ref } from 'vue'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, build, pieces, fmtInt, strokeFor } from './hypercubeModel'

// geometry/hypercube. params n (dimension 0..11), spin (turn, °), sweep (% of the drag along the newest direction).
// The n-cube is drawn as its shadow: one <path> per axis (never one element per edge), the newest axis in the accent colour.
// Drag left/right on the picture to turn the shape (sets spin).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const CY = 228
const AW = 425 // free area left of the table: about 85 % of it
const AH = 325
const P = computed(() => readParams(props.params))
const rtl = computed(() => isRtl())
const CX = computed(() => (rtl.value ? 525 : 275))
const X = (x: number) => (rtl.value ? W - x : x)
const dir = computed(() => (rtl.value ? 'rtl' : 'ltr'))
const lab = computed(() => (rtl.value ? 'end' : 'start'))

const shape = computed(() => build(P.value.n, P.value.spin, P.value.sweep, 2))
const PALETTE = ['var(--fg)', 'var(--pos)', 'var(--accent-2)', 'var(--neg)']
const axes = computed(() => {
  const { pts, edges, n } = shape.value
  const cx = CX.value
  const f = (v: number) => Math.round(v * 10) / 10
  const [x0, y0, x1, y1] = shape.value.box
  const sc = Math.min(AW / Math.max(x1 - x0, 1e-6), AH / Math.max(y1 - y0, 1e-6))
  const ox = cx - ((x0 + x1) / 2) * sc
  const oy = CY + ((y0 + y1) / 2) * sc
  const px = new Float64Array(shape.value.count)
  const py = new Float64Array(shape.value.count)
  for (let i = 0; i < shape.value.count; i++) {
    px[i] = f(ox + pts[i * 2] * sc)
    py[i] = f(oy - pts[i * 2 + 1] * sc)
  }
  return edges.map((e, k) => {
    let d = ''
    for (let q = 0; q < e.length; q += 2) d += `M${px[e[q]]} ${py[e[q]]}L${px[e[q + 1]]} ${py[e[q + 1]]}`
    const newest = k === n - 1 && n > 0
    const st = strokeFor(n, newest)
    return { k, d, color: newest ? 'var(--accent)' : PALETTE[k % 4], width: st.width, opacity: st.opacity }
  })
})
const dots = computed(() => {
  const { pts, count, n, box } = shape.value
  if (n > 6) return []
  const sc = Math.min(AW / Math.max(box[2] - box[0], 1e-6), AH / Math.max(box[3] - box[1], 1e-6))
  const ox = CX.value - ((box[0] + box[2]) / 2) * sc
  const oy = CY + ((box[1] + box[3]) / 2) * sc
  return Array.from({ length: count }, (_, i) => ({ x: ox + pts[i * 2] * sc, y: oy - pts[i * 2 + 1] * sc, top: n > 0 && !!((i >> (n - 1)) & 1) }))
})

const rows = ['corners', 'edges', 'squares', 'cubes'] as const
const counts = (n: number) => (n < 0 ? null : [pieces(n, 0), pieces(n, 1), pieces(n, 2), pieces(n, 3)])
const cur = computed(() => counts(P.value.n)!)
const prev = computed(() => counts(P.value.n - 1))
const TX = 548 // table: row labels from here, the two number columns at 676 and 750
const colX = (c: number) => X(c)

const caption = computed(() => {
  const n = P.value.n
  return n <= 4
    ? [t('hypercube.cap.0'), t('hypercube.cap.1'), t('hypercube.cap.2'), t('hypercube.cap.3'), t('hypercube.cap.4')][n]
    : t('hypercube.cap.more', { n, v: fmtInt(2 ** n) })
})
const sweepLine = computed(() => {
  const n = P.value.n
  if (n < 1 || P.value.sweep >= 100) return ''
  return n >= 4 ? t('hypercube.sweep.more', { d: n - 1 }) : [t('hypercube.sweep.1'), t('hypercube.sweep.2'), t('hypercube.sweep.3')][n - 1]
})
const doubling = computed(() => {
  const n = P.value.n
  if (n < 1) return []
  const [v, e] = prev.value!
  return [t('hypercube.dbl.corners', { a: fmtInt(v), b: fmtInt(v * 2) }), t('hypercube.dbl.edges', { e: fmtInt(e), v: fmtInt(v), b: fmtInt(e * 2 + v) })]
})

const svg = ref<SVGSVGElement>()
let startX = 0
let startSpin = 0
const dragging = ref(false)
function onDown(e: PointerEvent) {
  dragging.value = true
  startX = e.clientX
  startSpin = P.value.spin
  svg.value?.setPointerCapture(e.pointerId)
}
function onMove(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const w = svg.value.getBoundingClientRect().width || W
  const dx = ((e.clientX - startX) / w) * W
  const v = Math.round(startSpin + dx * 0.6)
  emit('set', 'spin', ((v % 360) + 360) % 360)
}
const stop = () => (dragging.value = false)

const readouts = computed(() => [
  { label: t('hypercube.r.n'), value: String(P.value.n) },
  { label: t('hypercube.r.corners'), value: fmtInt(cur.value[0]), color: 'var(--accent)' },
  { label: t('hypercube.r.edges'), value: fmtInt(cur.value[1]) },
  { label: t('hypercube.r.squares'), value: fmtInt(cur.value[2]) },
  { label: t('hypercube.r.cubes'), value: fmtInt(cur.value[3]) },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full cursor-ew-resize touch-none select-none"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="stop"
      @pointercancel="stop"
    >
      <text x="400" y="22" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('hypercube.hint') }}</text>

      <g fill="none" stroke-linecap="butt">
        <path v-for="a in axes" :key="a.k" :d="a.d" :stroke="a.color" :stroke-width="a.width" :stroke-opacity="a.opacity" />
      </g>
      <circle v-for="(d, i) in dots" :key="i" :cx="d.x" :cy="d.y" r="3.6" :fill="d.top ? 'var(--accent)' : 'var(--fg)'" />

      <!-- the table: this dimension and the one before it, so the doubling can be seen -->
      <g font-size="13" :direction="dir">
        <text :x="colX(680)" y="64" text-anchor="middle" font-weight="600" fill="var(--muted)" direction="ltr">{{ P.n > 0 ? `${P.n - 1}D` : '' }}</text>
        <text :x="colX(750)" y="64" text-anchor="middle" font-weight="700" fill="var(--accent)" direction="ltr">{{ P.n }}D</text>
        <g v-for="(r, i) in rows" :key="r">
          <text :x="X(TX)" :y="92 + i * 28" :text-anchor="lab" fill="var(--fg)">{{ t(`hypercube.row.${r}`) }}</text>
          <text :x="colX(680)" :y="92 + i * 28" text-anchor="middle" fill="var(--muted)" direction="ltr">{{ prev ? fmtInt(prev[i]) : '' }}</text>
          <text :x="colX(750)" :y="92 + i * 28" text-anchor="middle" font-weight="700" fill="var(--accent)" direction="ltr">{{ fmtInt(cur[i]) }}</text>
        </g>
        <line :x1="X(TX - 4)" y1="72" :x2="X(792)" y2="72" stroke="var(--line)" />
        <text v-for="(s, i) in doubling" :key="i" :x="X(TX)" :y="224 + i * 24" :text-anchor="lab" fill="var(--fg)" font-weight="600">{{ s }}</text>
      </g>

      <text x="400" y="446" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">{{ caption }}</text>
      <text x="400" y="468" text-anchor="middle" font-size="13" fill="var(--accent)" :direction="dir">{{ sweepLine }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
