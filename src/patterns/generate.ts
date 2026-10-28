// Fresh practice puzzles for one rule, made on the spot. They are built from scratch, never from
// the test's own puzzles, so practising does not rehearse the test; and each one is kept only if
// it passes the same fairness check as the test. Level 1 runs the chosen rule alone; each level
// above adds one more feature with a rule of its own.
import { problems } from './check'
import { buildItem, shuffle, valueAt, type Attr, type DimSpec, type Family, type Item, type ItemSpec, type Kind, type PartSpec, type Role, type Rule, type Triple } from './engine'

type Rnd = () => number
type Feature = [part: number, attr: Attr]
type Layout = 'shape' | 'group' | 'arrow' | 'nested' | 'dot' | 'lines' | 'dots'

const pick = <T>(rnd: Rnd, a: readonly T[]): T => a[Math.floor(rnd() * a.length)]
const three = (rnd: Rnd, a: number[]) => shuffle(a, rnd).slice(0, 3) as Triple
const span = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)
const mask = (ks: number[]) => ks.reduce((m, k) => m | (1 << k), 0)
const bitsOf = (m: number, n: number) => span(0, n - 1).filter((k) => m & (1 << k))

/** Highest level per rule: the cancelling rule lives on lines, which take only one partner feature. */
export const MAX_LEVEL: Record<Family, number> = { constant: 3, progression: 3, distribution: 3, combine: 3, xor: 2 }

const LAYOUTS: Record<Layout, [Kind, Role][]> = {
  shape: [['shape', 'main']],
  group: [['group', 'main']],
  arrow: [
    ['shape', 'outer'],
    ['arrow', 'inner'],
  ],
  nested: [
    ['shape', 'outer'],
    ['shape', 'inner'],
  ],
  dot: [
    ['shape', 'main'],
    ['dot', 'main'],
  ],
  lines: [
    ['lines', 'main'],
    ['dot', 'main'],
  ],
  dots: [['dots', 'main']],
}
const ATTRS: Record<Kind, Attr[]> = { shape: ['shape', 'size', 'fill'], group: ['count', 'shape', 'fill'], arrow: ['rot'], dot: ['pos'], lines: ['lines'], dots: ['dots'] }

/** Where each rule can show up: [layout, part, feature]. */
const TARGETS: Record<Family, [Layout, number, Attr][]> = {
  constant: [['shape', 0, 'shape'], ['shape', 0, 'fill'], ['shape', 0, 'size'], ['group', 0, 'count'], ['group', 0, 'shape'], ['nested', 1, 'shape'], ['nested', 1, 'fill']],
  progression: [['shape', 0, 'size'], ['shape', 0, 'fill'], ['shape', 0, 'shape'], ['group', 0, 'count'], ['arrow', 1, 'rot'], ['dot', 1, 'pos'], ['nested', 1, 'fill']],
  distribution: [['shape', 0, 'shape'], ['shape', 0, 'size'], ['shape', 0, 'fill'], ['group', 0, 'count'], ['group', 0, 'shape'], ['nested', 0, 'shape'], ['nested', 1, 'shape'], ['lines', 0, 'lines'], ['dots', 0, 'dots']],
  combine: [['group', 0, 'count'], ['lines', 0, 'lines'], ['dots', 0, 'dots']],
  xor: [['lines', 0, 'lines'], ['dots', 0, 'dots']],
}

/** The values a feature may take where it sits, matching the limits the fairness check enforces. */
function domain(layout: Layout, kind: Kind, role: Role, attr: Attr): number[] {
  switch (attr) {
    case 'shape':
      return kind === 'group' ? [4, 1, 0, 5, 6] : role === 'outer' ? [1, 2, 3, 4] : span(0, 6)
    case 'size':
      return role === 'inner' ? span(0, 3) : role === 'outer' ? (layout === 'nested' ? [3, 4] : span(0, 4)) : layout === 'dot' ? span(0, 2) : span(0, 4)
    case 'fill':
      return role === 'outer' ? [0, 1] : span(0, 3)
    case 'count':
      return span(1, 9)
    default:
      return span(0, 7)
  }
}

function progRule(rnd: Rnd, attr: Attr, dom: number[]): Rule {
  if (attr === 'rot' || attr === 'pos') {
    const step = pick(rnd, [1, 2, 3, -1, -2, -3])
    return { r: 'prog', start: Math.floor(rnd() * 8), step, rowStep: pick(rnd, [0, 3 * step, 1, -1]) }
  }
  // Every one of the nine values must stay in range; a shape steps through 3 to 6 sides.
  const [lo, hi] = attr === 'shape' ? [0, 3] : [Math.min(...dom), Math.max(...dom)]
  if (hi - lo < 2) return { r: 'const', v: three(rnd, dom) }
  for (;;) {
    const step = pick(rnd, hi - lo >= 4 ? [1, -1, 2, -2] : [1, -1])
    const rowStep = pick(rnd, [0, 0, Math.sign(step)])
    const offs = [0, 2 * step, 2 * rowStep, 2 * step + 2 * rowStep]
    const starts = span(lo - Math.min(...offs), hi - Math.max(...offs))
    if (starts.length) return { r: 'prog', start: pick(rnd, starts), step, rowStep }
  }
}

function setRule(rnd: Rnd, kind: 'or' | 'diff' | 'xor' | 'dist3', n: number): Rule {
  const row = (): [number, number] => {
    const [s, ...rest] = shuffle(span(0, n - 1), rnd)
    if (kind === 'diff') {
      const a = [s, ...rest.slice(0, 1 + Math.floor(rnd() * 3))]
      return [mask(a), mask(a.slice(0, 1 + Math.floor(rnd() * (a.length - 1))))]
    }
    // The first two pictures share one element, so adding and cancelling give different answers.
    const ka = 1 + Math.floor(rnd() * 2)
    const kb = 1 + Math.floor(rnd() * 2)
    return [mask([s, ...rest.slice(0, ka)]), mask([s, ...rest.slice(ka, ka + kb)])]
  }
  if (kind === 'dist3') {
    const vals = new Set<number>()
    while (vals.size < 3) vals.add(mask(shuffle(span(0, n - 1), rnd).slice(0, 2 + Math.floor(rnd() * 2))))
    return { r: 'dist3', vals: [...vals] as Triple, shift: rnd() < 0.5 ? 1 : 2 }
  }
  const rows = [row(), row(), row()]
  return { r: kind, a: rows.map((x) => x[0]) as Triple, b: rows.map((x) => x[1]) as Triple }
}

function countRule(rnd: Rnd, kind: 'add' | 'sub'): Rule {
  const a: number[] = []
  const b: number[] = []
  for (let r = 0; r < 3; r++) {
    const x = 1 + Math.floor(rnd() * 5)
    const y = 1 + Math.floor(rnd() * 4)
    if (kind === 'add') (a.push(x), b.push(y))
    else (a.push(x + y), b.push(y))
  }
  return { r: kind, a: a as Triple, b: b as Triple }
}

/** One rule for a feature: the chosen family for the target, any simpler one for a partner. */
function ruleFor(rnd: Rnd, fam: Family, attr: Attr, dom: number[]): Rule {
  const sets = attr === 'lines' || attr === 'dots'
  const n = attr === 'lines' ? 8 : 9
  switch (fam) {
    case 'constant':
      return { r: 'const', v: three(rnd, dom) }
    case 'progression':
      return progRule(rnd, attr, dom)
    case 'distribution':
      return sets ? setRule(rnd, 'dist3', n) : { r: 'dist3', vals: three(rnd, dom), shift: rnd() < 0.5 ? 1 : 2 }
    case 'combine':
      return sets ? setRule(rnd, pick(rnd, ['or', 'diff'] as const), n) : countRule(rnd, pick(rnd, ['add', 'sub'] as const))
    default:
      return setRule(rnd, 'xor', n)
  }
}

function attempt(fam: Family, level: number, rnd: Rnd): ItemSpec | null {
  // A dots puzzle has no room for a partner feature, so it is level 1 only.
  const [layout, tk, tAttr] = pick(rnd, TARGETS[fam].filter(([layout]) => layout !== 'dots' || level === 1))
  // The ring dot only joins a lines puzzle as a partner feature, from level 2.
  const shape = LAYOUTS[layout].filter((_, k) => !(layout === 'lines' && k === 1 && level < 2))
  const parts: PartSpec[] = shape.map(([kind, role]) => ({ kind, role, rules: {} }))
  const dom = (k: number, attr: Attr) => domain(layout, parts[k].kind, parts[k].role, attr)

  parts[tk].rules[tAttr] = ruleFor(rnd, fam, tAttr, dom(tk, tAttr))
  // Partners: other features that may carry a rule (an outer frame keeps its colour, and its size
  // when something sits inside it, so the inside always fits).
  const free: Feature[] = parts.flatMap((p, k) =>
    ATTRS[p.kind].filter((a) => !(k === tk && a === tAttr) && !(p.role === 'outer' && (a === 'fill' || (a === 'size' && layout === 'nested')))).map((a) => [k, a] as Feature),
  )
  const partners = shuffle(free, rnd).slice(0, level - 1)
  if (partners.length < level - 1) return null
  for (const [k, attr] of partners) {
    const fams: Family[] = attr === 'pos' || attr === 'rot' ? ['progression'] : attr === 'count' || attr === 'size' || attr === 'fill' ? ['constant', 'progression', 'distribution'] : ['constant', 'distribution']
    parts[k].rules[attr] = ruleFor(rnd, pick(rnd, fams), attr, dom(k, attr))
  }
  // Everything else stays put, at a value of its own.
  const flat: Feature[] = []
  parts.forEach((p, k) => {
    for (const attr of ATTRS[p.kind]) {
      if (p.rules[attr]) continue
      const d = attr === 'size' && p.role === 'main' && layout !== 'dot' ? [2, 3] : attr === 'count' ? span(1, 6) : attr === 'lines' || attr === 'dots' ? [] : dom(k, attr)
      if (!d.length) continue
      const v = pick(rnd, d)
      p.rules[attr] = { r: 'const', v: [v, v, v] }
      flat.push([k, attr])
    }
  })

  // The three features the options differ in: every rule-carrying feature first.
  const dims: DimSpec[] = []
  for (const [k, attr] of [[tk, tAttr] as Feature, ...partners]) {
    if (attr !== 'lines' && attr !== 'dots') {
      dims.push({ part: k, attr })
      continue
    }
    const n = attr === 'lines' ? 8 : 9
    const want = 3 - partners.length
    const rule = parts[k].rules[attr]!
    const answer = valueAt(rule, attr, 2, 2)
    // The tempting slip goes in first: keeping what should cancel, dropping what should stay.
    const trap = rule.r === 'xor' || rule.r === 'or' ? bitsOf(rule.a[2] & rule.b[2], n) : rule.r === 'diff' ? bitsOf(rule.b[2], n) : []
    const ins = shuffle(bitsOf(answer, n), rnd)
    const outs = shuffle(bitsOf(~answer & ((1 << n) - 1), n), rnd)
    const chosen = new Set<number>(trap.slice(0, 1))
    let turn = trap.length && answer & (1 << trap[0]) ? 'out' : 'in'
    while (chosen.size < want && (ins.length || outs.length)) {
      const from = turn === 'in' ? ins : outs
      const b = from.shift()
      if (b !== undefined) chosen.add(b)
      turn = turn === 'in' ? 'out' : 'in'
    }
    for (const b of chosen) dims.push({ part: k, attr, bit: b })
  }
  for (const [k, attr] of shuffle(flat, rnd)) {
    if (dims.length === 3) break
    const v = (parts[k].rules[attr] as { v: Triple }).v[0]
    const alts = dom(k, attr).filter((x) => x !== v)
    if (alts.length) dims.push({ part: k, attr, alt: pick(rnd, alts) })
  }
  if (dims.length !== 3) return null
  return { parts, dims: dims as ItemSpec['dims'] }
}

/** A new, fair practice puzzle for one rule at one level. */
export function practicePuzzle(fam: Family, level: number, rnd: Rnd = Math.random): Item {
  const lv = Math.min(Math.max(1, level), MAX_LEVEL[fam])
  for (let t = 0; t < 500; t++) {
    const spec = attempt(fam, lv, rnd)
    if (!spec) continue
    const it = buildItem(spec, 1, Math.floor(rnd() * 8), rnd)
    if (!problems(it).length) return it
  }
  throw new Error(`could not make a ${fam} puzzle at level ${lv}`)
}
