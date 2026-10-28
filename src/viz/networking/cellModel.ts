// The cell-towers lesson's model, shared by the flat picture (CellTowers.vue) and the 3D scene
// (CellTowers3D.vue): two towers SPAN km apart, the log-distance signal P = P1 − 10·n·log10(d), and a
// phone walking from tower A towards tower B that moves to B once B beats A by the margin H.
export const SPAN = 6
export const P1 = -75

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
export const readParams = (p: Record<string, number>) => ({ d: clamp(p.d ?? 1.5, 0.2, 5.8), n: clamp(p.n ?? 3, 2, 4), H: clamp(p.H ?? 3, 0, 10) })

/** Received signal in dBm at `km` from a tower. */
export const signal = (km: number, n: number) => P1 - 10 * n * Math.log10(km)
/** Walking from A, the distance where tower B first beats tower A by H: SPAN·r/(1+r), r = 10^(H/10n). */
export function handoverAt(n: number, H: number) {
  const r = 10 ** (H / (10 * n))
  return (SPAN * r) / (1 + r)
}
export const onTowerB = (d: number, n: number, H: number) => signal(SPAN - d, n) - signal(d, n) > H
/** Bars as most phones draw them from LTE signal strength. */
export const barsOf = (dbm: number) => (dbm >= -85 ? 4 : dbm >= -95 ? 3 : dbm >= -105 ? 2 : dbm >= -115 ? 1 : 0)
