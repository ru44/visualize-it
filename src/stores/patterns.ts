import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { testItems, PER_SET, FORMS, getForm } from '../patterns/items'
import { scoreTest } from '../patterns/engine'

/**
 * One sitting of the pattern test. Anonymous by design: nothing is sent anywhere, and the answers
 * live in sessionStorage, so a reload keeps them but closing the tab erases them — on a shared
 * school computer the next student finds nothing.
 */
export const usePatterns = defineStore('patterns', () => {
  const KEY = 'patternTest'
  // Bump when the item bank changes, so old answers are never scored against new puzzles.
  const VERSION = 2
  const n = testItems.length
  const empty = () => Array<number | null>(n).fill(null)

  let saved: any = null
  try {
    saved = JSON.parse(sessionStorage.getItem(KEY) ?? 'null')
  } catch {}
  const valid = saved?.v === VERSION && Array.isArray(saved.answers) && saved.answers.length === n
  const answers = ref<(number | null)[]>(valid ? saved.answers.map((a: unknown) => (Number.isInteger(a) && (a as number) >= 0 && (a as number) < 8 ? a : null)) : empty())
  /** Which version of the test (0, 1, 2): same rules and difficulty, different pictures, for retakes. */
  const form = ref<number>(valid && Number.isInteger(saved.form) && saved.form >= 0 && saved.form < FORMS ? saved.form : 0)
  const current = ref<number>(valid && Number.isInteger(saved.current) ? Math.min(Math.max(saved.current, 0), n - 1) : 0)
  const startedAt = ref<number | null>(valid && typeof saved.startedAt === 'number' ? saved.startedAt : null)
  const finishedAt = ref<number | null>(valid && typeof saved.finishedAt === 'number' ? saved.finishedAt : null)

  watch(
    [answers, form, current, startedAt, finishedAt],
    () => {
      try {
        if (startedAt.value === null) sessionStorage.removeItem(KEY)
        else sessionStorage.setItem(KEY, JSON.stringify({ v: VERSION, answers: answers.value, form: form.value, current: current.value, startedAt: startedAt.value, finishedAt: finishedAt.value }))
      } catch {}
    },
    { deep: true },
  )

  const started = computed(() => startedAt.value !== null)
  const finished = computed(() => finishedAt.value !== null)
  const answered = computed(() => answers.value.filter((a) => a !== null).length)
  const items = computed(() => getForm(form.value))
  const score = computed(() => (finished.value ? scoreTest(items.value, answers.value, PER_SET) : null))
  const seconds = computed(() => (startedAt.value !== null && finishedAt.value !== null ? Math.round((finishedAt.value - startedAt.value) / 1000) : 0))

  function start(version = 0) {
    form.value = version
    answers.value = empty()
    current.value = 0
    startedAt.value = Date.now()
    finishedAt.value = null
  }
  const choose = (i: number, option: number) => (answers.value[i] = option)
  const finish = () => (finishedAt.value = Date.now())
  function erase() {
    answers.value = empty()
    form.value = 0
    current.value = 0
    startedAt.value = null
    finishedAt.value = null
  }

  return { answers, form, items, current, startedAt, finishedAt, started, finished, answered, score, seconds, start, choose, finish, erase }
})
