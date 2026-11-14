<script setup lang="ts">
import { computed, ref } from 'vue'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams } from './whatIsADimensionModel'

// geometry/what-is-a-dimension. n = how many directions (1 train, 2 ship, 3 plane), x, y, z = position.
// n = 1: a track. n = 2: a sea map from above. n = 3: an oblique box with a plane, its shadow point on the
// floor and a dashed vertical line. The address in big letters has exactly n numbers. Drag the object to set x
// (and y when n >= 2); z comes from its slider.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const physR = computed(() => (isRtl() ? 'end' : 'start'))
const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const C = { x: 'var(--accent)', y: 'var(--pos)', z: 'var(--accent-2)' }

// n = 1: the track
const trackX = (v: number) => 80 + v * 64
// n = 2: the map seen from above
const mapX = (v: number) => 90 + v * 32
const mapY = (v: number) => 410 - v * 32
// n = 3: oblique box
const bx = (x: number, y: number) => 100 + 28 * x + 14 * y
const by = (y: number, z: number) => 420 - 7 * y - 26 * z
const pt = (x: number, y: number, z: number) => `${bx(x, y)},${by(y, z)}`
const floor = `${pt(0, 0, 0)} ${pt(10, 0, 0)} ${pt(10, 10, 0)} ${pt(0, 10, 0)}`
const edges = [
  [0, 0, 0, 0, 0, 10],
  [10, 0, 0, 10, 0, 10],
  [10, 10, 0, 10, 10, 10],
  [0, 10, 0, 0, 10, 10],
  [0, 0, 10, 10, 0, 10],
  [10, 0, 10, 10, 10, 10],
  [10, 10, 10, 0, 10, 10],
  [0, 10, 10, 0, 0, 10],
]
const planeAt = computed(() => ({ x: bx(p.value.x, p.value.y), y: by(p.value.y, p.value.z) }))
const shadowAt = computed(() => ({ x: bx(p.value.x, p.value.y), y: by(p.value.y, 0) }))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  pick(e)
}
const snap = (v: number) => Math.max(0, Math.min(10, Math.round(v * 2) / 2))
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const px = ((e.clientX - b.left) / b.width) * W
  const py = ((e.clientY - b.top) / b.height) * H
  if (p.value.n === 1) {
    emit('set', 'x', snap((px - 80) / 64))
  } else if (p.value.n === 2) {
    emit('set', 'x', snap((px - 90) / 32))
    emit('set', 'y', snap((410 - py) / 32))
  } else {
    const y = (420 - 26 * p.value.z - py) / 7
    emit('set', 'y', snap(y))
    emit('set', 'x', snap((px - 100 - 14 * Math.max(0, Math.min(10, y))) / 28))
  }
}

const readouts = computed(() => [
  { label: t('what-is-a-dimension.r.dim'), value: String(p.value.n), color: 'var(--accent)' },
  { label: t('what-is-a-dimension.r.addr'), value: p.value.address },
  { label: t('what-is-a-dimension.r.ignore'), value: String(p.value.ignore) },
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
      <text x="16" y="22" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physR">{{ t('what-is-a-dimension.hint') }}</text>

      <!-- n = 1: a train on a track -->
      <g v-if="p.n === 1">
        <line x1="70" y1="262" x2="730" y2="262" stroke="var(--fg)" stroke-width="4" />
        <line x1="70" y1="270" x2="730" y2="270" stroke="var(--fg)" stroke-width="4" />
        <g v-for="v in ticks" :key="v">
          <line :x1="trackX(v)" y1="262" :x2="trackX(v)" y2="282" stroke="var(--muted)" stroke-width="2" />
          <text :x="trackX(v)" y="304" text-anchor="middle" font-size="13" fill="var(--muted)" direction="ltr">{{ v }}</text>
        </g>
        <text x="400" y="334" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('what-is-a-dimension.track') }}</text>
        <line :x1="trackX(p.x)" y1="262" :x2="trackX(p.x)" y2="282" stroke="var(--accent)" stroke-width="5" />
        <g :transform="`translate(${trackX(p.x)} 0)`">
          <rect x="-34" y="222" width="68" height="30" rx="6" fill="var(--accent)" />
          <rect x="-26" y="228" width="14" height="12" rx="2" fill="var(--panel)" />
          <rect x="-6" y="228" width="14" height="12" rx="2" fill="var(--panel)" />
          <circle cx="-20" cy="257" r="6" fill="var(--fg)" />
          <circle cx="20" cy="257" r="6" fill="var(--fg)" />
          <text x="0" y="208" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">
            {{ t('what-is-a-dimension.train') }}
          </text>
          <circle cx="0" cy="240" r="30" fill="transparent" />
        </g>
        <text x="400" y="440" text-anchor="middle" font-size="14" fill="var(--accent-2)" :direction="dir">{{ t('what-is-a-dimension.noLeave1') }}</text>
        <text x="400" y="104" text-anchor="middle" font-size="46" font-weight="700" fill="var(--fg)" direction="ltr">{{ p.address }}</text>
        <text x="400" y="140" text-anchor="middle" font-size="16" fill="var(--accent)" :direction="dir">{{ t('what-is-a-dimension.need', { n: p.n }) }}</text>
      </g>

      <!-- n = 2: a ship on a sea map -->
      <g v-else-if="p.n === 2">
        <rect :x="mapX(0)" :y="mapY(10)" width="320" height="320" fill="var(--sunken)" stroke="var(--line)" stroke-width="1.5" />
        <g stroke="var(--grid)" stroke-width="1">
          <line v-for="v in ticks" :key="'gx' + v" :x1="mapX(v)" :y1="mapY(0)" :x2="mapX(v)" :y2="mapY(10)" />
          <line v-for="v in ticks" :key="'gy' + v" :x1="mapX(0)" :y1="mapY(v)" :x2="mapX(10)" :y2="mapY(v)" />
        </g>
        <line :x1="mapX(0)" :y1="mapY(0)" :x2="mapX(10)" :y2="mapY(0)" :stroke="C.x" stroke-width="3" />
        <line :x1="mapX(0)" :y1="mapY(0)" :x2="mapX(0)" :y2="mapY(10)" :stroke="C.y" stroke-width="3" />
        <text v-for="v in [0, 2, 4, 6, 8, 10]" :key="'tx' + v" :x="mapX(v)" y="430" text-anchor="middle" font-size="13" fill="var(--muted)" direction="ltr">
          {{ v }}
        </text>
        <text v-for="v in [2, 4, 6, 8, 10]" :key="'ty' + v" x="74" :y="mapY(v) + 5" text-anchor="end" font-size="13" fill="var(--muted)" direction="ltr">
          {{ v }}
        </text>
        <text x="448" y="415" text-anchor="middle" font-size="14" font-weight="600" :fill="C.x" :direction="dir">{{ t('what-is-a-dimension.east') }}</text>
        <text x="50" y="86" text-anchor="middle" font-size="14" font-weight="600" :fill="C.y" :direction="dir">{{ t('what-is-a-dimension.north') }}</text>
        <line :x1="mapX(p.x)" :y1="mapY(p.y)" :x2="mapX(p.x)" :y2="mapY(0)" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 5" />
        <line :x1="mapX(p.x)" :y1="mapY(p.y)" :x2="mapX(0)" :y2="mapY(p.y)" stroke="var(--pos)" stroke-width="2" stroke-dasharray="5 5" />
        <text :x="mapX(p.x)" y="450" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent)" direction="ltr">{{ p.x }}</text>
        <text
          :x="mapX(0) - 16"
          :y="mapY(p.y) + 5"
          text-anchor="end"
          font-size="15"
          font-weight="700"
          fill="var(--pos)"
          direction="ltr"
          paint-order="stroke"
          stroke="var(--panel)"
          stroke-width="4"
        >
          {{ p.y }}
        </text>
        <g :transform="`translate(${mapX(p.x)} ${mapY(p.y)})`">
          <path d="M-18 -4 L18 -4 L11 8 L-11 8 Z" fill="var(--accent)" stroke="var(--fg)" stroke-width="2" />
          <rect x="-7" y="-14" width="14" height="10" rx="2" fill="var(--panel)" stroke="var(--fg)" stroke-width="2" />
          <circle cx="0" cy="0" r="26" fill="transparent" />
        </g>
        <text
          :x="mapX(p.x)"
          :y="mapY(p.y) - 22"
          text-anchor="middle"
          font-size="13"
          font-weight="600"
          fill="var(--fg)"
          :direction="dir"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
        >
          {{ t('what-is-a-dimension.ship') }}
        </text>
        <text x="620" y="190" text-anchor="middle" font-size="14" fill="var(--muted)" :direction="dir">{{ t('what-is-a-dimension.address') }}</text>
        <text x="620" y="240" text-anchor="middle" font-size="46" font-weight="700" fill="var(--fg)" direction="ltr">{{ p.address }}</text>
        <text x="620" y="278" text-anchor="middle" font-size="16" fill="var(--accent)" :direction="dir">{{ t('what-is-a-dimension.need', { n: p.n }) }}</text>
        <text x="620" y="340" text-anchor="middle" font-size="13" fill="var(--accent-2)" :direction="dir">{{ t('what-is-a-dimension.noLeave2') }}</text>
      </g>

      <!-- n = 3: a plane in a box -->
      <g v-else>
        <polygon :points="floor" fill="var(--sunken)" stroke="var(--line)" stroke-width="1.5" />
        <line
          v-for="(e, i) in edges"
          :key="i"
          :x1="bx(e[0], e[1])"
          :y1="by(e[1], e[2])"
          :x2="bx(e[3], e[4])"
          :y2="by(e[4], e[5])"
          stroke="var(--line)"
          stroke-width="1.5"
        />
        <line :x1="bx(0, 0)" :y1="by(0, 0)" :x2="bx(10, 0)" :y2="by(0, 0)" :stroke="C.x" stroke-width="3" />
        <line :x1="bx(0, 0)" :y1="by(0, 0)" :x2="bx(0, 10)" :y2="by(10, 0)" :stroke="C.y" stroke-width="3" />
        <line :x1="bx(0, 0)" :y1="by(0, 0)" :x2="bx(0, 0)" :y2="by(0, 10)" :stroke="C.z" stroke-width="3" />
        <text :x="bx(10, 0) + 30" :y="by(0, 0) + 4" text-anchor="middle" font-size="14" font-weight="600" :fill="C.x" :direction="dir">
          {{ t('what-is-a-dimension.east') }}
        </text>
        <text :x="bx(0, 10) - 8" :y="by(10, 0) - 8" text-anchor="middle" font-size="14" font-weight="600" :fill="C.y" :direction="dir">
          {{ t('what-is-a-dimension.north') }}
        </text>
        <text :x="bx(0, 0)" :y="by(0, 10) - 10" text-anchor="middle" font-size="14" font-weight="600" :fill="C.z" :direction="dir">
          {{ t('what-is-a-dimension.height') }}
        </text>
        <!-- the dashed lines that read off each number -->
        <line :x1="shadowAt.x" :y1="shadowAt.y" :x2="bx(p.x, 0)" :y2="by(0, 0)" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 5" />
        <line :x1="shadowAt.x" :y1="shadowAt.y" :x2="bx(0, p.y)" :y2="by(p.y, 0)" stroke="var(--pos)" stroke-width="2" stroke-dasharray="5 5" />
        <line :x1="shadowAt.x" :y1="shadowAt.y" :x2="planeAt.x" :y2="planeAt.y" stroke="var(--accent-2)" stroke-width="2.5" stroke-dasharray="6 5" />
        <text :x="bx(p.x, 0)" :y="by(0, 0) + 20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)" direction="ltr">{{ p.x }}</text>
        <text :x="bx(0, p.y) - 12" :y="by(p.y, 0) + 5" text-anchor="end" font-size="14" font-weight="700" fill="var(--pos)" direction="ltr">{{ p.y }}</text>
        <text
          :x="shadowAt.x + 10"
          :y="(shadowAt.y + planeAt.y) / 2"
          text-anchor="start"
          font-size="14"
          font-weight="700"
          fill="var(--accent-2)"
          direction="ltr"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
        >
          {{ p.z }}
        </text>
        <ellipse :cx="shadowAt.x" :cy="shadowAt.y" rx="9" ry="4" fill="var(--fg)" opacity="0.55" />
        <text
          :x="shadowAt.x + 14"
          :y="shadowAt.y - 10"
          :text-anchor="physR"
          font-size="13"
          fill="var(--muted)"
          :direction="dir"
          paint-order="stroke"
          stroke="var(--sunken)"
          stroke-width="4"
        >
          {{ t('what-is-a-dimension.shadow') }}
        </text>
        <g :transform="`translate(${planeAt.x} ${planeAt.y})`">
          <path
            d="M0 -14 L4 -4 L22 6 L22 10 L4 6 L3 14 L8 18 L8 21 L0 19 L-8 21 L-8 18 L-3 14 L-4 6 L-22 10 L-22 6 L-4 -4 Z"
            fill="var(--accent-2)"
            stroke="var(--fg)"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <circle cx="0" cy="4" r="30" fill="transparent" />
        </g>
        <text
          :x="planeAt.x"
          :y="planeAt.y - 22"
          text-anchor="middle"
          font-size="13"
          font-weight="600"
          fill="var(--fg)"
          :direction="dir"
          paint-order="stroke"
          stroke="var(--panel)"
          stroke-width="4"
        >
          {{ t('what-is-a-dimension.plane') }}
        </text>
        <text x="670" y="190" text-anchor="middle" font-size="14" fill="var(--muted)" :direction="dir">{{ t('what-is-a-dimension.address') }}</text>
        <text x="670" y="236" text-anchor="middle" font-size="30" font-weight="700" fill="var(--fg)" direction="ltr">{{ p.address }}</text>
        <text x="670" y="272" text-anchor="middle" font-size="16" fill="var(--accent)" :direction="dir">{{ t('what-is-a-dimension.need', { n: p.n }) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
