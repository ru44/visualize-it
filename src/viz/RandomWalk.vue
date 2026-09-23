<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Several walkers each take N steps of +1 or -1. No single walker's path is predictable, but the typical
// distance from the start across many walkers grows like sqrt(N). params: N (steps), walkers, speed.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 56, r: 20, t: 24, b: 36 }
const N = computed(() => Math.max(20, Math.min(2000, Math.round(props.params.N ?? 500))))
const walkers = computed(() => Math.max(1, Math.min(20, Math.round(props.params.walkers ?? 8))))
const speed = computed(() => Math.max(1, Math.min(400, Math.round(props.params.speed ?? 80))))

// Seeded per walker index so the same slider values always draw the same paths.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
const paths = computed(() =>
  Array.from({ length: walkers.value }, (_, w) => {
    const rnd = mulberry32(1000 + w * 7919)
    const pos = new Float64Array(N.value + 1)
    for (let i = 1; i <= N.value; i++) pos[i] = pos[i - 1] + (rnd() < 0.5 ? -1 : 1)
    return pos
  }),
)

const revealed = ref(0)
const playing = ref(true)
let raf = 0
let last = 0
let acc = 0
function tick(now: number) {
  if (playing.value && revealed.value < N.value) {
    acc += (speed.value * Math.min(now - last, 50)) / 1000
    last = now
    const add = Math.floor(acc)
    if (add) {
      acc -= add
      revealed.value = Math.min(N.value, revealed.value + add)
    }
  } else last = now
  raf = requestAnimationFrame(tick)
}
function restart() {
  revealed.value = 0
  acc = 0
}
watch([N, walkers], restart)
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = false
    revealed.value = N.value
  }
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const yRange = computed(() => Math.max(6, 3 * Math.sqrt(N.value)))
const sx = (i: number) => PAD.l + (i / N.value) * (W - PAD.l - PAD.r)
const sy = (v: number) => H / 2 - (v / yRange.value) * ((H - PAD.t - PAD.b) / 2)
const linePath = (pos: Float64Array) => Array.from({ length: revealed.value + 1 }, (_, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(pos[i]).toFixed(1)}`).join('')
const band = computed(() => {
  let up = ''
  let lo = ''
  for (let i = 0; i <= revealed.value; i += Math.max(1, Math.floor(revealed.value / 100))) {
    const s = Math.sqrt(i)
    up += `${up ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(s).toFixed(1)}`
    lo = `L${sx(i).toFixed(1)},${sy(-s).toFixed(1)}` + lo
  }
  return up + lo + 'Z'
})
const rms = computed(() => {
  if (!revealed.value) return 0
  let sum = 0
  for (const p of paths.value) sum += p[revealed.value] ** 2
  return Math.sqrt(sum / paths.value.length)
})
const readouts = computed(() => [
  { label: t('walk.steps'), value: String(revealed.value) },
  { label: t('walk.rms'), value: fmt(rms.value, 2), color: 'var(--accent-2)' },
  { label: t('walk.expected'), value: fmt(Math.sqrt(revealed.value), 2), color: 'var(--accent)' },
  { label: t('walk.tracked'), value: fmt(paths.value[0]?.[revealed.value] ?? 0, 0) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('walk.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('walk.hint') }}</text>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="sy(0)" :y2="sy(0)" stroke="var(--line)" />
      <path :d="band" fill="var(--accent)" fill-opacity="0.08" />
      <path v-for="(p, w) in paths" :key="w" :d="linePath(p)" fill="none" :stroke="w === 0 ? 'var(--accent-2)' : 'var(--muted)'" :stroke-width="w === 0 ? 2.5 : 1" :stroke-opacity="w === 0 ? 1 : 0.35" />
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('walk.axisHint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
