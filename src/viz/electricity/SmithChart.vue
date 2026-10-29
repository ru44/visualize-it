<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { Z0, readParams, gammaOf, zOf, rotate, mag, arg, vswrOf, envelope, cfmt, R_LINES, X_LINES, rLine, xLine } from './smithModel'

// electricity/smith-chart. params R and X (the antenna, Ω) and d (how far back along the 50 Ω cable
// you look, in wavelengths). Left: the Smith chart, the Γ disc with the circles of constant R and the
// arcs of constant X; a button unbends it into the flat R–X graph it is folded from, and folds it
// back. The orange point is the antenna; the blue one is the same antenna seen d wavelengths down
// the cable, and it only turns. Right: the cable from above with the standing wave on it, and a bar
// of how much power reaches the antenna against how much bounces back.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const zL = computed(() => ({ re: p.value.R / Z0, im: p.value.X / Z0 }))
const gL = computed(() => gammaOf(zL.value.re, zL.value.im))
const gD = computed(() => rotate(gL.value, p.value.d))
const zD = computed(() => zOf(gD.value))
const m = computed(() => mag(gL.value))
const deg = computed(() => (arg(gL.value) * 180) / Math.PI)
const bounced = computed(() => m.value * m.value)
const vswr = computed(() => vswrOf(m.value))
const minus = (s: string) => s.replace('-', '−')

// The chart. bend = 1 is the Smith chart; 0 is the flat graph (R to the right, X upwards) it is folded from.
const CX = 212
const CY = 250
const RAD = 160
const bend = ref(1)
const flat = (r: number, x: number): [number, number] => [CX - RAD + (r / 5) * 2 * RAD, CY - (x / 5) * RAD]
const disc = (g: { re: number; im: number }): [number, number] => [CX + g.re * RAD, CY - g.im * RAD]
function map(r: number, x: number): [number, number] {
  const b = bend.value
  const [fx, fy] = flat(r, x)
  const [sx, sy] = disc(gammaOf(r, x))
  return [fx + (sx - fx) * b, fy + (sy - fy) * b]
}
const toPath = (pts: [number, number][]) => pts.map(([X, Y], i) => `${i ? 'L' : 'M'}${X.toFixed(1)} ${Y.toFixed(1)}`).join('')
const path = (pts: [number, number][]) => toPath(pts.map(([r, x]) => map(r, x)))
const rPaths = computed(() => R_LINES.map((r) => ({ r, d: path(rLine(r)) })))
const xPaths = computed(() => X_LINES.flatMap((x) => [x, -x]).map((x) => ({ x, d: path(xLine(x)) })))
const axis = computed(() => path(xLine(0)))
const rLabels = computed(() => R_LINES.slice(1).map((r) => ({ r, at: map(r, 0) })))
const xLabels = computed(() =>
  X_LINES.flatMap((x) => [x, -x]).map((x) => {
    const [X, Y] = map(0, x)
    const out = Math.hypot(X - CX, Y - CY) || 1
    const b = bend.value
    return { x, X: X + ((X - CX) / out) * 18 * b - 20 * (1 - b), Y: Y + ((Y - CY) / out) * 18 * b + 4 }
  }),
)
const shortPt = computed(() => map(0, 0))
const matchPt = computed(() => map(1, 0))
const openPt = computed(() => map(1e4, 0))
const loadPt = computed(() => map(zL.value.re, zL.value.im))
const seenPt = computed(() => disc(gD.value))
const showSeen = computed(() => p.value.d > 0.002)
const arc = computed(() => toPath(Array.from({ length: 41 }, (_, i) => disc(rotate(gL.value, (p.value.d * i) / 40)))))
const arcLabel = computed(() => {
  const q = rotate(gL.value, p.value.d / 2)
  const [X, Y] = disc(q)
  const out = Math.hypot(X - CX, Y - CY) || 1
  return { X: X + ((X - CX) / out) * 16, Y: Y + ((Y - CY) / out) * 16 + 4 }
})

// unbend / fold: 1.5 s, eased
let raf = 0
function toggleBend() {
  const from = bend.value
  const target = from > 0.5 ? 0 : 1
  const t0 = performance.now()
  cancelAnimationFrame(raf)
  const step = (now: number) => {
    const u = Math.min(1, (now - t0) / 1500)
    const e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2
    bend.value = from + (target - from) * e
    if (u < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}
onUnmounted(() => cancelAnimationFrame(raf))

// The cable from above: one wavelength of it, the transmitter at the left end, the antenna at the right.
const SL = 446
const SR = 768
const SY = 158
const SA = 30
const sx = (dd: number) => SR - dd * (SR - SL)
const env = computed(() => {
  const top: [number, number][] = []
  const bot: [number, number][] = []
  for (let i = 0; i <= 120; i++) {
    const dd = i / 120
    const A = envelope(gL.value, dd) * SA
    top.push([sx(dd), SY - A])
    bot.push([sx(dd), SY + A])
  }
  return `${toPath(top)}L${toPath(bot.reverse()).slice(1)}Z`
})
// where the forward wave and the echo agree (biggest) and disagree (smallest)
const dMax = computed(() => (((arg(gL.value) / (4 * Math.PI)) % 0.5) + 0.5) % 0.5)
const dMin = computed(() => (dMax.value + 0.25) % 0.5)
const BAR_Y = 268

// Sentences take the reader's direction; a label that grows rightwards from its x flips its anchor in Arabic.
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const end = computed(() => (isRtl() ? 'start' : 'end'))
// the cable's labels: inside the strip, and on the free side of the marker
const clampX = (x: number) => Math.min(Math.max(x, SL + 36), SR - 36)
const hereRight = computed(() => sx(p.value.d) > (SL + SR) / 2)

// dragging the antenna's point sets R and X (only in the two settled views)
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
function drag(ev: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  const py = ((ev.clientY - box.top) / box.height) * H
  let R: number
  let X: number
  if (bend.value > 0.999) {
    let re = (px - CX) / RAD
    let im = -(py - CY) / RAD
    const mm = Math.hypot(re, im)
    if (mm > 0.97) {
      re *= 0.97 / mm
      im *= 0.97 / mm
    }
    const z = zOf({ re, im })
    R = z.re * Z0
    X = z.im * Z0
  } else if (bend.value < 0.001) {
    R = ((px - (CX - RAD)) / (2 * RAD)) * 5 * Z0
    X = (-(py - CY) / RAD) * 5 * Z0
  } else return
  emit('set', 'R', Math.round(clamp(R, 0, 250)))
  emit('set', 'X', Math.round(clamp(X, -250, 250)))
}
function down(ev: PointerEvent) {
  if (!svg.value) return
  const box = svg.value.getBoundingClientRect()
  const px = ((ev.clientX - box.left) / box.width) * W
  if (px > CX + RAD + 20) return
  dragging.value = true
  svg.value.setPointerCapture(ev.pointerId)
  drag(ev)
}

const readouts = computed(() => [
  { label: t('smith.r.load'), value: `${cfmt(p.value.R, p.value.X)} Ω`, color: 'var(--accent-2)' },
  { label: t('smith.r.z'), value: cfmt(zL.value.re, zL.value.im, 2) },
  { label: t('smith.r.gamma'), value: `${fmt(m.value, 2)} ∠ ${minus(fmt(deg.value, 0))}°` },
  { label: t('smith.r.vswr'), value: Number.isFinite(vswr.value) ? fmt(vswr.value, 2) : '∞' },
  {
    label: t('smith.r.bounced'),
    value: `${fmt(bounced.value * 100, 0)}%`,
    color: bounced.value < 0.05 ? 'var(--pos)' : bounced.value < 0.25 ? 'var(--fg)' : 'var(--neg)',
  },
  { label: t('smith.r.seen'), value: `${cfmt(zD.value.re * Z0, zD.value.im * Z0)} Ω`, color: 'var(--accent)' },
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
      <defs>
        <clipPath id="smith-clip"><rect :x="CX - RAD - 3" :y="CY - RAD - 3" :width="2 * RAD + 6" :height="2 * RAD + 6" /></clipPath>
      </defs>
      <text x="16" y="20" font-size="12" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('smith.hint') }}</text>

      <!-- the chart: the grid of constant R (circles) and constant X (arcs), bent or flat -->
      <g clip-path="url(#smith-clip)">
        <rect :x="CX - RAD" :y="CY - RAD" :width="2 * RAD" :height="2 * RAD" fill="var(--sunken)" stroke="var(--line)" :opacity="1 - bend" />
        <circle :cx="CX" :cy="CY" :r="RAD" fill="var(--sunken)" :opacity="bend" />
        <path v-for="g in xPaths" :key="'x' + g.x" :d="g.d" fill="none" stroke="var(--grid)" stroke-width="1" />
        <path
          v-for="g in rPaths"
          :key="'r' + g.r"
          :d="g.d"
          fill="none"
          :stroke="g.r === 0 ? 'var(--fg)' : g.r === 1 ? 'var(--accent)' : 'var(--grid)'"
          :stroke-width="g.r === 0 ? 1.5 : g.r === 1 ? 1.4 : 1"
          :opacity="g.r === 1 ? 0.75 : 1"
        />
        <path :d="axis" fill="none" stroke="var(--line)" stroke-width="1.2" />
        <circle :cx="CX" :cy="CY" :r="m * RAD" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 4" :opacity="bend" />
        <path v-if="showSeen" :d="arc" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" :opacity="bend" />
      </g>
      <!-- the values: R along the axis, ±jX around the rim (or up the side when flat) -->
      <text
        v-for="l in rLabels"
        :key="'rl' + l.r"
        :x="l.at[0]"
        :y="l.at[1] - 4"
        text-anchor="middle"
        font-size="9.5"
        class="num"
        fill="var(--muted)"
        direction="ltr"
      >
        {{ l.r * Z0 }}
      </text>
      <text v-for="l in xLabels" :key="'xl' + l.x" :x="l.X" :y="l.Y" text-anchor="middle" font-size="9.5" class="num" fill="var(--muted)" direction="ltr">
        {{ l.x > 0 ? '+' : '−' }}j{{ Math.abs(l.x) * Z0 }}
      </text>
      <text :x="CX" :y="CY + RAD + 30" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir" :opacity="1 - bend">
        {{ t('smith.axisR') }}
      </text>
      <text
        :transform="`translate(${CX - RAD - 30} ${CY}) rotate(-90)`"
        text-anchor="middle"
        font-size="11"
        fill="var(--muted)"
        :direction="dir"
        :opacity="1 - bend"
      >
        {{ t('smith.axisX') }}
      </text>
      <!-- the three landmarks: short circuit, perfect match, open circuit -->
      <circle :cx="shortPt[0]" :cy="shortPt[1]" r="3" fill="var(--fg)" />
      <circle :cx="openPt[0]" :cy="openPt[1]" r="3" fill="var(--fg)" :opacity="bend" />
      <circle :cx="matchPt[0]" :cy="matchPt[1]" r="5" fill="none" stroke="var(--pos)" stroke-width="2" />
      <g :opacity="bend">
        <text :x="CX - RAD" :y="CY + RAD + 36" font-size="10.5" fill="var(--fg)" :direction="dir" :text-anchor="start">{{ t('smith.short') }}</text>
        <text :x="CX" :y="CY + RAD + 36" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--pos)" :direction="dir">
          {{ t('smith.match') }}
        </text>
        <text :x="CX + RAD" :y="CY + RAD + 36" font-size="10.5" fill="var(--fg)" :direction="dir" :text-anchor="end">{{ t('smith.open') }}</text>
      </g>

      <!-- the antenna seen from d wavelengths down the cable: the same point, turned -->
      <g v-if="showSeen" :opacity="bend">
        <text :x="arcLabel.X" :y="arcLabel.Y" text-anchor="middle" font-size="9.5" fill="var(--accent)" :direction="dir">{{ t('smith.toward') }}</text>
        <circle :cx="seenPt[0]" :cy="seenPt[1]" r="6" fill="var(--accent)" stroke="var(--panel)" stroke-width="2" />
      </g>
      <!-- the antenna -->
      <circle :cx="loadPt[0]" :cy="loadPt[1]" r="7.5" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" class="cursor-grab" />
      <text :x="loadPt[0]" :y="loadPt[1] - 12" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--accent-2)" :direction="dir">
        {{ t('smith.load') }}
      </text>

      <!-- the cable from above, with the standing wave the forward wave and the echo make together -->
      <text :x="(SL + SR) / 2" y="62" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--fg)" :direction="dir">{{ t('smith.cable') }}</text>
      <line :x1="SL" :x2="SR" :y1="SY" :y2="SY" stroke="var(--fg)" stroke-width="3" stroke-linecap="round" />
      <path :d="env" fill="var(--accent)" opacity="0.22" />
      <path :d="env" fill="none" stroke="var(--accent)" stroke-width="1.5" />
      <g v-if="m > 0.05">
        <text :x="clampX(sx(dMax))" :y="SY - (1 + m) * SA - 6" text-anchor="middle" font-size="9.5" fill="var(--muted)" :direction="dir">
          {{ t('smith.vmax') }} {{ fmt(1 + m, 2) }}
        </text>
        <text :x="clampX(sx(dMin))" :y="SY + (1 - m) * SA + 14" text-anchor="middle" font-size="9.5" fill="var(--muted)" :direction="dir">
          {{ t('smith.vmin') }} {{ fmt(1 - m, 2) }}
        </text>
      </g>
      <!-- the transmitter and the antenna at the two ends -->
      <rect :x="SL - 26" :y="SY - 14" width="24" height="28" rx="3" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.5" />
      <circle :cx="SL - 14" :cy="SY - 3" r="4" fill="none" stroke="var(--muted)" stroke-width="1.2" />
      <line :x1="SR" :x2="SR" :y1="SY" :y2="SY - 72" stroke="var(--fg)" stroke-width="2" />
      <line :x1="SR - 12" :x2="SR + 12" :y1="SY - 72" :y2="SY - 72" stroke="var(--fg)" stroke-width="2" />
      <text :x="SL - 14" :y="SY + 92" text-anchor="middle" font-size="10" fill="var(--muted)" :direction="dir">{{ t('smith.transmitter') }}</text>
      <text :x="SR" :y="SY + 92" text-anchor="middle" font-size="10" fill="var(--muted)" :direction="dir">{{ t('smith.antenna') }}</text>
      <!-- where you look from -->
      <line :x1="sx(p.d)" :x2="sx(p.d)" :y1="SY - 74" :y2="SY + 70" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 3" />
      <circle :cx="sx(p.d)" :cy="SY" r="5" fill="var(--accent)" stroke="var(--panel)" stroke-width="1.5" />
      <text
        :x="sx(p.d) + (hereRight ? -7 : 7)"
        :y="SY + 80"
        :text-anchor="hereRight ? end : start"
        font-size="9.5"
        font-weight="600"
        fill="var(--accent)"
        :direction="dir"
      >
        {{ t('smith.here') }}
      </text>
      <text v-for="k in [0, 0.25, 0.5, 0.75, 1]" :key="k" :x="sx(k)" :y="SY + 64" text-anchor="middle" font-size="9" class="num" fill="var(--muted)">
        {{ k }} λ
      </text>

      <!-- how much of the power gets out, and how much comes back -->
      <rect :x="SL" :y="BAR_Y" :width="(SR - SL) * (1 - bounced)" height="20" rx="3" fill="var(--pos)" opacity="0.8" />
      <rect :x="SL + (SR - SL) * (1 - bounced)" :y="BAR_Y" :width="(SR - SL) * bounced" height="20" rx="3" fill="var(--neg)" opacity="0.8" />
      <text :x="SL + 6" :y="BAR_Y + 14" font-size="10" font-weight="600" fill="var(--panel)" class="num" direction="ltr" text-anchor="start">
        {{ fmt((1 - bounced) * 100, 0) }}%
      </text>
      <text
        v-if="bounced > 0.08"
        :x="SR - 6"
        :y="BAR_Y + 14"
        font-size="10"
        font-weight="600"
        fill="var(--panel)"
        class="num"
        direction="ltr"
        text-anchor="end"
      >
        {{ fmt(bounced * 100, 0) }}%
      </text>
      <text :x="(SL + SR) / 2" :y="BAR_Y + 38" text-anchor="middle" font-size="10.5" fill="var(--fg)" :direction="dir">
        {{ t('smith.seenSentence', { z: `⁦${cfmt(zD.re * Z0, zD.im * Z0)} Ω⁩` }) }}
      </text>

      <text x="400" :y="H - 8" text-anchor="middle" font-size="11" fill="var(--muted)" :direction="dir">{{ t('smith.caption') }}</text>
    </svg>
    <!-- legend and the unbend button -->
    <div class="flex flex-wrap items-center gap-x-5 gap-y-1 px-4 pb-2 text-xs" style="color: var(--muted)">
      <span class="flex items-center gap-1.5"><span class="inline-block h-3 w-3 rounded-full" style="background: var(--accent-2)" />{{ t('smith.load') }}</span>
      <span class="flex items-center gap-1.5"><span class="inline-block h-3 w-3 rounded-full" style="background: var(--accent)" />{{ t('smith.seen') }}</span>
      <span class="flex items-center gap-1.5"
        ><span class="inline-block h-3 w-3 rounded-full border border-dashed" style="border-color: var(--muted)" />{{ t('smith.vswrCircle') }}</span
      >
      <span class="flex items-center gap-1.5"
        ><span class="inline-block h-2.5 w-4 rounded-sm" style="background: var(--pos)" />{{ t('smith.delivered', { pct: fmt((1 - bounced) * 100, 0) }) }}</span
      >
      <span class="flex items-center gap-1.5"
        ><span class="inline-block h-2.5 w-4 rounded-sm" style="background: var(--neg)" />{{ t('smith.bounced', { pct: fmt(bounced * 100, 0) }) }}</span
      >
      <button class="ms-auto rounded-md border px-2 py-0.5" style="border-color: var(--line); color: var(--fg)" @click="toggleBend">
        {{ bend > 0.5 ? t('smith.bend') : t('smith.unbend') }}
      </button>
    </div>
    <Readouts :items="readouts" />
  </div>
</template>
