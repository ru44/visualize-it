import type { Lesson, Subject } from './types'
import { calculus } from './calculus'
import { geometry } from './geometry'
import { trigonometry } from './trigonometry'
import { physics } from './physics'
import { electricity } from './electricity'
import { chemistry } from './chemistry'
import { more } from './more'
import { aerodynamics } from './aerodynamics'
import { electromagnetism } from './electromagnetism'
import { chemistry2 } from './chemistry2'
import { maths } from './maths'
import { mechanics } from './mechanics'

const all: Lesson[] = [...calculus, ...geometry, ...trigonometry, ...physics, ...electricity, ...chemistry, ...more, ...electromagnetism, ...aerodynamics, ...chemistry2, ...maths, ...mechanics]

const byId = new Map(all.map((l) => [l.id, l]))
export const getLesson = (id: string) => byId.get(id)

export const subjectLabels: Record<Subject, string> = {
  algebra: 'Algebra',
  functions: 'Functions',
  calculus: 'Calculus',
  geometry: 'Geometry',
  trigonometry: 'Trigonometry',
  physics: 'Mechanics',
  waves: 'Waves',
  electricity: 'Electricity',
  electromagnetism: 'Electromagnetism',
  aerodynamics: 'Aerodynamics',
  thermodynamics: 'Thermodynamics',
  chemistry: 'Chemistry',
}

const order = Object.keys(subjectLabels)
/** Grouped by subject (in the order of `subjectLabels`), original order kept inside each subject. */
export const lessons: Lesson[] = all
  .map((l, i) => [l, i] as const)
  .sort((a, b) => order.indexOf(a[0].subject) - order.indexOf(b[0].subject) || a[1] - b[1])
  .map(([l]) => l)
