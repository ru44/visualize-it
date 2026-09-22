import { ref, watch } from 'vue'
import en from '../generated/ui.en.json'
import languages from '../generated/languages.json'

export type Key = keyof typeof en
export type Locale = string
export const RTL = new Set(['ar', 'fa', 'he', 'ur'])
/** Every language that has a content/ui/<lang>.yaml. */
export const locales: Locale[] = languages as string[]

const packs = import.meta.glob<{ default: Record<string, string> }>('../generated/ui.*.json', { eager: true })
const dict: Record<string, Record<string, string>> = Object.fromEntries(Object.entries(packs).map(([k, v]) => [k.match(/ui\.(.+)\.json$/)![1], v.default]))

function initial(): Locale {
  const forced = typeof location !== 'undefined' ? /[?&]lang=([a-zA-Z-]+)/.exec(location.href)?.[1] : undefined
  if (forced && locales.includes(forced)) return forced
  try {
    const saved = localStorage.getItem('locale')
    if (saved && locales.includes(saved)) return saved
  } catch {}
  const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : ''
  return locales.includes(nav) ? nav : 'en'
}

export const locale = ref<Locale>(initial())
export const isRtl = () => RTL.has(locale.value)

watch(
  locale,
  (l) => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = l
    document.documentElement.dir = RTL.has(l) ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('locale', l)
    } catch {}
  },
  { immediate: true },
)

/** Translate a UI string; `{name}` placeholders are filled from `vars`. Reactive: reads `locale`. */
export function t(key: Key, vars?: Record<string, string | number>): string {
  let s: string = dict[locale.value]?.[key] ?? (en as Record<string, string>)[key] ?? key
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, String(vars[k]))
  return s
}
