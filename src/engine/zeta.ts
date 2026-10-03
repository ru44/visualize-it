// Riemann zeta by Euler–Maclaurin summation: the first N−1 terms, the integral tail N^(1−s)/(s−1),
// half the N-th term, then six Bernoulli corrections. This one formula is valid on both sides of
// s = 1, so it gives the analytic continuation directly (ζ(−1) comes out as 45 − 50 + 5 − 1/12).
// Accurate to better than 1e-9 for |s| ≲ 6, the range the lessons use.
const N = 12
const B = [1 / 12, -1 / 720, 1 / 30240, -1 / 1209600, 1 / 47900160, -691 / 1307674368000] // B₂ₖ/(2k)!

/** ζ(re + i·im) as [real, imaginary]; [Infinity, 0] at the pole s = 1. */
export function zetaC(re: number, im: number): [number, number] {
  const dr = re - 1
  const d = dr * dr + im * im
  if (d < 1e-18) return [Infinity, 0]
  let sr = 0
  let si = 0
  for (let n = 1; n < N; n++) {
    const m = n ** -re
    const a = -im * Math.log(n)
    sr += m * Math.cos(a)
    si += m * Math.sin(a)
  }
  const m = N ** -re
  const a = -im * Math.log(N)
  const pr = m * Math.cos(a) // N^(−s)
  const pi = m * Math.sin(a)
  sr += (N * (pr * dr + pi * im)) / d + pr / 2
  si += (N * (pi * dr - pr * im)) / d + pi / 2
  let qr = re // rising product s(s+1)…(s+2k−2)
  let qi = im
  let scale = 1 / N
  for (let k = 1; k <= B.length; k++) {
    sr += B[k - 1] * scale * (qr * pr - qi * pi)
    si += B[k - 1] * scale * (qr * pi + qi * pr)
    for (const j of [2 * k - 1, 2 * k]) [qr, qi] = [qr * (re + j) - qi * im, qr * im + qi * (re + j)]
    scale /= N * N
  }
  return [sr, si]
}

/** ζ(s) for real s; ±Infinity is never returned, s = 1 gives Infinity. */
export function zeta(s: number): number {
  return zetaC(s, 0)[0]
}
