import { shallowRef, watch } from 'vue'
import { locale } from '../i18n'
import type { Lesson, LessonText } from './types'
import { merge } from './index'
import raw from '../generated/lessons.json'

// Each language's lesson text is a separate chunk, fetched the first time that language is chosen.
const packs = import.meta.glob<{ default: Record<string, LessonText> }>('../generated/lessons.*.json')
const loaded = shallowRef<Record<string, Record<string, LessonText>>>({})
watch(
  locale,
  async (l) => {
    if (l === 'en' || loaded.value[l]) return
    const load = packs[`../generated/lessons.${l}.json`]
    if (load) loaded.value = { ...loaded.value, [l]: (await load()).default }
  },
  { immediate: true },
)

export const hasTranslation = (id: string) => locale.value === 'en' || id === 'adhoc' || !!loaded.value[locale.value]?.[id]

/** The lesson with its text in the current language (English when no translation exists). */
export function localize(l: Lesson): Lesson {
  if (locale.value === 'en') return l
  const t = loaded.value[locale.value]?.[l.id]
  if (!t) return l
  const base = (raw as any[]).find((r) => r.id === l.id)
  return base ? merge(base, t) : l
}
