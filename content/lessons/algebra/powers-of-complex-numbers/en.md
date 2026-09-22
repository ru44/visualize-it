---
title: Powers of complex numbers
summary: >-
  Raise a complex number to a whole power and it spirals in, spirals out, or
  walks around a perfect circle, depending on one thing: its distance from
  the origin.
parameters:
  a: number, real part
  b: number, imaginary part
  n: power
variables: []
---

## Intuition

Watch the trail of points as $n$ increases: each new point is the previous one rotated by the same angle again and scaled by the same factor again. If the starting point sits outside the unit circle the trail spirals outward; if it sits inside, the trail spirals in toward the origin.

Drag the point exactly onto the unit circle, distance 1 from the origin, and the spiral stops: every power just walks around the same circle, landing on evenly spaced points. Those points, when $n$ takes it all the way back to the start, are the roots of unity.

## Formal

Writing $z$ in polar form as $z = r(\cos\theta + i\sin\theta)$, de Moivre's formula gives $z^n = r^n(\cos(n\theta) + i\sin(n\theta))$: raising to the $n$th power raises the modulus to the $n$th power and multiplies the argument by $n$.

So the long-run behaviour depends only on $r = |z|$: $r>1$ spirals outward without bound, $r<1$ spirals inward to zero, and $r=1$ stays forever on the unit circle.

## Advanced

The $n$ solutions of $z^n = 1$ are equally spaced around the unit circle at angles $2\pi k/n$ for $k=0,1,\dots,n-1$; they generate the finite group of $n$th roots of unity, the algebraic structure behind the fast Fourier transform.

## Derivation

1. Write the number in polar form, modulus and angle.
2. Raise the polar form to the $n$th power term by term.
3. Combine using the fact that repeated rotation by $\theta$, $n$ times, is rotation by $n\theta$.

## Real world

### Fast Fourier transform
The FFT algorithm multiplies signals by roots of unity to break a Fourier transform into much smaller pieces.

### Fractals
The Mandelbrot and Julia sets are built by repeatedly squaring a complex number and adding a constant, watching whether the result spirals to infinity.

### Digital filters
A filter's frequency response is read off by evaluating a polynomial at points on the unit circle, exactly where powers of $z$ neither grow nor shrink.

### Cryptography
Some fast multiplication and lattice-based cryptographic schemes use roots of unity to speed up polynomial arithmetic.
