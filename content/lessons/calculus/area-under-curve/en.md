---
title: Area under a curve
summary: >-
  Area below the axis counts as negative. The integral is a running total, not
  just a size.
parameters:
  a: start a
  b: end b
variables:
  - 'velocity at time t — here 2 sin t, forwards then backwards'
  - start and end of the time window
---

## Intuition

Read the curve as the velocity of a car. While it is above the axis the car moves forward and distance piles up (teal). Below the axis the car reverses and the total is paid back (red).

Drag the end time past $\pi$ and watch the signed area start to fall. At $2\pi$ it returns to zero: the car is back where it started, even though it drove the whole time.

## Formal

$\int_a^b f = A_{+} - A_{-}$, where $A_{+}$ and $A_{-}$ are the areas above and below the axis.

Total distance is a different quantity: $\int_a^b |f(t)|\,dt = A_{+} + A_{-}$.

## Advanced

With $F(b) = \int_a^b f$, the Fundamental Theorem gives $F'(b) = f(b)$: the rate at which area accumulates equals the height of the curve at the moving edge. That is why the running total peaks exactly where $f$ crosses zero.

## Derivation

1. An antiderivative of $2\sin t$ is $-2\cos t$.
2. This is the running total plotted against the end time $b$.
3. Equal areas above and below cancel exactly.

## Real world

### Net vs. total
A bank balance is the signed integral of cash flow; turnover is the unsigned one.

### AC electricity
Mains current integrates to zero over a cycle — which is why RMS, not the average, measures its strength.

### Work
Force × distance, signed: a force opposing motion removes energy.
