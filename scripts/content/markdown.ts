// Reads and writes the lesson Markdown format:
//
//   ---            (frontmatter: title, summary, parameters, variables, charts)
//   ## Intuition   paragraphs separated by blank lines
//   ## Formal
//   ## Advanced    (optional)
//   ## Derivation  numbered list: one note per step, same order as lesson.yaml
//   ## Real world  "### Title" followed by a paragraph, repeated
import matter from 'gray-matter'
import { LessonText } from './schema'


export function parseLessonMd(src: string): LessonText {
  const { data, content } = matter(src)
  const parts: Record<string, string> = {}
  let cur = ''
  for (const line of content.split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line)
    if (m) {
      cur = m[1].toLowerCase()
      parts[cur] = ''
    } else if (cur) parts[cur] += line + '\n'
  }
  const paras = (s = '') => s.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  const steps = (s = '') => s.split(/\n(?=\s*\d+\.\s)/).map((p) => p.replace(/^\s*\d+\.\s*/, '').replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  const realWorld = (s = '') =>
    s.split(/\n(?=###\s)/).map((b) => b.trim()).filter(Boolean).map((b) => {
      const [head, ...rest] = b.split('\n')
      return { title: head.replace(/^###\s*/, '').trim(), text: rest.join(' ').replace(/\s+/g, ' ').trim() }
    })
  return LessonText.parse({
    ...data,
    intuition: paras(parts.intuition),
    formal: paras(parts.formal),
    advanced: paras(parts.advanced),
    derivationNotes: steps(parts.derivation),
    realWorld: realWorld(parts['real world']),
  })
}

export function writeLessonMd(t: LessonText): string {
  const fm: Record<string, unknown> = { title: t.title, summary: t.summary }
  if (Object.keys(t.parameters).length) fm.parameters = t.parameters
  if (t.variables.length) fm.variables = t.variables
  if (t.charts.length) fm.charts = t.charts
  let body = `\n## Intuition\n\n${t.intuition.join('\n\n')}\n\n## Formal\n\n${t.formal.join('\n\n')}\n`
  if (t.advanced.length) body += `\n## Advanced\n\n${t.advanced.join('\n\n')}\n`
  if (t.derivationNotes.length) body += `\n## Derivation\n\n${t.derivationNotes.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n`
  if (t.realWorld.length) body += `\n## Real world\n\n${t.realWorld.map((r) => `### ${r.title}\n${r.text}`).join('\n\n')}\n`
  return matter.stringify(body, fm)
}
