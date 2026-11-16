---
title: Binomial distribution
summary: 'Find the probability of exactly k successes in a fixed number of independent trials with the same success chance.'
parameters:
  n: 'n — total trials'
  p: 'p — success probability per trial'
  k: 'k — selected success count'
variables:
  - 'number of successes in the n trials'
  - 'number of choices for the k success positions'
  - 'expected success count'
  - 'standard deviation of the success count'
---

## Try it

1. Set n = 10, p = 0.5 and k = 5. The highlighted bar gives a probability of about 0.246: even the most likely count occurs less than a quarter of the time.
2. Change only k to 3. The exact probability is about 0.117; the cumulative readout is about 0.172 because it includes counts 0, 1, 2 and 3.
3. Keep n = 10 and change p to 0.2. The mean moves to 2 and the bars become asymmetric. Keep k between 0 and n; the highlighted count is capped at n.

## Real-life examples

1. **Ten fair flips.** Exactly five successes has probability 252/1024 ≈ 0.246. The average count is five, but other counts together are much more likely.
2. **Practice shots.** Model 20 shots as independent, each with a 0.7 success chance. The chance of exactly 15 successes is about 0.179. Actual shots need not satisfy these assumptions.
3. **Marked parts.** For 50 independent items each marked with probability 0.02, the probability that none is marked is 0.98⁵⁰ ≈ 0.364. The expected count is one.

## Test yourself

1. Make the expected number of successes, n × p, equal 6.
2. Choose n, p and a valid count k so the chance of exactly k successes exceeds 0.3.
3. Make the standard deviation of the success count approximately 3.

## Intuition

Consider three independent fair coin flips. Exactly two successes can occur in three orders: SSF, SFS or FSS. Each order has probability 1/8, so the total probability is 3/8. We multiply along one order, then add over all orders that produce the required count.

The binomial distribution does this for every possible success count. Each bar represents a count, not a single order of results. Moving k selects a bar without changing the distribution. Changing n or p changes the distribution itself. The dashed vertical line marks the mean, which need not be an integer or a possible result of one experiment.

## Formal

For n independent trials with constant success probability p, the count X has $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ for integers $0\le k\le n$. The combination counts orders of successes, and the powers give the probability of each such order.

The mean is $E[X]=np$ and the standard deviation is $\sigma=\sqrt{np(1-p)}$. The mean is a long-run average count; the standard deviation measures variation in counts. The cumulative probability $P(X\le k)$ adds the probabilities from 0 through k, including k.

## Advanced

A normal distribution can approximate binomial counts when both np and n(1−p) are sufficiently large, often with a continuity correction. A large n alone does not ensure a symmetric shape when p is near zero or one. When n grows while np stays fixed, a Poisson approximation may be more suitable. Neither approximation makes the counts continuous.

## Derivation

1. Independence lets us multiply the probabilities for one particular sequence of successes and failures.
2. Choose the k success positions among the n trials; there are C(n,k) choices.
3. The sequences are disjoint and have the same probability, so multiply one sequence's probability by their count.

## Real world

### A repeated random procedure

Drawing a counter, replacing it and mixing before the next draw can model repeated trials with an unchanged probability. Drawing without replacement generally changes the chance and requires a different model.

### Batch checks

A binomial model can estimate how many items meet a criterion when the independence and equal-probability assumptions are reasonable. Shared production conditions can make faults cluster, violating independence.
