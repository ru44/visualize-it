<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { matchLesson, examples } from '../engine/explorer'
import { t } from '../i18n'

const props = defineProps<{ initial?: string; chips?: boolean }>()
const router = useRouter()
const query = ref(props.initial ?? '')
watch(() => props.initial, (v) => (query.value = v ?? ''))

function explore(q = query.value) {
  if (!q.trim()) return
  const id = matchLesson(q)
  router.push(id ? `/lesson/${id}` : { path: '/explore', query: { q } })
}
</script>

<template>
  <div>
    <form class="surface flex items-center gap-2 p-1.5 ps-4 focus-within:border-[var(--accent)]" @submit.prevent="explore()">
      <span class="text-lg" style="color: var(--muted)" aria-hidden="true">ƒ</span>
      <input
        v-model="query"
        dir="ltr"
        :aria-label="t('lesson.equation')"
        :placeholder="t('explore.placeholder')"
        class="num min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-[var(--muted)] rtl:placeholder:text-right"
        autocomplete="off"
        spellcheck="false"
      />
      <button class="btn-primary shrink-0 px-5 py-2.5 text-sm">{{ t('explore.button') }}</button>
    </form>
    <p v-if="chips" class="mt-2 text-xs" style="color: var(--muted)">{{ t('explore.help') }}</p>
    <div v-if="chips" class="mt-3 flex flex-wrap items-center gap-1.5">
      <span class="label me-1">{{ t('explore.try') }}</span>
      <button
        v-for="e in examples"
        :key="e"
        type="button"
        dir="ltr"
        class="num rounded-full border px-2.5 py-1 text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
        style="border-color: var(--line); color: var(--muted)"
        @click="explore(e)"
      >
        {{ e }}
      </button>
    </div>
  </div>
</template>
