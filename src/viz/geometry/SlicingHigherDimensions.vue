<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams } from './slicingHigherDimensionsModel'

// geometry/slicing-higher-dimensions. Left: a side view. The ball is a circle of radius R, the sheet the
// flat creatures live on is a horizontal line, h is how far the ball's centre is above it. Drag the ball
// up and down to set h. The right triangle R, h, r is marked. Right: what the creatures in the sheet see
// (a segment, a disc or a shaded ball of radius r, or nothing), and a strip of snapshots of the whole trip.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const rtl = computed(() => isRtl())
const dir = computed(() => (rtl.value ? 'rtl' : 'ltr'))
const p = computed(() => readParams(props.params))

// panel origins (left edge): the side view first in LTR, mirrored in RTL
const oxA = computed(() => (rtl.value ? 412 : 12))
const oxB = computed(() => (rtl.value ? 12 : 412))
const PW = 376
const K = 9 // px per cm in the side view
const SY = 262 // y of the sheet
const cxA = computed(() => oxA.value + PW / 2)
const oy = computed(() => SY - p.value.h * K)
const rp = computed(() => p.value.R * K)
const sp = computed(() => p.value.r * K)

// right triangle: ball centre O, foot F on the sheet, point P on the sheet at distance r from F
const showTri = computed(() => p.value.here && p.value.r > 0.05)
const midFO = computed(() => ({ x: cxA.value, y: (oy.value + SY) / 2 }))

const KS = 13 // px per cm in the slice view
const cxB = computed(() => oxB.value + PW / 2)
const CYB = 170
const rs = computed(() => p.value.r * KS)
const reason = computed(() => (p.value.h > 0 ? t('slicing-higher-dimensions.notYet') : t('slicing-higher-dimensions.gone')))

// the nine snapshots, in the order the ball falls through the sheet: h = R ... -R
const SNAP = 9
const cell = PW / SNAP
const snaps = computed(() =>
  Array.from({ length: SNAP }, (_, i) => {
    const hh = p.value.R - (i * 2 * p.value.R) / (SNAP - 1)
    const rr = Math.sqrt(Math.max(p.value.R * p.value.R - hh * hh, 0))
    return { i, hh, k: (rr / p.value.R) * 16 }
  }),
)
const nowIdx = computed(() => {
  const x = Math.max(-1, Math.min(1, p.value.h / p.value.R))
  return Math.round(((1 - x) * (SNAP - 1)) / 2)
})
const sx = (i: number) => oxB.value + cell * (rtl.value ? SNAP - 1 - i : i) + cell / 2

const wrap = (s: string, max: number) => {
  const out: string[] = []
  let cur = ''
  for (const w of s.split(' ')) {
    if (cur && (cur + ' ' + w).length > max) {
      out.push(cur)
      cur = w
    } else cur = cur ? cur + ' ' + w : w
  }
  if (cur) out.push(cur)
  return out
}
const ballName = computed(() =>
  p.value.n === 2 ? t('slicing-higher-dimensions.ball2') : p.value.n === 3 ? t('slicing-higher-dimensions.ball3') : t('slicing-higher-dimensions.ball4'),
)
const note4 = computed(() => wrap(t('slicing-higher-dimensions.outside4'), 38))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  if (x < oxA.value || x > oxA.value + PW) return
  dragging.value = true
  svg.value.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const y = ((e.clientY - b.top) / b.height) * H
  emit('set', 'h', Math.max(-10, Math.min(10, Math.round(((SY - y) / K) * 10) / 10)))
}

const readouts = computed(() => [
  { label: t('slicing-higher-dimensions.r.n'), value: String(p.value.n) },
  { label: t('slicing-higher-dimensions.r.slice'), value: String(p.value.n - 1) },
  { label: t('slicing-higher-dimensions.r.h'), value: `${fmt(p.value.h, 1)} cm` },
  { label: t('slicing-higher-dimensions.r.R'), value: `${fmt(p.value.R, 1)} cm` },
  { label: t('slicing-higher-dimensions.r.r'), value: `${fmt(p.value.r, 2)} cm`, color: 'var(--accent)' },
  { label: t('slicing-higher-dimensions.r.w'), value: `${fmt(2 * p.value.r, 2)} cm` },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full cursor-ns-resize touch-none select-none"
      @pointerdown="onDown"
      @pointermove="dragging && pick($event)"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <defs>
        <radialGradient id="slice-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0%" style="stop-color: var(--panel)" />
          <stop offset="45%" style="stop-color: var(--accent-2)" />
          <stop offset="100%" style="stop-color: var(--accent)" />
        </radialGradient>
      </defs>

      <!-- panel frames -->
      <rect :x="oxA" y="30" :width="PW" height="440" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="oxB" y="30" :width="PW" height="440" rx="10" fill="var(--sunken)" stroke="var(--line)" />

      <text x="400" y="18" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('slicing-higher-dimensions.hint') }}</text>

      <!-- LEFT: from outside -->
      <text :x="cxA" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">
        {{ t('slicing-higher-dimensions.outside') }}
      </text>
      <text v-if="p.n === 4" :x="cxA" y="70" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">
        <tspan v-for="(l, i) in note4" :key="i" :x="cxA" :dy="i ? 16 : 0">{{ l }}</tspan>
      </text>
      <line :x1="oxA + 14" :y1="SY" :x2="oxA + PW - 14" :y2="SY" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" />
      <text :x="cxA" :y="SY + 22" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent)" :direction="dir">
        {{ t('slicing-higher-dimensions.sheet') }}
      </text>
      <circle :cx="cxA" :cy="oy" :r="rp" fill="var(--accent-2)" fill-opacity="0.18" stroke="var(--accent-2)" stroke-width="2.5" class="cursor-ns-resize" />
      <line :x1="cxA" :y1="oy" :x2="cxA" :y2="SY" stroke="var(--fg)" stroke-width="2" stroke-dasharray="5 4" />
      <circle :cx="cxA" :cy="oy" r="5" fill="var(--accent-2)" />
      <template v-if="showTri">
        <line :x1="cxA" :y1="SY" :x2="cxA + sp" :y2="SY" stroke="var(--pos)" stroke-width="5" stroke-linecap="round" />
        <line :x1="cxA" :y1="oy" :x2="cxA + sp" :y2="SY" stroke="var(--accent-2)" stroke-width="2.5" />
        <text
          :x="cxA + sp / 2"
          :y="SY - 8"
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="var(--pos)"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
          direction="ltr"
        >
          r
        </text>
        <text
          :x="cxA - 8"
          :y="midFO.y"
          text-anchor="end"
          font-size="14"
          font-weight="700"
          fill="var(--fg)"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
          direction="ltr"
        >
          h
        </text>
        <text
          :x="cxA + sp / 2 + 10"
          :y="(oy + SY) / 2 - 6"
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          fill="var(--accent-2)"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
          direction="ltr"
        >
          R
        </text>
      </template>
      <text
        v-else
        :x="cxA - 8"
        :y="midFO.y"
        text-anchor="end"
        font-size="14"
        font-weight="700"
        fill="var(--fg)"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="4"
        direction="ltr"
      >
        h
      </text>
      <text
        :x="cxA"
        :y="oy - rp - 10 < 100 ? oy + rp + 20 : oy - rp - 10"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--accent-2)"
        :direction="dir"
      >
        {{ ballName }}
      </text>

      <!-- RIGHT: what the creatures see -->
      <text :x="cxB" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">
        {{ t('slicing-higher-dimensions.inside') }}
      </text>
      <!-- the widest the slice will ever get, as a guide -->
      <circle v-if="p.n >= 3" :cx="cxB" :cy="CYB" :r="p.R * KS" fill="none" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="4 5" />
      <line v-else :x1="cxB - p.R * KS" :y1="CYB" :x2="cxB + p.R * KS" :y2="CYB" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="4 5" />
      <template v-if="p.here">
        <line v-if="p.n === 2" :x1="cxB - rs" :y1="CYB" :x2="cxB + rs" :y2="CYB" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" />
        <circle v-else-if="p.n === 3" :cx="cxB" :cy="CYB" :r="rs" fill="var(--accent)" fill-opacity="0.85" stroke="var(--accent)" stroke-width="2" />
        <circle v-else :cx="cxB" :cy="CYB" :r="rs" fill="url(#slice-ball)" stroke="var(--accent)" stroke-width="2" />
        <text :x="cxB" :y="CYB + p.R * KS + 20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)" direction="ltr">
          r = {{ fmt(p.r, 2) }} cm
        </text>
      </template>
      <text v-else :x="cxB" :y="CYB + 5" text-anchor="middle" font-size="16" font-weight="700" fill="var(--muted)" :direction="dir">{{ reason }}</text>

      <!-- the strip of snapshots -->
      <text :x="cxB" y="372" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('slicing-higher-dimensions.strip') }}</text>
      <g v-for="s in snaps" :key="s.i">
        <rect
          :x="sx(s.i) - cell / 2 + 2"
          y="384"
          :width="cell - 4"
          height="60"
          rx="6"
          fill="var(--panel)"
          :stroke="s.i === nowIdx ? 'var(--accent-2)' : 'var(--line)'"
          :stroke-width="s.i === nowIdx ? 3 : 1"
        />
        <line v-if="p.n === 2" :x1="sx(s.i) - s.k" y1="414" :x2="sx(s.i) + s.k" y2="414" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
        <circle v-else-if="p.n === 3" :cx="sx(s.i)" cy="414" :r="Math.max(s.k, 1.2)" fill="var(--accent)" />
        <circle v-else :cx="sx(s.i)" cy="414" :r="Math.max(s.k, 1.2)" fill="url(#slice-ball)" />
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
