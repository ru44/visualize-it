# Visualize It

**See what the equation means.** An interactive platform where equations from mathematics, calculus, physics, electricity and chemistry become simulations you can manipulate — built to answer *why the answer makes sense*, not just what it is.

Every concept follows the same path: **Equation → Visualization → Manipulation → Explanation → Derivation → Real-world use.**

## Features

- **Equation Explorer** — type `∫₀⁴ x² dx`, `lim(x→0) sin(x)/x`, `2x + 5 = 17`, `C(52,5)`, `7!`, `V = IR`… and get an interactive visualization
- **Step-by-step solver** — linear and quadratic equations with every transformation explained; numeric roots for anything else
- **300 lessons in 27 subjects**, in English and Arabic — algebra, functions, calculus, geometry, trigonometry, statistics & probability, discrete mathematics, numbers & big numbers, mechanics, waves & optics, electricity, electromagnetism, aerodynamics, thermodynamics, quantum physics, gravity & relativity, the universe (dark matter, dark energy, quarks, quasars), complex systems (life, flocking, fractals, tipping points), chemistry, computer science, cryptography, AI & machine learning, data & big data, biology, earth & space, economics & finance, signals & engineering
- **Real life and self-test in every lesson with sliders** — one-tap real situations that set the sliders (a car braking, a phone charging…) and challenges the learner solves by moving them; the build proves every challenge can be solved
- **Optional 3D scenes** (three.js) on lessons that opt in; **symbol guide** explaining every letter used in any formula; **progress checklist**; **video links** per subject
- **Graphing engine** (`/graph`) — functions, polar, parametric, implicit curves and vector fields with zoom, pan, derivative overlay and auto-generated parameter sliders
- **3D surfaces** with tangent plane and gradient; type `z = sin(x)·cos(y)` in the explorer
- **Arabic and English** with full right-to-left layout; every lesson is translated (`?lang=ar` forces the language in a shared link)
- **Answers you can trust** — every computed result is labelled *exact*, *numerical (with reliable digits)* or *cannot be determined*; limits that do not exist and improper integrals are reported as such instead of a made-up number
- **Intuition / Formal modes** and four difficulty levels (beginner by default; formal maths and derivations are folded away)
- **Learning map** generated from lesson prerequisites
- Dark and light themes, keyboard- and touch-friendly

## Run it

```bash
pnpm install
pnpm dev         # local development
pnpm build       # compile content, type-check, production build into dist/
pnpm check       # compile + validate all content, then run the engine tests
pnpm new-lesson <subject> <id>   # scaffold a lesson
ppnpm test        # known-answer tests for the numerical engine (limits, integrals, roots)
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

The 62 simulations of the original [visualize-it](https://github.com/visualize-it/visualize-it.github.io) project (by ChanRT and contributors) have been rebuilt as native lessons: Game of Life, flocking, the Ising and XY models, Lorenz, Mandelbrot, sandpiles, Schelling segregation, percolation, reaction-diffusion, mazes, ant colonies, k-means, Hopfield networks and the rest. They now have Arabic, sliders, real-life presets, challenges and progress like every other lesson, so the old `public/legacy/` folder and its gallery were removed.
