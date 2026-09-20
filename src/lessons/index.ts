import type { Lesson, Subject } from './types'
import { calculus } from './calculus'
import { geometry } from './geometry'
import { trigonometry } from './trigonometry'
import { physics } from './physics'
import { electricity } from './electricity'
import { chemistry } from './chemistry'

export const lessons: Lesson[] = [...calculus, ...geometry, ...trigonometry, ...physics, ...electricity, ...chemistry]

const byId = new Map(lessons.map((l) => [l.id, l]))
export const getLesson = (id: string) => byId.get(id)

export const subjectLabels: Record<Subject, string> = {
  functions: 'Functions',
  calculus: 'Calculus',
  geometry: 'Geometry',
  trigonometry: 'Trigonometry',
  physics: 'Physics',
  electricity: 'Electricity',
  chemistry: 'Chemistry',
}
