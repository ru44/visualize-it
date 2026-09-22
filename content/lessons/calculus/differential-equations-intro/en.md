---
title: An introduction to differential equations
summary: >-
  An equation about a rate, not a value: it says how fast a population
  changes right now, and the curve traces out where that leads.
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

## Intuition

The curve you see is not chosen directly, it grows out of a rule about its own rate of change: at every instant, the population's growth depends on how big the population already is. Drag the time slider and watch the population trace out the one curve consistent with that rule and with the starting value $y_0$.

Increase $h$, the amount harvested every unit of time, and the curve settles lower, near a smaller equilibrium. Push $h$ far enough and the curve stops levelling off at all: harvesting is removing population faster than growth can replace it, and the population runs to zero.

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
