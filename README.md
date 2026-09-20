# Visualize It

**See what the equation means.** An interactive platform where equations from mathematics, calculus, physics, electricity and chemistry become simulations you can manipulate — built to answer *why the answer makes sense*, not just what it is.

Every concept follows the same path: **Equation → Visualization → Manipulation → Explanation → Derivation → Real-world use.**

## Features

- **Equation Explorer** — type `∫₀⁴ x² dx`, `lim(x→0) sin(x)/x`, `2x + 5 = 17`, `V = IR`… and get an interactive visualization
- **Step-by-step solver** — linear and quadratic equations with every transformation explained; numeric roots for anything else
- **12 core lessons** — function graph, slope, derivative, limit, integral, signed area, Pythagorean theorem, circle, unit circle, `F = ma`, `V = IR`, `PV = nRT`
- **Intuition / Formal modes** and four difficulty levels
- **Learning map** generated from lesson prerequisites
- Dark and light themes, keyboard- and touch-friendly

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build into dist/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml` (enable Pages → Source: GitHub Actions once in the repository settings).

## Architecture

```
src/lessons/    declarative lesson data (content only — no page code)
src/engine/     explorer (input parsing), math (mathjs wrapper), solve, adhoc lesson builder
src/viz/        visualization components + registry (type → component)
src/components/ Katex, MathText, ParamSlider, ParamChart (vue-chartjs), …
src/pages/      Home, LessonView (renders any lesson), MapView
```

Stack: Vue 3, TypeScript, Vite, Tailwind CSS v4, mathjs, KaTeX, d3-scale / d3-shape, Chart.js via vue-chartjs.

### Adding a lesson

Add an object to a file in `src/lessons/` (see `types.ts` for the schema) and include it in `src/lessons/index.ts`. If an existing visualization fits (`function-plot` covers most of calculus), that is all.

### Adding a visualization

Create `src/viz/MyViz.vue` with props `{ params, options }` that emits `set(name, value)` when the user drags something, then register it in `src/viz/registry.ts`.

## Classic simulations

The original vanilla-JS simulations from [visualize-it](https://github.com/visualize-it/visualize-it.github.io) are preserved unchanged under `public/legacy/` and linked from the site as “Classic sims”.
