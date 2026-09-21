import { ref, watch } from 'vue'
import type { Difficulty } from '../lessons/types'

export const levels: Difficulty[] = ['beginner', 'high-school', 'university', 'advanced']

function load(): Difficulty {
  try {
    const v = localStorage.getItem('level') as Difficulty | null
    if (v && levels.includes(v)) return v
  } catch {}
  return 'beginner'
}

// Shared across pages: the learner picks a level once.
export const level = ref<Difficulty>(load())
watch(level, (v) => {
  try {
    localStorage.setItem('level', v)
  } catch {}
})
