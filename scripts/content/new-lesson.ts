// npm run new-lesson <subject> <id>   →  scaffolds content/lessons/<subject>/<id>/{lesson.yaml, en.md}
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { SUBJECTS } from './schema'

const [subject, id] = process.argv.slice(2)
if (!subject || !id || !(SUBJECTS as readonly string[]).includes(subject) || !/^[a-z0-9-]+$/.test(id)) {
  console.log(`usage: npm run new-lesson <subject> <kebab-case-id>\nsubjects: ${SUBJECTS.join(', ')}`)
  process.exit(1)
}
const dir = join(import.meta.dirname, '../../content/lessons', subject, id)
if (existsSync(dir)) (console.log('already exists: ' + dir), process.exit(1))
mkdirSync(dir, { recursive: true })
writeFileSync(
  join(dir, 'lesson.yaml'),
  `id: ${id}
subject: ${subject}
difficulty: beginner        # beginner | high-school | university | advanced
equation: 'f(x) = x^2'      # LaTeX shown as the headline
concepts: []
prerequisites: []           # lesson ids the learner should know first
related: []                 # lesson ids to go to next
visualization:
  type: function-plot       # see src/viz/registry.ts for every type and its options
  options:
    expr: x^2               # mathjs expression in x; parameters are in scope by name
    domain: [-4, 4]
    range: [-2, 12]
    mode: tangent           # plain | secant | tangent | limit | riemann | area
parameters:                 # ranges only — labels go in the language files
  x: { min: -4, max: 4, step: 0.01, value: 1 }
variables: ['x', 'f(x)']    # LaTeX symbols, explained in the same order in each <lang>.md
derivation:                 # LaTeX for each step; the notes live in <lang>.md
  - 'f(x) = x^2'
charts: []                  # optional: [{ domain: [0, 10], marker: x, series: ['2*x'] }]
`,
)
writeFileSync(
  join(dir, 'en.md'),
  `---
title: A short title
summary: One sentence that says what the learner will see and understand.
parameters:
  x: point x
variables:
  - the input
  - the output
charts: []
---

## Intuition

First paragraph. Refer to what the learner sees and drags. Inline maths goes between dollars: $f(x) = x^2$.

Second paragraph.

## Formal

The precise statement, with $\\LaTeX$ between dollars.

## Advanced

One paragraph for university level and above (optional).

## Derivation

1. Note for step 1, matching derivation[0] in lesson.yaml.

## Real world

### Where it is used
One or two sentences.
`,
)
console.log('created ' + dir + '\nnext: fill lesson.yaml and en.md, then `npm run check`')
