// geometry/hypercube: the n-dimensional cube (n = 0..11) drawn as a shadow, shared by the 2D picture and the 3D scene.
// Vertices are every vector of +1/-1 coordinates (2^n of them). Two vertices are joined when they differ in exactly one
// coordinate; the edge remembers WHICH axis it runs along. The newest axis (n-1) can be partly dragged: its upper layer
// sits at -1 + 2*sweep/100. Then every axis k >= 2 is turned in the plane (k, k mod 2), and the shape is squeezed down to
// the screen dimension by repeated perspective (one coordinate at a time, from the highest axis down).
export const MAX_N = 11
const D = 3
const TILT = 20 // degrees, fixed, so a cube never looks like a flat square
const FIT = 1.7 // keeps every coordinate well inside the camera distance D

export const clampN = (n: number) => Math.max(0, Math.min(MAX_N, Math.round(Number.isFinite(n) ? n : 0)))

export const readParams = (p: Record<string, number>) => ({
  n: clampN(p.n ?? 3),
  spin: p.spin ?? 30,
  sweep: Math.max(0, Math.min(100, p.sweep ?? 100)),
})

/** C(n,k) * 2^(n-k): how many k-dimensional pieces an n-cube has (0 for k > n). */
export const pieces = (n: number, k: number) => {
  if (n < 0 || k < 0 || k > n) return 0
  let c = 1
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i
  return Math.round(c) * 2 ** (n - k)
}
export const fmtInt = (v: number) => Math.round(v).toLocaleString('en-US')

const edgeCache = new Map<number, Int32Array[]>()
/** For each axis, pairs (i, j) of vertex indices; vertex bit k set means coordinate k is +1. */
export function edgesOf(n: number): Int32Array[] {
  let e = edgeCache.get(n)
  if (e) return e
  e = []
  const V = 2 ** n
  for (let k = 0; k < n; k++) {
    const out = new Int32Array(V) // V/2 edges, two indices each
    let c = 0
    for (let i = 0; i < V; i++)
      if (!(i & (1 << k))) {
        out[c++] = i
        out[c++] = i | (1 << k)
      }
    e.push(out)
  }
  edgeCache.set(n, e)
  return e
}

export interface Shape {
  n: number
  dim: number
  count: number
  /** count * dim numbers, scaled so the farthest point is at distance 1 from the origin */
  pts: Float64Array
  edges: Int32Array[]
  /** bounding box (min then max per axis) of the finished shape at sweep = 100, in the same units as pts */
  box: number[]
}

/**
 * dim = 2 for the picture, 3 for the scene. `extra` (degrees) is added to the turn of the newest axis (the 3D scene
 * uses it for its slow automatic turning).
 */
export function build(n: number, spin: number, sweep: number, dim: 2 | 3, extra = 0): Shape {
  const cur = core(n, spin, sweep, dim, extra)
  const ref = sweep >= 100 ? cur : core(n, spin, 100, dim, extra)
  let big = 1e-9
  for (let i = 0; i < ref.count; i++) {
    let r = 0
    for (let q = 0; q < dim; q++) r += ref.pts[i * dim + q] ** 2
    if (r > big) big = r
  }
  const inv = 1 / Math.sqrt(big)
  const box = new Array(dim * 2)
  for (let q = 0; q < dim; q++) {
    let lo = Infinity
    let hi = -Infinity
    for (let i = 0; i < ref.count; i++) {
      const v = ref.pts[i * dim + q] * inv
      if (v < lo) lo = v
      if (v > hi) hi = v
    }
    box[q] = lo
    box[dim + q] = hi
  }
  for (let i = 0; i < cur.pts.length; i++) cur.pts[i] *= inv
  return { ...cur, box }
}

function core(n: number, spin: number, sweep: number, dim: 2 | 3, extra: number): Omit<Shape, 'box'> {
  n = clampN(n)
  const m = Math.max(n, dim)
  const V = 2 ** n
  const x = new Float64Array(V * m)
  const s = sweep / 100
  const sc = n > 3 ? Math.sqrt(3 / n) : 1
  for (let i = 0; i < V; i++) {
    const o = i * m
    for (let k = 0; k < n; k++) {
      const up = (i >> k) & 1
      x[o + k] = (k === n - 1 ? (up ? -1 + 2 * s : -1) : up ? 1 : -1) * sc
    }
  }
  // turn every axis k >= 2 in the plane (k, k mod 2)
  for (let k = 2; k < n; k++) {
    const a = ((spin * (1 + 0.37 * (k - 2)) + TILT + (k === n - 1 ? extra : 0)) * Math.PI) / 180
    const c = Math.cos(a)
    const sn = Math.sin(a)
    const j = k % 2
    for (let i = 0; i < V; i++) {
      const o = i * m
      const u = x[o + j]
      const v = x[o + k]
      x[o + j] = c * u - sn * v
      x[o + k] = sn * u + c * v
    }
  }
  // perspective, one coordinate at a time
  for (let k = m - 1; k >= dim; k--) {
    let big = 0
    for (let i = 0; i < V; i++) {
      const o = i * m
      const f = D / Math.max(D - x[o + k], 0.3)
      let r = 0
      for (let q = 0; q < k; q++) {
        x[o + q] *= f
        r += x[o + q] * x[o + q]
      }
      if (r > big) big = r
    }
    const g = big > FIT * FIT ? FIT / Math.sqrt(big) : 1
    if (g !== 1) for (let i = 0; i < V; i++) for (let q = 0; q < k; q++) x[i * m + q] *= g
  }
  const pts = new Float64Array(V * dim)
  for (let i = 0; i < V; i++) for (let q = 0; q < dim; q++) pts[i * dim + q] = x[i * m + q]
  return { n, dim, count: V, pts, edges: edgesOf(n) }
}

/** line width and opacity for the edges of axis k: fine lace at high n, the newest axis a little stronger */
export function strokeFor(n: number, newest: boolean) {
  const w = n <= 4 ? [3, 1.2] : n <= 6 ? [2, 0.9] : n <= 8 ? [1.2, 0.6] : [0.8, 0.4]
  const o = n <= 4 ? [0.95, 0.7] : n <= 6 ? [0.9, 0.55] : n <= 8 ? [0.85, 0.4] : [0.8, 0.22]
  const i = newest ? 0 : 1
  return { width: w[i], opacity: o[i] }
}
