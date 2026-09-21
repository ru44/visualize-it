<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { getClassic, classicText, classicSims } from '../classic'
import { t, type Key } from '../i18n'

const props = defineProps<{ id: string }>()
const sim = computed(() => getClassic(props.id))
const text = computed(() => sim.value && classicText(sim.value))
const page = ref(0)
watch(() => props.id, () => ((page.value = 0), (height.value = 720), (ready.value = false)))
watchEffect(() => (document.title = `${text.value?.title ?? ''} — Visualize It`))

const frame = ref<HTMLIFrameElement>()
const height = ref(720)
const ready = ref(false)

// The simulation runs in its own frame (its code relies on globals), but it follows our theme and
// tells us how tall it is, so it reads as part of this page.
const VARS = ['--bg', '--panel', '--sunken', '--fg', '--muted', '--line', '--accent', '--accent-2']
function sendTheme() {
  const cs = getComputedStyle(document.documentElement)
  const vars = Object.fromEntries(VARS.map((v) => [v, cs.getPropertyValue(v).trim()]))
  frame.value?.contentWindow?.postMessage({ type: 'vi-theme', vars }, location.origin)
}
function onMessage(e: MessageEvent) {
  if (e.origin !== location.origin || e.source !== frame.value?.contentWindow) return
  if (e.data?.type === 'vi-height') height.value = Math.max(400, Math.ceil(e.data.height) + 8)
  if (e.data?.type === 'vi-ready') (ready.value = true), sendTheme()
}
const observer = new MutationObserver(sendTheme)
onMounted(() => {
  window.addEventListener('message', onMessage)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  observer.disconnect()
})

const neighbours = computed(() => {
  const i = classicSims.findIndex((s) => s.id === props.id)
  return { prev: classicSims[i - 1], next: classicSims[i + 1] }
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-6 lg:px-8">
    <RouterLink to="/classic" class="label hover:text-[var(--fg)]"><span class="inline-block rtl:-scale-x-100">←</span> {{ t('classic.title') }}</RouterLink>
    <p v-if="!sim || !text" class="mt-8" style="color: var(--muted)">{{ t('lesson.notFound') }}</p>
    <template v-else>
      <header class="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div class="min-w-0">
          <h1 class="text-3xl font-semibold tracking-tight">{{ text.title }}</h1>
          <p class="mt-1.5 max-w-2xl leading-relaxed" style="color: var(--muted)">{{ text.description }}</p>
        </div>
        <span class="label">{{ t(`classic.cat.${sim.category}` as Key) }}</span>
      </header>

      <div v-if="sim.pages.length > 1" class="mt-4 flex gap-1 rounded-xl p-1" style="background: var(--sunken); width: fit-content">
        <button
          v-for="(p, i) in sim.pages"
          :key="p.path"
          class="rounded-lg px-3 py-1.5 text-sm"
          :style="page === i ? 'background: var(--panel); color: var(--fg); box-shadow: 0 1px 2px rgb(0 0 0 / .12)' : 'color: var(--muted)'"
          @click="((page = i), (ready = false))"
        >
          {{ p.label }}
        </button>
      </div>

      <section class="surface relative mt-5 overflow-hidden">
        <p v-if="!ready" class="absolute inset-x-0 top-10 text-center text-sm" style="color: var(--muted)">{{ t('classic.loading') }}</p>
        <iframe
          ref="frame"
          :key="sim.pages[page].path"
          :src="`./legacy/${sim.pages[page].path}`"
          :title="text.title"
          class="block w-full transition-opacity"
          :style="{ height: `${height}px`, opacity: ready ? 1 : 0 }"
          loading="eager"
        />
      </section>
      <p class="mt-3 text-xs" style="color: var(--muted)">{{ t('classic.credit') }}</p>

      <nav class="mt-10 grid gap-4 sm:grid-cols-2">
        <RouterLink v-if="neighbours.prev" :to="`/classic/${neighbours.prev.id}`" class="surface lift p-4">
          <p class="label">{{ t('lesson.prev') }}</p>
          <p class="mt-1 font-medium">{{ classicText(neighbours.prev).title }}</p>
        </RouterLink>
        <span v-else />
        <RouterLink v-if="neighbours.next" :to="`/classic/${neighbours.next.id}`" class="surface lift p-4 text-end">
          <p class="label">{{ t('lesson.nextLesson') }}</p>
          <p class="mt-1 font-medium">{{ classicText(neighbours.next).title }}</p>
        </RouterLink>
      </nav>
    </template>
  </main>
</template>
