<script setup lang="ts">
import { computed } from 'vue'
import { t, locale } from '../i18n'
import { lessons, getLesson } from '../lessons'
import { localize } from '../lessons/localize'
import { useProgress } from '../stores/progress'
import SubjectIcon from '../components/SubjectIcon.vue'
import MathText from '../components/MathText.vue'

// The daily mix: five challenges picked deterministically for today and frozen in localStorage,
// favouring lessons the learner has already finished so old skills stay sharp. Solving happens
// inside the lesson page (which records it); this page just deals the hand and keeps score.
const progress = useProgress()
const d = new Date()
const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296
  }
}
const seed = [...dateKey].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) | 0, 7)

function shuffled<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function dealMix(): { id: string; i: number }[] {
  const rnd = mulberry(seed)
  const entry = (id: string, i: number) => ({ id, i })
  const review = lessons.flatMap((l) => l.challenges.map((_, i) => entry(l.id, i)).filter((e) => progress.isDone(l.id) || progress.isSolved(e.id, e.i)))
  const fresh = lessons.flatMap((l) => l.challenges.map((_, i) => entry(l.id, i)).filter((e) => !progress.isDone(l.id) && !progress.isSolved(e.id, e.i)))
  const pool = [...shuffled(review, rnd), ...shuffled(fresh, rnd)]
  const picked: { id: string; i: number }[] = []
  const used = new Set<string>()
  for (const e of pool) {
    if (picked.length === 5) break
    if (used.has(e.id)) continue
    used.add(e.id)
    picked.push(e)
  }
  for (const e of pool) {
    if (picked.length === 5) break
    if (!picked.includes(e)) picked.push(e)
  }
  return picked
}

// Freeze today's hand so solving a lesson mid-day cannot reshuffle it.
const KEY = 'dailyMix'
function todaysMix(): { id: string; i: number }[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (saved?.date === dateKey && Array.isArray(saved.mix) && saved.mix.every((e: any) => getLesson(e.id)?.challenges[e.i])) return saved.mix
  } catch {}
  const mix = dealMix()
  try {
    localStorage.setItem(KEY, JSON.stringify({ date: dateKey, mix }))
  } catch {}
  return mix
}

const mix = todaysMix()
const cards = computed(() => {
  void locale.value
  return mix.map((e) => {
    const l = localize(getLesson(e.id)!)
    return { ...e, title: l.title, subject: l.subject, text: l.challenges[e.i]?.text ?? '', solved: progress.isSolved(e.id, e.i) }
  })
})
const doneToday = computed(() => cards.value.filter((c) => c.solved).length)
const allTime = computed(() => {
  let solved = 0
  const touched = new Set<string>()
  for (const l of lessons)
    for (let i = 0; i < l.challenges.length; i++)
      if (progress.isSolved(l.id, i)) {
        solved++
        touched.add(l.id)
      }
  return { n: solved, m: touched.size }
})
const dateLabel = d.toLocaleDateString(locale.value === 'ar' ? 'ar' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
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
    <p v-if="allTime.n" class="mt-1 text-sm" style="color: var(--muted)">{{ t('practice.totals', allTime) }}</p>
  </main>
</template>
