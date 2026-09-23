<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Left: a double cone sliced by a plane, shown edge-on as a tilting line. Right: the curve that
// slice makes, drawn straight from the focus-directrix definition r = l / (1 + e·cos θ), which
// gives a circle, ellipse, parabola or hyperbola branch from one formula as e changes.
// params: e (eccentricity).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const e = computed(() => Math.max(0, props.params.e ?? 0.6))
const L = 1.7 // semi-latus rectum, in plot units

// --- left panel: schematic double cone with the cutting plane edge-on ---
const apex = { x: 150, y: 240 }
const halfAngle = (32 * Math.PI) / 180
const sideAt = (dy: number) => apex.x + dy * Math.tan(halfAngle)
const coneTop = 60
const coneBot = 420
const sideAngleFromHorizontal = ((90 - 32) * Math.PI) / 180
const tilt = computed(() => Math.min((89 * Math.PI) / 180, Math.atan(e.value * Math.tan(sideAngleFromHorizontal))))
const pivot = { x: apex.x, y: apex.y - 90 }
const planeLen = 170
const planeEnd1 = computed(() => ({ x: pivot.x + planeLen * Math.cos(tilt.value), y: pivot.y - planeLen * Math.sin(tilt.value) }))
const planeEnd2 = computed(() => ({ x: pivot.x - planeLen * Math.cos(tilt.value), y: pivot.y + planeLen * Math.sin(tilt.value) }))

// --- right panel: the conic itself, focus at the origin of the polar formula ---
const fx = 560
const fy = 240
const SCALE = 78
const kind = computed(() => (e.value < 0.03 ? 'circle' : e.value < 0.97 ? 'ellipse' : e.value < 1.03 ? 'parabola' : 'hyperbola'))
const curve = computed(() => {
  const segs: string[] = []
  let d = ''
  for (let deg = -179; deg <= 179; deg += 1) {
    const th = (deg * Math.PI) / 180
    const denom = 1 + e.value * Math.cos(th)
    if (denom > 0.03) {
      const r = L / denom
      if (r < 7) {
        const x = fx + SCALE * r * Math.cos(th)
        const y = fy - SCALE * r * Math.sin(th)
        d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1)
        continue
      }
    }
    if (d) segs.push(d)
    d = ''
  }
  if (d) segs.push(d)
  return segs.join(' ')
})

const readouts = computed(() => [
  { label: 'e', value: fmt(e.value, 2), color: 'var(--accent)' },
  { label: t('conics.shape'), value: t(`conics.${kind.value}` as any), color: 'var(--accent-2)' },
  { label: t('conics.latus'), value: fmt(L, 2) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('conics.hint') }}</text>
      <text x="150" y="446" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('conics.cone') }}</text>
      <text :x="fx" y="446" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('conics.curve') }}</text>

      <clipPath id="conePanel"><rect x="0" y="40" width="310" height="410" /></clipPath>
      <g clip-path="url(#conePanel)">
        <line :x1="sideAt(coneTop - apex.y)" :y1="coneTop" :x2="apex.x" :y2="apex.y" stroke="var(--muted)" stroke-width="1.5" />
        <line :x1="apex.x + (apex.x - sideAt(coneTop - apex.y))" :y1="coneTop" :x2="apex.x" :y2="apex.y" stroke="var(--muted)" stroke-width="1.5" />
        <line :x1="sideAt(coneBot - apex.y)" :y1="coneBot" :x2="apex.x" :y2="apex.y" stroke="var(--muted)" stroke-width="1.5" />
        <line :x1="apex.x + (apex.x - sideAt(coneBot - apex.y))" :y1="coneBot" :x2="apex.x" :y2="apex.y" stroke="var(--muted)" stroke-width="1.5" />
        <line :x1="apex.x" :y1="coneTop" :x2="apex.x" :y2="coneBot" stroke="var(--line)" stroke-dasharray="3 5" />
        <circle :cx="apex.x" :cy="apex.y" r="4" fill="var(--muted)" />
        <line :x1="planeEnd1.x" :y1="planeEnd1.y" :x2="planeEnd2.x" :y2="planeEnd2.y" stroke="var(--accent-2)" stroke-width="3" />
      </g>

      <line :x1="fx - 220" :y1="fy" :x2="fx + 220" :y2="fy" stroke="var(--line)" />
      <line :x1="fx" :y1="fy - 200" :x2="fx" :y2="fy + 200" stroke="var(--line)" />
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle :cx="fx" :cy="fy" r="4" fill="var(--fg)" />
      <text :x="fx + 8" :y="fy - 8" font-size="11" fill="var(--fg)">{{ t('conics.focus') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
