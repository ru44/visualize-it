---
title: Poisson distribution
summary: 'Model how many events occur in a fixed interval when arrivals are independent and the average rate is steady.'
parameters:
  lambda: 'λ — expected events per interval'
  k: 'k — selected event count'
variables:
  - 'number of events in the chosen interval'
  - 'mean count per interval; also the variance'
  - 'e: mathematical constant approximately 2.71828'
---

## Try it

1. Set λ = 3 and k = 2. The highlighted bar gives P(X = 2) ≈ 0.224; the cumulative readout gives P(X ≤ 2) ≈ 0.423.
2. Change λ to 0.5 and k to 0. Zero events now has probability about 0.607, so more than half of intervals are empty under this model.
3. Set λ = 20 and select nearby counts. The distribution is less skewed, with mean 20 and standard deviation about 4.47. The plot shows only a finite part of the possible counts.

## Real-life examples

1. **Messages per minute.** If arrivals follow a Poisson model with a mean of 3 per minute, the chance of exactly 2 in a minute is about 0.224.
2. **Counter readings.** In a model averaging 8 independent detection events per second, exactly 5 in a second has probability about 0.0916.
3. **Marks per page.** If a Poisson model with mean 0.8 describes marks on equal-sized pages, the chance of no marks on a page is about 0.449. A low average does not always make an empty page more likely than not.

## Test yourself

1. Find λ and k giving a probability near 0.2 for exactly k events.
2. Keep λ below 1 and find a count with probability greater than 0.5.
3. Use λ greater than 15 and choose k within 1 of λ, with an exact-count probability greater than 0.05.

## Intuition

An average of three messages a minute does not mean one arrives every 20 seconds. Some minutes can be empty and others busy. A Poisson model assigns probabilities to these counts when arrivals occur independently at a steady rate. For a mean of three, the probability of exactly two is $9e^{-3}/2\approx0.224$, while zero has probability about 0.050.

The parameter λ is the expected count in the chosen interval, not necessarily a whole number. Moving k highlights one count without changing its probability or the other bars. Increasing λ moves the distribution toward larger counts and increases its absolute spread. At large λ the shape approaches a bell, but it is still a discrete distribution with some skewness.

## Formal

For $\lambda>0$, a Poisson count satisfies $P(X=k)=\lambda^k e^{-\lambda}/k!$ for integers $k=0,1,2,\ldots$. Here λ is the expected count in the specified interval and e is approximately 2.71828. There is no finite maximum count in this model.

The mean and variance are equal: $E[X]=\mathrm{Var}(X)=\lambda$, so $\sigma=\sqrt{\lambda}$. If events form a homogeneous Poisson process with rate r per unit time, an interval of length T has $\lambda=rT$. Keep the units of r and T consistent.

## Advanced

The distribution arises as the limit of a binomial count when the number of opportunities grows and each success chance shrinks, while their product stays λ. For a homogeneous Poisson process, disjoint intervals have independent counts and waiting times are exponential with mean 1/r. A constant average alone is insufficient: clustered or regularly spaced arrivals can have very different count distributions.

## Derivation

1. Divide a fixed interval into n small slots and model each as an independent trial with success chance λ/n.
2. Keep λ and k fixed while n grows. The combinatorial factor approaches 1/k! after scaling, and the failure factor approaches e to the power −λ.
3. Combining the limits gives the Poisson probability for each fixed nonnegative count k.

## Real world

### Arrivals

A Poisson model may approximate messages arriving during a period with steady activity. A coordinated burst or a changing rate calls for a different model or shorter intervals.

### Marks on a surface

The interval can be an area or length rather than time. Independent marks spread at a constant density may be modeled with λ equal to density multiplied by inspected area.
