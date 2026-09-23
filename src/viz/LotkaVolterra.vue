<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Predator and prey numbers chase each other forever: more prey feeds more predators, more
// predators thin the prey, fewer prey starves the predators, and prey recover. Plotted against
// each other instead of against time, that chase draws a closed loop — the further the starting
// point sits from the one population where nothing moves, the bigger the loop.
// params: alpha,beta,gamma,delta (rates), x0,y0 (starting populations), tView (0..1 of the run).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const DT = 0.02
const T_MAX = 50
const STEPS = Math.round(T_MAX / DT)

const alpha = computed(() => props.params.alpha ?? 1)
const beta = computed(() => props.params.beta ?? 0.1)
const gamma = computed(() => props.params.gamma ?? 0.6)
const delta = computed(() => props.params.delta ?? 0.1)
const x0 = computed(() => Math.max(1, props.params.x0 ?? 40))
const y0 = computed(() => Math.max(1, props.params.y0 ?? 9))
const tView = computed(() => Math.max(0, Math.min(1, props.params.tView ?? 0)))

const eqX = computed(() => gamma.value / (delta.value * beta.value))
const eqY = computed(() => alpha.value / beta.value)

function deriv(x: number, y: number): [number, number] {
  return [alpha.value * x - beta.value * x * y, delta.value * beta.value * x * y - gamma.value * y]
}

const trajectory = computed(() => {
  let x = x0.value
  let y = y0.value
  const pts: { t: number; x: number; y: number }[] = [{ t: 0, x, y }]
  for (let i = 1; i <= STEPS; i++) {
    const k1 = deriv(x, y)
    const k2 = deriv(x + (DT / 2) * k1[0], y + (DT / 2) * k1[1])
    const k3 = deriv(x + (DT / 2) * k2[0], y + (DT / 2) * k2[1])
    const k4 = deriv(x + DT * k3[0], y + DT * k3[1])
    x = Math.max(0.01, x + (DT / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]))
    y = Math.max(0.01, y + (DT / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]))
    pts.push({ t: i * DT, x, y })
  }
  return pts
})

const maxX = computed(() => Math.max(eqX.value, ...trajectory.value.map((p) => p.x)) * 1.15)
const maxY = computed(() => Math.max(eqY.value, ...trajectory.value.map((p) => p.y)) * 1.15)
const swing = computed(() => Math.max(...trajectory.value.map((p) => p.x)) - Math.min(...trajectory.value.map((p) => p.x)))

// Phase panel (prey vs predator): the closed loop.
const PX = { x: 40, y: 50, w: 330, h: 350 }
const px = (x: number) => PX.x + (x / maxX.value) * PX.w
const py = (y: number) => PX.y + PX.h - (y / maxY.value) * PX.h
const orbit = computed(() => trajectory.value.map((p) => `${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' '))

// Time panel: both populations against time, with a marker at the shown moment.
const TX = { x: 430, y: 50, w: 330, h: 350 }
const scaleMax = computed(() => Math.max(maxX.value, maxY.value))
const tx = (t: number) => TX.x + (t / T_MAX) * TX.w
const ty = (v: number) => TX.y + TX.h - (v / scaleMax.value) * TX.h
const preyLine = computed(() => trajectory.value.map((p) => `${tx(p.t).toFixed(1)},${ty(p.x).toFixed(1)}`).join(' '))
const predLine = computed(() => trajectory.value.map((p) => `${tx(p.t).toFixed(1)},${ty(p.y).toFixed(1)}`).join(' '))

const fi = computed(() => Math.round(tView.value * STEPS))
const now = computed(() => trajectory.value[fi.value])

const playing = ref(false)
let raf = 0
let last = 0
function tick(t0: number) {
  if (playing.value) {
    const dt = Math.min(t0 - last, 50) / 1000
    let v = tView.value + dt / 10
    if (v >= 1) (v = 1), (playing.value = false)
    emit('set', 'tView', v)
  }
  last = t0
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([alpha, beta, gamma, delta, x0, y0], () => { emit('set', 'tView', 0); playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches })
function restart() {
  emit('set', 'tView', 0)
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
}

const readouts = computed(() => [
  { label: t('lv.t'), value: fmt(now.value.t, 1) },
  { label: t('lv.prey'), value: fmt(now.value.x, 1), color: 'var(--accent)' },
  { label: t('lv.pred'), value: fmt(now.value.y, 1), color: 'var(--accent-2)' },
  { label: t('lv.swing'), value: fmt(swing.value, 1) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('lv.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('lv.hint') }}</text>
      <text :x="PX.x" :y="PX.y - 8" font-size="12" fill="var(--muted)">{{ t('lv.phase') }}</text>
      <text :x="TX.x" :y="TX.y - 8" font-size="12" fill="var(--muted)">{{ t('lv.overTime') }}</text>
      <rect :x="PX.x" :y="PX.y" :width="PX.w" :height="PX.h" fill="var(--sunken)" stroke="var(--line)" />
      <rect :x="TX.x" :y="TX.y" :width="TX.w" :height="TX.h" fill="var(--sunken)" stroke="var(--line)" />

      <line :x1="px(eqX)" :x2="px(eqX)" :y1="PX.y" :y2="PX.y + PX.h" stroke="var(--muted)" stroke-dasharray="3 4" />
      <line :x1="PX.x" :x2="PX.x + PX.w" :y1="py(eqY)" :y2="py(eqY)" stroke="var(--muted)" stroke-dasharray="3 4" />
      <polyline :points="orbit" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <circle :cx="px(x0)" :cy="py(y0)" r="4" fill="var(--fg)" />
      <circle :cx="px(now.x)" :cy="py(now.y)" r="6" fill="var(--accent)" />
      <text :x="PX.x + PX.w - 4" :y="PX.y + PX.h - 6" text-anchor="end" font-size="10" fill="var(--muted)">{{ t('lv.prey') }} →</text>
      <text :x="PX.x + 4" :y="PX.y + 12" font-size="10" fill="var(--muted)">↑ {{ t('lv.pred') }}</text>

      <polyline :points="preyLine" fill="none" stroke="var(--accent)" stroke-width="2" />
      <polyline :points="predLine" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <line :x1="tx(now.t)" :x2="tx(now.t)" :y1="TX.y" :y2="TX.y + TX.h" stroke="var(--fg)" stroke-opacity="0.4" />
      <g class="num" font-size="11" text-anchor="end">
        <text :x="TX.x + TX.w" :y="TX.y + 12" fill="var(--accent)">— {{ t('lv.prey') }}</text>
        <text :x="TX.x + TX.w" :y="TX.y + 26" fill="var(--accent-2)">— {{ t('lv.pred') }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
