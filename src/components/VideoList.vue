<script setup lang="ts">
import type { Video } from '../lessons/types'
import { t } from '../i18n'

// Outbound links only: nothing from YouTube loads until the learner clicks.
defineProps<{ videos: Video[]; searchQuery?: string }>()
const search = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
</script>

<template>
  <section v-if="videos.length || searchQuery">
    <h2 class="mb-1 text-xl font-semibold tracking-tight">{{ t('videos.title') }}</h2>
    <p class="mb-4 text-sm" style="color: var(--muted)">{{ t('videos.lead') }}</p>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="v in videos" :key="v.url">
        <a :href="v.url" target="_blank" rel="noopener" class="surface lift flex h-full gap-3 p-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style="background: var(--neg); color: #fff" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span class="min-w-0">
            <span class="flex items-center gap-2"><span class="font-medium">{{ v.title }}</span><span class="rounded px-1.5 text-[10px] uppercase" style="background: var(--sunken); color: var(--muted)">{{ v.lang }}</span></span>
            <span class="block text-xs" style="color: var(--muted)">{{ v.by }}</span>
            <span v-if="v.note" class="mt-1 block text-sm leading-snug" style="color: var(--muted)">{{ v.note }}</span>
          </span>
        </a>
      </li>
      <li v-if="searchQuery">
        <a :href="search(searchQuery)" target="_blank" rel="noopener" class="surface lift flex h-full items-center gap-3 border-dashed p-4">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style="background: var(--sunken); color: var(--muted)" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </span>
          <span class="text-sm">{{ t('videos.search', { q: searchQuery }) }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>
