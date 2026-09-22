<script setup lang="ts">
import { computed } from 'vue'
import { fmt } from '../engine/math'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Breaking a Caesar cipher without the key: count letters in the secret message and slide your guess until the
// bars line up with how often letters appear in normal English. param guess (0..25).
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ENGLISH = [8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.15, 0.8, 4.0, 2.4, 6.7, 7.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.15, 2.0, 0.07]
const PLAIN = 'FREQUENCY ANALYSIS BREAKS SIMPLE CIPHERS BECAUSE EVERY LANGUAGE USES SOME LETTERS MUCH MORE OFTEN THAN OTHERS. IN ENGLISH THE LETTER E APPEARS MOST OFTEN, FOLLOWED BY T, A AND O. A SECRET MESSAGE THAT ONLY SHIFTS LETTERS KEEPS THOSE PATTERNS, SO COUNTING LETTERS IS ENOUGH TO FIND THE KEY.'
const KEY = 7
const cipher = PLAIN.replace(/[A-Z]/g, (c) => A[(A.indexOf(c) + KEY) % 26])
const counts = Array(26).fill(0)
for (const c of cipher) if (A.includes(c)) counts[A.indexOf(c)]++
const totalLetters = counts.reduce((a, b) => a + b, 0)
const guess = computed(() => ((Math.round(props.params.guess ?? 0) % 26) + 26) % 26)
// frequency of plaintext letter i if the key were `guess`
const shifted = computed(() => Array.from({ length: 26 }, (_, i) => (counts[(i + guess.value) % 26] / totalLetters) * 100))
const score = computed(() => shifted.value.reduce((s, v, i) => s + v * ENGLISH[i], 0) / 100)
const decrypted = computed(() => cipher.replace(/[A-Z]/g, (c) => A[(A.indexOf(c) - guess.value + 26) % 26]).slice(0, 110))
const bx = (i: number) => 40 + i * 28
const readouts = computed(() => [
  { label: t('freq.guess'), value: String(guess.value), color: 'var(--accent-2)' },
  { label: t('freq.match'), value: fmt(score.value, 2), color: guess.value === KEY ? 'var(--pos)' : 'var(--muted)' },
  { label: t('freq.letters'), value: String(totalLetters) },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('freq.hint') }}</text>
      <foreignObject x="16" y="30" :width="W - 32" height="52"><div xmlns="http://www.w3.org/1999/xhtml" dir="ltr" style="font: 12px/1.45 ui-monospace, monospace; color: var(--muted); word-break: break-all">{{ cipher.slice(0, 150) }}…</div></foreignObject>
      <g v-for="(v, i) in shifted" :key="i">
        <rect :x="bx(i)" :y="330 - v * 14" width="20" :height="v * 14" rx="3" fill="var(--accent-2)" fill-opacity="0.8" />
        <rect :x="bx(i) + 4" :y="330 - ENGLISH[i] * 14" width="12" height="3" fill="var(--accent)" />
        <text class="num" :x="bx(i) + 10" y="348" text-anchor="middle" font-size="12" fill="var(--fg)">{{ A[i] }}</text>
      </g>
      <g class="num" font-size="11"><rect x="560" y="100" width="12" height="12" fill="var(--accent-2)" /><text x="578" y="110" fill="var(--fg)">{{ t('freq.secret') }}</text><rect x="560" y="120" width="12" height="3" fill="var(--accent)" /><text x="578" y="126" fill="var(--fg)">{{ t('freq.english') }}</text></g>
      <foreignObject x="16" y="370" :width="W - 32" height="90"><div xmlns="http://www.w3.org/1999/xhtml" dir="ltr" :style="`font: 14px/1.5 ui-monospace, monospace; color: ${guess === KEY ? 'var(--pos)' : 'var(--fg)'}`">{{ decrypted }}…</div></foreignObject>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
