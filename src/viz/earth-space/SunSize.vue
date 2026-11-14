<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, squeeze, num, D_MOON, D_EARTH, D_SUN_REAL } from './sunSizeModel'

// earth-space/sun-size. params n (how many times farther the Sun is than the Moon) and cover (how far the
// Moon has slid over the Sun). Top: side view, one sight cone from the eye through the Moon to the Sun
// (distances squeezed). Middle: the eclipse in the sky (drag the Moon) and the sum. Bottom: Earth, Moon
// and the computed Sun at true relative size, the Sun clipped when it does not fit.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480

const p = computed(() => readParams(props.params))
const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
// text-anchor is logical under direction=rtl (start = right edge), so these stay constant
const start = 'start'
const end = 'end'
const x0 = (x: number) => (isRtl() ? W - x : x)

// ---- top: the sight cone ----
const TOP = { y: 28, h: 134 }
const CY = TOP.y + TOP.h / 2
const EYE = 60
const TOTAL = 670
const MOON_R = 8
const sq = computed(() => squeeze(p.value.n, TOTAL, MOON_R, 34))
const sunX = EYE + TOTAL
const moonX = computed(() => EYE + sq.value.dm)
const sunR = computed(() => sq.value.sunR)

// ---- middle: the sky ----
const SKY = { x: 20, y: 172, w: 230, h: 156 }
const SC = { x: 135, y: 262, r: 48 }
const moonSky = computed(() => SC.x - (1 - p.value.cover) * (2 * SC.r + 14))

// ---- bottom: true relative sizes ----
const BOT = { x: 20, y: 340, w: 760, h: 132 }
const BY = 418
const E_R = 8
const SUN_LEFT = 250
const k = computed(() => p.value.earths)
const sunTrueR = computed(() => E_R * k.value)
const clipped = computed(() => sunTrueR.value * 2 > BOT.w - (SUN_LEFT - BOT.x) - 8)
const kText = computed(() => (k.value >= 10 ? fmt(k.value, 0) : fmt(k.value, 1)))

const verdict = computed(() => (p.value.sunKm < D_EARTH ? 'sun-size.verdict.small' : 'sun-size.verdict.big'))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function toSvg(e: PointerEvent) {
  const b = svg.value!.getBoundingClientRect()
  return { x: ((e.clientX - b.left) / b.width) * W, y: ((e.clientY - b.top) / b.height) * H }
}
function down(e: PointerEvent) {
  if (!svg.value) return
  const q = toSvg(e)
  const x = isRtl() ? W - q.x : q.x
  if (x < SKY.x || x > SKY.x + SKY.w || q.y < SKY.y || q.y > SKY.y + SKY.h) return
  dragging.value = true
  svg.value.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!dragging.value || !svg.value) return
  const q = toSvg(e)
  const x = isRtl() ? W - q.x : q.x
  const c = 1 - (SC.x - x) / (2 * SC.r + 14)
  emit('set', 'cover', Math.round(Math.min(1, Math.max(0, c)) * 100))
}

const readouts = computed(() => [
  { label: t('sun-size.r.n'), value: `${p.value.n}` },
  { label: t('sun-size.r.d'), value: `${num(p.value.sunKm)} km`, color: 'var(--accent)' },
  { label: t('sun-size.r.earths'), value: fmt(k.value, 1) },
  { label: t('sun-size.r.real'), value: `${num(D_SUN_REAL)} km` },
  {
    label: t('sun-size.r.err'),
    value: `${p.value.err > 0 ? '+' : ''}${fmt(p.value.err, 1)} %`,
    color: Math.abs(p.value.err) < 3 ? 'var(--pos)' : 'var(--accent-2)',
  },
])
</script>

<template>
  <div>
    <svg
      ref="svg"
      :viewBox="`0 0 ${W} ${H}`"
      class="block w-full touch-none select-none"
      @pointerdown="down"
      @pointermove="pick"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <defs>
        <clipPath id="ss-top"><rect :x="20" :y="TOP.y" :width="760" :height="TOP.h" rx="8" /></clipPath>
        <clipPath id="ss-sky"><rect :x="SKY.x" :y="SKY.y" :width="SKY.w" :height="SKY.h" rx="8" /></clipPath>
        <clipPath id="ss-bot"><rect :x="BOT.x" :y="BOT.y" :width="BOT.w" :height="BOT.h" rx="8" /></clipPath>
      </defs>
      <text :x="x0(16)" y="18" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('sun-size.hint') }}</text>

      <!-- top: one sight cone from your eye holds the Moon and the whole Sun -->
      <g :transform="isRtl() ? `translate(${W} 0) scale(-1 1)` : undefined">
        <g clip-path="url(#ss-top)">
          <rect x="20" :y="TOP.y" width="760" :height="TOP.h" fill="var(--sunken)" />
          <polygon :points="`${EYE},${CY} ${sunX},${CY - sunR} ${sunX},${CY + sunR}`" fill="var(--accent-soft)" stroke="var(--accent-2)" stroke-opacity="0.6" />
          <circle :cx="sunX" :cy="CY" :r="sunR" fill="var(--accent-2)" fill-opacity="0.9" />
          <circle :cx="moonX" :cy="CY" :r="MOON_R" fill="var(--panel)" stroke="var(--fg)" stroke-width="2" />
          <circle :cx="EYE" :cy="CY" r="6" fill="var(--accent)" />
        </g>
      </g>
      <text
        :x="x0(moonX)"
        :y="CY - MOON_R - 8"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="4"
      >
        {{ t('sun-size.moon') }}
      </text>
      <text :x="x0(EYE)" :y="TOP.y + TOP.h - 8" :text-anchor="start" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('sun-size.eye') }}
      </text>
      <text
        :x="x0(sunX)"
        :y="CY + 5"
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--accent-2)"
        stroke-width="4"
      >
        {{ t('sun-size.sun') }}
      </text>
      <text :x="x0(770)" :y="TOP.y + 18" :text-anchor="end" font-size="13" fill="var(--muted)" :direction="dir">{{ t('sun-size.notScale') }}</text>

      <!-- middle left: the eclipse in the sky; the Moon slides over the Sun -->
      <g :transform="isRtl() ? `translate(${W} 0) scale(-1 1)` : undefined">
        <g clip-path="url(#ss-sky)">
          <rect :x="SKY.x" :y="SKY.y" :width="SKY.w" :height="SKY.h" fill="var(--sunken)" />
          <circle :cx="SC.x" :cy="SC.y" :r="SC.r + 3" fill="none" stroke="var(--accent-2)" stroke-opacity="0.45" stroke-width="7" />
          <circle :cx="SC.x" :cy="SC.y" :r="SC.r + 10" fill="none" stroke="var(--accent-2)" stroke-opacity="0.18" stroke-width="8" />
          <circle :cx="SC.x" :cy="SC.y" :r="SC.r" fill="var(--accent-2)" />
          <circle :cx="moonSky" :cy="SC.y" :r="SC.r" fill="var(--ink)" stroke="var(--muted)" stroke-width="1" class="cursor-ew-resize" />
        </g>
      </g>
      <text :x="x0(SKY.x + 8)" :y="SKY.y + 20" :text-anchor="start" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('sun-size.sky') }}
      </text>
      <text :x="x0(SKY.x + SKY.w / 2)" :y="SKY.y + SKY.h - 8" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">
        {{ t('sun-size.same') }}
      </text>

      <!-- middle right: the sum -->
      <text :x="x0(280)" y="196" :text-anchor="start" font-size="14" fill="var(--muted)" :direction="dir">{{ t('sun-size.why', { n: p.n }) }}</text>
      <text
        :x="isRtl() ? 520 : 280"
        y="244"
        :text-anchor="isRtl() ? 'end' : 'start'"
        font-size="26"
        font-weight="700"
        fill="var(--accent)"
        direction="ltr"
        class="num"
      >
        {{ p.n }} × {{ num(D_MOON) }} km
      </text>
      <text
        :x="isRtl() ? 520 : 280"
        y="292"
        :text-anchor="isRtl() ? 'end' : 'start'"
        font-size="34"
        font-weight="700"
        fill="var(--fg)"
        direction="ltr"
        class="num"
      >
        = {{ num(p.sunKm) }} km
      </text>
      <text :x="x0(280)" y="318" :text-anchor="start" font-size="14" font-weight="600" :fill="p.sunKm < D_EARTH ? 'var(--neg)' : 'var(--pos)'" :direction="dir">
        {{ t(verdict) }}
      </text>

      <!-- bottom: Earth, Moon and the Sun you computed, all at the same scale -->
      <g :transform="isRtl() ? `translate(${W} 0) scale(-1 1)` : undefined">
        <g clip-path="url(#ss-bot)">
          <rect :x="BOT.x" :y="BOT.y" :width="BOT.w" :height="BOT.h" fill="var(--sunken)" />
          <circle :cx="SUN_LEFT + sunTrueR" :cy="BY" :r="sunTrueR" fill="var(--accent-2)" fill-opacity="0.9" />
          <circle cx="70" :cy="BY" :r="E_R" fill="var(--accent)" />
          <circle cx="130" :cy="BY" :r="(E_R * D_MOON) / D_EARTH" fill="var(--fg)" />
        </g>
      </g>
      <text :x="x0(BOT.x + 8)" :y="BOT.y + 20" :text-anchor="start" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir">
        {{ t('sun-size.true') }}
      </text>
      <text :x="x0(34)" :y="BY - 22" :text-anchor="start" font-size="13" fill="var(--fg)" :direction="dir">
        {{ t('sun-size.earth', { km: num(D_EARTH) }) }}
      </text>
      <text :x="x0(34)" :y="BY + 32" :text-anchor="start" font-size="13" fill="var(--fg)" :direction="dir">
        {{ t('sun-size.moonKm', { km: num(D_MOON) }) }}
      </text>
      <text
        :x="x0(clipped ? 470 : SUN_LEFT + sunTrueR)"
        :y="BY + 5"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="var(--fg)"
        :direction="dir"
        paint-order="stroke"
        stroke="var(--accent-2)"
        stroke-width="4"
      >
        {{ t('sun-size.sunEarths', { k: kText }) }}
      </text>
      <text v-if="clipped" :x="x0(BOT.x + BOT.w - 10)" :y="BOT.y + BOT.h - 10" :text-anchor="end" font-size="13" fill="var(--muted)" :direction="dir">
        {{ t('sun-size.clip') }}
      </text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
