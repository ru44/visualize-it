<script setup lang="ts">
import { computed, ref } from 'vue'
import { lessons, subjectLabels } from '../lessons'
import type { Subject } from '../lessons/types'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import ExplorerInput from '../components/ExplorerInput.vue'
import HeroDemo from '../components/HeroDemo.vue'

const subjects = computed(() => [...new Set(lessons.map((l) => l.subject))])
const active = ref<Subject | 'all'>('all')
const shown = computed(() => (active.value === 'all' ? lessons : lessons.filter((l) => l.subject === active.value)))

const principles = [
  { k: 'Manipulate', t: 'Drag points, pistons and sliders. Every variable is something you can move.' },
  { k: 'Understand', t: 'Plain-language intuition first, the formal derivation one click away.' },
  { k: 'Connect', t: 'Each equation shows where it is used — and what to learn before and after it.' },
]
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 lg:px-8">
    <section class="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20">
      <div>
        <p class="label mb-4" style="color: var(--accent)">Maths · Physics · Electricity · Chemistry</p>
        <h1 class="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">See what the<br />equation means.</h1>
        <p class="mt-5 max-w-lg text-lg leading-relaxed" style="color: var(--muted)">
          Don’t memorize formulas. Move their variables, watch what happens, and understand why the answer makes sense.
        </p>
        <ExplorerInput class="mt-8 max-w-xl" chips />
      </div>
      <HeroDemo />
    </section>

    <section class="grid gap-px overflow-hidden rounded-[14px] border sm:grid-cols-3" style="border-color: var(--line); background: var(--line)">
      <div v-for="p in principles" :key="p.k" class="p-5" style="background: var(--panel)">
        <p class="font-medium">{{ p.k }}</p>
        <p class="mt-1 text-sm leading-relaxed" style="color: var(--muted)">{{ p.t }}</p>
      </div>
    </section>

    <section id="concepts" class="scroll-mt-20 py-16">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight">Concepts</h2>
          <p class="mt-1 text-sm" style="color: var(--muted)">{{ lessons.length }} interactive lessons. Pick one, or follow the <RouterLink to="/map" class="underline underline-offset-2">learning map</RouterLink>.</p>
        </div>
        <div class="flex flex-wrap gap-1 rounded-xl p-1" style="background: var(--sunken)" role="tablist">
          <button
            v-for="s in ['all', ...subjects] as const"
            :key="s"
            role="tab"
            :aria-selected="active === s"
            class="rounded-lg px-3 py-1.5 text-sm transition-colors"
            :style="active === s ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
            @click="active = s"
          >
            {{ s === 'all' ? 'All' : subjectLabels[s] }}
          </button>
        </div>
      </div>

      <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="l in shown" :key="l.id">
          <RouterLink :to="`/lesson/${l.id}`" class="surface lift group flex h-full flex-col p-5">
            <div class="flex h-16 items-center overflow-hidden text-lg"><Katex :tex="l.equation" /></div>
            <p class="mt-3 font-medium">{{ l.title }}</p>
            <p class="mt-1 flex-1 text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="l.summary" /></p>
            <p class="mt-4 flex items-center justify-between text-xs" style="color: var(--muted)">
              <span class="label">{{ subjectLabels[l.subject] }} · {{ l.difficulty }}</span>
              <span class="transition-transform group-hover:translate-x-1" style="color: var(--accent)">Open →</span>
            </p>
          </RouterLink>
        </li>
      </ul>
    </section>
  </main>
</template>
