<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// A tiny state machine reads a line one character at a time. Digits keep it in "number", letters
// switch it to "text", the symbols =+-*/ switch it to "operator", and ( ) ; switch it to "syntax".
// Every time the state changes, the characters collected since the last change become one token.
// params: line (which example line), step (0..1, how far along the line we've read).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()

const W = 800
const H = 480
const LINES = ['total = price * 3 + tax', 'if (x >= 10) y = x / 2', 'area = w * h - 4.5']
const line = computed(() => LINES[Math.max(0, Math.min(LINES.length - 1, Math.round(props.params.line ?? 0)))])

type St = 'number' | 'text' | 'operator' | 'syntax' | 'space'
function stateOf(ch: string, prev: St | ''): St {
  if (/[0-9]/.test(ch)) return 'number'
  if (ch === '.' && prev === 'number') return 'number'
  if (/[A-Za-z_]/.test(ch)) return 'text'
  if ('=+-*/^%!&|<>'.includes(ch)) return 'operator'
  if (ch === ' ') return 'space'
  return 'syntax'
}
const states = computed<St[]>(() => {
  const out: St[] = []
  let prev: St | '' = ''
  for (const ch of line.value) { const s = stateOf(ch, prev); out.push(s); prev = s }
  return out
})
interface Token { start: number; end: number; type: St; text: string }
const tokens = computed<Token[]>(() => {
  const s = states.value
  const out: Token[] = []
  let i = 0
  while (i < s.length) {
    if (s[i] === 'space') { i++; continue }
    let j = i
    while (j < s.length && s[j] === s[i]) j++
    out.push({ start: i, end: j, type: s[i], text: line.value.slice(i, j) })
    i = j
  }
  return out
})
const COLOR: Record<St, string> = { number: 'var(--accent)', text: 'var(--accent-2)', operator: 'var(--pos)', syntax: 'var(--neg)', space: 'var(--muted)' }

const progress = computed(() => Math.min(1, Math.max(0, props.params.step ?? 0)))
const k = computed(() => Math.round(progress.value * line.value.length))
const doneTokens = computed(() => tokens.value.filter((tk) => tk.end <= k.value))
const partial = computed(() => tokens.value.find((tk) => tk.start < k.value && k.value < tk.end))

const playing = ref(true)
let raf = 0
let last = 0
function tick(now: number) {
  if (playing.value) {
    const dt = Math.min(now - last, 50) / 1000
    const v = progress.value + dt / 5
    if (v >= 1) (emit('set', 'step', 1), (playing.value = false))
    else emit('set', 'step', v)
  }
  last = now
  raf = requestAnimationFrame(tick)
}
onMounted(() => { playing.value = !matchMedia('(prefers-reduced-motion: reduce)').matches; raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
watch(line, () => (emit('set', 'step', 0), (playing.value = true)))

const CW = 17
const X0 = 28
const Y0 = 90
const readouts = computed(() => [
  { label: t('tok.read'), value: `${k.value} / ${line.value.length}` },
  { label: t('tok.tokens'), value: String(doneTokens.value.length), color: 'var(--accent)' },
  { label: t('tok.state'), value: k.value < line.value.length ? t(`tok.st.${states.value[k.value]}` as any) : t('tok.done'), color: 'var(--accent-2)' },
])
</script>

<template>
  <div class="relative">
    <div class="absolute end-3 top-3 flex gap-1">
      <button class="num rounded-lg border px-2.5 py-1 text-xs" style="border-color: var(--line); background: var(--panel); color: var(--muted)" @click="playing = !playing; if (playing && progress >= 1) $emit('set', 'step', 0)">{{ playing ? t('plot.pause') : t('plot.play') }}</button>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="20" font-size="12" fill="var(--muted)">{{ t('tok.hint') }}</text>
      <rect :x="X0 - 10" :y="Y0 - 30" :width="line.length * CW + 20" height="46" rx="8" fill="var(--sunken)" stroke="var(--line)" />
      <g class="num" font-size="20" font-family="monospace">
        <text v-for="(ch, i) in line" :key="i" :x="X0 + i * CW" :y="Y0" :fill="i < k ? COLOR[states[i]] : 'var(--muted)'" :fill-opacity="i < k ? 1 : 0.35">{{ ch === ' ' ? '·' : ch }}</text>
      </g>
      <rect v-if="k < line.length" :x="X0 + k * CW - 3" :y="Y0 - 22" width="16" height="26" rx="3" fill="none" stroke="var(--fg)" stroke-width="1.5" />
      <text class="num" x="16" y="150" font-size="12" fill="var(--muted)">{{ t('tok.tokensLabel') }}</text>
      <g class="num" font-size="13">
        <g v-for="(tk, i) in doneTokens" :key="'d' + i" :transform="`translate(${16 + i * 110}, 168)`">
          <rect width="100" height="46" rx="6" :fill="COLOR[tk.type]" fill-opacity="0.15" :stroke="COLOR[tk.type]" />
          <text x="8" y="19" :fill="COLOR[tk.type]">{{ tk.text }}</text>
          <text x="8" y="36" fill="var(--muted)" font-size="10">{{ t(`tok.st.${tk.type}` as any) }}</text>
        </g>
        <g v-if="partial" :transform="`translate(${16 + doneTokens.length * 110}, 168)`">
          <rect width="100" height="46" rx="6" fill="none" :stroke="COLOR[partial.type]" stroke-dasharray="4 3" />
          <text x="8" y="19" :fill="COLOR[partial.type]">{{ line.slice(partial.start, k) }}…</text>
          <text x="8" y="36" fill="var(--muted)" font-size="10">{{ t('tok.reading') }}</text>
        </g>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
