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

## Try it

1. Watch the curve sit near zero at low substrate concentration — almost no reaction happening yet.
2. Drag [S] up steadily. The rate climbs fast at first, almost one enzyme molecule per substrate molecule.
3. Keep dragging past Km. The curve flattens out, creeping toward Vmax but never quite touching it.

## Real-life examples

- **Lactase digesting milk sugar.** A fast, sensitive enzyme (Vmax = 8, Km = 1.5) working on a modest amount of lactose ([S] = 3) is already well up its curve, breaking sugar down quickly.
- **Alcohol dehydrogenase clearing ethanol.** The liver's enzyme (Vmax = 4, Km = 4) working at a matching substrate level ([S] = 4) runs at exactly half speed — this is part of what keeps blood-alcohol clearance roughly steady.
- **An enzyme swamped with substrate.** With plenty of substrate available ([S] = 25) and a moderate Km = 2, the enzyme is almost completely saturated, running close to its ceiling, Vmax = 5.

## Test yourself

1. Set [S] equal to Km so the reaction rate reaches exactly half of Vmax.
2. Push [S] high enough that the rate passes 90% of Vmax.
3. Using a fast enzyme with Km under 2, reach a reaction rate above 3.

## Intuition

Your saliva contains an enzyme called amylase that starts breaking down starch into sugar the moment you start chewing bread — but only up to a point. Drag the substrate-concentration slider, $[S]$, up from zero. The reaction rate climbs steeply at first: with few substrate molecules around, every enzyme quickly finds one to bind. Watch the curve bend over as $[S]$ keeps growing. Eventually nearly every enzyme is already busy, so adding more substrate barely helps, and the rate creeps toward its ceiling, $V_{max}$, without quite reaching it.

The straight line touching the curve at your chosen point is steep on the rising part and nearly flat once you are past a certain level. That level is called $K_m$. It marks the substrate concentration where the rate reaches exactly half of $V_{max}$. A small $K_m$ means the enzyme saturates, and nears its top speed, even at low substrate concentrations.

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
