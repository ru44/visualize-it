---
title: What probability means
summary: >-
  A probability is a share between 0 and 1. Watch a random experiment and see
  the share emerge from many trials.
parameters:
  p: p — chance of success on one trial
  'N': N — number of trials
  speed: trials per second
variables:
  - 'the true probability of a success — for a fair coin, 0.5'
  - how many times the experiment is repeated
  - the proportion of successes observed so far (orange line)
---

## Try it

1. Watch the orange line at the start: it jumps around wildly. Three heads in a row is normal.
2. Let it run. After a few hundred flips the line settles near the dashed line at p.
3. Press «again». A different path, the same destination. That destination is what probability means.

## Intuition

Each dot along the top is one trial: orange for success, grey for failure. The orange line is the proportion of successes so far. At the start it jumps around wildly — three heads in a row is nothing unusual — but as trials pile up it calms down and hugs the dashed line at $p$.

Probability is that long-run share. It does not say what the next trial will do; it says what fraction you should expect over many trials. Change $p$ to 0.2 and the line settles at one in five. Press “again”: a different path, the same destination.

## Formal

For equally likely outcomes, $P(A) = |A| / |\Omega|$. In general $0 \le P(A) \le 1$, $P(\Omega) = 1$, and $P(A \cup B) = P(A) + P(B)$ for disjoint events.

The complement rule $P(A^c) = 1 - P(A)$ often turns a hard count into an easy one.

## Advanced

Kolmogorov’s axioms define a probability space $(\Omega, \mathcal{F}, P)$ with $P$ countably additive on a σ-algebra. Long-run frequencies are then a *theorem* (the law of large numbers), not the definition — which is what lets probability apply to one-off events as well as repeatable ones.

## Derivation

1. List every outcome; an event is a set of outcomes.
2. When outcomes are equally likely, probability is a ratio of counts — which is where permutations and combinations come in.
3. The observed proportion converges to the probability: the law of large numbers.

## Real world

### Weather forecasts
“30% chance of rain” means: on days like this one, it rains about 3 times in 10.

### Insurance
Premiums are set from the long-run frequency of claims across many similar customers.

### Quality control
A factory that finds 2 defects in 1000 items estimates a defect probability of 0.002 — and knows a run of 3 defects can still be luck.
