---
title: Logistic population growth
summary: >-
  Populations do not grow forever: as numbers approach the environment’s
  carrying capacity, growth slows and levels off.
parameters:
  r: 'r — intrinsic growth rate, per year'
  K: K — carrying capacity
  P0: P₀ — starting population
  tView: time marker
variables:
  - population size at time t
  - >-
    intrinsic growth rate — how fast the population would grow with unlimited
    resources
  - carrying capacity — the population size the environment can sustain
  - the starting population size
---

## Intuition

Drag P0 low, near zero, and the curve starts by climbing almost like simple exponential growth — resources feel unlimited when so few individuals are competing for them. But watch what happens as the curve approaches K: it bends over and flattens, because the term $(1 - P/K)$ shrinks toward zero and chokes off further growth.

Raise K and the ceiling lifts, letting the same population grow further before levelling off. Raise r instead and the climb gets steeper without changing where it levels off — r sets the pace, K sets the destination. The steepest point of the whole curve is always at $P = K/2$, where growth is fastest before the slowdown takes hold.

## Formal

$\dfrac{dP}{dt} = rP\left(1 - \dfrac{P}{K}\right)$ has two equilibria, $P=0$ (unstable) and $P=K$ (stable): any $P_0$ with $0 < P_0 < K$ approaches $K$ as $t \to \infty$.

The solution is $P(t) = \dfrac{K}{1 + \left(\dfrac{K-P_0}{P_0}\right)e^{-rt}}$, an S-shaped (sigmoid) curve.

## Advanced

For $P$ slightly below $K$, writing $P = K - \epsilon$ gives $\dot\epsilon \approx -r\epsilon$: the population relaxes to carrying capacity exponentially, with rate $r$, exactly as a small perturbation would. This is why $r$ alone (not $K$) controls how quickly a disturbed population recovers to equilibrium.

## Derivation

1. Expand: growth is exponential ($rP$) minus a crowding term that grows with $P^2$.
2. Separate variables to integrate; partial fractions split the left side into $1/P$ and $1/(K-P)$ pieces.
3. Integrating and solving for $P$ gives the logistic (sigmoid) curve.

## Real world

### Yeast in a flask
Classic lab populations of yeast or bacteria follow this curve almost exactly once nutrients start to run out.

### Wildlife management
Deer or fish populations are managed by estimating K for a habitat and keeping harvests from pushing numbers above it.

### Island colonisation
A species introduced to an island grows fast at first, then its numbers level off near the island’s carrying capacity.

### Human population
Some demographers model regional population growth as logistic, with K set by resources, land and technology.
