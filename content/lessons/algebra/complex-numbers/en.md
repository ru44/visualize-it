---
title: 'Complex numbers: multiplying as a spin'
summary: >-
  See why multiplying two numbers that each carry a direction spins and
  resizes a point — the trick behind radio signals, radar, and game graphics.
parameters:
  a: first number, real part
  b: first number, imaginary part
  c: second number, real part
  d: second number, imaginary part
variables: []
---

## Try it

1. Drag the first point (steps a and b) anywhere on the plane and watch its label update.
2. Set the second point to "c = 0, d = 1" — pure $i$ — and watch the first point spin exactly 90° around the center.
3. Now drag "d" past 1. The point keeps spinning and also moves farther from the center, because a bigger second number scales as well as rotates.

## Real-life examples

1. **AC circuit phase shift.** An electrical signal at 3+4i volts (a=3, b=4) passes through a pure inductor, which multiplies it by i (c=0, d=1): the signal's phase shifts 90° while its strength stays the same.
2. **Rotating a game sprite.** A spaceship sits 2 steps right and 1 step up (a=2, b=1) on screen. Multiplying its position by about 0.7+0.7i (c=0.7, d=0.7) spins it 45° without changing its size.
3. **Radar echo gain.** A radar blip 1 step out (a=1, b=0) is amplified and phase-shifted by a return signal of 2+2i (c=2, d=2), landing it farther out and rotated 45°.

## Test yourself

1. Choose a, b, c and d so the product lands exactly on the vertical (imaginary) axis, with no real part at all.
2. Make the product's distance from the center exactly 10, however you split it between the two points.
3. Find a second number exactly 1 unit from the center — it will only rotate points, never resize them.

## Intuition

Imagine a treasure marked 3 steps east and 4 steps north of an old tree. That spot is a single point on the plane you see here — the orange dot — and it doubles as the number $z = a+bi$, where $a=3$ counts steps east and $b=4$ counts steps north. The letter $i$ does not measure a distance; it means "turn 90° first," so $bi$ steps go in that turned direction instead of sideways.

Now set the second point to $c=0, d=1$ — the number $i$ itself — and watch the orange dot spin: multiplying by it turns the dot 90° around the center without moving it closer or farther away. Any other second point both spins the dot by its own angle and stretches or shrinks it by its own distance from the center — multiplication is a spin plus a resize, nothing more.

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
