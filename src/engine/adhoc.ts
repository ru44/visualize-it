import { evaluate } from 'mathjs'
import type { Lesson } from '../lessons/types'
import { parseQuery } from './explorer'
import { makeFn, derivativeExpr, toTex } from './math'
import { solve } from './solve'

const r = String.raw

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

/** Build a lesson on the fly from whatever the user typed. Returns null if it cannot be understood. */
export function buildAdhoc(q: string): Lesson | null {
  const p = parseQuery(q)
  if (p.kind === 'equation') {
    const sol = solve(p.lhs, p.rhs)
    if (!sol) return null
    const domain: [number, number] = sol.roots.length ? [Math.min(...sol.roots) - 4, Math.max(...sol.roots) + 4] : [-6, 6]
    return {
      id: 'adhoc',
      title: 'Equation solver',
      subject: 'functions',
      difficulty: 'beginner',
      equation: sol.steps[0].tex,
      summary: 'Solving means finding the inputs where both sides agree — the points where “left minus right” crosses zero.',
      concepts: [],
      prerequisites: ['function-graph'],
      related: [],
      visualization: { type: 'function-plot', options: { expr: sol.expr, domain, range: autoRange(sol.expr, domain), mode: 'plain', roots: sol.roots } },
      parameters: { x: { label: 'try a value of x', min: domain[0], max: domain[1], step: 0.01, value: +(domain[0] + 1).toFixed(2) } },
      variables: [{ symbol: 'x', meaning: 'the unknown — drag it until left − right reads 0' }],
      explanation: {
        intuition: ['The curve shows left side minus right side. Drag the point: wherever the readout hits zero, the two sides are equal and you have found a solution. The algebra beside it reaches the same place without guessing.'],
        formal: ['Each step applies the same operation to both sides, so the solution set never changes. $f(x) = g(x) \\iff f(x) - g(x) = 0$.'],
      },
      derivation: sol.steps,
      derivationTitle: 'Step by step',
      realWorld: [],
    }
  }
  let f
  try {
    f = makeFn(p.expr)
  } catch {
    return null
  }
  if (![0.37, 1.13, -2.41, 3.3].some((x) => Number.isFinite(f(x)))) return null

  const tex = toTex(p.expr)
  const base = {
    subject: 'calculus' as const,
    difficulty: 'high-school' as const,
    concepts: [],
    related: [],
    realWorld: [],
  }

  if (p.kind === 'limit') {
    const at = num(p.at)
    if (!Number.isFinite(at)) return null
    const domain: [number, number] = [at - 6, at + 6]
    return {
      ...base,
      id: 'adhoc',
      title: 'Limit explorer',
      equation: r`\lim_{x \to ${toTex(p.at)}} ${tex}`,
      summary: 'Slide the inputs toward the target and watch where the outputs are heading.',
      prerequisites: ['limit'],
      visualization: { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'limit', limitAt: at } },
      parameters: { d: { label: `distance from ${p.at}`, min: 0.001, max: 5, step: 0.001, value: 2.5 } },
      variables: [{ symbol: 'x', meaning: `the input, approaching ${p.at} from both sides` }],
      explanation: {
        intuition: ['Pull the two dots toward the dashed line. The readouts show the function at shrinking distances; the value they settle on is the limit. If the two sides disagree, or run off the chart, the limit does not exist.'],
        formal: ['$\\lim_{x \\to a} f(x) = L$ means: for every $\\varepsilon > 0$ there is a $\\delta > 0$ with $0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon$.', 'The value shown is a two-sided numerical estimate, not a symbolic proof.'],
      },
      derivation: [],
    }
  }

  if (p.kind === 'integral') {
    const a = num(p.a)
    const b = num(p.b)
    if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) return null
    const pad = Math.abs(b - a) * 0.25
    const domain: [number, number] = [Math.min(a, b) - pad, Math.max(a, b) + pad]
    return {
      ...base,
      id: 'adhoc',
      title: 'Integral explorer',
      equation: r`\int_{${toTex(p.a)}}^{${toTex(p.b)}} ${tex} \, dx`,
      summary: 'Approximate the area with rectangles, then add more until the sum stops changing.',
      prerequisites: ['integral', 'area-under-curve'],
      visualization: { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'riemann', rule: 'mid' } },
      parameters: {
        n: { label: 'number of rectangles', min: 1, max: 500, step: 1, value: 8 },
        a: { label: 'lower bound a', min: domain[0], max: domain[1], step: 0.01, value: a },
        b: { label: 'upper bound b', min: domain[0], max: domain[1], step: 0.01, value: b },
      },
      variables: [
        { symbol: 'a, b', meaning: 'where accumulation starts and stops' },
        { symbol: 'dx', meaning: 'the width of one slice' },
      ],
      explanation: {
        intuition: ['Each rectangle is height × width — a small piece of accumulated quantity. Increase the count and compare “sum of rectangles” with “exact integral”: the error melts away.'],
        formal: ['$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x$. Rectangles below the axis contribute negatively.', 'The reference value is computed numerically with Simpson’s rule.'],
      },
      derivation: [],
    }
  }

  const domain: [number, number] = [-6, 6]
  const d = derivativeExpr(p.expr)
  return {
    ...base,
    id: 'adhoc',
    title: p.kind === 'derivative' ? 'Derivative explorer' : 'Function explorer',
    equation: d ? r`f(x) = ${tex} \qquad f'(x) = ${toTex(d)}` : `f(x) = ${tex}`,
    summary: 'Drag the point along the curve. The tangent shows the instantaneous rate of change; the dashed curve collects those slopes.',
    prerequisites: ['function-graph', 'derivative'],
    visualization: { type: 'function-plot', options: { expr: p.expr, domain, range: autoRange(p.expr, domain), mode: 'tangent', showDerivative: true } },
    parameters: { x: { label: 'point x', min: -6, max: 6, step: 0.01, value: 1 } },
    variables: [
      { symbol: 'f(x)', meaning: 'the curve (solid)' },
      { symbol: "f'(x)", meaning: 'its slope at each x (dashed)' },
    ],
    explanation: {
      intuition: ['Where the curve climbs, the tangent tilts up and the dashed derivative is positive. At peaks and valleys the tangent is flat and the derivative crosses zero. Steeper curve, larger derivative.'],
      formal: ["$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$. The derivative shown in the equation is computed symbolically."],
    },
    derivation: [],
  }
}
