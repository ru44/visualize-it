<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, km, pct, REAL_C, REAL_R } from './earthSizeModel'

// earth-space/earth-size. params theta (how far the Sun is from straight overhead at Alexandria, °) and
// d (km between the two cities). A slice through the Earth: the Sun's parallel rays come straight
// down onto the well at Syene (no shadow) and hit the stick at Alexandria at the angle theta. The same
// angle sits at the Earth's centre, so the whole circle is 360/theta times the distance d.
// Drag the top of the Alexandria stick along the Earth to set theta.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const C = { x: 400, y: 420 }
const R = 290
const L = 46 // stick length, far taller than real so the shadow can be seen

const p = computed(() => readParams(props.params))
const th = computed(() => (p.value.theta * Math.PI) / 180)
const sn = computed(() => Math.sin(th.value))
const cs = computed(() => Math.cos(th.value))
const on = (r: number, a = th.value) => ({ x: C.x + r * Math.sin(a), y: C.y - r * Math.cos(a) })
const S = on(R, 0)
const A = computed(() => on(R))
const tip = computed(() => on(R + L))
const sTip = on(R + L, 0)
const hit = computed(() => ({ x: tip.value.x, y: C.y - Math.sqrt(R * R - (tip.value.x - C.x) ** 2) }))
const rays = [-170, -136, -102, -68, -34, 0, 34, 68, 102, 136, 170].map((dx) => ({ x: C.x + dx, y: C.y - Math.sqrt(R * R - dx * dx) }))

const arcD = (r: number, a: number, cx: number, cy: number, from: number) => {
  // clockwise arc of a radians starting at the direction `from` (0 = up), radius r around (cx, cy)
  const p1 = { x: cx + r * Math.sin(from), y: cy - r * Math.cos(from) }
  const p2 = { x: cx + r * Math.sin(from + a), y: cy - r * Math.cos(from + a) }
  return `M${p1.x} ${p1.y} A${r} ${r} 0 0 1 ${p2.x} ${p2.y}`
}
const centreArc = computed(() => arcD(80, th.value, C.x, C.y, 0))
const groundArc = computed(() => arcD(R - 14, th.value, C.x, C.y, 0))
// at the stick's top the angle is measured from straight down, towards the stick's foot
const tipArc = computed(() => arcD(34, th.value, tip.value.x, tip.value.y, Math.PI))
const mid = computed(() => on(R - 44, th.value / 2))
const midAngle = computed(() => on(112, th.value / 2))

const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const physR = computed(() => (isRtl() ? 'end' : 'start'))
const physL = computed(() => (isRtl() ? 'start' : 'end'))

const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function onDown(e: PointerEvent) {
  dragging.value = true
  svg.value?.setPointerCapture(e.pointerId)
  pick(e)
}
function pick(e: PointerEvent) {
  if (!svg.value) return
  const b = svg.value.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W - C.x
  const y = C.y - ((e.clientY - b.top) / b.height) * H
  const deg = (Math.atan2(x, y) * 180) / Math.PI
  emit('set', 'theta', Math.max(1, Math.min(30, Math.round(deg * 10) / 10)))
}

const off = computed(() => Math.abs(p.value.err))
const readouts = computed(() => [
  { label: t('earth-size.r.theta'), value: `${fmt(p.value.theta, 1)}°` },
  { label: t('earth-size.r.fraction'), value: `1/${fmt(p.value.parts, 1)}` },
  { label: t('earth-size.r.d'), value: `${km(p.value.d)} km` },
  { label: t('earth-size.r.mine'), value: `${km(p.value.c)} km`, color: 'var(--accent)' },
  { label: t('earth-size.r.real'), value: `${km(REAL_C)} km` },
  { label: t('earth-size.r.err'), value: pct(p.value.err), color: off.value <= 2 ? 'var(--pos)' : 'var(--accent-2)' },
  { label: t('earth-size.r.radius'), value: `${km(p.value.r)} km (${km(REAL_R)})` },
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
      <text x="16" y="20" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physR">{{ t('earth-size.hint') }}</text>
      <text x="400" y="48" text-anchor="middle" font-size="13" font-weight="600" fill="var(--accent-2)" :direction="dir">{{ t('earth-size.sun') }}</text>

      <!-- the Sun's rays: parallel, all straight down -->
      <g stroke="var(--accent-2)" stroke-width="1.5" stroke-opacity="0.45" stroke-dasharray="5 6">
        <line v-for="(r, i) in rays" :key="i" :x1="r.x" y1="62" :x2="r.x" :y2="r.y" />
      </g>
      <line :x1="tip.x" y1="62" :x2="tip.x" :y2="hit.y" stroke="var(--accent-2)" stroke-width="2.5" />

      <!-- the Earth -->
      <circle :cx="C.x" :cy="C.y" :r="R" fill="var(--sunken)" stroke="var(--fg)" stroke-width="2" />
      <line :x1="C.x" :y1="C.y" :x2="S.x" :y2="S.y" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />
      <line :x1="C.x" :y1="C.y" :x2="A.x" :y2="A.y" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4" />
      <path :d="centreArc" fill="none" stroke="var(--accent)" stroke-width="3" />
      <text
        :x="midAngle.x + 8"
        :y="midAngle.y"
        font-size="15"
        font-weight="700"
        fill="var(--accent)"
        direction="ltr"
        text-anchor="start"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="4"
      >
        θ = {{ fmt(p.theta, 1) }}°
      </text>
      <circle :cx="C.x" :cy="C.y" r="4" fill="var(--fg)" />
      <text :x="C.x" :y="C.y + 28" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('earth-size.centre') }}</text>

      <!-- the distance between the two cities, along the ground -->
      <path :d="groundArc" fill="none" stroke="var(--pos)" stroke-width="4" stroke-linecap="round" />
      <text
        :x="mid.x + 12"
        :y="mid.y + 24"
        font-size="13"
        font-weight="600"
        fill="var(--pos)"
        :direction="dir"
        :text-anchor="physR"
        paint-order="stroke"
        stroke="var(--sunken)"
        stroke-width="4"
      >
        {{ t('earth-size.dist', { d: km(p.d) }) }}
      </text>

      <!-- Syene: the well, Sun straight above, no shadow -->
      <line :x1="S.x" :y1="S.y" :x2="sTip.x" :y2="sTip.y" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" />
      <text :x="S.x - 14" :y="S.y - 32" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir" :text-anchor="physL">
        {{ t('earth-size.syene') }}
      </text>
      <text :x="S.x - 14" :y="S.y - 14" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physL">{{ t('earth-size.noShadow') }}</text>

      <!-- Alexandria: a stick, a shadow, and the angle theta between the stick and the ray -->
      <line :x1="A.x" :y1="A.y" :x2="hit.x" :y2="hit.y" stroke="var(--fg)" stroke-width="5" stroke-linecap="round" opacity="0.75" />
      <line :x1="A.x" :y1="A.y" :x2="tip.x" :y2="tip.y" stroke="var(--fg)" stroke-width="4" stroke-linecap="round" />
      <path :d="tipArc" fill="none" stroke="var(--accent)" stroke-width="3" />
      <text
        :x="tip.x + 14"
        :y="tip.y + 38"
        font-size="15"
        font-weight="700"
        fill="var(--accent)"
        direction="ltr"
        text-anchor="start"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="4"
      >
        θ
      </text>
      <text :x="tip.x + 14" :y="tip.y - 18" font-size="13" font-weight="600" fill="var(--fg)" :direction="dir" :text-anchor="physR">
        {{ t('earth-size.alex') }}
      </text>
      <line :x1="hit.x + 3" :y1="hit.y + 3" :x2="hit.x + 24" :y2="hit.y + 20" stroke="var(--muted)" stroke-width="1.2" />
      <text :x="hit.x + 28" :y="hit.y + 26" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="physR">
        {{ t('earth-size.shadow') }}
      </text>
      <circle :cx="tip.x" :cy="tip.y" r="11" fill="var(--panel)" stroke="var(--accent)" stroke-width="3" />

      <text x="400" y="473" text-anchor="middle" font-size="13" fill="var(--muted)" :direction="dir">{{ t('earth-size.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
