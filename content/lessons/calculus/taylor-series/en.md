---
title: Taylor series
summary: >-
  A calculator's sine button has no picture of a wave stored inside it — it
  rebuilds sin(x) on the spot from nothing but powers of x, and this shows
  you that trick, piece by piece.
parameters:
  N: degree of the polynomial N
  x: point x
variables: []
charts:
  - title: sin(x) for comparison
    xLabel: x
    yLabel: y
    series:
      - sine
---

## Try it

1. Set «degree of the polynomial N» to 1. The curve is just a straight line, a poor match away from the centre.
2. Raise «N» step by step. Each new pair of terms bends the curve to hug the true sine wave over a wider stretch.
3. Drag «point x» outward at a high N. Even the best-fitting polynomial eventually pulls away from the true curve.

## Real-life examples

1. **A straight-line guess, far from the centre.** With N = 1 and x = 3, the polynomial is just a line — nowhere close to the real curve out there.
2. **A five-term approximation, still fairly close.** With N = 5 and x = 2, the polynomial still tracks sine reasonably well.
3. **The highest available degree, pushed far out.** With N = 11 and x = 6, even this many terms is being tested at the edge of where it still works well.

## Test yourself

1. Using just N = 1 (a straight line), find x where the approximation is still within 0.01 of sin(x).
2. With N = 5, find how far from the centre you can push x and stay within 0.05 of the true sine curve.
3. With the full N = 11 series, get within 0.05 of sin(x) as far out as you can.

## Intuition

Think of the sine button on a calculator: it has no picture of a wave stored inside, yet it can compute the sine of any number instantly. That trick works by adding up simple powers of the input, and the curved line on screen is exactly that: the Taylor polynomial, built only from powers of «point x», while the dashed reference curve is the true sine wave. With «degree of the polynomial N» at 1, the polynomial is just a straight line, a poor match away from the centre.

Raise «N» step by step and each new pair of terms bends the curve to hug the sine wave over a wider stretch. Now drag «point x» outward: even a high-degree polynomial eventually pulls away from the true curve far enough from the centre, because this kind of approximation is only guaranteed to be good close to home.

## Formal

Near $x=0$, any smooth function can be written $f(x) \approx f(0) + f'(0)x + \dfrac{f''(0)}{2!}x^2 + \cdots$, using more and more derivatives evaluated at the centre. For $\sin x$ this becomes $\sin x \approx x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \dfrac{x^7}{7!} + \cdots$.

Each extra term added is called increasing the degree; the sliders here jump by two degrees at a time because sine's Taylor series only has odd powers, its even-order derivatives at 0 all vanish.

## Advanced

For $\sin x$ the series converges to the exact value for every real $x$, an infinite radius of convergence, but the number of terms needed for a given accuracy still grows the farther $x$ is from the centre. Many functions, such as $1/(1-x)$, have a finite radius of convergence beyond which the series diverges entirely.

## Derivation

1. Start from the general local approximation using derivatives at the centre.
2. Evaluate sine and its derivatives at 0; only the odd ones survive.
3. Substitute those values to get the odd-power series for sine.

## Real world

### Calculators and computer chips
A calculator's sine and cosine buttons compute a truncated Taylor (or a closely related) series, not a lookup table.

### Physics approximations
The small-angle approximation $\sin\theta \approx \theta$, used for pendulums and optics, is just the first term of this series.

### Numerical solvers
Simulation software that steps a system forward in time relies on Taylor's theorem to bound the error of each step.

### GPS and navigation
Satellite orbit calculations use truncated series expansions to evaluate trigonometric functions fast enough for real-time positioning.
