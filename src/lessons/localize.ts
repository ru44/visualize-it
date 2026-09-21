import { shallowRef, watch } from 'vue'
import { locale } from '../i18n'
import type { Lesson, LessonText } from './types'

// Arabic lesson text is a separate chunk, fetched only when the language is switched.
const overlay = shallowRef<Record<string, LessonText>>({})
watch(
  locale,
  async (l) => {
    if (l === 'ar' && !Object.keys(overlay.value).length) overlay.value = (await import('./ar/index')).ar
  },
  { immediate: true },
)

export const hasTranslation = (id: string) => locale.value === 'en' || id === 'adhoc' || id in overlay.value

/** The lesson with its text in the current language (falls back to English field by field). */
export function localize(l: Lesson): Lesson {
  const tx = locale.value === 'ar' ? overlay.value[l.id] : undefined
  if (!tx) return l
  return {
    ...l,
    title: tx.title,
    summary: tx.summary,
    parameters: Object.fromEntries(Object.entries(l.parameters).map(([k, p]) => [k, { ...p, label: tx.parameters[k] ?? p.label }])),
    variables: l.variables.map((v, i) => ({ ...v, meaning: tx.variables[i] ?? v.meaning })),
    explanation: { intuition: tx.intuition, formal: tx.formal, advanced: tx.advanced ?? l.explanation.advanced },
    derivation: l.derivation.map((d, i) => ({ ...d, note: tx.derivationNotes[i] ?? d.note })),
    realWorld: tx.realWorld.length === l.realWorld.length ? tx.realWorld : l.realWorld,
    charts: l.charts?.map((c, i) => {
      const ct = tx.charts?.[i]
      return ct ? { ...c, title: ct.title, xLabel: ct.xLabel, yLabel: ct.yLabel, series: c.series.map((s, j) => ({ ...s, label: ct.series[j] ?? s.label })) } : c
    }),
  }
}
