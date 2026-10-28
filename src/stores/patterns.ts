import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { testItems, PER_SET, FORMS, getForm } from '../patterns/items'
import { scoreTest, FAMILIES } from '../patterns/engine'

/** One finished sitting, as kept on the device when the student opts in: no answers, no name. */
export interface Attempt {
  /** when the sitting started (ms) — also its id, so a reload never saves it twice */
  id: number
  /** local date, YYYY-MM-DD */
  d: string
  /** version 0–2 */
  f: number
  /** right answers out of 60 */
  s: number
  /** seconds taken */
  t: number
  /** right and total features per rule, in FAMILIES order */
  r: number[]
  n: number[]
}

/**
 * One sitting of the pattern test. Anonymous by design: nothing is sent anywhere, and the answers
 * live in sessionStorage, so a reload keeps them but closing the tab erases them — on a shared
 * school computer the next student finds nothing. Only if the student asks does a short summary of
 * each finished sitting (score, version, date, per-rule results) stay in localStorage, to show
 * progress; one tap forgets it.
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
  const finish = () => {
    finishedAt.value = Date.now()
    keep()
  }
  function erase() {
    answers.value = empty()
    form.value = 0
    current.value = 0
    startedAt.value = null
    finishedAt.value = null
  }

  // ---- results kept on this device, only when asked for -------------------------------------------
  const HISTORY = 'patternHistory'
  const num = (x: unknown) => typeof x === 'number' && Number.isFinite(x)
  let kept: unknown = null
  try {
    kept = JSON.parse(localStorage.getItem(HISTORY) ?? 'null')
  } catch {}
  /** null: the student has not asked to keep results. */
  const history = ref<Attempt[] | null>(
    Array.isArray(kept)
      ? kept.filter((a): a is Attempt => a && num(a.id) && typeof a.d === 'string' && num(a.f) && num(a.s) && num(a.t) && Array.isArray(a.r) && Array.isArray(a.n))
      : null,
  )
  watch(
    history,
    (h) => {
      try {
        if (h) localStorage.setItem(HISTORY, JSON.stringify(h))
        else localStorage.removeItem(HISTORY)
      } catch {}
    },
    { deep: true },
  )
  function keep() {
    const sc = score.value
    if (!history.value || !sc || startedAt.value === null || history.value.some((a) => a.id === startedAt.value)) return
    const day = new Date(startedAt.value)
    history.value.push({
      id: startedAt.value,
      d: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
      f: form.value,
      s: sc.right,
      t: seconds.value,
      r: FAMILIES.map((f) => sc.byFamily[f].right),
      n: FAMILIES.map((f) => sc.byFamily[f].total),
    })
    // A long record is not the point; the last 50 sittings are plenty to see a trend.
    if (history.value.length > 50) history.value.splice(0, history.value.length - 50)
  }
  /** Start keeping results (and keep the one on screen), or forget every one of them. */
  function remember(on: boolean) {
    history.value = on ? (history.value ?? []) : null
    if (on) keep()
  }

  return { answers, form, items, current, startedAt, finishedAt, started, finished, answered, score, seconds, start, choose, finish, erase, history, remember }
})
