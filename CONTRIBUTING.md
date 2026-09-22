# Contributing

Thank you for helping. Most contributions are text: better explanations, a new language, a new lesson. None of that needs TypeScript.

## Getting started

```bash
git clone https://github.com/ru44/visualize-it.git
cd visualize-it
pnpm install          # the project uses pnpm (https://pnpm.io); npm/yarn lockfiles are not kept
pnpm dev              # compiles content/ and starts the site at http://localhost:5173
pnpm check            # validates every lesson and translation, runs the engine tests
```

Open a pull request against `main`. CI runs `pnpm check`, `pnpm lint` and `pnpm build` on every pull request, so you will see any problem before a maintainer does. Please keep pull requests focused: one lesson, one language, or one component.

## Where things live

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

`pnpm check` compiles `content/` into `src/generated/` and rejects anything malformed: bad YAML, a missing section, a formula that does not evaluate, LaTeX that does not render, a translation whose maths differs from the English. The same check runs in CI, so a pull request cannot break the site.

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

Every symbol that appears in `equation` or `derivation` must be explained: either in the lesson's `variables` (lesson-specific meaning, e.g. `S` = wing area) or in the global guide `content/notation/<lang>.yaml` (Greek letters, operators, standard letters). `pnpm check` fails otherwise and names the letter. Lesson-specific meanings always win over the global one.

Rules the checker enforces: the number of `variables` explanations, `## Derivation` notes and chart labels must match `lesson.yaml`; every `$…$` segment in a translation must be identical to the English one (translate the words, never the maths); no LaTeX outside `$…$`.

Arabic text follows `content/lessons/STYLE.ar.md`.

## Add a language

1. Copy `content/ui/en.yaml` to `content/ui/<lang>.yaml` and translate the values (keep the keys and the `{placeholders}`).
2. Add `<lang>.md` next to `en.md` in any lesson folder. Lessons without a file fall back to English and show a small notice.
3. If the language is right-to-left, add its code to `RTL` in `src/i18n/index.ts`.

The language switch in the navigation cycles through every language found in `content/ui/`.

## Add videos

`content/videos.yaml` lists channels and playlists per subject; a lesson can add its own under `videos:` in `lesson.yaml`. Each entry needs `title`, `url`, `by`, `lang` and an optional one-sentence `note`. Only add links you have opened yourself, and prefer channels and playlists to single videos.

## Add a 3D scene

A lesson opts into 3D with `visualization3d: { type, options }` in `lesson.yaml`; types are registered in `src/viz3d/registry.ts`. A scene is a component using `useThree()` from `src/viz3d/useThree.ts`, with the same `params`/`options` props as 2D visualizations. Models are `.glb` files in `public/models/`, listed with their licence in `content/models.yaml` and loaded with `loadModel(name)`; scenes must still work when a model is missing.

## Add a lesson

```bash
pnpm new-lesson calculus chain-rule     # creates the folder with a template
```

Fill `lesson.yaml` and `en.md`, add the id to `content/lessons/calculus/_order.yaml`, run `pnpm check`, then `pnpm dev` and open `#/lesson/chain-rule`.

`lesson.yaml` picks a visualization by `type`. The types and their options are the components registered in `src/viz/registry.ts`; `function-plot` (any expression in `x`, with modes plain / secant / tangent / limit / riemann / area), `ode-system` (any system of differential equations), `surface-3d` and `discrete-dist` cover most new lessons without code. Parameters are declared with ranges in `lesson.yaml` and appear as sliders; their labels come from each language file.

## Add a visualization

Create `src/viz/MyViz.vue` with props `{ params: Record<string, number>; options: Record<string, any> }`, emit `set(name, value)` when the learner drags something, render into an 800×480 SVG (or canvas) using only the CSS variables in `src/style.css`, put a `<Readouts>` under it, and register it in `src/viz/registry.ts`. Any lesson can then use it by `type`.

## Reporting a wrong answer

Correctness matters more than anything here. If a lesson, the solver or the explorer shows a wrong or misleading result, open an issue with the exact input (the equation you typed or the lesson id and slider values) and what you expected. Numerical results must always carry the right label (exact / numerical / undetermined); a missing or wrong label is a bug too.

## Code

- `pnpm lint` and `pnpm format` before a pull request.
- State lives in Pinia stores (`src/stores/`): `settings` (language, theme, level) and `progress`.
- Numerical results shown to learners go through `src/engine/analysis.ts` and are labelled exact / numerical / undetermined; add a case to `scripts/test-engine.ts` for any new capability.
