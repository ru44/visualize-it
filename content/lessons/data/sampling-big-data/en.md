---
title: Sampling big data
summary: You do not need to read every row of a billion-row table to know roughly what it says — a big enough random sample gets you close, fast.
parameters:
  p: true proportion, p
  N: sample size, N
  speed: flip speed, speed
variables:
  - p, the true proportion you are trying to estimate
  - N, how many items you sample
---

## Try it

1. Set N to 20 and watch the row of flips. The running average line jumps around a lot with so few flips.
2. Raise N toward 1000. The running average settles down and stays close to p.
3. Raise speed to run through flips quickly, then change p and watch the average settle near the new value instead.

## Real-life examples

1. **A quick poll.** p at 0.5, N at 50, speed at 80: a fast poll of 50 people to estimate a roughly even split.
2. **An election poll.** p at 0.3, N at 1000, speed at 60: polling 1,000 voters to estimate 30% support for a candidate.
3. **A quality check.** p at 0.8, N at 2000, speed at 150: testing 2,000 items on a production line to estimate an 80% pass rate.

## Test yourself

1. Set N to exactly 500.
2. Set p to exactly 0.5.
3. Push N to 1500 or higher.

## Intuition

Imagine flipping a coin that lands heads 30% of the time, and asking how many heads you would see out of the first 20 flips: the running average line on the chart can wander far from 0.3 with so few flips. Raise the slider N toward 1000 and watch that same line settle down and hug p much more closely — more flips, less wandering.

That wandering has a size, called the standard error, and it shrinks as your sample N grows. It is written $\text{SE} = \sqrt{\dfrac{p(1-p)}{N}}$, with p the true proportion and N how many flips, or rows, you sampled. A pollster or a data analyst uses exactly this idea to say how many people, or rows, they need to sample before trusting an estimate.

## Formal

Sampling estimates a property of a whole dataset, such as the fraction p of rows meeting some condition, by looking at only N randomly chosen rows instead of all of them. The uncertainty in that estimate is measured by the standard error, $\text{SE} = \sqrt{\dfrac{p(1-p)}{N}}$, which shrinks as the sample grows.

Because N sits under a square root, quadrupling the sample size only halves the standard error, so shrinking the error by a factor of ten costs a hundred times more rows — a useful fact when deciding whether it is worth reading an entire billion-row table or just a well-chosen sample of it.

## Advanced

Formally, the sample proportion converges to the true p by the law of large numbers, and for large N it is approximately normally distributed around p with standard deviation SE; this is what lets analysts build a 95% confidence interval of roughly $p \pm 2 \cdot \text{SE}$. BigQuery and similar warehouses support this directly with a TABLESAMPLE clause that reads only a random fraction of a huge table.

## Derivation

1. The variance of the estimate from N samples of a proportion p works out to p times one minus p, divided by N.
2. Standard error is just the square root of that variance, put back into the same units as p itself.
3. As N grows without bound, that fraction shrinks toward zero, so the standard error shrinks toward zero too — more sample, less uncertainty.

## Real world

### Opinion polls
A pollster estimates the support for a candidate among millions of voters by calling only a few thousand of them.

### A/B testing
A website compares two versions of a page by showing each to a sample of visitors rather than waiting for every visitor ever.

### BigQuery TABLESAMPLE
Analysts run a query on a random sample of a huge table with TABLESAMPLE to get a fast, cheap estimate before running the full query.

### Quality control
A factory tests a sample of items off the line instead of every single one, and estimates the overall defect rate from that sample.
