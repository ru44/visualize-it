// earth-space/sun-size. Shared by the 2D and 3D pictures.
export const D_MOON = 3474 // km
export const D_EARTH = 12742 // km
export const D_SUN_REAL = 1391000 // km

export function readParams(p: Record<string, number>) {
  const n = Math.max(2, p.n ?? 50)
  const cover = Math.min(100, Math.max(0, p.cover ?? 100)) / 100
  const sunKm = n * D_MOON
  return { n, cover, sunKm, earths: sunKm / D_EARTH, err: ((sunKm - D_SUN_REAL) / D_SUN_REAL) * 100 }
}

/**
 * The side view cannot show the true distance ratio (n up to 450), so the distances are squeezed:
 * the Moon sits at total / n^0.45 from the eye (never nearer than `minDm`), and the Sun's disc is
 * whatever fills the same sight cone at `total`. Both pictures say "not to scale".
 */
export function squeeze(n: number, total: number, moonR: number, minDm: number) {
  const dm = Math.max(minDm, total / Math.pow(n, 0.45))
  return { dm, sunR: (moonR * total) / dm }
}

export const num = (v: number) => Math.round(v).toLocaleString('en-US')
