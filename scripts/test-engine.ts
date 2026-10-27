// Known-answer tests for the numerical engine. Run with `npm test`; CI runs it before every deploy.
import { analyzeLimit, integrateChecked, polynomialRealRoots, scanRoots } from '../src/engine/analysis'
import { makeFn } from '../src/engine/math'

let failed = 0
const ok = (name: string, cond: boolean, got: unknown) => {
  if (!cond) failed++
  console.log(`${cond ? '✓' : '✗'} ${name}${cond ? '' : '  → got ' + JSON.stringify(got)}`)
}
const near = (a: number, b: number, tol = 1e-7) => Math.abs(a - b) <= tol * (1 + Math.abs(b))
const fn = (e: string) => { const f = makeFn(e); return (x: number) => f(x) }

// ---- limits -----------------------------------------------------------------------------------
const lim = (e: string, a: number) => analyzeLimit(fn(e), a)
const finite: [string, number, number][] = [
  ['sin(x)/x', 0, 1], ['(1 - cos(x))/x^2', 0, 0.5], ['(exp(x) - 1)/x', 0, 1], ['(x^2 - 1)/(x - 1)', 1, 2],
  ['(1 + x)^(1/x)', 0, Math.E], ['tan(3x)/x', 0, 3], ['(sqrt(x + 4) - 2)/x', 0, 0.25], ['x^2 + 1', 2, 5],
  ['(2x^2 + 1)/(x^2 + 5)', Infinity, 2], ['(1 + 1/x)^x', Infinity, Math.E], ['atan(x)', -Infinity, -Math.PI / 2], ['log(x)/(x - 1)', 1, 1],
  ['x*sin(1/x)', 0, 0],
]
for (const [e, a, want] of finite) { const r = lim(e, a); ok(`lim ${e} @ ${a} = ${want}`, r.kind === 'finite' && near(r.value, want, 1e-6), r) }
ok('lim 1/x @ 0 does not exist', lim('1/x', 0).kind === 'dne', lim('1/x', 0))
ok('lim 1/x^2 @ 0 = +∞', (() => { const r = lim('1/x^2', 0); return r.kind === 'infinite' && r.sign === 1 })(), lim('1/x^2', 0))
ok('lim -1/x^2 @ 0 = −∞', (() => { const r = lim('-1/x^2', 0); return r.kind === 'infinite' && r.sign === -1 })(), lim('-1/x^2', 0))
ok('lim abs(x)/x @ 0 does not exist', lim('abs(x)/x', 0).kind === 'dne', lim('abs(x)/x', 0))
ok('lim sin(1/x) @ 0 is not reported as a number', lim('sin(1/x)', 0).kind !== 'finite', lim('sin(1/x)', 0))
ok('lim x^2 @ ∞ = +∞', lim('x^2', Infinity).kind === 'infinite', lim('x^2', Infinity))
ok('lim sin(x) @ ∞ is not reported as a number', lim('sin(x)', Infinity).kind !== 'finite', lim('sin(x)', Infinity))

// ---- integrals --------------------------------------------------------------------------------
const int = (e: string, a: number, b: number) => integrateChecked(fn(e), a, b, e)
ok('∫0..4 x^2 = 64/3 exactly', (() => { const r = int('x^2', 0, 4); return r.kind === 'exact' && r.frac.n === 64n || (r.kind === 'exact' && Number(r.frac.n) === 64 && Number(r.frac.d) === 3) })(), int('x^2', 0, 4))
ok('∫-1..2 (x^3 - 2x + 1) = 15/4 exactly', (() => { const r = int('x^3 - 2x + 1', -1, 2); return r.kind === 'exact' && near(r.value, 3.75, 1e-12) })(), int('x^3 - 2x + 1', -1, 2))
const numeric: [string, number, number, number][] = [
  ['sin(x)', 0, Math.PI, 2], ['exp(x)', 0, 1, Math.E - 1], ['1/x', 1, Math.E, 1], ['exp(-x^2)', -6, 6, Math.sqrt(Math.PI)], ['cos(x)^2', 0, 2 * Math.PI, Math.PI], ['1/(1 + x^2)', 0, 1, Math.PI / 4],
]
for (const [e, a, b, want] of numeric) { const r = int(e, a, b); ok(`∫ ${e} on [${a.toFixed(2)}, ${b.toFixed(2)}]`, r.kind === 'numeric' && Math.abs(r.value - want) <= Math.max(r.err * 20, 1e-9), r) }
ok('∫-1..1 1/x is flagged singular', int('1/x', -1, 1).kind === 'singular', int('1/x', -1, 1))
ok('∫0..1 log(x) is flagged singular', int('log(x)', 0, 1).kind === 'singular', int('log(x)', 0, 1))
ok('∫0..2 tan(x) is not reported as trustworthy', ['singular', 'unreliable'].includes(int('tan(x)', 0, 2).kind), int('tan(x)', 0, 2))

// ---- roots ------------------------------------------------------------------------------------
const same = (got: number[], want: number[]) => got.length === want.length && got.every((g, i) => near(g, want[i], 1e-7))
ok('x^3 - 6x^2 + 11x - 6 → 1, 2, 3', same(polynomialRealRoots([-6, 11, -6, 1]), [1, 2, 3]), polynomialRealRoots([-6, 11, -6, 1]))
ok('(x-1)^2 (x+2) → −2, 1 (double root found once)', same(polynomialRealRoots([2, -3, 0, 1]), [-2, 1]), polynomialRealRoots([2, -3, 0, 1]))
ok('x^4 + 1 → no real roots', same(polynomialRealRoots([1, 0, 0, 0, 1]), []), polynomialRealRoots([1, 0, 0, 0, 1]))
ok('x^5 - x → −1, 0, 1', same(polynomialRealRoots([0, -1, 0, 0, 0, 1]), [-1, 0, 1]), polynomialRealRoots([0, -1, 0, 0, 0, 1]))
ok('cos(x) = x → 0.7390851332', same(scanRoots(fn('cos(x) - x')), [0.7390851332151607]), scanRoots(fn('cos(x) - x')))
ok('exp(x) = 3 → ln 3', same(scanRoots(fn('exp(x) - 3')), [Math.log(3)]), scanRoots(fn('exp(x) - 3')))
ok('1/x = 0 has no root (pole is not a root)', same(scanRoots(fn('1/x')), []), scanRoots(fn('1/x')))
ok('tan(x) = 0 on [−4, 4] → −π, 0, π (poles rejected)', same(scanRoots(fn('tan(x)'), -4, 4), [-Math.PI, 0, Math.PI]), scanRoots(fn('tan(x)'), -4, 4))
ok('(x - 2)^2 = 0 tangential root found', same(scanRoots(fn('(x - 2)^2')), [2]), scanRoots(fn('(x - 2)^2')))
ok('x^2 + 1 = 0 has no real root', same(scanRoots(fn('x^2 + 1')), []), scanRoots(fn('x^2 + 1')))

console.log(failed ? `\n${failed} FAILED` : '\nall engine tests passed')
if (failed) process.exit(1)

// ---- combinatorics & probability ---------------------------------------------------------------
import { factorial, permutations, combinations, binomialPmf, poissonPmf, normalCdf } from '../src/engine/stats'
let f2 = 0
const ok2 = (name: string, cond: boolean, got: unknown) => { if (!cond) f2++; console.log(`${cond ? '✓' : '✗'} ${name}${cond ? '' : '  → got ' + String(got)}`) }
ok2('0! = 1', factorial(0) === 1n, factorial(0))
ok2('10! = 3628800', factorial(10) === 3628800n, factorial(10))
ok2('25! exact', factorial(25) === 15511210043330985984000000n, factorial(25))
ok2('C(5,2) = 10', combinations(5, 2) === 10n, combinations(5, 2))
ok2('C(52,5) = 2598960', combinations(52, 5) === 2598960n, combinations(52, 5))
ok2('C(100,50) exact', combinations(100, 50) === 100891344545564193334812497256n, combinations(100, 50))
ok2('C(n,k) = C(n,n−k)', combinations(30, 7) === combinations(30, 23), null)
ok2('C(5,7) = 0', combinations(5, 7) === 0n, combinations(5, 7))
ok2('P(5,2) = 20', permutations(5, 2) === 20n, permutations(5, 2))
ok2('P(10,10) = 10!', permutations(10, 10) === factorial(10), permutations(10, 10))
ok2('P(n,k) = C(n,k)·k!', permutations(12, 5) === combinations(12, 5) * factorial(5), null)
ok2('binomial pmf sums to 1', Math.abs(Array.from({ length: 21 }, (_, k) => binomialPmf(20, k, 0.3)).reduce((a, b) => a + b) - 1) < 1e-12, null)
ok2('binomial(10,3,0.5) = 120/1024', near(binomialPmf(10, 3, 0.5), 120 / 1024, 1e-12), binomialPmf(10, 3, 0.5))
ok2('poisson(2,0) = e^-2', near(poissonPmf(2, 0), Math.exp(-2), 1e-12), poissonPmf(2, 0))
ok2('poisson(3,2) = 9e^-3/2', near(poissonPmf(3, 2), (9 * Math.exp(-3)) / 2, 1e-12), poissonPmf(3, 2))
ok2('poisson pmf sums to 1', Math.abs(Array.from({ length: 60 }, (_, k) => poissonPmf(4, k)).reduce((a, b) => a + b) - 1) < 1e-12, null)
ok2('Φ(0) = 0.5', near(normalCdf(0), 0.5, 1e-7), normalCdf(0))
ok2('Φ(1.96) ≈ 0.9750', Math.abs(normalCdf(1.96) - 0.9750021) < 2e-7, normalCdf(1.96))
ok2('Φ(−1) ≈ 0.1587', Math.abs(normalCdf(-1) - 0.1586553) < 2e-7, normalCdf(-1))
ok2('68–95–99.7', Math.abs(normalCdf(1) - normalCdf(-1) - 0.6826895) < 3e-7 && Math.abs(normalCdf(2) - normalCdf(-2) - 0.9544997) < 3e-7, null)
if (f2) { console.log(`\n${f2} FAILED (stats)`); process.exit(1) }
console.log('all stats tests passed')

// ---- zeta -------------------------------------------------------------------------------------
import { zeta, zetaC } from '../src/engine/zeta'
let f3 = 0
const ok3 = (name: string, cond: boolean, got: unknown) => {
  if (!cond) f3++
  console.log(`${cond ? '✓' : '✗'} ${name}${cond ? '' : '  → got ' + JSON.stringify(got)}`)
}
ok3('ζ(2) = π²/6', near(zeta(2), Math.PI ** 2 / 6, 1e-10), zeta(2))
ok3('ζ(4) = π⁴/90', near(zeta(4), Math.PI ** 4 / 90, 1e-10), zeta(4))
ok3('ζ(−1) = −1/12', near(zeta(-1), -1 / 12, 1e-10), zeta(-1))
ok3('ζ(0) = −1/2', near(zeta(0), -0.5, 1e-10), zeta(0))
ok3('ζ(−2) = 0', Math.abs(zeta(-2)) < 1e-10, zeta(-2))
ok3('ζ(−3) = 1/120', near(zeta(-3), 1 / 120, 1e-9), zeta(-3))
ok3('ζ(1/2) ≈ −1.4603545', near(zeta(0.5), -1.4603545088, 1e-8), zeta(0.5))
ok3('ζ(1/2 + 14.134725i) ≈ 0 (first zero)', Math.hypot(...zetaC(0.5, 14.134725142)) < 1e-6, zetaC(0.5, 14.134725142))
ok3('ζ(2 + 3i) ≈ 0.7980 − 0.1138i', (() => { const [a, b] = zetaC(2, 3); return Math.abs(a - 0.7980219851) < 1e-7 && Math.abs(b + 0.1137443081) < 1e-7 })(), zetaC(2, 3))
if (f3) { console.log(`\n${f3} FAILED (zeta)`); process.exit(1) }
console.log('all zeta tests passed')

// ---- pattern test -----------------------------------------------------------------------------
// Every item must have exactly one answer that a careful solver can reach, and the options must
// not give it away. The solver below tries every rule the lesson teaches, along rows and down
// columns; any rule that fits all eight visible pictures must predict the same missing value.
import { testItems, practiceItems, PER_SET } from '../src/patterns/items'
import { draw } from '../src/patterns/draw'
import { KIND_ATTRS, RANGE, MOD, isSet, isFlat, ruleOf, wrap, type Attr, type Item } from '../src/patterns/engine'
let f4 = 0
const ok4 = (name: string, cond: boolean, got: unknown) => {
  if (!cond) f4++
  if (!cond) console.log(`✗ ${name}  → got ${JSON.stringify(got)}`)
}
function predictions(g: number[][], attr: Attr): number[] {
  const out = new Set<number>()
  const dif = (a: number, b: number) => (MOD[attr] ? wrap(attr, b - a) : b - a)
  const reads = [(i: number) => g[i], (i: number) => [g[0][i], g[1][i], g[2][i]]]
  const sorted = (a: number[]) => [...a].sort((x, y) => x - y).join()
  const ops: ((a: number, b: number) => number)[] = isSet(attr) ? [(a, b) => a | b, (a, b) => a & b, (a, b) => a ^ b, (a, b) => a & ~b, (a, b) => b & ~a] : attr === 'count' ? [(a, b) => a + b, (a, b) => a - b, (a, b) => b - a] : []
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
function checkItem(it: Item, name: string) {
  const look = (c: Item['cells'][number]) => JSON.stringify(draw(c))
  const looks = it.options.map(look)
  ok4(`${name}: eight options that all look different`, looks.length === 8 && new Set(looks).size === 8, looks.length)
  ok4(`${name}: the answer is the missing picture`, looks[it.answer] === look(it.cells[8]) && looks.filter((l) => l === look(it.cells[8])).length === 1, it.answer)
  ok4(`${name}: no blank pictures`, [...it.cells, ...it.options].every((c) => draw(c).length > 0), null)
  const spec = it.spec
  spec.parts.forEach((p, k) => {
    for (const attr of KIND_ATTRS[p.kind]) {
      const [lo, hi] = RANGE[attr]
      const vals = [...it.cells, ...it.options].map((c) => c[k].v[attr]!)
      ok4(`${name}: ${p.kind}.${attr} stays within ${lo}–${hi}`, vals.every((v) => Number.isInteger(v) && v >= lo && v <= hi), vals)
      const dims = spec.dims.filter((d) => d.part === k && d.attr === attr)
      if (!isFlat(ruleOf(p, attr))) ok4(`${name}: ${p.kind}.${attr} follows a rule, so the options must test it`, dims.length > 0, null)
      if (!dims.length) continue
      const g = [0, 1, 2].map((r) => [0, 1, 2].map((c) => it.cells[r * 3 + c][k].v[attr]!))
      const pred = predictions(g, attr)
      ok4(`${name}: ${p.kind}.${attr} has one answer a solver can reach`, pred.length === 1 && pred[0] === g[2][2], { predicts: pred, truth: g[2][2] })
    }
  })
  const bits = it.dims.filter((d) => d.bit !== undefined)
  // If every toggled stroke were extra, the answer would be the option with the fewest lines.
  if (bits.length >= 2) ok4(`${name}: toggled strokes both add and remove`, bits.some((d) => d.right & (1 << d.bit!)) && bits.some((d) => !(d.right & (1 << d.bit!))), bits)
  ok4(`${name}: three different features`, new Set(it.dims.map((d) => `${d.part}.${d.attr}.${d.bit}`)).size === 3, it.dims)
  for (const [k, p] of spec.parts.entries()) {
    const at = (attr: Attr) => [...it.cells, ...it.options].map((c) => c[k].v[attr]!)
    if (p.role === 'outer') ok4(`${name}: outer figures leave room inside`, at('shape').every((s) => [1, 2, 3, 4].includes(s)) && at('fill').every((x) => x <= 1), at('shape'))
    if (p.kind === 'group') ok4(`${name}: small copies use shapes that stay distinct when small`, at('shape').every((s) => ![2, 3].includes(s)), at('shape'))
    if (p.kind === 'shape' && p.role === 'main' && spec.parts.some((q) => q.kind === 'dot')) ok4(`${name}: the figure clears the dot's ring`, at('size').every((s) => s <= 2), at('size'))
  }
}
ok4('the test has 60 items in five sets of twelve', testItems.length === 60 && PER_SET * 5 === 60, testItems.length)
testItems.forEach((it) => checkItem(it, `item ${it.n}`))
for (const [fam, items] of Object.entries(practiceItems)) items.forEach((it) => checkItem(it, `practice ${fam} ${it.n}`))
const places = Array.from({ length: 8 }, (_, p) => testItems.filter((it) => it.answer === p).length)
ok4('right answers spread evenly over the eight places', Math.max(...places) - Math.min(...places) <= 1, places)
const allLooks = testItems.map((it) => JSON.stringify(it.cells.map((c) => draw(c))))
ok4('no item repeats another', new Set(allLooks).size === allLooks.length, null)
if (f4) { console.log(`\n${f4} FAILED (pattern test)`); process.exit(1) }
console.log(`all pattern-test checks passed (${testItems.length} items, ${Object.values(practiceItems).flat().length} practice)`)
import { roughIq } from '../src/patterns/engine'
const iqs = Array.from({ length: 61 }, (_, r) => roughIq(r))
ok4('the rough IQ puts the assumed average adult (42/60) at 100', iqs[42].iq === 100, iqs[42])
ok4('the rough IQ rises with every right answer', iqs.every((x, r) => r === 0 || x.iq > iqs[r - 1].iq), iqs.map((x) => x.iq))
ok4('a perfect score stays a modest estimate', iqs[60].iq <= 135 && iqs[60].iq >= 125, iqs[60])
ok4('very low scores give no number', iqs[20].tooLow && !iqs[30].tooLow, [iqs[20], iqs[30]])
if (f4) { console.log(`\n${f4} FAILED (rough IQ)`); process.exit(1) }
console.log('rough IQ checks passed')
