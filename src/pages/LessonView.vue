<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLesson, lessons, subjectLabels } from '../lessons'
import { buildAdhoc } from '../engine/adhoc'
import { vizRegistry } from '../viz/registry'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import ParamSlider from '../components/ParamSlider.vue'
import ExplorerInput from '../components/ExplorerInput.vue'
import { level, levels } from '../composables/useLevel'

const ParamChart = defineAsyncComponent(() => import('../components/ParamChart.vue'))

const props = defineProps<{ id?: string }>()
const route = useRoute()
const query = computed(() => String(route.query.q ?? ''))
const lesson = computed(() => (props.id ? getLesson(props.id) : buildAdhoc(query.value)))
const viz = computed(() => lesson.value && vizRegistry[lesson.value.visualization.type])

const params = reactive<Record<string, number>>({})
const rigorous = computed(() => level.value === 'university' || level.value === 'advanced')
const mode = ref<'intuition' | 'formal'>(rigorous.value ? 'formal' : 'intuition')
watch(rigorous, (r) => (mode.value = r ? 'formal' : 'intuition'))

function reset() {
  for (const k of Object.keys(params)) delete params[k]
  for (const [k, spec] of Object.entries(lesson.value?.parameters ?? {})) params[k] = spec.value
}
watch(lesson, reset, { immediate: true })

function setParam(name: string, value: number) {
  const spec = lesson.value?.parameters[name]
  if (!spec) return
  const snapped = Math.round(value / spec.step) * spec.step
  params[name] = Math.min(spec.max, Math.max(spec.min, +snapped.toFixed(6)))
}

watch(lesson, (l) => (document.title = l ? `${l.title} — Visualize It` : 'Visualize It'), { immediate: true })

const neighbours = computed(() => {
  const i = lessons.findIndex((l) => l.id === props.id)
  return i < 0 ? null : { prev: lessons[i - 1], next: lessons[i + 1] }
})

const linked = (ids: string[]) => ids.map((id) => ({ id, lesson: getLesson(id) }))
</script>

<template>
  <div v-if="!lesson" class="mx-auto max-w-2xl p-10" style="color: var(--muted)">
    <template v-if="id">Lesson not found.</template>
    <template v-else>
      Couldn’t turn “{{ query }}” into a visualization yet. Try a function of x such as <span class="num">x^3 - 3x</span>, a limit
      <span class="num">lim(x→0) sin(x)/x</span>, or an integral <span class="num">∫₀⁴ x² dx</span>.
    </template>
    <ExplorerInput v-if="!id" class="mt-6" :initial="query" chips />
    <RouterLink to="/" class="mt-6 block underline">Back to all concepts</RouterLink>
  </div>
  <article v-else class="mx-auto max-w-6xl px-4 py-6 lg:px-8">
    <ExplorerInput v-if="!id" class="mb-6 max-w-2xl" :initial="query" />
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="label flex items-center gap-2">
          <RouterLink to="/#concepts" class="hover:text-[var(--fg)]">← Concepts</RouterLink>
          <span>/</span>
          <span>{{ subjectLabels[lesson.subject] }}</span>
        </p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight">{{ lesson.title }}</h1>
        <p class="mt-1.5 max-w-2xl leading-relaxed" style="color: var(--muted)"><MathText :text="lesson.summary" /></p>
      </div>
      <div>
        <p class="label mb-1.5">Explain it at</p>
        <div class="flex gap-1 rounded-xl p-1" style="background: var(--sunken)">
          <button
            v-for="l in levels"
            :key="l"
            class="rounded-lg px-2.5 py-1 text-xs capitalize transition-colors"
            :style="level === l ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
            @click="level = l"
          >
            {{ l.replace('-', ' ') }}
          </button>
        </div>
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section class="surface overflow-hidden">
        <component :is="viz" v-if="viz" :params="params" :options="lesson.visualization.options" @set="setParam" />
        <p v-if="!viz" class="p-6" style="color: var(--muted)">No visualization registered for “{{ lesson.visualization.type }}”.</p>
      </section>

      <aside class="surface space-y-6 self-start p-5 lg:sticky lg:top-20 lg:row-span-2">
        <div>
          <p class="label mb-2">Equation</p>
          <div class="text-xl"><Katex :tex="lesson.equation" display /></div>
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="label">Manipulate</p>
            <button class="text-xs underline-offset-2 hover:underline" style="color: var(--muted)" @click="reset">reset</button>
          </div>
          <div class="space-y-3">
            <ParamSlider v-for="(spec, name) in lesson.parameters" :key="name" :name="name" :spec="spec" :value="params[name]" @set="setParam" />
          </div>
          <p class="mt-2 text-xs" style="color: var(--muted)">You can also drag directly on the visualization.</p>
        </div>

        <div>
          <p class="label mb-2">Variables</p>
          <dl class="space-y-1 text-sm">
            <div v-for="v in lesson.variables" :key="v.symbol" class="flex gap-3">
              <dt class="w-14 shrink-0"><Katex :tex="v.symbol" /></dt>
              <dd style="color: var(--muted)"><MathText :text="v.meaning" /></dd>
            </div>
          </dl>
        </div>
      </aside>

      <section v-if="lesson.charts?.length" class="surface overflow-hidden [&>figure:first-child]:border-t-0">
        <ParamChart v-for="c in lesson.charts" :key="c.title" :spec="c" :params="params" />
      </section>
    </div>

    <div class="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
      <section>
        <div class="mb-3 flex items-center gap-4">
          <h2 class="label">What it means</h2>
          <div class="flex gap-1 rounded-lg p-0.5 text-xs" style="background: var(--sunken)">
            <button
              v-for="m in ['intuition', 'formal'] as const"
              :key="m"
              class="rounded-md px-3 py-1 capitalize transition-colors"
              :style="mode === m ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
              @click="mode = m"
            >
              {{ m }}
            </button>
          </div>
        </div>
        <div class="space-y-3 leading-relaxed">
          <p v-for="(t, i) in lesson.explanation[mode]" :key="mode + i"><MathText :text="t" /></p>
          <template v-if="rigorous && mode === 'formal'">
            <p v-for="(t, i) in lesson.explanation.advanced ?? []" :key="'adv' + i" class="border-l-2 pl-3" style="border-color: var(--accent)"><MathText :text="t" /></p>
          </template>
        </div>
      </section>

      <section v-if="lesson.derivation.length">
        <h2 class="label mb-3">{{ lesson.derivationTitle ?? 'Derivation' }}</h2>
        <ol class="space-y-4">
          <li v-for="(s, i) in lesson.derivation" :key="i" class="flex gap-4">
            <span class="num pt-1 text-xs" style="color: var(--muted)">{{ i + 1 }}</span>
            <div class="min-w-0">
              <div class="overflow-x-auto"><Katex :tex="s.tex" display /></div>
              <p class="mt-1 text-sm" style="color: var(--muted)"><MathText :text="s.note" /></p>
            </div>
          </li>
        </ol>
      </section>

      <section v-if="lesson.realWorld.length">
        <h2 class="label mb-3">Where is this used?</h2>
        <ul class="divide-y" style="border-color: var(--line)">
          <li v-for="r in lesson.realWorld" :key="r.title" class="py-3 first:pt-0" style="border-color: var(--line)">
            <p class="font-medium">{{ r.title }}</p>
            <p class="text-sm" style="color: var(--muted)">{{ r.text }}</p>
          </li>
        </ul>
      </section>

      <section class="space-y-6">
        <div v-if="lesson.prerequisites.length">
          <h2 class="label mb-2">Know these first</h2>
          <ul class="space-y-1 text-sm">
            <li v-for="p in linked(lesson.prerequisites)" :key="p.id">
              <RouterLink v-if="p.lesson" :to="`/lesson/${p.id}`" class="hover:underline" style="color: var(--accent)">← {{ p.lesson.title }}</RouterLink>
              <span v-else style="color: var(--muted)">{{ p.id }} (coming soon)</span>
            </li>
          </ul>
        </div>
        <div v-if="lesson.related.length">
          <h2 class="label mb-2">Where to go next</h2>
          <ul class="space-y-1 text-sm">
            <li v-for="p in linked(lesson.related)" :key="p.id">
              <RouterLink v-if="p.lesson" :to="`/lesson/${p.id}`" class="hover:underline" style="color: var(--accent)">{{ p.lesson.title }} →</RouterLink>
              <span v-else style="color: var(--muted)">{{ p.id }} (coming soon)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <nav v-if="neighbours" class="mt-14 grid gap-4 sm:grid-cols-2">
      <RouterLink v-if="neighbours.prev" :to="`/lesson/${neighbours.prev.id}`" class="surface lift p-4">
        <p class="label">← Previous</p>
        <p class="mt-1 font-medium">{{ neighbours.prev.title }}</p>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="neighbours.next" :to="`/lesson/${neighbours.next.id}`" class="surface lift p-4 text-right">
        <p class="label">Next →</p>
        <p class="mt-1 font-medium">{{ neighbours.next.title }}</p>
      </RouterLink>
    </nav>
  </article>
</template>
