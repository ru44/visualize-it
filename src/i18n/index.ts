import { ref, watch } from 'vue'
import en from './en'
import ar from './ar'

export type Locale = 'en' | 'ar'
export type Key = keyof typeof en
const dict: Record<Locale, Record<Key, string>> = { en, ar }

function initial(): Locale {
  // A shared link can force the language: …/?lang=ar
  const forced = typeof location !== 'undefined' ? /[?&]lang=(en|ar)\b/.exec(location.href)?.[1] : undefined
  if (forced) return forced as Locale
  try {
    const saved = localStorage.getItem('locale')
    if (saved === 'en' || saved === 'ar') return saved
  } catch {}
  return typeof navigator !== 'undefined' && navigator.language?.startsWith('ar') ? 'ar' : 'en'
}

export const locale = ref<Locale>(initial())
export const isRtl = () => locale.value === 'ar'

watch(
  locale,
  (l) => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = l
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('locale', l)
    } catch {}
  },
  { immediate: true },
)

/** Translate a UI string; `{name}` placeholders are filled from `vars`. Reactive: reads `locale`. */
export function t(key: Key, vars?: Record<string, string | number>): string {
  let s: string = dict[locale.value][key] ?? en[key]
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, String(vars[k]))
  return s
}
