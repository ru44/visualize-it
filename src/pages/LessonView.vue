<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, reactive, ref, watch } from 'vue'
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
import Scene3D from '../components/Scene3D.vue'
import VideoList from '../components/VideoList.vue'
import { notation, displayTex } from '../lessons/notation'
import { useSettings, levels } from '../stores/settings'
import { useProgress } from '../stores/progress'
import { storeToRefs } from 'pinia'

const settings = useSettings()
const { level, view3d, guided } = storeToRefs(settings)
// Guided view: the picture, one slider, concrete steps, then explanations revealed one at a time.
const primaryParam = computed(() => lesson.value?.primary ?? Object.keys(lesson.value?.parameters ?? {})[0])
const revealed = ref(0)
const showMaths = ref(false)
watch(() => [props.id, query.value], () => ((revealed.value = 0), (showMaths.value = false)))
const tryIt = computed(() => (lesson.value?.tryIt.length ? lesson.value.tryIt : lesson.value ? [lesson.value.explanation.intuition[0]] : []))
const doneSteps = reactive(new Set<number>())
watch(() => props.id, () => doneSteps.clear())
const has3d = computed(() => !!lesson.value?.visualization3d)
const show3d = computed(() => has3d.value && view3d.value)
const progress = useProgress()

const ParamChart = defineAsyncComponent(() => import('../components/ParamChart.vue'))

const props = defineProps<{ id?: string }>()
const route = useRoute()
const query = computed(() => String(route.query.q ?? ''))
const base = computed(() => (props.id ? getLesson(props.id) : buildAdhoc(query.value)))
const lesson = computed(() => base.value && localize(base.value))
const viz = computed(() => lesson.value && vizRegistry[lesson.value.visualization.type])

const params = reactive<Record<string, number>>({})
// Each level shows a different mix:  beginner → simple text only · high school → simple + formal ·
// university → formal + rigorous note (simple folded) · advanced → rigorous note first, derivation open.
const beginner = computed(() => level.value === 'beginner')
const rigorous = computed(() => level.value === 'university' || level.value === 'advanced')
const showIntuition = computed(() => level.value !== 'advanced')
const showFormal = computed(() => level.value !== 'beginner')
const explain = ref<HTMLElement>()
watch(level, async () => {
  await nextTick()
  explain.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

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
const glossary = computed(() => (lesson.value?.symbols ?? []).map((tok) => ({ tok, e: notation.value[tok] })).filter((x) => x.e))
const badge = { exact: 'var(--pos)', numeric: 'var(--accent)', warning: 'var(--accent-2)' }
</script>

<template>
  <div v-if="!lesson" class="mx-auto max-w-2xl p-8 sm:p-10">
    <p style="color: var(--muted)">{{ id ? t('lesson.notFound') : t('lesson.cantRead', { q: query }) }}</p>
    <ExplorerInput v-if="!id" class="mt-6" :initial="query" chips />
    <RouterLink to="/" class="mt-6 block underline">{{ t('lesson.backHome') }}</RouterLink>
  </div>

  <article v-else-if="guided && id" class="mx-auto max-w-4xl px-4 py-6 lg:px-8">
    <header class="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="label"><RouterLink :to="`/subject/${lesson.subject}`" class="hover:text-[var(--fg)]"><span class="inline-block rtl:-scale-x-100">←</span> {{ t(`subject.${lesson.subject}` as Key) }}</RouterLink></p>
        <h1 class="mt-1 text-3xl font-semibold tracking-tight">{{ lesson.title }}</h1>
        <p class="mt-1 max-w-2xl text-lg leading-relaxed" style="color: var(--muted)"><MathText :text="lesson.summary" /></p>
      </div>
      <button class="rounded-[10px] border px-3 py-1.5 text-xs" style="border-color: var(--line); color: var(--muted)" @click="guided = false">{{ t('guided.full') }}</button>
    </header>

    <section class="surface overflow-hidden">
      <div v-if="has3d" class="flex items-center justify-end gap-2 border-b px-3 py-1.5" style="border-color: var(--line)">
        <div class="flex gap-0.5 rounded-lg p-0.5 text-xs" style="background: var(--sunken)">
          <button v-for="m in [false, true]" :key="String(m)" class="rounded-md px-2.5 py-1" :style="view3d === m ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'" @click="view3d = m">{{ m ? '3D' : '2D' }}</button>
        </div>
      </div>
      <Scene3D v-if="show3d" :type="lesson.visualization3d!.type" :options="lesson.visualization3d!.options" :params="params" @set="setParam" />
      <component :is="viz" v-else-if="viz" :params="params" :options="lesson.visualization.options" @set="setParam" />
      <div v-if="primaryParam && lesson.parameters[primaryParam]" class="border-t px-5 py-4" style="border-color: var(--line)">
        <ParamSlider :name="primaryParam" :spec="lesson.parameters[primaryParam]" :value="params[primaryParam]" @set="setParam" />
        <details v-if="Object.keys(lesson.parameters).length > 1" class="mt-3">
          <summary class="label flex items-center gap-1.5"><span class="chev">▸</span>{{ t('guided.moreSliders', { n: Object.keys(lesson.parameters).length - 1 }) }}</summary>
          <div class="mt-3 space-y-3">
            <ParamSlider v-for="(spec, name) in lesson.parameters" v-show="name !== primaryParam" :key="name" :name="name" :spec="spec" :value="params[name]" @set="setParam" />
          </div>
        </details>
      </div>
    </section>

    <section class="surface mt-5 p-5">
      <h2 class="text-lg font-semibold tracking-tight">{{ t('guided.tryTitle') }}</h2>
      <ol class="mt-3 space-y-2.5">
        <li v-for="(step, i) in tryIt" :key="i" class="flex cursor-pointer items-start gap-3 text-[17px] leading-relaxed" @click="doneSteps.has(i) ? doneSteps.delete(i) : doneSteps.add(i)">
          <span class="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs" :style="doneSteps.has(i) ? 'background: var(--pos); border-color: var(--pos); color: #fff' : 'border-color: var(--line); color: var(--muted)'">{{ doneSteps.has(i) ? '✓' : i + 1 }}</span>
          <span :style="doneSteps.has(i) ? 'color: var(--muted)' : ''"><MathText :text="step" /></span>
        </li>
      </ol>
    </section>

    <section class="mt-5">
      <button v-if="revealed < lesson.explanation.intuition.length" class="btn-primary w-full px-5 py-3 text-base" @click="revealed++">{{ revealed === 0 ? t('guided.why') : t('guided.more') }}</button>
      <div v-if="revealed" class="surface mt-3 space-y-4 p-5 text-[17px] leading-relaxed">
        <p v-for="(tx, i) in lesson.explanation.intuition.slice(0, revealed)" :key="i"><MathText :text="tx" /></p>
        <div v-if="revealed >= lesson.explanation.intuition.length" class="flex flex-wrap gap-2 pt-1">
          <button class="rounded-[10px] border px-4 py-2 text-sm" style="border-color: var(--line)" @click="showMaths = !showMaths">{{ showMaths ? t('guided.hideMaths') : t('guided.showMaths') }}</button>
          <button class="rounded-[10px] border px-4 py-2 text-sm font-medium transition-colors" :style="progress.isDone(id) ? 'background: var(--pos); border-color: var(--pos); color: #fff' : 'border-color: var(--line)'" @click="progress.toggle(id)">{{ progress.isDone(id) ? t('progress.undo') : t('progress.markDone') }}</button>
        </div>
      </div>
      <div v-if="showMaths" class="surface mt-3 space-y-5 p-5">
        <div><p class="label mb-2">{{ t('lesson.equation') }}</p><div class="overflow-x-auto text-lg"><Katex :tex="lesson.equation" display /></div></div>
        <div>
          <p class="label mb-2">{{ t('lesson.variables') }}</p>
          <dl class="space-y-1.5 text-sm">
            <div v-for="v in lesson.variables" :key="v.symbol" class="flex gap-3"><dt class="w-16 shrink-0"><Katex :tex="v.symbol" /></dt><dd><MathText :text="v.meaning" /></dd></div>
            <div v-for="g in glossary" :key="g.tok" class="flex gap-3"><dt class="w-16 shrink-0"><Katex :tex="displayTex(g.tok)" /></dt><dd style="color: var(--muted)"><span style="color: var(--fg)">{{ g.e.name }}</span>. <MathText :text="g.e.simple" /></dd></div>
          </dl>
        </div>
        <div><p class="label mb-2">{{ t('lesson.formal') }}</p><p v-for="(tx, i) in lesson.explanation.formal" :key="i" class="mt-2 leading-relaxed"><MathText :text="tx" /></p></div>
        <div v-if="lesson.derivation.length">
          <p class="label mb-2">{{ lesson.derivationTitle ?? t('lesson.derivation') }}</p>
          <ol class="space-y-3"><li v-for="(st, i) in lesson.derivation" :key="i" class="flex gap-3"><span class="num pt-1 text-xs" style="color: var(--muted)">{{ i + 1 }}</span><div class="min-w-0 flex-1"><div class="overflow-x-auto"><Katex :tex="st.tex" display /></div><p class="mt-1 text-sm" style="color: var(--muted)"><MathText :text="st.note" /></p></div></li></ol>
        </div>
        <RouterLink to="/notation" class="block text-xs underline" style="color: var(--accent)">{{ t('lesson.notationLink') }}</RouterLink>
      </div>
    </section>

    <section v-if="lesson.realWorld.length && revealed >= lesson.explanation.intuition.length" class="mt-6">
      <h2 class="mb-2 text-lg font-semibold tracking-tight">{{ t('lesson.realWorld') }}</h2>
      <ul class="divide-y" style="border-color: var(--line)"><li v-for="rw in lesson.realWorld" :key="rw.title" class="py-3 first:pt-0" style="border-color: var(--line)"><p class="font-medium">{{ rw.title }}</p><p class="text-sm leading-relaxed" style="color: var(--muted)"><MathText :text="rw.text" /></p></li></ul>
    </section>

    <nav v-if="neighbours && (neighbours.prev || neighbours.next)" class="mt-10 grid gap-4 sm:grid-cols-2">
      <RouterLink v-if="neighbours.prev" :to="`/lesson/${neighbours.prev.id}`" class="surface lift p-4"><p class="label">{{ t('lesson.prev') }}</p><p class="mt-1 font-medium">{{ neighbours.prev.title }}</p></RouterLink>
      <span v-else />
      <RouterLink v-if="neighbours.next" :to="`/lesson/${neighbours.next.id}`" class="surface lift p-4 text-end" style="border-color: var(--accent)"><p class="label" style="color: var(--accent)">{{ t('lesson.nextLesson') }}</p><p class="mt-1 font-medium">{{ neighbours.next.title }}</p></RouterLink>
    </nav>
  </article>

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
      <div class="flex flex-wrap items-end gap-3">
        <button v-if="id" class="rounded-[10px] border px-3 py-2 text-sm" style="border-color: var(--line); color: var(--muted)" @click="guided = true">{{ t('guided.simple') }}</button>
        <button
          v-if="id"
          class="rounded-[10px] border px-4 py-2 text-sm font-medium transition-colors"
          :style="progress.isDone(id) ? 'background: var(--pos); border-color: var(--pos); color: #fff' : 'border-color: var(--line)'"
          @click="progress.toggle(id)"
        >
          {{ progress.isDone(id) ? t('progress.undo') : t('progress.markDone') }}
        </button>
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
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section class="surface relative overflow-hidden">
        <div v-if="has3d" class="flex items-center justify-end gap-2 border-b px-3 py-1.5" style="border-color: var(--line)">
          <span class="label">{{ t('three.view') }}</span>
          <div class="flex gap-0.5 rounded-lg p-0.5 text-xs" style="background: var(--sunken)">
            <button v-for="m in [false, true]" :key="String(m)" class="rounded-md px-2.5 py-1" :style="view3d === m ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'" @click="view3d = m">{{ m ? '3D' : '2D' }}</button>
          </div>
        </div>
        <Scene3D v-if="show3d" :type="lesson.visualization3d!.type" :options="lesson.visualization3d!.options" :params="params" @set="setParam" />
        <component :is="viz" v-else-if="viz" :params="params" :options="lesson.visualization.options" @set="setParam" />
        <p v-if="has3d && settings.isPhone && !view3d" class="border-t px-4 py-2 text-xs" style="border-color: var(--line); color: var(--muted)">{{ t('three.phone') }}</p>
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
          <div class="overflow-x-auto" :class="lesson.equation.length > 45 ? 'text-base' : 'text-xl'"><Katex :tex="lesson.equation" display /></div>
        </div>

        <div v-if="lesson.checks?.length" class="rounded-xl p-3.5" style="background: var(--sunken)">
          <p class="label mb-2">{{ t('lesson.trust') }}</p>
          <p v-for="(c, i) in lesson.checks" :key="i" class="text-sm leading-relaxed">
            <span class="me-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium" :style="{ color: badge[c.status], border: `1px solid ${badge[c.status]}` }">{{ t(`trust.${c.status}` as Key) }}</span>
            <MathText :text="c.text" />
          </p>
        </div>

        <details :open="showFormal">
          <summary class="label flex items-center gap-1.5"><span class="chev">▸</span>{{ t('lesson.variables') }}</summary>
          <dl class="mt-2 space-y-1.5 text-sm">
            <div v-for="v in lesson.variables" :key="v.symbol" class="flex gap-3">
              <dt class="w-16 shrink-0"><Katex :tex="v.symbol" /></dt>
              <dd><MathText :text="v.meaning" /></dd>
            </div>
          </dl>
          <template v-if="glossary.length">
            <p class="label mt-4 mb-1.5">{{ t('lesson.alsoInFormulas') }}</p>
            <dl class="space-y-1.5 text-sm">
              <div v-for="g in glossary" :key="g.tok" class="flex gap-3">
                <dt class="w-16 shrink-0"><Katex :tex="displayTex(g.tok)" /></dt>
                <dd style="color: var(--muted)"><span class="font-medium" style="color: var(--fg)">{{ g.e.name }}</span><span v-if="g.e.read"> ({{ g.e.read }})</span>. <MathText :text="g.e.simple" /><RouterLink v-if="g.e.lesson && g.e.lesson !== id" :to="`/lesson/${g.e.lesson}`" class="ms-1 underline" style="color: var(--accent)">{{ t('lesson.learnSymbol') }}</RouterLink></dd>
              </div>
            </dl>
          </template>
          <RouterLink to="/notation" class="mt-3 block text-xs underline" style="color: var(--accent)">{{ t('lesson.notationLink') }}</RouterLink>
        </details>
      </aside>

      <section v-if="lesson.charts?.length" class="surface overflow-hidden [&>figure:first-child]:border-t-0">
        <ParamChart v-for="c in lesson.charts" :key="c.title" :spec="c" :params="params" />
      </section>
    </div>

    <div class="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
      <section ref="explain" class="scroll-mt-20">
        <div class="mb-3 flex flex-wrap items-center gap-3">
          <h2 class="text-xl font-semibold tracking-tight">{{ t('lesson.meaning') }}</h2>
          <span class="rounded-full px-2.5 py-0.5 text-xs" style="background: var(--accent-soft); color: var(--accent)">{{ t(`level.${level}` as Key) }}</span>
        </div>
        <div class="space-y-4 text-[17px] leading-relaxed">
          <template v-if="rigorous">
            <p v-for="(tx, i) in lesson.explanation.advanced ?? []" :key="'adv' + i" class="rounded-xl p-4" style="background: var(--sunken)"><span class="label me-2">{{ t('lesson.rigour') }}</span><MathText :text="tx" /></p>
          </template>
          <template v-if="showFormal">
            <p v-if="!beginner && showIntuition" class="label">{{ t('lesson.formal') }}</p>
            <p v-for="(tx, i) in lesson.explanation.formal" :key="'f' + i"><MathText :text="tx" /></p>
          </template>
          <template v-if="showIntuition">
            <details v-if="rigorous" class="rounded-xl border p-3" style="border-color: var(--line)">
              <summary class="label flex items-center gap-1.5"><span class="chev">▸</span>{{ t('lesson.simpleVersion') }}</summary>
              <p v-for="(tx, i) in lesson.explanation.intuition" :key="'i' + i" class="mt-2"><MathText :text="tx" /></p>
            </details>
            <template v-else>
              <p v-if="showFormal" class="label">{{ t('lesson.intuition') }}</p>
              <p v-for="(tx, i) in lesson.explanation.intuition" :key="'i' + i"><MathText :text="tx" /></p>
            </template>
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
        <details :open="rigorous || !!lesson.derivationTitle" class="surface p-4 sm:p-5">
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

    <VideoList v-if="id" class="mt-12" :videos="lesson.videos ?? []" :search-query="`${lesson.title} ${t('videos.explained')}`" />

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
