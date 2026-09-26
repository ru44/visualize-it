---
title: How DNA mutations add up
summary: >-
  Copying DNA makes a mistake only rarely, but multiply a tiny error rate by
  thousands of bases and hundreds of generations and the differences pile up
  fast enough to date when two species split, or explain why flu shots change
  every year.
parameters:
  N: sequence length N
  mu: mutation rate μ (× 10⁻⁶ per base per generation)
  g: generations g
variables:
  - expected number of bases that have changed after g generations
  - sequence length — how many bases are copied each generation
  - mutation rate — the chance any one base is copied wrong, per generation
  - number of generations, or rounds of copying
---

## Try it

1. Start with a slow, human-like rate and only a handful of generations — almost nothing changes.
2. Push generations up toward 1000, keeping the rate low, and watch differences slowly accumulate one red box at a time.
3. Switch to a fast, virus-like rate. Watch the strip fill with red boxes and the line shoot up almost immediately.

## Real-life examples

1. **A human gene copied across 10 generations.** At about one mistake per hundred million bases, essentially nothing changes — human DNA is copied with extraordinary care.
2. **E. coli evolving in the lab for 1000 generations.** A real experiment (Lenski's, still running after tens of thousands of generations): bacteria mutate faster and divide fast enough for real change to show up in a lab timescale.
3. **A flu gene segment over one flu season, about 50 replication cycles.** Influenza's copying machinery makes far more mistakes per copy — new variants appear within a single season, which is why flu vaccines are updated every year.

## Test yourself

1. Reach exactly 50 expected mutated bases.
2. Set up a fast-mutating, long-running scenario: rate at least 50, and at least 20 generations.
3. Get exactly 1% of the sequence to have changed.

## Intuition

Think of copying DNA like an extremely careful photocopier: it almost never smudges a letter, but run it over and over, thousands of letters at a time, and a few smudges are bound to show up. Each round of copying a sequence of $N$ bases with a per-base mistake chance $\mu$ introduces about $N\mu$ new differences from the original — tiny for a careful copier, but not zero.

Run that same copying machine for $g$ generations in a row, and the differences from a common ancestor add up almost in a straight line, giving about $N\mu g$ accumulated changes — as long as $\mu g$ stays small, so the same base is unlikely to get hit twice. A virus with a sloppier copying machine, or many more generations packed into the same season, can rack up in weeks what a careful, slowly-reproducing species takes millions of years to accumulate.

## Formal

The expected number of accumulated differences after $g$ generations is $E \approx N\mu g$, and the fraction of the sequence that has changed is $E/N = \mu g$ — independent of the sequence length, since a longer sequence gathers proportionally more mistakes but the fraction affected is the same.

This is the working principle behind the molecular clock: with $\mu$ measured in the lab and the accumulated difference $E$ measured by comparing two sequences, $g \approx E/(N\mu)$ estimates how many generations of copying separate them.

## Advanced

The linear approximation $E \approx N\mu g$ breaks down once $\mu g$ is no longer small, because a base that has already mutated can mutate again — sometimes back to the original letter, sometimes to a third one — so the true fraction changed rises a little slower than a straight line predicts at high $\mu g$. Real molecular-clock methods correct for this, but the straight-line version is accurate enough for the careful, slow-mutating genes it is normally used on.

## Derivation

1. Copying a sequence of $N$ bases with a per-base mistake chance $\mu$ introduces about $N\mu$ new mistakes in one round.
2. After $g$ independent rounds of copying, the expected total is $E \approx N\mu g$, valid while $\mu g$ stays small.
3. Dividing by $N$, the fraction of bases changed is $E/N = \mu g$ — the same "molecular clock" biologists read time off of.

## Real world

### Dating when species split
Comparing the same gene in two species and counting the differences, then dividing by a measured mutation rate, gives a rough date for their last common ancestor — the molecular clock.

### Antibiotic resistance evolving
Bacteria dividing fast, with mutations happening on every copy, occasionally produce a mutation that survives an antibiotic — which then multiplies while its non-resistant neighbours die.

### Flu shots updated every year
Influenza's error-prone copying machinery lets new variants appear within months, fast enough that last year's vaccine often no longer matches this year's circulating strains.

### Cancer building up over a lifetime
Most cancers need several specific mutations in the same cell line before they turn dangerous — a slow accumulation over decades of ordinary cell division, which is one reason cancer risk climbs sharply with age.
