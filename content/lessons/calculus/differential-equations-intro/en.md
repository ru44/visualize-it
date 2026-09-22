---
title: An introduction to differential equations
summary: >-
  A fishing crew wants to know how many fish they can catch every season
  without ever driving the population to zero — this idea works out that
  safe catch rate.
parameters:
  k: growth rate k
  K: carrying capacity K
  h: harvest per unit time h
  y0: starting population y0
  tView: time
variables:
  - the population at time t
  - the intrinsic growth rate
  - the carrying capacity, the population the environment can support
  - how much is harvested (removed) per unit time
---

## Try it

1. Drag «time» from the start. The population climbs, tracing out the one curve consistent with the growth rule and the starting value.
2. Raise «harvest per unit time h». The curve settles at a lower equilibrium — more is being removed, so less remains.
3. Push «h» high enough. The curve stops levelling off at all and runs down to zero: harvest now outpaces growth.

## Real-life examples

1. **A sustainable fishing quota.** With growth rate k = 0.5 and capacity K = 150, a harvest of h = 5 per unit time stays safely below the maximum the fish stock can regrow.
2. **A cautious wildlife cull.** With k = 0.3 and K = 100, a cull of h = 7 sits close to the fastest regrowth rate the population can sustain — a narrow safety margin.
3. **Overharvesting collapse.** With k = 0.4 and K = 80, a harvest of h = 12 removes population faster than it can ever regrow, so no equilibrium exists and the population is driven to zero.

## Test yourself

1. Find a harvest rate h, above 0, that still leaves a stable, positive equilibrium.
2. Push h high enough that the population collapses to zero — no equilibrium survives.
3. Tune h to match the maximum sustainable yield exactly, right at the edge of collapse.

## Intuition

Imagine a lake stocked with 30 fish, and every season fishers pull out a fixed number more. The curve on screen traces how the fish population changes over time, starting from that number 30, set by the slider «starting population y0». The curve is not drawn by hand — it grows out of a rule: at every moment, how fast the population changes depends on how many fish are already there and on how many are being caught.

Raise the slider «harvest per unit time h», the number of fish removed each season. The curve settles onto a lower flat level — the population still survives, just at a smaller size. Push «h» high enough and the curve stops flattening out at all: fishers are now pulling fish out faster than the population can replace them, and the curve runs straight down to zero.

## Formal

A differential equation states a relationship between a quantity and its own rate of change; here $\dfrac{dy}{dt} = ky\left(1-\dfrac{y}{K}\right) - h$ says growth follows the logistic term $ky(1-y/K)$ but a constant amount $h$ is removed every unit of time.

An equilibrium is a population level where $\dfrac{dy}{dt} = 0$: growth and harvest exactly cancel, so $y$ stops changing. Solving $ky(1-y/K) - h = 0$ gives up to two such levels, one stable and one unstable.

## Advanced

The logistic term $ky(1-y/K)$ has a maximum value of $\dfrac{kK}{4}$, reached at $y=K/2$; this is the fastest the population can possibly regrow. Once $h$ exceeds $\dfrac{kK}{4}$, harvest always outpaces growth, no equilibrium exists at all, and every trajectory collapses to zero regardless of the starting population.

## Derivation

1. State the rate law: logistic growth minus a constant harvest.
2. Set the rate to zero to find where the population would stop changing.
3. The logistic term's own maximum value is the largest harvest the population can sustain.

## Real world

### Fisheries management
Quotas are set below the maximum sustainable yield of a fish stock, exactly the $kK/4$ threshold in this model, to avoid collapse.

### Epidemiology
The same style of equation, a growth term minus a removal term, describes vaccination or treatment programmes removing infected individuals from circulation.

### Chemical engineering
A continuously stirred reactor with a constant outflow follows an identical rate balance between production and removal.

### Wildlife conservation
Culling or hunting quotas for a managed species are set using the same equilibrium analysis to keep a population from being harvested to extinction.
