import manifest from '../generated/classic.json'
import { locale } from '../i18n'

export type ClassicCategory = 'physics' | 'math' | 'computer' | 'complex'
export interface ClassicSim {
  id: string
  category: ClassicCategory
  title: string
  description: string
  image: string
  pages: { path: string; label: string }[]
}
const packs = import.meta.glob<{ default: Record<string, { title: string; description: string }> }>('../generated/classic.*.json', { eager: true })
const texts: Record<string, Record<string, { title: string; description: string }>> = Object.fromEntries(Object.entries(packs).map(([k, v]) => [k.match(/classic\.(.+)\.json$/)![1], v.default]))

export const classicSims = manifest as ClassicSim[]
export const classicCategories: ClassicCategory[] = ['physics', 'math', 'computer', 'complex']
export const getClassic = (id: string) => classicSims.find((s) => s.id === id)

/** Title and description in the current language (English when missing). */
export function classicText(s: ClassicSim) {
  return texts[locale.value]?.[s.id] ?? texts.en?.[s.id] ?? { title: s.title, description: s.description }
}
