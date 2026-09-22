---
title: Slope
summary: >-
  Slope measures steepness: how much the output changes for each step in the
  input.
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

## Intuition

Pick two points on the line and walk from one to the other: first across (the run), then up (the rise). Slope is rise per unit of run.

Move the points or change the run. The triangle changes size, yet the ratio never changes. That constancy is exactly what makes a line a line.

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
