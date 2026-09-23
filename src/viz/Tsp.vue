<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Checking every route is (n-1)!/2 work: brute force scans them all and keeps the best; nearest
// neighbour instead always jumps to the closest unvisited city, which is fast but not always optimal.
// params: n (cities), mode (0 brute force scan, 1 nearest-neighbour build), step (0..1 progress).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 40
const n = computed(() => Math.max(4, Math.min(8, Math.round(props.params.n ?? 6))))
const mode = computed(() => (Math.round(props.params.mode ?? 0) ? 1 : 0))
const seed = ref(1)

function makeRng(s: number) {
  let x = s * 9301 + 49297
  return () => ((x = (x * 9301 + 49297) % 233280) / 233280)
}
const cities = computed(() => {
  const rng = makeRng(seed.value * 100 + n.value)
  return Array.from({ length: n.value }, () => ({ x: 0.1 + rng() * 0.8, y: 0.12 + rng() * 0.76 }))
})
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)
const pathLen = (order: number[]) => order.reduce((s, c, i) => s + dist(cities.value[c], cities.value[order[(i + 1) % order.length]]), 0)

function permute(arr: number[], cb: (p: number[]) => void) {
  const m = arr.length
  const c = new Array(m).fill(0)
  cb(arr.slice())
  let i = 0
  while (i < m) {
    if (c[i] < i) {
      if (i % 2 === 0) [arr[0], arr[i]] = [arr[i], arr[0]]
      else [arr[c[i]], arr[i]] = [arr[i], arr[c[i]]]
      cb(arr.slice())
      c[i]++
      i = 0
    } else { c[i] = 0; i++ }
  }
}
const optimal = computed(() => {
  let best = Infinity
  let bestOrder: number[] = []
  permute(Array.from({ length: n.value - 1 }, (_, i) => i + 1), (perm) => {
    const order = [0, ...perm]
    const len = pathLen(order)
    if (len < best) { best = len; bestOrder = order }
  })
  return { len: best, order: bestOrder }
})

interface Frame { order: number[]; len: number; best: number; checked: number }
const trace = computed<Frame[]>(() => {
  const frames: Frame[] = []
  if (mode.value === 0) {
    let checked = 0
    let best = Infinity
    let bestOrder: number[] = []
    const total = Array.from({ length: n.value - 1 }).reduce((a: number, _, i) => a * (i + 1), 1)
    const stride = Math.max(1, Math.floor(total / 220))
    permute(Array.from({ length: n.value - 1 }, (_, i) => i + 1), (perm) => {
      checked++
      const order = [0, ...perm]
      const len = pathLen(order)
      if (len < best) { best = len; bestOrder = order }
      if (checked % stride === 0 || checked === total) frames.push({ order: order.slice(), len, best, checked })
    })
    if (!frames.length || frames[frames.length - 1].checked !== checked) frames.push({ order: bestOrder, len: best, best, checked })
  } else {
    const visited = [0]
    const remaining = new Set(Array.from({ length: n.value - 1 }, (_, i) => i + 1))
    frames.push({ order: visited.slice(), len: pathLen(visited), best: pathLen(visited), checked: 1 })
    while (remaining.size) {
      const last = visited[visited.length - 1]
      let nearest = -1
      let nd = Infinity
      for (const c of remaining) { const d = dist(cities.value[last], cities.value[c]); if (d < nd) { nd = d; nearest = c } }
      remaining.delete(nearest)
      visited.push(nearest)
      frames.push({ order: visited.slice(), len: pathLen(visited), best: pathLen(visited), checked: visited.length })
    }
  }
  return frames
})

const progress = computed(() => Math.min(1, Math.max(0, props.params.step ?? 0)))
const fi = computed(() => Math.round(progress.value * (trace.value.length - 1)))
const frame = computed(() => trace.value[fi.value])

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    const v = progress.value + dt / Math.max(3, Math.min(14, trace.value.length / 20))
    if (v >= 1) (emit('set', 'step', 1), (playing.value = false))
    else emit('set', 'step', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch([n, mode, seed], () => (emit('set', 'step', 0), (playing.value = true)))

const px = (x: number) => PAD + x * (W - PAD * 2)
const py = (y: number) => PAD + y * (H - PAD * 2 - 30)
const pathD = (order: number[]) => order.map((c, i) => `${i ? 'L' : 'M'}${px(cities.value[c].x).toFixed(1)},${py(cities.value[c].y).toFixed(1)}`).join(' ') + ' Z'

const gap = computed(() => (optimal.value.len > 0 ? ((frame.value.best - optimal.value.len) / optimal.value.len) * 100 : 0))
const readouts = computed(() => [
  { label: t('tsp.mode'), value: mode.value === 0 ? t('tsp.brute') : t('tsp.nn'), color: 'var(--fg)' },
  { label: t('tsp.checked'), value: String(frame.value.checked) },
  { label: t('tsp.best'), value: fmt(frame.value.best, 3), color: 'var(--accent)' },
  { label: t('tsp.optimal'), value: fmt(optimal.value.len, 3), color: 'var(--pos)' },
  { label: t('tsp.gap'), value: `${fmt(gap.value, 1)} %`, color: gap.value > 0.5 ? 'var(--neg)' : 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && progress >= 1) $emit('set', 'step', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="seed++">{{ t('tsp.shuffle') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('tsp.hint') }}</text>
      <path :d="pathD(optimal.order)" fill="none" stroke="var(--pos)" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5" />
      <path :d="pathD(frame.order)" fill="none" stroke="var(--accent)" stroke-width="2.5" />
      <g v-for="(c, i) in cities" :key="i">
        <circle :cx="px(c.x)" :cy="py(c.y)" r="7" :fill="i === 0 ? 'var(--accent-2)' : 'var(--fg)'" />
        <text class="num" :x="px(c.x)" :y="py(c.y) - 12" text-anchor="middle" font-size="11" fill="var(--muted)">{{ i }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
