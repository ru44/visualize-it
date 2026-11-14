// earth-space/transit-of-venus: the maths shared by the flat picture and the 3D scene.
// Two observers a distance b apart see Venus cross the Sun on tracks a small angle delta apart.

export const R_VENUS = 0.723 // Venus's distance from the Sun, in AU (from the planet-distances lesson)
export const ARCSEC = 206265 // arcseconds in one radian
export const SUN_ARCSEC = 1900 // the Sun's apparent width in arcseconds
export const AU_REAL = 149.6 // million km
export const C_KMS = 299792 // km/s, speed of light
export const EARTH_D = 12742 // km, Earth's diameter
export const K_GAP = 8 // the gap between the tracks is drawn this many times bigger than it really is

export function readParams(p: Record<string, number>) {
  const b = p.b ?? 6000
  const delta = p.delta ?? 30
  const t = Math.max(0, Math.min(100, p.t ?? 50)) / 100
  return { b, delta, t }
}

/** The Sun's distance in million km, from observers b km apart who see a shift of delta arcseconds. */
export function auFrom(b: number, delta: number) {
  return ((b / (delta / ARCSEC)) * (R_VENUS / (1 - R_VENUS))) / 1e6
}

/** Percent difference from the real value. */
export const errPct = (au: number) => ((au - AU_REAL) / AU_REAL) * 100

/** Light travel time over the distance, as whole minutes and seconds. */
export function lightTime(auMkm: number) {
  const s = Math.round((auMkm * 1e6) / C_KMS)
  return { m: Math.floor(s / 60), s: s % 60 }
}
