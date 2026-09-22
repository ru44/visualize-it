<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Repeated random trials: the running proportion of successes wanders, then settles toward p.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 52, r: 20, t: 24, b: 40 }
const p = computed(() => props.params.p ?? 0.5)
const N = computed(() => Math.max(10, Math.round(props.params.N ?? 500)))
const speed = computed(() => Math.max(1, Math.round(props.params.speed ?? 10)))

const outcomes = ref<number[]>([])
const running = ref(true)
let raf = 0
let acc = 0
function tick() {
  if (running.value && outcomes.value.length < N.value) {
    acc += speed.value / 60
    const add = Math.floor(acc)
    if (add) {
      acc -= add
      const next = outcomes.value.slice()
      for (let i = 0; i < add && next.length < N.value; i++) next.push(Math.random() < p.value ? 1 : 0)
      outcomes.value = next
    }
  }
  raf = requestAnimationFrame(tick)
}
function restart() {
  outcomes.value = []
  acc = 0
}
watch([p, N], restart)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(tick)
else outcomes.value = Array.from({ length: N.value }, () => (Math.random() < p.value ? 1 : 0))
onUnmounted(() => cancelAnimationFrame(raf))

const heads = computed(() => outcomes.value.reduce((a, b) => a + b, 0))
const sx = (i: number) => PAD.l + (i / N.value) * (W - PAD.l - PAD.r)
const sy = (f: number) => H - PAD.b - f * (H - PAD.t - PAD.b)
const path = computed(() => {
  let d = ''
  let sum = 0
  outcomes.value.forEach((o, i) => {
    sum += o
    d += `${i ? 'L' : 'M'}${sx(i + 1).toFixed(1)},${sy(sum / (i + 1)).toFixed(1)}`
  })
  return d
})
// 95% band: p ± 1.96·sqrt(p(1−p)/n) — where the running proportion is expected to stay.
const band = computed(() => {
  let up = ''
  let lo = ''
  for (let i = 1; i <= N.value; i += Math.max(1, Math.floor(N.value / 200))) {
    const s = 1.96 * Math.sqrt((p.value * (1 - p.value)) / i)
    up += `${up ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(Math.min(1, p.value + s)).toFixed(1)}`
    lo = `L${sx(i).toFixed(1)},${sy(Math.max(0, p.value - s)).toFixed(1)}` + lo
  }
  return up + lo + 'Z'
})
const readouts = computed(() => {
  const n = outcomes.value.length
  return [
    { label: t('coin.trials'), value: String(n) },
    { label: t('coin.successes'), value: String(heads.value) },
    { label: t('coin.proportion'), value: n ? fmt(heads.value / n, 4) : '—', color: 'var(--accent-2)' },
    { label: 'p', value: fmt(p.value, 3), color: 'var(--accent)' },
    { label: t('coin.gap'), value: n ? fmt(Math.abs(heads.value / n - p.value), 4) : '—' },
  ]
})
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="running = !running">{{ running ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('coin.again') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <g class="num" font-size="11" fill="var(--muted)">
        <template v-for="f in [0, 0.25, 0.5, 0.75, 1]" :key="f">
          <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(f)" :y2="sy(f)" stroke="var(--grid)" />
          <text :x="PAD.l - 6" :y="sy(f) + 4" text-anchor="end">{{ f }}</text>
        </template>
        <template v-for="i in 5" :key="'x' + i">
          <text :x="sx((N * i) / 5)" :y="H - PAD.b + 16" text-anchor="middle">{{ Math.round((N * i) / 5) }}</text>
        </template>
      </g>
      <path :d="band" fill="var(--accent)" fill-opacity="0.08" />
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(p)" :y2="sy(p)" stroke="var(--accent)" stroke-dasharray="5 4" />
      <path :d="path" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      <g v-for="(o, i) in outcomes.slice(-40)" :key="i">
        <circle :cx="PAD.l + 8 + i * 18" :cy="PAD.t + 4" r="6" :fill="o ? 'var(--accent-2)' : 'var(--line)'" />
      </g>
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('coin.band') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
