---
title: Integral
summary: >-
  Working out the exact distance a car covered from a wiggly speed graph is
  not something a ruler can do — stacking thinner and thinner rectangles
  under the curve is how this idea gets it exactly.
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

## Real-life examples

1. **A rough first estimate.** With just 4 rectangles from a = 0 to b = 4, the sum is a crude first guess at the true area.
2. **A tighter estimate over a shorter interval.** With 50 rectangles from a = 1 to b = 3, the gaps between rectangles and curve have mostly vanished.
3. **A near-exact area over the full domain.** With 500 rectangles from a = 0 to b = 5, the sum has essentially converged to the true integral.

## Test yourself

1. Find bounds where the true area under the curve equals about 9.
2. Use more than 100 rectangles while keeping the area above 20.
3. Make the signed area negative by setting the lower bound above the upper bound.

## Intuition

Picture the region under a curving line on screen, and imagine wanting its exact area — but the only shape whose area you know for certain is a rectangle, just width times height. So here is the trick: cover the curved region with «number of rectangles» thin rectangles side by side, and add up all their areas instead.

With «number of rectangles» set to 4 the fit is poor — the rectangles clearly miss chunks of the true area. Slide it up to 10, then 50, then 500: the gaps vanish and the sum settles on a single number, closer and closer to the true area. That settling number is called the integral.

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
