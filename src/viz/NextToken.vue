<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// The smallest possible language model: count which word follows which in a short text you can read,
// turn the counts into probabilities, sharpen or flatten them with a temperature, and sample the next word.
// params temp (0.1..3). Tap a bar to choose that word; "auto" samples repeatedly.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const corpus = computed(() => t('nlp.corpus'))
const tokens = computed(() => corpus.value.toLowerCase().replace(/[.,!?؟،]/g, ' .').split(/\s+/).filter(Boolean))
const bigrams = computed(() => {
  const m = new Map<string, Map<string, number>>()
  for (let i = 0; i < tokens.value.length - 1; i++) {
    const a = tokens.value[i]
    const b = tokens.value[i + 1]
    if (!m.has(a)) m.set(a, new Map())
    m.get(a)!.set(b, (m.get(a)!.get(b) ?? 0) + 1)
  }
  return m
})
const temp = computed(() => Math.max(0.1, props.params.temp ?? 1))
const generated = ref<string[]>([tokens.value[0]])
watch(corpus, () => (generated.value = [tokens.value[0]]))
const current = computed(() => generated.value[generated.value.length - 1])
const dist = computed(() => {
  const counts = bigrams.value.get(current.value) ?? new Map([[tokens.value[0], 1]])
  const entries = [...counts.entries()]
  const logits = entries.map(([, c]) => Math.log(c) / temp.value)
  const m = Math.max(...logits)
  const ex = logits.map((l) => Math.exp(l - m))
  const Z = ex.reduce((a, b) => a + b, 0)
  return entries.map(([w, c], i) => ({ w, c, p: ex[i] / Z })).sort((a, b) => b.p - a.p)
})
function choose(w: string) {
  generated.value = [...generated.value.slice(-11), w]
}
function sample() {
  let r = Math.random()
  for (const d of dist.value) { r -= d.p; if (r <= 0) return choose(d.w) }
  choose(dist.value[0].w)
}
const readouts = computed(() => [
  { label: t('nlp.words'), value: String(tokens.value.length) },
  { label: t('nlp.current'), value: current.value, color: 'var(--accent-2)' },
  { label: t('nlp.temp'), value: fmt(temp.value, 2) },
  { label: t('nlp.top'), value: dist.value[0] ? `${dist.value[0].w} (${fmt(dist.value[0].p * 100, 0)} %)` : '—', color: 'var(--accent)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('nlp.hint') }}</text>
      <foreignObject x="16" y="30" :width="W - 32" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 13px; line-height: 1.5; color: var(--muted)"><span style="color: var(--fg); font-weight: 500">{{ t('nlp.corpusLabel') }}</span> {{ corpus }}</div></foreignObject>
      <!-- generated text -->
      <foreignObject x="16" y="105" :width="W - 32" height="60"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 18px; line-height: 1.5; color: var(--fg)"><span v-for="(w, i) in generated" :key="i" :style="i === generated.length - 1 ? 'color: var(--accent-2); font-weight: 600' : ''">{{ w }} </span><span style="color: var(--muted)">▮</span></div></foreignObject>
      <!-- distribution bars -->
      <text class="num" x="16" y="190" font-size="12" fill="var(--muted)">{{ t('nlp.next', { w: current }) }}</text>
      <g v-for="(d, i) in dist.slice(0, 8)" :key="d.w" class="cursor-pointer" @click="choose(d.w)">
        <rect x="140" :y="200 + i * 30" :width="Math.max(2, d.p * 560)" height="22" rx="4" :fill="i === 0 ? 'var(--accent-2)' : 'var(--accent)'" fill-opacity="0.8" />
        <text :x="132" :y="216 + i * 30" text-anchor="end" font-size="13" fill="var(--fg)">{{ d.w }}</text>
        <text class="num" :x="146 + Math.max(2, d.p * 560)" :y="216 + i * 30" font-size="11" fill="var(--muted)">{{ fmt(d.p * 100, 0) }} % · {{ d.c }}×</text>
      </g>
      <g class="cursor-pointer" @click="sample()"><rect :x="W - 150" y="440" width="134" height="30" rx="8" fill="var(--fg)" /><text :x="W - 83" y="460" text-anchor="middle" font-size="13" fill="var(--bg)">{{ t('nlp.sample') }}</text></g>
      <g class="cursor-pointer" @click="generated = [tokens[0]]"><rect :x="W - 300" y="440" width="134" height="30" rx="8" fill="var(--panel)" stroke="var(--line)" /><text :x="W - 233" y="460" text-anchor="middle" font-size="13" fill="var(--fg)">{{ t('nlp.reset') }}</text></g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
