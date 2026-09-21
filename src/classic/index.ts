import manifest from './manifest.json'
import { ar } from './ar'
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

export const classicSims = manifest as ClassicSim[]
export const classicCategories: ClassicCategory[] = ['physics', 'math', 'computer', 'complex']
export const getClassic = (id: string) => classicSims.find((s) => s.id === id)

/** Title and description in the current language. */
export function classicText(s: ClassicSim) {
  const tx = locale.value === 'ar' ? ar[s.id] : undefined
  return { title: tx?.[0] ?? s.title, description: tx?.[1] ?? s.description }
}
