---
title: Electrochemical cells and the Nernst equation
summary: >-
  A battery's voltage is not fixed — it is the standard potential of its
  two half-reactions minus a penalty that grows as products build up and
  reactants run low, which is exactly why a battery goes flat.
parameters:
  E0: standard cell potential E⁰
  n: electrons transferred n
  x: reaction quotient Q (products ÷ reactants)
variables:
  - cell potential — the actual voltage the cell produces right now
  - standard cell potential — the voltage under standard, freshly-mixed conditions
  - number of electrons transferred in the balanced redox reaction
  - reaction quotient — how far the reaction has progressed, products over reactants
---

## Intuition

Drag the reaction-quotient slider up, away from 1, to picture a battery that has been running for a while: reactants have been consumed and products have piled up, so the ratio of products to reactants climbs. Watch the voltage curve fall as you do — the cell still has the same chemistry, the same standard potential, but less of a "push" left because the reaction is closer to running out of things to react.

Now instead drag the electron-count slider. With more electrons transferred per reaction event, the same drop in voltage takes a much bigger swing in the reaction quotient to produce — each electron transferred shares the burden of the changing concentrations, so a cell with a larger n holds its voltage more steadily as it discharges.

## Formal

A cell pairs two half-reactions, one giving up electrons (oxidation) and one accepting them (reduction); the number of electrons each event exchanges is $n$. Under standard conditions — 1 mol/L concentrations, 1 atm gas pressures — the cell produces its standard potential $E^0$, the difference between the two half-reactions' standard reduction potentials. The classic Daniell cell, zinc reacting with copper sulfate, has a standard potential of 1.10 V.

Away from standard conditions, the actual voltage follows the Nernst equation, $E = E^0 - \dfrac{RT}{nF}\ln Q$, which at room temperature (25°C) simplifies to $E = E^0 - \dfrac{0.05916}{n}\log_{10} Q$. As the reaction quotient $Q$ (products over reactants) rises above 1, the logarithm is positive, so the subtracted term grows and the cell's voltage falls below $E^0$.

## Advanced

The Nernst equation is why a cell's voltage can be used to measure concentration rather than the other way around: a pH meter, for instance, is an electrochemical cell whose voltage the meter converts back into hydrogen-ion concentration using this same relationship. The same equation underlies concentration cells, where two half-cells hold the identical chemical species at different concentrations and the voltage comes purely from the concentration difference, with $E^0 = 0$.

## Derivation

1. A redox reaction splits into two half-reactions that together exchange $n$ electrons, and their combined standard reduction potentials set the standard cell potential $E^0$.
2. The general Nernst equation adjusts that standard value by a term proportional to the log of the reaction quotient, scaled by temperature and the number of electrons.
3. At 25°C the temperature-dependent constants collapse to the number 0.05916, giving the simplified, everyday form of the equation.

## Real world

### Why a battery's voltage sags as it runs down
As a battery discharges, reactants are consumed and products accumulate, raising $Q$ and steadily lowering the voltage below its fresh, standard value — the same curve this lesson's slider traces.

### The Daniell cell and early batteries
The Daniell cell's reliable 1.10 V output made it one of the first practical batteries, used to power early telegraph systems in the 19th century.

### pH meters and ion-selective electrodes
Many lab sensors are electrochemical cells at heart, converting a concentration difference into a voltage through this exact relationship, then converting that voltage back into a reading.

### Corrosion and cathodic protection
Rusting is an electrochemical process; engineers protect ships and pipelines by attaching a more easily oxidised metal that sacrifices itself, shifting which half-reaction happens where.
