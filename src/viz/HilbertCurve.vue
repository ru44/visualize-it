<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A single line that visits every cell of a 2^order × 2^order grid exactly once, built by rotating and
// offsetting a smaller copy of itself at each level. params: order (grid size), t (how much is drawn, 0..1).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const GRID = 380
const X0 = (W - GRID) / 2
const Y0 = (H - GRID) / 2

const order = computed(() => Math.max(1, Math.min(5, Math.round(props.params.order ?? 3))))
const side = computed(() => 1 << order.value)
const cells = computed(() => side.value * side.value)
const frac = computed(() => Math.max(0, Math.min(1, props.params.t ?? 0)))
const cell = computed(() => GRID / side.value)

// Standard Hilbert d2xy: index along the curve -> (x, y) cell, built one bit-pair at a time.
function d2xy(ord: number, d: number): [number, number] {
  let rx = 0
  let ry = 0
  let x = 0
  let y = 0
  let t2 = d
  for (let s = 1; s < 1 << ord; s *= 2) {
    rx = 1 & (t2 / 2)
    ry = 1 & (t2 ^ rx)
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x
        y = s - 1 - y
      }
      ;[x, y] = [y, x]
    }
    x += s * rx
    y += s * ry
    t2 = Math.floor(t2 / 4)
  }
  return [x, y]
}

const points = computed(() => Array.from({ length: cells.value }, (_, i) => d2xy(order.value, i)))
const px = (x: number) => X0 + (x + 0.5) * cell.value
const py = (y: number) => Y0 + (y + 0.5) * cell.value

const idx = computed(() => Math.round(frac.value * (cells.value - 1)))
const path = computed(() => points.value.slice(0, idx.value + 1).map(([x, y], i) => `${i ? 'L' : 'M'}${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(''))

// How far apart (on the grid) two cells are that sit only a few steps apart on the curve — small numbers
// here are the whole point: nearby along the line stays nearby on the page.
const gap = 8
const locality = computed(() => {
  const a = points.value[idx.value]
  const b = points.value[Math.max(0, idx.value - gap)]
  if (!a || !b) return 0
  return Math.hypot(a[0] - b[0], a[1] - b[1])
})

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 30) {
    last = now
    const next = frac.value + 1 / 220
    if (next >= 1) {
      emit('set', 't', 1)
      playing.value = false
    } else emit('set', 't', next)
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => cancelAnimationFrame(raf))

const readouts = computed(() => [
  { label: t('hilbert.grid'), value: `${side.value}×${side.value}`, color: 'var(--accent)' },
  { label: t('hilbert.cells'), value: String(cells.value) },
  { label: t('hilbert.step'), value: `${idx.value} / ${cells.value - 1}` },
  { label: t('hilbert.locality', { n: gap }), value: fmt(locality.value, 2), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="emit('set', 't', 0)">{{ t('hilbert.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('hilbert.hint') }}</text>
      <defs>
        <linearGradient id="hilbertGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--accent)" />
          <stop offset="100%" stop-color="var(--accent-2)" />
        </linearGradient>
      </defs>
      <rect :x="X0 - 2" :y="Y0 - 2" :width="GRID + 4" :height="GRID + 4" rx="6" fill="var(--sunken)" stroke="var(--line)" />
      <g stroke="var(--line)" stroke-width="0.5">
        <line v-for="k in side + 1" :key="'v' + k" :x1="X0 + (k - 1) * cell" :x2="X0 + (k - 1) * cell" :y1="Y0" :y2="Y0 + GRID" />
        <line v-for="k in side + 1" :key="'h' + k" :x1="X0" :x2="X0 + GRID" :y1="Y0 + (k - 1) * cell" :y2="Y0 + (k - 1) * cell" />
      </g>
      <path :d="path" fill="none" stroke="url(#hilbertGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle v-if="points[idx]" :cx="px(points[idx][0])" :cy="py(points[idx][1])" r="5" fill="var(--accent-2)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
