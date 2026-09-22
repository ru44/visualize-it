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

## Intuition

Drag p and watch three shares add up to the whole population: $p^2$ (AA), $2pq$ (Aa) and $q^2$ (aa). At $p=0.5$ heterozygotes are the largest group, at 50% — not because heterozygosity is “favoured”, just because there are two ways to be Aa (one allele from each parent) and only one way to be AA or aa.

Push p toward 0 or 1 and heterozygotes vanish along with one of the homozygote classes — a nearly fixed allele leaves almost no one carrying the other version. This is a snapshot with no selection, mutation, drift or migration at work: any real population’s genotype frequencies are compared against this baseline to detect whether evolution is happening.

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
