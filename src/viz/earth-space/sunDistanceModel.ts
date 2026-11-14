// The sun-distance lesson's maths, shared by the flat picture (SunDistance.vue) and the 3D scene.
// At exactly half Moon the angle at the Moon is 90°, so cos φ = D_M / D_S and D_S = D_M / cos φ.
export const MOON_DIST = 384400 // km
export const SUN_DIST = 149.6 // million km, the real value
export const MAX_PHI = 89.99 // the answer is infinite at 90°
const RAD = Math.PI / 180

/** How many times farther than the Moon the Sun is, for a measured angle in degrees. */
export const timesFarther = (phi: number) => 1 / Math.cos(Math.min(phi, MAX_PHI) * RAD)

export function readParams(params: Record<string, number>) {
  const phi = params.phi ?? 80
  const err = params.err ?? 0
  const ratio = timesFarther(phi)
  const lo = timesFarther(phi - err) // smallest answer
  const hi = timesFarther(phi + err) // largest answer
  const sun = (MOON_DIST * ratio) / 1e6 // million km
  return { phi, err, ratio, lo, hi, sun, error: (sun - SUN_DIST) / SUN_DIST }
}

export const fmtRatio = (v: number) => (v >= 100 ? Math.round(v).toLocaleString('en-US').replace(/,/g, ' ') : v.toFixed(1))
