---
title: Poisson distribution
summary: >-
  Rare events at a steady average rate: how many will happen in the next hour,
  page, or square kilometre?
parameters:
  lambda: λ — average number per interval
  k: k — number of events
variables:
  - the number of events in one interval
  - the average count per interval — also the variance
  - 'Euler’s number, 2.718…'
---

## Intuition

A call centre gets 3 calls a minute on average. Some minutes bring none, some bring six. The bars show how the counts spread: with $\lambda = 3$, exactly 2 calls has probability $9e^{-3}/2 \approx 0.224$. Zero calls still happens 5% of the time.

Slide $\lambda$ down to 0.5 and the distribution piles up at zero — most intervals are empty. Slide it to 20 and it becomes a symmetric bell with spread $\sqrt{20} \approx 4.5$: for a Poisson variable the variance equals the mean, so counts of about $\lambda \pm \sqrt\lambda$ are typical.

## Formal

$X \sim \mathrm{Poi}(\lambda)$: $P(X=k) = \lambda^k e^{-\lambda}/k!$ for $k = 0, 1, 2, \dots$; $E[X] = \mathrm{Var}(X) = \lambda$.

It is the limit of $\mathrm{Bin}(n, \lambda/n)$ as $n \to \infty$: many opportunities, each with a tiny chance.

## Advanced

A Poisson process has independent increments and $P(\text{one event in } dt) = \lambda\,dt$; the waiting time between events is then exponential with mean $1/\lambda$, and the count in any interval of length $T$ is $\mathrm{Poi}(\lambda T)$. Superposition and thinning of Poisson processes are again Poisson.

## Derivation

1. Split the interval into $n$ tiny slots, each with success chance $\lambda/n$.
2. Let the slots become infinitely fine.
3. The binomial has become the Poisson.

## Real world

### Call centres and web servers
Arrivals per minute are Poisson — the model used to decide how many staff or servers are needed.

### Radioactive decay
Clicks of a Geiger counter per second follow a Poisson distribution with λ set by the sample’s activity.

### Typos, defects, potholes
Errors per page, flaws per metre of cable, potholes per kilometre: rare, independent, at a steady rate.

### Historical data
Bortkiewicz (1898) showed that deaths by horse-kick in Prussian cavalry corps followed Poisson almost perfectly.
