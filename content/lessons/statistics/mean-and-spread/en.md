---
title: 'Mean, variance and standard deviation'
summary: 'Calculate a list’s average and measure how spread out its values are using squared distances from that average.'
parameters:
  m: 'c — candidate centre'
  a: 'a — start of shaded integral'
  b: 'b — end of shaded integral'
variables:
  - 'mean of the data'
  - 'average squared distance from the mean'
  - 'square root of variance, in the data’s units'
charts:
  - title: Total squared distance from a guessed centre c is smallest at the mean
    xLabel: guessed centre c
    yLabel: Σ (xᵢ − c)²
    series:
      - 'sum over the data 2, 4, 4, 4, 5, 5, 7, 9'
---

## Try it

1. Use the fixed data 2, 4, 4, 4, 5, 5, 7, 9. Set m = 5. The lower chart gives their total squared distance, 32, at its minimum.
2. Change m to 8. The total rises to 104. The main plot shows the single-value penalty (x−m)², while the lower chart adds that penalty over the eight data values.
3. Return m to 5 and change a or b. These controls change the shaded continuous area in the main plot, not the fixed data or their variance. The lower chart stays unchanged.

## Real-life examples

1. **The mean.** The eight scores sum to 40, so their mean is 5. At m = 5, the squared distances sum to 32; dividing by 8 gives variance 4 and standard deviation 2.
2. **A centre too high.** At m = 8, the same data have total squared distance 104. The guessed centre is 3 above the mean.
3. **A centre too low.** At m = 1, the total is 160. Moving 4 away from the mean adds 8 × 4² = 128 to the minimum total of 32.

## Test yourself

1. Find m giving a total squared distance near its minimum, 32.
2. Choose m below 3 and make the total squared distance greater than 80.
3. Choose m above 7 while keeping the total squared distance below 100.

## Intuition

The mean of 2, 4, 4, 4, 5, 5, 7, 9 is 5: add the eight values and divide by eight. To describe their spread, subtract 5 from each value. Adding these signed differences would give zero because the positive and negative differences cancel. Squaring first prevents that cancellation and gives more weight to larger distances.

The squared distances are 9, 1, 1, 1, 0, 0, 4 and 16. Their average is 4, called the variance. Its square root is 2, called the standard deviation. If the scores are measured in points, variance has squared-point units and standard deviation returns to points. It describes overall spread; it does not mean every score is two points from the mean.

## Formal

For a complete list of n values, $\mu=\frac{1}{n}\sum_{i=1}^n x_i$, $\sigma^2=\frac{1}{n}\sum_{i=1}^n(x_i-\mu)^2$, and $\sigma=\sqrt{\sigma^2}$. These formulas describe the list with divisor n; n must be positive.

The mean minimizes the total squared distance $S(c)=\sum_i(x_i-c)^2$. For these data, $S(c)=32+8(c-5)^2$. When estimating a population variance from an independent random sample, the usual unbiased sample-variance formula uses $n-1$ in place of n and requires more than one observation.

## Advanced

The identity S(c) = S(μ) + n(c−μ)² explains why the mean is the unique minimum for a nonempty list. The median instead minimizes total absolute distance. These centres can differ substantially when a few values are very large or small, so mean and standard deviation do not fully describe every distribution.

## Derivation

1. Define the total squared distance from an arbitrary candidate centre c.
2. Differentiate with respect to c and set the derivative to zero. This gives the mean; the positive second derivative 2n confirms a minimum.
3. Divide the minimum total by n to describe the complete list's variance, then take its square root for the standard deviation.

## Real world

### Comparing groups

Two classes can have the same average score but different spreads. Looking at both mean and standard deviation helps distinguish tightly grouped results from widely varying ones.

### Repeated measurements

Standard deviation summarizes how much repeated readings vary. It does not reveal a constant calibration error: all readings could be close together and still be far from the correct value.
