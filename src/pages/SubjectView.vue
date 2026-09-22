<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { lessons, subjectVideos } from '../lessons'
import { localize } from '../lessons/localize'
import type { Subject } from '../lessons/types'
import { t, type Key } from '../i18n'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import SubjectIcon from '../components/SubjectIcon.vue'
import VideoList from '../components/VideoList.vue'
import { useProgress } from '../stores/progress'

const progress = useProgress()

const props = defineProps<{ subject: string }>()
const list = computed(() => lessons.filter((l) => l.subject === props.subject).map(localize))
const name = computed(() => (list.value.length ? t(`subject.${props.subject}` as Key) : ''))
watchEffect(() => (document.title = `${name.value} — Visualize It`))
const prog = computed(() => progress.bySubject(props.subject))
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-8 lg:px-8">
    <RouterLink to="/#subjects" class="label hover:text-[var(--fg)]"><span class="inline-block rtl:-scale-x-100">←</span> {{ t('subject.back') }}</RouterLink>
    <p v-if="!list.length" class="mt-8" style="color: var(--muted)">{{ t('lesson.notFound') }}</p>
    <template v-else>
      <header class="mt-4 flex items-center gap-4">
        <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style="background: var(--accent-soft); color: var(--accent)"><SubjectIcon :subject="subject as Subject" /></span>
        <div>
          <h1 class="text-3xl font-semibold tracking-tight">{{ name }}</h1>
          <p class="mt-0.5" style="color: var(--muted)">{{ t(`subjectd.${subject}` as Key) }}</p>
        </div>
      </header>
      <div class="mt-6 flex items-center gap-3 text-sm" style="color: var(--muted)">
        <div class="h-2 flex-1 overflow-hidden rounded-full" style="background: var(--sunken)"><div class="h-full rounded-full transition-all" style="background: var(--pos)" :style="{ width: `${(100 * prog.done) / prog.total}%` }" /></div>
        <span class="shrink-0 tabular-nums">{{ t('progress.of', prog) }}</span>
      </div>
      <p v-if="prog.done === prog.total" class="mt-2 text-sm" style="color: var(--pos)">{{ t('progress.all') }}</p>
      <p class="mt-3 text-sm" style="color: var(--muted)">{{ t('subject.path') }}</p>

      <ol class="mt-3 space-y-3">
        <li v-for="(l, i) in list" :key="l.id">
          <RouterLink :to="`/lesson/${l.id}`" class="surface lift group flex items-center gap-4 p-4 sm:p-5">
            <span class="num grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm" :style="progress.isDone(l.id) ? 'background: var(--pos); color: #fff' : i === 0 ? 'background: var(--accent); color: var(--bg)' : 'background: var(--sunken); color: var(--muted)'">{{ progress.isDone(l.id) ? '✓' : i + 1 }}</span>
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-2">
                <span class="font-medium">{{ l.title }}</span>
                <span v-if="i === 0" class="rounded-full px-2 py-0.5 text-[11px]" style="background: var(--accent-soft); color: var(--accent)">{{ t('subject.start') }}</span>
                <span class="text-[11px]" style="color: var(--muted)">{{ t(`level.${l.difficulty}` as Key) }}</span>
              </span>
              <span class="mt-0.5 block text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="l.summary" /></span>
            </span>
            <span v-if="l.equation.length < 60" class="hidden max-w-[15rem] shrink-0 overflow-hidden text-sm md:block"><Katex :tex="l.equation" /></span>
            <span class="shrink-0 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" style="color: var(--accent)">→</span>
          </RouterLink>
        </li>
      </ol>

      <VideoList class="mt-12" :videos="subjectVideos[subject] ?? []" :search-query="`${name} ${t('videos.explained')}`" />
    </template>
  </main>
</template>
