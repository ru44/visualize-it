<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// ai/tokenization. params text (which sample), merges (BPE merge steps). This runs the actual
// byte-pair-encoding loop on the sample: start from characters, repeatedly glue the most frequent
// adjacent pair into one token. ▁ marks "this token starts a word". Scrubbing merges shows the
// vocabulary being *grown*, which is exactly how real tokenizers are trained.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const TEXTS = [
  'the cat sat on the mat because the cat was tired',
  'for (let i = 0; i < n; i++) sum += i;',
  'القطة جلست على السجادة لأن القطة كانت متعبة',
]
const textIx = computed(() => Math.min(Math.max(Math.round(props.params.text ?? 0), 0), 2))
const merges = computed(() => Math.min(Math.max(Math.round(props.params.merges ?? 0), 0), 30))
const sample = computed(() => TEXTS[textIx.value])

// byte-pair encoding: words become char lists, then the most frequent adjacent pair merges, m times
const result = computed(() => {
  const words = sample.value.split(' ').map((w) => ('▁' + w).split(''))
  const mergedPairs: string[] = []
  for (let m = 0; m < merges.value; m++) {
    const counts = new Map<string, number>()
    for (const w of words)
      for (let i = 0; i < w.length - 1; i++) {
        const key = w[i] + '\u0000' + w[i + 1]
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
    let best = ''
    let bestN = 1 // a pair must appear at least twice to earn a vocabulary slot
    for (const [k, n] of counts) if (n > bestN) ((best = k), (bestN = n))
    if (!best) break
    const [a, b] = best.split('\u0000')
    for (const w of words)
      for (let i = w.length - 2; i >= 0; i--)
        if (w[i] === a && w[i + 1] === b) w.splice(i, 2, a + b)
    mergedPairs.push(a + b)
  }
  const tokens = words.flat()
  return { tokens, lastMerge: mergedPairs[mergedPairs.length - 1] ?? '', did: mergedPairs.length }
})
const chars = computed(() => sample.value.replace(/ /g, '').length + sample.value.split(' ').length)
const nTok = computed(() => result.value.tokens.length)

// lay the chips out in rows
const rows = computed(() => {
  const out: { text: string; x: number; y: number; w: number; fresh: boolean }[][] = [[]]
  let x = 0
  for (const tok of result.value.tokens) {
    const w = 14 + tok.length * 11
    if (x + w > 700) {
      out.push([])
      x = 0
    }
    out[out.length - 1].push({ text: tok, x, y: 0, w, fresh: tok === result.value.lastMerge, ...{} })
    x += w + 6
  }
  return out
})
const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--pos)']

const readouts = computed(() => [
  { label: t('tok.chars'), value: fmt(chars.value, 0) },
  { label: t('tok.tokens'), value: fmt(nTok.value, 0), color: 'var(--accent)' },
  { label: t('tok.ratio'), value: fmt(chars.value / nTok.value, 2) },
  { label: t('tok.vocabGrown'), value: `+${fmt(result.value.did, 0)}` },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text x="16" y="20" font-size="12" fill="var(--muted)">{{ t('tok.hint') }}</text>
      <text x="400" y="56" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('tok.sample') }}: «{{ sample }}»</text>

      <!-- the token chips -->
      <g v-for="(row, r) in rows" :key="r">
        <g v-for="(c, i) in row" :key="i" class="num">
          <rect :x="50 + c.x" :y="100 + r * 42" :width="c.w" height="30" rx="7" :fill="c.fresh ? 'var(--pos)' : COLORS[(r * 7 + i) % 3]" :opacity="c.fresh ? 1 : 0.8" />
          <text :x="50 + c.x + c.w / 2" :y="120 + r * 42" text-anchor="middle" font-size="13" fill="#fff">{{ c.text }}</text>
        </g>
      </g>
      <text v-if="result.lastMerge" x="400" y="330" text-anchor="middle" font-size="11" fill="var(--pos)">{{ t('tok.lastMerge') }}: «{{ result.lastMerge }}»</text>

      <!-- the cost meter: tokens are what the model actually reads (and what APIs bill) -->
      <rect x="120" y="366" width="560" height="16" rx="5" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="120" y="366" :width="Math.min(560, (nTok / 60) * 560)" height="16" rx="5" fill="var(--accent)" />
      <text x="120" y="402" font-size="10" fill="var(--muted)" class="num">{{ t('tok.cost', { n: fmt(nTok, 0) }) }}</text>
      <text x="680" y="402" text-anchor="end" font-size="10" fill="var(--muted)">{{ t('tok.marker') }}</text>
      <text x="400" :y="H - 10" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('tok.caption') }}</text>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
