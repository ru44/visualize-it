import { evaluate, compile, parse } from 'mathjs'
import type { Lesson } from '../lessons/types'
import { parseQuery } from './explorer'
import { makeFn, derivativeExpr, numericSlope, toTex, fmt } from './math'
import { analyzeLimit, integrateChecked, safeDigits, type OneSided } from './analysis'
import { solve } from './solve'
import { combinations, permutations, factorial, fmtBig } from './stats'
import { t } from '../i18n'

const r = String.raw
type Check = NonNullable<Lesson['checks']>[number]

function num(s: string): number {
  try {
    const v = evaluate(s)
    return typeof v === 'number' ? v : NaN
  } catch {
    return NaN
  }
}

function autoRange(expr: string, [x0, x1]: [number, number]): [number, number] {
  const f = makeFn(expr)
  const ys: number[] = []
  for (let i = 0; i <= 300; i++) {
    const y = f(x0 + ((x1 - x0) * i) / 300)
    if (Number.isFinite(y)) ys.push(y)
  }
  if (!ys.length) return [-5, 5]
  ys.sort((a, b) => a - b)
  const lo = Math.min(0, ys[Math.floor(ys.length * 0.04)])
  const hi = Math.max(0, ys[Math.ceil(ys.length * 0.96) - 1])
  const pad = (hi - lo) * 0.2 || 1
  return [lo - pad, hi + pad]
}

function usesY(expr: string): boolean {
  try {
    return parse(expr).filter((n: any) => n.isSymbolNode && n.name === 'y').length > 0
  } catch {
    return false
  }
}

const base = { id: 'adhoc', concepts: [], related: [], realWorld: [], derivation: [], tryIt: [] as string[] }
const side = (s: OneSided) => (s.kind === 'finite' ? fmt(s.value, 6) : s.kind === 'infinite' ? (s.sign > 0 ? '+∞' : '−∞') : '?')

function surfaceLesson(expr: string): Lesson | null {
  const extent = 3
  const zs: number[] = []
  try {
    const code = compile(expr)
    for (let i = 0; i <= 24; i++)
      for (let j = 0; j <= 24; j++) {
        const v = code.evaluate({ x: -extent + (i * extent) / 12, y: -extent + (j * extent) / 12 })
        if (typeof v === 'number' && Number.isFinite(v)) zs.push(v)
      }
  } catch {
    return null
  }
  if (!zs.length) return null
  zs.sort((a, b) => a - b)
  const lo = zs[Math.floor(zs.length * 0.02)]
  const hi = zs[Math.ceil(zs.length * 0.98) - 1]
  return {
    ...base,
    title: t('adhoc.surface.title'),
    subject: 'calculus',
    difficulty: 'university',
    equation: `z = ${toTex(expr)}`,
    summary: t('adhoc.surface.summary'),
    prerequisites: ['gradient'],
    visualization: { type: 'surface-3d', options: { expr, extent, zRange: [lo, hi === lo ? lo + 1 : hi] } },
    parameters: {
      x0: { label: t('adhoc.surface.x'), min: -extent, max: extent, step: 0.01, value: 1 },
      y0: { label: t('adhoc.surface.y'), min: -extent, max: extent, step: 0.01, value: -0.5 },
    },
    variables: [
      { symbol: r`\partial f/\partial x`, meaning: t('adhoc.surface.var1') },
      { symbol: r`\partial f/\partial y`, meaning: t('adhoc.surface.var2') },
      { symbol: r`\nabla f`, meaning: t('adhoc.surface.var3') },
    ],
    explanation: { intuition: [t('adhoc.surface.intuition')], formal: [t('adhoc.surface.formal')] },
    checks: [{ status: 'numeric', text: t('trust.surface') }],
  }
}

/** Build a lesson on the fly from whatever the user typed. Returns null if it cannot be understood. */
export function buildAdhoc(q: string): Lesson | null {
  const p = parseQuery(q)

  if (p.kind === 'count') {
    const { op, n, k } = p
    if (n > 170 || k > n) return null
    const value = op === 'C' ? combinations(n, k) : op === 'P' ? permutations(n, k) : factorial(n)
    const eq = op === 'C' ? r`\binom{${n}}{${k}} = \frac{${n}!}{${k}!\,${n - k}!} = ${fmtBig(value)}` : op === 'P' ? r`P(${n},${k}) = \frac{${n}!}{${n - k}!} = ${fmtBig(value)}` : r`${n}! = ${fmtBig(value)}`
    const nMax = Math.max(n, 1)
    return {
      ...base,
      title: t('adhoc.count.title'),
      subject: 'statistics',
      difficulty: 'beginner',
      equation: eq.replace(/\u2009/g, '\\,'),
      summary: t('adhoc.count.summary'),
      prerequisites: [op === 'C' ? 'combinations' : 'permutations'],
      visualization: { type: 'counting', options: { ordered: op !== 'C' } },
      parameters: {
        n: { label: t('adhoc.count.n'), min: 1, max: Math.min(60, Math.max(nMax, 10)), step: 1, value: Math.min(n, 60) },
        k: { label: t('adhoc.count.k'), min: 0, max: Math.min(60, Math.max(nMax, 10)), step: 1, value: Math.min(k, 60) },
      },
      variables: [
        { symbol: 'n', meaning: t('adhoc.count.varn') },
        { symbol: 'k', meaning: t('adhoc.count.vark') },
      ],
      explanation: { intuition: [t(op === 'C' ? 'adhoc.count.intuitionC' : op === 'P' ? 'adhoc.count.intuitionP' : 'adhoc.count.intuitionF')], formal: [t('adhoc.count.formal')] },
      checks: [{ status: 'exact', text: t('trust.countExact') }],
    }
  }

  if (p.kind === 'equation') {
    const sol = solve(p.lhs, p.rhs)
    if (!sol) return null
    const domain: [number, number] = sol.roots.length ? [Math.min(...sol.roots) - 4, Math.max(...sol.roots) + 4] : [-6, 6]
    return {
      ...base,
      title: t('adhoc.solve.title'),
      subject: 'algebra',
      difficulty: 'beginner',
      equation: sol.steps[0].tex,
      summary: t('adhoc.solve.summary'),
      prerequisites: ['linear-equations'],
      visualization: { type: 'function-plot', options: { expr: sol.expr, domain, range: autoRange(sol.expr, domain), mode: 'plain', roots: sol.roots } },
      parameters: { x: { label: t('adhoc.solve.param'), min: domain[0], max: domain[1], step: 0.01, value: +(domain[0] + 1).toFixed(2) } },
      variables: [{ symbol: 'x', meaning: t('adhoc.solve.var') }],
      explanation: { intuition: [t('adhoc.solve.intuition')], formal: [t('adhoc.solve.formal')] },
      derivation: sol.steps,
      derivationTitle: t('lesson.steps'),
      checks: [sol.check],
    }
  }

  if (p.kind === 'function' && usesY(p.expr)) return surfaceLesson(p.expr)

  let fn
  try {
    fn = makeFn(p.expr)
  } catch {
    return null
  }
  const f = (x: number) => fn(x)
  if (![0.37, 1.13, -2.41, 3.3, 7.7, -0.05].some((x) => Number.isFinite(f(x)))) return null
  const tex = toTex(p.expr)

  if (p.kind === 'limit') {
    const at = num(p.at)
    if (Number.isNaN(at)) return null
    const res = analyzeLimit(f, at)
    const finiteAt = Number.isFinite(at)
    const domain: [number, number] = finiteAt ? [at - 6, at + 6] : at > 0 ? [0, 60] : [-60, 0]
    const check: Check =
      res.kind === 'finite'
        ? { status: 'numeric', text: t('trust.limitFinite', { d: safeDigits(res.err), v: fmt(res.value, safeDigits(res.err)) }) }
        : res.kind === 'infinite'
          ? { status: 'exact', text: t('trust.limitInf', { v: res.sign > 0 ? '+∞' : '−∞' }) }
          : res.kind === 'dne'
            ? { status: 'exact', text: t('trust.limitDne', { l: side(res.left), r: side(res.right) }) }
            : { status: 'warning', text: t('trust.limitUnknown') }
    const answer = res.kind === 'finite' ? fmt(res.value, safeDigits(res.err)) : res.kind === 'infinite' ? (res.sign > 0 ? '+\\infty' : '-\\infty') : null
    return {
      ...base,
      title: t('adhoc.limit.title'),
      subject: 'calculus',
      difficulty: 'high-school',
      equation: r`\lim_{x \to ${toTex(p.at)}} ${tex}` + (answer ? ` = ${answer}` : ''),
      summary: t('adhoc.limit.summary'),
      prerequisites: ['limit'],
      visualization: finiteAt
        ? { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'limit', limitAt: at } }
        : { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'plain' } },
      parameters: finiteAt
        ? { d: { label: t('adhoc.limit.param', { a: p.at }), min: 0.001, max: 5, step: 0.001, value: 2.5 } }
        : { x: { label: 'x', min: domain[0], max: domain[1], step: 0.1, value: at > 0 ? 10 : -10 } },
      variables: [{ symbol: 'x', meaning: t('adhoc.limit.var', { a: p.at }) }],
      explanation: { intuition: [t('adhoc.limit.intuition')], formal: [t('adhoc.limit.formal')] },
      checks: [check],
    }
  }

  if (p.kind === 'integral') {
    const a = num(p.a)
    const b = num(p.b)
    if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) return null
    const res = integrateChecked(f, a, b, p.expr)
    const pad = Math.abs(b - a) * 0.25
    const domain: [number, number] = [Math.min(a, b) - pad, Math.max(a, b) + pad]
    const fracTex = res.kind === 'exact' ? (Number(res.frac.d) === 1 ? `${res.frac.s < 0n ? '-' : ''}${res.frac.n}` : `${Number(res.frac.s) < 0 ? '-' : ''}\\tfrac{${res.frac.n}}{${res.frac.d}}`) : ''
    const check: Check =
      res.kind === 'exact'
        ? { status: 'exact', text: t('trust.intExact', { v: `${res.frac.toFraction()} = ${fmt(res.value, 8)}` }) }
        : res.kind === 'numeric'
          ? { status: 'numeric', text: t('trust.intNumeric', { d: safeDigits(res.err), v: fmt(res.value, safeDigits(res.err)) }) }
          : res.kind === 'singular'
            ? { status: 'warning', text: t('trust.intSingular', { x: fmt(res.at, 3) }) }
            : { status: 'warning', text: t('trust.intUnreliable', { v: fmt(res.value, 3) }) }
    const answer = res.kind === 'exact' ? ` = ${fracTex}` : res.kind === 'numeric' ? ` \\approx ${fmt(res.value, safeDigits(res.err))}` : ''
    return {
      ...base,
      title: t('adhoc.integral.title'),
      subject: 'calculus',
      difficulty: 'high-school',
      equation: r`\int_{${toTex(p.a)}}^{${toTex(p.b)}} ${tex} \, dx` + answer,
      summary: t('adhoc.integral.summary'),
      prerequisites: ['integral', 'area-under-curve'],
      visualization: { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'riemann', rule: 'mid' } },
      parameters: {
        n: { label: t('adhoc.integral.n'), min: 1, max: 500, step: 1, value: 8 },
        a: { label: t('adhoc.integral.a'), min: domain[0], max: domain[1], step: 0.01, value: a },
        b: { label: t('adhoc.integral.b'), min: domain[0], max: domain[1], step: 0.01, value: b },
      },
      variables: [
        { symbol: 'a, b', meaning: t('adhoc.integral.var1') },
        { symbol: 'dx', meaning: t('adhoc.integral.var2') },
      ],
      explanation: { intuition: [t('adhoc.integral.intuition')], formal: [t('adhoc.integral.formal')] },
      checks: [check],
    }
  }

  // Function / derivative: trust the symbolic derivative only if it matches a numerical measurement.
  const domain: [number, number] = [-6, 6]
  const d = derivativeExpr(p.expr)
  let check: Check = { status: 'numeric', text: t('trust.derivNumeric') }
  let dTex = ''
  if (d) {
    const dfn = makeFn(d)
    const pts = [-3.7, -1.3, 0.45, 1.9, 4.2].filter((x) => Number.isFinite(f(x)) && Number.isFinite(dfn(x)))
    const agree = pts.every((x) => Math.abs(dfn(x) - numericSlope(f, x)) <= 1e-4 * (1 + Math.abs(dfn(x))))
    if (pts.length && agree) (check = { status: 'exact', text: t('trust.derivExact') }), (dTex = toTex(d))
    else if (pts.length) check = { status: 'warning', text: t('trust.derivMismatch') }
  }
  return {
    ...base,
    title: t(p.kind === 'derivative' ? 'adhoc.fn.dtitle' : 'adhoc.fn.title'),
    subject: 'calculus',
    difficulty: 'high-school',
    equation: dTex ? r`f(x) = ${tex} \qquad f'(x) = ${dTex}` : `f(x) = ${tex}`,
    summary: t('adhoc.fn.summary'),
    prerequisites: ['function-graph', 'derivative'],
    visualization: { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'tangent', showDerivative: true, numericDerivative: !dTex } },
    parameters: { x: { label: t('adhoc.fn.param'), min: -6, max: 6, step: 0.01, value: 1 } },
    variables: [
      { symbol: 'f(x)', meaning: t('adhoc.fn.var1') },
      { symbol: "f'(x)", meaning: t('adhoc.fn.var2') },
    ],
    explanation: { intuition: [t('adhoc.fn.intuition')], formal: [t('adhoc.fn.formal')] },
    checks: [check],
  }
}
