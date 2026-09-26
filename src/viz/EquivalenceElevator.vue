<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A sealed elevator accelerating upward at rate a (equivalently: sitting still in gravity g = a). A ball
// tossed sideways at speed u falls exactly like it would under ordinary gravity, y = 1/2 a t^2 — and so,
// by the same formula, does a beam of light crossing the same cabin, just enormously faster and so by an
// enormously smaller amount. params a (m/s^2), u (m/s, the ball's own toss speed).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const C = 299792458 // m/s
const PXPM = 160 // px per metre
const CAB_W_M = 2.4 // cabin width, m
const CAB_H_M = 2.15 // cabin height, m
const CAB_X = 190
const CAB_Y = 66
const START_FRAC = 0.14 // ball launched this far down from the ceiling

const a = computed(() => Math.max(0.1, props.params.a ?? 9.81))
const u = computed(() => Math.max(0.05, props.params.u ?? 2.5))
const startY_m = computed(() => CAB_H_M * START_FRAC)
const dropCapacity_m = computed(() => CAB_H_M - startY_m.value)
const tWall = computed(() => CAB_W_M / u.value)
const tFloor = computed(() => Math.sqrt((2 * dropCapacity_m.value) / a.value))
const landT = computed(() => Math.min(tWall.value, tFloor.value))
const crossed = computed(() => tWall.value <= tFloor.value)
const landX_m = computed(() => u.value * landT.value)

const yLight_m = computed(() => 0.5 * a.value * (CAB_W_M / C) ** 2)

const CYCLE_PAD = 0.8 // s pause at the end of each loop
const state = reactive({ t: 0 })
let raf = 0
let last = 0
function frame(now: number) {
  const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
  last = now
  const cycle = landT.value + CYCLE_PAD
  state.t = (state.t + dt) % cycle
  raf = requestAnimationFrame(frame)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(frame)
  else state.t = 0
})
onUnmounted(() => cancelAnimationFrame(raf))
watch([a, u], () => (state.t = 0))

const ballT = computed(() => Math.min(state.t, landT.value))
const ballX = computed(() => CAB_X + u.value * ballT.value * PXPM)
const ballY = computed(() => CAB_Y + (startY_m.value + 0.5 * a.value * ballT.value * ballT.value) * PXPM)

const trailPath = computed(() => {
  const pts: string[] = []
  const n = 24
  for (let i = 0; i <= n; i++) {
    const tt = (ballT.value * i) / n
    const x = CAB_X + u.value * tt * PXPM
    const y = CAB_Y + (startY_m.value + 0.5 * a.value * tt * tt) * PXPM
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return pts.join('')
})

// magnified inset: same shape, a fixed pixel amplification so the curve stays legible — real amount in readouts
const INSET = { x: 600, y: 340, w: 160, h: 90 }
const insetSagPx = computed(() => Math.min(60, 3 * a.value))
const insetPath = computed(() => `M${INSET.x + 10},${INSET.y + 15} Q${INSET.x + 80},${INSET.y + 15 + insetSagPx.value * 0.4} ${INSET.x + 150},${INSET.y + 15 + insetSagPx.value}`)

const readouts = computed(() => [
  { label: 'a', value: `${fmt(a.value, 2)} m/s²`, color: 'var(--accent)' },
  { label: 'u', value: `${fmt(u.value, 2)} m/s` },
  { label: t('eqel.ball'), value: crossed.value ? t('eqel.crosses') : `${t('eqel.lands')} ${fmt(landX_m.value, 2)} m`, color: crossed.value ? 'var(--pos)' : 'var(--accent-2)' },
  { label: t('eqel.light'), value: `${yLight_m.value.toExponential(2)} m`, color: 'var(--muted)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('eqel.hint') }}</text>

      <rect :x="CAB_X" :y="CAB_Y" :width="CAB_W_M * PXPM" :height="CAB_H_M * PXPM" fill="var(--accent)" fill-opacity="0.05" stroke="var(--fg)" stroke-width="2" />
      <line :x1="CAB_X" :x2="CAB_X + CAB_W_M * PXPM" :y1="CAB_Y + CAB_H_M * PXPM" :y2="CAB_Y + CAB_H_M * PXPM" stroke="var(--fg)" stroke-width="4" />
      <line :x1="CAB_X" :x2="CAB_X + CAB_W_M * PXPM" :y1="CAB_Y + startY_m * PXPM" :y2="CAB_Y + startY_m * PXPM" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 4" opacity="0.6" />

      <path :d="trailPath" fill="none" stroke="var(--accent-2)" stroke-width="2.5" />
      <circle :cx="ballX" :cy="ballY" r="9" fill="var(--accent-2)" />
      <text class="num" :x="CAB_X + 6" :y="CAB_Y + startY_m * PXPM - 8" font-size="11" fill="var(--muted)">{{ t('eqel.toss') }} u</text>

      <text class="num" :x="CAB_X + (CAB_W_M * PXPM) / 2" :y="CAB_Y + CAB_H_M * PXPM + 26" text-anchor="middle" font-size="12" fill="var(--fg)" font-weight="600">
        a = {{ fmt(a, 2) }} m/s² — {{ crossed ? t('eqel.crosses') : t('eqel.lands') + ' ' + fmt(landX_m, 2) + ' m' }}
      </text>

      <rect :x="INSET.x - 10" :y="INSET.y - 10" :width="INSET.w + 20" :height="INSET.h + 20" fill="var(--panel)" stroke="var(--line)" rx="6" />
      <text class="num" :x="INSET.x + INSET.w / 2" :y="INSET.y" text-anchor="middle" font-size="10" fill="var(--muted)">{{ t('eqel.lightZoom') }}</text>
      <path :d="insetPath" fill="none" stroke="var(--accent)" stroke-width="2" />
      <text class="num" :x="INSET.x + INSET.w / 2" :y="INSET.y + INSET.h + 12" text-anchor="middle" font-size="10" fill="var(--fg)">{{ yLight_m.toExponential(2) }} m</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
