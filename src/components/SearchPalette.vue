<script lang="ts">
import { ref } from 'vue'

/** Open/close state lives at module level so any button (the nav, a shortcut) can summon the palette. */
export const searchOpen = ref(false)
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t, locale, type Key } from '../i18n'
import { lessons } from '../lessons'
import { localize } from '../lessons/localize'
import { useProgress } from '../stores/progress'
import SubjectIcon from './SubjectIcon.vue'

const router = useRouter()
const route = useRoute()
const progress = useProgress()
const q = ref('')
const sel = ref(0)
const input = ref<HTMLInputElement>()

// Fold case, Arabic diacritics and letter variants so "تشفير" matches however it was typed.
const fold = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')

const index = computed(() => {
  void locale.value
  return lessons.map((l) => {
    const loc = localize(l)
    return {
      id: l.id,
      subject: l.subject,
      title: loc.title,
      subjectName: t(`subject.${l.subject}` as Key),
      hay: {
        title: fold(loc.title),
        enTitle: fold(l.title),
        id: l.id,
        subjectName: fold(t(`subject.${l.subject}` as Key)),
        concepts: fold(l.concepts.join(' ')),
        summary: fold(loc.summary),
      },
    }
  })
})

const results = computed(() => {
  const needle = fold(q.value.trim())
  if (!needle) return []
  const scored = index.value
    .map((e) => {
      const h = e.hay
      let s = 0
      if (h.title.startsWith(needle)) s = 100
      else if (h.title.includes(needle)) s = 80
      else if (h.enTitle.includes(needle)) s = 70
      else if (h.id.includes(needle)) s = 60
      else if (h.subjectName.includes(needle)) s = 50
      else if (h.concepts.includes(needle)) s = 40
      else if (h.summary.includes(needle)) s = 20
      return { e, s }
    })
    .filter((r) => r.s > 0)
  scored.sort((a, b) => b.s - a.s || a.e.title.localeCompare(b.e.title))
  return scored.slice(0, 12).map((r) => r.e)
})

watch(results, () => (sel.value = 0))
watch(searchOpen, async (open) => {
  if (!open) return
  q.value = ''
  sel.value = 0
  await nextTick()
  input.value?.focus()
})
watch(() => route.fullPath, () => (searchOpen.value = false))

function go(id: string) {
  searchOpen.value = false
  router.push(`/lesson/${id}`)
}
function onKey(ev: KeyboardEvent) {
  if (ev.key === 'ArrowDown') {
    ev.preventDefault()
    sel.value = Math.min(sel.value + 1, results.value.length - 1)
  } else if (ev.key === 'ArrowUp') {
    ev.preventDefault()
    sel.value = Math.max(sel.value - 1, 0)
  } else if (ev.key === 'Enter' && results.value[sel.value]) {
    go(results.value[sel.value].id)
  }
  nextTick(() => document.querySelector('[data-sel="true"]')?.scrollIntoView({ block: 'nearest' }))
}
function globalKey(ev: KeyboardEvent) {
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault()
    searchOpen.value = !searchOpen.value
  } else if (ev.key === 'Escape') {
    searchOpen.value = false
  } else if (ev.key === '/' && !searchOpen.value) {
    const el = document.activeElement as HTMLElement | null
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
    ev.preventDefault()
    searchOpen.value = true
  }
}
onMounted(() => window.addEventListener('keydown', globalKey))
onUnmounted(() => window.removeEventListener('keydown', globalKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="searchOpen" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" role="dialog" aria-modal="true" :aria-label="t('find.title')" @click.self="searchOpen = false">
      <div class="mx-auto mt-[12vh] w-[min(640px,92vw)] overflow-hidden rounded-2xl border shadow-2xl" style="border-color: var(--line); background: var(--bg)">
        <div class="flex items-center gap-3 border-b px-4" style="border-color: var(--line)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="color: var(--muted)">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref="input"
            v-model="q"
            class="h-13 w-full bg-transparent py-3.5 text-[16px] outline-none"
            :placeholder="t('find.placeholder', { n: lessons.length })"
            :aria-label="t('find.title')"
            @keydown="onKey"
          />
          <kbd class="hidden rounded border px-1.5 py-0.5 text-[10px] sm:block" style="border-color: var(--line); color: var(--muted)">Esc</kbd>
        </div>
        <ul v-if="results.length" class="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          <li
            v-for="(r, i) in results"
            :key="r.id"
            role="option"
            :aria-selected="i === sel"
            :data-sel="i === sel ? 'true' : undefined"
            class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5"
            :style="i === sel ? 'background: var(--sunken)' : ''"
            @click="go(r.id)"
            @mousemove="sel = i"
          >
            <span class="shrink-0" style="color: var(--accent)"><SubjectIcon :subject="r.subject" /></span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-[15px]" style="color: var(--fg)">{{ r.title }}</span>
              <span class="block text-xs" style="color: var(--muted)">{{ r.subjectName }}</span>
            </span>
            <span v-if="progress.isDone(r.id)" class="shrink-0 text-sm" style="color: var(--pos)">✓</span>
          </li>
        </ul>
        <p v-else-if="q.trim()" class="px-5 py-6 text-sm" style="color: var(--muted)">{{ t('find.none', { q: q.trim() }) }} {{ t('find.tip') }}</p>
        <p v-else class="px-5 py-6 text-sm" style="color: var(--muted)">{{ t('find.tip') }}</p>
        <p class="border-t px-4 py-2 text-[11px]" style="border-color: var(--line); color: var(--muted)">{{ t('find.hint') }}</p>
      </div>
    </div>
  </Teleport>
</template>
