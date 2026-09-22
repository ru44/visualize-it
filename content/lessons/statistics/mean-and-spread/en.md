---
title: 'Mean, variance and standard deviation'
summary: >-
  One number for where the data sits, another for how far it wanders. Drag the
  point to see how squared distances build the variance.
parameters:
  m: guessed centre c
  a: data from
  b: data to
variables:
  - the mean — the balance point of the data
  - the variance — the average squared distance from the mean
  - the standard deviation — back in the original units
charts:
  - title: Total squared distance from a guessed centre c is smallest at the mean
    xLabel: guessed centre c
    yLabel: Σ (xᵢ − c)²
    series:
      - 'sum over the data 2, 4, 4, 4, 5, 5, 7, 9'
---

## Intuition

Take the data 2, 4, 4, 4, 5, 5, 7, 9. Its mean is 5. The chart below adds up the squared distances from any centre you guess: drag $c$ and the total is smallest exactly at 5. The mean is the centre that the data “pulls” least against.

Divide that smallest total (32) by the 8 values and you get the variance, 4. Take the square root to return to the original units: the standard deviation is 2, so a typical value sits about 2 away from the mean. The curve above shows the squared-distance penalty: small near the centre, punishing far away.

## Formal

$\mu = \frac1n\sum x_i$ minimises $\sum (x_i - c)^2$ over $c$; the minimum value divided by $n$ is $\sigma^2$, and $\sigma = \sqrt{\sigma^2}$.

Sample variance uses $n - 1$ instead of $n$ (Bessel’s correction) so that it estimates the population variance without bias.

## Advanced

$\mathrm{Var}(X) = E[X^2] - (E[X])^2$; for independent variables variances add, which is the root of the $1/\sqrt N$ law. The mean minimises squared error while the median minimises absolute error — a different notion of “centre” with a different sensitivity to outliers.

## Derivation

1. Total squared distance from a candidate centre $c$.
2. The minimum is where the derivative vanishes — at the mean.
3. Variance is the minimal average squared distance; the standard deviation undoes the squaring.

## Real world

### Exam results
Two classes can share a mean of 65 while one has σ = 5 (everyone similar) and the other σ = 20 (a wide range).

### Finance
The standard deviation of returns is what investors call volatility, or risk.

### Manufacturing
Six-sigma quality means tolerances six standard deviations wide — about 3 defects per million.
