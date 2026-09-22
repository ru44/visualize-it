---
title: Dynamic equilibrium
summary: >-
  Most real reactions don't run to completion — they settle into a lasting
  balance, and this lesson shows where that balance ends up and how to shift
  it.
parameters:
  A0: 'initial [A]₀'
  kf: forward rate constant kƒ
  kr: reverse rate constant kᵣ
  x: time t
variables:
  - concentrations of reactant and product
  - forward and reverse rate constants
  - >-
    equilibrium constant, $K = k_f/k_r$, the equilibrium ratio
    $[\mathrm{B}]/[\mathrm{A}]$
charts:
  - title: '[A] falls while [B] rises, both levelling off at equilibrium'
    xLabel: t (s)
    yLabel: concentration (mol/L)
    series:
      - '[A]'
      - '[B] = A0 − [A]'
---

## Try it

1. Drag the time point «t» along the curve. Watch [A] fall and [B] rise, both flattening out — but not to zero.
2. Raise «forward rate constant kf». The plateau shifts lower: equilibrium now favours B more.
3. Raise «reverse rate constant kr» instead. The plateau shifts higher: equilibrium now favours A more.

## Real-life examples

1. **The Haber process making ammonia.** With kf much larger than kr (0.8 vs 0.1 per second), the forward reaction wins and most of the starting material converts to product before the rates balance.
2. **Oxygen binding to haemoglobin in blood.** Forward and reverse rates are close (0.5 and 0.5 per second), so oxygen is picked up and released at nearly matched rates — a true, finely poised equilibrium.
3. **Carbon dioxide escaping from an opened soda bottle.** With kr far larger than kf (0.6 vs 0.05 per second), the reverse reaction dominates and most of the dissolved gas ends up back in the gas phase.

## Test yourself

1. Set the rate constants so equilibrium favours B three times as strongly as A (K = 3).
2. Let the reaction run to equilibrium with exactly 0.3 mol/L of A remaining.
3. Make equilibrium favour the reactant so strongly that more than 80% of A is still left.

## Intuition

Picture a bottle of soda you just opened: dissolved CO2 keeps turning into bubbles, while some bubbles keep re-dissolving, until the fizzing settles into a steady hiss instead of stopping. On the chart, the curve for [A] starts high and falls, and the curve for [B] starts at zero and climbs. Drag the point marked «t» (time) along them and watch both flatten out, but never reach zero or the very top.

They flatten because the reaction never actually stops: A is still turning into B, and B is still turning back into A, just at matched rates. Raise the slider «forward rate constant kf» and the flat part of both lines shifts — B ends up winning a bigger share. That's the whole idea behind Le Chatelier's principle: push on the rates, and the resting point moves, even though the back-and-forth itself never stops.

## Formal

With $\mathrm{A} \underset{k_r}{\overset{k_f}{\rightleftharpoons}} \mathrm{B}$ and mass balance $[\mathrm{B}] = [\mathrm{A}]_0 - [\mathrm{A}]$, the net rate $\dfrac{d[\mathrm{A}]}{dt} = -k_f[\mathrm{A}] + k_r[\mathrm{B}]$ is a linear ODE with an exponential approach to a constant.

At equilibrium $\dfrac{d[\mathrm{A}]}{dt} = 0$, so $k_f[\mathrm{A}]_{eq} = k_r[\mathrm{B}]_{eq}$, giving the equilibrium constant $K = k_f/k_r = [\mathrm{B}]_{eq}/[\mathrm{A}]_{eq}$.

## Advanced

Le Chatelier’s principle is a consequence, not a separate law: perturbing $[\mathrm{A}]$, $[\mathrm{B}]$, or (through their temperature dependence) $k_f$ and $k_r$ changes the instantaneous net rate away from zero, and the same first-order relaxation dynamics carries the system to a new equilibrium consistent with the new $K$.

## Derivation

1. Forward reaction removes A; reverse reaction, fed by B, restores it.
2. Collect terms: a linear ODE relaxing toward a fixed point.
3. Solve; as $t\to\infty$ this approaches the equilibrium value $[\mathrm{A}]_0 k_r/(k_f+k_r)$.

## Real world

### Haber process
Ammonia synthesis is a genuine equilibrium; engineers choose pressure and temperature to push it toward more product without stopping the reverse reaction entirely.

### Blood oxygen transport
Haemoglobin binding oxygen is a reversible equilibrium — release in tissues and uptake in the lungs both rely on the balance shifting with local concentration.

### Carbonated drinks
$\mathrm{CO_2}$ dissolved in a sealed bottle is in equilibrium with gaseous $\mathrm{CO_2}$ above it; opening the bottle shifts that balance and it fizzes.

### Solubility equilibria
A saturated salt solution with undissolved crystals at the bottom is at dynamic equilibrium — dissolving and recrystallising continue at equal rates.
