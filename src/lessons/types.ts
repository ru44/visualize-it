export type Subject =
  | 'algebra'
  | 'functions'
  | 'calculus'
  | 'geometry'
  | 'trigonometry'
  | 'physics'
  | 'waves'
  | 'electricity'
  | 'electromagnetism'
  | 'aerodynamics'
  | 'thermodynamics'
  | 'chemistry'
  | 'statistics'
export type Difficulty = 'beginner' | 'high-school' | 'university' | 'advanced'

export interface ParamSpec {
  label: string
  min: number
  max: number
  step: number
  value: number
  unit?: string
}

export interface ChartSpec {
  title: string
  xLabel: string
  yLabel: string
  domain: [number, number]
  /** mathjs expressions in x; lesson parameters are in scope. */
  series: { label: string; expr: string }[]
  /** Parameter whose current value is marked on the first series. */
  marker?: string
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
  /** `advanced` is shown at university level and above. */
  explanation: { intuition: string[]; formal: string[]; advanced?: string[] }
  derivation: { tex: string; note: string }[]
  derivationTitle?: string
  /** How trustworthy a computed answer is — shown for user-entered equations. */
  checks?: { status: 'exact' | 'numeric' | 'warning'; text: string }[]
  /** Analytic curves drawn under the visualization (chart.js). */
  charts?: ChartSpec[]
  realWorld: { title: string; text: string }[]
}

/** Translated text for one lesson. Everything not listed here (equations, expressions, numbers) is shared with the base lesson. */
export interface LessonText {
  title: string
  summary: string
  /** Slider label per parameter name. */
  parameters: Record<string, string>
  /** Meaning of each variable, in the same order as the base lesson's `variables`. */
  variables: string[]
  intuition: string[]
  formal: string[]
  advanced?: string[]
  /** Note for each derivation step, same order and count as the base lesson. */
  derivationNotes: string[]
  realWorld: { title: string; text: string }[]
  /** Same order and count as the base lesson's `charts`. */
  charts?: { title: string; xLabel: string; yLabel: string; series: string[] }[]
}
