---
title: 'Enzyme kinetics: Michaelis–Menten'
summary: >-
  An enzyme speeds up a reaction, but not without limit: as substrate piles up,
  the reaction rate approaches a ceiling set by how fast the enzyme itself can
  work.
parameters:
  Vmax: Vmax — maximum reaction rate
  Km: Km — substrate level at half-maximum rate
  x: '[S] — substrate concentration'
variables:
  - reaction rate at a given substrate concentration
  - substrate concentration
  - 'maximum rate, reached only as substrate becomes very large'
  - >-
    Michaelis constant — the substrate concentration at which the rate is half
    of Vmax
charts:
  - title: Effect of a competitive inhibitor
    xLabel: '[S] — substrate concentration'
    yLabel: v — reaction rate
    series:
      - 'no inhibitor: Vmax·[S]/(Km+[S])'
      - 'competitive inhibitor: apparent Km doubles'
---

## Intuition

Drag [S] from zero upward and the curve rises steeply at first — every enzyme molecule quickly finds a substrate to bind. But watch it bend over as [S] keeps growing: eventually almost every enzyme is already busy, so adding more substrate barely helps. The curve creeps toward Vmax but, mathematically, never quite reaches it.

The tangent line shown at your chosen [S] is steep on the rising part of the curve and nearly flat once you are past Km — literally showing where extra substrate still matters and where it stops mattering. Km itself marks the substrate level where the rate is exactly half of Vmax: a small Km means the enzyme is saturated (and near top speed) even at low substrate concentrations.

## Formal

$v = \dfrac{V_{max}[S]}{K_m+[S]}$ is increasing and concave, with $v\to V_{max}$ as $[S]\to\infty$ and $v=V_{max}/2$ exactly when $[S]=K_m$.

A competitive inhibitor raises the apparent $K_m$ without lowering $V_{max}$: more substrate can still out-compete the inhibitor and reach full speed.

## Advanced

The Michaelis–Menten equation follows from the steady-state assumption that the enzyme–substrate complex forms and breaks down at equal rates ($d[ES]/dt \approx 0$), which holds once substrate is in large excess over enzyme — a condition met in most textbook and industrial settings, though not always inside a crowded cell.

## Derivation

1. Enzyme and substrate bind reversibly to form a complex, which breaks down into product.
2. Assume the complex concentration is roughly steady: it forms about as fast as it breaks down.
3. Solving for $[ES]$ and substituting gives the Michaelis–Menten equation, with $V_{max}=k_2[E]_{total}$.

## Real world

### Drug design
Many drugs work as competitive inhibitors, raising a target enzyme’s apparent Km so normal substrate can no longer compete effectively at typical concentrations.

### Lactose intolerance
The enzyme lactase’s Km and Vmax determine how much dairy sugar the gut can process before symptoms appear.

### Industrial catalysis
Enzyme reactors are sized using Vmax and Km to predict throughput at a given substrate feed concentration.

### Liver enzymes and alcohol
Alcohol dehydrogenase’s kinetics set the roughly constant rate at which the body clears ethanol from the blood.
