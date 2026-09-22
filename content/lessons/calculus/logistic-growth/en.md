---
title: Logistic growth and carrying capacity
summary: >-
  Growth that starts exponential but slows as it nears a ceiling $K$ traces an
  S-shaped curve — fast in the middle, flat at both ends.
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

## Intuition

Drag the point through the early part of the curve, where $y$ is small compared to $K$: the tangent slope grows steeply, almost like plain exponential growth, because the braking term $(1-y/K)$ is still close to $1$ and barely holding anything back.

Keep dragging toward $K$: the tangent flattens out even though $y$ is at its largest, because now $(1-y/K)$ is shrinking toward zero and throttling the growth rate — the population is running out of room, resources or capacity, and the curve gently levels off just short of the ceiling.

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
