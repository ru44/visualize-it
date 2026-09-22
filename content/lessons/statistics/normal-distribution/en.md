---
title: The normal distribution
summary: >-
  The bell curve: where sums of many small random effects end up. The area under
  it between two values is a probability.
parameters:
  mu: μ — mean
  s: σ — standard deviation
  a: from a
  b: to b
variables:
  - the centre of the bell
  - >-
    its width: the distance from the centre to the point where the curve changes
    from convex to concave
  - the shaded area — the probability of landing between a and b
---

## Intuition

Heights, measurement errors, exam scores: pile up enough small independent influences and this curve appears. The total area under it is exactly 1, and the shaded part is the probability of a value between $a$ and $b$. With $a$ and $b$ one standard deviation either side of the mean, the shaded area is 0.683.

Widen $\sigma$ and the bell flattens and spreads, but the area between $\mu \pm \sigma$ stays 68%, between $\mu \pm 2\sigma$ 95%, and between $\mu \pm 3\sigma$ 99.7%. Those three numbers let you judge any bell-shaped data with just a mean and a standard deviation.

## Formal

$X \sim \mathcal N(\mu, \sigma^2)$ has density $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-(x-\mu)^2/2\sigma^2}$; $P(a \le X \le b) = \int_a^b f$. Standardising $Z = (X-\mu)/\sigma$ gives $\mathcal N(0,1)$.

There is no elementary antiderivative; probabilities come from the error function $\Phi(z) = \tfrac12\left[1 + \mathrm{erf}(z/\sqrt2)\right]$ or from tables.

## Advanced

Central limit theorem: if $X_i$ are i.i.d. with mean $\mu$ and finite variance $\sigma^2$, then $\sqrt n\,(\bar X_n - \mu)/\sigma \to \mathcal N(0,1)$ in distribution — whatever the shape of the $X_i$. The normal is also the maximum-entropy distribution for a given mean and variance, and the only stable law with finite variance.

## Derivation

1. The Gaussian integral (evaluated by squaring it and switching to polar coordinates) fixes the normalising constant.
2. Shift by $\mu$, scale by $\sigma$, divide by the constant so the total area is 1.
3. The 68–95–99.7 rule follows from the standard normal table.

## Real world

### Body measurements
Adult heights within one population are close to normal — which is how clothing sizes are planned.

### Measurement error
Repeated readings of the same quantity scatter normally around the true value; the mean of many readings is more precise by 1/√n.

### Grading and IQ scores
Standardised tests are scaled to a normal with a chosen mean and standard deviation (IQ: 100 and 15).

### Finance and engineering
Noise in signals, tolerances of parts and daily price changes are all modelled — with care about the tails — as normal.
