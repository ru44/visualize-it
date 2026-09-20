export type Subject = 'functions' | 'calculus' | 'geometry' | 'trigonometry' | 'physics' | 'electricity' | 'chemistry'
export type Difficulty = 'beginner' | 'high-school' | 'university' | 'advanced'

export interface ParamSpec {
  label: string
  min: number
  max: number
  step: number
  value: number
  unit?: string
}

export interface Lesson {
  id: string
  title: string
  subject: Subject
  difficulty: Difficulty
  /** LaTeX shown as the headline equation. */
  equation: string
  summary: string
  concepts: string[]
  /** Lesson ids the learner should know first. */
  prerequisites: string[]
  related: string[]
  /** `type` is a key in viz/registry.ts; `options` is passed to that component untouched. */
  visualization: { type: string; options: Record<string, any> }
  parameters: Record<string, ParamSpec>
  variables: { symbol: string; meaning: string }[]
  /** Text may contain inline $LaTeX$. */
  explanation: { intuition: string[]; formal: string[] }
  derivation: { tex: string; note: string }[]
  realWorld: { title: string; text: string }[]
}
