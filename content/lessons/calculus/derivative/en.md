---
title: Derivative
summary: >-
  The derivative is the slope of a curve at a single point — the instantaneous
  rate of change.
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

## Intuition

A curve has no single slope — its steepness changes as you move. The tangent line shows the slope at exactly one point: the direction the curve is heading right there.

Drag the point. The small dot on the dashed line records the tangent’s slope at each $x$. Collect all those slopes and you get a new function: the derivative. For $x^2$ it is the straight line $2x$ — negative where the curve falls, zero at the bottom, positive where it rises.

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
