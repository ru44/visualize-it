---
title: 'The first law: energy, heat, and work'
summary: >-
  Energy is conserved: whatever internal energy a gas gains equals the heat
  added minus the work it does expanding — and that work is exactly the area
  under its pressure–volume curve.
parameters:
  'n': amount of gas n
  T: temperature T
  a: initial volume V₁
  b: final volume V₂
variables:
  - internal energy of the gas
  - heat added to the gas (positive) or removed (negative)
  - 'work done by the gas as it expands, the shaded area under P(V)'
  - 'pressure, volume, and absolute temperature of the gas'
---

## Intuition

Drag a and b to set the start and end volume of the expansion. The shaded region under the curve is the work the gas does pushing outward — widen the shaded strip and you can see directly why expanding further, or starting at higher pressure, always means more work done, exactly the way the area under a velocity curve is distance.

Raise T with a and b fixed and the whole P–V curve lifts upward, so the same shaded interval covers more area — hotter gas pushes harder at every volume, so the same expansion does more work. This is the P–V picture behind “heating a gas lets it do more work”, the core idea of every heat engine.

## Formal

The first law states $\Delta U = Q - W$: internal energy changes by whatever heat comes in minus whatever work goes out.

For a gas expanding at (quasi-)constant conditions, work is $W = \int_{V_1}^{V_2} P\,dV$ — the signed area under the P–V curve between the two volumes.

## Advanced

For an ideal gas held at constant temperature, $U$ depends on $T$ alone, so an isothermal expansion has $\Delta U = 0$ and therefore $Q = W = nRT\ln(V_2/V_1)$ — all the heat absorbed is converted directly into work, with no change in internal energy, a special case that will later contrast sharply with the adiabatic and Carnot-cycle processes used in real engines.

## Derivation

1. Ideal gas law, rearranged to give pressure as a function of volume at fixed $n, T$.
2. Integrate the P–V curve — temperature is constant so it comes outside the integral.
3. Isothermal ideal gas: internal energy is unchanged, so all absorbed heat becomes work.

## Real world

### Car engines
Each piston stroke is a P–V expansion; the enclosed area of the whole cycle on a P–V diagram is the net work per cycle.

### Compressed air tools
Releasing compressed air does mechanical work as it expands, cooling in the process exactly as the first law predicts.

### Weather
Rising air parcels expand and cool as they do work pushing against lower surrounding pressure — the same P–V work at planetary scale.

### Refrigerators
A refrigerant is compressed (work done on it) and later expands (work done by it), moving heat against its natural direction using externally supplied work.
