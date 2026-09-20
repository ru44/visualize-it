import { compile, derivative, parse } from 'mathjs'

export type Scope = Record<string, number>
export type Fn = (x: number, scope?: Scope) => number

/** Compile an expression in x (plus any named parameters) into a safe numeric function. */
export function makeFn(expr: string): Fn {
  const code = compile(expr)
  return (x, scope = {}) => {
    try {
      const v = code.evaluate({ ...scope, x })
      return typeof v === 'number' ? v : NaN
    } catch {
      return NaN
    }
  }
}

/** Symbolic d/dx, or null when mathjs cannot differentiate the expression. */
export function derivativeExpr(expr: string): string | null {
  try {
    return derivative(expr, 'x').toString()
  } catch {
    return null
  }
}

export function toTex(expr: string): string {
  try {
    return parse(expr).toTex()
  } catch {
    return expr
  }
}

export function numericSlope(f: (x: number) => number, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h)
}

export type RiemannRule = 'left' | 'mid' | 'right'

export function riemannSamples(f: (x: number) => number, a: number, b: number, n: number, rule: RiemannRule = 'left') {
  const dx = (b - a) / n
  const offset = rule === 'left' ? 0 : rule === 'mid' ? 0.5 : 1
  return Array.from({ length: n }, (_, i) => {
    const x0 = a + i * dx
    return { x0, dx, y: f(x0 + offset * dx) }
  })
}

export function riemannSum(f: (x: number) => number, a: number, b: number, n: number, rule: RiemannRule = 'left') {
  return riemannSamples(f, a, b, n, rule).reduce((s, r) => s + (Number.isFinite(r.y) ? r.y * r.dx : 0), 0)
}

/** Simpson's rule; used as the "exact" reference value. */
export function integrate(f: (x: number) => number, a: number, b: number, n = 2000): number {
  const h = (b - a) / n
  let s = f(a) + f(b)
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2)
  return (s * h) / 3
}

/** Two-sided numeric estimate of lim x→a f(x). */
export function estimateLimit(f: (x: number) => number, a: number): number {
  const e = 1e-7
  return (f(a - e) + f(a + e)) / 2
}

export function fmt(v: number, digits = 4): string {
  if (!Number.isFinite(v)) return '—'
  const s = v.toFixed(digits)
  return s.includes('.') ? s.replace(/\.?0+$/, '') || '0' : s
}
