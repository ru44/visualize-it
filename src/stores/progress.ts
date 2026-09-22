import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { lessons } from '../lessons'

/** Lessons the learner has marked as done. Lives only in this browser (localStorage). */
export const useProgress = defineStore('progress', () => {
  const KEY = 'progress'
  let saved: string[] = []
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    saved = Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []
  } catch {}
  const done = reactive(new Set<string>(saved))
  watch(done, () => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...done]))
    } catch {}
  })

  const isDone = (id: string) => done.has(id)
  const toggle = (id: string) => (done.has(id) ? done.delete(id) : done.add(id))
  const total = computed(() => lessons.length)
  const doneCount = computed(() => lessons.filter((l) => done.has(l.id)).length)
  const bySubject = (subject: string) => {
    const all = lessons.filter((l) => l.subject === subject)
    return { done: all.filter((l) => done.has(l.id)).length, total: all.length }
  }
  const reset = () => done.clear()
  return { isDone, toggle, total, doneCount, bySubject, reset }
})
