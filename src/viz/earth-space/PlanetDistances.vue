<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams } from './planetDistancesModel'

// earth-space/planet-distances. params r (the planet's distance from the Sun, AU) and a (where it is on its
// orbit). Left: top view with the Sun in the middle, the Earth fixed on its orbit at the right, the planet
// on a smaller orbit (drag it), the sight line, and the angle seen from Earth. Right: the same moment as
// seen in the sky, and a gauge of the angle with its biggest possible value marked.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = 'start'

const SUN = { x: 255, y: 250 }
const AU = 175
const EARTH = { x: SUN.x + AU, y: SUN.y }
const rpx = computed(() => p.value.r * AU)
const pl = computed(() => ({ x: SUN.x + rpx.value * Math.cos(p.value.rad), y: SUN.y - rpx.value * Math.sin(p.value.rad) }))
const unit = (dx: number, dy: number) => {
  const l = Math.hypot(dx, dy) || 1
  return { x: dx / l, y: dy / l }
}
const toPl = computed(() => unit(pl.value.x - EARTH.x, pl.value.y - EARTH.y))
const far = computed(() => ({ x: pl.value.x + toPl.value.x * 70, y: pl.value.y + toPl.value.y * 70 }))

// the angle at the Earth, drawn as an arc from the direction of the Sun to the direction of the planet
const ARC_R = 46
const arc = computed(() => {
  const a = { x: EARTH.x - ARC_R, y: EARTH.y }
  const b = { x: EARTH.x + toPl.value.x * ARC_R, y: EARTH.y + toPl.value.y * ARC_R }
  const cross = -1 * toPl.value.y // sunDir (-1, 0) x planetDir
  return `M${a.x} ${a.y} A${ARC_R} ${ARC_R} 0 0 ${cross > 0 ? 1 : 0} ${b.x} ${b.y}`
})
const arcLabel = computed(() => {
  const half = { x: -1 + toPl.value.x, y: toPl.value.y }
  const u = unit(half.x, half.y)
  const d = p.value.elong < 12 ? 96 : 76
  return { x: EARTH.x + (p.value.elong < 1 ? -1 : u.x) * d, y: EARTH.y + (p.value.elong < 1 ? 0 : u.y) * d }
})
// right-angle square at the planet (Sun, planet, Earth) when the angle is at its biggest
const square = computed(() => {
  const u = unit(SUN.x - pl.value.x, SUN.y - pl.value.y)
  const v = unit(EARTH.x - pl.value.x, EARTH.y - pl.value.y)
  const s = 11
  const q = pl.value
  return `M${q.x + u.x * s} ${q.y + u.y * s} L${q.x + (u.x + v.x) * s} ${q.y + (u.y + v.y) * s} L${q.x + v.x * s} ${q.y + v.y * s}`
})
// the "planet" label goes beside the planet, on the side away from the sight line
const labelAt = computed(() => {
  const o = unit(pl.value.x - SUN.x, pl.value.y - SUN.y)
  let px = -toPl.value.y
  let py = toPl.value.x
  if (px * o.x + py * o.y < 0) {
    px = -px
    py = -py
  }
  return { x: pl.value.x + px * 26, y: pl.value.y + py * 26 }
})
const orbitLabelY = computed(() => Math.max(SUN.y + rpx.value - 8, SUN.y + 60))

// ---- right: the sky, and the gauge ----
const SKY = { x: 528, y: 34, w: 252, h: 156 }
const HOR = SKY.y + 124
const SUN_SKY = { x: 654, y: HOR }
const planetSky = computed(() => {
  const d = p.value.elong * 2
  const s = p.value.morning ? -1 : 1
  return { x: SUN_SKY.x + s * d * Math.cos(0.45), y: HOR - 10 - d * Math.sin(0.45) }
})
const G = { x: 540, w: 230, y: 236 }
const gx = (deg: number) => G.x + (deg / 90) * G.w
const tickX = computed(() => Math.min(G.x + G.w - 70, Math.max(G.x + 70, gx(p.value.max))))

// ---- dragging the planet round its orbit ----
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - SUN.x
  const y = SUN.y - ((e.clientY - b.top) / b.height) * H
  let a = (Math.atan2(y, x) * 180) / Math.PI
  if (a < 0) a += 360
  emit('set', 'a', Math.round(a) % 360)
}
function down(e: PointerEvent) {
  const b = svg.value!.getBoundingClientRect()
  if (((e.clientX - b.left) / b.width) * W > SKY.x - 8) return
  dragging.value = true
  svg.value!.setPointerCapture(e.pointerId)
  pick(e)
}

const readouts = computed(() => [
  { label: t('planet-distances.r.now'), value: `${fmt(p.value.elong, 1)}°`, color: 'var(--accent)' },
  { label: t('planet-distances.r.max'), value: `${fmt(p.value.max, 1)}°`, color: 'var(--pos)' },
  { label: t('planet-distances.r.au'), value: `${fmt(p.value.r, 2)} AU` },
  { label: t('planet-distances.r.km'), value: `${fmt(p.value.mkm, 1)} ${t('planet-distances.million')}` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="dragging && pick($event)"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <text :x="isRtl() ? 500 : 16" y="20" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('planet-distances.hint') }}</text>

      <!-- top view -->
      <circle :cx="SUN.x" :cy="SUN.y" :r="AU" fill="none" stroke="var(--line)" stroke-width="2" />
      <circle :cx="SUN.x" :cy="SUN.y" :r="rpx" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4" />
      <text :x="SUN.x" :y="SUN.y + AU + 20" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">
        {{ t('planet-distances.earthOrbit') }}
      </text>
      <text
        :x="SUN.x"
        :y="orbitLabelY"
        text-anchor="middle"
        font-size="13"
        fill="var(--muted)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="4"
      >
        {{ t('planet-distances.planetOrbit', { r: fmt(p.r, 2) }) }}
      </text>
      <line :x1="SUN.x" :y1="SUN.y" :x2="pl.x" :y2="pl.y" stroke="var(--muted)" stroke-width="1" opacity="0.6" />

      <line :x1="EARTH.x" :y1="EARTH.y" :x2="SUN.x" :y2="SUN.y" stroke="var(--accent-2)" stroke-width="2" stroke-dasharray="6 4" />
      <line :x1="EARTH.x" :y1="EARTH.y" :x2="far.x" :y2="far.y" stroke="var(--accent)" stroke-width="2.5" />
      <path v-if="p.elong > 0.5" :d="arc" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2.5" />
      <text
        :x="arcLabel.x"
        :y="arcLabel.y + 5"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        class="num"
        fill="var(--accent)"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="4"
      >
        {{ fmt(p.elong, 0) }}°
      </text>
      <path v-if="p.atMax" :d="square" fill="none" stroke="var(--pos)" stroke-width="2.5" />

      <!-- Sun, Earth, planet -->
      <circle :cx="SUN.x" :cy="SUN.y" r="14" fill="var(--accent-2)" />
      <text :x="SUN.x" :y="SUN.y + 34" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('planet-distances.sun') }}
      </text>
      <circle :cx="EARTH.x" :cy="EARTH.y" r="8" fill="var(--accent)" />
      <text :x="EARTH.x + 14" :y="EARTH.y + 26" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('planet-distances.earth') }}
      </text>
      <circle :cx="pl.x" :cy="pl.y" r="16" fill="transparent" class="cursor-grab" />
      <circle :cx="pl.x" :cy="pl.y" r="7" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
      <text
        :x="labelAt.x"
        :y="labelAt.y + 5"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="4"
      >
        {{ t('planet-distances.planet') }}
      </text>

      <!-- right: the sky at this moment -->
      <rect :x="SKY.x" :y="SKY.y" :width="SKY.w" :height="SKY.h" rx="8" fill="var(--sunken)" />
      <text :x="SKY.x + SKY.w / 2" :y="SKY.y + 20" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t(p.morning ? 'planet-distances.morning' : 'planet-distances.evening') }}
      </text>
      <line :x1="SUN_SKY.x" :y1="HOR" :x2="planetSky.x" :y2="planetSky.y" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3" />
      <circle :cx="SUN_SKY.x" :cy="HOR" r="15" fill="var(--accent-2)" />
      <rect :x="SKY.x" :y="HOR" :width="SKY.w" :height="SKY.y + SKY.h - HOR" fill="var(--line)" />
      <circle :cx="planetSky.x" :cy="planetSky.y" r="6" fill="var(--panel)" stroke="var(--fg)" stroke-width="2.5" />
      <text :x="SKY.x + SKY.w / 2" :y="SKY.y + SKY.h - 8" text-anchor="middle" font-size="13" fill="var(--fg)" :direction="dir">
        {{ t(p.elong < 4 ? 'planet-distances.lost' : 'planet-distances.apart', { x: fmt(p.elong, 0) }) }}
      </text>

      <!-- right: the gauge, with the biggest possible angle marked -->
      <text :x="G.x + G.w / 2" :y="G.y - 14" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('planet-distances.gauge') }}
      </text>
      <rect :x="G.x" :y="G.y" :width="G.w" height="14" rx="7" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="G.x" :y="G.y" :width="Math.max(0, gx(p.elong) - G.x)" height="14" rx="7" fill="var(--accent)" />
      <line :x1="gx(p.max)" :y1="G.y - 5" :x2="gx(p.max)" :y2="G.y + 20" stroke="var(--pos)" stroke-width="3" />
      <text :x="G.x" :y="G.y + 36" font-size="13" fill="var(--muted)" direction="ltr" text-anchor="start">0°</text>
      <text :x="G.x + G.w" :y="G.y + 36" font-size="13" fill="var(--muted)" direction="ltr" text-anchor="end">90°</text>
      <text :x="tickX" :y="G.y + 58" text-anchor="middle" font-size="13" font-weight="600" fill="var(--pos)" :direction="dir">
        {{ t('planet-distances.maxTick', { x: fmt(p.max, 0) }) }}
      </text>

      <g :direction="dir" text-anchor="middle" font-size="14" font-weight="600">
        <template v-if="p.atMax">
          <text :x="G.x + G.w / 2" y="370" fill="var(--pos)">{{ t('planet-distances.right1') }}</text>
          <text :x="G.x + G.w / 2" y="392" fill="var(--pos)">{{ t('planet-distances.right2') }}</text>
        </template>
        <template v-else>
          <text :x="G.x + G.w / 2" y="370" fill="var(--muted)">{{ t('planet-distances.hunt1') }}</text>
          <text :x="G.x + G.w / 2" y="392" fill="var(--muted)">{{ t('planet-distances.hunt2') }}</text>
        </template>
      </g>
      <text :x="G.x + G.w / 2" y="440" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">
        {{ t('planet-distances.formula', { x: fmt(p.max, 1), r: fmt(p.r, 2) }) }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
