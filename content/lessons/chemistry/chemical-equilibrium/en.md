---
title: Dynamic equilibrium
summary: >-
  A reversible reaction does not stop — it settles into a dynamic balance where
  the forward and reverse reactions proceed at equal rates, leaving
  concentrations constant but far from zero on either side.
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

## Intuition

Drag the time point x along the curve: [A] falls quickly at first, then flattens — not to zero, but to a fixed positive level. It flattens because the reaction never actually stops; A is still turning into B and B is still turning back into A, but at equal rates, so the concentrations stop changing even though molecules keep converting both ways.

Raise kƒ relative to kᵣ and the plateau shifts lower — equilibrium favours B more strongly. This is the microscopic picture behind Le Chatelier’s principle: nudging the balance of rates (by changing concentration, temperature, or pressure) shifts where the system settles, without ever truly stopping the underlying back-and-forth.

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
