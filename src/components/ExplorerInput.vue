<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { matchLesson, examples } from '../engine/explorer'

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
    <form class="surface flex items-center gap-2 p-1.5 pl-4 focus-within:border-[var(--accent)]" @submit.prevent="explore()">
      <span class="text-lg" style="color: var(--muted)" aria-hidden="true">ƒ</span>
      <input
        v-model="query"
        aria-label="Equation"
        placeholder="Type an equation, e.g. 2x + 5 = 17"
        class="num min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-[var(--muted)]"
        autocomplete="off"
        spellcheck="false"
      />
      <button class="btn-primary px-5 py-2.5 text-sm">Visualize</button>
    </form>
    <div v-if="chips" class="mt-3 flex flex-wrap gap-1.5">
      <span class="label mr-1 self-center">Try</span>
      <button
        v-for="e in examples"
        :key="e"
        type="button"
        class="num rounded-full border px-2.5 py-1 text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
        style="border-color: var(--line); color: var(--muted)"
        @click="explore(e)"
      >
        {{ e }}
      </button>
    </div>
  </div>
</template>
