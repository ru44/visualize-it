// Combinatorics and probability with exact integer arithmetic where the answer is an integer,
// and explicitly bounded floating-point error where it is not.

export function factorial(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('factorial needs a non-negative integer')
  let r = 1n
  for (let i = 2n; i <= BigInt(n); i++) r *= i
  return r
}

/** n! / (n−k)! — ordered selections. */
export function permutations(n: number, k: number): bigint {
  if (![n, k].every(Number.isInteger) || n < 0 || k < 0) throw new RangeError('integers ≥ 0 required')
  if (k > n) return 0n
  let r = 1n
  for (let i = BigInt(n - k + 1); i <= BigInt(n); i++) r *= i
  return r
}

/** n choose k — unordered selections, computed multiplicatively so every intermediate is an integer. */
export function combinations(n: number, k: number): bigint {
  if (![n, k].every(Number.isInteger) || n < 0 || k < 0) throw new RangeError('integers ≥ 0 required')
  if (k > n) return 0n
  k = Math.min(k, n - k)
  let r = 1n
  for (let i = 1; i <= k; i++) r = (r * BigInt(n - k + i)) / BigInt(i)
  return r
}

/** Binomial probability P(X = k) for n trials with success probability p. */
export function binomialPmf(n: number, k: number, p: number): number {
  if (k < 0 || k > n) return 0
  // log-space avoids overflow for large n; error is a few ulps.
  return Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log1p(-p))
}
export function lnChoose(n: number, k: number): number {
  return lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k)
}
const lnFactCache: number[] = [0, 0]
export function lnFactorial(n: number): number {
  for (let i = lnFactCache.length; i <= n; i++) lnFactCache[i] = lnFactCache[i - 1] + Math.log(i)
  return lnFactCache[n]
}

/** Poisson probability P(X = k) with mean λ. */
export function poissonPmf(lambda: number, k: number): number {
  if (k < 0 || lambda < 0) return 0
  if (lambda === 0) return k === 0 ? 1 : 0
  return Math.exp(k * Math.log(lambda) - lambda - lnFactorial(k))
}

export const normalPdf = (x: number, mu = 0, sigma = 1) => Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI))

/** Standard normal CDF via a high-precision erf approximation (abs. error < 1.2e-7). */
export function normalCdf(x: number, mu = 0, sigma = 1): number {
  const z = (x - mu) / (sigma * Math.SQRT2)
  const t = 1 / (1 + 0.5 * Math.abs(z))
  const y =
    1 -
    t *
      Math.exp(
        -z * z -
          1.26551223 +
          t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
      )
  const erf = z >= 0 ? y : -y
  return 0.5 * (1 + erf)
}

export function mean(xs: number[]): number {
  return xs.reduce((s, v) => s + v, 0) / xs.length
}
/** Population variance (divide by n) unless `sample` is true (divide by n−1). */
export function variance(xs: number[], sample = false): number {
  const m = mean(xs)
  return xs.reduce((s, v) => s + (v - m) ** 2, 0) / (xs.length - (sample ? 1 : 0))
}

/** Format a big integer with thin-space digit groups so 3628800 reads as 3 628 800. */
export const fmtBig = (b: bigint) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
