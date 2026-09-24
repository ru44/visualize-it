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
  | 'computer-science'
  | 'biology'
  | 'earth-space'
  | 'economics'
  | 'engineering'
  | 'discrete'
  | 'ai'
  | 'numbers'
  | 'data'
  | 'quantum'
  | 'relativity'
  | 'cryptography'
  | 'cosmos'
  | 'nuclear'
export type Difficulty = 'beginner' | 'high-school' | 'university' | 'advanced'

export interface Video {
  title: string
  url: string
  by: string
  lang: string
  note?: string
}

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
  /** Optional 3D scene; key in viz3d/registry.ts. */
  visualization3d?: { type: string; options: Record<string, any> }
  videos?: Video[]
  /** Glossary tokens used in the formulas (beyond the lesson's own variables); filled by the content build. */
  symbols?: string[]
  parameters: Record<string, ParamSpec>
  variables: { symbol: string; meaning: string }[]
  /** Text may contain inline $LaTeX$. */
  /** `advanced` is shown at university level and above. */
  explanation: { intuition: string[]; formal: string[]; advanced?: string[] }
  /** Concrete things to try first (guided mode). */
  tryIt: string[]
  /** The parameter shown first in guided mode. */
  primary?: string
  /** Real-life situations that load slider values. */
  presets: { label: string; text: string; params: Record<string, number> }[]
  /** Self-tests checked live against the sliders. */
  challenges: { text: string; check: string; target?: number; tol?: number }[]
  derivation: { tex: string; note: string }[]
  derivationTitle?: string
  /** How trustworthy a computed answer is — shown for user-entered equations. */
  checks?: { status: 'exact' | 'numeric' | 'warning'; text: string }[]
  /** Analytic curves drawn under the visualization (chart.js). */
  charts?: ChartSpec[]
  realWorld: { title: string; text: string }[]
}

/** The text of one lesson in one language — what a `<lang>.md` file contains. */
export interface LessonText {
  title: string
  summary: string
  parameters: Record<string, string>
  variables: string[]
  charts: { title: string; xLabel: string; yLabel: string; series: string[] }[]
  tryIt: string[]
  presets: { label: string; text: string }[]
  challenges: string[]
  intuition: string[]
  formal: string[]
  advanced: string[]
  derivationNotes: string[]
  realWorld: { title: string; text: string }[]
}

/** One entry of the notation guide (content/notation/<lang>.yaml). */
export interface NotationEntry {
  name: string
  read: string
  /** One plain sentence anyone can follow. */
  simple: string
  /** The precise wording. */
  meaning: string
  /** Lesson id that teaches the symbol. */
  lesson?: string
  example?: string
  group: string
}
