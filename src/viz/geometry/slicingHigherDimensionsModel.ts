// geometry/slicing-higher-dimensions. params n (dimension of the ball, 2..4), h (distance from the ball's
// centre to the sheet, cm, positive = ball above the sheet) and R (radius of the ball, cm).
// The slice is a ball of one dimension less with radius r = sqrt(R^2 - h^2), or nothing when |h| >= R.
export const readParams = (p: Record<string, number>) => {
  const n = Math.max(2, Math.min(4, Math.round(p.n ?? 3)))
  const h = p.h ?? 4
  const R = p.R ?? 5
  const here = Math.abs(h) < R
  const r = here ? Math.sqrt(R * R - h * h) : 0
  return { n, h, R, here, r }
}
