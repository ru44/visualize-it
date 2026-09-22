---
title: Taylor series
summary: >-
  A wiggly curve like sine, rebuilt out of nothing but powers of x. Add more
  terms and the copy hugs the original for longer.
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

## Intuition

The curved line is the Taylor polynomial, built only from powers of $x$, and the dashed reference curve is the true $\sin x$. With $N=1$ the polynomial is just a straight line, a poor match away from the centre; drag $N$ up and each new pair of terms bends the curve to hug the sine wave over a wider stretch.

Move the point $x$ outward and watch the gap between the two curves open up: even a high-degree polynomial eventually pulls away from the true function far enough from the centre, because the approximation is only guaranteed to be good locally.

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
