---
title: 'Mean, variance and standard deviation'
summary: >-
  One number for where a set of scores sits, another for how far they wander —
  together they summarize any list of numbers, from test results to delivery
  times.
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

## Try it

1. Watch the curve: it plots the total squared distance from your guessed centre «guessed centre c» to each of the 8 data points.
2. Drag «guessed centre c» left and right and watch the curve's height change.
3. Find the lowest point of the curve: that guess is the data's mean.

## Real-life examples

1. **Guessing the class average.** A quiz scored 2, 4, 4, 4, 5, 5, 7, 9 out of 10; guessing the centre as 5 lands exactly on the true average, where the penalty is smallest.
2. **Overshooting the guess.** Guessing 8 for the same quiz scores overshoots the true average, and the total squared error jumps far above its minimum.
3. **Undershooting the guess.** Guessing just 1 undershoots by even more, since most of the class scored higher than that.

## Test yourself

1. Find the guessed centre that makes the total squared distance as small as possible — about 32.
2. Guess a centre below 3 and see the penalty climb above 80.
3. Guess a centre above 7 and still keep the penalty under 100.

## Intuition

Take the quiz scores 2, 4, 4, 4, 5, 5, 7, 9. Their mean is 5. The curve on screen adds up the squared distance from each score to whatever centre you guess: drag «guessed centre c» and watch the total shrink to its smallest exactly at 5. The mean is the centre the data "pulls" against the least.

Divide that smallest total, 32, by the 8 scores and you get the variance, 4. Take its square root to return to the original units: the standard deviation is 2, so a typical score sits about 2 points from the mean. The curve's shape shows the penalty for guessing wrong: small near the centre, harsh far away.

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
