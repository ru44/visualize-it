---
title: 'Confidence intervals: thirty labs, one truth'
summary: >-
  No sample tells you the truth exactly, so honest science publishes a range —
  and "95% confidence" is a promise about how often the method catches the
  truth, not a feeling about any single range.
parameters:
  n: n — how many measurements each lab takes
  z: z — how many standard errors wide the interval reaches on each side
variables:
  - the sample mean a lab actually measured
  - the chosen width of the interval, in standard errors
  - the population's spread (fixed at 10 here)
---

## Try it

1. Keep z = 1.96 and look at the forest: thirty labs, each with its own interval, and about 28 or 29 of the 30 catch the dashed truth — the red ones missed honestly.
2. Drop z to 1: every interval narrows and far more labs go red — narrow claims sound precise and fail often.
3. Now raise n instead: every interval tightens around the truth without losing catches, because more data shrinks the scatter itself.

## Real-life examples

- **A typical study.** 24 measurements with z = 1.96: the interval spans about ±4, and roughly 95% of labs running this exact method would catch the truth.
- **The bigger study.** 100 measurements, same z: the interval tightens to ±2 — quadruple the work for half the width.
- **The overconfident lab.** z = 1 looks impressively tight, but the forest shows the price: about a third of such intervals simply miss.

## Test yourself

1. Dial z to the famous 1.96 — the 95% setting used in most published science.
2. Make the whole interval no wider than 2 units — you will need both a big n and a modest z.
3. Run a 99%-style interval (z = 2.58) with a small sample, n at most 50 — wide, but honest.

## Intuition

Thirty labs measure the same thing — the dashed line, which none of them can see. Each lab's sample mean lands a little off, so each publishes a range around what it measured: "the truth is probably in here". The forest on screen is all thirty claims at once, and the red ones are the labs that missed — not because they cheated, but because their sample happened to land far from the truth.

That is what "95% confident" really means: nothing about any single interval, which either contains the truth or does not, but a promise about the method — run this procedure a hundred times, and about 95 of the hundred intervals will catch the truth. Slide z down and you trade honesty for the appearance of precision; slide n up and you buy genuine precision, because the scatter of sample means itself shrinks as $\dfrac{\sigma}{\sqrt{n}}$.

## Formal

A sample of $n$ measurements from a population with spread $\sigma$ has a sample mean whose own scatter — the standard error — is $\dfrac{\sigma}{\sqrt{n}}$. The interval $m \pm z\dfrac{\sigma}{\sqrt{n}}$ therefore catches the true mean $\mu$ exactly when $m$ happens to land within $z$ standard errors of it.

Because sample means are approximately normally distributed, the catch rate is the normal probability of landing within $z$ standard errors: about 68% for $z = 1$, 95% for $z = 1.96$, and 99% for $z = 2.58$ — the coverage readout tracks it live.

## Advanced

In real studies $\sigma$ is itself estimated from the sample, which widens the honest interval slightly — Student's t distribution replaces $z$ for small $n$, converging to the normal as $n$ grows. The sharper trap is interpretational: once a specific interval is printed, the truth is either in it or not, so "there is a 95% chance the truth is in this interval" is strictly wrong under this framework — the 95% belongs to the factory, not to the single product. Bayesian credible intervals are the construction that makes the tempting sentence true, at the price of stating prior beliefs.

## Derivation

1. Averages are steadier than individuals: means of $n$ measurements scatter around the truth $\mu$ with spread $\dfrac{\sigma}{\sqrt{n}}$, the standard error.
2. An interval reaching $z$ standard errors each side of $m$ catches $\mu$ precisely when the sample mean landed within $z$ standard errors of it.
3. The normal curve puts about 95% of sample means within $1.96$ standard errors — so that choice of $z$ catches the truth in about 95 of every 100 runs.

## Real world

### Polls and election forecasts
Every "52% ± 3" headline is one tree from this forest — and about one poll in twenty misses honestly, with nobody at fault.

### Drug trials
Regulators read the interval, not the point estimate: a treatment effect of "+4, interval −1 to +9" has not yet shown it works at all.

### Quality control
Factories track interval estimates of weights and doses; an interval drifting off target triggers recalibration before customers notice.

### Physics constants
Measurements of fundamental constants are published as value ± uncertainty, and new experiments are judged by whether forests of them overlap.
