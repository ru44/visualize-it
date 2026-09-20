// Turns free-form input into either a known lesson id or a normalised expression.
// Deliberately free of mathjs so the home page stays light.

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const SUB = '₀₁₂₃₄₅₆₇₈₉'
const digits = (run: string, table: string) => [...run].map((c) => table.indexOf(c)).join('')
const wrap = (d: string) => (d.length > 1 ? `(${d})` : d)

/** Unicode maths → plain ASCII that mathjs understands. */
export function normalize(q: string): string {
  return q
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + wrap(digits(m, SUP)))
    .replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => '_' + wrap(digits(m, SUB)))
    .replace(/π/g, ' pi ')
    .replace(/√/g, 'sqrt')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/→/g, '->')
    .replace(/∞/g, 'Infinity')
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

export function parseQuery(q: string): Parsed {
  const s = normalize(q)
  let m = s.match(/^lim\s*\(?\s*x\s*->\s*([^\s)]+)\s*\)?\s*(.+)$/i)
  if (m) return { kind: 'limit', at: m[1], expr: m[2] }
  m = s.match(/^(?:∫|int)\s*_\(?(-?[\w.]+)\)?\s*\^\(?(-?[\w.]+)\)?\s*(.+?)\s*dx$/i)
  if (m) return { kind: 'integral', a: m[1], b: m[2], expr: m[3] }
  m = s.match(/^(?:∫|integral of|int)\s*(.+?)\s*(?:dx)?\s+from\s+(\S+)\s+to\s+(\S+)$/i)
  if (m) return { kind: 'integral', expr: m[1], a: m[2], b: m[3] }
  m = s.match(/^(?:d\/dx|derivative of)\s*(.+)$/i)
  if (m) return { kind: 'derivative', expr: m[1] }
  return { kind: 'function', expr: s.replace(/^(?:[a-z]\(x\)|y)\s*=\s*/i, '') }
}

export const examples = ['∫₀⁴ x² dx', 'lim(x→0) sin(x)/x', 'f(x) = x³ − 3x', 'd/dx sin(x)', 'V = IR', 'F = ma', 'PV = nRT', 'a² + b² = c²']
