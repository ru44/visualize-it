<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A 3x3 kernel slides over every pixel of a small picture, multiplying and summing its neighbours.
// This one operation, run by a fixed rule, is exactly what a convolutional network learns to choose.
// params: kernel (0 blur, 1 sharpen, 2 edge), pos (which pixel the window is on, raster order).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const N = 22
const LAST = N * N - 1

// A tiny synthetic picture: a light-to-dark background, a bright disc and a bright corner square,
// so every filter has both a smooth region and hard edges to act on. No file needed, no randomness.
function pixel(x: number, y: number): number {
  const u = x / (N - 1)
  let s = 0.15 + 0.35 * u
  const dx = x - 0.32 * N
  const dy = y - 0.62 * N
  if (Math.sqrt(dx * dx + dy * dy) < 0.2 * N) s += 0.6
  if (x > 0.68 * N && x < 0.94 * N && y > 0.06 * N && y < 0.32 * N) s += 0.55
  return Math.max(0, Math.min(1, s))
}
const source = Array.from({ length: N * N }, (_, i) => pixel(i % N, Math.floor(i / N)))
const clampIdx = (v: number) => Math.max(0, Math.min(N - 1, v))
const at = (x: number, y: number) => source[clampIdx(y) * N + clampIdx(x)]

const KERNELS = [
  [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16],
  [0, -1, 0, -1, 5, -1, 0, -1, 0],
  [0, -1, 0, -1, 4, -1, 0, -1, 0],
]
const NAMES = ['blur', 'sharpen', 'edge'] as const
const kernel = computed(() => Math.max(0, Math.min(2, Math.round(props.params.kernel ?? 0))))
const pos = computed(() => Math.max(0, Math.min(LAST, Math.round(props.params.pos ?? 0))))

const filtered = computed(() => {
  const kmat = KERNELS[kernel.value]
  const edge = kernel.value === 2
  return Array.from({ length: N * N }, (_, i) => {
    const x = i % N
    const y = Math.floor(i / N)
    let v = 0
    let k = 0
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) v += kmat[k++] * at(x + dx, y + dy)
    return edge ? Math.max(0, Math.min(1, Math.abs(v))) : Math.max(0, Math.min(1, v))
  })
})

const row = computed(() => Math.floor(pos.value / N))
const col = computed(() => pos.value % N)

const panelW = 330
const CELL = panelW / N
const LX = 24
const RX = 446
const PY = 56

const playing = ref(false)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value && now - last > 35) {
    last = now
    if (pos.value >= LAST) playing.value = false
    else emit('set', 'pos', Math.min(LAST, pos.value + 6))
  }
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
function restart() {
  emit('set', 'pos', 0)
  playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches
}

const readouts = computed(() => [
  { label: t('imgf.kernel'), value: t(`imgf.k.${NAMES[kernel.value]}` as any), color: 'var(--accent)' },
  { label: t('imgf.pixel'), value: `${row.value}, ${col.value}` },
  { label: t('imgf.done'), value: `${pos.value + 1} / ${N * N}` },
  { label: t('imgf.value'), value: filtered.value[pos.value].toFixed(2), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="restart">{{ t('imgf.restart') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('imgf.hint') }}</text>
      <text x="24" :y="PY - 10" font-size="12" fill="var(--muted)">{{ t('imgf.source') }}</text>
      <text :x="RX" :y="PY - 10" font-size="12" fill="var(--muted)">{{ t('imgf.output') }}</text>
      <g>
        <rect v-for="(v, i) in source" :key="'s' + i" :x="LX + (i % N) * CELL" :y="PY + Math.floor(i / N) * CELL" :width="CELL + 0.5" :height="CELL + 0.5" fill="var(--fg)" :fill-opacity="v" />
        <rect :x="LX + (col - 1) * CELL" :y="PY + (row - 1) * CELL" :width="CELL * 3" :height="CELL * 3" fill="none" stroke="var(--accent-2)" stroke-width="2" />
      </g>
      <g>
        <rect v-for="(v, i) in filtered" :key="'o' + i" :x="RX + (i % N) * CELL" :y="PY + Math.floor(i / N) * CELL" :width="CELL + 0.5" :height="CELL + 0.5" :fill="i <= pos ? 'var(--fg)' : 'var(--sunken)'" :fill-opacity="i <= pos ? v : 1" />
        <rect :x="RX + col * CELL" :y="PY + row * CELL" :width="CELL" :height="CELL" fill="none" stroke="var(--accent)" stroke-width="2" />
      </g>
      <rect :x="LX" :y="PY" :width="N * CELL" :height="N * CELL" fill="none" stroke="var(--line)" />
      <rect :x="RX" :y="PY" :width="N * CELL" :height="N * CELL" fill="none" stroke="var(--line)" />
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
