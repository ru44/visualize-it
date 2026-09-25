<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// An 8,000 kg regional jet: W is fixed so the lesson stays about the balance of forces, not
// about picking a weight. params: throttle (0..100 %), v (airspeed, m/s).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 400
const CY = 240
const WEIGHT_N = 78400 // 8,000 kg
const T_MAX = 60000
const CD_A = 6 // rho * Cd * A, i.e. drag = 0.5 * CD_A * v^2 at sea-level density

const throttle = computed(() => props.params.throttle ?? 61)
const v = computed(() => props.params.v ?? 100)
const thrust = computed(() => (throttle.value / 100) * T_MAX)
const drag = computed(() => 0.5 * 1.225 * CD_A * v.value * v.value)
const sinGamma = computed(() => Math.max(-1, Math.min(1, (thrust.value - drag.value) / WEIGHT_N)))
const gamma = computed(() => Math.asin(sinGamma.value))
const gammaDeg = computed(() => (gamma.value * 180) / Math.PI)
const lift = computed(() => WEIGHT_N * Math.cos(gamma.value))
const roc = computed(() => v.value * Math.sin(gamma.value)) // m/s
const rocFpm = computed(() => roc.value * 196.85)

const dir = computed(() => [Math.cos(gamma.value), -Math.sin(gamma.value)])
const perp = computed(() => [-Math.sin(gamma.value), -Math.cos(gamma.value)])

function tip(vecx: number, vecy: number, mag: number): [number, number] {
  return [CX + vecx * mag, CY + vecy * mag]
}
function arrowPts(x1: number, y1: number, x2: number, y2: number): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const s = 9
  return `${x2},${y2} ${x2 + s * Math.cos(ang + 2.6)},${y2 + s * Math.sin(ang + 2.6)} ${x2 + s * Math.cos(ang - 2.6)},${y2 + s * Math.sin(ang - 2.6)}`
}

const arrows = computed(() => {
  const [dx, dy] = dir.value
  const [px, py] = perp.value
  const lenT = 20 + 90 * (thrust.value / T_MAX)
  const lenD = 20 + 90 * (drag.value / T_MAX)
  const lenL = 20 + 90 * (lift.value / WEIGHT_N)
  const lenW = 20 + 90 * (WEIGHT_N / WEIGHT_N)
  return {
    thrust: tip(dx, dy, lenT),
    drag: tip(-dx, -dy, lenD),
    lift: tip(px, py, lenL),
    weight: tip(0, 1, lenW),
  }
})

const pathTransform = computed(() => `rotate(${(-gammaDeg.value).toFixed(2)} ${CX} ${CY})`)

const readouts = computed(() => [
  { label: 'T', value: `${fmt(thrust.value, 0)} N`, color: 'var(--accent)' },
  { label: 'D', value: `${fmt(drag.value, 0)} N`, color: 'var(--accent-2)' },
  { label: 'W', value: `${fmt(WEIGHT_N, 0)} N`, color: 'var(--neg)' },
  { label: 'L', value: `${fmt(lift.value, 0)} N`, color: 'var(--pos)' },
  { label: 'γ', value: `${fmt(gammaDeg.value, 1)}°` },
  { label: t('4f.roc'), value: `${fmt(rocFpm.value, 0)} ft/min` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('4f.hint') }}</text>

      <line x1="60" :y1="CY" :x2="W - 60" :y2="CY" stroke="var(--line)" stroke-width="1" stroke-dasharray="4 4" />

      <g :transform="pathTransform">
        <path :d="`M${CX - 210},${CY} L${CX - 40},${CY - 14} L${CX + 60},${CY - 4} L${CX + 90},${CY} L${CX + 60},${CY + 4} L${CX - 40},${CY + 14} Z`" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />
        <path :d="`M${CX - 60},${CY} L${CX - 30},${CY - 30} L${CX - 15},${CY - 30} L${CX - 35},${CY} Z`" fill="var(--fg)" opacity="0.7" />
      </g>

      <line :x1="CX" :y1="CY" :x2="arrows.thrust[0]" :y2="arrows.thrust[1]" stroke="var(--accent)" stroke-width="2.5" />
      <polygon :points="arrowPts(CX, CY, arrows.thrust[0], arrows.thrust[1])" fill="var(--accent)" />

      <line :x1="CX" :y1="CY" :x2="arrows.drag[0]" :y2="arrows.drag[1]" stroke="var(--accent-2)" stroke-width="2.5" />
      <polygon :points="arrowPts(CX, CY, arrows.drag[0], arrows.drag[1])" fill="var(--accent-2)" />

      <line :x1="CX" :y1="CY" :x2="arrows.lift[0]" :y2="arrows.lift[1]" stroke="var(--pos)" stroke-width="2.5" />
      <polygon :points="arrowPts(CX, CY, arrows.lift[0], arrows.lift[1])" fill="var(--pos)" />

      <line :x1="CX" :y1="CY" :x2="arrows.weight[0]" :y2="arrows.weight[1]" stroke="var(--neg)" stroke-width="2.5" />
      <polygon :points="arrowPts(CX, CY, arrows.weight[0], arrows.weight[1])" fill="var(--neg)" />

      <text x="16" y="440" font-size="12" fill="var(--accent)">{{ t('4f.thrustLabel') }}</text>
      <text x="16" y="456" font-size="12" fill="var(--accent-2)">{{ t('4f.dragLabel') }}</text>
      <text x="640" y="440" font-size="12" fill="var(--pos)" text-anchor="end">{{ t('4f.liftLabel') }}</text>
      <text x="640" y="456" font-size="12" fill="var(--neg)" text-anchor="end">{{ t('4f.weightLabel') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
