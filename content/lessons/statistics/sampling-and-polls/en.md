---
title: 'Sampling, margins and bias'
summary: 'Separate sampling variability, which falls with sample size, from a systematic bias that more responses alone do not remove.'
parameters:
  p: 'true support in the population'
  n: 'n — sample size'
  bias: 'upward bias in percentage points'
variables:
  - 'approximate margin for sampling variation, before bias'
  - 'true support proportion; convert percent to a fraction in the formula'
---

## Try it

1. Set true support to 52%, n = 1000 and bias = 0. The margin is about 3.10 percentage points. Compare the displayed estimate and its interval with the true-support marker.
2. Keep support and bias fixed and reduce n to 200. The margin rises to about 6.92 points. The dots are an illustration of a population, not a literal display of n respondents.
3. Set n = 5000 and bias = 5. The margin falls to about 1.38 points, but the estimate is shifted upward by 5 points plus a small illustrated fluctuation. The narrow interval misses the truth.

## Real-life examples

1. **1000 respondents.** At true support 52% with zero bias, the model's margin is about 3.10 points. A displayed estimate near 52% need not establish that support exceeds 50%.
2. **200 respondents.** With the same support and zero bias, the margin is about 6.92 points. Less data means more sampling uncertainty under the same assumptions.
3. **A large biased sample.** With n = 5000 and a fixed upward bias of 5 points, the margin is only about 1.38 points. Increasing n reduces random variation but leaves the fixed bias.

## Test yourself

1. Make the margin at most 1.5 percentage points and keep bias below 0.25 points.
2. Set n = 200 and choose support giving a margin of at least 6.9 percentage points.
3. Set bias to at least 4.5 percentage points and n to at least 4500.

## Intuition

Different random samples from the same population usually give different support estimates. This variation comes from whom the sample happens to include. Larger independent samples reduce it. A systematic bias is different: a sampling or measurement method may consistently favour one result. Repeating the same biased method more times need not move its average toward the truth.

The display separates these effects by adding an adjustable upward bias to a small fixed fluctuation around the true proportion. It is an illustration, not a full repeated-sampling simulation: at zero bias its constructed interval always contains the truth. An actual nominal 95% procedure can miss even without bias. The dots and highlighted subset are schematic, not the data used to compute the estimate.

## Formal

For n independent yes-or-no observations with true proportion p, the sample proportion has standard error $\sqrt{p(1-p)/n}$. Under a suitable normal approximation, the margin is $E=1.96\sqrt{p(1-p)/n}$. The formula uses p as a fraction: enter 52% on the control, but calculate with 0.52.

Multiplying E by 100 gives percentage points. At fixed p, replacing n by 4n halves E. The margin is largest at $p=0.5$. This teaching model adds a fixed bias b to the estimate's centre, giving $p+b$; increasing n does not remove that shift.

## Advanced

In real surveys the true p is unknown, so interval methods must estimate uncertainty from the data or use a conservative value such as 0.5. Survey weights, clustered sampling, nonresponse and a large sampling fraction can change the uncertainty calculation. A margin describing sampling variation does not automatically include all these errors, and a pre-election support estimate is not itself a forecast of the final result.

## Derivation

1. Under independent sampling, the variance of a yes-or-no proportion is p(1−p)/n. Its square root is the standard error.
2. At n = 1000 and p = 0.5, multiplying the standard error by 1.96 gives approximately 0.031, or 3.1 percentage points.
3. The square root in the denominator means four times the sample size halves the margin. A fixed additive bias remains unchanged.

## Real world

### Customer surveys

A survey answered only by highly satisfied customers can overstate satisfaction. More responses from that same selective group do not necessarily make it representative.

### Comparing sample sizes

Choose a sample size for a required precision under a specified sampling design. There is no universal point beyond which extra observations are useless; reducing a small margin further can still matter.
