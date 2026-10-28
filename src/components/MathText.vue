<script setup lang="ts">
import { computed } from 'vue'
import Katex from './Katex.vue'

// Plain text with inline $LaTeX$ segments. In right-to-left text (Arabic), plain Latin runs such as
// "x = -5" or "F/m" are isolated as left-to-right islands so the bidi algorithm cannot scramble them.
// So is a negative number, with its unit if one follows ("−95 dBm"); left in the Arabic run, its sign
// would land on the wrong side and read "95−".
const props = defineProps<{ text: string }>()
const RTL_CHARS = /[\u0590-\u08FF]/
const LATIN_RUN = /((?:(?<![\w.])[−-]\d[\d.,]*\s*)?[A-Za-z](?:[A-Za-z0-9 =+\-−×·*/^().,<>≤≥%']*[A-Za-z0-9)%'])?|(?<![\w.])[−-]\d[\d.,]*)/
type Part = { s: string; kind: 'math' | 'text' | 'ltr' }
const parts = computed<Part[]>(() => {
  const rtl = RTL_CHARS.test(props.text)
  return props.text.split('$').flatMap((s, i): Part[] => {
    if (i % 2 === 1) return [{ s, kind: 'math' }]
    if (!rtl) return [{ s, kind: 'text' }]
    return s.split(LATIN_RUN).map((r, j) => ({ s: r, kind: j % 2 === 1 ? 'ltr' : 'text' }))
  })
})
</script>

<template>
  <span><template v-for="(p, i) in parts" :key="i"><Katex v-if="p.kind === 'math'" :tex="p.s" /><bdi v-else-if="p.kind === 'ltr'" dir="ltr">{{ p.s }}</bdi><template v-else>{{ p.s }}</template></template></span>
</template>
