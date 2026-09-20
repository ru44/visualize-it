import { rationalize } from 'mathjs'
import { makeFn, toTex, fmt } from './math'

export interface Step {
  tex: string
  note: string
}
export interface Solution {
  steps: Step[]
  roots: number[]
  /** lhs − rhs, the curve whose axis crossings are the solutions. */
  expr: string
}

/** Polynomial coefficients in x, lowest power first; null if the side is not a polynomial in x. */
function coeffs(side: string): number[] | null {
  try {
    const p = rationalize(side, {}, true)
    if (p.variables.some((v) => v !== 'x')) return null
    const c = p.coefficients.map(Number)
    return c.length ? c : [makeFn(side)(0)]
  } catch {
    return null
  }
}

function polyTex(c: number[]): string {
  let out = ''
  for (let k = c.length - 1; k >= 0; k--) {
    const v = c[k]
    if (!v) continue
    const mag = Math.abs(v)
    const body = (k === 0 || mag !== 1 ? fmt(mag) : '') + (k === 0 ? '' : k === 1 ? 'x' : `x^{${k}}`)
    out += out ? (v < 0 ? ' - ' : ' + ') + body : (v < 0 ? '-' : '') + body
  }
  return out || '0'
}

function numericRoots(f: (x: number) => number, lo = -20, hi = 20): number[] {
  const roots: number[] = []
  const n = 4000
  let xa = lo
  let ya = f(xa)
  for (let i = 1; i <= n; i++) {
    const xb = lo + ((hi - lo) * i) / n
    const yb = f(xb)
    if (Number.isFinite(ya) && Number.isFinite(yb) && (ya === 0 || ya * yb < 0)) {
      let [a, b, fa] = [xa, xb, ya]
      for (let k = 0; k < 60; k++) {
        const m = (a + b) / 2
        const fm = f(m)
        if (fa * fm <= 0) b = m
        else [a, fa] = [m, fm]
      }
      const r = (a + b) / 2
      if (Math.abs(f(r)) < 1e-6) roots.push(+r.toFixed(8))
    }
    ;[xa, ya] = [xb, yb]
  }
  return roots
}

export function solve(lhs: string, rhs: string): Solution | null {
  const expr = `(${lhs}) - (${rhs})`
  let g
  try {
    g = makeFn(expr)
  } catch {
    return null
  }
  const steps: Step[] = [{ tex: `${toTex(lhs)} = ${toTex(rhs)}`, note: 'The equation asks: for which $x$ do both sides have the same value?' }]
  const L = coeffs(lhs)
  const R = coeffs(rhs)
  const pad = (c: number[]) => [c[0] ?? 0, c[1] ?? 0, c[2] ?? 0]

  if (L && R && L.length <= 3 && R.length <= 3) {
    const [l, r] = [pad(L), pad(R)]
    const d = l.map((v, i) => v - r[i])
    if (d[2] === 0 && d[1] === 0) {
      steps.push({ tex: d[0] === 0 ? `${fmt(l[0])} = ${fmt(r[0])}` : `${fmt(l[0])} \\ne ${fmt(r[0])}`, note: d[0] === 0 ? 'The $x$ terms cancel and the statement is always true: every $x$ is a solution.' : 'The $x$ terms cancel and what is left is false: no $x$ can satisfy this.' })
      return { steps, roots: [], expr }
    }
    if (d[2] === 0) {
      // Linear: keep both sides balanced while isolating x.
      if (r[1] !== 0) steps.push({ tex: `${polyTex([l[0], d[1]])} = ${fmt(r[0])}`, note: `Subtract $${polyTex([0, r[1]])}$ from both sides so that $x$ appears only on the left.` })
      if (l[0] !== 0) steps.push({ tex: `${polyTex([0, d[1]])} = ${fmt(r[0] - l[0])}`, note: `${l[0] > 0 ? 'Subtract' : 'Add'} $${fmt(Math.abs(l[0]))}$ ${l[0] > 0 ? 'from' : 'to'} both sides. A balance stays level if you do the same thing to each pan.` })
      const x = (r[0] - l[0]) / d[1]
      if (d[1] !== 1) steps.push({ tex: `x = \\frac{${fmt(r[0] - l[0])}}{${fmt(d[1])}} = ${fmt(x)}`, note: `Divide both sides by $${fmt(d[1])}$ to leave $x$ alone.` })
      else steps.push({ tex: `x = ${fmt(x)}`, note: 'Nothing left to undo.' })
      steps.push({ tex: `\\text{check: left} = ${fmt(l[1] * x + l[0])}, \\quad \\text{right} = ${fmt(r[1] * x + r[0])}`, note: 'Substitute the answer back in: both sides agree. On the graph this is where left − right crosses zero.' })
      return { steps, roots: [x], expr }
    }
    const [c, b, a] = d
    if (r.some((v) => v !== 0)) steps.push({ tex: `${polyTex(d)} = 0`, note: 'Move everything to one side. Solutions are now the places where this parabola touches the axis.' })
    const disc = b * b - 4 * a * c
    steps.push({ tex: `\\Delta = b^2 - 4ac = (${fmt(b)})^2 - 4(${fmt(a)})(${fmt(c)}) = ${fmt(disc)}`, note: 'The discriminant counts the crossings: positive → two, zero → one (the vertex touches), negative → none.' })
    if (disc < 0) {
      steps.push({ tex: `\\Delta < 0 \\quad\\Rightarrow\\quad \\text{no real solution}`, note: 'The parabola never reaches the axis — look at the graph. (The solutions are complex numbers.)' })
      return { steps, roots: [], expr }
    }
    const roots = [...new Set([(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)])].sort((p, q) => p - q)
    steps.push({ tex: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{${fmt(-b)} \\pm ${fmt(Math.sqrt(disc))}}{${fmt(2 * a)}}`, note: 'The quadratic formula — completing the square, done once for every quadratic.' })
    steps.push({ tex: roots.map((x, i) => `x_{${i + 1}} = ${fmt(x)}`).join(',\\quad '), note: 'Both values are marked on the graph where the curve meets the axis.' })
    return { steps, roots, expr }
  }

  const roots = numericRoots((x) => g(x))
  steps.push({ tex: rhs.trim() === '0' ? `f(x) = ${toTex(lhs)}` : `${toTex(lhs)} - \\left(${toTex(rhs)}\\right) = 0`, note: 'Move everything to one side. There is no general algebraic recipe here, so we look for axis crossings numerically.' })
  steps.push({
    tex: roots.length ? roots.slice(0, 6).map((x, i) => `x_{${i + 1}} \\approx ${fmt(x, 5)}`).join(',\\quad ') : '\\text{no crossing found for } -20 \\le x \\le 20',
    note: 'Found by bisection: trap a sign change between two inputs, then halve the gap until it closes. Approximate, not exact.',
  })
  return { steps, roots, expr }
}
