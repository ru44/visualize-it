---
title: Law of large numbers
summary: >-
  Averages settle down as you collect more data — and the formula tells you
  exactly how fast.
parameters:
  p: p — true probability
  'N': N — number of trials
  speed: trials per second
variables:
  - the proportion of successes after N trials
  - the typical distance between the proportion and p — the standard error
charts:
  - title: Typical error of the proportion shrinks like 1/√N
    xLabel: N (trials)
    yLabel: σ of p̂
    series:
      - sqrt(p(1−p)/N)
---

## Try it

1. Watch the shaded funnel: it marks where 95% of experiments stay, and it narrows as trials pile up.
2. Drag «N — number of trials» down to 20. The funnel is wide: a single result can swing far from «p — true probability».
3. Drag «N — number of trials» up toward 2000. The funnel squeezes tight around «p — true probability».

## Real-life examples

1. **Small pilot survey.** Asking just 50 people, with a true rate of 50%, gives an estimate that can easily be off by 10 percentage points or more.
2. **National opinion poll.** A poll of 1000 voters, true support near 45%, is accurate to roughly ±3% — the standard "margin of error" you see quoted in the news.
3. **Large clinical trial.** Following 2000 patients with a 20% event rate narrows the uncertainty enough to detect even small real effects.

## Test yourself

1. Shrink the standard error to about 3%, like a national poll.
2. Run at least 1000 trials while keeping the standard error below 2%.
3. Keep the trial count at 100 or fewer, yet push the standard error above 10%.

## Intuition

The shaded funnel is where 95% of experiments stay. It is wide at the start — after 10 flips of a fair coin, «N — number of trials» = 10, the result often shows 30% or 70% heads — and it narrows as «N — number of trials» grows. But look at how it narrows: to halve the width you need four times as many trials.

That square-root law is why polls of 1000 people are accurate to about ±3% while polls of 100 are only good to ±10%, and why a casino is sure to profit over a year even though any single night is a gamble.

## Formal

Weak law: for every $\varepsilon > 0$, $P(|\hat p_N - p| > \varepsilon) \to 0$ as $N \to \infty$.

Since $\hat p_N$ is a mean of $N$ independent Bernoulli($p$) variables, $\mathrm{Var}(\hat p_N) = p(1-p)/N$, hence $\sigma_{\hat p} = \sqrt{p(1-p)/N}$.

## Advanced

The strong law says $\hat p_N \to p$ almost surely. Chebyshev’s inequality gives the weak law directly: $P(|\hat p_N - p| > \varepsilon) \le p(1-p)/(N\varepsilon^2)$. The central limit theorem sharpens this to the normal band $p \pm 1.96\sigma_{\hat p}$ shown in the picture.

## Derivation

1. One trial: a success (1) with probability $p$.
2. Variances of independent trials add; dividing by $N$ divides the variance by $N^2$.
3. The spread of the average shrinks with the square root of the sample size.

## Real world

### Opinion polls
The “margin of error ±3%” of a 1000-person poll is exactly 1.96·√(0.25/1000).

### Casinos and insurers
Each bet is uncertain; the average over millions of bets is not. The house edge becomes a guaranteed income.

### A/B testing
Deciding whether a new web page converts better needs enough visitors for the funnel to be narrower than the difference you hope to detect.
