import katex from 'katex'
import { compile } from 'mathjs'
import { lessons } from '../src/lessons/index'
import { readFileSync } from 'node:fs'
const reg = readFileSync(new URL('../src/viz/registry.ts', import.meta.url), 'utf8')
const ids = new Set<string>(); let bad = 0
const err = (l: string, m: string) => { bad++; console.log(`✗ ${l}: ${m}`) }
const tex = (l: string, t: string, where: string) => { try { katex.renderToString(t, { throwOnError: true }) } catch (e: any) { err(l, `${where} katex: ${String(e.message).slice(0, 90)}`) } }
for (const l of lessons) {
  if (ids.has(l.id)) err(l.id, 'duplicate id'); ids.add(l.id)
}
for (const l of lessons) {
  for (const p of [...l.prerequisites, ...l.related]) if (!ids.has(p)) err(l.id, `unknown lesson ref '${p}'`)
  if (!reg.includes(`'${l.visualization.type}'`) && !reg.includes(` ${l.visualization.type}:`)) err(l.id, `viz type '${l.visualization.type}' not registered`)
  tex(l.id, l.equation, 'equation'); l.derivation.forEach((d, i) => tex(l.id, d.tex, `derivation[${i}]`)); l.variables.forEach((v) => tex(l.id, v.symbol, 'variable'))
  for (const t of [l.summary, ...l.explanation.intuition, ...l.explanation.formal, ...(l.explanation.advanced ?? []), ...l.derivation.map((d) => d.note), ...l.variables.map((v) => v.meaning)]) {
    const parts = t.split('$'); parts.forEach((p, i) => i % 2 === 0 && /\\[a-zA-Z]{2,}/.test(p) && err(l.id, `LaTeX outside $…$: ${p.slice(0, 50)}`)); if (parts.length % 2 === 0) err(l.id, `unbalanced $ in: ${t.slice(0, 50)}`)
    parts.forEach((p, i) => i % 2 && tex(l.id, p, 'inline'))
  }
  const scope: Record<string, number> = {}; for (const [k, s] of Object.entries(l.parameters)) { scope[k] = s.value; if (s.value < s.min || s.value > s.max) err(l.id, `param ${k} default outside range`) }
  const o = l.visualization.options
  const exprs: [string, [number, number]][] = []
  if (l.visualization.type === 'function-plot') {
    exprs.push([o.expr, o.domain])
    const need = { plain: ['x'], tangent: ['x'], secant: ['x', 'h'], limit: ['d'], riemann: ['n', 'a', 'b'], area: ['a', 'b'] }[o.mode as string] ?? []
    for (const n of need) if (!(n in l.parameters)) err(l.id, `mode ${o.mode} needs param '${n}'`)
    if (o.animate && !(o.animate.param in l.parameters)) err(l.id, 'animate param missing')
  }
  for (const c of l.charts ?? []) { for (const s of c.series) exprs.push([s.expr, c.domain]); if (c.marker && !(c.marker in l.parameters)) err(l.id, `chart marker '${c.marker}' missing`) }
  for (const [e, [a, b]] of exprs) {
    try {
      const code = compile(e); let fin = 0, inRange = 0
      for (let i = 0; i <= 40; i++) { let v = code.evaluate({ ...scope, x: a + ((b - a) * (i + 0.5)) / 41 }); if (v && Array.isArray(v.entries)) v = v.entries.at(-1); if (typeof v === 'number' && Number.isFinite(v)) { fin++; if (e === o.expr && v >= o.range[0] && v <= o.range[1]) inRange++ } }
      if (!fin) err(l.id, `expr never finite: ${e}`)
      else if (e === o.expr && inRange < 8) err(l.id, `curve mostly outside range ${JSON.stringify(o.range)} (${inRange}/41 visible): ${e}`)
    } catch (x: any) { err(l.id, `expr error "${e}": ${String(x.message).slice(0, 80)}`) }
  }
}
// ---- Arabic overlays: same shape as the base lesson, maths segments untouched --------------------
import('../src/lessons/ar/index').catch(() => null)
const { readdirSync } = await import('node:fs')
const arDir = new URL('../src/lessons/ar/', import.meta.url)
const ar: Record<string, any> = {}
for (const f of readdirSync(arDir)) if (f.endsWith('.ts') && f !== 'index.ts') for (const v of Object.values(await import(new URL(f, arDir).href))) Object.assign(ar, v)
const maths = (s: string) => [...new Set(s.split('$').filter((_, i) => i % 2).map((m) => m.replace(/\s+/g, '')))].sort().join('|')
let translated = 0
for (const l of lessons) {
  const x = ar[l.id]
  if (!x) { err(l.id, 'no Arabic translation'); continue }
  translated++
  const same = (n: string, a: number, b: number) => a !== b && err(l.id, `ar.${n}: ${a} items, base has ${b}`)
  same('variables', x.variables.length, l.variables.length); same('intuition', x.intuition.length, l.explanation.intuition.length); same('formal', x.formal.length, l.explanation.formal.length)
  same('derivationNotes', x.derivationNotes.length, l.derivation.length); same('realWorld', x.realWorld.length, l.realWorld.length); same('charts', (x.charts ?? []).length, (l.charts ?? []).length)
  for (const k of Object.keys(l.parameters)) if (!x.parameters[k]) err(l.id, `ar.parameters missing '${k}'`)
  const pairs: [string, string][] = [[l.summary, x.summary], ...l.explanation.intuition.map((s, i) => [s, x.intuition[i] ?? ''] as [string, string]), ...l.explanation.formal.map((s, i) => [s, x.formal[i] ?? ''] as [string, string]), ...l.derivation.map((d, i) => [d.note, x.derivationNotes[i] ?? ''] as [string, string])]
  for (const [en, tr] of pairs) {
    if (tr.split('$').length % 2 === 0) err(l.id, `ar: unbalanced $ in: ${tr.slice(0, 40)}`)
    else { tr.split('$').forEach((p, i) => i % 2 && tex(l.id, p, 'ar inline')); if (maths(en) !== maths(tr)) err(l.id, `ar: maths differs from English in: ${tr.slice(0, 40)}`) }
  }
}
console.log(`${lessons.length} lessons checked (${translated} with Arabic), ${bad} problems`)
if (bad) process.exit(1)
