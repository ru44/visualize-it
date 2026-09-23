---
title: Random walks
summary: >-
  Each step is a coin flip, +1 or −1 — no single path is predictable, but the
  typical distance from the start after n steps grows like the square root
  of n, not like n itself.
parameters:
  N: total steps
  walkers: paths shown
  speed: reveal speed
variables:
  - position relative to the start after n steps
  - how many steps have been taken
charts:
  - title: Typical distance from the start
    xLabel: N (steps)
    yLabel: distance
    series:
      - √N
---

## Try it

1. Watch the highlighted path. Every step it moves up or down by exactly 1, chosen at random.
2. Raise "walkers". More faint paths appear, all starting at 0 and all wandering differently.
3. Raise "N" a lot, then watch the shaded band: almost every path stays inside it, and the band widens like √N, not like N.

## Real-life examples

1. **Five short walks.** Two hundred steps each, and already the paths have drifted far from each other even though every step used the same rule.
2. **One very long walk.** Two thousand steps of a single path, wandering far from zero without any pull back toward it.
3. **A crowd of twenty walkers.** Eight hundred steps each, and the spread across all twenty traces out the shaded band almost exactly.

## Test yourself

1. Run a single walker for at least 1000 steps.
2. Show at least 15 walkers at once.
3. Set the step count to about 200.

## Intuition

Flip a coin for every step: heads move up one, tails move down one. After 4 steps you might be back at 0, or at +4, or anywhere in between — there's no way to predict exactly where one walker ends up. But watch many walkers doing this at once, and a pattern appears: most stay fairly close to the start, and only a few wander far, and how far "fairly close" means grows in a very specific way as the number of steps grows.

That growth is the whole point of this lesson. Double the number of steps and the typical distance from the start doesn't double — it only grows by about 1.4×, the square root of 2. Quadruple the steps and the typical distance only doubles. That slow, square-root growth shows up everywhere random accumulation happens, from a gambler's winnings to a pollen grain jittering in water.

## Formal

Let $x_n = x_{n-1} \pm 1$, starting at $x_0 = 0$, with each step an independent, equally likely $+1$ or $-1$. Then $E[x_n] = 0$: the walk has no preferred direction.

Because the steps are independent, their variances add: $\mathrm{Var}(x_n) = n$, so the typical size of $x_n$, its standard deviation, is $\sigma(x_n) = \sqrt{n}$ — far slower growth than $n$ itself.

## Advanced

As the step size shrinks and the number of steps grows without bound in a matching way, the random walk converges to Brownian motion, the continuous-time process behind the mathematics of diffusion, the pricing of financial options, and Einstein's 1905 explanation of why pollen grains jitter visibly under a microscope.

## Derivation

1. The walk starts exactly at the origin: $x_0 = 0$.
2. Every following step adds an independent, equally likely $+1$ or $-1$ to the previous position: $x_n = x_{n-1} \pm 1, \quad \text{each step independent}$.
3. Because the step variances add up one per step, the typical distance from the start after $n$ steps is $\sigma(x_n) = \sqrt{n}$.

## Real world

### Stock prices
Short-term price changes are often modelled as a random walk, which is why "the market went up because of X" is usually a story invented after the fact rather than a real cause.

### Diffusion
A dye molecule bumped randomly by water molecules traces a random walk, which is why a drop of ink spreads out over a distance proportional to the square root of time, not time itself.

### Animal foraging
Many animals search for food using paths that resemble random walks, covering ground broadly without needing to remember where they've already been.

### Genetic drift
The frequency of a gene in a small population can drift up or down by chance each generation, a random walk that can carry a harmless variant to fixation or extinction with no selection involved.
