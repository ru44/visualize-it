import type { LessonText } from '../types'

// Filled in below as translation files land; a missing lesson simply falls back to English.
const parts = import.meta.glob<Record<string, Record<string, LessonText>>>(['./*.ts', '!./index.ts'], { eager: true })
export const ar: Record<string, LessonText> = Object.assign({}, ...Object.values(parts).flatMap((m) => Object.values(m)))
