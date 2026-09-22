<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Records every comparison/swap of an algorithm on a fixed array, then plays the trace.
// options.algorithm: 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick'. params: n (size), step (0..1 progress).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
interface Frame { arr: number[]; cmp: [number, number] | null; swapped: boolean; sorted: number[] }
const n = computed(() => Math.max(4, Math.min(40, Math.round(props.params.n ?? 12))))
const seed = ref(1)
function rng() {
  // deterministic so the same n gives the same array until shuffled
  let s = seed.value * 9301 + 49297
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}
const start = computed(() => {
  const r = rng()
  return Array.from({ length: n.value }, () => 5 + Math.floor(r() * 95))
})

const trace = computed<Frame[]>(() => {
  const a = start.value.slice()
  const frames: Frame[] = [{ arr: a.slice(), cmp: null, swapped: false, sorted: [] }]
  const rec = (cmp: [number, number] | null, swapped: boolean, sorted: number[]) => frames.length < 4000 && frames.push({ arr: a.slice(), cmp, swapped, sorted: sorted.slice() })
  const sorted: number[] = []
  const alg = props.options.algorithm ?? 'bubble'
  if (alg === 'bubble') {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        rec([j, j + 1], false, sorted)
        if (a[j] > a[j + 1]) ([a[j], a[j + 1]] = [a[j + 1], a[j]]), rec([j, j + 1], true, sorted)
      }
      sorted.unshift(a.length - 1 - i)
    }
  } else if (alg === 'selection') {
    for (let i = 0; i < a.length; i++) {
      let m = i
      for (let j = i + 1; j < a.length; j++) { rec([m, j], false, sorted); if (a[j] < a[m]) m = j }
      if (m !== i) ([a[i], a[m]] = [a[m], a[i]]), rec([i, m], true, sorted)
      sorted.push(i)
    }
  } else if (alg === 'insertion') {
    for (let i = 1; i < a.length; i++) {
      let j = i
      while (j > 0) { rec([j - 1, j], false, sorted); if (a[j - 1] > a[j]) ([a[j - 1], a[j]] = [a[j], a[j - 1]]), rec([j - 1, j], true, sorted), j--; else break }
    }
    for (let i = 0; i < a.length; i++) sorted.push(i)
  } else if (alg === 'quick') {
    const qs = (lo: number, hi: number) => {
      if (lo >= hi) { if (lo === hi) sorted.push(lo); return }
      const p = a[hi]
      let i = lo
      for (let j = lo; j < hi; j++) { rec([j, hi], false, sorted); if (a[j] < p) { if (i !== j) ([a[i], a[j]] = [a[j], a[i]]), rec([i, j], true, sorted); i++ } }
      ;[a[i], a[hi]] = [a[hi], a[i]]; rec([i, hi], true, sorted); sorted.push(i)
      qs(lo, i - 1); qs(i + 1, hi)
    }
    qs(0, a.length - 1)
  } else {
    // merge sort, in place via auxiliary array, recording writes as "swaps"
    const ms = (lo: number, hi: number) => {
      if (hi - lo < 1) return
      const mid = (lo + hi) >> 1
      ms(lo, mid); ms(mid + 1, hi)
      const tmp: number[] = []
      let i = lo, j = mid + 1
      while (i <= mid && j <= hi) { rec([i, j], false, sorted); tmp.push(a[i] <= a[j] ? a[i++] : a[j++]) }
      while (i <= mid) tmp.push(a[i++]); while (j <= hi) tmp.push(a[j++])
      tmp.forEach((v, k) => { a[lo + k] = v; rec([lo + k, lo + k], true, sorted) })
      if (lo === 0 && hi === a.length - 1) for (let k = 0; k < a.length; k++) sorted.push(k)
    }
    ms(0, a.length - 1)
  }
  frames.push({ arr: a.slice(), cmp: null, swapped: false, sorted: a.map((_, i) => i) })
  return frames
})
const progress = computed(() => Math.min(1, Math.max(0, props.params.step ?? 0)))
const fi = computed(() => Math.round(progress.value * (trace.value.length - 1)))
const frame = computed(() => trace.value[fi.value])
const compares = computed(() => trace.value.slice(1, fi.value + 1).filter((f) => f.cmp && !f.swapped).length)
const swaps = computed(() => trace.value.slice(1, fi.value + 1).filter((f) => f.swapped).length)

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    const v = progress.value + dt / Math.max(4, Math.min(20, trace.value.length / 40))
    if (v >= 1) (emit('set', 'step', 1), (playing.value = false))
    else emit('set', 'step', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([n, seed], () => (emit('set', 'step', 0), (playing.value = true)))

const bw = computed(() => (W - 40) / n.value)
const readouts = computed(() => [
  { label: t('sort.step'), value: `${fi.value} / ${trace.value.length - 1}` },
  { label: t('sort.compares'), value: String(compares.value), color: 'var(--accent)' },
  { label: t('sort.swaps'), value: String(swaps.value), color: 'var(--accent-2)' },
  { label: 'n', value: String(n.value) },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && progress >= 1) $emit('set', 'step', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="seed++">{{ t('sort.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('sort.hint') }}</text>
      <g v-for="(v, i) in frame.arr" :key="i">
        <rect
          :x="20 + i * bw + 2"
          :y="H - 50 - v * 3.6"
          :width="Math.max(2, bw - 4)"
          :height="v * 3.6"
          rx="3"
          :fill="frame.cmp && (frame.cmp[0] === i || frame.cmp[1] === i) ? (frame.swapped ? 'var(--accent-2)' : 'var(--neg)') : frame.sorted.includes(i) ? 'var(--pos)' : 'var(--accent)'"
          :fill-opacity="frame.sorted.includes(i) || (frame.cmp && (frame.cmp[0] === i || frame.cmp[1] === i)) ? 1 : 0.55"
        />
        <text v-if="n <= 20" class="num" :x="20 + i * bw + bw / 2" :y="H - 34" text-anchor="middle" font-size="11" fill="var(--muted)">{{ v }}</text>
      </g>
      <text v-if="progress >= 1" class="num" :x="W / 2" y="60" text-anchor="middle" font-size="14" fill="var(--pos)">✓ {{ t('sort.done') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
