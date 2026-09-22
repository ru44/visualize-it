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
