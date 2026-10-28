<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '../i18n'
import { FAMILIES, type Family, type Item } from '../patterns/engine'
import { ruleName } from '../patterns/explain'
import { practicePuzzle, MAX_LEVEL } from '../patterns/generate'
import { usePatterns } from '../stores/patterns'
import PatternPuzzle from '../components/patterns/PatternPuzzle.vue'

// Endless practice on one rule, with puzzles made fresh every time. The level follows the student:
// three first-try solves in a row step up, two misses in a row step back. Nothing is stored.
const route = useRoute()
const store = usePatterns()
// Without a rule in the address, start with the student's weakest one from the test, if any.
function weakest(): Family {
  const s = store.score
  if (!s) return 'constant'
  const ratio = (f: Family) => s.byFamily[f].right / s.byFamily[f].total
  return [...FAMILIES].filter((f) => s.byFamily[f].total).sort((a, b) => ratio(a) - ratio(b))[0] ?? 'constant'
}
const rule = computed<Family>(() => {
  const q = String(route.query.rule)
  return (FAMILIES as string[]).includes(q) ? (q as Family) : weakest()
})

const level = ref(1)
const streak = ref(0)
const misses = ref(0)
const done = ref(0)
const note = ref<'up' | 'down' | null>(null)
const answered = ref(false)
const n = ref(0)
const item = ref<Item>(practicePuzzle(rule.value, 1))

function next() {
  item.value = practicePuzzle(rule.value, level.value)
  n.value++
  answered.value = false
  note.value = null
}
watch(rule, () => {
  level.value = 1
  streak.value = misses.value = done.value = 0
  next()
})
function onResult(firstTry: boolean) {
  answered.value = true
  done.value++
  if (firstTry) {
    streak.value++
    misses.value = 0
    if (streak.value % 3 === 0 && level.value < MAX_LEVEL[rule.value]) ((level.value += 1), (note.value = 'up'))
  } else {
    streak.value = 0
    misses.value++
    if (misses.value >= 2 && level.value > 1) ((level.value -= 1), (misses.value = 0), (note.value = 'down'))
  }
}
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-10 lg:px-8">
    <p class="label mb-3" style="color: var(--accent)">{{ t('pat.title') }}</p>
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('pat.train.title') }}</h1>
    <p class="mt-3 max-w-2xl leading-relaxed" style="color: var(--muted)">{{ t('pat.train.lead') }}</p>

    <nav class="mt-6 flex flex-wrap gap-2" :aria-label="t('pat.train.pick')">
      <RouterLink
        v-for="f in FAMILIES"
        :key="f"
        :to="{ query: { rule: f } }"
        replace
        class="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
        :style="rule === f ? 'border-color: var(--accent); background: var(--accent-soft); color: var(--accent)' : 'border-color: var(--line); color: var(--muted)'"
        :aria-current="rule === f ? 'page' : undefined"
      >
        {{ ruleName(f) }}
      </RouterLink>
    </nav>

    <section class="surface mt-5 p-5">
      <div class="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm" style="color: var(--muted)">
        <span class="font-medium" style="color: var(--fg)">{{ t('pat.train.level', { n: level, max: MAX_LEVEL[rule] }) }}</span>
        <span>{{ t('pat.train.streak', { n: streak }) }}</span>
        <span>{{ t('pat.train.done', { n: done }) }}</span>
      </div>
      <PatternPuzzle :key="n" :item="item" @result="onResult" />
      <p v-if="note" class="mt-4 rounded-lg px-3 py-2 text-sm" style="background: var(--accent-soft)">{{ note === 'up' ? t('pat.train.up') : t('pat.train.down') }}</p>
      <button v-if="answered" class="btn-primary mt-4 px-5 py-2.5 text-sm" @click="next">{{ t('pat.train.next') }}</button>
    </section>

    <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <RouterLink :to="`/patterns/lesson#${rule}`" class="underline" style="color: var(--muted)">{{ t('pat.train.lesson') }}</RouterLink>
      <RouterLink to="/patterns" class="underline" style="color: var(--muted)">{{ t('pat.lesson.retake') }}</RouterLink>
    </div>
  </main>
</template>
