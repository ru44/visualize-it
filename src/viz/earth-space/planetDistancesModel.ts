// earth-space/planet-distances. Shared by the 2D and 3D pictures.
// Sun at the origin, Earth at (1, 0) in AU, the planet at (r cos a, r sin a).
export const AU_MKM = 149.6 // million km in 1 AU

export function readParams(p: Record<string, number>) {
  const r = Math.min(0.95, Math.max(0.1, p.r ?? 0.5))
  const a = (((p.a ?? 60) % 360) + 360) % 360
  const rad = (a * Math.PI) / 180
  // angle at the Earth between the Sun and the planet, 0..90 degrees
  const elong = Math.abs((Math.atan2(r * Math.sin(rad), 1 - r * Math.cos(rad)) * 180) / Math.PI)
  const max = (Math.asin(r) * 180) / Math.PI
  return {
    r,
    a,
    rad,
    elong,
    max,
    atMax: max - elong < 0.6,
    /** sin a > 0: the planet is ahead of the Earth on the way round, so it rises before the Sun */
    morning: Math.sin(rad) > 0,
    mkm: r * AU_MKM,
  }
}
