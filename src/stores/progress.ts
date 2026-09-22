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
  // Solved self-test challenges, per lesson ("lesson#index").
  let solvedSaved: string[] = []
  try {
    const v = JSON.parse(localStorage.getItem('challenges') ?? '[]')
    solvedSaved = Array.isArray(v) ? v : []
  } catch {}
  const solved = reactive(new Set<string>(solvedSaved))
  watch(solved, () => {
    try {
      localStorage.setItem('challenges', JSON.stringify([...solved]))
    } catch {}
  })
  const markSolved = (id: string, i: number) => solved.add(`${id}#${i}`)
  const isSolved = (id: string, i: number) => solved.has(`${id}#${i}`)
  const reset = () => (done.clear(), solved.clear())
  return { isDone, toggle, total, doneCount, bySubject, reset, markSolved, isSolved }
})
