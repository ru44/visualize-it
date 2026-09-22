---
title: Integral
summary: >-
  An integral adds up infinitely many infinitely thin slices. Start with
  rectangles and watch them converge.
parameters:
  'n': number of rectangles
  a: lower bound a
  b: upper bound b
variables:
  - where the accumulation starts and stops
  - 'the width of one slice, shrinking toward zero'
  - the area of one thin slice
---

## Try it

1. Set «number of rectangles» to 4. The rectangles miss a lot of the area under the curve.
2. Slide it to 50, then 500. The gaps disappear.
3. Compare «sum of rectangles» with «integral» under the picture: the difference shrinks toward 0. The integral is where the sum is heading.

## Intuition

We know how to find the area of a rectangle, not of a curved region. So cheat: cover the region with rectangles and add them up.

With 4 rectangles the fit is poor. Slide to 10, 50, 500 — the gaps vanish and the sum settles on a single number. The integral is that number.

## Formal

$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x$ with $\Delta x = \tfrac{b-a}{n}$.

For continuous $f$ the limit exists and is independent of the sample points $x_i^*$ (left, right or midpoint).

## Advanced

Riemann integrability: the upper and lower Darboux sums can be made arbitrarily close. Every continuous function on $[a,b]$ qualifies; for a monotone $f$ the gap is at most $|f(b) - f(a)|\,\Delta x$, which is the $O(1/n)$ error you see for left-endpoint rectangles. The midpoint rule improves this to $O(1/n^2)$.

## Derivation

1. Right-endpoint rectangles of width $4/n$.
2. Use the closed form for a sum of squares.
3. The same value the antiderivative gives: $\left[\tfrac{x^3}{3}\right]_0^4$.

## Real world

### Distance from speed
Add up speed × tiny time step over a trip and you get distance travelled.

### Energy
Your electricity bill is power integrated over time (kWh).

### Probability
The chance of landing in a range is the integral of the density over it.

### Volume and mass
Slice an object thinly, add the slices: that is how CT scanners and CAD tools compute volume.
