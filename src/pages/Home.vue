<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { matchLesson, examples } from '../engine/explorer'
import { lessons, subjectLabels } from '../lessons'
import type { Lesson, Subject } from '../lessons/types'
import Katex from '../components/Katex.vue'

const groups = computed(() => {
  const m = new Map<Subject, Lesson[]>()
  for (const l of lessons) m.set(l.subject, [...(m.get(l.subject) ?? []), l])
  return [...m.entries()]
})

const router = useRouter()
const query = ref('')
function explore(q = query.value) {
  if (!q.trim()) return
  const id = matchLesson(q)
  router.push(id ? `/lesson/${id}` : { path: '/explore', query: { q } })
}
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-14 lg:px-8">
    <h1 class="max-w-2xl text-4xl font-semibold tracking-tight">See what the equation means.</h1>
    <p class="mt-3 max-w-xl" style="color: var(--muted)">
      Every concept is an interactive simulation: change a variable, watch the consequence, then read why it works and where it is used.
    </p>

    <form class="mt-8 flex max-w-2xl gap-2" @submit.prevent="explore()">
      <input
        v-model="query"
        aria-label="Equation"
        placeholder="Type an equation — ∫₀⁴ x² dx, lim(x→0) sin(x)/x, V = IR …"
        class="num min-w-0 flex-1 rounded-md border px-4 py-3 outline-none focus:border-[var(--accent)]"
        style="border-color: var(--line); background: var(--panel)"
      />
      <button class="rounded-md px-5 font-medium" style="background: var(--fg); color: var(--bg)">Explore</button>
    </form>
    <div class="mt-3 flex max-w-2xl flex-wrap gap-2">
      <button
        v-for="e in examples"
        :key="e"
        class="num rounded border px-2 py-1 text-xs hover:border-[var(--accent)]"
        style="border-color: var(--line); color: var(--muted)"
        @click="explore(e)"
      >
        {{ e }}
      </button>
    </div>

    <section v-for="[subject, items] in groups" :key="subject" class="mt-12">
      <h2 class="label mb-2">{{ subjectLabels[subject] }}</h2>
      <ul class="divide-y border-y" style="border-color: var(--line)">
        <li v-for="l in items" :key="l.id" style="border-color: var(--line)">
          <RouterLink :to="`/lesson/${l.id}`" class="group grid items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[14rem_1fr_auto]">
            <span class="font-medium group-hover:underline">{{ l.title }}</span>
            <span class="text-sm" style="color: var(--muted)">{{ l.summary }}</span>
            <span class="text-sm"><Katex :tex="l.equation" /></span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <p class="mt-14 text-sm" style="color: var(--muted)">
      Looking for the original simulations? <a href="./legacy/index.html" class="underline">Open the classic collection</a>.
    </p>
  </main>
</template>
