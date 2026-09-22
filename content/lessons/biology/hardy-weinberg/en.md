---
title: Hardy–Weinberg equilibrium
summary: >-
  From one allele frequency, genotype frequencies follow automatically — if
  mating is random and nothing is pushing evolution.
parameters:
  x: p — frequency of allele A
variables:
  - frequency of allele A in the population
  - frequency of the alternative allele a
  - frequency of AA homozygotes
  - frequency of Aa heterozygotes
  - frequency of aa homozygotes
charts:
  - title: Homozygote frequencies against allele frequency
    xLabel: p — frequency of allele A
    yLabel: genotype frequency
    series:
      - p² — AA homozygotes
      - q² — aa homozygotes
---

## Try it

1. Drag $p$ toward 0.5 and watch the "one of each" group (Aa) become the largest share.
2. Drag $p$ close to 1. The "two A" group takes over almost the whole population.
3. Drag $p$ close to 0. The "two a" group takes over instead.

## Real-life examples

- **A common allele near fixation.** In a population where 98% of copies are the common version ($p = 0.98$), almost everyone carries two copies of it, and only a small share carry any of the rare version.
- **Two equally common versions.** With the two versions exactly balanced ($p = 0.5$), the "one of each" group is as large as it can possibly get: half the population.
- **A malaria-resistance allele in a high-risk region.** Where a protective variant makes up 80% of copies ($p = 0.8$), the rarer version still shows up in a meaningful slice of the population, both alone and paired up.

## Test yourself

1. Find $p$ where the "two A" group makes up 49% of the population.
2. Find $p$ where the "one of each" group is as large as it can possibly be.
3. Push the rare "two a" group below 1% of the population.

## Intuition

Imagine a gene with two versions, A and a, and you know only one number: the share of A copies in the population, called $p$. Drag the slider for $p$ and watch three groups appear below it: people with two A copies, people with one of each, and people with two a copies. At $p = 0.5$ the one-of-each group is the largest, holding half the population. That is not because mixing is somehow favoured. It is simple counting: there are two ways to end up with one of each (an A from your mother and an a from your father, or the reverse), but only one way to get two of the same letter.

Push $p$ toward 0 or toward 1 and the one-of-each group shrinks away, along with one of the two-of-a-kind groups — when almost everyone carries the same letter, almost nobody is left carrying the other one. This snapshot assumes nothing is pushing evolution: no selection favouring one letter, no new mutations, no small-population luck, no newcomers moving in. Real biologists compare an actual population's numbers against this baseline; a mismatch is a signal that something is disturbing that calm picture.

## Formal

With random mating and allele frequencies $p$ and $q=1-p$, genotype frequencies are $p^2$ (AA), $2pq$ (Aa) and $q^2$ (aa), summing to $(p+q)^2=1$.

These frequencies stay constant generation after generation provided mating is random and there is no selection, mutation, migration or genetic drift.

## Advanced

Deviations from Hardy–Weinberg proportions (measured, e.g., by the fixation index $F = 1 - H_{obs}/H_{exp}$ comparing observed to expected heterozygosity) are a standard diagnostic in population genetics for detecting inbreeding, assortative mating, selection or population structure — the equilibrium is useful precisely because it is the null hypothesis to test against.

## Derivation

1. Random mating pairs alleles independently, like flipping two coins each with probability $p$ of A.
2. A homozygote needs the same allele from both parents — multiply the independent probabilities.
3. A heterozygote can arise two ways (A from mother and a from father, or the reverse), so double the product.

## Real world

### Screening for recessive disease
Knowing the frequency of carriers (2pq) of a recessive disease allele from the frequency of affected individuals (q²) guides genetic counselling.

### Detecting selection
A population whose genotype counts drift from Hardy–Weinberg proportions is a signal that something — selection, non-random mating, drift — is acting.

### Conservation genetics
Small, isolated populations often show heterozygote deficits relative to Hardy–Weinberg due to inbreeding, a key conservation warning sign.

### Blood types
ABO blood group frequencies in a population are classic examples used to teach Hardy–Weinberg calculations.
