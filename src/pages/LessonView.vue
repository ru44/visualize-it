<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLesson, lessons } from '../lessons'
import { localize, hasTranslation } from '../lessons/localize'
import { buildAdhoc } from '../engine/adhoc'
import { vizRegistry } from '../viz/registry'
import { t, type Key } from '../i18n'
import Katex from '../components/Katex.vue'
import MathText from '../components/MathText.vue'
import ParamSlider from '../components/ParamSlider.vue'
import ExplorerInput from '../components/ExplorerInput.vue'
import { level, levels } from '../composables/useLevel'

const ParamChart = defineAsyncComponent(() => import('../components/ParamChart.vue'))

const props = defineProps<{ id?: string }>()
const route = useRoute()
const query = computed(() => String(route.query.q ?? ''))
const base = computed(() => (props.id ? getLesson(props.id) : buildAdhoc(query.value)))
const lesson = computed(() => base.value && localize(base.value))
const viz = computed(() => lesson.value && vizRegistry[lesson.value.visualization.type])

const params = reactive<Record<string, number>>({})
const rigorous = computed(() => level.value === 'university' || level.value === 'advanced')
const beginner = computed(() => level.value === 'beginner')
const mode = ref<'intuition' | 'formal'>(rigorous.value ? 'formal' : 'intuition')
watch(level, () => (mode.value = rigorous.value ? 'formal' : 'intuition'))

function reset() {
  for (const k of Object.keys(params)) delete params[k]
  for (const [k, spec] of Object.entries(base.value?.parameters ?? {})) params[k] = spec.value
}
// Reset only when the lesson itself changes — not when its text is re-translated.
watch(() => [props.id, query.value], reset, { immediate: true })

function setParam(name: string, value: number) {
  const spec = base.value?.parameters[name]
  if (!spec) return
  const snapped = Math.round(value / spec.step) * spec.step
  params[name] = Math.min(spec.max, Math.max(spec.min, +snapped.toFixed(6)))
}

watch(lesson, (l) => (document.title = l ? `${l.title} — Visualize It` : 'Visualize It'), { immediate: true })

const neighbours = computed(() => {
  const i = lessons.findIndex((l) => l.id === props.id)
  if (i < 0) return null
  const same = (l?: (typeof lessons)[number]) => (l && l.subject === lessons[i].subject ? localize(l) : undefined)
  return { prev: same(lessons[i - 1]), next: same(lessons[i + 1]) }
})
const linked = (ids: string[]) => ids.map((id) => ({ id, lesson: getLesson(id) && localize(getLesson(id)!) }))
const badge = { exact: 'var(--pos)', numeric: 'var(--accent)', warning: 'var(--accent-2)' }
</script>

<template>
  <div v-if="!lesson" class="mx-auto max-w-2xl p-8 sm:p-10">
    <p style="color: var(--muted)">{{ id ? t('lesson.notFound') : t('lesson.cantRead', { q: query }) }}</p>
    <ExplorerInput v-if="!id" class="mt-6" :initial="query" chips />
    <RouterLink to="/" class="mt-6 block underline">{{ t('lesson.backHome') }}</RouterLink>
  </div>

  <article v-else class="mx-auto max-w-6xl px-4 py-6 lg:px-8">
    <ExplorerInput v-if="!id" class="mb-6 max-w-2xl" :initial="query" />

    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div class="min-w-0">
        <p class="label flex items-center gap-2">
          <RouterLink :to="`/subject/${lesson.subject}`" class="hover:text-[var(--fg)]"><span class="inline-block rtl:-scale-x-100">←</span> {{ t(`subject.${lesson.subject}` as Key) }}</RouterLink>
        </p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight">{{ lesson.title }}</h1>
        <p class="mt-1.5 max-w-2xl text-lg leading-relaxed" style="color: var(--muted)"><MathText :text="lesson.summary" /></p>
        <p v-if="id && !hasTranslation(id)" class="mt-2 text-sm" style="color: var(--accent-2)">{{ t('lesson.translating') }}</p>
      </div>
      <div>
        <p class="label mb-1.5">{{ t('lesson.level') }}</p>
        <div class="flex flex-wrap gap-1 rounded-xl p-1" style="background: var(--sunken)">
          <button
            v-for="l in levels"
            :key="l"
            class="rounded-lg px-2.5 py-1 text-xs transition-colors"
            :style="level === l ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
            @click="level = l"
          >
            {{ t(`level.${l}` as Key) }}
          </button>
        </div>
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section class="surface overflow-hidden">
        <component :is="viz" v-if="viz" :params="params" :options="lesson.visualization.options" @set="setParam" />
      </section>

      <aside class="surface space-y-6 self-start p-5 lg:sticky lg:top-20 lg:row-span-2">
        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="label">{{ t('lesson.controls') }}</p>
            <button class="text-xs underline-offset-2 hover:underline" style="color: var(--muted)" @click="reset">{{ t('lesson.reset') }}</button>
          </div>
          <div class="space-y-3">
            <ParamSlider v-for="(spec, name) in lesson.parameters" :key="name" :name="name" :spec="spec" :value="params[name]" @set="setParam" />
          </div>
          <p class="mt-2 text-xs" style="color: var(--muted)">{{ t('lesson.dragHint') }}</p>
        </div>

        <div>
          <p class="label mb-2">{{ t('lesson.equation') }}</p>
          <div class="overflow-x-auto text-xl"><Katex :tex="lesson.equation" display /></div>
        </div>

        <div v-if="lesson.checks?.length" class="rounded-xl p-3.5" style="background: var(--sunken)">
          <p class="label mb-2">{{ t('lesson.trust') }}</p>
          <p v-for="(c, i) in lesson.checks" :key="i" class="text-sm leading-relaxed">
            <span class="me-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium" :style="{ color: badge[c.status], border: `1px solid ${badge[c.status]}` }">{{ t(`trust.${c.status}` as Key) }}</span>
            <MathText :text="c.text" />
          </p>
        </div>

        <details :open="!beginner">
          <summary class="label flex items-center gap-1.5"><span class="chev">▸</span>{{ t('lesson.variables') }}</summary>
          <dl class="mt-2 space-y-1 text-sm">
            <div v-for="v in lesson.variables" :key="v.symbol" class="flex gap-3">
              <dt class="w-14 shrink-0"><Katex :tex="v.symbol" /></dt>
              <dd style="color: var(--muted)"><MathText :text="v.meaning" /></dd>
            </div>
          </dl>
        </details>
      </aside>

      <section v-if="lesson.charts?.length" class="surface overflow-hidden [&>figure:first-child]:border-t-0">
        <ParamChart v-for="c in lesson.charts" :key="c.title" :spec="c" :params="params" />
      </section>
    </div>

    <div class="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
      <section>
        <div class="mb-3 flex items-center gap-4">
          <h2 class="text-xl font-semibold tracking-tight">{{ t('lesson.meaning') }}</h2>
          <div v-if="!beginner" class="flex gap-1 rounded-lg p-0.5 text-xs" style="background: var(--sunken)">
            <button
              v-for="m in ['intuition', 'formal'] as const"
              :key="m"
              class="rounded-md px-3 py-1 transition-colors"
              :style="mode === m ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
              @click="mode = m"
            >
              {{ t(`lesson.${m}` as Key) }}
            </button>
          </div>
        </div>
        <div class="space-y-3 text-[17px] leading-relaxed">
          <p v-for="(tx, i) in lesson.explanation[mode]" :key="mode + i"><MathText :text="tx" /></p>
          <template v-if="rigorous && mode === 'formal'">
            <p v-for="(tx, i) in lesson.explanation.advanced ?? []" :key="'adv' + i" class="border-s-2 ps-3" style="border-color: var(--accent)"><MathText :text="tx" /></p>
          </template>
        </div>
      </section>

      <section v-if="lesson.realWorld.length">
        <h2 class="mb-3 text-xl font-semibold tracking-tight">{{ t('lesson.realWorld') }}</h2>
        <ul class="divide-y" style="border-color: var(--line)">
          <li v-for="rw in lesson.realWorld" :key="rw.title" class="py-3 first:pt-0" style="border-color: var(--line)">
            <p class="font-medium">{{ rw.title }}</p>
            <p class="text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="rw.text" /></p>
          </li>
        </ul>
      </section>

      <section v-if="lesson.derivation.length" :class="lesson.derivationTitle ? 'lg:order-first' : ''">
        <details :open="!beginner || !!lesson.derivationTitle" class="surface p-4 sm:p-5">
          <summary class="flex items-center gap-2 text-lg font-semibold tracking-tight"><span class="chev text-sm" style="color: var(--muted)">▸</span>{{ lesson.derivationTitle ?? t('lesson.derivation') }}</summary>
          <ol class="mt-4 space-y-4">
            <li v-for="(s, i) in lesson.derivation" :key="i" class="flex gap-4">
              <span class="num pt-1 text-xs" style="color: var(--muted)">{{ i + 1 }}</span>
              <div class="min-w-0 flex-1">
                <div class="overflow-x-auto"><Katex :tex="s.tex" display /></div>
                <p class="mt-1 text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="s.note" /></p>
              </div>
            </li>
          </ol>
        </details>
      </section>

      <section class="space-y-6">
        <div v-if="lesson.prerequisites.length">
          <h2 class="label mb-2">{{ t('lesson.before') }}</h2>
          <ul class="space-y-1 text-sm">
            <li v-for="p in linked(lesson.prerequisites)" :key="p.id">
              <RouterLink v-if="p.lesson" :to="`/lesson/${p.id}`" class="hover:underline" style="color: var(--accent)">{{ p.lesson.title }}</RouterLink>
              <span v-else style="color: var(--muted)">{{ p.id }} ({{ t('lesson.soon') }})</span>
            </li>
          </ul>
        </div>
        <div v-if="lesson.related.length">
          <h2 class="label mb-2">{{ t('lesson.next') }}</h2>
          <ul class="space-y-1 text-sm">
            <li v-for="p in linked(lesson.related)" :key="p.id">
              <RouterLink v-if="p.lesson" :to="`/lesson/${p.id}`" class="hover:underline" style="color: var(--accent)">{{ p.lesson.title }}</RouterLink>
              <span v-else style="color: var(--muted)">{{ p.id }} ({{ t('lesson.soon') }})</span>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <nav v-if="neighbours && (neighbours.prev || neighbours.next)" class="mt-14 grid gap-4 sm:grid-cols-2">
      <RouterLink v-if="neighbours.prev" :to="`/lesson/${neighbours.prev.id}`" class="surface lift p-4">
        <p class="label">{{ t('lesson.prev') }}</p>
        <p class="mt-1 font-medium">{{ neighbours.prev.title }}</p>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="neighbours.next" :to="`/lesson/${neighbours.next.id}`" class="surface lift p-4 text-end" style="border-color: var(--accent)">
        <p class="label" style="color: var(--accent)">{{ t('lesson.nextLesson') }}</p>
        <p class="mt-1 font-medium">{{ neighbours.next.title }}</p>
      </RouterLink>
    </nav>
  </article>
</template>
