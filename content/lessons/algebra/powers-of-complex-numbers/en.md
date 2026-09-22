---
title: Powers of complex numbers
summary: >-
  Watch repeated multiplication spiral a point outward, inward, or around a
  perfect circle — the pattern behind fractal art, sound-filter design, and
  the fast Fourier transform.
parameters:
  a: number, real part
  b: number, imaginary part
  n: power
variables: []
---

## Try it

1. Raise n and watch the trail of dots spiral, one dot per power.
2. Drag the starting point outside the unit circle (the dashed ring) and watch the spiral fly outward.
3. Drag it back inside the ring instead and watch the spiral tighten toward the center.

## Real-life examples

1. **A perfectly circular orbit.** A point exactly 1 unit from the center (a=0.6, b=0.8) traces a perfect circle as its angle repeats; after n=4 steps it has turned a quarter of the way around, neither growing nor shrinking.
2. **A zooming fractal boundary.** A point just outside the unit circle (a=1.1, b=0.3) spirals outward as you raise the power — after n=8 steps it has already flown far from the center, the kind of escape test used to draw the Mandelbrot set.
3. **A damped guitar string.** A point just inside the unit circle (a=0.5, b=0.2) spirals inward, losing a little distance every step — after n=10 steps it has shrunk close to the center, like a plucked string's vibration dying out while it keeps oscillating.

## Test yourself

1. Place the point exactly on the unit circle, one unit from the center, so raising it to any power never grows or shrinks it.
2. Set the power to its maximum and choose a starting point outside the unit circle so the result ends up more than 100 units from the center.
3. Choose a starting point inside the unit circle and a high enough power that the result shrinks to less than 0.01 units from the center.

## Intuition

Picture a firework spark that turns the same angle every instant, drifting a little farther from the center each time — it traces a spiral flying outward. A spark that instead drifts a little closer in with every turn traces a spiral tightening toward the center. The trail of dots on screen shows exactly this: raise the starting point to higher and higher powers with the n slider, and each new dot is the last one turned by the same angle again and scaled by the same factor again.

Drag the starting point exactly onto the unit circle — one unit from the center — and the spiral vanishes: every power just walks around that same circle, landing on evenly spaced dots instead of drifting in or out. Push the point outside the circle and every higher power flies farther away; pull it inside instead and every higher power creeps closer to the center, eventually vanishing.

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
