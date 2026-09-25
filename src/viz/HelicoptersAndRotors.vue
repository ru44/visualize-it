<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Side view: the rotor disc tilts with the swashplate slider, downwash streams beneath it, and
// the thrust vector (always perpendicular to the disc) splits into the vertical part that
// supports weight and the horizontal part that pushes the aircraft forward.
// params: R (rotor radius, m), W (aircraft weight, N), tilt (deg, forward +).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 420
const HUB_Y = 150
const RHO = 1.225

const R = computed(() => Math.max(0.1, props.params.R ?? 3.84))
const weight = computed(() => Math.max(1, props.params.W ?? 6076))
const tiltDeg = computed(() => props.params.tilt ?? 0)
const tiltRad = computed(() => (tiltDeg.value * Math.PI) / 180)

const A = computed(() => Math.PI * R.value * R.value)
const thrust = computed(() => weight.value / Math.cos(tiltRad.value))
const vi = computed(() => Math.sqrt(thrust.value / (2 * RHO * A.value)))
const power = computed(() => thrust.value * vi.value)
const discLoading = computed(() => thrust.value / A.value)

const discHalfW = 150
const discSquash = 0.22

const time = ref(0)
let rafId: number | null = null
function tick(ts: number) {
  time.value = ts / 1000
  rafId = requestAnimationFrame(tick)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

// thrust always points perpendicular to the disc
const thrustDir = computed(() => [Math.sin(tiltRad.value), -Math.cos(tiltRad.value)])
const thrustTip = computed(() => {
  const len = 40 + 60 * Math.min(1, thrust.value / 200000)
  const [dx, dy] = thrustDir.value
  return [CX + dx * len, HUB_Y + dy * len]
})

function arrowPts(x1: number, y1: number, x2: number, y2: number): string {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const s = 8
  return `${x2},${y2} ${x2 + s * Math.cos(ang + 2.6)},${y2 + s * Math.sin(ang + 2.6)} ${x2 + s * Math.cos(ang - 2.6)},${y2 + s * Math.sin(ang - 2.6)}`
}

const downwash = computed(() => {
  const n = 7
  const speed = Math.min(3, 0.6 + vi.value * 0.08)
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i < n; i++) {
    const f = (i / (n - 1)) * 2 - 1
    const x0 = CX + f * discHalfW * 0.85
    const y0 = HUB_Y + 10
    const spread = f * 22
    const len = 120 + ((time.value * speed * 40 + i * 17) % 60)
    lines.push({ x1: x0, y1: y0, x2: x0 + spread + Math.tan(tiltRad.value) * 30, y2: y0 + len })
  }
  return lines
})

const readouts = computed(() => [
  { label: 'R', value: `${fmt(R.value, 2)} m` },
  { label: 'W', value: `${fmt(weight.value, 0)} N` },
  { label: 'tilt', value: `${fmt(tiltDeg.value, 1)}°` },
  { label: 'T', value: `${fmt(thrust.value, 0)} N`, color: 'var(--pos)' },
  { label: 'v_i', value: `${fmt(vi.value, 2)} m/s`, color: 'var(--accent)' },
  { label: 'P', value: `${fmt(power.value / 1000, 1)} kW` },
  { label: t('heli.dl'), value: `${fmt(discLoading.value, 1)} N/m²` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('heli.hint') }}</text>

      <line v-for="(ln, i) in downwash" :key="i" :x1="ln.x1" :y1="ln.y1" :x2="ln.x2" :y2="ln.y2" stroke="var(--accent)" stroke-width="2" stroke-opacity="0.5" stroke-linecap="round" />

      <g :transform="`translate(${CX},${HUB_Y}) rotate(${tiltDeg})`">
        <ellipse cx="0" cy="0" :rx="discHalfW" :ry="discHalfW * discSquash" fill="var(--sunken)" stroke="var(--fg)" stroke-width="2" opacity="0.9" />
      </g>

      <path :d="`M${CX - 22},${HUB_Y + 14} L${CX + 26},${HUB_Y + 18} L${CX + 30},${HUB_Y + 60} L${CX - 10},${HUB_Y + 66} Z`" fill="var(--fg)" opacity="0.75" />
      <line :x1="CX" :y1="HUB_Y" :x2="CX" :y2="HUB_Y + 16" stroke="var(--fg)" stroke-width="3" />

      <line :x1="CX" :y1="HUB_Y" :x2="thrustTip[0]" :y2="thrustTip[1]" stroke="var(--pos)" stroke-width="2.5" />
      <polygon :points="arrowPts(CX, HUB_Y, thrustTip[0], thrustTip[1])" fill="var(--pos)" />
      <line :x1="CX" :y1="HUB_Y" :x2="CX" :y2="thrustTip[1]" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 3" />
      <line :x1="CX" :y1="thrustTip[1]" :x2="thrustTip[0]" :y2="thrustTip[1]" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 3" />

      <text x="16" y="400" font-size="11" fill="var(--accent)">{{ t('heli.downwashLabel') }}</text>
      <text x="16" y="418" font-size="11" fill="var(--pos)">{{ t('heli.thrustLabel') }}</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('heli.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
