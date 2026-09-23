<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Gray-Scott reaction-diffusion: two chemicals A (fed in) and B (self-catalysing, decaying) diffuse and react.
// Depending on the feed and kill rates the same simple rule settles into spots, stripes or dividing blobs —
// the pattern behind leopard spots and zebra stripes (Turing, 1952).
// params: feed (F), kill (k), step (iterations applied so far, drives the animation).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const GW = 100
const GH = 60
const DU = 0.16
const DV = 0.08
const SUB_STEPS = 20

const feed = computed(() => Math.max(0.01, Math.min(0.09, props.params.feed ?? 0.03)))
const kill = computed(() => Math.max(0.03, Math.min(0.07, props.params.kill ?? 0.062)))
const step = computed(() => Math.max(0, Math.min(150, Math.round(props.params.step ?? 0))))

function noise(i: number, j: number) {
  const v = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453
  return v - Math.floor(v)
}
function initGrids(): { a: Float32Array; b: Float32Array } {
  const a = new Float32Array(GW * GH).fill(1)
  const b = new Float32Array(GW * GH)
  const cx = GW / 2
  const cy = GH / 2
  const r = Math.min(GW, GH) * 0.08
  for (let j = 0; j < GH; j++)
    for (let i = 0; i < GW; i++)
      if ((i - cx) ** 2 + (j - cy) ** 2 < r * r) b[j * GW + i] = Math.min(1, 0.7 + 0.3 * noise(i, j))
  return { a, b }
}

function euler(a: Float32Array, b: Float32Array, F: number, K: number) {
  const na = new Float32Array(GW * GH)
  const nb = new Float32Array(GW * GH)
  for (let j = 0; j < GH; j++) {
    const jU = ((j - 1 + GH) % GH) * GW
    const jD = ((j + 1) % GH) * GW
    const jR = j * GW
    for (let i = 0; i < GW; i++) {
      const iL = (i - 1 + GW) % GW
      const iR = (i + 1) % GW
      const c = jR + i
      const av = a[c]
      const bv = b[c]
      const lapA = a[jU + i] + a[jD + i] + a[jR + iL] + a[jR + iR] - 4 * av
      const lapB = b[jU + i] + b[jD + i] + b[jR + iL] + b[jR + iR] - 4 * bv
      const reaction = av * bv * bv
      na[c] = Math.min(1, Math.max(0, av + DU * lapA - reaction + F * (1 - av)))
      nb[c] = Math.min(1, Math.max(0, bv + DV * lapB + reaction - (F + K) * bv))
    }
  }
  return { a: na, b: nb }
}

// cached forward simulation: continuing from the last computed step is far cheaper than restarting from
// scratch, but a change of feed/kill or dragging the step backwards still gives the exact same picture.
let cache = { feed: -1, kill: -1, step: 0, ...initGrids() }
function simulate(F: number, K: number, targetStep: number) {
  if (cache.feed !== F || cache.kill !== K || cache.step > targetStep) cache = { feed: F, kill: K, step: 0, ...initGrids() }
  while (cache.step < targetStep) {
    const { a, b } = euler(cache.a, cache.b, F, K)
    cache.a = a
    cache.b = b
    cache.step++
  }
  return cache
}

const world = computed(() => {
  const { a, b } = simulate(feed.value, kill.value, step.value * SUB_STEPS)
  let covered = 0
  for (let i = 0; i < b.length; i++) if (b[i] > 0.3) covered++
  return { a, b, coverage: covered / b.length }
})

// --- colour + canvas -------------------------------------------------------------------------------
let toRgbCanvas: HTMLCanvasElement | null = null
function toRgb(color: string): [number, number, number] {
  if (!toRgbCanvas) toRgbCanvas = document.createElement('canvas')
  toRgbCanvas.width = 1
  toRgbCanvas.height = 1
  const c = toRgbCanvas.getContext('2d')!
  c.fillStyle = color
  c.fillRect(0, 0, 1, 1)
  const d = c.getImageData(0, 0, 1, 1).data
  return [d[0], d[1], d[2]]
}
let bg: [number, number, number] = [245, 246, 250]
let fg: [number, number, number] = [37, 99, 235]
function readColors() {
  const cs = getComputedStyle(document.documentElement)
  bg = toRgb(cs.getPropertyValue('--sunken').trim() || '#f2f2f2')
  fg = toRgb(cs.getPropertyValue('--accent').trim() || '#2563eb')
}

const canvas = ref<HTMLCanvasElement>()
function draw() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  const img = ctx.createImageData(GW, GH)
  const { b } = world.value
  for (let i = 0; i < b.length; i++) {
    const t2 = Math.min(1, b[i] * 1.4)
    const k = i * 4
    img.data[k] = bg[0] + (fg[0] - bg[0]) * t2
    img.data[k + 1] = bg[1] + (fg[1] - bg[1]) * t2
    img.data[k + 2] = bg[2] + (fg[2] - bg[2]) * t2
    img.data[k + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
}

let observer: MutationObserver | null = null
onMounted(() => {
  readColors()
  draw()
  observer = new MutationObserver(() => { readColors(); draw() })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})
onUnmounted(() => observer?.disconnect())

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 90) {
    last = now
    if (step.value >= 150) playing.value = false
    else emit('set', 'step', step.value + 1)
  }
  draw()
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('rd.feed'), value: fmt(feed.value, 3) },
  { label: t('rd.kill'), value: fmt(kill.value, 3) },
  { label: t('rd.step'), value: String(step.value) },
  { label: t('rd.coverage'), value: `${fmt(world.value.coverage * 100, 0)}%`, color: 'var(--accent)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="$emit('set', 'step', 0)">{{ t('rd.restart') }}</button>
    </div>
    <div class="relative">
      <canvas ref="canvas" :width="GW" :height="GH" class="block w-full select-none" style="aspect-ratio: 5 / 3; border-radius: 6px" />
      <p class="num pointer-events-none absolute start-3 top-2 text-xs" style="color: var(--muted)">{{ t('rd.hint') }}</p>
    </div>
    <Readouts :items="readouts" />
  </div>
</template>
