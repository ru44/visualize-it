<script setup lang="ts">
import { computed } from 'vue'
import { t, locale } from '../i18n'
import { getLesson } from '../lessons'
import { localize } from '../lessons/localize'
import { usePractice } from '../stores/practice'
import SubjectIcon from '../components/SubjectIcon.vue'
import MathText from '../components/MathText.vue'

// The page is a thin view over the practice store: it localizes today's dealt hand and keeps score.
const practice = usePractice()

const cards = computed(() => {
  void locale.value
  return practice.mix.map((e) => {
    const l = localize(getLesson(e.id)!)
    return { ...e, title: l.title, subject: l.subject, text: l.challenges[e.i]?.text ?? '', solved: practice.solvedToday(e.id, e.i) }
  })
})
const doneToday = computed(() => cards.value.filter((c) => c.solved).length)
const dateLabel = practice.today.toLocaleDateString(locale.value === 'ar' ? 'ar' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-10 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight">{{ t('practice.title') }}</h1>
    <p class="mt-2 max-w-xl" style="color: var(--muted)">{{ t('practice.lead', { date: dateLabel }) }}</p>

    <div class="mt-6 flex items-center gap-3">
      <div class="h-2 flex-1 overflow-hidden rounded-full" style="background: var(--sunken)">
        <div class="h-full rounded-full transition-all" :style="`width: ${(doneToday / 5) * 100}%; background: var(--pos)`" />
      </div>
      <span class="num shrink-0 text-sm" style="color: var(--muted)">{{ t('practice.progress', { done: doneToday, total: 5 }) }}</span>
    </div>
    <p v-if="doneToday === 5" class="mt-3 font-medium" style="color: var(--pos)">{{ t('practice.allDone') }}</p>

    <ol class="mt-6 space-y-3">
      <li v-for="(c, idx) in cards" :key="c.id + c.i">
        <RouterLink
          :to="`/lesson/${c.id}#challenges`"
          class="flex items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-[var(--accent)]"
          style="border-color: var(--line); background: var(--panel)"
        >
          <span class="num grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm" :style="c.solved ? 'background: var(--pos); color: #fff' : 'background: var(--sunken); color: var(--muted)'">{{ c.solved ? '✓' : idx + 1 }}</span>
          <span class="shrink-0" style="color: var(--accent)"><SubjectIcon :subject="c.subject" /></span>
          <span class="min-w-0 flex-1">
            <span class="block text-[15px] font-medium" :style="c.solved ? 'color: var(--muted)' : ''">{{ c.title }}</span>
            <span class="mt-0.5 block text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="c.text" /></span>
          </span>
          <svg class="shrink-0 rtl:-scale-x-100" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--muted)" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </RouterLink>
      </li>
    </ol>

    <p class="mt-6 text-sm" style="color: var(--muted)">{{ t('practice.reviewNote') }}</p>
    <p v-if="practice.allTime.n" class="mt-1 text-sm" style="color: var(--muted)">{{ t('practice.totals', practice.allTime) }}</p>

    <RouterLink to="/patterns" class="surface lift mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
      <span>
        <span class="block text-lg font-medium">{{ t('home.patterns.t') }}</span>
        <span class="mt-1 block text-sm leading-relaxed" style="color: var(--muted)">{{ t('home.patterns.d') }}</span>
      </span>
      <span class="btn-primary px-5 py-2.5 text-sm">{{ t('home.patterns.b') }}</span>
    </RouterLink>
  </main>
</template>
