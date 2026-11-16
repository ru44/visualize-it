---
title: Law of large numbers
summary: 'See why a proportion usually becomes more reliable with more independent observations, and why four times the sample halves its standard error.'
parameters:
  p: 'p — constant success probability'
  N: 'N — total trials'
  speed: 'animation speed'
variables:
  - 'successes divided by N completed trials'
  - 'standard deviation of the proportion across repeated samples'
charts:
  - title: Standard error of the proportion against sample size
    xLabel: N (trials)
    yLabel: σ of p̂
    series:
      - sqrt(p(1−p)/N)
---

## Try it

1. Set p = 0.5 and N = 50. The observed proportion varies from run to run; its standard error is about 0.071, or 7.1 percentage points.
2. Keep p = 0.5 and increase N to 200. This starts a new run. The standard error is 0.035, about half as large, although this particular run need not be closer.
3. Compare N = 500 and N = 2000 in the lower chart. Multiplying the sample size by four again halves the standard error. The shaded region in the main plot narrows with the number of completed trials.

## Real-life examples

1. **Fifty trials.** With p = 0.5 and N = 50, the standard error is about 0.071. A result several percentage points from 50% is unsurprising.
2. **A thousand trials.** With p = 0.45 and N = 1000, the standard error is about 0.0157. A normal approximation puts about 95% of final proportions within roughly 3.1 percentage points of 45%.
3. **Two thousand trials.** With p = 0.2 and N = 2000, the standard error is about 0.00894, or 0.89 percentage points. This measures variability under the model, not whether an experiment can detect a particular effect.

## Test yourself

1. Make the standard error approximately 0.03, or 3 percentage points.
2. Use at least 1000 trials and make the standard error less than 0.02.
3. Use no more than 100 trials and make the standard error greater than 0.1.

## Intuition

After one success in two trials, the proportion is 1/2. One more success changes it to 2/3, a large shift. After 500 successes in 1000 trials, one additional success changes it only to 501/1001. Each new observation has less influence when many observations are already included.

Under independent trials with a constant probability, the proportion becomes less variable across repeated experiments as the sample size grows. This does not mean every new trial reduces the error, or that failures must compensate for earlier successes. The shaded band approximates 95% coverage at each fixed trial count; it is not a region that 95% of whole paths stay inside.

## Formal

For N independent trials with the same success probability p, let $\hat p_N=\frac{1}{N}\sum_{i=1}^N X_i$, where each X is 1 for success and 0 otherwise. Its mean is p and its standard error is $\sigma_{\hat p}=\sqrt{p(1-p)/N}$. Standard error is the standard deviation of the proportion across repeated samples.

The weak law of large numbers says that for every fixed $\varepsilon>0$, $P(|\hat p_N-p|>\varepsilon)\to0$ as $N\to\infty$. Thus the chance of an error larger than any chosen positive tolerance tends to zero. It does not specify an exact result for a finite sample.

## Advanced

Chebyshev's inequality bounds the probability of an error exceeding ε by p(1−p)/(Nε²), which tends to zero. The familiar band p ± 1.96 times the standard error uses a normal approximation; it is most useful when the expected counts of both successes and failures are sufficiently large. Clipping the band to [0,1] does not make small-sample coverage exact.

## Derivation

1. Encode a success as 1 and a failure as 0. One such observation has mean p and variance p(1−p).
2. Independence lets the variances add. Dividing the sum by N divides its variance by N squared.
3. Take the square root of the variance to obtain the standard error. Replacing N with 4N divides it by two.

## Real world

### Repeated measurements

Averaging independent measurements can reduce random error. It does not remove a systematic offset in the instrument.

### Surveys

Larger representative random samples reduce sampling variability. They do not automatically repair missing groups, biased questions or nonresponse. An actual survey's uncertainty also depends on its sampling design.
