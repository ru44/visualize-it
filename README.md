# Visualize It

**See what the equation means.** An interactive platform where equations from mathematics, calculus, physics, electricity and chemistry become simulations you can manipulate — built to answer *why the answer makes sense*, not just what it is.

Every concept follows the same path: **Equation → Visualization → Manipulation → Explanation → Derivation → Real-world use.**

## Features

- **Equation Explorer** — type `∫₀⁴ x² dx`, `lim(x→0) sin(x)/x`, `2x + 5 = 17`, `C(52,5)`, `7!`, `V = IR`… and get an interactive visualization
- **Step-by-step solver** — linear and quadratic equations with every transformation explained; numeric roots for anything else
- **79 lessons in 13 subjects** — algebra, functions, calculus (limits → multivariable), geometry, trigonometry, statistics & probability (permutations, combinations, binomial, Poisson, normal, Bayes…), mechanics, waves, electricity, electromagnetism, aerodynamics, thermodynamics, chemistry
- **Graphing engine** (`/graph`) — functions, polar, parametric, implicit curves and vector fields with zoom, pan, derivative overlay and auto-generated parameter sliders
- **3D surfaces** with tangent plane and gradient; type `z = sin(x)·cos(y)` in the explorer
- **Arabic and English** with full right-to-left layout; every lesson is translated (`?lang=ar` forces the language in a shared link)
- **Answers you can trust** — every computed result is labelled *exact*, *numerical (with reliable digits)* or *cannot be determined*; limits that do not exist and improper integrals are reported as such instead of a made-up number
- **Intuition / Formal modes** and four difficulty levels (beginner by default; formal maths and derivations are folded away)
- **Learning map** generated from lesson prerequisites
- Dark and light themes, keyboard- and touch-friendly

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build into dist/
npm run check    # compile + validate all content, then run the engine tests
npm run new-lesson <subject> <id>   # scaffold a lesson
npm test         # known-answer tests for the numerical engine (limits, integrals, roots)
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml` (enable Pages → Source: GitHub Actions once in the repository settings).

## Architecture

```
content/        all lesson text and interface strings — YAML + Markdown, one folder per lesson, one .md per language
scripts/content build.ts compiles content/ → src/generated/*.json and validates every file; new-lesson.ts scaffolds
src/engine/     explorer (input parsing), math, analysis (checked limits/integrals/roots), stats, solve, adhoc
src/viz/        visualization components + registry (type → component)
src/stores/     Pinia: settings (language, theme, level), progress (lessons marked done)
src/pages/      Home, SubjectView, LessonView (renders any lesson), GraphView, MapView, Classic*
```

Stack: Vue 3, TypeScript, Vite, Pinia, Tailwind CSS v4, mathjs, KaTeX, d3-scale / d3-shape, Chart.js.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to improve a lesson's text, add a language, add a lesson or add a visualization.

## Simulation gallery

The 62 simulations of the original [visualize-it](https://github.com/visualize-it/visualize-it.github.io) project (by ChanRT and contributors) live under `public/legacy/` and are part of the new site at `/classic`: a catalogue by topic with English and Arabic titles, and a viewer page for each one. Their code runs unchanged in a frame, but `public/legacy/embed.css` + `embed.js` restyle them, follow the site's light/dark theme and size the frame to its content. The third-party analytics snippet was removed from those pages. `src/classic/manifest.json` lists them.
