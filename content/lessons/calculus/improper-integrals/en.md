---
title: Improper integrals and p-series convergence
summary: >-
  Stretching the upper limit of integration toward infinity, whether the
  accumulated area settles down or grows forever depends entirely on how fast
  the curve decays.
parameters:
  p: exponent p
  a: 'a (start, fixed near 1)'
  b: b (push far to the right)
variables:
  - the power in the decaying curve $1/x^p$
  - 'the bounds of the shaded, finite-$b$ approximation'
---

## Intuition

Set $p$ below $1$ (say $0.5$) and drag $b$ out to $60$: the shaded area keeps growing noticeably even out at large $b$ — the curve is not shrinking fast enough for the accumulating strip of area to level off. Every time you push $b$ further, you pick up a meaningful new chunk.

Now push $p$ above $1$ (say $2$) and drag $b$ out again: past a certain point, pushing $b$ further barely changes the shaded area at all — the tail of the curve has become so thin that its remaining contribution is negligible. That visual "stops growing" is exactly what convergence of the improper integral looks like.

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
