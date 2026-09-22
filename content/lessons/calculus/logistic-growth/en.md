---
title: Logistic growth and carrying capacity
summary: >-
  A new app that spreads quickly at first cannot keep doubling its users
  forever — this idea predicts the S-shaped curve of growth that slows as it
  nears the size of the whole market.
parameters:
  K: carrying capacity K
  y0: starting amount y₀
  k: growth rate k
  x: time t
variables:
  - carrying capacity — the ceiling the curve approaches
  - starting amount at $t=0$
  - intrinsic growth rate
---

## Try it

1. Drag the point through the early part of the curve, where y is small. The tangent grows steeply, almost like plain exponential growth.
2. Keep dragging toward «carrying capacity K». The tangent flattens out even though y is at its largest.
3. Compare the steepest point of the curve to K: it sits almost exactly halfway up, at K/2.

## Real-life examples

1. **An early-stage population, still in the exponential phase.** With K = 8, y0 = 0.5, k = 0.6 and x = 2, growth still looks almost unchecked.
2. **Mid-growth, near the inflection point.** With the same K, y0 and k but x = 8, the population is climbing through its fastest-growing stretch, near K/2.
3. **A slow-adoption product nearing market saturation.** With K = 5, y0 = 2, k = 0.3 and x = 18, adoption has almost filled the whole market.

## Test yourself

1. Reach the inflection point, where growth is fastest: make y equal K/2.
2. Push the population above 95% of its carrying capacity K.
3. Keep the population below 10% of K even after x has reached 5 or more.

## Intuition

Picture a new app with 50,000 people who might ever use it — call that ceiling «carrying capacity K». Drag the point through the early part of the curve, where the number of users is still small compared to that ceiling: the tangent grows steeply, almost like the app is doubling its users again and again with nothing slowing it down.

Keep dragging toward «carrying capacity K»: the tangent flattens out even though the user count is at its largest, because the app is running out of new people to reach — everyone left to sign up is a shrinking slice of the population, and growth throttles itself even though nothing external changed.

## Formal

The governing ODE is $\dot y = ky(1-y/K)$: growth proportional to $y$ (like exponential growth) but damped by a factor that vanishes as $y \to K$.

The solution is the logistic function $y(t) = K/\big(1+\big(\tfrac{K-y_0}{y_0}\big)e^{-kt}\big)$, symmetric S-shape with inflection at $y=K/2$.

## Advanced

The inflection point, where growth rate itself is maximal, occurs exactly at $y=K/2$: differentiating $\dot y = ky(1-y/K)$ with respect to $y$ and setting it to zero gives $y=K/2$, independent of $k$ or $y_0$ — the steepest part of every logistic curve, whatever its parameters, is always at the halfway point to capacity.

## Derivation

1. Separate variables in the logistic ODE.
2. Partial fractions split the left side into two elementary integrals.
3. Integrate, exponentiate, and fix the constant using $y(0)=y_0$.

## Real world

### Population ecology
Animal populations grow exponentially while resources are abundant, then level off near the environment's carrying capacity.

### Epidemics
The S-curve of total infections in a simple epidemic model flattens as the pool of susceptible people is used up.

### Product adoption
New technology adoption often follows a logistic S-curve: slow start, rapid middle growth, saturating market.

### Tumor growth models
Some tumor growth is modeled logistically, with $K$ representing a resource- or space-limited maximum size.
