<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// view 0: run-length encoding on a strip of repeated symbols (reps controls the run length).
// view 1: a Huffman-style code built for 4 symbols whose frequencies are set by skew — real
// Huffman merging, so the average code length can never exceed the fixed-length one.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const view = computed(() => Math.round(props.params.view ?? 0))
const reps = computed(() => Math.max(2, Math.min(12, Math.round(props.params.reps ?? 6))))
const skew = computed(() => Math.max(1, Math.min(9, Math.round(props.params.skew ?? 5))))

// ---- run-length ------------------------------------------------------------------------------
const SYMS = ['A', 'B', 'C']
const SYM_COLOR = ['var(--accent)', 'var(--accent-2)', 'var(--pos)']
const originalBits = computed(() => 3 * reps.value * 8)
const compressedBits = computed(() => 3 * 16)
const ratio = computed(() => originalBits.value / compressedBits.value)

// ---- Huffman-style coding --------------------------------------------------------------------
const LETTERS = ['E', 'T', 'A', 'Q']
const weights = computed(() => [skew.value + 1, 3, 2, 1])
const total = computed(() => weights.value.reduce((s, w) => s + w, 0))
const probs = computed(() => weights.value.map((w) => w / total.value))
interface HNode { freq: number; sym?: number; children?: [HNode, HNode] }
const codeLens = computed(() => {
  let nodes: HNode[] = weights.value.map((f, i) => ({ freq: f, sym: i }))
  while (nodes.length > 1) {
    nodes = [...nodes].sort((a, b) => a.freq - b.freq)
    const [a, b] = nodes.splice(0, 2)
    nodes.push({ freq: a.freq + b.freq, children: [a, b] })
  }
  const lens = new Array(4).fill(1)
  const walk = (n: HNode, d: number) => {
    if (n.sym !== undefined) lens[n.sym] = Math.max(1, d)
    else { walk(n.children![0], d + 1); walk(n.children![1], d + 1) }
  }
  walk(nodes[0], 0)
  return lens
})
const fixedBits = 2
const avgBits = computed(() => probs.value.reduce((s, p, i) => s + p * codeLens.value[i], 0))
const savings = computed(() => Math.max(0, Math.round((1 - avgBits.value / fixedBits) * 100)))

const readouts = computed(() =>
  view.value === 0
    ? [
        { label: t('ce.originalBits'), value: `${originalBits.value} b`, color: 'var(--neg)' },
        { label: t('ce.compressedBits'), value: `${compressedBits.value} b`, color: 'var(--pos)' },
        { label: t('ce.ratio'), value: `×${ratio.value.toFixed(1)}` },
      ]
    : [
        { label: t('ce.fixedBits'), value: `${fixedBits.toFixed(2)} b`, color: 'var(--neg)' },
        { label: t('ce.avgBits'), value: `${avgBits.value.toFixed(2)} b`, color: 'var(--pos)' },
        { label: t('ce.smallerBy'), value: `${savings.value}%` },
      ],
)
const barY = (i: number) => 90 + i * 90
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="26" font-size="13" fill="var(--muted)">{{ view === 0 ? t('ce.hintRepeat') : t('ce.hintHuffman') }}</text>

      <template v-if="view === 0">
        <g v-for="s in [0, 1, 2]" :key="'row' + s">
          <text class="num" x="16" :y="70 + s * 60" font-size="12" fill="var(--muted)">{{ SYMS[s] }} × {{ reps }}</text>
          <g v-for="i in reps" :key="'blk' + s + i">
            <rect :x="16 + (i - 1) * (700 / reps)" :y="78 + s * 60" :width="700 / reps - 3" height="34" rx="4" :fill="SYM_COLOR[s]" fill-opacity="0.75" />
          </g>
        </g>
        <text class="num" x="16" y="290" font-size="13" font-weight="600" fill="var(--fg)">{{ t('ce.run') }} → ({{ t('ce.count') }})</text>
        <g v-for="s in [0, 1, 2]" :key="'comp' + s">
          <rect :x="16 + s * 200" y="310" width="180" height="50" rx="8" :fill="SYM_COLOR[s]" fill-opacity="0.18" :stroke="SYM_COLOR[s]" />
          <text class="num" :x="26 + s * 200" y="342" font-size="20" fill="var(--fg)">{{ SYMS[s] }} × {{ reps }}</text>
        </g>
        <text class="num" x="16" y="410" font-size="13" fill="var(--muted)">{{ originalBits }} bits → {{ compressedBits }} bits</text>
      </template>

      <template v-else>
        <g v-for="(let_, i) in LETTERS" :key="'h' + let_">
          <text class="num" x="16" :y="barY(i) + 24" font-size="20" font-weight="700" fill="var(--fg)">{{ let_ }}</text>
          <rect x="60" :y="barY(i)" :width="Math.max(4, probs[i] * 480)" height="28" rx="5" fill="var(--accent)" fill-opacity="0.7" />
          <text class="num" :x="66 + probs[i] * 480" :y="barY(i) + 20" font-size="12" fill="var(--muted)">{{ (probs[i] * 100).toFixed(0) }}%</text>
          <g v-for="b in codeLens[i]" :key="'bit' + i + b">
            <rect :x="600 + (b - 1) * 22" :y="barY(i)" width="18" height="28" rx="3" fill="var(--pos)" fill-opacity="0.7" />
          </g>
          <text class="num" x="600" :y="barY(i) - 6" font-size="11" fill="var(--muted)">{{ codeLens[i] }} bit{{ codeLens[i] > 1 ? 's' : '' }}</text>
        </g>
        <text class="num" x="16" y="420" font-size="13" fill="var(--muted)">{{ t('ce.fixedBits') }}: {{ fixedBits.toFixed(0) }} b · {{ t('ce.avgBits') }}: {{ avgBits.toFixed(2) }} b</text>
      </template>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
