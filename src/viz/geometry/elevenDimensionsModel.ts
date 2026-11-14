// geometry/eleven-dimensions. params r (radius of the hose, mm), D (distance, m), a (where the ant is
// round the hose, degrees). theta = 2r/D radians; below LIMIT the eye cannot tell the hose from a line.
export const LIMIT = 0.0003 // radians, about 1/60 of a degree
export const readParams = (p: Record<string, number>) => {
  const r = p.r ?? 10
  const D = p.D ?? 5
  const a = p.a ?? 60
  const theta = (2 * (r / 1000)) / D
  return { r, D, a, theta, ratio: theta / LIMIT, sees2: theta >= LIMIT, lineAt: (2 * (r / 1000)) / LIMIT }
}
