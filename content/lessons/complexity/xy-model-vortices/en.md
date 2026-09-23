---
title: 'XY model: vortices that pair up and break free'
summary: Arrows free to point anywhere on a circle mostly line up with their neighbours, except where the grid winds a full turn around a point — a vortex, which stays paired with an opposite twin until the grid gets warm enough to tear the pair apart.
parameters:
  temperature: temperature
  step: sweep
variables:
  - how strongly an arrow wants to match its neighbours' angle
  - the angle an arrow points, measured around a full circle
charts: []
---

## Try it

1. Watch the grid of arrows. Each one only compares its angle with its four neighbours, the same rule as a magnet's spins but now with a full circle of directions instead of just up or down.
2. Drag "sweep" forward while "temperature" is low, around 0.5. Nearly every arrow points the same way, with only the rare tightly-wound pair of dots.
3. Raise "temperature" past about 0.9 and sweep again. Coloured dots — vortices — spread across the grid and drift apart on their own.

## Real-life examples

1. **A cold superfluid film.** Well below the transition, nearby arrows line up and any vortex stays tightly paired with an opposite one, unable to wander.
2. **Right at the Kosterlitz–Thouless temperature.** Kosterlitz and Thouless identified this exact temperature in 1973: bound vortex pairs start tearing apart.
3. **A warm film, full of loose vortices.** Vortices roam freely across the grid and the arrows lose any shared direction.

## Test yourself

1. Cool below temperature 0.6 and sweep to at least 100. Vortex pairs should stay bound and rare.
2. Heat above 1.3 and sweep to at least 80. Vortices should spread out and drift apart.
3. Set the temperature close to 0.89, the Kosterlitz–Thouless point, and sweep to 150. Watch pairs form and occasionally break.

## Intuition

Picture a field of tiny compass needles free to point anywhere around a circle, not just up or down. Each needle would rather point the same way as its four neighbours, so a cold grid settles into a smooth, gently swirling field with barely a ripple. Once in a while the arrows wind one full turn around a single point — a vortex — and its opposite twin sits nearby, the two locked together like a pair of ice-skaters holding hands.

Warm the grid and those skater pairs start to let go. Past one particular temperature, thermal jostling gives a vortex enough of a nudge to break free from its partner and wander off alone, joined by others doing the same. The grid never freezes fully solid the way the Ising magnet does, since arrows only ever line up over a limited patch, yet something sharp still happens: bound pairs give way to free vortices, a transition with no single obvious "on or off" switch, discovered by Kosterlitz and Thouless.

## Formal

The grid has energy $E = -J \sum_{\text{neighbours}} \cos(\theta_i - \theta_j)$, favouring neighbouring arrows that share nearly the same angle $\theta_i$. Around any small loop of four sites, the angle differences add up to $n = \frac{1}{2\pi}\sum_{\text{loop}} \Delta\theta$, an integer that marks a vortex when $n = \pm 1$.

The simulation updates one arrow at a time with the Metropolis rule: propose a new angle, compute the energy of that one site $E_i = -J \sum_{\text{neighbours}} \cos(\theta_i - \theta_j)$, and accept the turn with probability $P(\text{turn}) = \min\left(1, e^{-\Delta E / T}\right)$ — the same rule as the Ising model, but on a continuous circle instead of two choices.

## Advanced

The Kosterlitz–Thouless transition has no local order parameter the way magnetization marks the Ising transition: correlations decay as a power law below the transition and exponentially above it, a distinction that only topology can draw. The transition is driven entirely by vortex-antivortex pairs unbinding, and a renormalization-group argument gives the square-lattice XY model a transition near $T_{\text{BKT}} \approx 0.893\,J/k_B$, close to where this grid's vortices start spreading.

## Derivation

1. The energy of one arrow only depends on the angle it makes with each of its four neighbours.
2. The Metropolis rule accepts a lower-energy turn outright, and accepts an energy-raising turn only with a probability that shrinks as temperature falls, the same rule as before but applied to a continuous angle.
3. Walking the four angle differences around a small loop and dividing by a full turn counts how many times the arrows wind around that point: zero almost everywhere, plus or minus one at a vortex.

## Real world

### Thin superfluid helium films
Kosterlitz and Thouless first explained why a thin film of helium-4 loses its frictionless flow gradually rather than at one sharp point, by tracking exactly these vortex pairs.

### Superconducting films
Very thin superconductors lose their zero resistance the same way, as thermally freed vortices start dragging on the current.

### Two-dimensional magnets
Real magnetic materials thin enough to behave two-dimensionally show this same vortex unbinding instead of a sharp Ising-style transition.

### The 2016 Nobel Prize in Physics
Kosterlitz, Thouless and Haldane shared the prize for explaining phase transitions built from the topology of a field rather than from one obvious order parameter.
