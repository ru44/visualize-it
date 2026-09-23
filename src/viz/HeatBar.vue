<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// 1D heat equation: a rod with a hot patch in the middle, ends held cold. Heat flows down the slope of the
// temperature curve (Fourier's law), so the peak spreads out and flattens — never the other way round.
// params: alpha (thermal diffusivity), width (how wide the hot patch starts), step (time, drives the animation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 121 // rod points, x = 0..120
const DT = 0.4 // stable for alpha*DT <= 0.5 (alpha maxes at 1)
const SUB_STEPS = 3
const T_HOT = 100

const alpha = computed(() => Math.max(0.05, Math.min(1, props.params.alpha ?? 0.3)))
const width = computed(() => Math.max(5, Math.min(60, Math.round(props.params.width ?? 20))))
const step = computed(() => Math.max(0, Math.min(200, Math.round(props.params.step ?? 0))))

function initRod(): Float64Array {
  const rod = new Float64Array(N)
  const half = width.value / 2
  const mid = (N - 1) / 2
  for (let i = 0; i < N; i++) if (Math.abs(i - mid) < half) rod[i] = T_HOT
  return rod
}

const rod = computed(() => {
  let cur = initRod()
  const a = alpha.value
  for (let s = 0; s < step.value * SUB_STEPS; s++) {
    const next = new Float64Array(N)
    for (let i = 0; i < N; i++) {
      if (i === 0 || i === N - 1) { next[i] = 0; continue } // ends held in ice water
      next[i] = cur[i] + a * DT * (cur[i - 1] - 2 * cur[i] + cur[i + 1])
    }
    cur = next
  }
  return cur
})

const PAD = { l: 52, r: 20, t: 100, b: 40 }
const BAR = { y: 46, h: 34 }
const sx = (i: number) => PAD.l + (i / (N - 1)) * (W - PAD.l - PAD.r)
const sy = (temp: number) => H - PAD.b - (temp / T_HOT) * (H - PAD.t - PAD.b)
const curve = computed(() => Array.from(rod.value).map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(''))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= 200) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const centerTemp = computed(() => rod.value[(N - 1) / 2])
const maxTemp = computed(() => rod.value.reduce((m, v) => Math.max(m, v), 0))
const readouts = computed(() => [
  { label: t('heat.alpha'), value: fmt(alpha.value, 2) },
  { label: t('heat.step'), value: String(step.value) },
  { label: t('heat.center'), value: fmt(centerTemp.value, 1), color: 'var(--accent-2)' },
  { label: t('heat.max'), value: fmt(maxTemp.value, 1) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('heat.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('heat.hint') }}</text>
      <rect :x="PAD.l" :y="BAR.y" :width="W - PAD.l - PAD.r" :height="BAR.h" rx="4" fill="var(--sunken)" stroke="var(--line)" />
      <rect
        v-for="(v, i) in rod"
        :key="i"
        :x="sx(i) - (W - PAD.l - PAD.r) / (2 * (N - 1))"
        :y="BAR.y"
        :width="(W - PAD.l - PAD.r) / (N - 1) + 0.5"
        :height="BAR.h"
        fill="var(--accent-2)"
        :fill-opacity="v / T_HOT"
      />
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="f in [0, 0.25, 0.5, 0.75, 1]" :key="f">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(f * T_HOT)" :y2="sy(f * T_HOT)" stroke="var(--grid)" />
          <text :x="PAD.l - 6" :y="sy(f * T_HOT) + 4" text-anchor="end">{{ Math.round(f * T_HOT) }}</text>
        </template>
        <template v-for="i in 5" :key="'x' + i">
          <text :x="sx(((N - 1) * i) / 5)" :y="H - PAD.b + 16" text-anchor="middle">{{ Math.round(((N - 1) * i) / 5) }}</text>
        </template>
      </g>
      <path :d="curve" fill="none" stroke="var(--accent)" stroke-width="2.5" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
