---
title: Entropy and the limits of heat engines
summary: >-
  A car engine turns only about a third of its fuel's heat into motion; the
  rest is wasted as exhaust heat no matter how well the engine is built, and
  this lesson shows the hard limit no engine can beat.
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

## Try it

1. Drag the hot-reservoir point x to the right. Watch the efficiency climb but bend under the line at 1.
2. Raise the slider "cold reservoir Tc". Watch the whole curve drop.
3. Read the efficiency value where the curve sits — no engine between these two temperatures can beat it.

## Real-life examples

1. **A coal power plant.** Steam near 800 K driving turbines that reject heat to river water around 300 K sets a Carnot ceiling of about 63% — real plants fall well short of even that.
2. **A car engine.** Combustion gases near 650 K, exhausting into air around 320 K, cap the theoretical efficiency at about 51% — real engines manage only a fraction of that due to friction and losses.
3. **A low-temperature geothermal plant.** With a modest source at 450 K and a cold side at 290 K, the Carnot ceiling drops to about 36%, which is why geothermal plants are less efficient than coal or gas plants.

## Test yourself

1. Get the Carnot efficiency to exactly 50%.
2. Push the efficiency above 60% while keeping a realistic cold reservoir (Tc at least 280 K).
3. Using the lowest possible cold-reservoir temperature (250 K), reach an efficiency of at least 55%.

## Intuition

A typical car engine converts only around 30% of the heat released by burning fuel into motion — the rest escapes as hot exhaust and warm metal, and no amount of clever engineering can push a heat engine to 100%, even in principle. The picture on screen shows this limit directly: drag the hot-reservoir point, labelled $x$ in kelvin (try 800, like hot steam in a power plant), and watch the efficiency curve climb but visibly bend over, always staying under the horizontal line at 1.

No matter how hot you make the source, some heat is required by the laws of physics to flow, unused, to the cold side. Raise the slider "cold reservoir Tc" instead — say from 300 to 340 kelvin, close to a river used for cooling — and the whole curve drops: a smaller gap between hot and cold means less available work for every unit of heat burned. Engines are fundamentally about that gap, not about either temperature alone.

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
