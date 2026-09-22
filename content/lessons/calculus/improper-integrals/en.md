---
title: Improper integrals and p-series convergence
summary: >-
  A rocket trying to escape Earth's gravity needs to know whether the total
  energy required settles at a finite number or keeps growing forever the
  farther it travels — this idea tells you which.
parameters:
  p: exponent p
  a: 'a (start, fixed near 1)'
  b: b (push far to the right)
variables:
  - the power in the decaying curve $1/x^p$
  - 'the bounds of the shaded, finite-$b$ approximation'
---

## Try it

1. Set «exponent p» below 1 (try 0.5) and drag «b» out to 60. The shaded area keeps growing noticeably even at large b.
2. Now set «exponent p» above 1 (try 2) and drag «b» out again. Past a point, pushing b further barely changes the shaded area at all.
3. Compare the two: below p = 1 the area never settles down; above p = 1 it settles onto a fixed number.

## Real-life examples

1. **A slowly-decaying tail (p < 1).** With p = 0.5, stretching the region out to b = 50 keeps adding a meaningful amount of area — the integral never settles down.
2. **A fast-decaying tail (p > 1).** With p = 2, stretching out to b = 50 barely changes the area any more — the integral is converging.
3. **The borderline case (p = 1).** Right at p = 1, the area grows without bound, but only as slowly as the logarithm — the edge between converging and not.

## Test yourself

1. With the decay rate below 1, push the shaded area above 5.
2. With the decay rate above 1, push «b» far out and keep the area below 2.
3. Find a decay rate and bounds where the area settles to about 1.

## Intuition

Imagine a rocket leaving Earth: gravity pulls less and less the farther out it gets, and physicists want to know whether the total energy needed to escape forever is some finite number or infinite. On screen, the curve fades according to «exponent p», and the shaded region under it, out to «b», is the energy added up so far. Set «exponent p» below 1 (try 0.5) and drag «b» out to 60: the shaded area keeps growing noticeably even way out there — the curve is not fading fast enough for the growing strip of area to level off.

Now push «exponent p» above 1 (try 2) and drag «b» out again: past a point, pushing «b» further barely changes the shaded area at all — the tail of the curve has become so thin that what is left barely matters. That visible "stops growing" is exactly what it looks like when the total settles on one finite number instead of growing forever.

## Formal

$\int_1^\infty x^{-p}\,dx = \lim_{b\to\infty}\int_1^b x^{-p}\,dx$; this limit is finite iff $p>1$, in which case it equals $\frac{1}{p-1}$.

For $p \le 1$ the integral diverges: at $p=1$ it grows like $\ln b \to \infty$; for $p<1$ it grows like $b^{1-p} \to \infty$.

## Advanced

This is the integral test for series: $\sum n^{-p}$ converges iff $p>1$ for exactly the same reason, since a decreasing positive $f(x)=x^{-p}$ has $\sum_{n\ge1} f(n)$ sandwiched between $\int_1^\infty f$ and $f(1)+\int_1^\infty f$ — the improper integral and the infinite series diverge or converge together.

## Derivation

1. Ordinary power-rule antiderivative, evaluated at the bounds.
2. A negative exponent on a growing $b$ sends that term to zero.
3. Substitute the vanished term — the improper integral converges to a finite value.

## Real world

### Gravity and escape velocity
The work to escape a gravitational field is an improper integral of $1/r^2$ from a planet's surface to infinity — it converges because $p=2>1$.

### Probability distributions
A probability density must integrate to a finite total (1) over an infinite domain — heavy-tailed distributions sit right at this convergence boundary.

### Signal energy
Total energy in a signal is an integral of its squared amplitude over infinite time; whether it is finite determines if a signal is "energy-limited".

### Radiative heat loss
Some cooling and radiation models involve integrals over unbounded domains whose convergence determines whether total heat lost is finite.
