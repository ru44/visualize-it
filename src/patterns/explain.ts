// Words for a puzzle: why the answer is right, and what a chosen option got wrong. Everything is
// worked out from the item's rules, so every one of the 60 explanations is exact.
import { t, locale, type Key } from '../i18n'
import { isFlat, isSet, ruleOf, valueAt, type Attr, type Family, type Item, type PartSpec } from './engine'

const ARROWS = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖']
/** Keeps numbers, sums and arrows left-to-right inside Arabic sentences. */
const ltr = (s: string) => `⁦${s}⁩`
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const ruleName = (f: Family) => t(`pat.rule.${f}` as Key)

export function valueLabel(attr: Attr, v: number): string {
  switch (attr) {
    case 'shape':
    case 'size':
    case 'fill':
    case 'pos':
      return t(`pat.val.${attr}.${v}` as Key)
    case 'rot':
      return ltr(ARROWS[v])
    default:
      return ltr(String(v))
  }
}

export const attrLabel = (p: PartSpec, attr: Attr) => t((p.kind === 'shape' && p.role !== 'main' ? `pat.attr.${p.role}.${attr}` : `pat.attr.${attr}`) as Key)

/** The features worth a sentence: every one that follows a rule, plus any the options differ in. */
function features(item: Item): [number, Attr][] {
  const out: [number, Attr][] = []
  item.spec.parts.forEach((p, k) => {
    for (const attr of Object.keys(p.rules) as Attr[]) if (!isFlat(ruleOf(p, attr)) || item.dims.some((d) => d.part === k && d.attr === attr)) out.push([k, attr])
  })
  return out
}

function why(item: Item, k: number, attr: Attr): string {
  const p = item.spec.parts[k]
  const rule = ruleOf(p, attr)
  const at = (r: number, c: number) => valueAt(rule, attr, r, c)
  const lab = (v: number) => valueLabel(attr, v)
  const name = attrLabel(p, attr)
  const [a, b, c] = [at(2, 0), at(2, 1), at(2, 2)]
  if (isSet(attr)) return t(`pat.why.set.${rule.r}` as Key)
  switch (rule.r) {
    case 'const':
      return t(isFlat(rule) ? 'pat.why.same' : 'pat.why.row', { attr: name, v: lab(c) })
    case 'prog': {
      const step = rule.step
      const dir = t(step > 0 ? 'pat.cw' : 'pat.ccw')
      if (attr === 'rot') return t('pat.why.turn', { deg: 45 * Math.abs(step), dir, a: lab(a), b: lab(b), c: lab(c) })
      if (attr === 'pos') return t('pat.why.move', { k: Math.abs(step), dir, b: lab(b), c: lab(c) })
      // Triangle, square, pentagon, hexagon: a step in shape is a side gained or lost.
      if (attr === 'shape') return t(step > 0 ? 'pat.why.sidesUp' : 'pat.why.sidesDown', { a: lab(a), b: lab(b), c: lab(c) })
      return t('pat.why.step', { attr: name, a: lab(a), b: lab(b), c: lab(c) })
    }
    case 'dist3':
      return t('pat.why.each', { attr: name, x: lab(rule.vals[0]), y: lab(rule.vals[1]), z: lab(rule.vals[2]), a: lab(a), b: lab(b), c: lab(c) })
    case 'add':
      return t('pat.why.add', { sum: ltr(`${a} + ${b} = ${c}`) })
    default:
      return t('pat.why.sub', { sum: ltr(`${a} − ${b} = ${c}`) })
  }
}

/** One sentence per rule-following feature: the reasoning that leads to the answer. */
export const explainItem = (item: Item): string[] => features(item).map(([k, attr]) => cap(why(item, k, attr)))

/** The rules in a puzzle, named, e.g. "Each one once (the shape) and Step by step (the size)". */
export function rulesIn(item: Item): string {
  const names = features(item)
    .filter(([k, attr]) => !isFlat(ruleOf(item.spec.parts[k], attr)))
    .map(([k, attr]) => {
      const p = item.spec.parts[k]
      const fam = item.dims.find((d) => d.part === k && d.attr === attr)!.family
      return `${ruleName(fam)} (${attrLabel(p, attr)})`
    })
  return new Intl.ListFormat(locale.value, { type: 'conjunction' }).format(names)
}

const popcount = (x: number) => x.toString(2).replace(/0/g, '').length

/** What the chosen option got wrong, feature by feature. */
export function explainPick(item: Item, pick: number): string[] {
  const out: string[] = []
  const chosen = item.options[pick]
  const truth = item.cells[8]
  const seenSets = new Set<string>()
  item.dims.forEach((d, k) => {
    if (item.picks[pick][k]) return
    const p = item.spec.parts[d.part]
    if (d.bit === undefined) {
      out.push(cap(t('pat.miss.value', { attr: attrLabel(p, d.attr), chose: valueLabel(d.attr, d.wrong), right: valueLabel(d.attr, d.right) })))
      return
    }
    const key = `${d.part}.${d.attr}`
    if (seenSets.has(key)) return
    seenSets.add(key)
    const mine = chosen[d.part].v[d.attr]!
    const right = truth[d.part].v[d.attr]!
    const kind = d.attr === 'dots' ? 'Dots' : 'Lines'
    const extra = popcount(mine & ~right)
    const missing = popcount(right & ~mine)
    if (extra) out.push(t(`pat.miss.extra${kind}` as Key, { n: extra }))
    if (missing) out.push(t(`pat.miss.missing${kind}` as Key, { n: missing }))
  })
  return out
}
