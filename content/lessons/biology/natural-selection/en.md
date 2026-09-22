---
title: Natural selection and allele frequency
summary: >-
  A gene variant with even a small survival edge spreads through a population —
  slowly at first, then fast, then slowly again as it takes over.
parameters:
  s: s — selection coefficient
  p0: p₀ — starting allele frequency
  tView: time marker
variables:
  - 'frequency of the favoured allele in the population, between 0 and 1'
  - >-
    selection coefficient — the fitness advantage (s>0) or disadvantage (s<0) of
    carrying the allele
  - starting allele frequency
---

## Try it

1. Start p0 near 0.05 — a rare new mutation — and watch the curve barely move.
2. Raise s well above zero. The curve climbs faster, but keeps its same S shape.
3. Make s negative instead. The curve now falls toward zero: the allele is being weeded out.

## Real-life examples

- **Peppered moths turning dark.** A strong advantage against bird predation (s = 0.3) lets a rare dark-colour mutation (p0 = 0.05) spread rapidly through a sooty, polluted woodland.
- **Antibiotic resistance emerging.** A single resistant bacterium in a huge population (p0 = 0.01) with a solid survival edge (s = 0.2) under constant antibiotic exposure can take over within days.
- **A harmful allele in decline.** Starting from half the population (p0 = 0.5), a mildly disadvantageous allele (s = −0.15) gets weeded out generation after generation.

## Test yourself

1. Start from a rare allele, below 5% of the population, and give it a strong advantage above s = 0.25.
2. Make a harmful allele decline: set s below zero while starting from more than half the population.
3. Find the point where change is fastest: start right at p0 = 0.5.

## Intuition

Start p0 very low, like 0.05 — a rare new variant. At first the curve barely rises: with so few copies around, $p(1-p) \approx p$ is tiny, and progress is slow no matter how useful the allele is. Watch it cross the middle, though, and the curve steepens sharply. That happens exactly where $p(1-p)$ is largest, when the allele's frequency sits at 0.5.

Raise the selection coefficient, s — the size of the allele's survival advantage — and the whole climb speeds up without changing its S shape. Make s negative instead and the curve now falls toward zero: a harmful allele gets weeded out by the same logic in reverse. This is exactly the logistic curve from population growth, but now tracking a share of the gene pool instead of a headcount — the allele competes against its alternative for a fixed 100%.

## Formal

$\dfrac{dp}{dt}=sp(1-p)$ has equilibria at $p=0$ and $p=1$ (fixation or loss); for $s>0$, $p=1$ is stable and $p=0$ is unstable.

The solution $p(t) = \dfrac{p_0 e^{st}}{1-p_0+p_0e^{st}}$ is the logistic curve in $p$, reaching $p\to 1$ as $t\to\infty$ whenever $s>0$.

## Advanced

Real selection also depends on dominance: a recessive beneficial allele (only helpful in double copy) spreads far more slowly near $p=0$ than this haploid model suggests, because it is “hidden” from selection inside heterozygotes — one reason rare beneficial recessive mutations can linger at low frequency for many generations before fixation accelerates.

## Derivation

1. The rate depends on how many carriers ($p$) can meet non-carriers ($1-p$) for the advantage to matter — competition between the two types.
2. Multiply by the selection coefficient $s$: this is the same equation as logistic growth, with $p$ replacing $P/K$.
3. Solving (same method as the logistic equation) gives an S-curve that saturates at $p=1$.

## Real world

### Peppered moths
Dark moths spread rapidly in polluted 19th-century England (s>0 against bird predation on soot-darkened trees), then receded once air quality improved.

### Antibiotic resistance
A resistance allele with even a small s spreads through a bacterial population within days under constant antibiotic exposure.

### Pesticide resistance
Insect populations exposed to a pesticide show textbook S-curve rises in the resistant allele’s frequency over successive generations.

### Lactase persistence
The allele letting adults digest milk spread through pastoral populations over thousands of years as dairying spread.
