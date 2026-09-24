---
title: Radioactive decay
summary: Two hundred iodine-131 atoms, a half-life of about eight days — no one can say which atom decays next, yet wait one half-life and close to a hundred are gone, wait two and only about fifty remain. Randomness, one atom at a time, adds up to a law.
parameters:
  halfLife: half-life
  time: time (in half-lives)
  N0: how many atoms to start with
variables:
  - 'how many atoms you start with'
  - 'the half-life: the time for half of any surviving atoms to decay'
  - 'how much real time has passed since the start'
  - 'how many half-lives have passed, t divided by T_{1/2} — this is exactly what the "time" slider drags'
  - 'how many atoms are still undecayed after that time'
charts: []
---

## Try it

1. Watch the grid of atoms. Each one starts lit; drag "time" forward and, one by one, at unpredictable moments, they flip dark — decayed.
2. Watch the curve beside the grid. However jagged the actual count looks, it tracks the smooth curve N₀·(1/2)^k drawn behind it.
3. Raise "how many atoms" into the hundreds. The random flips still happen one at a time, but the counted total now hugs the smooth curve far more tightly.

## Real-life examples

1. **Iodine-131 in medicine.** Half-life about 8.02 days; starting from 200 atoms, after 3 half-lives (about 24 days) only around an eighth are left — why a patient's radioactive dose fades within weeks of treatment.
2. **Carbon-14 in a bone.** Half-life 5730 years; starting from 150 atoms, after 1.5 half-lives (about 8600 years) a little over a third remain — roughly what an archaeologist would measure in a mid-sized sample.
3. **Uranium-238 in a rock.** Half-life 4.47 billion years; starting from 100 atoms, after 1 half-life (about 4.47 billion years, close to Earth's own age) almost exactly half remain.

## Test yourself

1. Run "time" forward to exactly 1 half-life.
2. Run "time" forward until fewer than 5% of the atoms remain.
3. Set the half-life to carbon-14's, then run "time" forward to exactly 2 half-lives.

## Intuition

Every single atom in the grid decays at a moment nobody can predict — it is as random as a coin flip, and no measurement of that atom, not its age, not its history, narrows down when its flip will land. Iodine-131 is exactly this unpredictable: any one atom might decay in the next second or sit unchanged for a month. What is entirely predictable is the group: give any surviving iodine-131 atom its full 8.02-day half-life and it has exactly a 50% chance of still being whole at the end of it, no more and no less, no matter how long it has already lasted.

That fixed 50%-per-half-life rule is why the jagged, random-looking grid on screen still tracks a smooth curve. Start "how many atoms" small, at a few dozen, and the count of survivors visibly zig-zags around the curve — a run of bad luck can decay a few extra atoms early, or a few late. Push "how many atoms" up into the hundreds and the zig-zags shrink to almost nothing, because the ups and downs of hundreds of individually random flips average out. It is the same law of large numbers that makes a casino's nightly profit predictable even though no single spin of the wheel is.

## Formal

Each surviving atom has the same probability of decaying in any fixed interval, which forces the population to shrink by a constant fraction every half-life: after k half-lives, a fraction $\left(\frac12\right)^k$ of the original count remains, so $N = N_0\left(\frac12\right)^{k}$.

Since each half-life takes $T_{1/2}$ of real time, k half-lives take $k T_{1/2}$, so $k = t/T_{1/2}$ and $N = N_0\left(\frac12\right)^{t/T_{1/2}}$. The "time" slider here drags k directly, in half-lives, while "half-life" sets how long one $T_{1/2}$ really lasts, in days or years.

## Advanced

The same law is often written as continuous exponential decay, $N = N_0 e^{-\lambda t}$, with decay constant $\lambda = \ln 2 / T_{1/2}$, the instantaneous per-atom decay probability per unit time. Because each atom's decay is an independent random event, the exact number of survivors after a given time follows a binomial distribution built from $N_0$ independent coin flips; its spread around the smooth curve shrinks in proportion to $1/\sqrt{N_0}$, which is exactly the smoothing this lesson's grid shows as "how many atoms" grows.

## Derivation

1. Every surviving atom has the same fixed chance of decaying in any one half-life, so after k half-lives the surviving fraction has been multiplied by one-half, k times over.
2. The number of half-lives that fit into an elapsed time t is just that time divided by how long one half-life lasts.
3. Substituting turns the half-life count into elapsed time directly, giving the amount remaining as a function of t.

## Real world

### Iodine-131 in medicine
Doctors use iodine-131's short, 8-day half-life deliberately: it stays active long enough to image or treat the thyroid, then decays away to negligible levels within weeks, limiting a patient's long-term exposure.

### Carbon-14 dating
Archaeologists measure the fraction of carbon-14 left in bone, wood, or charcoal to date organic material out to roughly ten half-lives, about 50,000 years.

### Uranium-238 and the age of the Earth
Uranium-238's 4.47-billion-year half-life is close to Earth's own age, which is exactly why the ratio of uranium to its decay product, lead, in ancient rocks is one of the main ways geologists have dated the planet.

### Background radiation
A person absorbs an estimated average of about 2.4 millisieverts of radiation a year from natural sources; roughly half of that comes from the random, atom-by-atom decay of naturally radioactive isotopes such as potassium-40 and radon gas in soil, air, and food — the same process this lesson simulates, just with vastly more atoms.
