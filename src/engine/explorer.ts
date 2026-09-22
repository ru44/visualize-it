// Turns free-form input into either a known lesson id or a normalised expression.
// Deliberately free of mathjs so the home page stays light.

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const SUB = '₀₁₂₃₄₅₆₇₈₉'
const digits = (run: string, table: string) => [...run].map((c) => table.indexOf(c)).join('')
const wrap = (d: string) => (d.length > 1 ? `(${d})` : d)

/** Unicode maths → plain ASCII that mathjs understands. */
export function normalize(q: string): string {
  return q
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/٫/g, '.')
    .replace(/س/g, 'x')
    .replace(/ص/g, 'y')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + wrap(digits(m, SUP)))
    .replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => '_' + wrap(digits(m, SUB)))
    .replace(/π/g, ' pi ')
    .replace(/√/g, 'sqrt')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/→/g, '->')
    .replace(/∞|\binf(inity)?\b|\boo\b/gi, 'Infinity')
    .replace(/\s+/g, ' ')
    .trim()
}

const known: [RegExp, string][] = [
  [/^v=i\*?r$|^i=v\/r$|^p=v\*?i$|ohm/, 'ohms-law'],
  [/^f=m\*?a$|^a=f\/m$|newton/, 'newtons-second-law'],
  [/^p\*?v=n\*?r\*?t$|idealgas/, 'ideal-gas-law'],
  [/a\^2\+b\^2=c\^2|pythag/, 'pythagorean-theorem'],
  [/^a=pi\*?r\^2$|^c=2\*?pi\*?r$|^circle$/, 'circle'],
  [/unitcircle|sin\^2.*cos\^2|cos\^2.*sin\^2/, 'unit-circle'],
  [/^slope$|^m=/, 'slope'],
]

export function matchLesson(q: string): string | null {
  const compact = normalize(q).toLowerCase().replace(/\s/g, '')
  return known.find(([re]) => re.test(compact))?.[1] ?? null
}

export type Parsed =
  | { kind: 'limit'; expr: string; at: string }
  | { kind: 'integral'; expr: string; a: string; b: string }
  | { kind: 'derivative'; expr: string }
  | { kind: 'function'; expr: string }
  | { kind: 'equation'; lhs: string; rhs: string }
  | { kind: 'count'; op: 'C' | 'P' | '!'; n: number; k: number }

export function parseQuery(q: string): Parsed {
  const s = normalize(q).replace(/^solve\s+/i, '')
  // Counting: C(10,3), 10C3, nCr(10,3), binom(10,3), 10 choose 3, P(10,3), 10P3, 7!
  let c = s.match(/^(?:C|nCr|binom|choose)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/i) || s.match(/^(\d+)\s*C\s*(\d+)$/i) || s.match(/^(\d+)\s+choose\s+(\d+)$/i)
  if (c) return { kind: 'count', op: 'C', n: +c[1], k: +c[2] }
  c = s.match(/^(?:P|nPr|perm)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/i) || s.match(/^(\d+)\s*P\s*(\d+)$/i)
  if (c) return { kind: 'count', op: 'P', n: +c[1], k: +c[2] }
  c = s.match(/^(\d+)\s*!$/)
  if (c) return { kind: 'count', op: '!', n: +c[1], k: +c[1] }
  let m = s.match(/^lim\s*\(?\s*x\s*->\s*([^\s)]+)\s*\)?\s*(.+)$/i)
  if (m) return { kind: 'limit', at: m[1], expr: m[2] }
  m = s.match(/^(?:∫|int)\s*_\(?(-?[\w.]+)\)?\s*\^\(?(-?[\w.]+)\)?\s*(.+?)\s*dx$/i)
  if (m) return { kind: 'integral', a: m[1], b: m[2], expr: m[3] }
  m = s.match(/^(?:∫|integral of|int)\s*(.+?)\s*(?:dx)?\s+from\s+(\S+)\s+to\s+(\S+)$/i)
  if (m) return { kind: 'integral', expr: m[1], a: m[2], b: m[3] }
  m = s.match(/^(?:d\/dx|derivative of)\s*(.+)$/i)
  if (m) return { kind: 'derivative', expr: m[1] }
  const eq = s.match(/^([^=]+)=([^=]+)$/)
  if (eq && !/^(?:[a-z]\(x(?:,\s*y)?\)|y|z)$/i.test(eq[1].trim())) return { kind: 'equation', lhs: eq[1].trim(), rhs: eq[2].trim() }
  return { kind: 'function', expr: s.replace(/^(?:[a-z]\(x(?:,\s*y)?\)|y|z)\s*=\s*/i, '') }
}

export const examples = ['2x + 5 = 17', 'C(10,3)', 'x² − 4x + 3 = 0', '∫₀⁴ x² dx', 'lim(x→0) sin(x)/x', 'f(x) = x³ − 3x', 'd/dx sin(x)', 'z = sin(x)·cos(y)', 'V = IR', 'F = ma', 'PV = nRT', 'a² + b² = c²']
