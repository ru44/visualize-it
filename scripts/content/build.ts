// Compiles content/ into src/generated/*.json and reports every problem with file + field.
//   content/lessons/<subject>/<id>/lesson.yaml + <lang>.md   →  lessons.json, lessons.<lang>.json
//   content/ui/<lang>.yaml (+ content/ui/<lang>/*.yaml)         →  ui.<lang>.json
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import YAML from 'yaml'
import katex from 'katex'
import { compile } from 'mathjs'
import { LessonYaml, SUBJECTS, Video } from './schema'
import { z } from 'zod'
import { parseLessonMd } from './markdown'
import { collectModels } from './models'
import { symbolsOf, tokensOfVariable } from './symbols'

const ROOT = join(import.meta.dirname, '../..')
const CONTENT = join(ROOT, 'content')
const OUT = join(ROOT, 'src/generated')
mkdirSync(OUT, { recursive: true })

const problems: string[] = []
const err = (where: string, msg: string) => problems.push(`${where}: ${msg}`)
const tex = (where: string, t: string) => {
  try {
    katex.renderToString(t, { throwOnError: true })
  } catch (e: any) {
    err(where, `LaTeX: ${String(e.message).slice(0, 80)}`)
  }
}
const mathSegments = (s: string) => [...new Set(s.split('$').filter((_, i) => i % 2).map((m) => m.replace(/\s+/g, '')))].sort().join('|')
function checkProse(where: string, s: string) {
  const parts = s.split('$')
  if (parts.length % 2 === 0) err(where, `unbalanced $ in "${s.slice(0, 40)}"`)
  parts.forEach((p, i) => (i % 2 ? tex(where, p) : /\\[a-zA-Z]{2,}/.test(p) && err(where, `LaTeX outside $…$: "${p.slice(0, 40)}"`)))
}

// ---- notation glossary ------------------------------------------------------------------------
const notation: Record<string, Record<string, any>> = {}
for (const f of readdirSync(join(CONTENT, 'notation'))) notation[f.replace('.yaml', '')] = YAML.parse(readFileSync(join(CONTENT, 'notation', f), 'utf8')) ?? {}
const glossary = new Set(Object.keys(notation.en ?? {}))
const NOTATION_KEYS = new Set(['name', 'read', 'meaning', 'simple', 'example', 'lesson', 'group'])
for (const [lang, d] of Object.entries(notation)) for (const [k, e] of Object.entries(d)) { for (const f of Object.keys(e as object)) if (!NOTATION_KEYS.has(f)) err(`content/notation/${lang}.yaml`, `${k}: unknown field "${f}"`); if (!(e as any).simple) err(`content/notation/${lang}.yaml`, `${k}: missing "simple" (one plain sentence)`) }
for (const [lang, d] of Object.entries(notation)) if (lang !== 'en') for (const k of glossary) if (!(k in d)) err(`content/notation/${lang}.yaml`, `missing entry for ${k}`)
const IGNORE = new Set(['\\text', '\\mathrm', '\\frac', '\\sqrt', 'd'])

// ---- lessons --------------------------------------------------------------------------------------
const lessons: any[] = []
const texts: Record<string, Record<string, any>> = {}
const order = SUBJECTS as readonly string[]
for (const subject of readdirSync(join(CONTENT, 'lessons')).sort((a, b) => order.indexOf(a) - order.indexOf(b))) {
  const dir = join(CONTENT, 'lessons', subject)
  if (!statSync(dir).isDirectory()) continue
  const orderFile = join(dir, '_order.yaml')
  let ids: string[] = readdirSync(dir).filter((d) => statSync(join(dir, d)).isDirectory()).sort()
  if (existsSync(orderFile)) {
    try {
      const listed: string[] = YAML.parse(readFileSync(orderFile, 'utf8')) ?? []
      for (const id of ids) if (!listed.includes(id)) err(`content/lessons/${subject}/_order.yaml`, `lesson "${id}" exists but is not listed`)
      ids = listed
    } catch (e: any) {
      err(`content/lessons/${subject}/_order.yaml`, `invalid YAML: ${String(e.message).split('\n')[0]}`)
    }
  }
  for (const id of ids) {
    const ldir = join(dir, id)
    const where = `content/lessons/${subject}/${id}`
    if (!existsSync(join(ldir, 'lesson.yaml'))) {
      err(where, 'missing lesson.yaml')
      continue
    }
    let rawYaml: unknown
    try {
      rawYaml = YAML.parse(readFileSync(join(ldir, 'lesson.yaml'), 'utf8'))
    } catch (e: any) {
      err(`${where}/lesson.yaml`, `invalid YAML: ${String(e.message).split('\n')[0]}`)
      continue
    }
    const parsed = LessonYaml.safeParse(rawYaml)
    if (!parsed.success) {
      for (const i of parsed.error.issues) err(`${where}/lesson.yaml`, `${i.path.join('.')}: ${i.message}`)
      continue
    }
    const L = parsed.data
    if (L.id !== id) err(`${where}/lesson.yaml`, `id "${L.id}" must equal the folder name`)
    if (L.subject !== subject) err(`${where}/lesson.yaml`, `subject "${L.subject}" must equal the parent folder`)
    tex(`${where}/lesson.yaml equation`, L.equation)
    L.variables.forEach((v) => tex(`${where}/lesson.yaml variables`, v))
    L.derivation.forEach((d, i) => tex(`${where}/lesson.yaml derivation[${i}]`, d))
    // Every symbol in the formulas must be explained: by this lesson's variables or by the notation glossary.
    const explained = new Set(L.variables.flatMap(tokensOfVariable))
    const used = new Set<string>()
    for (const tex of [L.equation, ...L.derivation]) for (const tok of symbolsOf(tex)) used.add(tok)
    const extra: string[] = []
    for (const tok of used) {
      if (explained.has(tok)) continue
      const base = tok.includes('_') ? tok.split('_')[0] : tok
      if (explained.has(base)) continue
      if (glossary.has(tok) || glossary.has(base)) {
        if (!IGNORE.has(tok) && !IGNORE.has(base)) extra.push(glossary.has(tok) ? tok : base)
        continue
      }
      err(`${where}/lesson.yaml`, `symbol "${tok}" appears in a formula but is not explained (add it to variables, or to content/notation/en.yaml)`)
    }
    ;(L as any).symbols = [...new Set(extra)]
    // Real-life presets must use existing parameters within their ranges.
    L.presets.forEach((pr, i) => { for (const [k, v] of Object.entries(pr)) { const spec = L.parameters[k]; if (!spec) err(`${where}/lesson.yaml`, `presets[${i}]: "${k}" is not a parameter`); else if (v < spec.min || v > spec.max) err(`${where}/lesson.yaml`, `presets[${i}]: ${k} = ${v} is outside [${spec.min}, ${spec.max}]`) } })
    // Every challenge must be solvable with the sliders: search the parameter space for a passing setting.
    L.challenges.forEach((ch, i) => {
      let code
      try { code = compile(ch.check) } catch (e: any) { return err(`${where}/lesson.yaml`, `challenges[${i}].check: ${String(e.message).slice(0, 80)}`) }
      const names = Object.keys(L.parameters)
      const passes = (sc: Record<string, number>) => { try { const v = code.evaluate(sc); if (ch.target === undefined) return !!v; const tol = ch.tol ?? Math.max(0.01, Math.abs(ch.target) * 0.02); return typeof v === 'number' && Math.abs(v - ch.target) <= tol } catch { return false } }
      const snap = (k: string, v: number) => { const p = L.parameters[k]; return Math.min(p.max, Math.max(p.min, p.min + Math.round((v - p.min) / p.step) * p.step)) }
      let ok = false
      // Deterministic search (a seeded generator, so CI never flakes). Tight tasks usually pin some
      // sliders to "likely" values: the default, preset values and the numbers written in the check.
      // Each round starts from a point built mostly from those, then sweeps one slider across its
      // whole range, so a task like "a = 5, n = 23, find k" is found quickly.
      let seed = [...`${where}#${i}`].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)
      const rand = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
      const literals = (ch.check.match(/\d+(?:\.\d+)?/g) ?? []).map(Number).flatMap((v) => [v, -v])
      const likely: Record<string, number[]> = {}
      const grid: Record<string, number[]> = {}
      for (const k of names) {
        const p = L.parameters[k]
        const cands = [p.value, ...literals, ...L.presets.map((q) => q[k]).filter((v) => v !== undefined)]
        likely[k] = [...new Set(cands.filter((v) => v >= p.min && v <= p.max).map((v) => snap(k, v)))]
        const steps = Math.round((p.max - p.min) / p.step)
        const count = Math.min(steps, 400)
        grid[k] = [...new Set([...likely[k], ...Array.from({ length: count + 1 }, (_, j) => snap(k, p.min + (j / count) * (p.max - p.min)))])]
      }
      const pick = (k: string) => (rand() < 0.6 && likely[k].length ? likely[k][Math.floor(rand() * likely[k].length)] : grid[k][Math.floor(rand() * grid[k].length)])
      for (let round = 0; round < 3000 && !ok; round++) {
        const sc: Record<string, number> = {}
        for (const k of names) sc[k] = round === 0 ? L.parameters[k].value : pick(k)
        const free = names[round % names.length]
        for (const v of grid[free]) { sc[free] = v; if ((ok = passes(sc))) break }
      }
      if (!ok) err(`${where}/lesson.yaml`, `challenges[${i}] ("${ch.check}"${ch.target !== undefined ? ` = ${ch.target}` : ''}) cannot be reached with the sliders`)
    })
    for (const [k, p] of Object.entries(L.parameters)) if (p.value < p.min || p.value > p.max) err(`${where}/lesson.yaml`, `parameter ${k}: default outside [min, max]`)
    const scope = Object.fromEntries(Object.entries(L.parameters).map(([k, p]) => [k, p.value]))
    const o = L.visualization.options
    const exprs: [string, [number, number], boolean][] = []
    if (L.visualization.type === 'function-plot') {
      exprs.push([o.expr, o.domain, true])
      const need = ({ plain: ['x'], tangent: ['x'], secant: ['x', 'h'], limit: ['d'], riemann: ['n', 'a', 'b'], area: ['a', 'b'] } as Record<string, string[]>)[o.mode] ?? []
      for (const n of need) if (!(n in L.parameters)) err(`${where}/lesson.yaml`, `mode ${o.mode} needs parameter "${n}"`)
      if (o.animate && !(o.animate.param in L.parameters)) err(`${where}/lesson.yaml`, 'animate.param is not a parameter')
    }
    L.charts.forEach((c) => {
      c.series.forEach((e) => exprs.push([e, c.domain, false]))
      if (c.marker && !(c.marker in L.parameters)) err(`${where}/lesson.yaml`, `chart marker "${c.marker}" is not a parameter`)
    })
    for (const [e, [a, b], main] of exprs) {
      try {
        const code = compile(e)
        let fin = 0
        let inRange = 0
        for (let i = 0; i <= 40; i++) {
          let v = code.evaluate({ ...scope, x: a + ((b - a) * (i + 0.5)) / 41 })
          if (v && Array.isArray(v.entries)) v = v.entries.at(-1)
          if (typeof v === 'number' && Number.isFinite(v)) {
            fin++
            if (main && v >= o.range[0] && v <= o.range[1]) inRange++
          }
        }
        if (!fin) err(`${where}/lesson.yaml`, `expression never finite: ${e}`)
        else if (main && inRange < 8) err(`${where}/lesson.yaml`, `curve mostly outside range ${JSON.stringify(o.range)}: ${e}`)
      } catch (x: any) {
        err(`${where}/lesson.yaml`, `expression "${e}": ${String(x.message).slice(0, 80)}`)
      }
    }

    // language files
    const langs = readdirSync(ldir).filter((f) => /^[a-z]{2}(-[A-Za-z]+)?\.md$/.test(f)).map((f) => f.replace('.md', ''))
      .sort((a, b) => (a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b)))
    if (!langs.includes('en')) err(where, 'missing en.md')
    const en: any = {}
    for (const lang of langs) {
      if (lang !== 'en' && !en.intuition) break
      const w = `${where}/${lang}.md`
      let T
      try {
        T = parseLessonMd(readFileSync(join(ldir, `${lang}.md`), 'utf8'))
      } catch (e: any) {
        err(w, e.issues ? e.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join('; ') : String(e.message))
        continue
      }
      if (T.variables.length !== L.variables.length) err(w, `variables: ${T.variables.length} explanations for ${L.variables.length} symbols`)
      if (T.derivationNotes.length !== L.derivation.length) err(w, `## Derivation: ${T.derivationNotes.length} notes for ${L.derivation.length} steps`)
      if (T.presets.length !== L.presets.length) err(w, `## Real-life examples: ${T.presets.length} items, lesson.yaml has ${L.presets.length} presets`)
      if (T.challenges.length !== L.challenges.length) err(w, `## Test yourself: ${T.challenges.length} items, lesson.yaml has ${L.challenges.length} challenges`)
      if (T.charts.length !== L.charts.length) err(w, `charts: ${T.charts.length} described, lesson.yaml has ${L.charts.length}`)
      T.charts.forEach((c, i) => L.charts[i] && c.series.length !== L.charts[i].series.length && err(w, `charts[${i}].series: ${c.series.length} labels for ${L.charts[i].series.length} series`))
      for (const k of Object.keys(L.parameters)) if (!T.parameters[k]) err(w, `parameters: missing label for "${k}"`)
      if (L.primary && !(L.primary in L.parameters)) err(`${where}/lesson.yaml`, `primary "${L.primary}" is not a parameter`)
      for (const s of [T.summary, ...T.tryIt, ...T.presets.map((p) => p.text), ...T.challenges, ...T.intuition, ...T.formal, ...T.advanced, ...T.derivationNotes, ...T.variables, ...T.realWorld.map((r) => r.text)]) checkProse(w, s)
      if (lang === 'en') Object.assign(en, T)
      else {
        // Maths must be identical to the English text, paragraph by paragraph.
        const pairs: [string, string][] = [[en.summary, T.summary], ...en.intuition.map((s: string, i: number) => [s, T.intuition[i] ?? ''] as [string, string]), ...en.formal.map((s: string, i: number) => [s, T.formal[i] ?? ''] as [string, string]), ...en.derivationNotes.map((s: string, i: number) => [s, T.derivationNotes[i] ?? ''] as [string, string])]
        if (T.tryIt.length !== en.tryIt.length) err(w, `## Try it: ${T.tryIt.length} steps, en.md has ${en.tryIt.length}`)
        if (T.intuition.length !== en.intuition.length) err(w, `## Intuition: ${T.intuition.length} paragraphs, en.md has ${en.intuition.length}`)
        if (T.formal.length !== en.formal.length) err(w, `## Formal: ${T.formal.length} paragraphs, en.md has ${en.formal.length}`)
        for (const [e, x] of pairs) if (x && mathSegments(e) !== mathSegments(x)) err(w, `maths differs from en.md in "${x.slice(0, 40)}"`)
      }
      ;(texts[lang] ??= {})[id] = T
    }
    lessons.push(L)
  }
}
const ids = new Set(lessons.map((l) => l.id))
for (const [k, e] of Object.entries(notation.en ?? {})) if ((e as any).lesson && !ids.has((e as any).lesson)) err('content/notation/en.yaml', `${k}: lesson "${(e as any).lesson}" does not exist`)
for (const l of lessons) for (const p of [...l.prerequisites, ...l.related]) if (!ids.has(p)) err(`content/lessons/${l.subject}/${l.id}/lesson.yaml`, `unknown lesson reference "${p}"`)

// ---- ui strings -----------------------------------------------------------------------------------
// content/ui/<lang>.yaml holds the site's strings. A folder content/ui/<lang>/ may hold extra
// files whose keys are merged in, so a new visualization can ship its strings without every
// contributor editing the same file.
const ui: Record<string, Record<string, string>> = {}
for (const f of readdirSync(join(CONTENT, 'ui'), { withFileTypes: true })) {
  if (!f.isFile() || !f.name.endsWith('.yaml')) continue
  const lang = f.name.replace('.yaml', '')
  ui[lang] = YAML.parse(readFileSync(join(CONTENT, 'ui', f.name), 'utf8'))
  const extra = join(CONTENT, 'ui', lang)
  if (existsSync(extra))
    for (const g of readdirSync(extra).filter((x) => x.endsWith('.yaml')).sort()) {
      const part = YAML.parse(readFileSync(join(extra, g), 'utf8')) ?? {}
      for (const [k, v] of Object.entries(part as Record<string, string>)) {
        if (k in ui[lang]) err(`content/ui/${lang}/${g}`, `key "${k}" is already defined`)
        ui[lang][k] = v
      }
    }
}
for (const [lang, d] of Object.entries(ui)) if (lang !== 'en') for (const k of Object.keys(ui.en)) if (!(k in d)) err(`content/ui/${lang}.yaml`, `missing key "${k}"`)

// ---- videos ---------------------------------------------------------------------------------------
const videosRaw = YAML.parse(readFileSync(join(CONTENT, 'videos.yaml'), 'utf8')) ?? {}
const videos = z.partialRecord(z.enum(SUBJECTS), z.array(Video)).safeParse(videosRaw)
if (!videos.success) for (const i of videos.error.issues) err('content/videos.yaml', `${i.path.join('.')}: ${i.message}`)

// ---- classic simulations -----------------------------------------------------------------------------
const classic = YAML.parse(readFileSync(join(CONTENT, 'classic', 'manifest.yaml'), 'utf8'))
const classicText: Record<string, any> = {}
for (const f of readdirSync(join(CONTENT, 'classic'))) if (f.endsWith('.yaml') && f !== 'manifest.yaml') classicText[f.replace('.yaml', '')] = YAML.parse(readFileSync(join(CONTENT, 'classic', f), 'utf8'))
// The simulations' own words: content/classic/text/<lang>/<sim-id>.yaml maps each English string on
// the page (as embed.js reads it) to its translation. {0}, {1} stand for numbers the page fills in.
const classicPageText: Record<string, Record<string, Record<string, string>>> = {}
const textDir = join(CONTENT, 'classic', 'text')
if (existsSync(textDir))
  for (const lang of readdirSync(textDir)) {
    classicPageText[lang] = {}
    for (const f of readdirSync(join(textDir, lang)).filter((x) => x.endsWith('.yaml'))) {
      const id = f.replace('.yaml', '')
      const where = `content/classic/text/${lang}/${f}`
      if (!classic.some((c: { id: string }) => c.id === id)) err(where, `no simulation called "${id}"`)
      let d: unknown
      try { d = YAML.parse(readFileSync(join(textDir, lang, f), 'utf8')) ?? {} } catch (e: any) { err(where, `invalid YAML: ${String(e.message).split('\n')[0]}`); continue }
      const out: Record<string, string> = {}
      for (const [k, v] of Object.entries(d as Record<string, unknown>)) {
        if (typeof v !== 'string' || !v.trim()) { err(where, `"${k.slice(0, 40)}" has no translation`); continue }
        const ph = (x: string) => (x.match(/\{\d+\}/g) ?? []).sort().join()
        if (ph(k) !== ph(v)) err(where, `"${k.slice(0, 40)}": the placeholders {0}, {1}… must match`)
        out[k] = v
      }
      classicPageText[lang][id] = out
    }
  }

// ---- write --------------------------------------------------------------------------------------------
const write = (name: string, data: unknown) => writeFileSync(join(OUT, name), JSON.stringify(data))
write('lessons.json', lessons)
for (const [lang, t] of Object.entries(texts)) write(`lessons.${lang}.json`, t)
for (const [lang, d] of Object.entries(ui)) write(`ui.${lang}.json`, d)
write('classic.json', classic)
write('videos.json', videos.success ? videos.data : {})
const models = collectModels(ROOT)
for (const [n, m] of Object.entries(models)) if (m.bytes > 6e6) err(`public/models/${n}.glb`, `${(m.bytes / 1e6).toFixed(1)} MB is too heavy for the web (keep models under 6 MB)`)
write('models.json', models)
for (const [lang, d] of Object.entries(notation)) write(`notation.${lang}.json`, d)
for (const [lang, d] of Object.entries(classicText)) write(`classic.${lang}.json`, d)
for (const [lang, d] of Object.entries(classicPageText)) write(`classic-text.${lang}.json`, d)
writeFileSync(join(OUT, 'languages.json'), JSON.stringify(Object.keys(ui)))

const langs = Object.keys(texts)
console.log(`${lessons.length} lessons · languages: ${langs.map((l) => `${l} (${Object.keys(texts[l]).length})`).join(', ')} · ${problems.length} problems`)
for (const p of problems) console.log('✗ ' + p)
if (problems.length && !process.argv.includes('--force')) process.exit(1)
