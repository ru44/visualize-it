---
title: Power functions and fractional exponents
summary: >-
  One exponent $n$ controls a whole family of curves — straight lines,
  parabolas, roots and reciprocals are all $x^n$ in disguise.
parameters:
  'n': exponent n
  x: x
variables:
  - the exponent — can be negative or fractional
  - 'the base, restricted here to positive values'
---

## Intuition

Slide $n$ from $2$ down to $1$: the parabola straightens into the line $y = x$. Keep going to $n = 0.5$ and the curve becomes a square root — steep near zero, flattening out — and at $n = 0$ it is simply the flat line $y = 1$.

Push $n$ negative and the curve flips character completely: instead of growing, it now blows up as $x$ shrinks toward $0.1$ and settles down toward zero as $x$ grows, because $x^{-1} = 1/x$. The single formula $x^n$ quietly reproduces multiplication, roots and reciprocals just by turning one dial.

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
