import { computed } from 'vue'
import { locale } from '../i18n'
import type { NotationEntry } from './types'

const packs = import.meta.glob<{ default: Record<string, NotationEntry> }>('../generated/notation.*.json', { eager: true })
const byLang: Record<string, Record<string, NotationEntry>> = Object.fromEntries(Object.entries(packs).map(([k, v]) => [k.match(/notation\.(.+)\.json$/)![1], v.default]))

/** The notation guide in the current language (English entries fill any gap). */
export const notation = computed<Record<string, NotationEntry>>(() => ({ ...byLang.en, ...(byLang[locale.value] ?? {}) }))

/** How a token is shown: a LaTeX command renders as itself; decorations get a sample letter. */
export function displayTex(token: string): string {
  const sample: Record<string, string> = { '\\dot': '\\dot{x}', '\\ddot': '\\ddot{x}', '\\hat': '\\hat{p}', '\\bar': '\\bar{x}', '\\vec': '\\vec{v}', '\\mathbf': '\\mathbf{v}', '\\mathbb': '\\mathbb{R}', '\\frac': '\\frac{a}{b}', '\\sqrt': '\\sqrt{x}', '\\binom': '\\binom{n}{k}', '\\sum': '\\sum_{i=1}^{n}', '\\int': '\\int_a^b', '\\lim': '\\lim_{x \\to a}', '\\partial': '\\dfrac{\\partial f}{\\partial x}', '\\langle': '\\langle v \\rangle', '\\text': '\\text{text}', '\\mathrm': '\\mathrm{kg}', '\\operatorname': '\\operatorname{Var}', "'": "f'", '!': 'n!', d: 'dx', '\\arg': '\\arg\\max', '\\atan': '\\arctan', '\\erf': '\\operatorname{erf}', '\\gets': 'x \\gets 5', '\\rightleftharpoons': 'A \\rightleftharpoons B', '\\searrow': '\\searrow', '\\nearrow': '\\nearrow', '\\propto': 'y \\propto x', '\\pm': '\\pm', '\\Delta': '\\Delta x', '\\nabla': '\\nabla f' }
  if (sample[token]) return sample[token]
  const m = /^([A-Za-z])_(.+)$/.exec(token)
  if (m) return `${m[1]}_{${m[2]}}`
  return token
}
