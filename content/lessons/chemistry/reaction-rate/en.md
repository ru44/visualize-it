---
title: Reaction rate and the Arrhenius equation
summary: >-
  A small rise in temperature, just a few degrees, can make food spoil or a
  chemical reaction run dramatically faster — this lesson shows why heat has
  such an outsized effect on speed.
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

## Try it

1. Drag the time point «t» along the curve. Watch the tangent line show the instantaneous rate, steepest at the start.
2. Raise «temperature T». The whole curve collapses toward zero much faster.
3. Raise «activation energy Ea» instead. The reaction slows down even at the same temperature.

## Real-life examples

1. **Food spoiling on the counter.** At room temperature (about 20°C, 293 K) the spoilage reaction runs at a noticeable pace.
2. **The same food in the fridge.** Cooling to about 4°C (277 K) slows the rate constant enough to keep food fresh for days longer.
3. **A pot kept at a gentle simmer.** Heating to nearly 100°C (370 K) speeds the same kind of reaction up dramatically — the basis of cooking.

## Test yourself

1. Raise the temperature (or lower the activation energy) until the rate constant exceeds 1 per second.
2. With the pre-exponential factor at its default value, find an activation energy and temperature that give a rate constant of exactly 0.05 per second.
3. Push the rate constant below one millionth per second — a reaction that has essentially stopped.

## Intuition

Picture a pot of hot soup left on the counter: it cools quickly at first, then more and more slowly as it nears room temperature — the same shape a reacting chemical follows. On screen, drag the time point «t» along the curve: the tangent line shows the instantaneous rate, steep at the start when a lot of reactant is present, flattening as it gets used up.

Now drag «temperature T» upward instead. The whole curve collapses toward zero much faster, even though T only moved a little, because T sits inside a nested exponential in the Arrhenius equation. A modest temperature rise multiplies the rate constant k by a large factor — which is why a 10°C rise can roughly double many everyday reaction rates.

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
