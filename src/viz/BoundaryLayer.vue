<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A ball in a flow: a thin band traces the boundary layer around its front, and where it lets
// go (separates) sets how big the turbulent wake behind it is — the whole point being that
// tripping the layer turbulent EARLY (dimples) delays separation and shrinks the wake.
// params: v (m/s), d (diameter, m), roughness (0 smooth / 1 dimpled).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const CX = 280
const CY = 240
const MU = 1.81e-5
const RHO = 1.225

const v = computed(() => Math.max(0.1, props.params.v ?? 25))
const d = computed(() => Math.max(0.02, props.params.d ?? 0.043))
const rough = computed(() => (props.params.roughness ?? 0) > 0.5)

const Re = computed(() => (RHO * v.value * d.value) / MU)
const ReTrans = computed(() => (rough.value ? 40000 : 300000))
const turbulent = computed(() => Re.value >= ReTrans.value)
const sepAngle = computed(() => (turbulent.value ? 120 : 82)) // degrees from the front stagnation point
const Cd = computed(() => (turbulent.value ? 0.2 : 0.5))
const drag = computed(() => 0.5 * RHO * v.value * v.value * ((Math.PI * d.value * d.value) / 4) * Cd.value)

const rpx = computed(() => 25 + Math.min(1, (d.value - 0.02) / 0.68) * 85)

function pt(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)] as [number, number]
}
function arcPath(fromDeg: number, toDeg: number, r: number) {
  const steps = 24
  let d0 = ''
  for (let i = 0; i <= steps; i++) {
    const a = fromDeg + ((toDeg - fromDeg) * i) / steps
    const [x, y] = pt(a, r)
    d0 += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
  }
  return d0
}

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

const bandUpper = computed(() => arcPath(180, 180 - sepAngle.value, rpx.value + 3))
const bandLower = computed(() => arcPath(180, 180 + sepAngle.value, rpx.value + 3))

// The wake's MOUTH is always drawn right at the ball's own edge (never overlapping its fill,
// which is drawn on top anyway) — laminar vs turbulent shows up as a wider/longer wake versus a
// narrower/shorter one, which is the part that actually matters for how much drag it costs.
const wake = computed(() => {
  const sepX = CX + rpx.value
  const halfW = rpx.value * (turbulent.value ? 0.55 : 0.98)
  const len = turbulent.value ? 90 : 190
  const wob = turbulent.value ? 10 : 22
  const n = 20
  const top: [number, number][] = []
  const bot: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const f = i / n
    const x = sepX + f * len
    const wiggle = wob * Math.sin(f * 7 + time.value * 3) * f
    top.push([x, CY - halfW * (1 - f * 0.15) + wiggle])
    bot.push([x, CY + halfW * (1 - f * 0.15) - wiggle])
  }
  const pts = [...top, ...bot.reverse()]
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ' Z'
})

const readouts = computed(() => [
  { label: 'Re', value: Re.value >= 1000 ? Re.value.toExponential(2) : fmt(Re.value, 0) },
  { label: t('bl.regime'), value: turbulent.value ? t('bl.turbulent') : t('bl.laminar'), color: turbulent.value ? 'var(--pos)' : 'var(--accent-2)' },
  { label: t('bl.sep'), value: `${fmt(sepAngle.value, 0)}°` },
  { label: 'C_d', value: fmt(Cd.value, 2) },
  { label: t('bl.drag'), value: `${fmt(drag.value, 2)} N`, color: 'var(--accent-2)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('bl.hint') }}</text>

      <path v-for="i in 5" :key="i" :d="`M40,${140 + i * 30} L${CX - rpx - 6},${140 + i * 30}`" stroke="var(--muted)" stroke-width="1.2" stroke-opacity="0.55" />

      <path :d="wake" fill="var(--accent-2)" opacity="0.18" />
      <path :d="wake" fill="none" stroke="var(--accent-2)" stroke-width="1.2" opacity="0.55" />

      <path :d="bandUpper" fill="none" :stroke="turbulent ? 'var(--pos)' : 'var(--accent)'" stroke-width="4" stroke-opacity="0.7" />
      <path :d="bandLower" fill="none" :stroke="turbulent ? 'var(--pos)' : 'var(--accent)'" stroke-width="4" stroke-opacity="0.7" />

      <circle :cx="CX" :cy="CY" :r="rpx" fill="var(--sunken)" stroke="var(--fg)" stroke-width="1.5" />
      <g v-if="rough">
        <circle v-for="i in 10" :key="i" :cx="CX + rpx * 0.6 * Math.cos((i / 10) * 6.28)" :cy="CY + rpx * 0.6 * Math.sin((i / 10) * 6.28)" r="2.4" fill="var(--muted)" opacity="0.6" />
      </g>

      <text x="16" y="46" font-size="11" fill="var(--muted)">{{ t('bl.wakeLabel') }}</text>
      <text class="num" x="16" y="464" font-size="12" fill="var(--muted)">{{ t('bl.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
