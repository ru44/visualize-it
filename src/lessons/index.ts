import type { Lesson, LessonText, Subject } from './types'
import raw from '../generated/lessons.json'
import en from '../generated/lessons.en.json'

/** Language-neutral lesson data merged with the English text. Other languages overlay at runtime (see localize.ts). */
export const lessons: Lesson[] = (raw as any[]).map((l) => merge(l, (en as Record<string, LessonText>)[l.id]))

export function merge(l: any, t: LessonText): Lesson {
  return {
    id: l.id,
    subject: l.subject,
    difficulty: l.difficulty,
    equation: l.equation,
    concepts: l.concepts,
    prerequisites: l.prerequisites,
    related: l.related,
    visualization: l.visualization,
    title: t.title,
    summary: t.summary,
    parameters: Object.fromEntries(Object.entries(l.parameters as Record<string, any>).map(([k, p]) => [k, { ...p, label: t.parameters[k] ?? k }])),
    variables: (l.variables as string[]).map((symbol, i) => ({ symbol, meaning: t.variables[i] ?? '' })),
    explanation: { intuition: t.intuition, formal: t.formal, advanced: t.advanced?.length ? t.advanced : undefined },
    derivation: (l.derivation as string[]).map((tex, i) => ({ tex, note: t.derivationNotes[i] ?? '' })),
    realWorld: t.realWorld,
    charts: (l.charts as any[]).map((c, i) => ({ domain: c.domain, marker: c.marker, title: t.charts?.[i]?.title ?? '', xLabel: t.charts?.[i]?.xLabel ?? '', yLabel: t.charts?.[i]?.yLabel ?? '', series: (c.series as string[]).map((expr, j) => ({ expr, label: t.charts?.[i]?.series[j] ?? expr })) })),
  }
}

const byId = new Map(lessons.map((l) => [l.id, l]))
export const getLesson = (id: string) => byId.get(id)
export const subjects: Subject[] = [...new Set(lessons.map((l) => l.subject))]
