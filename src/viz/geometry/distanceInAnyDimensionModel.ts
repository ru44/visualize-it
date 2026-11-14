import { fmt } from '../../engine/math'

// geometry/distance-in-any-dimension. n = how many directions, a = the length of the step in each one.
// The straight distance is d = a*sqrt(n); walking along the edges is n*a. The "spiral of right triangles"
// puts the points P_k at distance sqrt(k) (times a) from the centre: P_(k+1) is reached from P_k by a new leg
// of length a at a right angle to the line from the centre, so each new hypotenuse is the distance so far.
export const readParams = (p: Record<string, number>) => {
  const n = Math.max(1, Math.min(11, Math.round(p.n ?? 2)))
  const a = p.a ?? 1
  const d = a * Math.sqrt(n)
  return { n, a, d, edges: n * a, ratio: Math.sqrt(n) }
}

/** Unit spiral: index k-1 holds the point k (1..n): radius sqrt(k) and its angle in radians. */
export function unitSpiral(n: number) {
  const r: number[] = []
  const ang: number[] = []
  let th = 0
  for (let k = 1; k <= n; k++) {
    r.push(Math.sqrt(k))
    ang.push(th)
    th += Math.atan(1 / Math.sqrt(k))
  }
  return { r, ang }
}

/** The working written out: "1² + 1² + 1² = 3" and "√3 = 1.732"; long sums are shortened with dots. */
export function working(n: number, a: number) {
  const sq = `${fmt(a, 1)}²`
  const sum = fmt(n * a * a, 2)
  const full = Array(n).fill(sq).join(' + ')
  const terms = n > 6 || full.length > 28 ? (n <= 3 ? full : `${sq} + ${sq} + · · · + ${sq}`) : full
  return { line1: `${terms} = ${sum}`, line2: `√${sum} = ${fmt(a * Math.sqrt(n), 3)}` }
}
