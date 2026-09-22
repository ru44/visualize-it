---
title: Exponential growth and decay
summary: >-
  When the rate of change is proportional to the amount present, you get an
  exponential — growth if $k > 0$, decay if $k < 0$.
parameters:
  k: rate constant k
  y0: starting amount y₀
  x: time t
variables:
  - the amount present at time t
  - fractional change per unit time
  - the amount at t = 0
---

## Intuition

Drag the point along the curve and compare the two readouts: the slope is always $k$ times the height. The more there is, the faster it grows — that feedback loop is what “exponential” means.

Make $k$ negative. The same rule now says “the more there is, the faster it disappears”, so the curve falls quickly at first and then ever more slowly, never quite reaching zero.

## Formal

$y' = ky$ with $y(0) = y_0$ has the unique solution $y = y_0 e^{kt}$.

Doubling time (or half-life) is $\ln 2 / |k|$ — independent of the current amount.

## Advanced

Uniqueness: if $y$ solves the equation then $\frac{d}{dt}\left(y e^{-kt}\right) = 0$, so $y e^{-kt}$ is constant. This integrating-factor trick generalises to every linear first-order ODE.

## Derivation

1. Separate the variables: everything with $y$ on one side.
2. Integrate both sides.
3. Exponentiate; the constant is fixed by the starting amount.

## Real world

### Compound interest
Money earning a percentage of itself grows exponentially.

### Radioactive decay
Each nucleus has a fixed chance of decaying per second, so the sample shrinks with a constant half-life.

### Epidemics and populations
Early spread is exponential because every case creates new cases.

### Cooling
A hot drink approaches room temperature exponentially (Newton’s law of cooling).
