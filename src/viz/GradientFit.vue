<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Fit a line y = m x + c to points by gradient descent on the squared error.
// params m, c (the line), lr (learning rate), steps (0..200 progress). Tap to add points.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const PAD = 40
const pts = ref<[number, number][]>(props.options.points ?? [[1, 2.1], [2, 2.9], [3, 4.2], [4, 4.8], [5, 6.3], [6, 6.8], [7, 8.1], [8, 8.7]])
const sx = (x: number) => PAD + (x / 10) * (W - 2 * PAD)
const sy = (y: number) => H - PAD - (y / 10) * (H - 2 * PAD)

const loss = (m: number, c: number) => pts.value.reduce((s, [x, y]) => s + (m * x + c - y) ** 2, 0)
const grad = (m: number, c: number) => {
  let gm = 0, gc = 0
  for (const [x, y] of pts.value) { const e = m * x + c - y; gm += 2 * e * x; gc += 2 * e }
  return [gm / pts.value.length, gc / pts.value.length]
}
// Closed-form least squares, for comparison.
const best = computed(() => {
  const n = pts.value.length
  const sx_ = pts.value.reduce((s, p) => s + p[0], 0), sy_ = pts.value.reduce((s, p) => s + p[1], 0)
  const sxx = pts.value.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.value.reduce((s, p) => s + p[0] * p[1], 0)
  const m = (n * sxy - sx_ * sy_) / (n * sxx - sx_ * sx_ || 1e-9)
  return { m, c: (sy_ - m * sx_) / n }
})

// Descent path from the current slider values, replayed as `steps` grows.
const path = computed(() => {
  const out: [number, number][] = [[props.params.m ?? 0, props.params.c ?? 0]]
  const lr = props.params.lr ?? 0.02
  for (let i = 0; i < 200; i++) {
    const [m, c] = out[out.length - 1]
    const [gm, gc] = grad(m, c)
    out.push([m - lr * gm, c - lr * gc])
  }
  return out
})
const k = computed(() => Math.min(200, Math.max(0, Math.round(props.params.steps ?? 0))))
const cur = computed(() => path.value[k.value])

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 60) { last = now; if (k.value >= 200) playing.value = false; else emit('set', 'steps', k.value + 1) }
  raf = requestAnimationFrame(tick)
}
onMounted(() => (raf = requestAnimationFrame(tick)))
onUnmounted(() => cancelAnimationFrame(raf))
watch(() => [props.params.m, props.params.c, props.params.lr], () => emit('set', 'steps', 0))

function add(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const b = svg.getBoundingClientRect()
  const x = ((e.clientX - b.left) / b.width) * W
  const y = ((e.clientY - b.top) / b.height) * H
  pts.value = [...pts.value, [+((x - PAD) / (W - 2 * PAD) * 10).toFixed(2), +((H - PAD - y) / (H - 2 * PAD) * 10).toFixed(2)]]
}
const readouts = computed(() => [
  { label: 'm', value: fmt(cur.value[0], 3), color: 'var(--accent-2)' },
  { label: 'c', value: fmt(cur.value[1], 3), color: 'var(--accent-2)' },
  { label: t('fit.loss'), value: fmt(loss(cur.value[0], cur.value[1]), 3) },
  { label: t('fit.step'), value: String(k.value) },
  { label: t('fit.best'), value: `m ${fmt(best.value.m, 3)}, c ${fmt(best.value.c, 3)}`, color: 'var(--pos)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="pts = pts.slice(0, -1)">−1</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full cursor-crosshair touch-none select-none" @pointerdown="add">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('fit.hint') }}</text>
      <g stroke="var(--grid)">
        <line v-for="i in 9" :key="'v' + i" :x1="sx(i)" :x2="sx(i)" :y1="PAD" :y2="H - PAD" />
        <line v-for="i in 9" :key="'h' + i" :x1="PAD" :x2="W - PAD" :y1="sy(i)" :y2="sy(i)" />
      </g>
      <line :x1="PAD" :x2="W - PAD" :y1="sy(0)" :y2="sy(0)" stroke="var(--muted)" />
      <line :x1="sx(0)" :x2="sx(0)" :y1="PAD" :y2="H - PAD" stroke="var(--muted)" />
      <line :x1="sx(0)" :y1="sy(best.c)" :x2="sx(10)" :y2="sy(best.m * 10 + best.c)" stroke="var(--pos)" stroke-dasharray="6 5" stroke-width="1.5" />
      <g v-for="([x, y], i) in pts" :key="i">
        <line :x1="sx(x)" :y1="sy(y)" :x2="sx(x)" :y2="sy(cur[0] * x + cur[1])" stroke="var(--neg)" stroke-opacity="0.6" />
        <circle :cx="sx(x)" :cy="sy(y)" r="5.5" fill="var(--accent)" stroke="var(--panel)" stroke-width="1.5" />
      </g>
      <line :x1="sx(0)" :y1="sy(cur[1])" :x2="sx(10)" :y2="sy(cur[0] * 10 + cur[1])" stroke="var(--accent-2)" stroke-width="2.5" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
