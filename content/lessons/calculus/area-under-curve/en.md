---
title: Area under a curve
summary: >-
  A car that drives forward and then backs up needs to know exactly where it
  ends up, not just how far it travelled — that is what this idea works out.
parameters:
  a: start a
  b: end b
variables:
  - 'velocity at time t — here 2 sin t, forwards then backwards'
  - start and end of the time window
---

## Try it

1. Drag «end b» to about 1.5. The teal region grows: the car has only driven forward so far.
2. Keep dragging «end b» past 3.15. The shaded region peaks: the car is about to turn around.
3. Push «end b» all the way to about 6.3. Red area appears and cancels the teal: the car has driven a full loop and returned near its start.

## Real-life examples

1. **Short errand.** Driving from second 0 to 1.5, before the car ever turns around: the whole shaded area counts as forward progress, a net displacement of about 1.9.
2. **Longest outward leg.** Driving from 0 to about 3.15 seconds, right up to the turn-around point: net displacement peaks near 4, the largest one-way distance this car ever reaches.
3. **A full loop back to the start.** Driving from 0 to about 6.3 seconds, one whole cycle: the forward push and the backward return cancel almost exactly, so net displacement drops back near zero.

## Test yourself

1. Find a time window (with «end b» at least 2 seconds after «start a») where the net displacement returns to 0.
2. Make the net displacement as large as possible — about 4.
3. Make the net displacement -3 (the car ends up 3 units behind where it started).

## Intuition

Picture a car on a straight road. It drives forward for the first three seconds, then slows, stops, and backs up for the next three. The wavy line on screen is the car's speed at every instant: when the line sits above the middle, the teal-shaded strip beneath it is distance gained, and when the line dips below, the red-shaded strip is distance given back.

Drag the slider «end b», the number of seconds of driving you are watching, out past 3.15. Red area starts eating into teal, and by about 6.3 seconds the two shaded areas match exactly — the car has looped back to right where it started, even though it never stopped moving. Teal minus red is called the net displacement: the straight-line distance between where the car started and where it ended up.

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
