---
title: Entropy and the limits of heat engines
summary: >-
  No engine can turn all its heat into work — the second law caps every heat
  engine’s efficiency below 100%, and that cap depends only on the hot and cold
  reservoir temperatures.
parameters:
  Tc: cold reservoir Tc
  x: hot reservoir Th
variables:
  - absolute temperature of the hot and cold reservoirs
  - efficiency — the fraction of heat input converted into useful work
  - >-
    entropy — roughly, the number of equivalent microscopic ways energy can be
    arranged
charts:
  - title: Efficiency for several cold-reservoir temperatures
    xLabel: Th (K)
    yLabel: η
    series:
      - Tc = 250 K
      - Tc = 300 K
      - Tc = 350 K
---

## Intuition

Drag the hot-reservoir point x to the right: efficiency climbs but visibly bends over, always staying under the horizontal line at 1 — no matter how hot you make the source, some of the heat is thermodynamically required to flow to the cold side unused. The tangent line’s shrinking slope shows the diminishing return of pushing Th higher and higher.

Raise Tc instead and the whole curve drops — a smaller temperature gap between hot and cold means less available work per unit of heat. Engines are fundamentally about that gap, not about either temperature alone; a “hot” engine exhausting into an equally hot environment does no better than a cool one exhausting into the cold.

## Formal

The second law forbids any engine operating between two reservoirs from exceeding the Carnot efficiency $\eta_{\text{Carnot}} = 1 - T_c/T_h$, achieved only by a reversible cycle.

Equivalently, no process can decrease the total entropy of an isolated system: $\Delta S_{\text{total}} \ge 0$, with equality only for reversible processes — real engines always generate some entropy and so fall short of the Carnot bound.

## Advanced

Entropy can be understood statistically as $S = k_B\ln\Omega$, where $\Omega$ is the number of microscopic arrangements consistent with the observed macroscopic state; the second law is then simply the statement that isolated systems evolve toward their overwhelmingly more probable, higher-$\Omega$ configurations, which is why heat spontaneously flows from hot to cold and not the reverse.

## Derivation

1. Efficiency is useful work out divided by heat drawn from the hot reservoir.
2. For a reversible (Carnot) cycle, heat exchanged is proportional to reservoir temperature.
3. Substitute; this is the maximum efficiency any engine can achieve between $T_h$ and $T_c$.

## Real world

### Power plants
Steam turbines are built to run at the highest practical Th and lowest practical Tc precisely to push efficiency toward the Carnot limit.

### Car engines
Real combustion engines achieve well under 40% efficiency — friction, heat loss, and irreversibility all add entropy beyond the Carnot minimum.

### Refrigerators and heat pumps
Running the same cycle in reverse moves heat from cold to hot using work — bounded by the same Tc/Th ratio, now expressed as a coefficient of performance.

### Why perpetual motion fails
A “free energy” machine claiming 100% conversion of heat to work at any finite temperature gap violates the second law, which is why every such device in history has failed.
