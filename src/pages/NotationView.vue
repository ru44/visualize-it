<script setup lang="ts">
import { computed, ref } from 'vue'
import { notation, displayTex } from '../lessons/notation'
import { t, type Key } from '../i18n'
import Katex from '../components/Katex.vue'

const q = ref('')
const groups = ['greek', 'calculus', 'relation', 'operator', 'probability', 'statistics', 'sets', 'function', 'constant', 'letter', 'computer-science', 'layout']
const entries = computed(() => Object.entries(notation.value).map(([token, e]) => ({ token, ...e })))
const shown = computed(() => {
  const s = q.value.trim().toLowerCase()
  return entries.value.filter((e) => !s || e.token.toLowerCase().includes(s) || e.name.toLowerCase().includes(s) || e.meaning.toLowerCase().includes(s) || e.read.toLowerCase().includes(s))
})
const byGroup = computed(() => groups.map((g) => ({ g, items: shown.value.filter((e) => e.group === g) })).filter((x) => x.items.length))
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-8 lg:px-8">
    <h1 class="text-3xl font-semibold tracking-tight">{{ t('notation.title') }}</h1>
    <p class="mt-1 max-w-2xl" style="color: var(--muted)">{{ t('notation.lead') }}</p>
    <input v-model="q" :placeholder="t('notation.search')" class="surface mt-5 w-full max-w-md px-4 py-2.5 outline-none focus:border-[var(--accent)]" />
    <section v-for="{ g, items } in byGroup" :key="g" class="mt-8">
      <h2 class="label mb-3">{{ t(`notation.group.${g}` as Key) }}</h2>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li v-for="e in items" :key="e.token" class="surface flex gap-4 p-4">
          <span class="grid h-12 w-16 shrink-0 place-items-center rounded-lg text-lg" style="background: var(--sunken)"><Katex :tex="displayTex(e.token)" /></span>
          <span class="min-w-0">
            <span class="flex flex-wrap items-baseline gap-2"><span class="font-medium">{{ e.name }}</span><span v-if="e.read" class="text-xs" style="color: var(--muted)">{{ t('notation.read') }} “{{ e.read }}”</span></span>
            <span class="mt-0.5 block text-sm leading-relaxed" style="color: var(--muted)">{{ e.meaning }}</span>
            <span v-if="e.example" class="mt-1 block text-sm"><Katex :tex="e.example" /></span>
          </span>
        </li>
      </ul>
    </section>
  </main>
</template>
