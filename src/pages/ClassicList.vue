<script setup lang="ts">
import { computed, ref } from 'vue'
import { classicSims, classicCategories, classicText, type ClassicCategory } from '../classic'
import { t, type Key } from '../i18n'

const active = ref<ClassicCategory | 'all'>('all')
const shown = computed(() => classicSims.filter((s) => active.value === 'all' || s.category === active.value))
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8 lg:px-8">
    <h1 class="text-3xl font-semibold tracking-tight">{{ t('classic.title') }}</h1>
    <p class="mt-1 max-w-2xl" style="color: var(--muted)">{{ t('classic.lead', { n: classicSims.length }) }}</p>

    <div class="mt-5 flex flex-wrap gap-1 rounded-xl p-1" style="background: var(--sunken)" role="tablist">
      <button
        v-for="c in ['all', ...classicCategories] as const"
        :key="c"
        role="tab"
        :aria-selected="active === c"
        class="rounded-lg px-3 py-1.5 text-sm transition-colors"
        :style="active === c ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
        @click="active = c"
      >
        {{ t(`classic.cat.${c}` as Key) }}
      </button>
    </div>

    <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="s in shown" :key="s.id">
        <RouterLink :to="`/classic/${s.id}`" class="surface lift flex h-full flex-col overflow-hidden">
          <div class="aspect-[16/9] overflow-hidden" style="background: var(--sunken)">
            <img v-if="s.image" :src="`./legacy/${s.image}`" :alt="classicText(s).title" loading="lazy" class="h-full w-full object-cover" />
            <div v-else class="grid h-full place-items-center text-4xl font-semibold" style="color: var(--line)">{{ classicText(s).title.slice(0, 1) }}</div>
          </div>
          <div class="flex flex-1 flex-col p-4">
            <p class="font-medium">{{ classicText(s).title }}</p>
            <p class="mt-1 flex-1 text-sm leading-relaxed" style="color: var(--muted)">{{ classicText(s).description }}</p>
            <p class="label mt-3">{{ t(`classic.cat.${s.category}` as Key) }}</p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
