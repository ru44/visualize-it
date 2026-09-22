---
title: The chain rule and product rule together
summary: >-
  Differentiating a product of two functions, one of which is itself a
  composition, needs the product rule and the chain rule working together.
parameters:
  k: k (inner frequency)
  x: x (drag along the curve)
variables:
  - frequency inside the sine — the "inner function" being composed
  - point where the tangent and derivative are evaluated
---

## Intuition

Drag the point and compare the solid tangent line's slope with the dashed derivative curve beneath it — they always agree by construction. Notice the derivative curve is not just a shifted sine: near the origin it is dominated by the flat $\sin(kx)$ term, but for large $|x|$ the $kx\cos(kx)$ term wins and the derivative swings with growing amplitude.

Increase $k$ and watch both curves oscillate faster — but also notice the derivative's amplitude grows too, not just its frequency. That is the chain rule's fingerprint: differentiating $\sin(kx)$ brings down an extra factor of $k$, so a faster inner oscillation always produces a steeper, wilder derivative.

## Formal

Product rule: $(uv)' = u'v + uv'$ with $u = \sin(kx)$, $v = x$.

Chain rule: $\dfrac{d}{dx}\sin(kx) = k\cos(kx)$, since the derivative of the outer sine is evaluated at the inner function, times the inner function's own derivative $k$.

## Advanced

This derivative, $kx\cos(kx) + \sin(kx)$, is exactly the pattern that shows up differentiating $\int \sin(kt)\,dt$-type expressions or analysing amplitude-modulated signals $x(t)\sin(kt)$: the product rule splits the change into a part from the (slowly varying) envelope and a part from the (fast) oscillation, which is the starting point for the general Leibniz rule and for stationary-phase approximations.

## Derivation

1. Apply the product rule to the two factors $\sin(kx)$ and $x$.
2. Apply the chain rule to the composed inner function $kx$.
3. Combine: $\frac{d}{dx}[x] = 1$, and substitute the chain-rule result.

## Real world

### Amplitude-modulated radio
A carrier wave multiplied by a slowly varying envelope needs exactly this product-and-chain differentiation to analyse.

### Vibration with growing drive
A driven oscillator whose forcing amplitude ramps up linearly while oscillating shows this same $x\sin(kx)$ shape.

### Optimization in engineering
Composite cost functions (a rate applied to a changing quantity) routinely require chaining derivatives through several layers.

### Machine learning backpropagation
Gradients through neural network layers are chain rule applied repeatedly, often combined with products at each layer.
