// The item bank. 60 test items in five sets of twelve — the length of Raven's Standard Progressive
// Matrices — rising from one rule on one feature to three rules at once, then the cancelling rule
// (only what the first two pictures do not share survives). Every item is original and drawn by
// draw.ts; `pnpm test` proves each one has exactly one answer a careful solver can reach.
//
// Values: shapes 0 triangle · 1 square · 2 pentagon · 3 hexagon · 4 circle · 5 diamond · 6 star;
// sizes 0–4; fills 0 white · 1 light grey · 2 dark grey · 3 black; arrow directions 0–7 clockwise
// from up; ring places 0–7 clockwise from the top-left corner. Strokes 0 top · 1 right · 2 bottom
// · 3 left · 4 ╲ · 5 ╱ · 6 vertical middle · 7 horizontal middle; dots 0–8 row by row.
import { buildBank, FAMILIES, type Attr, type DimSpec, type Family, type Item, type ItemSpec, type PartSpec, type Role, type Rule, type Triple } from './engine'

const [tri, sq, pent, hex, circ, dia, star] = [0, 1, 2, 3, 4, 5, 6]

const same = (v: number): Rule => ({ r: 'const', v: [v, v, v] })
const rows = (a: number, b: number, c: number): Rule => ({ r: 'const', v: [a, b, c] })
const steps = (start: number, step: number, rowStep = 0): Rule => ({ r: 'prog', start, step, rowStep })
const each = (vals: Triple, shift: 1 | 2 = 1): Rule => ({ r: 'dist3', vals, shift })
const add = (a: Triple, b: Triple): Rule => ({ r: 'add', a, b })
const sub = (a: Triple, b: Triple): Rule => ({ r: 'sub', a, b })
const or = (a: Triple, b: Triple): Rule => ({ r: 'or', a, b })
const diff = (a: Triple, b: Triple): Rule => ({ r: 'diff', a, b })
const xor = (a: Triple, b: Triple): Rule => ({ r: 'xor', a, b })
/** A set of strokes or dots from their numbers. */
const S = (...k: number[]) => k.reduce((m, b) => m | (1 << b), 0)

type Rules = Partial<Record<Attr, Rule>>
const shape = (rules: Rules, role: Role = 'main'): PartSpec => ({ kind: 'shape', role, rules })
const group = (rules: Rules): PartSpec => ({ kind: 'group', role: 'main', rules })
const arrow = (rules: Rules): PartSpec => ({ kind: 'arrow', role: 'inner', rules })
const dot = (rules: Rules): PartSpec => ({ kind: 'dot', role: 'main', rules })
const lines = (rules: Rules): PartSpec => ({ kind: 'lines', role: 'main', rules })
const dots = (rules: Rules): PartSpec => ({ kind: 'dots', role: 'main', rules })
const f = (part: number, attr: Attr, alt?: number): DimSpec => ({ part, attr, alt })
const bit = (part: number, attr: Attr, b: number): DimSpec => ({ part, attr, bit: b })
const item = (parts: PartSpec[], ...dims: [DimSpec, DimSpec, DimSpec]): ItemSpec => ({ parts, dims })

export const TEST: ItemSpec[] = [
  // ---- set 1: one rule on one feature -------------------------------------------------------------
  item([shape({ shape: rows(circ, sq, tri), size: same(3), fill: same(0) })], f(0, 'shape'), f(0, 'size', 1), f(0, 'fill', 3)),
  item([shape({ shape: same(circ), size: steps(0, 2), fill: same(3) })], f(0, 'size'), f(0, 'shape', sq), f(0, 'fill', 0)),
  item([group({ count: steps(1, 1), shape: same(sq), fill: same(3) })], f(0, 'count'), f(0, 'shape', circ), f(0, 'fill', 0)),
  item([shape({ shape: each([circ, tri, sq]), size: same(3), fill: same(0) })], f(0, 'shape'), f(0, 'size', 1), f(0, 'fill', 2)),
  item([shape({ shape: same(circ), size: same(3), fill: same(0) }, 'outer'), arrow({ rot: steps(0, 2) })], f(1, 'rot'), f(0, 'shape', sq), f(0, 'fill', 1)),
  item([shape({ shape: same(hex), size: same(3), fill: steps(0, 1) })], f(0, 'fill'), f(0, 'shape', circ), f(0, 'size', 1)),
  item([group({ count: each([1, 3, 5]), shape: same(circ), fill: same(3) })], f(0, 'count'), f(0, 'shape', tri), f(0, 'fill', 0)),
  item([shape({ shape: same(sq), size: same(2), fill: same(0) }), dot({ pos: steps(1, 2) })], f(1, 'pos'), f(0, 'shape', circ), f(0, 'fill', 3)),
  item([shape({ shape: same(star), size: each([0, 2, 4], 2), fill: same(3) })], f(0, 'size'), f(0, 'shape', dia), f(0, 'fill', 1)),
  item([lines({ lines: each([S(0, 2), S(1, 3), S(4, 5)]) })], bit(0, 'lines', 1), bit(0, 'lines', 4), bit(0, 'lines', 7)),
  item([shape({ shape: steps(tri, 1), size: same(3), fill: same(0) })], f(0, 'shape'), f(0, 'fill', 2), f(0, 'size', 1)),
  item([shape({ shape: same(circ), size: steps(0, 1, 1), fill: same(1) })], f(0, 'size'), f(0, 'shape', hex), f(0, 'fill', 3)),

  // ---- set 2: two rules at once ------------------------------------------------------------------
  item([shape({ shape: each([circ, sq, tri]), fill: rows(0, 3, 1), size: same(3) })], f(0, 'shape'), f(0, 'fill'), f(0, 'size', 1)),
  item([group({ count: steps(1, 1, 1), shape: each([circ, sq, tri], 2), fill: same(3) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill', 0)),
  item([shape({ shape: same(sq), size: steps(0, 2), fill: steps(1, 1) })], f(0, 'size'), f(0, 'fill'), f(0, 'shape', circ)),
  item([shape({ shape: each([tri, circ, star]), size: each([1, 2, 4], 2), fill: same(0) })], f(0, 'shape'), f(0, 'size'), f(0, 'fill', 3)),
  item([shape({ shape: each([sq, circ, hex]), size: same(3), fill: same(0) }, 'outer'), arrow({ rot: steps(0, 1, 3) })], f(0, 'shape'), f(1, 'rot'), f(0, 'fill', 1)),
  item([shape({ shape: same(circ), size: same(2), fill: each([0, 2, 3]) }), dot({ pos: steps(0, 2, 1) })], f(1, 'pos'), f(0, 'fill'), f(0, 'shape', tri)),
  item([group({ count: each([2, 4, 6]), shape: same(star), fill: each([0, 1, 3], 2) })], f(0, 'count'), f(0, 'fill'), f(0, 'shape', circ)),
  item([shape({ shape: rows(circ, sq, hex), size: same(3), fill: same(0) }, 'outer'), shape({ shape: each([tri, star, circ]), size: same(2), fill: same(3) }, 'inner')], f(0, 'shape'), f(1, 'shape'), f(1, 'fill', 0)),
  item([shape({ shape: steps(hex, -1), fill: rows(1, 3, 0), size: same(3) })], f(0, 'shape'), f(0, 'fill'), f(0, 'size', 1)),
  item([group({ count: steps(1, 2, 1), shape: each([sq, circ, tri]), fill: same(3) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill', 1)),
  item([shape({ shape: same(circ), size: same(3), fill: same(0) }, 'outer'), shape({ shape: each([tri, sq, star], 2), size: same(2), fill: steps(1, 1) }, 'inner')], f(1, 'shape'), f(1, 'fill'), f(0, 'shape', sq)),
  item([shape({ shape: same(dia), size: steps(0, 1), fill: same(3) }), dot({ pos: steps(0, 1, 3) })], f(1, 'pos'), f(0, 'size'), f(0, 'shape', circ)),

  // ---- set 3: the third picture is made from the first two ----------------------------------------
  item([group({ count: add([1, 2, 3], [2, 3, 4]), shape: same(circ), fill: same(3) })], f(0, 'count'), f(0, 'shape', sq), f(0, 'fill', 0)),
  item([lines({ lines: or([S(0), S(3), S(4)], [S(2), S(1), S(5)]) })], bit(0, 'lines', 4), bit(0, 'lines', 6), bit(0, 'lines', 7)),
  item([group({ count: sub([5, 7, 9], [2, 3, 4]), shape: same(sq), fill: same(0) })], f(0, 'count'), f(0, 'shape', tri), f(0, 'fill', 3)),
  item([dots({ dots: or([S(0, 4), S(2, 4), S(1, 4)], [S(4, 8), S(4, 6), S(4, 7)]) })], bit(0, 'dots', 4), bit(0, 'dots', 0), bit(0, 'dots', 8)),
  item([lines({ lines: diff([S(0, 1, 2, 3), S(4, 5, 7), S(0, 1, 2, 3)], [S(0), S(7), S(1, 3)]) })], bit(0, 'lines', 1), bit(0, 'lines', 3), bit(0, 'lines', 0)),
  item([group({ count: add([1, 2, 1], [1, 2, 4]), shape: each([tri, circ, sq]), fill: same(3) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill', 1)),
  item([lines({ lines: or([S(0, 4), S(2, 5), S(6, 1)], [S(1, 4), S(3, 5), S(7, 1)]) })], bit(0, 'lines', 1), bit(0, 'lines', 0), bit(0, 'lines', 3)),
  item([dots({ dots: diff([S(0, 1, 2, 4), S(3, 4, 5, 7), S(4, 6, 7, 8)], [S(1, 4), S(4, 7), S(4, 6)]) })], bit(0, 'dots', 4), bit(0, 'dots', 6), bit(0, 'dots', 7)),
  item([group({ count: sub([9, 8, 7], [3, 4, 2]), shape: same(tri), fill: rows(3, 0, 2) })], f(0, 'count'), f(0, 'fill'), f(0, 'shape', circ)),
  item([shape({ shape: each([circ, sq, hex], 2), size: same(3), fill: same(0) }, 'outer'), shape({ shape: same(star), size: same(2), fill: steps(1, 1) }, 'inner')], f(0, 'shape'), f(1, 'fill'), f(1, 'shape', circ)),
  item([lines({ lines: or([S(0, 6), S(1, 7), S(4, 0)], [S(2, 6), S(3, 7), S(4, 2)]) }), dot({ pos: steps(1, 2) })], bit(0, 'lines', 4), bit(0, 'lines', 1), f(1, 'pos')),
  item([group({ count: sub([6, 8, 9], [1, 3, 5]), shape: each([circ, sq, star]), fill: each([0, 1, 3], 2) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill')),

  // ---- set 4: three rules at once -----------------------------------------------------------------
  item([shape({ shape: each([circ, tri, sq]), size: each([1, 2, 4], 2), fill: each([0, 2, 3]) })], f(0, 'shape'), f(0, 'size'), f(0, 'fill')),
  item([shape({ shape: each([sq, circ, pent]), size: same(3), fill: same(0) }, 'outer'), shape({ shape: each([tri, star, circ], 2), size: same(2), fill: rows(3, 1, 0) }, 'inner')], f(0, 'shape'), f(1, 'shape'), f(1, 'fill')),
  item([group({ count: steps(2, 1, 2), shape: each([sq, tri, circ], 2), fill: each([0, 1, 3]) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill')),
  item([shape({ shape: each([hex, circ, sq]), size: each([0, 2, 4], 2), fill: same(0) }, 'outer'), arrow({ rot: steps(0, 3, 1) })], f(1, 'rot'), f(0, 'shape'), f(0, 'size')),
  item([shape({ shape: each([circ, sq, tri], 2), size: same(2), fill: each([0, 2, 3]) }), dot({ pos: steps(0, 3) })], f(1, 'pos'), f(0, 'shape'), f(0, 'fill')),
  item([shape({ shape: steps(sq, 1), size: same(3), fill: same(0) }, 'outer'), shape({ shape: each([circ, star, dia]), size: same(2), fill: each([1, 2, 3], 2) }, 'inner')], f(0, 'shape'), f(1, 'shape'), f(1, 'fill')),
  item([group({ count: add([1, 2, 3], [3, 1, 2]), shape: each([circ, sq, tri]), fill: steps(1, 1) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill')),
  item([lines({ lines: each([S(6, 7), S(4, 5), S(0, 1, 2, 3)], 2) }), dot({ pos: steps(0, 2, 1) })], bit(0, 'lines', 4), bit(0, 'lines', 6), f(1, 'pos')),
  item([shape({ shape: each([dia, hex, star], 2), size: steps(0, 1, 1), fill: each([0, 1, 3]) })], f(0, 'size'), f(0, 'shape'), f(0, 'fill')),
  item([group({ count: each([3, 5, 8], 2), shape: each([star, circ, sq]), fill: rows(3, 0, 1) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill')),
  item([shape({ shape: each([circ, pent, sq], 2), size: each([0, 2, 4]), fill: same(0) }, 'outer'), arrow({ rot: steps(1, 2, 1) })], f(1, 'rot'), f(0, 'shape'), f(0, 'size')),
  item([shape({ shape: rows(hex, circ, sq), size: same(3), fill: same(0) }, 'outer'), shape({ shape: each([tri, star, dia]), size: steps(0, 1), fill: same(3) }, 'inner')], f(0, 'shape'), f(1, 'shape'), f(1, 'size')),

  // ---- set 5: only the differences survive, and the hardest mixes --------------------------------
  item([lines({ lines: xor([S(0, 4), S(1, 6), S(3, 0)], [S(0, 5), S(1, 7), S(3, 2)]) })], bit(0, 'lines', 3), bit(0, 'lines', 0), bit(0, 'lines', 5)),
  item([dots({ dots: xor([S(0, 4, 8), S(1, 4, 7), S(0, 1, 2)], [S(2, 4, 6), S(3, 4, 5), S(2, 5, 8)]) })], bit(0, 'dots', 2), bit(0, 'dots', 4), bit(0, 'dots', 8)),
  item([lines({ lines: xor([S(0, 1), S(3, 4), S(6, 7)], [S(1, 2), S(4, 5), S(7, 0)]) }), dot({ pos: steps(2, 1, 3) })], bit(0, 'lines', 7), bit(0, 'lines', 6), f(1, 'pos')),
  item([shape({ shape: each([star, hex, tri], 2), size: each([0, 2, 4]), fill: steps(3, -1) })], f(0, 'shape'), f(0, 'size'), f(0, 'fill')),
  item([dots({ dots: xor([S(0, 1, 3, 4), S(3, 4, 6, 7), S(0, 4, 8)], [S(1, 2, 4, 5), S(4, 5, 7, 8), S(0, 1, 2)]) })], bit(0, 'dots', 0), bit(0, 'dots', 4), bit(0, 'dots', 6)),
  item([lines({ lines: xor([S(0, 4, 6), S(1, 2, 7), S(0, 1, 4)], [S(0, 5, 6), S(2, 3, 7), S(1, 5, 7)]) })], bit(0, 'lines', 1), bit(0, 'lines', 5), bit(0, 'lines', 6)),
  item([shape({ shape: each([circ, sq, hex]), size: each([0, 2, 4], 2), fill: same(0) }, 'outer'), arrow({ rot: steps(0, -1, -3) })], f(1, 'rot'), f(0, 'shape'), f(0, 'size')),
  item([group({ count: sub([9, 7, 8], [4, 2, 5]), shape: each([tri, sq, circ], 2), fill: each([3, 0, 1]) })], f(0, 'count'), f(0, 'shape'), f(0, 'fill')),
  item([lines({ lines: xor([S(4, 5, 6), S(0, 2, 6), S(4, 6, 0)], [S(5, 6, 7), S(1, 3, 6), S(5, 6, 2)]) })], bit(0, 'lines', 6), bit(0, 'lines', 4), bit(0, 'lines', 1)),
  item([shape({ shape: each([tri, circ, sq]), size: same(2), fill: each([1, 3, 0], 2) }), dot({ pos: steps(0, -2, -1) })], f(1, 'pos'), f(0, 'shape'), f(0, 'fill')),
  item([dots({ dots: xor([S(0, 2, 6, 8), S(1, 3, 5, 7), S(0, 1, 2, 4)], [S(0, 4, 8), S(1, 4, 7), S(2, 4, 5, 8)]) })], bit(0, 'dots', 2), bit(0, 'dots', 4), bit(0, 'dots', 0)),
  item([lines({ lines: xor([S(0, 1, 4), S(2, 3, 6), S(4, 6, 1)], [S(1, 2, 5), S(3, 0, 7), S(5, 6, 3)]) }), dot({ pos: steps(0, 3, 1) })], bit(0, 'lines', 6), bit(0, 'lines', 4), f(1, 'pos')),
]

/** Practice puzzles for the lesson, three per rule; the first of each is the worked example. */
export const PRACTICE: Record<Family, ItemSpec[]> = {
  constant: [
    item([shape({ shape: rows(sq, star, circ), size: same(3), fill: same(2) })], f(0, 'shape'), f(0, 'size', 1), f(0, 'fill', 0)),
    item([group({ count: rows(2, 5, 3), shape: same(tri), fill: same(3) })], f(0, 'count'), f(0, 'shape', sq), f(0, 'fill', 0)),
    item([shape({ shape: same(hex), size: same(3), fill: same(0) }, 'outer'), shape({ shape: rows(star, circ, tri), size: same(2), fill: rows(3, 1, 2) }, 'inner')], f(1, 'shape'), f(1, 'fill'), f(0, 'shape', circ)),
  ],
  progression: [
    item([group({ count: steps(2, 2), shape: same(circ), fill: same(3) })], f(0, 'count'), f(0, 'shape', sq), f(0, 'fill', 1)),
    item([shape({ shape: same(circ), size: same(3), fill: same(0) }, 'outer'), arrow({ rot: steps(0, 1, 2) })], f(1, 'rot'), f(0, 'shape', sq), f(0, 'fill', 1)),
    item([shape({ shape: same(sq), size: steps(4, -1, -1), fill: steps(3, -1) })], f(0, 'size'), f(0, 'fill'), f(0, 'shape', circ)),
  ],
  distribution: [
    item([shape({ shape: each([circ, tri, sq]), size: same(3), fill: same(3) })], f(0, 'shape'), f(0, 'size', 1), f(0, 'fill', 0)),
    item([group({ count: each([1, 4, 7], 2), shape: same(sq), fill: same(3) })], f(0, 'count'), f(0, 'shape', circ), f(0, 'fill', 0)),
    item([lines({ lines: each([S(6, 7), S(4, 5), S(0, 1, 2, 3)]) })], bit(0, 'lines', 4), bit(0, 'lines', 6), bit(0, 'lines', 0)),
  ],
  combine: [
    item([group({ count: add([1, 2, 3], [1, 2, 1]), shape: same(circ), fill: same(3) })], f(0, 'count'), f(0, 'shape', tri), f(0, 'fill', 0)),
    item([lines({ lines: or([S(6), S(0, 2), S(4)], [S(7), S(1, 3), S(5)]) })], bit(0, 'lines', 4), bit(0, 'lines', 0), bit(0, 'lines', 7)),
    item([dots({ dots: diff([S(0, 1, 2, 3, 5, 6, 7, 8), S(0, 1, 2, 3, 5, 6, 7, 8), S(0, 1, 2, 3, 5, 6, 7, 8)], [S(1, 7), S(3, 5), S(0, 8)]) })], bit(0, 'dots', 0), bit(0, 'dots', 2), bit(0, 'dots', 4)),
  ],
  xor: [
    item([lines({ lines: xor([S(0, 6), S(3, 7), S(0, 4)], [S(2, 6), S(1, 7), S(0, 5)]) })], bit(0, 'lines', 0), bit(0, 'lines', 4), bit(0, 'lines', 6)),
    item([dots({ dots: xor([S(0, 4), S(2, 4), S(3, 4)], [S(4, 8), S(4, 6), S(4, 5)]) })], bit(0, 'dots', 4), bit(0, 'dots', 3), bit(0, 'dots', 1)),
    item([lines({ lines: xor([S(4, 5), S(0, 1), S(6, 7)], [S(5, 6), S(1, 2), S(7, 3)]) })], bit(0, 'lines', 7), bit(0, 'lines', 3), bit(0, 'lines', 2)),
  ],
}

export const PER_SET = 12
export const testItems: Item[] = buildBank(TEST, 1990)
export const practiceItems = Object.fromEntries(FAMILIES.map((fam, i) => [fam, buildBank(PRACTICE[fam], 101 + i)])) as Record<Family, Item[]>
