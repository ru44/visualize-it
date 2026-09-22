// The contract every lesson must satisfy. `lesson.yaml` holds the language-neutral part;
// each `<lang>.md` holds the text. Validation errors name the file and the field.
import { z } from 'zod'

export const SUBJECTS = ['algebra', 'functions', 'calculus', 'geometry', 'trigonometry', 'statistics', 'physics', 'waves', 'electricity', 'electromagnetism', 'aerodynamics', 'thermodynamics', 'chemistry', 'computer-science', 'biology', 'earth-space', 'economics', 'engineering'] as const
export const LEVELS = ['beginner', 'high-school', 'university', 'advanced'] as const

export const ParamSpec = z.object({ min: z.number(), max: z.number(), step: z.number().positive(), value: z.number(), unit: z.string().optional() })

export const Video = z.object({ title: z.string(), url: z.string().url(), by: z.string(), lang: z.string(), note: z.string().optional() })

export const LessonYaml = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'kebab-case id'),
  subject: z.enum(SUBJECTS),
  difficulty: z.enum(LEVELS),
  /** Headline equation, LaTeX. */
  equation: z.string().min(1),
  concepts: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  visualization: z.object({ type: z.string(), options: z.record(z.string(), z.any()).default({}) }),
  /** Optional 3D scene (three.js) offered as a switch next to the 2D picture. Types live in src/viz3d/registry.ts. */
  visualization3d: z.object({ type: z.string(), options: z.record(z.string(), z.any()).default({}) }).optional(),
  /** Parameter ranges; labels live in the language files. */
  parameters: z.record(z.string(), ParamSpec).default({}),
  /** Variable symbols (LaTeX), in the order the language files explain them. */
  variables: z.array(z.string()).default([]),
  /** Derivation steps (LaTeX); the note for each step lives in the language files. */
  derivation: z.array(z.string()).default([]),
  /** Extra videos for this lesson (subject-level ones live in content/videos.yaml). */
  videos: z.array(Video).default([]),
  charts: z
    .array(z.object({ domain: z.tuple([z.number(), z.number()]), marker: z.string().optional(), series: z.array(z.string()).min(1) }))
    .default([]),
})
export type LessonYaml = z.infer<typeof LessonYaml>

/** Parsed from a `<lang>.md`: frontmatter + sections. */
export const LessonText = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  parameters: z.record(z.string(), z.string()).default({}),
  variables: z.array(z.string()).default([]),
  charts: z.array(z.object({ title: z.string(), xLabel: z.string(), yLabel: z.string(), series: z.array(z.string()) })).default([]),
  intuition: z.array(z.string()).min(1),
  formal: z.array(z.string()).min(1),
  advanced: z.array(z.string()).default([]),
  derivationNotes: z.array(z.string()).default([]),
  realWorld: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
})
export type LessonText = z.infer<typeof LessonText>
