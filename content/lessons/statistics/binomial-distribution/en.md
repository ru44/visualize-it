---
title: Binomial distribution
summary: >-
  Repeat a yes/no trial n times. How likely is each possible number of
  successes?
parameters:
  'n': n — number of trials
  p: p — chance of success each time
  k: k — number of successes
variables:
  - the number of successes in n trials
  - the number of ways to place k successes among n trials
  - 'the mean: what you get on average'
  - the spread around the mean
---

## Intuition

Toss 10 fair coins. Exactly 5 heads is the most likely result, yet it happens only about a quarter of the time — the bars show every possibility at once. Drag to $k = 3$: three heads has probability $\binom{10}{3}/2^{10} = 120/1024$, and the readout shows exactly that.

Move $p$ to 0.2 and the hill slides left and leans; raise $n$ to 60 and the hill turns into a smooth, symmetric bell. That bell is the normal distribution appearing on its own.

## Formal

$X \sim \mathrm{Bin}(n,p)$: $P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}$ for $k = 0,\dots,n$; $E[X] = np$, $\mathrm{Var}(X) = np(1-p)$.

The probabilities sum to 1 by the binomial theorem: $\sum_k \binom{n}{k}p^k(1-p)^{n-k} = (p + 1 - p)^n = 1$.

## Advanced

De Moivre–Laplace: for large $n$, $\mathrm{Bin}(n,p) \approx \mathcal N(np, np(1-p))$, the first central limit theorem (1733). When $n \to \infty$ with $np = \lambda$ fixed, the binomial tends instead to the Poisson distribution.

## Derivation

1. Independent trials: multiply the probabilities along the sequence.
2. Choose which $k$ of the $n$ positions hold the successes — a combination.
3. Add up the equally likely sequences.

## Real world

### Quality control
If 2% of parts are faulty, the chance a box of 50 has no faulty part is 0.98⁵⁰ ≈ 36%.

### Medicine
A drug that works for 70% of patients cures at least 8 of 10 with probability about 38%.

### Elections and surveys
The number of “yes” answers in a sample of n voters is binomial — the basis of every margin of error.

### Genetics
The number of children in a family who inherit a recessive trait follows Bin(n, ¼).
