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

## Try it

1. Watch the curve start low and climb almost like unchecked exponential growth.
2. Raise K, the carrying capacity. The population now has more room and grows to a higher final level.
3. Raise r, the growth rate, instead. The climb gets steeper, but it still levels off at the same K.

## Real-life examples

- **Yeast in a small flask.** A fast grower (r = 0.8) starting from just 10 cells fills a small flask (K = 200) quickly, then levels off once nutrients run short.
- **A deer herd in a forest.** A moderate growth rate (r = 0.25) lets 50 deer grow toward a forest's carrying capacity of 1000, slowing as they approach it.
- **A recovering whale population.** A slow-breeding species (r = 0.06) starting from just 20 individuals takes many years to approach a capacity of 500.

## Test yourself

1. Set the starting population at exactly half the carrying capacity — the fastest-growing point on the curve.
2. Give the population room to grow twentyfold: make K at least 20 times P0.
3. Make the population recover quickly by setting r above 0.5 while starting from fewer than 30 individuals.

## Intuition

Yeast added to a flask of sugar water multiplies fast at first, doubling again and again — but a flask can only hold so much life, and growth eventually stalls. Drag the starting-population slider, P0, down near zero. The curve climbs almost like plain exponential growth, because resources feel unlimited when so few individuals are competing for them. Now watch what happens as the curve approaches the ceiling set by K, the environment's carrying capacity: it bends over and flattens, because growth chokes off once the population gets close to what the environment can support.

Raise K, the ceiling itself, and the population gets room to grow further before levelling off. Raise r instead, the growth rate, and the climb gets steeper without moving that ceiling — r sets the pace, K sets the destination. The whole curve grows fastest exactly halfway to the ceiling, when the population sits at half of the carrying capacity.

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
