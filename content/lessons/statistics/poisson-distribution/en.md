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

## Try it

1. Watch the bars: each shows the chance of exactly that many events happening in one interval.
2. Drag «λ — average number per interval» down toward 0.5. Most intervals now show zero events.
3. Drag «λ — average number per interval» up toward 20. The bars smooth into a symmetric bell around λ.

## Real-life examples

1. **Call centre.** A call centre gets 3 calls a minute on average; the chart shows the chance a given minute brings exactly 2 calls.
2. **Radioactive decay.** A Geiger counter clicks 8 times a second on average; the chart shows the chance of exactly 5 clicks in one second.
3. **Typos per page.** A manuscript averages 0.8 typos per page; the chart shows the chance a given page has zero typos at all.

## Test yourself

1. Find «λ — average number per interval» and «k — number of events» where that exact count has about a 20% chance.
2. With a low average rate (under 1), find a count with more than a 50% chance of happening.
3. With a high average rate (above 15), find a count within 1 of the average that still has more than a 5% chance.

## Intuition

A call centre gets 3 calls a minute on average, «λ — average number per interval» = 3. Some minutes bring none, some bring six. The bars on screen show how the counts spread: drag «k — number of events» to 2 and read that exactly 2 calls has probability $9e^{-3}/2 \approx 0.224$. Zero calls still happens 5% of the time.

Slide «λ — average number per interval» down to 0.5 and the bars pile up at zero — most intervals are empty. Slide it to 20 and the bars form a symmetric bell with spread about 4.5: for a Poisson count the variance equals the mean, so counts near λ plus or minus its square root are typical.

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
