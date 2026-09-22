---
title: Moles and molar mass
summary: >-
  A mole is just a very large counting unit, chosen so that the mass in
  grams you weigh out on a scale tells you directly how many atoms or
  molecules you are holding.
parameters:
  M: molar mass M
  x: mass m
variables:
  - mass — how much of the substance you have, in grams
  - molar mass — the mass of one mole of the substance, in grams per mole
  - amount of substance — how many moles that mass represents
  - Avogadro constant — how many particles are in one mole
charts:
  - title: Molecules vs mass
    xLabel: mass (g)
    yLabel: number of molecules
    series:
      - molecules
---

## Intuition

Drag the mass slider and watch the number of moles rise in a straight line — double the mass, double the moles, because moles is just mass measured in units of "however much one particle weighs." Now drag the molar mass slider instead: a heavier molecule means each mole weighs more, so the same mass on the scale corresponds to fewer moles, and the line tilts flatter.

This is the whole point of the mole: atoms and molecules are far too small and numerous to count one by one, but a kitchen scale can weigh grams easily. By choosing the mole to be exactly the number of atoms in the molar mass of a substance, chemists turn an uncountable pile of particles into an ordinary weighing problem.

## Formal

The amount of substance $n$, in moles, is mass divided by molar mass: $n = \dfrac{m}{M}$. Molar mass is a property of the substance — look it up (or add up atomic masses from the periodic table) and it stays fixed while mass and moles vary together.

To go from moles to an actual particle count, multiply by the Avogadro constant $N_A \approx 6.022 \times 10^{23}$ particles per mole: $N = n\,N_A$. Water has a molar mass of about $18.015\ \text{g/mol}$, so 18 g of water is 1 mole, which is $6.022 \times 10^{23}$ water molecules — roughly the number of grains of sand it would take to bury a continent.

## Advanced

The mole is one of the seven SI base units, and since 2019 it is defined by fixing the Avogadro constant to an exact numerical value, rather than by referring to a physical sample of carbon-12 as older definitions did. That makes molar mass and the mole independent, precise counting tools rather than measurements tied to one reference object.

## Derivation

1. Moles equal mass divided by molar mass, by definition of what molar mass means.
2. Multiplying moles by the Avogadro constant converts an amount of substance into an actual particle count.
3. Combining the two gives the particle count directly from a measured mass, without ever counting a single particle by hand.

## Real world

### Weighing out a reaction
A chemist who needs exactly 2 moles of a reactant weighs out $2 \times M$ grams on a balance — no counting molecules required.

### Reading a nutrition or drug label
Doses and concentrations of medicines are often specified in moles or millimoles per litre precisely because it counts molecules, not just mass, which is what matters for how they react in the body.

### Why gas volumes compare so cleanly
At the same temperature and pressure, equal numbers of moles of any gas occupy the same volume, a fact that only makes sense once you think in moles rather than grams.

### Balancing chemical equations
The whole-number ratios in a balanced equation are ratios of moles, not grams, which is why molar mass is the bridge between a recipe written in atoms and one you can actually measure out.
