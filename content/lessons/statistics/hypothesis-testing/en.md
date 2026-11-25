---
title: 'Testing a fair-coin hypothesis'
summary: 'Compare an observed heads proportion with what a fair-coin model predicts, while separating evidence from proof.'
parameters:
  obs: 'observed heads proportion'
  n: 'n — number of flips'
variables:
  - 'observed difference from 50%, in null-model standard errors'
  - 'observed heads proportion written as a fraction'
---

## Try it

1. Set the observed proportion to 55% and n = 100. The fair-coin standard error is 5 percentage points, so the observed difference gives z = 1.
2. Keep 55% and raise n to 2000. The standard error falls to about 1.12 percentage points and z rises to about 4.47. The same difference now provides stronger evidence against the fair-coin model.
3. Try 70% and n = 10. This represents 7 heads in 10 flips and gives z ≈ 1.26. It does not cross the displayed threshold. The normal approximation is rough at this sample size.

## Real-life examples

1. **55 heads in 100 flips.** The observed share is 55%, giving z = 1. This test does not reject the fair-coin model; it does not prove that model true.
2. **1100 heads in 2000 flips.** The same 55% gives z ≈ 4.47, beyond the displayed threshold. The result is unusual under independent fair flips, but does not establish intentional manipulation.
3. **7 heads in 10 flips.** The share is 70%, yet the small sample gives z ≈ 1.26. An exact binomial test is preferable for such a small count.

## Test yourself

1. Adjust the share and n to put z within 0.05 of 1.96.
2. Keep the observed share close to 55% and increase n until z reaches at least 1.96.
3. Choose an observed share of at least 65% with z below 1.96.

## Intuition

To test whether a coin is fair, start by assuming independent flips with a heads probability of 0.5. This assumption is the null hypothesis. It predicts that different samples will give different heads proportions, with smaller variation in larger samples. The bell illustrates the approximate shape of those proportions under that model; the vertical observation marker shows the proportion being tested.

We compare the observed difference from 50% with the variation predicted by the model. A difference of five percentage points is one standard error at n = 100, but more than four at n = 2000. Crossing a chosen threshold is evidence against the model, not proof of a cause. Failing to cross it does not establish fairness, and statistical significance does not measure the practical importance of a difference.

## Formal

Under independent fair flips, the observed heads share h has standard error $0.5/\sqrt{n}$. The statistic $z=(h-0.5)/(0.5/\sqrt{n})$ measures the observed difference in standard-error units. Here h is a fraction, so 55% means 0.55.

A two-sided normal-approximation test at the 5% level rejects when $|z|\ge1.96$. The controls only allow shares at or above 50%, so this view shows the upper side. The approximate two-sided p-value is $2[1-\Phi(|z|)]$: the probability, under the null model, of a result at least as far from 50% in either direction.

## Advanced

A p-value is not the probability that the null hypothesis is true, nor the probability that a finding is a false alarm. A 5% test has an approximately 5% rejection rate over repeated experiments when its null model and approximation apply. For small samples, use exact binomial probabilities. Also, not every slider combination represents an actual count: n times h must be an integer for observed coin flips. Testing repeatedly until a threshold is crossed changes the error rate unless the procedure accounts for it.

## Derivation

1. A fair flip has variance 0.25. For n independent flips, the heads proportion has variance 0.25/n and standard error 0.5/√n.
2. Subtract the null mean 0.5 and divide by the standard error to express the difference on a common scale.
3. A standard normal variable falls outside −1.96 to 1.96 about 5% of the time, with about 2.5% in each tail. This supplies the approximate two-sided threshold.

## Real world

### Checking a random generator

Compare observed output frequencies with a specified model. A discrepancy could reflect the generator, dependent observations or the way the data were collected; the test alone does not identify which.

### Comparing designs

A controlled comparison can test a predefined difference between two designs. That requires a test for two groups, not this single fair-coin formula, and should report the effect size and uncertainty as well as a p-value.
