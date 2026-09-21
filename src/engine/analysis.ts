// Numerical analysis with honest error reporting. Every routine returns either a value WITH an
// error estimate, or an explicit statement that no trustworthy value exists. Nothing is guessed.
import { fraction, rationalize, type Fraction } from 'mathjs'

export type F1 = (x: number) => number

// ---------------------------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------------------------
export type OneSided = { kind: 'finite'; value: number; err: number } | { kind: 'infinite'; sign: 1 | -1 } | { kind: 'unknown' }
export type LimitResult =
  | { kind: 'finite'; value: number; err: number; left: OneSided; right: OneSided }
  | { kind: 'infinite'; sign: 1 | -1; left: OneSided; right: OneSided }
  | { kind: 'dne'; left: OneSided; right: OneSided }
  | { kind: 'unknown'; left: OneSided; right: OneSided }

/** lim of g(h) as h → 0⁺, by Richardson extrapolation over h = 2^-k. */
function limitFromRight(g: F1): OneSided {
  const v: number[] = []
  for (let k = 2; k <= 13; k++) v.push(g(2 ** -k))
  if (v.slice(-8).some((y) => !Number.isFinite(y))) return { kind: 'unknown' }

  // Extrapolation table: removes error terms proportional to h, h², h³ …
  let row = v.slice()
  let best = { value: row[row.length - 1], err: Math.abs(row[row.length - 1] - row[row.length - 2]) }
  for (let j = 1; j <= 4; j++) {
    const next: number[] = []
    for (let k = 1; k < row.length; k++) next.push(row[k] + (row[k] - row[k - 1]) / (2 ** j - 1))
    row = next
    const err = Math.abs(row[row.length - 1] - row[row.length - 2])
    if (err < best.err) best = { value: row[row.length - 1], err }
  }
  const scale = 1 + Math.abs(best.value)
  if (best.err < 1e-7 * scale) return { kind: 'finite', value: best.value, err: Math.max(best.err, 1e-12 * scale) }
  // Squeezed to zero (e.g. x·sin(1/x)): it wiggles, but inside an envelope that collapses.
  const env = (from: number, to: number) => Math.max(...v.slice(from, to).map(Math.abs))
  if (env(8, 12) < 1e-3 && env(8, 12) < 0.2 * env(4, 8) && env(4, 8) < 0.2 * env(0, 4) + 1e-300) return { kind: 'finite', value: 0, err: env(8, 12) }

  // Not converging: is it running away to ±∞? Magnitude must keep growing and end up large.
  const tail = v.slice(-7)
  const growing = tail.every((y, i) => i === 0 || Math.abs(y) > Math.abs(tail[i - 1]) * 1.2)
  const sameSign = tail.every((y) => Math.sign(y) === Math.sign(tail[0]))
  if (growing && sameSign && Math.abs(tail[6]) > 1e3) return { kind: 'infinite', sign: tail[0] > 0 ? 1 : -1 }
  return { kind: 'unknown' }
}

export function analyzeLimit(f: F1, a: number): LimitResult {
  if (!Number.isFinite(a)) {
    const s = a > 0 ? 1 : -1
    const side = limitFromRight((h) => f(s / h))
    const none: OneSided = { kind: 'unknown' }
    if (side.kind === 'finite') return { ...side, left: s > 0 ? side : none, right: s > 0 ? none : side }
    if (side.kind === 'infinite') return { kind: 'infinite', sign: side.sign, left: side, right: side }
    return { kind: 'unknown', left: none, right: none }
  }
  const right = limitFromRight((h) => f(a + h))
  const left = limitFromRight((h) => f(a - h))
  if (left.kind === 'finite' && right.kind === 'finite') {
    const tol = 1e-6 * (1 + Math.abs(left.value)) + left.err + right.err
    if (Math.abs(left.value - right.value) <= tol) {
      const value = (left.value + right.value) / 2
      return { kind: 'finite', value: Math.abs(value) < 1e-12 ? 0 : value, err: Math.max(left.err, right.err, Math.abs(left.value - right.value)), left, right }
    }
    return { kind: 'dne', left, right }
  }
  if (left.kind === 'infinite' && right.kind === 'infinite' && left.sign === right.sign) return { kind: 'infinite', sign: left.sign, left, right }
  if (left.kind === 'unknown' || right.kind === 'unknown') return { kind: 'unknown', left, right }
  return { kind: 'dne', left, right }
}

// ---------------------------------------------------------------------------------------------
// Definite integrals
// ---------------------------------------------------------------------------------------------
export type IntegralResult =
  | { kind: 'exact'; value: number; frac: Fraction }
  | { kind: 'numeric'; value: number; err: number }
  | { kind: 'singular'; at: number }
  | { kind: 'unreliable'; value: number; err: number }

function simpson(f: F1, a: number, b: number, n: number) {
  const h = (b - a) / n
  let s = f(a) + f(b)
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2)
  return (s * h) / 3
}

/**
 * Coefficients (lowest power first) when `expr` is a genuine polynomial in x, otherwise null.
 * mathjs happily "rationalizes" x/(1+x²) into numerator + denominator, so the denominator must be checked.
 */
export function polyCoeffs(expr: string): number[] | null {
  try {
    // `detailed` results also carry numerator/denominator, which mathjs' typings omit.
    const p = rationalize(expr, {}, true) as any
    if (p.variables.some((v: string) => v !== 'x')) return null
    const den = Number(p.denominator?.toString() ?? '1')
    if (!Number.isFinite(den) || den === 0) return null
    const c: number[] = p.coefficients.map((k: unknown) => Number(k) / den)
    if (c.some((k) => !Number.isFinite(k))) return null
    return c.length ? c : [Number(p.numerator.toString()) / den]
  } catch {
    return null
  }
}

/** A float that is really a simple rational (so "exact" arithmetic on it is honest). */
const isSimple = (v: number) => Number.isFinite(v) && Number(fraction(v).d) <= 10000 && Math.abs(fraction(v).valueOf() - v) < 1e-15

/** Exact value when the integrand is a polynomial: integrate term by term with rational arithmetic. */
function polynomialIntegral(expr: string, a: number, b: number): Fraction | null {
  try {
    const c = polyCoeffs(expr)
    if (!c || c.some((k) => Number.isNaN(k)) || ![a, b, ...c].every(isSimple)) return null
    const [fa, fb] = [fraction(a), fraction(b)]
    let total = fraction(0)
    c.forEach((coef, k) => {
      const term = fraction(coef).div(k + 1)
      total = total.add(term.mul(fb.pow(k + 1) as Fraction).sub(term.mul(fa.pow(k + 1) as Fraction)))
    })
    return total
  } catch {
    return null
  }
}

export function integrateChecked(f: F1, a: number, b: number, expr?: string): IntegralResult {
  for (let i = 0; i <= 2000; i++) {
    const x = a + ((b - a) * i) / 2000
    if (!Number.isFinite(f(x))) return { kind: 'singular', at: x }
  }
  if (expr) {
    const frac = polynomialIntegral(expr, a, b)
    if (frac) return { kind: 'exact', value: frac.valueOf(), frac }
  }
  const s1 = simpson(f, a, b, 2000)
  const s2 = simpson(f, a, b, 4000)
  const s3 = simpson(f, a, b, 8000)
  const err = Math.max(Math.abs(s3 - s2) / 15, 1e-14 * (1 + Math.abs(s3)))
  // If halving the step did not shrink the error roughly as expected, the integrand is not smooth enough to trust.
  const settled = Math.abs(s3 - s2) <= Math.abs(s2 - s1) + 1e-12 && err < 1e-6 * (1 + Math.abs(s3))
  return settled ? { kind: 'numeric', value: s3, err } : { kind: 'unreliable', value: s3, err: Math.abs(s3 - s2) }
}

// ---------------------------------------------------------------------------------------------
// Roots
// ---------------------------------------------------------------------------------------------
/** All real roots of a polynomial (coefficients lowest power first), via Durand–Kerner + Newton polish. */
export function polynomialRealRoots(coeffs: number[]): number[] {
  const c = coeffs.slice()
  while (c.length > 1 && Math.abs(c[c.length - 1]) < 1e-14) c.pop()
  const n = c.length - 1
  if (n < 1) return []
  const lead = c[n]
  const a = c.map((k) => k / lead)
  const evalC = (re: number, im: number) => {
    let [pr, pi] = [1, 0]
    for (let k = n - 1; k >= 0; k--) [pr, pi] = [pr * re - pi * im + a[k], pr * im + pi * re]
    return [pr, pi]
  }
  let z = Array.from({ length: n }, (_, k) => [0.4 * Math.cos(1 + (2 * Math.PI * k) / n) * (1 + k), 0.9 * Math.sin(1 + (2 * Math.PI * k) / n) * (1 + k)])
  const radius = 1 + Math.max(...a.slice(0, n).map(Math.abs))
  z = z.map(([re, im]) => [(re * radius) / n, (im * radius) / n])
  for (let it = 0; it < 500; it++) {
    let moved = 0
    for (let i = 0; i < n; i++) {
      const [pr, pi] = evalC(z[i][0], z[i][1])
      let [dr, di] = [1, 0]
      for (let j = 0; j < n; j++)
        if (j !== i) {
          const [er, ei] = [z[i][0] - z[j][0], z[i][1] - z[j][1]]
          ;[dr, di] = [dr * er - di * ei, dr * ei + di * er]
        }
      const den = dr * dr + di * di || 1e-300
      const [qr, qi] = [(pr * dr + pi * di) / den, (pi * dr - pr * di) / den]
      z[i] = [z[i][0] - qr, z[i][1] - qi]
      moved = Math.max(moved, Math.hypot(qr, qi))
    }
    if (moved < 1e-15) break
  }
  const p = (x: number) => c.reduceRight((s, k) => s * x + k, 0)
  const dp = (x: number) => c.slice(1).reduceRight((s, k, i) => s * x + k * (i + 1), 0)
  const scale = c.reduce((s, k) => s + Math.abs(k), 0)
  const out: number[] = []
  for (const [re, im] of z) {
    if (Math.abs(im) > 1e-6 * (1 + Math.abs(re))) continue
    let x = re
    for (let k = 0; k < 8; k++) {
      const d = dp(x)
      if (!d) break
      x -= p(x) / d
    }
    if (Math.abs(p(x)) <= 1e-8 * scale * (1 + Math.abs(x) ** n) && !out.some((r) => Math.abs(r - x) < 1e-6 * (1 + Math.abs(x)))) out.push(Math.abs(x) < 1e-12 ? 0 : x)
  }
  return out.sort((u, v) => u - v)
}

/** Real roots of any function on [lo, hi]: sign changes (bisection) plus tangential roots (|g| dips to 0). */
export function scanRoots(g: F1, lo = -50, hi = 50): number[] {
  const n = 20000
  const roots: number[] = []
  const push = (r: number) => {
    const scale = 1 + Math.abs(r)
    // A genuine root must survive a residual check AND not be a pole (values stay small nearby).
    if (Math.abs(g(r)) < 1e-8 && Math.abs(g(r + 1e-6 * scale)) < 1e-3 && !roots.some((q) => Math.abs(q - r) < 1e-6 * scale)) roots.push(Math.abs(r) < 1e-12 ? 0 : r)
  }
  let [xa, ya] = [lo, g(lo)]
  let [xp, yp] = [NaN, NaN]
  for (let i = 1; i <= n; i++) {
    const xb = lo + ((hi - lo) * i) / n
    const yb = g(xb)
    if (Number.isFinite(ya) && Number.isFinite(yb)) {
      if (ya === 0) push(xa)
      else if (ya * yb < 0) {
        let [a, b, fa] = [xa, xb, ya]
        for (let k = 0; k < 80; k++) {
          const m = (a + b) / 2
          const fm = g(m)
          if (fa * fm <= 0) b = m
          else [a, fa] = [m, fm]
        }
        push((a + b) / 2)
      } else if (Number.isFinite(yp) && Math.abs(ya) < Math.abs(yp) && Math.abs(ya) <= Math.abs(yb) && Math.abs(ya) < 1e-3) {
        // Local minimum of |g| close to zero: refine by golden-section search, keep only if it really reaches 0.
        let [a, b] = [xp, xb]
        const phi = (Math.sqrt(5) - 1) / 2
        for (let k = 0; k < 90; k++) {
          const [c1, c2] = [b - phi * (b - a), a + phi * (b - a)]
          if (Math.abs(g(c1)) < Math.abs(g(c2))) b = c2
          else a = c1
        }
        push((a + b) / 2)
      }
    }
    ;[xp, yp] = [xa, ya]
    ;[xa, ya] = [xb, yb]
  }
  return roots.sort((u, v) => u - v)
}

/** Number of decimals that are trustworthy given an absolute error. */
export function safeDigits(err: number, max = 8): number {
  if (!(err > 0)) return max
  return Math.max(0, Math.min(max, Math.floor(-Math.log10(err)) - 1))
}
