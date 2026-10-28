// The fairness check every puzzle must pass — the fixed test, its other versions, and every
// practice puzzle made on the fly. A careful solver tries each rule the lesson teaches, along rows
// and down columns; any rule that fits all eight visible pictures must predict the same gap.
import { draw } from './draw'
import { KIND_ATTRS, RANGE, MOD, isSet, isFlat, ruleOf, wrap, type Attr, type Cell, type Item } from './engine'

export function predictions(g: number[][], attr: Attr): number[] {
  const out = new Set<number>()
  const dif = (a: number, b: number) => (MOD[attr] ? wrap(attr, b - a) : b - a)
  const reads = [(i: number) => g[i], (i: number) => [g[0][i], g[1][i], g[2][i]]]
  const sorted = (a: number[]) => [...a].sort((x, y) => x - y).join()
  const ops: ((a: number, b: number) => number)[] = isSet(attr)
    ? [(a, b) => a | b, (a, b) => a & b, (a, b) => a ^ b, (a, b) => a & ~b, (a, b) => b & ~a]
    : attr === 'count'
      ? [(a, b) => a + b, (a, b) => a - b, (a, b) => b - a]
      : []
  for (const read of reads) {
    const [A, B, C] = [read(0), read(1), read(2)] // C[2] is the gap
    if (A[0] === A[1] && A[1] === A[2] && B[0] === B[1] && B[1] === B[2] && C[0] === C[1]) out.add(C[1])
    const d = dif(A[0], A[1])
    if (d !== 0 && dif(A[1], A[2]) === d && dif(B[0], B[1]) === d && dif(B[1], B[2]) === d && dif(C[0], C[1]) === d) out.add(wrap(attr, C[1] + d))
    if (new Set(A).size === 3 && sorted(A) === sorted(B) && C[0] !== C[1] && A.includes(C[0]) && A.includes(C[1])) out.add(A.find((v) => v !== C[0] && v !== C[1])!)
    for (const op of ops) if (op(A[0], A[1]) === A[2] && op(B[0], B[1]) === B[2]) out.add(op(C[0], C[1]))
  }
  return [...out]
}

export const look = (c: Cell) => JSON.stringify(draw(c))

/** Everything wrong with an item, in words; an empty list means it is fair and well drawn. */
export function problems(it: Item): string[] {
  const out: string[] = []
  const need = (ok: boolean, what: string) => ok || out.push(what)
  const looks = it.options.map(look)
  need(looks.length === 8 && new Set(looks).size === 8, 'eight options that all look different')
  need(looks[it.answer] === look(it.cells[8]) && looks.filter((l) => l === look(it.cells[8])).length === 1, 'the answer is the missing picture')
  need([...it.cells, ...it.options].every((c) => draw(c).length > 0), 'no blank pictures')
  const spec = it.spec
  spec.parts.forEach((p, k) => {
    for (const attr of KIND_ATTRS[p.kind]) {
      const [lo, hi] = RANGE[attr]
      const vals = [...it.cells, ...it.options].map((c) => c[k].v[attr]!)
      need(
        vals.every((v) => Number.isInteger(v) && v >= lo && v <= hi),
        `${p.kind}.${attr} stays within ${lo}–${hi}`,
      )
      const dims = spec.dims.filter((d) => d.part === k && d.attr === attr)
      if (!isFlat(ruleOf(p, attr))) need(dims.length > 0, `${p.kind}.${attr} follows a rule, so the options must test it`)
      if (!dims.length) continue
      const g = [0, 1, 2].map((r) => [0, 1, 2].map((c) => it.cells[r * 3 + c][k].v[attr]!))
      const pred = predictions(g, attr)
      need(pred.length === 1 && pred[0] === g[2][2], `${p.kind}.${attr} has one answer a solver can reach (rules predict ${pred.join(', ')})`)
    }
  })
  const bits = it.dims.filter((d) => d.bit !== undefined)
  // If every toggled stroke were extra, the answer would be the option with the fewest lines.
  if (bits.length >= 2) need(bits.some((d) => d.right & (1 << d.bit!)) && bits.some((d) => !(d.right & (1 << d.bit!))), 'toggled strokes both add and remove')
  need(new Set(it.dims.map((d) => `${d.part}.${d.attr}.${d.bit}`)).size === 3, 'three different features')
  const all = [...it.cells, ...it.options]
  const outer = spec.parts.findIndex((p) => p.role === 'outer')
  const inner = spec.parts.findIndex((p) => p.role === 'inner')
  for (const [k, p] of spec.parts.entries()) {
    const at = (attr: Attr) => all.map((c) => c[k].v[attr]!)
    if (p.role === 'outer') need(at('shape').every((s) => [1, 2, 3, 4].includes(s)) && at('fill').every((x) => x <= 1), 'outer figures leave room inside')
    if (p.kind === 'group') need(at('shape').every((s) => ![2, 3].includes(s)), 'small copies use shapes that stay distinct when small')
    if (p.kind === 'shape' && p.role === 'main' && spec.parts.some((q) => q.kind === 'dot')) need(at('size').every((s) => s <= 2), "the figure clears the dot's ring")
  }
  // A figure inside another must fit: big enough outside, small enough inside.
  if (outer >= 0 && inner >= 0 && spec.parts[inner].kind === 'shape')
    need(
      all.every((c) => c[outer].v.size! >= 2 && c[inner].v.size! <= 3),
      'the inner figure fits inside the outer one',
    )
  return out
}
