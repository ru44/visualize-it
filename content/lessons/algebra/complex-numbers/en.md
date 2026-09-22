---
title: Complex numbers
summary: >-
  A number with two parts, real and imaginary, that lives on a plane instead
  of a line. Multiplying two of them rotates and scales.
parameters:
  a: first number, real part
  b: first number, imaginary part
  c: second number, real part
  d: second number, imaginary part
variables: []
---

## Intuition

An ordinary number sits on a line, but the point on this plane needs two numbers to locate it, $a$ steps right and $b$ steps up. That point is the complex number $z = a + bi$, where $i$ is a new kind of number with the property $i^2 = -1$.

Set the second point to $c = 0, d = 1$, that is the number $i$ itself, and watch what multiplying by it does to the first point: it spins the point 90° around the origin without changing its distance from it. Multiplication by a complex number is always a rotation combined with a scaling.

## Formal

The distance from the origin, $|z| = \sqrt{a^2+b^2}$, is called the modulus, and the angle from the positive real axis, $\theta = \operatorname{atan2}(b,a)$, is the argument. Together they locate $z$ exactly as well as $a$ and $b$ do.

Multiplying two complex numbers, $zw$, multiplies their moduli and adds their arguments: geometrically, rotate $z$ by $w$'s angle and scale it by $w$'s distance from the origin.

## Advanced

Every polynomial with real or complex coefficients has all of its roots as complex numbers, the fundamental theorem of algebra; this is why complex numbers, not just real ones, are the natural home for algebra. Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$ makes the rotation behaviour of multiplication transparent.

## Derivation

1. Write each number in terms of its real and imaginary parts.
2. Multiply the two binomials term by term.
3. Replace $i^2$ with $-1$ and collect the real and imaginary parts.

## Real world

### Electrical engineering
Alternating current and voltage are tracked as complex numbers (phasors), so resistance, capacitance and inductance combine by ordinary complex multiplication.

### Signal processing
The Fourier transform, which finds the frequencies hiding in a sound or image, is built entirely out of complex exponentials.

### Control systems
An engineer checks whether a feedback system is stable by looking at where certain complex numbers land relative to the unit circle.

### Quantum mechanics
The state of a quantum system is described by complex numbers whose squared moduli give measurable probabilities.
