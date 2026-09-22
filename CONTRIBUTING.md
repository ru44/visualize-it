# Contributing

Everything a learner reads lives in `content/`, as YAML and Markdown. You do not need to touch TypeScript to add a lesson, fix a sentence or add a language.

```
content/
  lessons/<subject>/<lesson-id>/
      lesson.yaml      the language-neutral part: equation, visualization, parameter ranges, links
      en.md            the English text (required)
      ar.md, fr.md …   one file per language, same structure
  lessons/<subject>/_order.yaml   the order lessons appear in that subject
  ui/<lang>.yaml       interface strings (buttons, labels, messages)
  classic/             titles and descriptions of the classic simulations
```

`npm run check` compiles `content/` into `src/generated/` and rejects anything malformed: bad YAML, a missing section, a formula that does not evaluate, LaTeX that does not render, a translation whose maths differs from the English. The same check runs in CI, so a pull request cannot break the site.

## Improve the text of a lesson

Edit `content/lessons/<subject>/<id>/<lang>.md`. The file has a short frontmatter and five sections:

```markdown
---
title: Derivative
summary: One sentence shown under the title and in lists.
parameters:            # slider labels, one per parameter in lesson.yaml
  x: point x
variables:             # one explanation per symbol in lesson.yaml, same order
  - the curve (solid)
  - its slope at each x (dashed)
charts: []             # only if lesson.yaml has charts: [{ title, xLabel, yLabel, series: [labels] }]
---

## Intuition
Plain-language paragraphs (beginner level). Refer to what the learner sees and drags.

## Formal
The precise statement. Inline maths goes between dollars: $f'(x) = \lim_{h \to 0} \dfrac{f(x+h)-f(x)}{h}$.

## Advanced
One paragraph for university level and above. Optional.

## Derivation
1. A note for each step in lesson.yaml's `derivation`, in order.

## Real world
### A place it is used
One or two sentences. Repeat the `###` block for each example.
```

Rules the checker enforces: the number of `variables` explanations, `## Derivation` notes and chart labels must match `lesson.yaml`; every `$…$` segment in a translation must be identical to the English one (translate the words, never the maths); no LaTeX outside `$…$`.

Arabic text follows `content/lessons/STYLE.ar.md`.

## Add a language

1. Copy `content/ui/en.yaml` to `content/ui/<lang>.yaml` and translate the values (keep the keys and the `{placeholders}`).
2. Add `<lang>.md` next to `en.md` in any lesson folder. Lessons without a file fall back to English and show a small notice.
3. If the language is right-to-left, add its code to `RTL` in `src/i18n/index.ts`.

The language switch in the navigation cycles through every language found in `content/ui/`.

## Add a lesson

```bash
npm run new-lesson calculus chain-rule     # creates the folder with a template
```

Fill `lesson.yaml` and `en.md`, add the id to `content/lessons/calculus/_order.yaml`, run `npm run check`, then `npm run dev` and open `#/lesson/chain-rule`.

`lesson.yaml` picks a visualization by `type`. The types and their options are the components registered in `src/viz/registry.ts`; `function-plot` (any expression in `x`, with modes plain / secant / tangent / limit / riemann / area), `ode-system` (any system of differential equations), `surface-3d` and `discrete-dist` cover most new lessons without code. Parameters are declared with ranges in `lesson.yaml` and appear as sliders; their labels come from each language file.

## Add a visualization

Create `src/viz/MyViz.vue` with props `{ params: Record<string, number>; options: Record<string, any> }`, emit `set(name, value)` when the learner drags something, render into an 800×480 SVG (or canvas) using only the CSS variables in `src/style.css`, put a `<Readouts>` under it, and register it in `src/viz/registry.ts`. Any lesson can then use it by `type`.

## Code

- `npm run lint` and `npm run format` before a pull request.
- State lives in Pinia stores (`src/stores/`): `settings` (language, theme, level) and `progress`.
- Numerical results shown to learners go through `src/engine/analysis.ts` and are labelled exact / numerical / undetermined; add a case to `scripts/test-engine.ts` for any new capability.
