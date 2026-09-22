---
title: Reaction rate and the Arrhenius equation
summary: >-
  For a first-order reaction, concentration decays exponentially with a rate
  constant $k$ that is itself exponentially sensitive to temperature — which is
  why a small temperature rise can dramatically speed a reaction up.
parameters:
  A0: 'initial concentration [A]₀'
  Af: pre-exponential factor Aƒ
  Ea: activation energy Ea
  T: temperature T
  x: time t
variables:
  - concentration of the reactant at time t
  - 'rate constant, set by temperature via the Arrhenius equation'
  - activation energy — the energy barrier molecules must clear to react
  - >-
    pre-exponential (frequency) factor — how often molecules collide with the
    right orientation
charts:
  - title: Rate constant k rises steeply with temperature
    xLabel: T (K)
    yLabel: k (1/s)
    series:
      - k = Af·exp(−Ea/RT)
---

## Intuition

Drag the time point x along the curve: the tangent line is the instantaneous rate, steep and fast right at the start when there is a lot of reactant, flattening out as [A] is used up — the rate is always proportional to how much is left, the same feedback pattern as radioactive decay.

Now drag temperature T upward instead. The whole curve collapses toward zero much faster, even though T only moved a little — because T sits inside a nested exponential in the Arrhenius equation, a modest temperature rise multiplies k, and hence the rate, by a large factor. That extreme sensitivity is why a 10°C rise can roughly double many everyday reaction rates.

## Formal

A first-order rate law $\dfrac{d[\mathrm{A}]}{dt} = -k[\mathrm{A}]$ integrates to $[\mathrm{A}] = [\mathrm{A}]_0 e^{-kt}$, the same differential equation as exponential decay.

The Arrhenius equation $k = A_f e^{-E_a/RT}$ says only the fraction of molecular collisions with kinetic energy at least $E_a$ contribute to reaction — that fraction is set by the Boltzmann distribution, and it grows sharply with $T$.

## Advanced

A catalyst provides an alternative reaction pathway with a lower $E_a$ without being consumed itself; because $k$ depends exponentially on $E_a$, even a modest reduction in activation energy produces a large increase in rate — this is why enzymes, with active sites that stabilise the transition state, can accelerate biochemical reactions by many orders of magnitude.

## Derivation

1. First-order rate law: the rate is proportional to how much reactant remains.
2. Separate variables and integrate, exactly as for exponential decay.
3. Exponentiate; substitute the Arrhenius form for how $k$ depends on temperature.

## Real world

### Cooking
Heat speeds up the Maillard browning reactions in food — higher T means dramatically larger k.

### Refrigeration
Cooling food slows the reactions and microbial growth that cause spoilage by shrinking k.

### Industrial catalysts
The Haber process for ammonia uses an iron catalyst to lower $E_a$ enough to be commercially viable at moderate temperature.

### Enzymes in the body
Body-temperature reactions that would otherwise be far too slow to sustain life proceed quickly because enzymes lower the activation energy.
