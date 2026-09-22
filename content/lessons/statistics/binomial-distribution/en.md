---
title: Binomial distribution
summary: >-
  See how likely each possible number of successes is when you repeat a
  yes-or-no trial many times — like flipping coins or testing a batch of parts.
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

## Try it

1. Watch the bars: each one is the chance of getting exactly that many successes out of «n — number of trials» trials.
2. Drag «k — number of successes» along the bars and read the tall central bar's height: that is the most likely outcome.
3. Raise «n — number of trials» toward 60. The jagged bars smooth into a symmetric bell — that shape is the normal distribution appearing on its own.

## Real-life examples

1. **Coin-toss count.** Flip a fair coin 10 times; the chance of landing exactly 5 heads is only about 1 in 4, even though 5 is the single most likely count.
2. **Free-throw shooter.** A basketball player who makes 70% of her free throws takes 20 shots; the chart shows how likely she is to sink exactly 15 of them.
3. **Factory defect check.** A batch of 50 parts each has a 2% chance of being faulty; the chart shows the chance the whole batch comes out with zero faulty parts.

## Test yourself

1. Set «n — number of trials» and «p — chance of success each time» so the average number of successes (n × p) is exactly 6.
2. Find values of «k — number of successes» where that exact outcome has more than a 30% chance of happening.
3. Make the spread of likely outcomes — its standard deviation — about 3 successes wide.

## Intuition

Toss 10 fair coins. Exactly 5 heads is the most likely single result, yet it happens only about a quarter of the time — the bars on screen show every possible count at once. Drag «k — number of successes» to 3 and read the bar's height: three heads has probability $\binom{10}{3}/2^{10} = 120/1024$, exactly what the readout shows.

Now drag «p — chance of success each time» down to 0.2: the hill of bars slides left and leans. Raise «n — number of trials» to 60 instead, and the hill turns into a smooth, symmetric bell — that bell is the normal distribution appearing on its own.

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
