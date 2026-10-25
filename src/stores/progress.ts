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
  // Solved self-test challenges, per lesson ("lesson#index" → date last solved).
  // Legacy saves were a bare array of keys: they migrate with an empty date, which
  // counts as solved ever but not solved on any particular day.
  const todayKey = () => {
    const d = new Date()
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  }
  let solvedSaved: [string, string][] = []
  try {
    const v = JSON.parse(localStorage.getItem('challenges') ?? '[]')
    if (Array.isArray(v)) solvedSaved = v.filter((x) => typeof x === 'string').map((k) => [k, ''])
    else if (v && typeof v === 'object') solvedSaved = Object.entries(v).filter((e): e is [string, string] => typeof e[1] === 'string')
  } catch {}
  const solved = reactive(new Map<string, string>(solvedSaved))
  watch(solved, () => {
    try {
      localStorage.setItem('challenges', JSON.stringify(Object.fromEntries(solved)))
    } catch {}
  })
  const markSolved = (id: string, i: number) => solved.set(`${id}#${i}`, todayKey())
  const isSolved = (id: string, i: number) => solved.has(`${id}#${i}`)
  const solvedOn = (id: string, i: number) => solved.get(`${id}#${i}`)
  const reset = () => (done.clear(), solved.clear())
  return { isDone, toggle, total, doneCount, bySubject, reset, markSolved, isSolved, solvedOn }
})
