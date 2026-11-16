---
title: Powers of complex numbers
summary: 'Follow repeated complex multiplication by tracking the angle and distance at each power.'
parameters:
  a: number, real part
  b: number, imaginary part
  n: power
variables: []
---

## Try it

1. Set a = 0 and b = 1. Increase n from 1 to 4. The powers are i, -1, -i and 1, completing a full turn.
2. Set a = 1.1 and b = 0.3. The modulus exceeds 1, so increasing n moves the powers progressively farther from the origin.
3. Set a = 0.5 and b = 0.2. The modulus is below 1, so the powers approach the origin. Read the coordinates when points become too close to distinguish.

## Real-life examples

1. **Unit modulus.** For z = 0.6 + 0.8i, every power stays on the unit circle. The angle is about 53.13 degrees per multiplication, so the fourth power is at about 212.52 degrees, not a quarter turn.
2. **Increasing magnitude.** For z = 1.1 + 0.3i, the modulus is about 1.14. At n = 8 the result has modulus about 2.86.
3. **Decreasing magnitude.** For z = 0.5 + 0.2i, the modulus is about 0.539. At n = 10 it is about 0.00205.

## Test yourself

1. Place z within 0.02 in modulus of the unit circle. An exactly unit modulus keeps every power on the circle.
2. Set n to 12 and choose z so the result's modulus exceeds 100.
3. Choose z and n so the result's modulus is less than 0.01.

## Intuition

The power z cubed means multiply z by itself three times. Each multiplication adds the same angle and multiplies the distance from the origin by the same factor. The trail shows the successive results, beginning from 1.

A modulus greater than 1 makes the distances grow. A modulus between zero and one makes them shrink towards zero, and a modulus of 1 keeps them unchanged. The points need not form a spiral: a positive real number changes only the distance, while i cycles through four points on the circle. Nonzero shrinking powers approach zero without becoming exactly zero at a finite step.

## Formal

Write a nonzero number as $z=r(\cos\theta+i\sin\theta)$, with r positive. For an integer n, de Moivre's formula gives $z^n=r^n(\cos(n\theta)+i\sin(n\theta))$.

For the positive powers shown here, the modulus is $|z|^n$. It grows without bound when |z| exceeds 1, tends to zero when |z| is below 1, and stays 1 when |z| equals 1. Angles are understood modulo a full turn; displayed angles may wrap rather than increase continuously.

## Advanced

For a positive integer n, the n roots of unity are equally spaced around the unit circle. Repeated powers of a unit complex number return exactly to 1 only when its angle is a rational multiple of a full turn. Otherwise the powers do not repeat exactly, even though their step angle is constant.

## Derivation

1. Express z using its modulus and angle.
2. Repeated multiplication raises the modulus to the nth power.
3. Add the angle n times to obtain n times theta, then express the resulting point using cosine and sine.

## Real world

### Repeated rotations

A fixed unit complex multiplier produces equal angular steps without changing length.

### Discrete oscillations

A complex multiplier of modulus below 1 combines a repeated phase change with decay in a simplified discrete signal model.

### Fourier calculations

Roots of unity provide evenly spaced unit-circle points used in discrete Fourier transforms. Iterating powers alone is different from iterating a rule that also adds a constant.
