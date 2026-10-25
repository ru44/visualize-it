import { defineStore } from 'pinia'
import { computed } from 'vue'
import { lessons, getLesson } from '../lessons'
import { useProgress } from './progress'

/**
 * The daily practice hand: five challenges picked deterministically for today and frozen in
 * localStorage, favouring lessons the learner has already finished so old skills stay sharp.
 * Solving happens inside the lesson page (the progress store records it, with the date); this
 * store only deals the hand and keeps the all-time score.
 */
export const usePractice = defineStore('practice', () => {
  const progress = useProgress()
  const today = new Date()
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

  function mulberry(seed: number) {
    return () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let z = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z
      return ((z ^ (z >>> 14)) >>> 0) / 4294967296
    }
  }
  const seed = [...dateKey].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) | 0, 7)

  function shuffled<T>(arr: T[], rnd: () => number): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function dealMix(): { id: string; i: number }[] {
    const rnd = mulberry(seed)
    const entry = (id: string, i: number) => ({ id, i })
    const review = lessons.flatMap((l) => l.challenges.map((_, i) => entry(l.id, i)).filter((e) => progress.isDone(l.id) || progress.isSolved(e.id, e.i)))
    const fresh = lessons.flatMap((l) => l.challenges.map((_, i) => entry(l.id, i)).filter((e) => !progress.isDone(l.id) && !progress.isSolved(e.id, e.i)))
    const pool = [...shuffled(review, rnd), ...shuffled(fresh, rnd)]
    const picked: { id: string; i: number }[] = []
    const used = new Set<string>()
    for (const e of pool) {
      if (picked.length === 5) break
      if (used.has(e.id)) continue
      used.add(e.id)
      picked.push(e)
    }
    for (const e of pool) {
      if (picked.length === 5) break
      if (!picked.includes(e)) picked.push(e)
    }
    return picked
  }

  // Freeze today's hand so solving a lesson mid-day cannot reshuffle it.
  const KEY = 'dailyMix'
  function todaysMix(): { id: string; i: number }[] {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null')
      if (saved?.date === dateKey && Array.isArray(saved.mix) && saved.mix.every((e: any) => getLesson(e.id)?.challenges[e.i])) return saved.mix
    } catch {}
    const mix = dealMix()
    try {
      localStorage.setItem(KEY, JSON.stringify({ date: dateKey, mix }))
    } catch {}
    return mix
  }

  const mix = todaysMix()
  /** A card counts only when solved today — review cards are old solves dealt back on purpose. */
  const solvedToday = (id: string, i: number) => progress.solvedOn(id, i) === dateKey

  const allTime = computed(() => {
    let solved = 0
    const touched = new Set<string>()
    for (const l of lessons)
      for (let i = 0; i < l.challenges.length; i++)
        if (progress.isSolved(l.id, i)) {
          solved++
          touched.add(l.id)
        }
    return { n: solved, m: touched.size }
  })

  return { today, dateKey, mix, solvedToday, allTime }
})
