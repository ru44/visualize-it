---
title: Power functions and fractional exponents
summary: >-
  See how a single dial reshapes a curve into a line, a parabola, a
  square-root, or a shrinking curve — the pattern behind area, volume, and
  "inverse" relationships like sharing a bill.
parameters:
  'n': exponent n
  x: x
variables:
  - the exponent — can be negative or fractional
  - 'the base, restricted here to positive values'
---

## Try it

1. Slide n from 2 down toward 0 and watch the curve straighten, then flatten.
2. Push n past 0 into negative numbers and watch the curve's whole shape flip.
3. Drag x left and right and read the curve's height at each point.

## Real-life examples

1. **Tiling a floor.** Doubling a square tile's side length (x=2) at exponent n=2 quadruples its area, from 1 to 4 square metres.
2. **Packing a box.** Doubling a cube's side length (x=2) at exponent n=3 multiplies its volume by 8, from 1 to 8 cubic metres.
3. **Splitting a bill.** At exponent n=-1, doubling the number of people sharing a fixed pizza bill (x=2) halves what each person pays, down to 0.5 of the original share.

## Test yourself

1. Set x to 2, then find the exponent that makes the curve reach exactly 8 there — the same growth a cube's volume shows when its side doubles.
2. With the exponent set to -1, find the x where the curve drops to exactly 0.25 — like needing 4 people to quarter a shared bill.
3. Find the one exponent that makes the curve perfectly flat, equal to 1, no matter where x sits.

## Intuition

Double the side length of a square tile, from 1 metre to 2, and its area does not just double — it quadruples, from 1 square metre to 4. That is the curve you see here at exponent n = 2, plotted through the point where x = 2 reads 4 on the vertical axis. Slide n down to 1 and the curve straightens into a plain diagonal line, where the output always equals the input — doubling x now only doubles the result, like length itself instead of area.

Keep sliding n down to 0.5 and the curve becomes a square root: steep near zero, then flattening out as x grows. At n = 0 the curve turns dead flat at height 1, no matter what x is, because anything raised to the power zero equals 1. Push n negative instead, say to -1, and the curve flips character completely: it shoots up as x shrinks toward zero and settles toward zero as x grows — the same shape as a bill split among more and more people, where each share keeps shrinking.

## Formal

For $x > 0$, $x^n$ is defined for every real $n$ via $x^n = e^{n \ln x}$, so fractional and negative exponents are as legitimate as integer ones.

$x^{p/q} = \sqrt[q]{x^p}$ (for positive integers $p, q$), and $x^{-n} = 1/x^n$.

## Advanced

Restricting to $x > 0$ is what makes $x^n = e^{n\ln x}$ well defined for every real $n$; for negative $x$, non-integer powers generally leave the real numbers (e.g. $(-1)^{1/2} = i$), which is why this lesson keeps the domain positive.

## Derivation

1. The defining law of exponents, true for integer $a, b$.
2. Extend to rationals: $x^{1/q}$ is defined as the $q$-th root.
3. Extend to every real $n$ using the exponential, agreeing with the rational case.

## Real world

### Scaling laws
Surface area scales as length squared, volume as length cubed — both power functions of the same variable.

### Inverse-square laws
Gravity and light intensity fall off as $x^{-2}$, a negative-exponent power function.

### Allometry in biology
Metabolic rate scales roughly as (body mass)$^{3/4}$ — a fractional exponent.

### Engineering safety factors
Stress in a beam can scale with a fractional power of its dimensions, guiding how much a design can shrink or grow.
