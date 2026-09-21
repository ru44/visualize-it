import { fraction } from 'mathjs'
import { makeFn, toTex, fmt } from './math'
import { polyCoeffs, polynomialRealRoots, scanRoots } from './analysis'
import { t } from '../i18n'

export interface Step {
  tex: string
  note: string
}
export interface Solution {
  steps: Step[]
  roots: number[]
  /** lhs − rhs, the curve whose axis crossings are the solutions. */
  expr: string
  check: { status: 'exact' | 'numeric' | 'warning'; text: string }
}

/** Exact rational as LaTeX when the value is a simple fraction, otherwise a decimal. */
function ratTex(v: number): string {
  const f = fraction(v)
  if (Number(f.d) === 1 || Number(f.d) > 10000 || Math.abs(f.valueOf() - v) > 1e-13) return fmt(v, 6)
  return `${Number(f.s) < 0 ? '-' : ''}\\tfrac{${f.n}}{${f.d}}`
}

function polyTex(c: number[]): string {
  let out = ''
  for (let k = c.length - 1; k >= 0; k--) {
    const v = c[k]
    if (!v) continue
    const mag = Math.abs(v)
    const body = (k === 0 || mag !== 1 ? ratTex(mag) : '') + (k === 0 ? '' : k === 1 ? 'x' : `x^{${k}}`)
    out += out ? (v < 0 ? ' - ' : ' + ') + body : (v < 0 ? '-' : '') + body
  }
  return out || '0'
}

/** √n simplified to a·√b for integer n. */
function surd(n: number): { out: number; inn: number } {
  let out = 1
  let inn = n
  for (let k = 2; k * k <= inn; k++) while (inn % (k * k) === 0) (inn /= k * k), (out *= k)
  return { out, inn }
}

const rootsTex = (roots: number[], approx = false) => roots.map((x, i) => `x_{${i + 1}} ${approx ? '\\approx' : '='} ${approx ? fmt(x, 6) : ratTex(x)}`).join(',\\quad ')

export function solve(lhs: string, rhs: string): Solution | null {
  const expr = `(${lhs}) - (${rhs})`
  let g: (x: number) => number
  try {
    const fn = makeFn(expr)
    g = (x) => fn(x)
  } catch {
    return null
  }
  const steps: Step[] = [{ tex: `${toTex(lhs)} = ${toTex(rhs)}`, note: t('solve.start') }]
  const verified = (roots: number[]) => roots.every((x) => Math.abs(g(x)) < 1e-7 * (1 + Math.abs(x)))
  const L = polyCoeffs(lhs)
  const R = polyCoeffs(rhs)

  if (L && R) {
    const n = Math.max(L.length, R.length)
    const l = Array.from({ length: n }, (_, i) => L[i] ?? 0)
    const r = Array.from({ length: n }, (_, i) => R[i] ?? 0)
    const d = l.map((v, i) => v - r[i])
    while (d.length > 1 && Math.abs(d[d.length - 1]) < 1e-14) d.pop()
    const degree = d.length - 1

    if (degree === 0) {
      const always = Math.abs(d[0]) < 1e-14
      steps.push({ tex: always ? `${ratTex(l[0])} = ${ratTex(r[0])}` : `${ratTex(l[0])} \\ne ${ratTex(r[0])}`, note: t(always ? 'solve.always' : 'solve.never') })
      return { steps, roots: [], expr, check: { status: 'exact', text: t('trust.solveExact') } }
    }

    if (degree === 1) {
      if (r[1]) steps.push({ tex: `${polyTex([l[0], d[1]])} = ${ratTex(r[0])}`, note: t('solve.moveX', { term: polyTex([0, r[1]]) }) })
      if (l[0]) steps.push({ tex: `${polyTex([0, d[1]])} = ${ratTex(r[0] - l[0])}`, note: t(l[0] > 0 ? 'solve.sub' : 'solve.add', { k: ratTex(Math.abs(l[0])) }) })
      const x = (r[0] - l[0]) / d[1]
      steps.push(d[1] !== 1 ? { tex: `x = \\frac{${ratTex(r[0] - l[0])}}{${ratTex(d[1])}} = ${ratTex(x)}`, note: t('solve.divide', { k: ratTex(d[1]) }) } : { tex: `x = ${ratTex(x)}`, note: t('solve.done') })
      steps.push({ tex: `${ratTex(l[1] * x + l[0])} = ${ratTex(r[1] * x + r[0])} \;\\checkmark`, note: t('solve.check') })
      return { steps, roots: [x], expr, check: { status: verified([x]) ? 'exact' : 'warning', text: t('trust.solveExact') } }
    }

    if (degree === 2) {
      const [c, b, a] = d
      if (r.some((v) => v !== 0)) steps.push({ tex: `${polyTex(d)} = 0`, note: t('solve.standard') })
      const disc = b * b - 4 * a * c
      steps.push({ tex: `\\Delta = b^2 - 4ac = (${ratTex(b)})^2 - 4(${ratTex(a)})(${ratTex(c)}) = ${ratTex(disc)}`, note: t('solve.disc') })
      if (disc < 0) {
        steps.push({ tex: `\\Delta < 0 \\quad\\Rightarrow\\quad \\text{${t('solve.none')}}`, note: t('solve.noReal') })
        return { steps, roots: [], expr, check: { status: 'exact', text: t('trust.solveNone') } }
      }
      const sq = Math.sqrt(disc)
      const roots = [...new Set([(-b - sq) / (2 * a), (-b + sq) / (2 * a)])].sort((p, q) => p - q)
      // Keep the answer exact: show the surd when Δ is a whole number that is not a perfect square.
      const perfect = Number.isInteger(sq)
      const s = Number.isInteger(disc) && !perfect ? surd(disc) : null
      const root = s ? `${s.out === 1 ? '' : s.out}\\sqrt{${s.inn}}` : ratTex(sq)
      steps.push({ tex: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{${ratTex(-b)} \\pm ${root}}{${ratTex(2 * a)}}`, note: t('solve.formula') })
      steps.push({ tex: rootsTex(roots, !!s || !perfect), note: t('solve.roots') })
      return { steps, roots, expr, check: { status: verified(roots) ? 'exact' : 'warning', text: t('trust.solveExact') } }
    }

    const roots = polynomialRealRoots(d)
    steps.push({ tex: `${polyTex(d)} = 0`, note: t('solve.polyStd', { n: degree }) })
    steps.push({ tex: roots.length ? rootsTex(roots, roots.some((x) => !Number.isInteger(x))) : `\\text{${t('solve.none')}}`, note: t('solve.polyRoots', { n: degree }) })
    if (roots.length) steps.push({ tex: roots.map((x) => `f(${fmt(x, 4)}) = 0`).join(',\\quad '), note: t('solve.rootsCheck') })
    return { steps, roots, expr, check: { status: verified(roots) ? 'numeric' : 'warning', text: t(roots.length ? 'trust.solvePoly' : 'trust.solveNone') } }
  }

  const roots = scanRoots(g)
  steps.push({ tex: rhs.trim() === '0' ? `f(x) = ${toTex(lhs)}` : `${toTex(lhs)} - \\left(${toTex(rhs)}\\right) = 0`, note: t('solve.numStd') })
  steps.push({ tex: roots.length ? rootsTex(roots.slice(0, 8), true) + (roots.length > 8 ? ',\;\\dots' : '') : `\\text{${t('solve.none')}}`, note: t('solve.numRoots') })
  return { steps, roots, expr, check: { status: 'numeric', text: t(roots.length ? 'trust.solveNumeric' : 'trust.solveNoneRange') } }
}
