// Another version of a puzzle: the same rules on the same features, so the same difficulty, but
// different pictures. The rows come in another order, the whole puzzle may turn or mirror, and
// shapes, colours, sizes and counts swap which values they stand for. A version is kept only if it
// passes the fairness check — that is what lets a student retake the test without remembering it.
import { problems, look } from './check'
import { buildItem, mulberry32, shuffle, isFlat, RANGE, type Attr, type DimSpec, type ItemSpec, type PartSpec, type Rule, type Triple } from './engine'

type Rnd = () => number
type ValueMap = { kind: 'id' } | { kind: 'affine'; s: number; b: number } | { kind: 'perm'; f: Map<number, number> } | { kind: 'bits'; perm: number[] }

/** A quarter turn clockwise and a left-right mirror, as permutations of the strokes and the dots. */
const LINES_TURN = [1, 2, 3, 0, 5, 4, 7, 6]
const LINES_MIRROR = [0, 3, 2, 1, 5, 4, 6, 7]
const DOTS_TURN = Array.from({ length: 9 }, (_, k) => (k % 3) * 3 + 2 - Math.floor(k / 3))
const DOTS_MIRROR = Array.from({ length: 9 }, (_, k) => Math.floor(k / 3) * 3 + 2 - (k % 3))
/** Shapes swap only within groups that can stand in the same places (outer frames, small copies). */
const SHAPE_CLASSES = [
  [1, 4],
  [2, 3],
  [0, 5, 6],
]

const compose = (first: number[], then: number[]) => first.map((x) => then[x])
const permuteBits = (mask: number, perm: number[]) => perm.reduce((m, to, from) => (mask & (1 << from) ? m | (1 << to) : m), 0)

function apply(m: ValueMap, attr: Attr, v: number): number {
  switch (m.kind) {
    case 'affine':
      return attr === 'rot' || attr === 'pos' ? (((m.s * v + m.b) % 8) + 8) % 8 : m.s * v + m.b
    case 'perm':
      return m.f.get(v) ?? v
    case 'bits':
      return permuteBits(v, m.perm)
    default:
      return v
  }
}

function mapRule(rule: Rule, attr: Attr, m: ValueMap, rnd: Rnd): Rule {
  const f = (v: number) => apply(m, attr, v)
  const t = (x: Triple) => x.map(f) as Triple
  switch (rule.r) {
    case 'const':
      return { r: 'const', v: t(rule.v) }
    case 'dist3':
      return { ...rule, vals: t(rule.vals) }
    case 'prog':
      // Only a straight-line map keeps a progression a progression: the step just changes sign.
      return m.kind === 'affine' ? { r: 'prog', start: f(rule.start), step: m.s * rule.step, rowStep: m.s * rule.rowStep } : rule
    case 'add': {
      // Adding is the same in either order, so each row may swap its two pictures.
      const swap = [0, 1, 2].map(() => rnd() < 0.5)
      return { r: 'add', a: rule.a.map((x, i) => (swap[i] ? rule.b[i] : x)) as Triple, b: rule.b.map((x, i) => (swap[i] ? rule.a[i] : x)) as Triple }
    }
    case 'sub':
      return rule
    default:
      return { ...rule, a: t(rule.a), b: t(rule.b) }
  }
}

function permutation(values: number[], rnd: Rnd): ValueMap {
  const to = shuffle(values, rnd)
  return { kind: 'perm', f: new Map(values.map((v, i) => [v, to[i]])) }
}

function valueMap(p: PartSpec, attr: Attr, rule: Rule, rnd: Rnd, geo: { s: number; turns: number; flip: boolean; lines: number[]; dots: number[] }): ValueMap {
  switch (attr) {
    case 'rot':
      return { kind: 'affine', s: geo.s, b: 2 * geo.turns }
    case 'pos':
      return { kind: 'affine', s: geo.s, b: (geo.flip ? 2 : 0) + 2 * geo.turns }
    case 'lines':
      return { kind: 'bits', perm: geo.lines }
    case 'dots':
      return { kind: 'bits', perm: geo.dots }
  }
  if (rule.r === 'add' || rule.r === 'sub') return { kind: 'id' }
  const [lo, hi] = attr === 'shape' ? [0, 3] : RANGE[attr]
  if (rule.r === 'prog') return rnd() < 0.5 ? { kind: 'affine', s: -1, b: lo + hi } : { kind: 'id' }
  switch (attr) {
    case 'shape': {
      const f = new Map<number, number>()
      for (const cls of SHAPE_CLASSES) {
        const to = shuffle(cls, rnd)
        cls.forEach((v, i) => f.set(v, to[i]))
      }
      return { kind: 'perm', f }
    }
    case 'fill':
      return p.role === 'outer' ? { kind: 'id' } : permutation([0, 1, 2, 3], rnd)
    case 'size':
      return p.role === 'main' ? permutation([0, 1, 2, 3, 4], rnd) : { kind: 'id' }
    default: {
      // Counts trade places only among the counts the puzzle already uses.
      const used = rule.r === 'const' ? rule.v : rule.r === 'dist3' ? rule.vals : []
      return permutation([...new Set(used)], rnd)
    }
  }
}

function transform(spec: ItemSpec, rnd: Rnd): ItemSpec {
  const flip = rnd() < 0.5
  const turns = Math.floor(rnd() * 4)
  let lines = flip ? LINES_MIRROR : [0, 1, 2, 3, 4, 5, 6, 7]
  let dots = flip ? DOTS_MIRROR : [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = 0; i < turns; i++) ((lines = compose(lines, LINES_TURN)), (dots = compose(dots, DOTS_TURN)))
  const geo = { s: flip ? -1 : 1, turns, flip, lines, dots }

  const dims = spec.dims.map((d) => ({ ...d })) as [DimSpec, DimSpec, DimSpec]
  const parts = spec.parts.map((p, k) => {
    const rules: PartSpec['rules'] = {}
    for (const attr of Object.keys(p.rules) as Attr[]) {
      const rule = p.rules[attr]!
      const dim = dims.find((d) => d.part === k && d.attr === attr && d.bit === undefined)
      // A feature that never changes is only there to make wrong options: half the time the
      // right value and the wrong one trade places.
      if (rule.r === 'const' && isFlat(rule) && dim?.alt !== undefined) {
        if (rnd() < 0.5) [rules[attr], dim.alt] = [{ r: 'const', v: [dim.alt, dim.alt, dim.alt] }, rule.v[0]]
        else rules[attr] = rule
        continue
      }
      const m = valueMap(p, attr, rule, rnd, geo)
      rules[attr] = mapRule(rule, attr, m, rnd)
      for (const d of dims)
        if (d.part === k && d.attr === attr) {
          if (d.alt !== undefined) d.alt = apply(m, attr, d.alt)
          if (d.bit !== undefined && m.kind === 'bits') d.bit = m.perm[d.bit]
        }
    }
    return { ...p, rules }
  })
  let rows: Triple
  do rows = shuffle([0, 1, 2], rnd) as Triple
  while (rows[0] === 0 && rows[1] === 1)
  return { parts, dims, rows }
}

/** A different, equally hard version of a puzzle — the same one for everyone, given the seed. */
export function variantOf(spec: ItemSpec, seed: number, tries = 80): ItemSpec | null {
  const rnd = mulberry32(seed)
  const before = buildItem(spec, 1, 0, mulberry32(1)).cells.map(look).join()
  for (let i = 0; i < tries; i++) {
    const v = transform(spec, rnd)
    const it = buildItem(v, 1, 0, mulberry32(1))
    if (!problems(it).length && it.cells.map(look).join() !== before) return v
  }
  return null
}
