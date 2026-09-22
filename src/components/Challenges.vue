<script setup lang="ts">
import { computed, watch } from 'vue'
import { compile } from 'mathjs'
import { t } from '../i18n'
import { useProgress } from '../stores/progress'
import MathText from './MathText.vue'

// "Test yourself": each challenge is checked live against the current slider values.
const props = defineProps<{ challenges: { text: string; check: string; target?: number; tol?: number }[]; params: Record<string, number>; lessonId: string }>()
const progress = useProgress()
const compiled = computed(() => props.challenges.map((c) => { try { return compile(c.check) } catch { return null } }))
const status = computed(() =>
  props.challenges.map((c, i) => {
    const code = compiled.value[i]
    if (!code) return false
    try {
      const v = code.evaluate({ ...props.params })
      if (c.target === undefined) return !!v
      const tol = c.tol ?? Math.max(0.01, Math.abs(c.target) * 0.02)
      return typeof v === 'number' && Math.abs(v - c.target) <= tol
    } catch {
      return false
    }
  }),
)
watch(status, (s) => s.forEach((ok, i) => ok && progress.markSolved(props.lessonId, i)), { immediate: true })
const solvedCount = computed(() => props.challenges.filter((_, i) => progress.isSolved(props.lessonId, i)).length)
</script>

<template>
  <section v-if="challenges.length" class="surface p-5">
    <div class="flex items-baseline justify-between gap-3">
      <h2 class="text-lg font-semibold tracking-tight">{{ t('test.title') }}</h2>
      <span class="text-xs" style="color: var(--muted)">{{ t('test.solved', { n: solvedCount, total: challenges.length }) }}</span>
    </div>
    <p class="mt-1 text-sm" style="color: var(--muted)">{{ t('test.lead') }}</p>
    <ol class="mt-3 space-y-2.5">
      <li v-for="(c, i) in challenges" :key="i" class="flex items-start gap-3 text-[16px] leading-relaxed">
        <span class="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs transition-colors" :style="status[i] ? 'background: var(--pos); border-color: var(--pos); color: #fff' : progress.isSolved(lessonId, i) ? 'border-color: var(--pos); color: var(--pos)' : 'border-color: var(--line); color: var(--muted)'">{{ status[i] || progress.isSolved(lessonId, i) ? '✓' : i + 1 }}</span>
        <span><MathText :text="c.text" /><span v-if="status[i]" class="ms-2 text-sm font-medium" style="color: var(--pos)">{{ t('test.correct') }}</span></span>
      </li>
    </ol>
  </section>
</template>
