<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// ai/convolution. params kernel (0 vertical edges, 1 horizontal edges, 2 blur), pos (scan progress
// %). One 3×3 stencil slides over a 12×12 image; at each stop it multiplies-and-sums the window
// into a single output pixel. The output map IS what the network "sees" after this layer.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const N = 12
const M = N - 2 // output is 10×10

// a little face: ring border, two eyes, a smile
const IMG = (() => {
  const g = Array.from({ length: N }, () => Array(N).fill(0))
  for (let i = 0; i < N; i++) {
    g[0][i] = g[N - 1][i] = g[i][0] = g[i][N - 1] = 1
  }
  for (const [r, c] of [[3, 3], [3, 4], [4, 3], [4, 4], [3, 7], [3, 8], [4, 7], [4, 8]]) g[r][c] = 1
  for (let c = 3; c <= 8; c++) g[8][c] = 1
  g[7][2] = g[7][9] = 1
  return g
})()
const KERNELS: number[][][] = [
  [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1],
  ],
  [
    [1, 1, 1],
    [0, 0, 0],
    [-1, -1, -1],
  ],
  [
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
    [1 / 9, 1 / 9, 1 / 9],
  ],
]
const kIx = computed(() => Math.min(Math.max(Math.round(props.params.kernel ?? 0), 0), 2))
const pos = computed(() => Math.min(Math.max(props.params.pos ?? 0, 0), 100))
const scan = computed(() => Math.round((pos.value / 100) * (M * M - 1)))
const sr = computed(() => Math.floor(scan.value / M))
const sc = computed(() => scan.value % M)

function conv(r: number, c: number) {
  const K = KERNELS[kIx.value]
  let s = 0
  for (let u = 0; u < 3; u++) for (let v = 0; v < 3; v++) s += K[u][v] * IMG[r + u][c + v]
  return s
}
const current = computed(() => conv(sr.value, sc.value))
const maxAbs = computed(() => (kIx.value === 2 ? 1 : 3))

const CELL = 22
const IX = 70
const IY = 90
const OX = 470
const OY = 90
const kNames = ['conv.kV', 'conv.kH', 'conv.kBlur'] as const

const readouts = computed(() => [
  { label: t('conv.kernel'), value: t(kNames[kIx.value]), color: 'var(--accent)' },
  { label: t('conv.at'), value: `(${fmt(sr.value, 0)}, ${fmt(sc.value, 0)})` },
  { label: t('conv.dot'), value: fmt(current.value, 2), color: Math.abs(current.value) > maxAbs.value / 2 ? 'var(--pos)' : undefined },
  { label: t('conv.done'), value: `${fmt(scan.value + 1, 0)} / ${M * M}` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('conv.hint') }}</text>

      <!-- input image -->
      <text :x="IX + (N * CELL) / 2" :y="IY - 14" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('conv.input') }}</text>
      <g v-for="r in N" :key="'r' + r">
        <rect
          v-for="c in N"
          :key="'c' + c"
          :x="IX + (c - 1) * CELL"
          :y="IY + (r - 1) * CELL"
          :width="CELL - 1"
          :height="CELL - 1"
          :fill="IMG[r - 1][c - 1] ? 'var(--accent)' : 'var(--sunken)'"
          :opacity="IMG[r - 1][c - 1] ? 0.9 : 1"
        />
      </g>
      <!-- the stencil window -->
      <rect :x="IX + sc * CELL - 1" :y="IY + sr * CELL - 1" :width="3 * CELL + 1" :height="3 * CELL + 1" fill="none" stroke="var(--pos)" stroke-width="2.5" />

      <!-- the kernel itself, between the grids -->
      <text x="400" :y="IY + 30" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('conv.stencil') }}</text>
      <g v-for="u in 3" :key="'ku' + u" class="num">
        <g v-for="v in 3" :key="'kv' + v">
          <rect :x="355 + (v - 1) * 30" :y="IY + 44 + (u - 1) * 30" width="28" height="28" rx="4" :fill="KERNELS[kIx][u - 1][v - 1] > 0 ? 'var(--pos)' : KERNELS[kIx][u - 1][v - 1] < 0 ? 'var(--neg)' : 'var(--sunken)'" :opacity="0.25 + 0.6 * Math.abs(KERNELS[kIx][u - 1][v - 1])" />
          <text :x="369 + (v - 1) * 30" :y="IY + 62 + (u - 1) * 30" text-anchor="middle" font-size="9" fill="var(--fg)">{{ kIx === 2 ? '⅑' : KERNELS[kIx][u - 1][v - 1] }}</text>
        </g>
      </g>
      <text x="400" :y="IY + 160" text-anchor="middle" font-size="18" fill="var(--muted)">→</text>

      <!-- output map, filled as far as the scan has reached -->
      <text :x="OX + (M * CELL) / 2" :y="OY - 14" text-anchor="middle" font-size="11" fill="var(--fg)">{{ t('conv.output') }}</text>
      <g v-for="r in M" :key="'or' + r">
        <g v-for="c in M" :key="'oc' + c">
          <rect
            :x="OX + (c - 1) * CELL"
            :y="OY + (r - 1) * CELL"
            :width="CELL - 1"
            :height="CELL - 1"
            :fill="(r - 1) * M + (c - 1) <= scan ? (conv(r - 1, c - 1) >= 0 ? 'var(--pos)' : 'var(--neg)') : 'var(--sunken)'"
            :opacity="(r - 1) * M + (c - 1) <= scan ? 0.15 + 0.85 * (Math.abs(conv(r - 1, c - 1)) / maxAbs) : 0.6"
          />
        </g>
      </g>
      <rect :x="OX + sc * CELL - 1" :y="OY + sr * CELL - 1" :width="CELL + 1" :height="CELL + 1" fill="none" stroke="var(--pos)" stroke-width="2" />

      <text x="400" y="420" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('conv.legend') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('conv.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
