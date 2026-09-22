<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A hand-made 2-D word map (toy embeddings). options.mode: 'vectors' shows the king − man + woman arithmetic;
// 'attention' shows softmax(similarity) weights from one word to the others (param temp).
// Coordinates are illustrative: axis 1 ≈ royalty/status, axis 2 ≈ gender. Word labels come from the UI strings.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const words: { k: string; v: [number, number] }[] = [
  { k: 'king', v: [3.0, 1.6] }, { k: 'queen', v: [3.0, -1.6] }, { k: 'man', v: [0.4, 1.6] }, { k: 'woman', v: [0.4, -1.6] },
  { k: 'boy', v: [-1.2, 1.4] }, { k: 'girl', v: [-1.2, -1.4] }, { k: 'prince', v: [2.2, 1.3] }, { k: 'princess', v: [2.2, -1.3] },
  { k: 'apple', v: [-3.0, 0.2] }, { k: 'banana', v: [-3.3, -0.4] }, { k: 'car', v: [-2.2, 2.6] }, { k: 'bus', v: [-2.6, 2.9] },
]
const label = (k: string) => t(`emb.${k}` as any)
const sx = (x: number) => 400 + x * 95
const sy = (y: number) => 250 - y * 60
const mode = computed<'vectors' | 'attention'>(() => props.options.mode ?? 'vectors')
const sel = computed(() => Math.min(words.length - 1, Math.max(0, Math.round(props.params.word ?? 0))))
const temp = computed(() => Math.max(0.05, props.params.temp ?? 1))
const dot = (a: [number, number], b: [number, number]) => a[0] * b[0] + a[1] * b[1]
const norm = (a: [number, number]) => Math.hypot(a[0], a[1])
const cos = (a: [number, number], b: [number, number]) => dot(a, b) / (norm(a) * norm(b))
// vectors: king − man + woman
const kmw = computed(() => {
  const g = (k: string) => words.find((w) => w.k === k)!.v
  const r: [number, number] = [g('king')[0] - g('man')[0] + g('woman')[0], g('king')[1] - g('man')[1] + g('woman')[1]]
  const best = [...words].filter((w) => !['king', 'man', 'woman'].includes(w.k)).sort((a, b) => cos(b.v, r) - cos(a.v, r))[0]
  return { r, best }
})
const attn = computed(() => {
  const q = words[sel.value].v
  const scores = words.map((w) => cos(q, w.v) / temp.value)
  const m = Math.max(...scores)
  const ex = scores.map((s) => Math.exp(s - m))
  const Z = ex.reduce((a, b) => a + b, 0)
  return ex.map((e) => e / Z)
})
const readouts = computed(() =>
  mode.value === 'vectors'
    ? [{ label: `${label('king')} − ${label('man')} + ${label('woman')}`, value: `(${fmt(kmw.value.r[0], 1)}, ${fmt(kmw.value.r[1], 1)})`, color: 'var(--accent-2)' }, { label: t('emb.nearest'), value: label(kmw.value.best.k), color: 'var(--pos)' }, { label: t('emb.cosine'), value: fmt(cos(kmw.value.best.v, kmw.value.r), 3) }]
    : [{ label: t('emb.query'), value: label(words[sel.value].k), color: 'var(--accent-2)' }, ...words.map((w, i) => ({ label: label(w.k), value: fmt(attn.value[i] * 100, 0) + ' %' })).sort((a, b) => parseFloat(b.value) - parseFloat(a.value)).slice(0, 4)],
)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ mode === 'vectors' ? t('emb.hintVec') : t('emb.hintAttn') }}</text>
      <line :x1="sx(-4)" :x2="sx(4)" :y1="sy(0)" :y2="sy(0)" stroke="var(--line)" /><line :x1="sx(0)" :x2="sx(0)" :y1="sy(3.5)" :y2="sy(-3.5)" stroke="var(--line)" />
      <text class="num" :x="sx(4)" :y="sy(0) - 6" text-anchor="end" font-size="11" fill="var(--muted)">{{ t('emb.axis1') }}</text>
      <text class="num" :x="sx(0) + 6" :y="sy(3.5) + 12" font-size="11" fill="var(--muted)">{{ t('emb.axis2') }}</text>
      <template v-if="mode === 'vectors'">
        <line v-for="k in ['king', 'man', 'woman']" :key="k" :x1="sx(0)" :y1="sy(0)" :x2="sx(words.find((w) => w.k === k)!.v[0])" :y2="sy(words.find((w) => w.k === k)!.v[1])" stroke="var(--muted)" stroke-dasharray="4 3" />
        <line :x1="sx(0)" :y1="sy(0)" :x2="sx(kmw.r[0])" :y2="sy(kmw.r[1])" stroke="var(--accent-2)" stroke-width="3" />
        <circle :cx="sx(kmw.r[0])" :cy="sy(kmw.r[1])" r="9" fill="none" stroke="var(--accent-2)" stroke-width="2" stroke-dasharray="3 2" />
      </template>
      <g v-for="(w, i) in words" :key="w.k" class="cursor-pointer" @click="emit('set', 'word', i)">
        <circle :cx="sx(w.v[0])" :cy="sy(w.v[1])" :r="mode === 'attention' ? 5 + 26 * attn[i] : 6" :fill="mode === 'attention' ? (i === sel ? 'var(--accent-2)' : 'var(--accent)') : 'var(--accent)'" :fill-opacity="mode === 'attention' ? 0.35 + 0.65 * attn[i] * 3 : 1" />
        <text :x="sx(w.v[0]) + 10" :y="sy(w.v[1]) - 8" font-size="13" fill="var(--fg)">{{ label(w.k) }}</text>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
