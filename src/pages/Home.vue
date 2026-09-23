<script setup lang="ts">
import { computed } from 'vue'
import { lessons } from '../lessons'
import { classicSims } from '../classic'
import type { Subject } from '../lessons/types'
import { t, type Key } from '../i18n'
import ExplorerInput from '../components/ExplorerInput.vue'
import HeroDemo from '../components/HeroDemo.vue'
import SubjectIcon from '../components/SubjectIcon.vue'
import { useProgress } from '../stores/progress'

const progress = useProgress()

const subjects = computed(() => {
  const count = new Map<Subject, number>()
  for (const l of lessons) count.set(l.subject, (count.get(l.subject) ?? 0) + 1)
  return [...count.entries()].map(([id, n]) => ({ id, n }))
})
const steps = [1, 2, 3].map((i) => ({ title: `home.step${i}.t` as Key, text: `home.step${i}.d` as Key }))
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 lg:px-8">
    <section class="grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
      <div>
        <p class="label mb-4" style="color: var(--accent)">{{ t('home.kicker') }}</p>
        <h1 class="text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.12]">{{ t('home.title1') }}<br />{{ t('home.title2') }}</h1>
        <p class="mt-5 max-w-lg text-lg leading-relaxed" style="color: var(--muted)">{{ t('home.lead') }}</p>
        <div class="mt-7 flex flex-wrap items-center gap-3">
          <RouterLink to="/lesson/slope" class="btn-primary px-6 py-3 text-base">{{ t('home.start2') }}</RouterLink>
          <RouterLink to="/#subjects" class="rounded-[10px] border px-5 py-3 font-medium hover:border-[var(--accent)]" style="border-color: var(--line)">{{ t('home.subjects') }}</RouterLink>
        </div>
      </div>
      <HeroDemo />
    </section>

    <section class="surface p-5 sm:p-6">
      <ExplorerInput chips />
    </section>

    <section class="mt-12">
      <h2 class="label mb-3">{{ t('home.how') }}</h2>
      <div class="grid gap-px overflow-hidden rounded-[14px] border sm:grid-cols-3" style="border-color: var(--line); background: var(--line)">
        <div v-for="s in steps" :key="s.title" class="p-5" style="background: var(--panel)">
          <p class="font-medium">{{ t(s.title) }}</p>
          <p class="mt-1 text-sm leading-relaxed" style="color: var(--muted)">{{ t(s.text) }}</p>
        </div>
      </div>
    </section>

    <section id="subjects" class="scroll-mt-20 py-14">
      <h2 class="text-2xl font-semibold tracking-tight">{{ t('home.subjects') }}</h2>
      <p class="mt-1" style="color: var(--muted)">{{ t('home.subjects.d') }}</p>
      <p v-if="progress.doneCount" class="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <span class="rounded-full px-3 py-1 tabular-nums" style="background: var(--accent-soft); color: var(--accent)">{{ t('progress.overall', { done: progress.doneCount, total: progress.total }) }}</span>
        <span class="text-xs" style="color: var(--muted)">{{ t('progress.saved') }}</span>
        <button class="text-xs underline" style="color: var(--muted)" @click="progress.reset()">{{ t('progress.reset') }}</button>
      </p>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in subjects" :key="s.id">
          <RouterLink :to="`/subject/${s.id}`" class="surface lift relative flex h-full gap-4 p-5">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style="background: var(--accent-soft); color: var(--accent)"><SubjectIcon :subject="s.id" /></span>
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="pe-20 text-lg font-medium">{{ t(`subject.${s.id}` as Key) }}</span>
              <span class="mt-1 block text-sm leading-relaxed" style="color: var(--muted)">{{ t(`subjectd.${s.id}` as Key) }}</span>
              <span v-if="progress.bySubject(s.id).done" class="mt-auto block pt-3"><span class="block h-1.5 overflow-hidden rounded-full" style="background: var(--sunken)"><span class="block h-full rounded-full" style="background: var(--pos)" :style="{ width: `${(100 * progress.bySubject(s.id).done) / s.n}%` }" /></span></span>
            </span>
            <!-- Always the same corner, whatever the title's length. -->
            <span class="absolute top-5 end-5 shrink-0 rounded-full px-2.5 py-0.5 text-xs tabular-nums" style="background: var(--sunken); color: var(--muted)">{{ t('home.lessons', { n: s.n }) }}</span>
          </RouterLink>
        </li>
      </ul>

      <RouterLink to="/classic" class="surface lift mt-4 flex flex-wrap items-center justify-between gap-4 p-5">
        <span>
          <span class="block text-lg font-medium">{{ t('home.gallery.t') }}</span>
          <span class="mt-1 block text-sm leading-relaxed" style="color: var(--muted)">{{ t('home.gallery.d', { n: classicSims.length }) }}</span>
        </span>
        <span class="btn-primary px-5 py-2.5 text-sm">{{ t('home.gallery.b') }}</span>
      </RouterLink>
    </section>
  </main>
</template>
