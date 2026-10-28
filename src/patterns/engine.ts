// Pattern matrices: a 3×3 grid of pictures, read row by row, with the bottom-right one missing.
// Every feature of every picture follows one of five row rules — the five that Carpenter, Just and
// Shell (1990) found describe Raven's matrices: a value stays the same, steps up or down, takes
// three values once each, is the sum or difference of the first two, or keeps only what the first
// two do not share. An item is data (items.ts); this file turns it into cells, options and an answer.

export type Triple = [number, number, number]
export type Attr = 'shape' | 'size' | 'fill' | 'count' | 'rot' | 'pos' | 'lines' | 'dots'
/** shape: one figure · group: 1–9 small copies · arrow · dot: one dot on a ring of eight · lines: strokes of a square · dots: a 3×3 dot grid */
export type Kind = 'shape' | 'group' | 'arrow' | 'dot' | 'lines' | 'dots'
export type Role = 'main' | 'outer' | 'inner'
export type Family = 'constant' | 'progression' | 'distribution' | 'combine' | 'xor'
export const FAMILIES: Family[] = ['constant', 'progression', 'distribution', 'combine', 'xor']

export type Rule =
  /** v[r] all along row r */
  | { r: 'const'; v: Triple }
  /** start + r·rowStep + c·step */
  | { r: 'prog'; start: number; step: number; rowStep: number }
  /** each row holds the three values once each (a Latin square) */
  | { r: 'dist3'; vals: Triple; shift: 1 | 2 }
  /** the first two columns are a and b; the third is a+b, a−b, a∪b, a∖b or a⊕b */
  | { r: 'add' | 'sub' | 'or' | 'diff' | 'xor'; a: Triple; b: Triple }

export interface PartSpec {
  kind: Kind
  role: Role
  rules: Partial<Record<Attr, Rule>>
}
/** A feature the eight options differ in: an attribute, or one stroke/dot of a set (`bit`). */
export interface DimSpec {
  part: number
  attr: Attr
  /** The wrong value; by default a plausible slip worked out from the rule. */
  alt?: number
  bit?: number
}
export interface ItemSpec {
  parts: PartSpec[]
  dims: [DimSpec, DimSpec, DimSpec]
  /** Which rule row each grid row shows (default 0, 1, 2). Every rule works row by row, so any order stays valid. */
  rows?: Triple
}

export interface Part {
  kind: Kind
  role: Role
  v: Partial<Record<Attr, number>>
}
export type Cell = Part[]

export interface Dim {
  part: number
  attr: Attr
  bit?: number
  family: Family
  right: number
  wrong: number
}
export interface Item {
  /** 1-based number within its bank */
  n: number
  /** the nine pictures row by row; cells[8] is the answer */
  cells: Cell[]
  options: Cell[]
  /** index of the right option */
  answer: number
  dims: Dim[]
  /** picks[o][d]: does option o get feature d right? */
  picks: boolean[][]
  spec: ItemSpec
}

export const KIND_ATTRS: Record<Kind, Attr[]> = {
  shape: ['shape', 'size', 'fill'],
  group: ['count', 'shape', 'fill'],
  arrow: ['rot'],
  dot: ['pos'],
  lines: ['lines'],
  dots: ['dots'],
}
const DEFAULTS: Record<Kind, Partial<Record<Attr, number>>> = {
  shape: { shape: 4, size: 2, fill: 0 },
  group: { count: 1, shape: 4, fill: 3 },
  arrow: { rot: 0 },
  dot: { pos: 0 },
  lines: { lines: 0 },
  dots: { dots: 0 },
}
/** An arrow's direction and a dot's place on the ring wrap around after eight steps. */
export const MOD: Partial<Record<Attr, number>> = { rot: 8, pos: 8 }
export const RANGE: Record<Attr, [number, number]> = { shape: [0, 6], size: [0, 4], fill: [0, 3], count: [1, 9], rot: [0, 7], pos: [0, 7], lines: [1, 255], dots: [1, 511] }
export const isSet = (a: Attr) => a === 'lines' || a === 'dots'

export const wrap = (attr: Attr, v: number) => {
  const m = MOD[attr]
  return m ? ((v % m) + m) % m : v
}

export function valueAt(rule: Rule, attr: Attr, r: number, c: number): number {
  switch (rule.r) {
    case 'const':
      return rule.v[r]
    case 'prog':
      return wrap(attr, rule.start + r * rule.rowStep + c * rule.step)
    case 'dist3':
      return rule.vals[(c + rule.shift * r) % 3]
    default: {
      const a = rule.a[r]
      const b = rule.b[r]
      if (c === 0) return a
      if (c === 1) return b
      return rule.r === 'add' ? a + b : rule.r === 'sub' ? a - b : rule.r === 'or' ? a | b : rule.r === 'diff' ? a & ~b : a ^ b
    }
  }
}

export const familyOf = (rule: Rule): Family =>
  rule.r === 'const' ? 'constant' : rule.r === 'prog' ? 'progression' : rule.r === 'dist3' ? 'distribution' : rule.r === 'xor' ? 'xor' : 'combine'

export function ruleOf(p: PartSpec, attr: Attr): Rule {
  const d = DEFAULTS[p.kind][attr]!
  return p.rules[attr] ?? { r: 'const', v: [d, d, d] }
}

/** True when the rule gives one value everywhere — nothing to work out. */
export const isFlat = (rule: Rule) => rule.r === 'const' && rule.v[0] === rule.v[1] && rule.v[1] === rule.v[2]

export const rowOf = (spec: ItemSpec, r: number) => spec.rows?.[r] ?? r
/** The value of one feature in grid row r, column c. */
export const valueIn = (spec: ItemSpec, k: number, attr: Attr, r: number, c: number) => valueAt(ruleOf(spec.parts[k], attr), attr, rowOf(spec, r), c)

export const cellAt = (spec: ItemSpec, r: number, c: number): Cell =>
  spec.parts.map((p, k) => ({ kind: p.kind, role: p.role, v: Object.fromEntries(KIND_ATTRS[p.kind].map((a) => [a, valueIn(spec, k, a, r, c)])) }))

/** The value a wrong option uses for one feature: a plausible slip, never the right value. */
function altValue(spec: ItemSpec, d: DimSpec, right: number): number {
  if (d.bit !== undefined) return right ^ (1 << d.bit)
  if (d.alt !== undefined) return d.alt
  const rule = ruleOf(spec.parts[d.part], d.attr)
  switch (rule.r) {
    case 'const': {
      const other = rule.v.find((v) => v !== right) // the value of another row
      if (other !== undefined) return other
      break
    }
    case 'prog':
      return valueIn(spec, d.part, d.attr, 2, 1) // forgot the last step
    case 'dist3':
      return valueIn(spec, d.part, d.attr, 2, 0) // repeated a value the row already has
    case 'add':
    case 'sub':
      return right < RANGE.count[1] ? right + 1 : right - 1 // miscounted by one
  }
  throw new Error(`a ${d.attr} that never changes needs an explicit alt`)
}

export function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let z = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildItem(spec: ItemSpec, n: number, answer: number, rnd: () => number): Item {
  const cells = Array.from({ length: 9 }, (_, i) => cellAt(spec, Math.floor(i / 3), i % 3))
  const truth = cells[8]
  const dims: Dim[] = spec.dims.map((d) => {
    const right = truth[d.part].v[d.attr]!
    return { part: d.part, attr: d.attr, bit: d.bit, family: familyOf(ruleOf(spec.parts[d.part], d.attr)), right, wrong: altValue(spec, d, right) }
  })
  // The eight options are every right/wrong combination of the three features (an attribute
  // bisection tree, as in I-RAVEN): each right value sits in exactly four options, so the options
  // on their own never give the answer away.
  const combos = Array.from({ length: 8 }, (_, m) => [0, 1, 2].map((k) => !(m & (1 << k))))
  const wrongs = shuffle(combos.slice(1), rnd)
  const picks = [...wrongs.slice(0, answer), combos[0], ...wrongs.slice(answer)]
  const options = picks.map((ok) => {
    const cell: Cell = truth.map((p) => ({ ...p, v: { ...p.v } }))
    dims.forEach((d, k) => {
      if (ok[k]) return
      const v = cell[d.part].v
      v[d.attr] = d.bit !== undefined ? v[d.attr]! ^ (1 << d.bit) : d.wrong
    })
    return cell
  })
  return { n, cells, options, answer, dims, picks, spec }
}

/** A fixed bank: the same items, options and answer places for everyone, every time. */
export function buildBank(specs: ItemSpec[], seed: number): Item[] {
  const rnd = mulberry32(seed)
  // The right answers are spread evenly over the eight places, in an order nobody can learn.
  const places = shuffle(
    specs.map((_, i) => i % 8),
    rnd,
  )
  return specs.map((s, i) => buildItem(s, i + 1, places[i], rnd))
}

// A type, not an interface, so it can fill a translation's {right} and {total} directly.
export type Tally = { right: number; total: number }
/**
 * A rough IQ from the raw score, as a starting point for students — not a measurement. Nobody has
 * normed this test, so it borrows the usual shape of adult results on 60-item matrix tests: an
 * average adult gets about 42 right, and two in three land within 8.5 of that. IQ puts the average
 * at 100 and that spread at 15. The ±8 band is about what a 60-item test can resolve, and below 70
 * there are too few right answers to say anything.
 */
export const IQ_NORM = { mean: 42, sd: 8.5, band: 8, floor: 70 }
export function roughIq(right: number) {
  const iq = Math.round(100 + (15 * (right - IQ_NORM.mean)) / IQ_NORM.sd)
  return { iq, low: Math.max(IQ_NORM.floor, iq - IQ_NORM.band), high: iq + IQ_NORM.band, tooLow: iq < IQ_NORM.floor }
}

export interface Score {
  right: number
  total: number
  answered: number
  bySet: Tally[]
  /** Per rule, over every feature of every answered item: did the chosen option get it right? */
  byFamily: Record<Family, Tally>
}

export function scoreTest(items: Item[], answers: (number | null)[], perSet = 12): Score {
  const byFamily = Object.fromEntries(FAMILIES.map((f) => [f, { right: 0, total: 0 }])) as Record<Family, Tally>
  const bySet: Tally[] = Array.from({ length: Math.ceil(items.length / perSet) }, () => ({ right: 0, total: 0 }))
  let right = 0
  let answered = 0
  items.forEach((it, i) => {
    const pick = answers[i]
    const ok = pick === it.answer
    const set = bySet[Math.floor(i / perSet)]
    set.total++
    if (ok) (set.right++, right++)
    if (pick == null) return
    answered++
    it.dims.forEach((d, k) => {
      byFamily[d.family].total++
      if (it.picks[pick][k]) byFamily[d.family].right++
    })
  })
  return { right, total: items.length, answered, bySet, byFamily }
}
