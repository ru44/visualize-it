<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLesson, subjectLabels } from '../lessons'
import { buildAdhoc } from '../engine/adhoc'
import { vizRegistry } from '../viz/registry'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import ParamSlider from '../components/ParamSlider.vue'

const props = defineProps<{ id?: string }>()
const route = useRoute()
const query = computed(() => String(route.query.q ?? ''))
const lesson = computed(() => (props.id ? getLesson(props.id) : buildAdhoc(query.value)))
const viz = computed(() => lesson.value && vizRegistry[lesson.value.visualization.type])

const params = reactive<Record<string, number>>({})
const mode = ref<'intuition' | 'formal'>('intuition')

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

const linked = (ids: string[]) => ids.map((id) => ({ id, lesson: getLesson(id) }))
</script>

<template>
  <div v-if="!lesson" class="mx-auto max-w-2xl p-10" style="color: var(--muted)">
    <template v-if="id">Lesson not found.</template>
    <template v-else>
      Couldn’t turn “{{ query }}” into a visualization yet. Try a function of x such as <span class="num">x^3 - 3x</span>, a limit
      <span class="num">lim(x→0) sin(x)/x</span>, or an integral <span class="num">∫₀⁴ x² dx</span>.
    </template>
    <RouterLink to="/" class="mt-4 block underline">Back to the explorer</RouterLink>
  </div>
  <article v-else class="mx-auto max-w-7xl px-4 py-6 lg:px-8">
    <header class="mb-5">
      <p class="label">{{ subjectLabels[lesson.subject] }} · {{ lesson.difficulty }}</p>
      <h1 class="mt-1 text-2xl font-semibold tracking-tight">{{ lesson.title }}</h1>
      <p class="mt-1 max-w-2xl" style="color: var(--muted)">{{ lesson.summary }}</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section class="overflow-hidden rounded-lg border" style="border-color: var(--line); background: var(--panel)">
        <component :is="viz" v-if="viz" :params="params" :options="lesson.visualization.options" @set="setParam" />
        <p v-else class="p-6" style="color: var(--muted)">No visualization registered for “{{ lesson.visualization.type }}”.</p>
      </section>

      <aside class="space-y-6">
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
              <dd style="color: var(--muted)">{{ v.meaning }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>

    <div class="mt-10 grid gap-10 lg:grid-cols-2">
      <section>
        <div class="mb-3 flex items-center gap-4">
          <h2 class="label">What it means</h2>
          <div class="flex rounded-md border text-xs" style="border-color: var(--line)">
            <button
              v-for="m in ['intuition', 'formal'] as const"
              :key="m"
              class="px-3 py-1 capitalize"
              :style="mode === m ? 'background: var(--fg); color: var(--bg)' : 'color: var(--muted)'"
              @click="mode = m"
            >
              {{ m }}
            </button>
          </div>
        </div>
        <div class="space-y-3 leading-relaxed">
          <p v-for="(t, i) in lesson.explanation[mode]" :key="mode + i"><MathText :text="t" /></p>
        </div>
      </section>

      <section v-if="lesson.derivation.length">
        <h2 class="label mb-3">Derivation</h2>
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
  </article>
</template>
