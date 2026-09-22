---
title: The normal distribution
summary: >-
  The bell curve behind heights, test scores, and measurement error — the area
  under it between two values tells you a probability.
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

## Try it

1. Watch the shaded region between «from a» and «to b»: its area is the probability of landing in that range.
2. Shrink «σ — standard deviation». The bell narrows and grows taller, concentrating around the mean.
3. Set «from a» and «to b» to one «σ — standard deviation» either side of «μ — mean». The shaded area settles at about 68%.

## Real-life examples

1. **Class test scores.** Scores cluster around 6 out of 12 with a typical spread of 1.5 points; the shaded area shows the chance of scoring between 4.5 and 7.5.
2. **Precision manufacturing.** A machine cuts parts to a target size of 8 with very little error, a spread of just 0.5; nearly every part lands between 7.5 and 8.5.
3. **Delivery time variability.** Packages average 5 days to arrive with a wide spread of 3.5 days; the shaded area shows the chance a delivery takes between 1.5 and 8.5 days.

## Test yourself

1. Centre the shaded window on the mean, one standard deviation either side, so it covers about 68% probability.
2. Make a narrow distribution — spread under 1 — where your window still captures more than 95% of the probability.
3. Capture more than 30% probability using a shaded window narrower than 1 unit.

## Intuition

Heights, test scores, measurement errors: pile up enough small independent influences and this curve appears. The total area under it is exactly 1, and the shaded part between «from a» and «to b» is the probability of landing in that range. Set «from a» and «to b» one «σ — standard deviation» either side of «μ — mean» and the shaded area is 0.683.

Widen «σ — standard deviation» and the bell flattens and spreads, but the area within one standard deviation of the mean stays 68%, within two 95%, and within three 99.7%. Those three numbers let you judge any bell-shaped data using just a mean and a standard deviation.

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
