---
title: Radioactive dating
summary: >-
  Every half-life, exactly half of what is left decays. That steady,
  predictable halving is what lets a scrap of bone or charcoal reveal its age.
parameters:
  N0: starting amount
  T: half-life
  x: years elapsed
variables:
  - the starting amount of the radioactive isotope
  - the half-life — the time for half of any sample to decay
  - the elapsed time, in years
  - the number of half-lives that have elapsed
  - the amount remaining after time x
charts:
  - title: Fraction remaining
    xLabel: years
    yLabel: fraction of N₀
    series:
      - fraction remaining
---

## Try it

1. Drag time forward from zero. Watch the curve drop fastest at the start, then slow down.
2. Watch the curve reach half its starting height at exactly one half-life.
3. Drag the half-life slider instead. Watch the whole curve stretch or compress in time.

## Real-life examples

- **A fresh bone sample.** Starting from 500 atoms of carbon-14 (N₀ = 500, half-life 5730 years), only 1000 years in (x = 1000), most of the isotope is still there.
- **A bone about one half-life old.** Starting from 200 atoms with the same half-life, after 5700 years roughly half the carbon-14 has decayed away.
- **A much older sample, a different isotope.** Starting from 100 atoms of an isotope with a shorter half-life (T = 1000), after 8000 years — eight half-lives — only a tiny trace remains.

## Test yourself

1. Find the time at which exactly half the sample remains — one half-life.
2. Wait long enough that under 5% of the sample remains.
3. Get the remaining amount down to exactly 25 atoms.

## Intuition

Drag time forward from zero and watch the tangent line's slope — the decay rate — get shallower as the curve drops: decay is fastest when there is the most material left, and it slows as less remains, never quite reaching zero. At exactly one half-life the curve has dropped to half its starting height, at two half-lives to a quarter, at three to an eighth.

Drag the half-life slider instead and watch the whole curve stretch or compress in time: a longer half-life means a slower-decaying, longer-lived isotope, while a short half-life burns through its sample quickly. Carbon-14's half-life of 5,730 years is what makes it useful for dating anything from a few hundred to about 50,000 years old.

## Formal

After $k$ half-lives, the amount remaining has been cut in half $k$ times: $N = N_0\left(\frac{1}{2}\right)^{k}$. Since each half-life takes $T_{1/2}$ years, the number of half-lives elapsed after $x$ years is $k = \frac{x}{T_{1/2}}$, giving $N = N_0\left(\frac{1}{2}\right)^{x/T_{1/2}}$.

Measuring the remaining fraction $N/N_0$ in a sample and solving this equation for $x$ (using a logarithm) is exactly how an age is read off a decay measurement.

## Advanced

The same law can be written as continuous exponential decay, $N = N_0 e^{-\lambda x}$, with decay constant $\lambda = \ln 2 / T_{1/2}$; the two forms are equivalent, just different bases for the same exponential. Radiocarbon dating additionally assumes the atmosphere's carbon-14 fraction has stayed roughly constant over time, which is only approximately true — calibration curves built from tree rings and other independently dated records correct for the small historical wobbles.

## Derivation

1. Each half-life cuts the remaining amount exactly in half, so after $k$ half-lives it has been halved $k$ times.
2. The number of half-lives elapsed in a given time is just that time divided by the length of one half-life.
3. Substituting turns the count of half-lives into elapsed years, giving the amount remaining as a function of time.

## Real world

### Carbon-14 dating of organic material
Archaeologists date bone, wood and charcoal by measuring the remaining fraction of carbon-14, useful out to roughly ten half-lives, about 50,000 years.

### Uranium-lead dating of rocks
Much longer-lived isotopes like uranium-238 (half-life 4.5 billion years) date rocks and meteorites, including estimates of Earth's own age.

### Medical imaging and treatment
Short-lived isotopes like technetium-99m (half-life about 6 hours) are chosen deliberately so they decay away quickly after a scan.

### Nuclear waste storage
Storage timelines are planned around how many half-lives it takes for radioactivity to fall to a safe level, sometimes tens of thousands of years for the longest-lived byproducts.
