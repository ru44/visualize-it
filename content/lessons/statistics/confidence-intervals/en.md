---
title: 'Confidence intervals'
summary: 'Understand a confidence interval as a method whose repeated intervals contain the true mean at a stated rate.'
parameters:
  n: 'n — observations per sample'
  z: 'z — margin in standard errors'
variables:
  - 'sample mean at the centre of an interval'
  - 'number of standard errors on each side'
  - 'known population standard deviation, fixed at 10'
---

## Try it

1. Set n = 24 and z = 1.96. Each dot is one sample mean; its horizontal interval extends about 4 units either side. The dashed line marks the true mean, 50.
2. Keep n fixed and reduce z to 1. The same sample means now have narrower intervals, so fewer intervals contain 50. The theoretical coverage falls from about 95% to 68%.
3. Restore z = 1.96 and increase n to 96. The margin halves. This illustration reuses the same standardized sample offsets, so the same rows miss; newly collected samples would not preserve that exact pattern.

## Real-life examples

1. **24 measurements.** With known population standard deviation 10 and z = 1.96, the margin is about 4.00. A sample mean of 52 would give roughly [48, 56].
2. **100 measurements.** With the same z, the margin is 1.96. The sample size is slightly more than four times 24, so the margin is slightly less than half the first example's.
3. **A lower confidence level.** With n = 24 and z = 1, the margin is about 2.04 and the theoretical coverage about 68.3%. This is a different confidence level, not a dishonest interval if reported accurately.

## Test yourself

1. Set z close to 1.96, giving approximately 95% theoretical coverage.
2. Make the full interval width, 2z × 10/√n, at most 2 units.
3. Set z close to 2.58 and keep n at most 50, giving approximately 99% theoretical coverage.

## Intuition

Suppose many groups measure the same quantity. Even with the same method and sample size, their sample means differ. An interval puts a margin around each mean to express sampling uncertainty. In this illustration the true mean is known to us, so we can check which intervals contain it. In an actual estimation problem, that value is unknown.

A 95% confidence method contains the fixed true mean in about 95% of repeated samples under its assumptions. It does not promise exactly 95 successes in every 100 samples. Increasing z widens the intervals and raises coverage; increasing n narrows them at the same theoretical coverage because sample means also become less variable. The display uses 30 fixed illustrative rows, not newly sampled experiments on every slider change.

## Formal

For n independent observations from a normal population with known standard deviation σ, the sample mean m has standard error $\sigma/\sqrt{n}$. A confidence interval is $m\pm z\sigma/\sqrt{n}$, where z sets how many standard errors the margin spans on each side.

Its coverage is $P(|m-\mu|\le z\sigma/\sqrt{n})=\Phi(z)-\Phi(-z)$, where μ is the fixed population mean and Φ is the standard normal cumulative distribution. Choosing $z=1.96$ gives about 95% coverage; this refers to the sampling procedure, not a probability distribution assigned to μ after observing one interval.

## Advanced

The known-σ normal model makes this coverage calculation exact apart from the rounded critical value. For nonnormal populations, a normal approximation may be useful with sufficiently large samples. If σ is unknown and estimated from independent normal observations, use a t interval with n−1 degrees of freedom. Confidence intervals for a mean are not prediction intervals for individual future observations.

## Derivation

1. Independent observations have a sample mean with standard deviation σ/√n. Under the normal model, that mean is normally distributed.
2. The interval contains μ exactly when its centre m lies within z standard errors of μ.
3. The standard normal probability between −1.96 and 1.96 is about 0.95, giving the method its approximate 95% coverage.

## Real world

### Estimating an average

An interval for mean package weight describes uncertainty about the process average. It does not say that 95% of individual packages have weights inside that interval.

### Comparing estimates

Report the sample size, method and confidence level with an interval. A narrow interval does not account for systematic measurement error or biased sampling unless the method explicitly addresses them.
