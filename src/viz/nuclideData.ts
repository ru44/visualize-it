// Shared nuclear-physics data and formulas for the `nuclear` subject's lessons (the-nucleus,
// size-of-the-nucleus, chart-of-nuclides). One table, so the 2D pictures and the 3D scenes never
// disagree with each other about which isotope is stable or how tight a nucleus is bound.
import { elements } from './elements'

/** Known stable isotopes, Z → the neutron counts N that are stable, for Z = 1..30 (H through Zn). */
export const STABLE_N: Record<number, number[]> = {
  1: [0, 1],
  2: [1, 2],
  3: [3, 4],
  4: [5],
  5: [5, 6],
  6: [6, 7],
  7: [7, 8],
  8: [8, 9, 10],
  9: [10],
  10: [10, 11, 12],
  11: [12],
  12: [12, 13, 14],
  13: [14],
  14: [14, 15, 16],
  15: [16],
  16: [16, 17, 18, 20],
  17: [18, 20],
  18: [18, 20, 22],
  19: [20, 22],
  20: [20, 22, 23, 24, 26],
  21: [24],
  22: [24, 25, 26, 27, 28],
  23: [28],
  24: [26, 28, 29, 30],
  25: [30],
  26: [28, 30, 31, 32],
  27: [32],
  28: [30, 32, 33, 34, 36],
  29: [34, 36],
  30: [34, 36, 37, 38, 40],
}

export function isStable(z: number, n: number): boolean {
  return STABLE_N[z]?.includes(n) ?? false
}

/** The stable N closest to the one given, for a Z that has at least one stable isotope. */
export function nearestStableN(z: number, n: number): number | undefined {
  const list = STABLE_N[z]
  if (!list || !list.length) return undefined
  return list.reduce((best, v) => (Math.abs(v - n) < Math.abs(best - n) ? v : best), list[0])
}

/** The average stable N for a Z — traces the centre of the stability band across the chart. */
export function meanStableN(z: number): number | undefined {
  const list = STABLE_N[z]
  if (!list || !list.length) return undefined
  return list.reduce((a, b) => a + b, 0) / list.length
}

export type DecayMode = 'stable' | 'n-rich' | 'p-rich'

/** Stable, or too many neutrons (β⁻ decay turns a neutron into a proton), or too few (β⁺/EC does the reverse). */
export function classify(z: number, n: number): DecayMode {
  if (isStable(z, n)) return 'stable'
  const near = nearestStableN(z, n)
  if (near === undefined) return n >= z ? 'n-rich' : 'p-rich'
  return n > near ? 'n-rich' : 'p-rich'
}

export function symbolFor(z: number): string {
  return elements.find((e) => e.z === z)?.s ?? '?'
}
export function nameFor(z: number): string {
  return elements.find((e) => e.z === z)?.n ?? '?'
}

/** Liquid-drop (semi-empirical mass formula) binding energy, in MeV. Standard textbook coefficients. */
const A_V = 15.8
const A_S = 18.3
const A_C = 0.714
const A_A = 23.2
const A_P = 12.0

export function bindingEnergyMeV(z: number, n: number): number {
  const a = z + n
  if (a <= 0) return 0
  const vol = A_V * a
  const surf = A_S * Math.cbrt(a * a)
  const coul = (A_C * z * (z - 1)) / Math.cbrt(a)
  const asym = (A_A * (n - z) * (n - z)) / a
  const evenZ = z % 2 === 0
  const evenN = n % 2 === 0
  const pairing = evenZ && evenN ? A_P / Math.sqrt(a) : !evenZ && !evenN ? -A_P / Math.sqrt(a) : 0
  return vol - surf - coul - asym + pairing
}

export function bindingEnergyPerNucleon(z: number, n: number): number {
  const a = z + n
  return a > 0 ? bindingEnergyMeV(z, n) / a : 0
}

/** Nuclear radius R = 1.2·A^(1/3) fm (r0 = 1.2 fm). */
export function nuclearRadiusFm(a: number): number {
  return 1.2 * Math.cbrt(a)
}
