// earth-space/moon-size: the Earth's shadow on the Moon is k Moons wide, and it has narrowed by one
// Moon width on its way, so the Earth is k + 1 Moons wide: d_M = d_E / (k + 1).
export const D_EARTH = 12742 // km
export const REAL_MOON = 3474 // km
export const readParams = (p: Record<string, number>) => {
  const k = p.k ?? 2
  const pos = p.pos ?? 50
  const moon = D_EARTH / (k + 1)
  return { k, pos, moon, ratio: k + 1, err: ((moon - REAL_MOON) / REAL_MOON) * 100 }
}
export const km = (v: number) => Math.round(v).toLocaleString('en-US')
export const pct = (v: number) => {
  const r = Math.round(v * 10) / 10 || 0
  return `${r > 0 ? '+' : ''}${r.toFixed(1)} %`
}
