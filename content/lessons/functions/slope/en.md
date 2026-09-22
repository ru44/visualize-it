---
title: Slope
summary: >-
  Learn to read how fast something changes — the single number that tells
  you a car's speed, a ramp's steepness, or a price per item, no matter
  which two points you compare.
parameters:
  m: m — slope
  b: b — intercept
  x: first point x₁
  h: run Δx
variables:
  - the run — horizontal distance between the two points
  - the rise — vertical distance between them
  - rise divided by run
---

## Try it

1. Drag the slider «first point x₁» slowly to the right. The two points move along the line together.
2. Look at the number «slope Δy/Δx» under the picture. It does not change, no matter where the points are.
3. Now move the slider «m — slope» up. The line gets steeper and the number grows. Slope simply means: how steep.

## Real-life examples

1. **A car's steady speed.** Driving at m=1.5 km per minute (b=0), checking the trip from minute x=-2 over a 4-minute stretch (h=4): the rise-over-run ratio always reads 1.5, matching the car's speed exactly.
2. **A wheelchair ramp's grade.** A gentle ramp rises m=0.05 units for every unit it runs — a 5% grade — checked over the full 6-unit length of the ramp (h=6): the ratio still reads 0.05, however much of the ramp you measure.
3. **Price per item.** Buying items costs m=2.5 per item plus a fixed 1-unit service fee (b=1); comparing a purchase of x=1 item to one 3 items later (h=3): the slope still reads 2.5, the price of one more item, no matter which two purchases you compare.

## Test yourself

1. Find a slope (m) and a run (h) whose rise multiplies out to exactly 5.
2. Find m and b so the line passes through the point where x=3 and y=7.
3. Make the line drop by more than 10 units over some run — a negative slope steep enough, and a run long enough.

## Intuition

A car driving at a steady speed covers 1.5 kilometres every minute: after 4 minutes it has gone 6 kilometres, after 8 minutes, 12. Pick any two moments on the blue line here and walk from one point to the other exactly the way you would read that car's trip: first sideways (the run, how much time passed), then up (the rise, how much distance was covered). Slope is that rise for every unit of run.

Drag the points to a completely different stretch of the line, or change the run with the h slider. The little triangle changes size every time, yet the ratio of its two sides never changes — read it off under the picture and it stays locked to the number set by the m slider. That constancy, rise always growing in exact step with run, is exactly what makes a straight line straight.

## Formal

For $y = mx + b$ and any $x_1 \ne x_2$: $\dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{m(x_2 - x_1)}{x_2 - x_1} = m$.

All rise–run triangles on a line are similar, so their ratio is an invariant of the line.

## Advanced

Constant difference quotient characterises affine maps: $f$ is affine iff $\frac{f(x_2)-f(x_1)}{x_2-x_1}$ is independent of the points. The derivative extends this by asking only for the limit as the points merge.

## Derivation

1. Evaluate the line at two inputs.
2. Subtract: the intercept $b$ cancels.
3. Divide by the run. The result does not depend on which points you picked.

## Real world

### Speed
On a distance–time graph, slope is speed: metres gained per second elapsed.

### Roads and ramps
A 6% grade means 6 m of rise per 100 m of run.

### Unit prices
Cost against quantity is a line whose slope is the price per item.
