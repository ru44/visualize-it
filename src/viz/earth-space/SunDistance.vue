<script setup lang="ts">
import { computed, ref } from 'vue'
import { fmt } from '../../engine/math'
import { t, isRtl } from '../../i18n'
import Readouts from '../../components/Readouts.vue'
import { readParams, timesFarther, fmtRatio, SUN_DIST } from './sunDistanceModel'

// earth-space/sun-distance. params phi (angle between Moon and Sun seen from Earth at half Moon, degrees)
// and err (your measuring error, degrees). Left: Earth E, the Moon M straight above it, the right angle
// at M, and the line from E at angle phi that meets the line from M at the Sun S. The Earth–Moon length is
// fixed; lines are cut where the Sun falls off the page (not to scale). The shaded wedge is the range of
// directions phi ± err and the thick bar on the Moon's line is the range of places the Sun could be.
// Right: the half-lit Moon, and 1/cos(phi) on a log scale with the same band. Drag the handle to set phi.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const RAD = Math.PI / 180

const p = computed(() => readParams(props.params))
const E = { x: 70, y: 430 }
const EM = 190
const M = { x: 70, y: E.y - EM }
const XCUT = 490
const dirOf = (deg: number) => ({ x: Math.sin(deg * RAD), y: -Math.cos(deg * RAD) })
const xSun = (deg: number) => M.x + EM * Math.tan(Math.min(deg, 89.99) * RAD)
const sunX = computed(() => xSun(p.value.phi))
const visible = computed(() => sunX.value <= XCUT)
const lineEnd = computed(() => {
  const x = Math.min(sunX.value, XCUT)
  return { x, y: E.y - (x - E.x) / Math.tan(p.value.phi * RAD) }
})
const wedge = computed(() => {
  const lo = dirOf(p.value.phi - p.value.err)
  const hi = dirOf(Math.min(p.value.phi + p.value.err, 89.99))
  const R = 2500
  return `${E.x},${E.y} ${E.x + R * lo.x},${E.y + R * lo.y} ${E.x + R * hi.x},${E.y + R * hi.y}`
})
const barX1 = computed(() => Math.min(xSun(p.value.phi - p.value.err), XCUT))
const barX2 = computed(() => Math.min(xSun(p.value.phi + p.value.err), XCUT))
const arc = computed(() => {
  const d = dirOf(p.value.phi)
  const r = 62
  return `M${E.x} ${E.y - r} A${r} ${r} 0 0 1 ${E.x + r * d.x} ${E.y + r * d.y}`
})
const mid = computed(() => {
  const d = dirOf(p.value.phi / 2)
  return { x: E.x + 108 * d.x, y: E.y + 108 * d.y }
})
const handle = computed(() => {
  const d = dirOf(p.value.phi)
  return { x: E.x + 300 * d.x, y: E.y + 300 * d.y }
})

// ---- the plot strip: 1/cos(phi), log scale ----
const PL = 598
const PR = 776
const PT = 196
const PB = 392
const LMIN = Math.log10(1.5)
const LMAX = Math.log10(6000)
const px = (phi: number) => PL + ((Math.min(phi, 90) - 60) / 30) * (PR - PL)
const py = (r: number) => PB - ((Math.log10(r) - LMIN) / (LMAX - LMIN)) * (PB - PT)
const curve = Array.from({ length: 61 }, (_, i) => {
  const phi = 60 + (i * 29.99) / 60
  return `${i ? 'L' : 'M'}${px(phi).toFixed(1)} ${py(timesFarther(phi)).toFixed(1)}`
}).join('')
const bandX1 = computed(() => px(p.value.phi - p.value.err))
const bandX2 = computed(() => px(p.value.phi + p.value.err))
const yTicks = [10, 100, 1000]
const plotTitle = computed(() => {
  const w = t('sun-distance.plot').split(' ')
  const h = Math.ceil(w.length / 2)
  return [w.slice(0, h).join(' '), w.slice(h).join(' ')]
})

const dir = computed(() => (isRtl() ? 'rtl' : 'ltr'))
const start = computed(() => (isRtl() ? 'end' : 'start'))
const x0 = computed(() => (isRtl() ? W - 16 : 16))

// ---- dragging the Sun's direction ----
const svg = ref<SVGSVGElement>()
const dragging = ref(false)
function drag(e: PointerEvent) {
  const m = svg.value?.getScreenCTM()
  if (!m) return
  const x = (e.clientX - m.e) / m.a
  const y = (e.clientY - m.f) / m.d
  const phi = Math.atan2(x - E.x, E.y - y) / RAD
  emit('set', 'phi', Math.min(89.95, Math.max(60, Math.round(phi * 100) / 100)))
}
function down(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  drag(e)
}

const readouts = computed(() => {
  const a = [
    { label: t('sun-distance.r.phi'), value: `${fmt(p.value.phi, 2)}°` },
    { label: t('sun-distance.r.times'), value: `${fmtRatio(p.value.ratio)} ×`, color: 'var(--accent)' },
    { label: t('sun-distance.r.yours'), value: `${fmt(p.value.sun, 1)} ${t('sun-distance.million')}` },
    { label: t('sun-distance.r.real'), value: `${SUN_DIST} ${t('sun-distance.million')}` },
    {
      label: t('sun-distance.r.err'),
      value: `${p.value.error > 0 ? '+' : ''}${fmt(p.value.error * 100, 0)} %`,
      color: Math.abs(p.value.error) < 0.1 ? 'var(--pos)' : 'var(--neg)',
    },
  ]
  if (p.value.err > 0) a.push({ label: t('sun-distance.r.range'), value: `${fmtRatio(p.value.lo)} – ${fmtRatio(p.value.hi)} ×`, color: 'var(--neg)' })
  return a
})
</script>

<template>
  <div>
    <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none touch-none">
      <defs>
        <clipPath id="sd-left"><rect x="0" y="56" width="520" height="384" /></clipPath>
      </defs>
      <text :x="x0" y="22" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('sun-distance.hint') }}</text>
      <text :x="x0" y="44" font-size="13" fill="var(--muted)" :direction="dir" :text-anchor="start">{{ t('sun-distance.notScale') }}</text>

      <!-- the triangle -->
      <g clip-path="url(#sd-left)">
        <polygon v-if="p.err > 0" :points="wedge" fill="var(--neg)" opacity="0.15" />
        <line :x1="M.x" :y1="M.y" :x2="lineEnd.x" :y2="M.y" stroke="var(--fg)" stroke-width="2" />
        <line :x1="E.x" :y1="E.y" :x2="lineEnd.x" :y2="lineEnd.y" stroke="var(--accent)" stroke-width="2.5" />
        <line v-if="p.err > 0" :x1="barX1" :y1="M.y" :x2="barX2" :y2="M.y" stroke="var(--neg)" stroke-width="9" opacity="0.55" />
      </g>
      <line :x1="E.x" :y1="E.y" :x2="M.x" :y2="M.y" stroke="var(--fg)" stroke-width="2" />
      <!-- the Sun, or the break where it is off the page -->
      <g v-if="visible">
        <circle :cx="sunX" :cy="M.y" r="17" fill="var(--accent-2)" stroke="var(--fg)" stroke-width="1.5" />
        <text :x="sunX" :y="M.y - 26" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">{{ t('sun-distance.sun') }}</text>
      </g>
      <g v-else>
        <rect :x="XCUT - 8" :y="M.y - 7" width="16" height="14" fill="var(--panel)" />
        <path
          :d="`M${XCUT - 8} ${M.y + 9} L${XCUT - 1} ${M.y - 9} M${XCUT + 1} ${M.y + 9} L${XCUT + 8} ${M.y - 9}`"
          stroke="var(--muted)"
          stroke-width="2"
          fill="none"
        />
        <rect :x="XCUT - 8" :y="lineEnd.y - 7" width="16" height="14" fill="var(--panel)" />
        <path
          :d="`M${XCUT - 8} ${lineEnd.y + 9} L${XCUT - 1} ${lineEnd.y - 9} M${XCUT + 1} ${lineEnd.y + 9} L${XCUT + 8} ${lineEnd.y - 9}`"
          stroke="var(--muted)"
          stroke-width="2"
          fill="none"
        />
        <text :x="300" :y="M.y - 34" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">
          {{ t('sun-distance.toSun', { n: fmtRatio(p.ratio) }) }}
        </text>
      </g>
      <!-- right angle at the Moon -->
      <path :d="`M${M.x} ${M.y + 16} L${M.x + 16} ${M.y + 16} L${M.x + 16} ${M.y}`" stroke="var(--fg)" stroke-width="1.8" fill="none" />
      <text :x="M.x + 24" :y="M.y + 32" font-size="14" font-weight="600" fill="var(--fg)" text-anchor="start">90°</text>
      <!-- the angle at Earth -->
      <path :d="arc" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <text
        :x="mid.x"
        :y="mid.y"
        text-anchor="middle"
        font-size="15"
        font-weight="700"
        fill="var(--accent)"
        paint-order="stroke"
        stroke="var(--panel)"
        stroke-width="5"
        stroke-linejoin="round"
      >
        φ = {{ fmt(p.phi, 2) }}°
      </text>
      <!-- Moon and Earth -->
      <circle :cx="M.x" :cy="M.y" r="13" fill="var(--ink)" stroke="var(--fg)" stroke-width="2" />
      <path :d="`M${M.x} ${M.y - 13} A13 13 0 0 1 ${M.x} ${M.y + 13} Z`" fill="var(--paper)" stroke="var(--fg)" stroke-width="1.5" />
      <text :x="M.x" :y="M.y - 22" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">{{ t('sun-distance.moon') }}</text>
      <circle :cx="E.x" :cy="E.y" r="15" fill="var(--accent)" stroke="var(--fg)" stroke-width="2" />
      <text :x="E.x" :y="E.y + 38" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" :direction="dir">
        {{ t('sun-distance.earth') }}
      </text>
      <!-- handle -->
      <rect
        x="0"
        y="56"
        width="520"
        height="384"
        fill="transparent"
        :style="{ cursor: dragging ? 'grabbing' : 'crosshair' }"
        @pointerdown="down"
        @pointermove="dragging && drag($event)"
        @pointerup="dragging = false"
        @pointercancel="dragging = false"
      />
      <circle :cx="handle.x" :cy="handle.y" r="12" fill="var(--accent-2)" stroke="var(--fg)" stroke-width="2" pointer-events="none" />
      <text
        :x="handle.x + 4"
        :y="handle.y - 20"
        text-anchor="middle"
        font-size="13"
        font-weight="600"
        fill="var(--accent-2)"
        :direction="dir"
        pointer-events="none"
      >
        {{ t('sun-distance.drag') }}
      </text>

      <!-- right: the half Moon -->
      <circle cx="687" cy="76" r="28" fill="var(--ink)" stroke="var(--fg)" stroke-width="2" />
      <path d="M687 48 A28 28 0 0 1 687 104 Z" fill="var(--paper)" stroke="var(--fg)" stroke-width="1.5" />
      <text x="687" y="124" font-size="14" font-weight="600" fill="var(--fg)" text-anchor="middle" :direction="dir">{{ t('sun-distance.half') }}</text>
      <text x="687" y="142" font-size="13" fill="var(--muted)" text-anchor="middle" :direction="dir">{{ t('sun-distance.half2') }}</text>

      <!-- right: 1 / cos(phi) -->
      <text
        v-for="(ln, i) in plotTitle"
        :key="i"
        :x="(PL + PR) / 2"
        :y="168 + i * 16"
        font-size="13"
        font-weight="600"
        fill="var(--fg)"
        text-anchor="middle"
        :direction="dir"
      >
        {{ ln }}
      </text>
      <rect :x="PL" :y="PT" :width="PR - PL" :height="PB - PT" fill="var(--sunken)" stroke="var(--line)" />
      <rect v-if="p.err > 0" :x="bandX1" :y="PT" :width="Math.max(2, bandX2 - bandX1)" :height="PB - PT" fill="var(--neg)" opacity="0.22" />
      <g v-for="v in yTicks" :key="v">
        <line :x1="PL" :y1="py(v)" :x2="PR" :y2="py(v)" stroke="var(--grid)" />
        <text :x="PL - 6" :y="py(v) + 5" text-anchor="end" font-size="13" fill="var(--muted)">{{ v }}</text>
      </g>
      <g v-for="v in [60, 75, 90]" :key="'x' + v">
        <text :x="px(v)" :y="PB + 20" :text-anchor="v === 60 ? 'start' : v === 90 ? 'end' : 'middle'" font-size="13" fill="var(--muted)">{{ v }}°</text>
      </g>
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <line :x1="PL" :y1="py(p.ratio)" :x2="px(p.phi)" :y2="py(p.ratio)" stroke="var(--accent-2)" stroke-width="1.5" stroke-dasharray="4 4" />
      <circle :cx="px(p.phi)" :cy="py(p.ratio)" r="6" fill="var(--accent-2)" stroke="var(--fg)" stroke-width="1.5" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
