---
title: The normal distribution
summary: 'Read probabilities as areas under a normal curve, and see how its mean and standard deviation change its shape.'
parameters:
  mu: 'μ — mean'
  s: 'σ — standard deviation'
  a: 'a — lower bound'
  b: 'b — upper bound'
variables:
  - 'mean: centre of the symmetric curve'
  - 'standard deviation: scale of the spread'
  - 'probability between a and b when a ≤ b'
---

## Try it

1. Set μ = 6, σ = 1.5, a = 4.5 and b = 7.5. The interval extends one standard deviation either side of the mean; its area is about 0.683.
2. Keep μ and the bounds fixed and reduce σ to 0.5. The curve becomes taller and narrower, and the same interval now covers about 0.9973.
3. Change the bounds to a = 5.5 and b = 6.5. They again lie one standard deviation either side of the mean, so the area returns to about 0.683. Use a ≤ b to interpret area as probability.

## Real-life examples

1. **A model centred at 6.** With standard deviation 1.5, the interval [4.5, 7.5] contains about 68.3% of the probability.
2. **A narrower measurement model.** With mean 8 and standard deviation 0.5, [7.5, 8.5] also contains about 68.3%, not nearly all the probability.
3. **A wider model.** With mean 5 and standard deviation 3.5, [1.5, 8.5] again contains about 68.3%. This normal model allows negative values too, so it is not automatically suitable for quantities such as delivery times.

## Test yourself

1. Choose a window with probability about 0.683. One standard deviation either side of the mean is one solution.
2. Use σ below 1 and choose a window containing more than 95% probability.
3. Choose a window less than one unit wide containing more than 30% probability.

## Intuition

A continuous variable can take any value in an interval. Instead of giving a probability to each point, a density curve assigns probability through area. For a normal distribution, the curve is symmetric about its mean. The total area over the entire real line is one; the area between a and b is the chance of a value in that interval.

Changing the mean shifts the curve without changing its shape. Increasing the standard deviation spreads it out, so its peak must fall to preserve total area. The familiar percentages within one, two and three standard deviations are about 68.3%, 95.4% and 99.7% for a normal distribution. They do not hold for every roughly bell-shaped dataset.

## Formal

For $\sigma>0$, the normal density is $f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$. Here μ is the mean and σ is the standard deviation. For $a\le b$, the interval probability is $P(a\le X\le b)=\int_a^b f(x)\,dx$.

Standardizing with $Z=(X-\mu)/\sigma$ gives mean 0 and standard deviation 1. If Φ is the standard normal cumulative distribution, then $P(a\le X\le b)=\Phi((b-\mu)/\sigma)-\Phi((a-\mu)/\sigma)$. A curve's height is a density, not the probability of that exact value; a single point has probability zero in this continuous model.

## Advanced

The central limit theorem concerns suitably standardized sums or averages of independent, identically distributed observations with finite positive variance. It does not say the original observations become normal. The optional 3D view illustrates a centred two-variable Gaussian surface, not this one-variable density: σ changes its spread, but μ and the shaded bounds from the 2D view do not control it.

## Derivation

1. The integral of the standard Gaussian expression over the real line is √(2π). This determines the factor needed for total area one.
2. Shift the centre by μ and scale horizontal distances by σ. Divide the height by σ to preserve the area.
3. Integrating from one standard deviation below the mean to one above it gives about 0.683. Wider standardized intervals give the other familiar percentages.

## Real world

### Measurement models

A normal model may approximate small measurement errors when many independent influences combine. Check the observed distribution and possible systematic errors before using it.

### Averages

Even when individual measurements are skewed, averages of sufficiently large independent samples may be approximately normal. The needed sample size depends on the original distribution.
