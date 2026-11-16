---
title: 'Complex numbers: multiplying as a spin'
summary: 'Represent a complex number as a point and see how multiplication rotates and scales it.'
parameters:
  a: first number, real part
  b: first number, imaginary part
  c: second number, real part
  d: second number, imaginary part
variables: []
---

## Try it

1. Set a = 3 and b = 4, giving z = 3 + 4i. Its point is three units right and four up.
2. Set c = 0 and d = 1, giving w = i. The product is -4 + 3i: a quarter turn counterclockwise, with the same distance from the origin.
3. Keep c at 0 and set d to 2. The product is -8 + 6i. The rotation is still a quarter turn, but the length has doubled; increasing d here does not keep increasing the angle.

## Real-life examples

1. **Quarter-turn multiplication.** Multiplying 3 + 4i by i gives -4 + 3i. This isolates rotation without a change in magnitude.
2. **Approximate 45-degree rotation.** Multiplying 2 + i by 0.7 + 0.7i gives 0.7 + 2.1i. The angle increases by 45 degrees and the magnitude is multiplied by about 0.990, so it shrinks slightly.
3. **Rotation and enlargement.** Multiplying 1 by 2 + 2i gives 2 + 2i. The angle is 45 degrees and the magnitude is the square root of 8.

## Test yourself

1. Make the product's real part zero so it lies on the imaginary axis, possibly at the origin.
2. Make the product's distance from the origin approximately 10.
3. Make the second number's magnitude approximately 1 to obtain a pure rotation for nonzero inputs.

## Intuition

A complex number combines a real part and an imaginary part. Write 3 + 4i as a point three units right and four units up. The new unit i obeys the rule that its square is -1. It is a number with a multiplication rule, not a physical distance.

Multiply 3 + 4i by i. Distributing gives 3i + 4i squared, which becomes -4 + 3i. The coordinates have changed from (3, 4) to (-4, 3), a quarter-turn rotation. Multiplication by a general nonzero complex number combines a rotation with scaling.

## Formal

For $z=a+bi$ and $w=c+di$, the product is $zw=(ac-bd)+(ad+bc)i$, using $i^2=-1$.

The modulus is $|z|=\sqrt{a^2+b^2}$. For nonzero z, its argument is its angle from the positive real axis, measured modulo a full turn. Multiplication multiplies moduli and adds arguments. Zero has modulus zero but no defined argument.

## Advanced

Euler's formula is $e^{i\theta}=\cos\theta+i\sin\theta$. It expresses a unit complex number as a rotation factor. The fundamental theorem of algebra states that every nonconstant complex polynomial has a complex root, and factors completely over the complex numbers with multiplicities counted.

## Derivation

1. Write both numbers as their real part plus i times their imaginary part.
2. Multiply term by term using the distributive law.
3. Replace i squared by -1, then collect the real and imaginary terms.

## Real world

### Plane rotations

Multiplying coordinate pairs represented as complex numbers rotates them about the origin. A unit-modulus multiplier preserves lengths.

### Signals

Complex representations can keep track of a sinusoid's amplitude and phase together.

### Algebra

Complex numbers allow equations such as x squared plus 1 equals zero to have solutions beyond the real line.
