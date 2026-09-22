---
title: Ideal gas law
summary: >-
  Pressure, volume, amount and temperature of a gas are locked together by one
  constant, $R$.
parameters:
  'n': amount n
  T: temperature T
  V: volume V
variables:
  - pressure — force per area from particles hitting the walls
  - 'volume of the container, set here by dragging the piston'
  - 'amount of gas, in moles — more particles inside'
  - 'the gas constant, $8.314\ \mathrm{J\,mol^{-1}K^{-1}}$'
  - temperature — how fast the particles move
charts:
  - title: 'Isotherm: pressure against volume at the current T and n'
    xLabel: V (L)
    yLabel: P (kPa)
    series:
      - P = nRT / V
---

## Intuition

Drag the piston left or right to change $V$. Squeeze it in and the same particles are packed into a smaller box, so they hit the walls more often — watch the wall-hits-per-second readout climb — and the pressure gauge along the top rises. Slide the slider for $T$ up instead and every particle speeds up, so even at the same volume they slam into the walls harder and more often; slide $n$ up and there are simply more particles to do the hitting.

The pressure gauge is really just a running tally of those collisions. Nothing about the gas changes discontinuously — the particle count, their speed, and the box size all adjust smoothly as you move a slider, and the gauge tracks the combined effect in real time. That direct link between "more/faster collisions" and "higher pressure" is the whole content of the ideal gas law.

## Formal

For $n$ moles of an ideal gas at absolute temperature $T$ confined to volume $V$, the pressure satisfies $PV = nRT$, with $R = 8.314\ \mathrm{J\,mol^{-1}K^{-1}}$.

Equivalently, pressure is proportional to the number and average kinetic energy of the particles, and inversely proportional to the volume they are confined to: $P = \dfrac{nRT}{V}$.

## Advanced

Kinetic theory derives it: $PV = \tfrac13 N m \langle v^2 \rangle$ together with $\tfrac12 m\langle v^2\rangle = \tfrac32 k_B T$ gives $PV = N k_B T$. Real gases deviate at high density; van der Waals corrects for molecular volume and attraction.

## Derivation

1. Three separate experimental laws: squeezing the volume raises pressure; heating a gas at constant pressure expands it; adding more gas at constant pressure also expands it.
2. Each law holds the other variables fixed. Combining all three, pressure must scale with the product $nT$ and inversely with $V$.
3. Insert a single constant of proportionality $R$ to turn that combined relation into an equation — the ideal gas law.

## Real world

### Engines
A car engine compresses an air-fuel mixture (shrinking $V$ raises $P$ and $T$) before ignition, then lets the hot combustion gas expand to push the piston.

### Refrigeration
Fridges and air conditioners cycle a refrigerant through compression and expansion, using the $PV = nRT$ relationship to move heat from cold to warm.

### Tyres and gas tanks
A tyre's pressure rises on a hot day purely because $T$ went up while $n$ and $V$ stayed almost fixed — exactly the slider you can move here.

### The atmosphere
Air pressure falls with altitude because there is less gas above pressing down; weather systems form as pockets of air at different $T$ and $P$ mix.
