---
title: The chain rule and product rule together
summary: >-
  A radio signal built from a fast wiggle riding on a slowly changing
  strength needs two differentiation rules at once — this shows you both,
  working together.
parameters:
  k: k (inner frequency)
  x: x (drag along the curve)
variables:
  - frequency inside the sine — the "inner function" being composed
  - point where the tangent and derivative are evaluated
---

## Try it

1. Drag the point «x» along the curve. The solid tangent line and the dashed derivative curve always agree at that spot.
2. Raise «k» slowly. Both curves oscillate faster, but the derivative curve also swings higher and lower — not just faster.
3. Drag «x» far from the centre with a high «k». The derivative curve grows much larger than the original curve ever does.

## Real-life examples

1. **A slow-varying AM radio carrier.** With a gentle inner frequency (k = 0.4) and a point far from the centre (x = 5), the tangent shows how a slowly oscillating signal still tilts because of the growing envelope term.
2. **A fast, buzzing tone near the start.** A high inner frequency (k = 2.8) makes the wave oscillate quickly, so even close to the centre (x = 0.5) the slope swings widely.
3. **Backpropagation deep inside a network.** With k = 1.2 and x = -4, the same product-and-chain pattern is what a neural network computes, layer after layer, when it works out how a weight affects the final error.

## Test yourself

1. Find a point away from the centre (|x| > 1) where the tangent is flat — the derivative reads 0.
2. Make the derivative climb above 10.
3. Make the derivative drop below -10.

## Intuition

Picture an old radio dial: turning it changes how fast a signal wiggles up and down. On screen, knob «k» plays that role, and the point «x» marks one spot you are standing at on the wiggle. With «k» at 1 and «x» at 2, the solid curve is the signal itself, and the dashed curve beneath it is how steeply the signal rises or falls right at that spot — its slope, redrawn as its own curve.

Raise «k» toward 3 and both curves wiggle faster, as you would expect. But watch the dashed curve's height too: it grows taller as well, not just faster. That extra growth is the fingerprint of two rules working together — one for the fast wiggle inside, one for the straight-line factor multiplying it — and together they make the slope swing more wildly than the signal itself ever does.

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
