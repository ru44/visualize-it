<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Three kinds of radiation meet the same wall. Alpha and beta particles have a fixed range in matter
// (heavy or charged, they lose energy continuously and stop dead once they've travelled that far), so
// they are either fully blocked or pass untouched. Gamma rays are photons: each one either interacts
// or it doesn't, so a beam of them is only ever thinned, following the same halving law as a half-life,
// with the material's half-value layer H standing in for the half-life. params: type (0 alpha, 1 beta,
// 2 gamma — which lane is focused for the readouts), material (0 paper, 1 aluminium, 2 lead),
// thickness (mm).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const BEAM_X0 = 104
const BEAM_X1 = 730
const SHIELD_X = 430
const LANE_Y = [130, 260, 390]
const RANGE_ALPHA = 0.05 // mm, in any solid — a sheet of paper already stops it
const RANGE_BETA = [12, 3.5, 0.8] // mm to stop a ~2 MeV beta: paper, aluminium, lead
const HVL_GAMMA = [84, 29, 6.5] // mm to halve a ~0.66 MeV gamma beam: paper, aluminium, lead
const MATERIAL_OPACITY = [0.16, 0.45, 0.85]
const PARTICLE_COLOR = ['var(--accent)', 'var(--accent-2)', 'var(--fg)']
const N_PARTICLES = 9

const type = computed(() => Math.max(0, Math.min(2, Math.round(props.params.type ?? 0))))
const material = computed(() => Math.max(0, Math.min(2, Math.round(props.params.material ?? 1))))
const thickness = computed(() => Math.max(0, Math.min(50, props.params.thickness ?? 5)))

const shieldPx = computed(() => (thickness.value > 0 ? 6 + thickness.value * 4 : 0))

function stoppedAlpha(x: number) { return x >= RANGE_ALPHA }
function stoppedBeta(x: number, m: number) { return x >= RANGE_BETA[m] }
function transmissionGamma(x: number, m: number) { return Math.pow(0.5, x / HVL_GAMMA[m]) }
function seeded(i: number) { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s) }

const outcomes = computed(() =>
  [0, 1, 2].map((k) => {
    if (thickness.value <= 0) return { blocked: false, frac: 1 }
    if (k === 0) return { blocked: stoppedAlpha(thickness.value), frac: stoppedAlpha(thickness.value) ? 0 : 1 }
    if (k === 1) return { blocked: stoppedBeta(thickness.value, material.value), frac: stoppedBeta(thickness.value, material.value) ? 0 : 1 }
    const frac = transmissionGamma(thickness.value, material.value)
    return { blocked: false, frac }
  }),
)

// A slow decorative drift; each particle's fate at the wall is a deterministic function of its own
// index and the current sliders, so the picture is stable and reproducible, not flickering randomly.
const clock = ref(0)
let raf = 0
let last = 0
function tick(now: number) {
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  clock.value += dt
  raf = requestAnimationFrame(tick)
}
onMounted(() => { last = performance.now(); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const speed = 90 // px/s
function particles(lane: number) {
  const out: { x: number; y: number; visible: boolean }[] = []
  const laneLen = BEAM_X1 - BEAM_X0
  for (let i = 0; i < N_PARTICLES; i++) {
    const phase = (i / N_PARTICLES) * laneLen
    const x = BEAM_X0 + ((phase + clock.value * speed) % laneLen)
    const survives = lane === 2 ? seeded(i) < outcomes.value[2].frac : !outcomes.value[lane].blocked
    const hitsWall = shieldPx.value > 0 && x >= SHIELD_X
    const visible = !hitsWall || survives
    const px = hitsWall && !survives ? Math.min(x, SHIELD_X + shieldPx.value * 0.3) : x
    out.push({ x: px, y: LANE_Y[lane], visible })
  }
  return out
}
const lanes = computed(() => [0, 1, 2].map((k) => particles(k)))

const TYPE_KEYS = ['abg.alpha', 'abg.beta', 'abg.gamma'] as const
const MATERIAL_KEYS = ['abg.paper', 'abg.aluminium', 'abg.lead'] as const

const badge = computed(() => (k: number) => {
  const o = outcomes.value[k]
  if (k === 2) return `${fmt(o.frac * 100, 1)}%`
  return o.blocked ? t('abg.blocked') : t('abg.passes')
})
const badgeColor = (k: number) => {
  const o = outcomes.value[k]
  if (k === 2) return o.frac < 0.2 ? 'var(--pos)' : o.frac > 0.6 ? 'var(--neg)' : 'var(--muted)'
  return o.blocked ? 'var(--pos)' : 'var(--neg)'
}

const readouts = computed(() => [
  { label: t('abg.type'), value: t(TYPE_KEYS[type.value]) },
  { label: t('abg.material'), value: t(MATERIAL_KEYS[material.value]) },
  { label: t('abg.thickness'), value: `${fmt(thickness.value, 1)} mm` },
  { label: t('abg.outcome'), value: badge.value(type.value), color: badgeColor(type.value) },
])
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('abg.hint') }}</text>
      <line v-for="y in LANE_Y" :key="'l' + y" :x1="BEAM_X0" :x2="BEAM_X1" :y1="y" :y2="y" stroke="var(--line)" stroke-dasharray="2 4" />
      <rect v-if="shieldPx > 0" :x="SHIELD_X" :y="60" :width="shieldPx" :height="380" :fill="'var(--fg)'" :fill-opacity="MATERIAL_OPACITY[material]" stroke="var(--line)" />
      <text v-if="shieldPx > 0" :x="SHIELD_X + shieldPx / 2" y="50" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t(MATERIAL_KEYS[material]) }}</text>
      <g v-for="(lane, k) in lanes" :key="'lane' + k" :opacity="type === k ? 1 : 0.45">
        <text :x="BEAM_X0 - 16" :y="LANE_Y[k] + 4" text-anchor="end" font-size="13" :fill="PARTICLE_COLOR[k]">{{ t(TYPE_KEYS[k]) }}</text>
        <circle v-for="(p, i) in lane" :key="i" v-show="p.visible" :cx="p.x" :cy="p.y" r="5" :fill="PARTICLE_COLOR[k]" />
        <text :x="BEAM_X1 + 8" :y="LANE_Y[k] + 4" font-size="12" :fill="badgeColor(k)">{{ badge(k) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
