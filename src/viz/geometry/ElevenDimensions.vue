<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, LIMIT } from './elevenDimensionsModel'

// geometry/eleven-dimensions. Left: the hose as you see it from distance D, drawn with a thickness that
// follows theta = 2r/D (a hairline once theta is below the eye's limit), with an ant going round it and a
// verdict. Middle: the cross-section circle with the ant at angle a (drag it). Right: the 3 + 1 + 7 = 11
// counter, marked as an idea that has not been tested.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const rtl = computed(() => isRtl())
const dir = computed(() => (rtl.value ? 'rtl' : 'ltr'))
const p = computed(() => readParams(props.params))

// panels: view 8..320, section 328..488, counter 496..792 (mirrored in RTL)
const view = computed(() => ({ ox: rtl.value ? 484 : 12, w: 304 }))
const sect = computed(() => ({ ox: rtl.value ? 316 : 324, w: 160 }))
const cnt = computed(() => ({ ox: rtl.value ? 12 : 492, w: 296 }))
const vcx = computed(() => view.value.ox + view.value.w / 2)
const scx = computed(() => sect.value.ox + sect.value.w / 2)
const ccx = computed(() => cnt.value.ox + cnt.value.w / 2)

// thickness on screen: a hairline below the eye limit, growing with log of theta above it
const thick = computed(() => {
  const q = p.value.ratio
  return q < 1 ? 1.5 + 2.5 * q : Math.min(4 + 10 * Math.log2(q), 120)
})
const HY = 215
const rad = computed(() => (p.value.a * Math.PI) / 180)
const antY = computed(() => (p.value.sees2 ? HY - (thick.value / 2) * Math.sin(rad.value) : HY))
const antFront = computed(() => Math.cos(rad.value) >= 0)

// cross-section
const SY = 215
const SR = computed(() => 20 + p.value.r * 0.9)
const antSx = computed(() => scx.value + SR.value * Math.cos(rad.value))
const antSy = computed(() => SY - SR.value * Math.sin(rad.value))

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
const verdict = computed(() => wrap(t(p.value.sees2 ? 'eleven-dimensions.v2' : 'eleven-dimensions.v1'), 32))
const sectTitle = computed(() => wrap(t('eleven-dimensions.section'), 22))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  if (x < sect.value.ox || x > sect.value.ox + sect.value.w) return
  dragging.value = true
  svg.value.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - scx.value
  const y = SY - ((e.clientY - b.top) / b.height) * H
  const deg = (Math.atan2(y, x) * 180) / Math.PI
  emit('set', 'a', (Math.round((deg + 360) / 5) * 5) % 360)
}

const rows = computed(() =>
  [
    { n: 3, label: t('eleven-dimensions.space'), color: 'var(--accent)', y: 100 },
    { n: 1, label: t('eleven-dimensions.time'), color: 'var(--accent-2)', y: 160 },
    { n: 7, label: t('eleven-dimensions.curled'), color: 'var(--pos)', y: 220 },
  ].map((r) => ({ ...r, lines: wrap(r.label, 24) })),
)
const dots = computed(() => Array.from({ length: 11 }, (_, i) => ({ i, color: i < 3 ? 'var(--accent)' : i < 4 ? 'var(--accent-2)' : 'var(--pos)' })))
const dx = (i: number) => ccx.value + (i - 5) * 25

const readouts = computed(() => [
  { label: t('eleven-dimensions.r.theta'), value: fmt(p.value.theta * 1000, 2), color: p.value.sees2 ? 'var(--accent)' : 'var(--accent-2)' },
  { label: t('eleven-dimensions.r.limit'), value: fmt(LIMIT * 1000, 1) },
  { label: t('eleven-dimensions.r.dist'), value: `${fmt(p.value.lineAt, 1)} m` },
  { label: t('eleven-dimensions.r.dims'), value: p.value.sees2 ? '2' : '1', color: p.value.sees2 ? 'var(--pos)' : 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="onDown"
      @pointermove="dragging && pick($event)"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <rect :x="view.ox" y="30" :width="view.w" height="440" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="sect.ox" y="30" :width="sect.w" height="440" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="cnt.ox" y="30" :width="cnt.w" height="440" rx="10" fill="var(--sunken)" stroke="var(--line)" />
      <text x="400" y="18" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('eleven-dimensions.hint') }}</text>

      <!-- LEFT: the hose as you see it -->
      <text :x="vcx" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">{{ t('eleven-dimensions.view') }}</text>
      <text :x="vcx" y="84" text-anchor="middle" font-size="14" font-weight="700" :fill="p.sees2 ? 'var(--pos)' : 'var(--accent-2)'" :direction="dir">
        <tspan v-for="(l, i) in verdict" :key="i" :x="vcx" :dy="i ? 18 : 0">{{ l }}</tspan>
      </text>
      <rect
        :x="view.ox + 14"
        :y="HY - thick / 2"
        :width="view.w - 28"
        :height="thick"
        :rx="Math.min(thick / 2, 12)"
        fill="var(--accent)"
        fill-opacity="0.75"
        stroke="var(--accent)"
        stroke-width="1"
      />
      <template v-if="p.sees2">
        <circle
          :cx="vcx"
          :cy="antY"
          r="6"
          :fill="antFront ? 'var(--accent-2)' : 'var(--muted)'"
          :fill-opacity="antFront ? 1 : 0.7"
          stroke="var(--panel)"
          stroke-width="1.5"
        />
        <!-- the two directions -->
        <line :x1="vcx + 30" :y1="HY + thick / 2 + 26" :x2="vcx + 90" :y2="HY + thick / 2 + 26" stroke="var(--fg)" stroke-width="2" />
        <line :x1="vcx - 90" :y1="HY + thick / 2 + 26" :x2="vcx - 30" :y2="HY + thick / 2 + 26" stroke="var(--fg)" stroke-width="2" />
        <text :x="vcx" :y="HY + thick / 2 + 31" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">
          {{ t('eleven-dimensions.along') }}
        </text>
      </template>
      <circle v-else :cx="vcx" :cy="HY" r="4.5" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="1.5" />
      <text
        :x="vcx"
        :y="antY - 14 < 130 ? HY + 60 : antY - 14"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--accent-2)"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="4"
        :direction="dir"
      >
        {{ t('eleven-dimensions.ant') }}
      </text>
      <text :x="vcx" y="440" text-anchor="middle" font-size="14" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('eleven-dimensions.dist', { d: fmt(p.D, 1) }) }}
      </text>

      <!-- MIDDLE: cross-section -->
      <text :x="scx" y="52" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg)" :direction="dir">
        <tspan v-for="(l, i) in sectTitle" :key="i" :x="scx" :dy="i ? 16 : 0">{{ l }}</tspan>
      </text>
      <circle :cx="scx" :cy="SY" :r="SR" fill="var(--accent)" fill-opacity="0.2" stroke="var(--accent)" stroke-width="3" />
      <line :x1="scx" :y1="SY" :x2="antSx" :y2="antSy" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />
      <line :x1="scx" :y1="SY" :x2="scx + SR" :y2="SY" stroke="var(--muted)" stroke-width="1.5" />
      <text
        :x="scx"
        :y="Math.sin(rad) >= 0 ? SY + SR + 24 : SY - SR - 12"
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="var(--accent-2)"
        direction="ltr"
      >
        a = {{ p.a }}°
      </text>
      <circle :cx="antSx" :cy="antSy" r="9" fill="var(--accent-2)" stroke="var(--panel)" stroke-width="2" class="cursor-grab" />
      <line :x1="scx - 30" y1="392" :x2="scx + 30" y2="392" stroke="var(--muted)" stroke-width="2" />
      <polygon :points="`${scx + 36},392 ${scx + 26},386 ${scx + 26},398`" fill="var(--muted)" />
      <text :x="scx" y="416" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('eleven-dimensions.you') }}</text>

      <!-- RIGHT: the counter -->
      <g v-for="r in rows" :key="r.n">
        <circle :cx="rtl ? cnt.ox + cnt.w - 34 : cnt.ox + 34" :cy="r.y" r="22" :fill="r.color" fill-opacity="0.2" :stroke="r.color" stroke-width="2.5" />
        <text :x="rtl ? cnt.ox + cnt.w - 34 : cnt.ox + 34" :y="r.y + 7" text-anchor="middle" font-size="22" font-weight="700" :fill="r.color" direction="ltr">
          {{ r.n }}
        </text>
        <text
          :x="rtl ? cnt.ox + cnt.w - 68 : cnt.ox + 68"
          :y="r.y + 5 - (r.lines.length - 1) * 8"
          text-anchor="start"
          font-size="13"
          font-weight="600"
          fill="var(--fg)"
          :direction="dir"
        >
          <tspan v-for="(l, i) in r.lines" :key="i" :x="rtl ? cnt.ox + cnt.w - 68 : cnt.ox + 68" :dy="i ? 16 : 0">{{ l }}</tspan>
        </text>
      </g>
      <line :x1="cnt.ox + 20" y1="262" :x2="cnt.ox + cnt.w - 20" y2="262" stroke="var(--line)" stroke-width="2" />
      <text :x="rtl ? cnt.ox + cnt.w - 68 : cnt.ox + 68" y="298" text-anchor="start" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">
        {{ t('eleven-dimensions.total') }}
      </text>
      <text :x="rtl ? cnt.ox + cnt.w - 34 : cnt.ox + 34" y="304" text-anchor="middle" font-size="26" font-weight="700" fill="var(--fg)" direction="ltr">
        11
      </text>
      <circle v-for="d in dots" :key="d.i" :cx="dx(d.i)" cy="345" r="8" :fill="d.color" />
      <text :x="ccx" y="400" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent-2)" :direction="dir">
        {{ t('eleven-dimensions.untested') }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
