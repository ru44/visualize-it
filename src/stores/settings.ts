import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { locale, locales, isRtl, type Locale } from '../i18n'
import type { Difficulty } from '../lessons/types'

export const levels: Difficulty[] = ['beginner', 'high-school', 'university', 'advanced']
type Theme = 'light' | 'dark'

const read = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key: string, v: string) => {
  try {
    localStorage.setItem(key, v)
  } catch {}
}

/** Learner preferences: language, theme, explanation level. Persisted in localStorage. */
export const useSettings = defineStore('settings', () => {
  const forcedLevel = /[?&]level=([a-z-]+)/.exec(typeof location !== 'undefined' ? location.href : '')?.[1]
  const level = ref<Difficulty>(levels.includes(forcedLevel as Difficulty) ? (forcedLevel as Difficulty) : levels.includes(read('level') as Difficulty) ? (read('level') as Difficulty) : 'beginner')
  watch(level, (v) => write('level', v))

  const theme = ref<Theme>(read('theme') === 'dark' || read('theme') === 'light' ? (read('theme') as Theme) : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  watch(theme, (v) => ((document.documentElement.dataset.theme = v), write('theme', v)), { immediate: true })
  const toggleTheme = () => (theme.value = theme.value === 'dark' ? 'light' : 'dark')

  // 3D scenes are opt-in: off by default on small screens and coarse pointers (phones), remembered per device.
  const phone = typeof matchMedia !== 'undefined' && matchMedia('(max-width: 640px), (pointer: coarse)').matches
  const view3d = ref<boolean>(read('view3d') === null ? !phone : read('view3d') === '1')
  watch(view3d, (v) => write('view3d', v ? '1' : '0'))
  const isPhone = phone

  const setLocale = (l: Locale) => locales.includes(l) && (locale.value = l)
  const nextLocale = () => setLocale(locales[(locales.indexOf(locale.value) + 1) % locales.length])
  const rtl = computed(() => isRtl())

  return { level, theme, toggleTheme, locale, locales, setLocale, nextLocale, rtl, view3d, isPhone }
})
