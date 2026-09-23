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
  // ?3d=1 or ?3d=0 in the URL forces the view, which makes a 3D scene easy to check and to share.
  const forced3d = /[?&]3d=([01])/.exec(typeof location !== 'undefined' ? location.href : '')?.[1]
  const view3d = ref<boolean>(forced3d ? forced3d === '1' : read('view3d') === null ? !phone : read('view3d') === '1')
  watch(view3d, (v) => write('view3d', v ? '1' : '0'))
  const isPhone = phone

  // Guided view: one slider, 'try this' steps, explanations revealed step by step. Default for new visitors.
  const guided = ref<boolean>(read('guided') === null ? true : read('guided') === '1')
  watch(guided, (v) => write('guided', v ? '1' : '0'))

  const setLocale = (l: Locale) => locales.includes(l) && (locale.value = l)
  const nextLocale = () => setLocale(locales[(locales.indexOf(locale.value) + 1) % locales.length])
  const rtl = computed(() => isRtl())

  return { level, theme, toggleTheme, locale, locales, setLocale, nextLocale, rtl, view3d, isPhone, guided }
})
