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

const PLURAL = /\{(\w+)\|([^{}]*)\}/g

/** Pick the plural form for `raw` (a number or a formatted number) using the language's own rules. */
function plural(raw: string | number | undefined, body: string): string {
  const text = String(raw ?? '')
  const num = Number(text.replace(/[^\d.-]/g, ''))
  const cat = text !== '' && Number.isFinite(num) ? new Intl.PluralRules(locale.value).select(num) : 'other'
  const forms: Record<string, string> = {}
  for (const part of body.split('|')) {
    const i = part.indexOf('=')
    forms[part.slice(0, i)] = part.slice(i + 1)
  }
  return (forms[cat] ?? forms.other ?? '').replaceAll('#', text)
}

/**
 * Translate a UI string; `{name}` placeholders are filled from `vars`. Reactive: reads `locale`.
 * Counted nouns use `{name|one=…|two=…|few=…|many=…|other=…}` with `#` for the number, so each
 * language gets its own plural rules (Arabic: درس واحد، درسان، 3 دروس، 11 درسًا، 100 درس).
 */
export function t(key: Key, vars?: Record<string, string | number>): string {
  let s: string = dict[locale.value]?.[key] ?? (en as Record<string, string>)[key] ?? key
  s = s.replace(PLURAL, (_, name: string, body: string) => plural(vars?.[name], body))
  if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, String(vars[k]))
  return s
}
