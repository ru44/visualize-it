---
title: Derivative
summary: >-
  A car's speedometer needs to know how fast you're going right now, not your
  average for the whole trip — that instant reading is what a derivative
  gives you.
parameters:
  x: point x
variables:
  - the curve (solid)
  - its slope at each x (dashed)
---

## Try it

1. Drag the point to the very bottom of the curve. The orange line lies flat and the slope reads 0.
2. Drag it to the right. The line tilts up and the slope number grows.
3. Drag it to the left of the bottom. The slope turns negative: the curve is going downhill there.

## Real-life examples

1. **Standing at the bottom of a valley.** At the curve's lowest point (x = 0) the tangent is flat: slope 0, no climbing needed in either direction.
2. **Partway up a steep climb.** At x = 3 the tangent tilts sharply upward: slope 6, a steep uphill stretch.
3. **Descending the other side.** At x = -3 the tangent tilts down: slope -6, a steep downhill.

## Test yourself

1. Find the point where the slope is exactly 0.
2. Find the point where the slope is exactly 6.
3. Find the point where the slope is exactly -8.

## Intuition

Imagine hiking up a hill whose path is drawn as the curve on screen. At the very bottom of the path (position 0) the ground is flat — no climbing at all. A bit further along (position 3) the path climbs steeply, gaining about 6 metres of height for every metre you walk forward. The path's steepness is different at every point, so there is no single number for "the slope" of the whole hill.

Drag the point along the curve. The small dot on the dashed line beneath it copies down the orange tangent line's slope at exactly that spot — the steepness right there, nowhere else. Collect that reading at every point and you get a brand-new curve, called the derivative: negative while the path is heading downhill, zero exactly at the flat bottom, positive while it is climbing.

## Formal

$f'(x) = \lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$, provided the limit exists.

The tangent at $x_0$ is the best linear approximation: $f(x) \approx f(x_0) + f'(x_0)(x - x_0)$.

## Advanced

Differentiability at $x_0$ means $f(x_0 + h) = f(x_0) + f'(x_0)h + o(h)$: the error of the tangent shrinks faster than $h$ itself. Differentiable implies continuous, but not conversely — $|x|$ at 0 has two one-sided slopes and no tangent.

## Derivation

1. Slope of the secant through $x$ and $x + h$.
2. Expand and cancel $h$ (allowed, because $h \ne 0$).
3. Let the second point slide into the first. The secant becomes the tangent.

## Real world

### Velocity and acceleration
Velocity is the derivative of position; acceleration is the derivative of velocity.

### Optimization
Maxima and minima sit where the derivative is zero — the tangent is flat.

### Economics
Marginal cost is the derivative of total cost: the price of making one more unit.

### Machine learning
Gradient descent trains models by repeatedly stepping against the derivative of the error.
