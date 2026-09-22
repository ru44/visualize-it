<script setup lang="ts">
import { computed, ref } from 'vue'
import { notation, displayTex } from '../lessons/notation'
import { getLesson } from '../lessons'
import { localize } from '../lessons/localize'
import { t, type Key } from '../i18n'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import SymbolDemo from '../components/SymbolDemo.vue'
import { hasDemo } from '../components/symbolDemos'

const q = ref('')
const groups = ['function', 'calculus', 'greek', 'relation', 'operator', 'probability', 'statistics', 'sets', 'constant', 'letter', 'computer-science', 'layout']
// Alternate spellings of the same symbol are not listed twice.
const ALIAS = new Set(['\\atan', '\\neq', '\\leq', '\\geq', '\\cdots', '\\varepsilon', '\\varphi', '\\Sigma'])
const entries = computed(() => Object.entries(notation.value).filter(([token]) => !ALIAS.has(token)).map(([token, e]) => ({ token, ...e })))
const shown = computed(() => {
  const s = q.value.trim().toLowerCase()
  return entries.value.filter((e) => !s || e.token.toLowerCase().includes(s) || e.name.toLowerCase().includes(s) || e.simple.toLowerCase().includes(s) || e.meaning.toLowerCase().includes(s) || e.read.toLowerCase().includes(s))
})
const byGroup = computed(() => groups.map((g) => ({ g, items: shown.value.filter((e) => e.group === g) })).filter((x) => x.items.length))
const lessonTitle = (id?: string) => (id && getLesson(id) ? localize(getLesson(id)!).title : '')
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-8 lg:px-8">
    <h1 class="text-3xl font-semibold tracking-tight">{{ t('notation.title') }}</h1>
    <p class="mt-1 max-w-2xl" style="color: var(--muted)">{{ t('notation.lead') }}</p>
    <input v-model="q" :placeholder="t('notation.search')" class="surface mt-5 w-full max-w-md px-4 py-2.5 outline-none focus:border-[var(--accent)]" />
    <section v-for="{ g, items } in byGroup" :key="g" class="mt-8">
      <h2 class="label mb-3">{{ t(`notation.group.${g}` as Key) }}</h2>
      <ul class="space-y-3">
        <li v-for="e in items" :key="e.token" class="surface flex flex-wrap gap-4 p-4 sm:flex-nowrap">
          <span class="grid h-14 w-20 shrink-0 place-items-center rounded-lg text-xl" style="background: var(--sunken)"><Katex :tex="displayTex(e.token)" /></span>
          <span class="min-w-0 flex-1">
            <span class="flex flex-wrap items-baseline gap-2"><span class="font-medium">{{ e.name }}</span><span v-if="e.read" class="text-xs" style="color: var(--muted)">{{ t('notation.read') }} “{{ e.read }}”</span></span>
            <span class="mt-1 block text-[16px] leading-relaxed"><MathText :text="e.simple" /></span>
            <span v-if="e.example" class="mt-1.5 block text-sm leading-relaxed" style="color: var(--muted)"><span class="label me-1">{{ t('notation.example') }}</span><MathText :text="e.example" /></span>
            <span v-if="e.meaning !== e.simple" class="mt-1.5 block text-xs leading-relaxed" style="color: var(--muted)">{{ e.meaning }}</span>
            <RouterLink v-if="e.lesson && lessonTitle(e.lesson)" :to="`/lesson/${e.lesson}`" class="mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium" style="background: var(--accent-soft); color: var(--accent)">{{ t('notation.learn', { lesson: lessonTitle(e.lesson) }) }}</RouterLink>
          </span>
          <SymbolDemo v-if="hasDemo(e.token)" :token="e.token" />
        </li>
      </ul>
    </section>
  </main>
</template>
