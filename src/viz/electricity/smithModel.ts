// The Smith-chart lesson's model, shared by the flat picture (SmithChart.vue) and the 3D scene
// (SmithChart3D.vue): an antenna Z_L = R + jX on a Z0 = 50 Ω cable, its reflection coefficient
// Γ = (z − 1)/(z + 1) with z = Z_L/Z0, and how Γ turns as you look at the cable d wavelengths back
// from the antenna. The chart itself is the Γ disc with the lines of constant r and x drawn on it.
import { fmt } from '../../engine/math'

export const Z0 = 50
export type C = { re: number; im: number }
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
export const readParams = (p: Record<string, number>) => ({ R: clamp(p.R ?? 100, 0, 250), X: clamp(p.X ?? 50, -250, 250), d: clamp(p.d ?? 0, 0, 0.5) })

export const mag = (c: C) => Math.hypot(c.re, c.im)
export const arg = (c: C) => Math.atan2(c.im, c.re)
/** Normalised impedance z = r + jx → reflection coefficient Γ = (z − 1)/(z + 1). */
export function gammaOf(r: number, x: number): C {
  const den = (r + 1) ** 2 + x * x
  return { re: (r * r - 1 + x * x) / den, im: (2 * x) / den }
}
/** Γ → z = (1 + Γ)/(1 − Γ); Γ = 1 (an open circuit) gives infinity. */
export function zOf(g: C): C {
  const den = (1 - g.re) ** 2 + g.im ** 2
  return { re: (1 - g.re ** 2 - g.im ** 2) / den, im: (2 * g.im) / den }
}
/** Γ seen d wavelengths back from the antenna: Γ·e^{−j4πd}, clockwise, a full turn every half wavelength. */
export function rotate(g: C, d: number): C {
  const a = -4 * Math.PI * d
  return { re: g.re * Math.cos(a) - g.im * Math.sin(a), im: g.re * Math.sin(a) + g.im * Math.cos(a) }
}
export const vswrOf = (m: number) => (m > 0.999 ? Infinity : (1 + m) / (1 - m))
/** Size of the voltage d wavelengths back from the antenna, relative to the forward wave: |1 + Γe^{−j4πd}|. */
export function envelope(g: C, d: number) {
  const q = rotate(g, d)
  return Math.hypot(1 + q.re, q.im)
}
/** "100 + j50", "75", "50 − j50"; infinity for an open circuit. */
export function cfmt(re: number, im: number, digits = 0) {
  if (!Number.isFinite(re) || !Number.isFinite(im) || Math.abs(re) > 1e5 || Math.abs(im) > 1e5) return '∞'
  const a = fmt(re, digits).replace('-', '−')
  if (Math.abs(im) < 0.5 * 10 ** -digits) return a
  return `${a} ${im < 0 ? '−' : '+'} j${fmt(Math.abs(im), digits)}`
}

// The grid: lines of constant r and of constant x, as (r, x) samples in the impedance plane. Sampled
// through tan() so each line runs out towards infinity, where the chart closes it into a circle.
export const R_LINES = [0, 0.2, 0.5, 1, 2, 5]
export const X_LINES = [0.2, 0.5, 1, 2, 5]
const N = 120
export const rLine = (r: number): [number, number][] => Array.from({ length: N + 1 }, (_, i) => [r, Math.tan((i / N - 0.5) * Math.PI * 0.994)])
export const xLine = (x: number): [number, number][] => Array.from({ length: N + 1 }, (_, i) => [Math.tan((i / N) * (Math.PI / 2) * 0.994), x])

/** Draws the chart's grid on a canvas: the Γ disc of radius R at (cx, cy), with the values in ohms. */
export function drawSmithGrid(
  g: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  col: { grid: string; axis: string; text: string; font: string; match?: string },
) {
  const pt = (r: number, x: number): [number, number] => {
    const q = gammaOf(r, x)
    return [cx + q.re * R, cy - q.im * R]
  }
  const stroke = (pts: [number, number][], color: string, w: number) => {
    g.strokeStyle = color
    g.lineWidth = w
    g.beginPath()
    pts.forEach(([r, x], i) => {
      const [X, Y] = pt(r, x)
      if (i) g.lineTo(X, Y)
      else g.moveTo(X, Y)
    })
    g.stroke()
  }
  for (const x of X_LINES) {
    stroke(xLine(x), col.grid, R * 0.004)
    stroke(xLine(-x), col.grid, R * 0.004)
  }
  for (const r of R_LINES)
    stroke(rLine(r), r === 0 ? col.axis : r === 1 && col.match ? col.match : col.grid, r === 0 ? R * 0.008 : r === 1 && col.match ? R * 0.007 : R * 0.004)
  stroke(xLine(0), col.axis, R * 0.005)
  g.fillStyle = col.text
  g.font = `600 ${Math.round(R * 0.09)}px ${col.font}`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.direction = 'ltr'
  for (const r of R_LINES.slice(1)) {
    const [X, Y] = pt(r, 0)
    g.fillText(`${r * Z0}`, X, Y - R * 0.055)
  }
  for (const x of X_LINES)
    for (const s of [1, -1]) {
      const [X, Y] = pt(0, s * x)
      g.fillText(`${s > 0 ? '+' : '−'}j${x * Z0}`, X + ((X - cx) / R) * R * 0.11, Y + ((Y - cy) / R) * R * 0.11)
    }
}
