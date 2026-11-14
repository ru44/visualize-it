// The moon-distance lesson's maths, shared by the flat picture (MoonDistance.vue) and the 3D scene
// (MoonDistance3D.vue). A coin of width c held at distance L from the eye hides the Moon exactly when
// both make the same angle; then the Moon is (L / c) Moon-widths away: D_M = d_M · L / c.
export const MOON_WIDTH = 3474 // km, from the moon-size lesson
export const MOON_DISTANCE = 384400 // km, the real average
export const EARTH_RADIUS = 6371 // km
/** L / c at which the coin hides the real Moon exactly (L and c in the same unit). */
export const TRUE_RATIO = MOON_DISTANCE / MOON_WIDTH
import type { Key } from '../../i18n'
export type Cover = 'big' | 'small' | 'exact'
export const COVER_KEY = { big: 'moon-distance.cover.big', small: 'moon-distance.cover.small', exact: 'moon-distance.cover.exact' } as const satisfies Record<
  Cover,
  Key
>

export function readParams(params: Record<string, number>) {
  const c = params.c ?? 20 // mm
  const L = params.L ?? 60 // cm
  const ratio = (L * 10) / c
  const distance = MOON_WIDTH * ratio // km
  /** how wide the coin looks, compared with the Moon (1 = same size) */
  const size = TRUE_RATIO / ratio
  const cover: Cover = Math.abs(size - 1) < 0.03 ? 'exact' : size > 1 ? 'big' : 'small'
  return { c, L, ratio, distance, size, cover, error: (distance - MOON_DISTANCE) / MOON_DISTANCE, radii: distance / EARTH_RADIUS }
}

/** Integers with a thin space between thousands, the same in every language. */
export const km = (v: number) => Math.round(v).toLocaleString('en-US').replace(/,/g, ' ')
