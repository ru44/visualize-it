---
title: Electrochemical cells and the Nernst equation
summary: >-
  Why does a flashlight get dimmer as its battery runs down? This lesson
  shows how a battery's voltage depends on how far its chemical reaction has
  already progressed.
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

## Try it

1. Drag «reaction quotient Q» up, away from 1. Watch the voltage curve fall as products build up.
2. Raise «electrons transferred n» instead. The same drop in Q now costs less voltage.
3. Raise «standard cell potential E⁰». The whole curve shifts upward — a stronger battery to start with.

## Real-life examples

1. **A fresh Daniell cell, just connected.** Standard potential 1.10 V, two electrons transferred, reactants and products in balance (Q = 1): the cell delivers its full rated voltage.
2. **A battery that has nearly run flat.** After a long discharge, products have built up a thousandfold over reactants (Q = 500): even with a decent 1.5 V rating, the voltage has sagged noticeably.
3. **The instant a cell is switched on.** Virtually no products exist yet (Q near its minimum): the voltage briefly reads close to its full standard value of 1.8 V.

## Test yourself

1. Get the cell voltage down to exactly 1.00 V.
2. Make the cell essentially dead: voltage below 0.5 V.
3. With the reaction quotient at its maximum (Q = 1000), find a standard potential and electron count that still keep at least 90% of the standard voltage.

## Intuition

Picture a fresh AA battery, rated 1.5 V, versus one that has been running a flashlight for hours: the flashlight is visibly dimmer, because the battery's voltage has sagged below its rating. On screen, drag the slider «reaction quotient Q» up, away from 1, to picture that used-up battery: reactants have been consumed and products have piled up. Watch the voltage curve fall as you drag — same chemistry, same standard rating, but less push left.

Now drag «electrons transferred n» instead. With more electrons changing hands in each reaction event, the same rise in Q costs less voltage, so a battery with a larger n holds its voltage more steadily as it discharges. That's the whole content of the Nernst equation: voltage equals the standard rating, minus a penalty that grows as the reaction quotient Q climbs.

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
