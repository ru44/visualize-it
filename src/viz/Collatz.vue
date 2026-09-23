<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Halve an even number, triple an odd one and add 1. Every start ever tried reaches 1 — nobody can prove it
// always will. params: start (the number to test), step (how far into its trip we're looking, 0..1).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = { l: 56, r: 20, t: 24, b: 40 }

const start = computed(() => Math.max(2, Math.min(9999, Math.round(props.params.start ?? 27))))
const step = computed(() => Math.max(0, Math.min(1, props.params.step ?? 0)))

const trace = computed<number[]>(() => {
  const seq = [start.value]
  let n = start.value
  while (n !== 1 && seq.length < 1000) {
    n = n % 2 === 0 ? n / 2 : 3 * n + 1
    seq.push(n)
  }
  return seq
})
const maxVal = computed(() => Math.max(...trace.value, 2))
const idx = computed(() => Math.round(step.value * (trace.value.length - 1)))
const current = computed(() => trace.value[idx.value] ?? start.value)

const sx = (i: number) => PAD.l + (i / Math.max(1, trace.value.length - 1)) * (W - PAD.l - PAD.r)
const logMax = computed(() => Math.log10(maxVal.value))
const sy = (v: number) => H - PAD.b - (Math.log10(Math.max(1, v)) / logMax.value) * (H - PAD.t - PAD.b)
const path = computed(() => trace.value.slice(0, idx.value + 1).map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(''))
const rest = computed(() => trace.value.slice(idx.value).map((v, i) => `${i ? 'L' : 'M'}${sx(idx.value + i).toFixed(1)},${sy(v).toFixed(1)}`).join(''))

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 25) {
    last = now
    const next = step.value + 1 / 240
    if (next >= 1) {
      emit('set', 'step', 1)
      playing.value = false
    } else emit('set', 'step', next)
  }
  raf = requestAnimationFrame(tick)
}
function restart() {
  emit('set', 'step', 0)
}
watch(start, restart)
onMounted(() => {
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('collatz.step'), value: `${idx.value} / ${trace.value.length - 1}` },
  { label: t('collatz.value'), value: String(current.value), color: 'var(--accent-2)' },
  { label: t('collatz.max'), value: String(maxVal.value), color: 'var(--accent)' },
  { label: t('collatz.parity'), value: current.value % 2 === 0 ? t('collatz.even') : t('collatz.odd') },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('collatz.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('collatz.hint', { n: start }) }}</text>
      <line :x1="PAD.l" :x2="W - PAD.r" :y1="H - PAD.b" :y2="H - PAD.b" stroke="var(--line)" />
      <line :x1="PAD.l" :x2="PAD.l" :y1="PAD.t" :y2="H - PAD.b" stroke="var(--line)" />
      <text class="num" :x="PAD.l - 8" :y="sy(1) + 4" text-anchor="end" font-size="11" fill="var(--muted)">1</text>
      <text class="num" :x="PAD.l - 8" :y="sy(maxVal) + 4" text-anchor="end" font-size="11" fill="var(--muted)">{{ maxVal }}</text>
      <path :d="rest" fill="none" stroke="var(--line)" stroke-width="1.5" />
      <path :d="path" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <circle v-if="trace[idx] !== undefined" :cx="sx(idx)" :cy="sy(trace[idx])" r="5" fill="var(--accent-2)" />
      <text class="num" :x="W - PAD.r" :y="H - 8" text-anchor="end" font-size="12" fill="var(--muted)">{{ t('collatz.axisHint') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
