<script setup lang="ts">
import { computed } from 'vue'
import { t, type Key } from '../i18n'
import { FAMILIES, type Family } from '../patterns/engine'
import { practiceItems } from '../patterns/items'
import { ruleName } from '../patterns/explain'
import { usePatterns } from '../stores/patterns'
import PatternWalkthrough from '../components/patterns/PatternWalkthrough.vue'
import PatternPuzzle from '../components/patterns/PatternPuzzle.vue'

// The five rules, each with a worked example and two puzzles to try. After a test the rules are
// ordered by how the student did on them, weakest first; without one they come in teaching order.
const store = usePatterns()
const score = computed(() => store.score)
const ratio = (f: Family) => {
  const x = score.value?.byFamily[f]
  return x && x.total ? x.right / x.total : null
}
const order = computed(() => (score.value ? [...FAMILIES].sort((a, b) => (ratio(a) ?? 2) - (ratio(b) ?? 2)) : FAMILIES))
const weakest = computed(() => {
  const f = order.value[0]
  return score.value && ratio(f) !== null && ratio(f)! < 1 ? f : null
})
const tx = (k: string) => t(k as Key)
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-10 lg:px-8">
    <p class="label mb-3" style="color: var(--accent)">{{ t('pat.title') }}</p>
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('pat.lesson.title') }}</h1>
    <p class="mt-3 max-w-2xl text-lg leading-relaxed" style="color: var(--muted)">{{ t('pat.lesson.lead') }}</p>

    <section v-if="score" class="surface mt-6 p-5">
      <h2 class="label mb-3">{{ t('pat.lesson.yours') }}</h2>
      <ul class="grid gap-2 sm:grid-cols-5">
        <li v-for="f in order" :key="f">
          <RouterLink :to="`/patterns/lesson#${f}`" class="block h-full rounded-xl border p-3 hover:border-[var(--accent)]" :style="{ borderColor: weakest === f ? 'var(--accent)' : 'var(--line)' }">
            <span class="block text-sm font-medium">{{ ruleName(f) }}</span>
            <span class="mt-1 block text-xs" style="color: var(--muted)">{{ score.byFamily[f].total ? t('pat.rule.score', score.byFamily[f]) : t('pat.res.noData') }}</span>
            <span v-if="weakest === f" class="mt-2 inline-block rounded-full px-2 py-0.5 text-xs" style="background: var(--accent-soft); color: var(--accent)">{{ t('pat.lesson.weakest') }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <section v-else class="surface mt-6 flex flex-wrap items-center justify-between gap-4 p-5">
      <p class="max-w-lg text-sm leading-relaxed">{{ t('pat.lesson.takeFirst') }}</p>
      <RouterLink to="/patterns" class="btn-primary px-5 py-2.5 text-sm">{{ t('pat.lesson.retake') }}</RouterLink>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold tracking-tight">{{ t('pat.lesson.method.t') }}</h2>
      <ol class="mt-4 grid gap-px overflow-hidden rounded-[14px] border sm:grid-cols-2" style="border-color: var(--line); background: var(--line)">
        <li v-for="i in 4" :key="i" class="flex gap-3 p-4 leading-relaxed" style="background: var(--panel)">
          <span class="num grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm" style="background: var(--accent-soft); color: var(--accent)">{{ i }}</span>
          <span>{{ tx(`pat.lesson.method.${i}`) }}</span>
        </li>
      </ol>
    </section>

    <section v-for="(f, i) in order" :id="f" :key="f" class="mt-12 scroll-mt-20">
      <div class="flex flex-wrap items-center gap-3">
        <span class="num grid h-9 w-9 place-items-center rounded-xl text-base font-semibold" style="background: var(--accent-soft); color: var(--accent)">{{ i + 1 }}</span>
        <h2 class="text-2xl font-semibold tracking-tight">{{ ruleName(f) }}</h2>
        <span v-if="weakest === f" class="rounded-full px-2.5 py-0.5 text-xs" style="background: var(--accent-soft); color: var(--accent)">{{ t('pat.lesson.weakest') }}</span>
      </div>
      <p class="mt-3 max-w-2xl text-[17px] leading-relaxed">{{ tx(`pat.lesson.${f}.idea`) }}</p>
      <p class="mt-2 max-w-2xl leading-relaxed" style="color: var(--muted)">{{ tx(`pat.lesson.${f}.spot`) }}</p>

      <div class="surface mt-5 p-5">
        <p class="label mb-4">{{ t('pat.lesson.example') }}</p>
        <PatternWalkthrough :item="practiceItems[f][0]" />
      </div>
      <div v-for="(it, k) in practiceItems[f].slice(1)" :key="k" class="surface mt-4 p-5">
        <p class="label mb-4">{{ t('pat.lesson.yourTurn') }} · <span class="num">{{ k + 1 }}</span></p>
        <PatternPuzzle :item="it" />
      </div>
    </section>

    <section class="mt-14">
      <h2 class="text-xl font-semibold tracking-tight">{{ t('pat.lesson.traps.t') }}</h2>
      <ul class="mt-4 space-y-3">
        <li v-for="i in 4" :key="i" class="flex gap-3 leading-relaxed">
          <span class="mt-0.5 shrink-0 font-bold" style="color: var(--neg)">✗</span>
          <span>{{ tx(`pat.lesson.traps.${i}`) }}</span>
        </li>
      </ul>
    </section>

    <details class="surface mt-10 p-5">
      <summary class="flex items-center gap-2 font-semibold"><span class="chev" style="color: var(--muted)">›</span>{{ t('pat.lesson.origin.t') }}</summary>
      <p class="mt-3 leading-relaxed" style="color: var(--muted)">{{ t('pat.lesson.origin.d') }}</p>
    </details>

    <div class="mt-10 flex flex-wrap gap-3">
      <RouterLink to="/patterns" class="btn-primary px-5 py-2.5">{{ score ? t('pat.lesson.back') : t('pat.lesson.retake') }}</RouterLink>
    </div>
  </main>
</template>
