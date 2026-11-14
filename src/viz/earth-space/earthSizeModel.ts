// earth-space/earth-size: Eratosthenes' measurement. theta = how far the Sun is from straight overhead
// in Alexandria, d = the distance to Syene (km). The same angle sits at the Earth's centre, so the
// whole circle is 360/theta times the distance between the two cities.
export const REAL_C = 40008 // km, once around the Earth through the poles
export const REAL_R = 6371 // km
export const readParams = (p: Record<string, number>) => {
  const theta = p.theta ?? 10
  const d = p.d ?? 500
  const c = (360 / theta) * d
  return { theta, d, parts: 360 / theta, c, r: c / (2 * Math.PI), err: ((c - REAL_C) / REAL_C) * 100 }
}
/** 40008 -> "40,008"; works the same in every language because digits stay Western. */
export const km = (v: number) => Math.round(v).toLocaleString('en-US')
export const pct = (v: number) => {
  const r = Math.round(v * 10) / 10 || 0
  return `${r > 0 ? '+' : ''}${r.toFixed(1)} %`
}
