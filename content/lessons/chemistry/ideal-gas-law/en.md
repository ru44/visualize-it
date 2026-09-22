---
title: Ideal gas law
summary: >-
  Squeeze a gas into a smaller space, heat it up, or pump more of it in, and
  its pressure rises — this lesson shows exactly how much, whether you're
  inflating a tyre or designing an engine.
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

## Try it

1. Drag the piston to the left to squeeze the gas. The particles hit the walls more often and the pressure gauge rises.
2. Raise «temperature T». The particles fly faster and the pressure rises again, even with the same space.
3. Raise «amount n». More particles, more hits, more pressure. That is the whole law.

## Real-life examples

1. **A party balloon filled with helium.** About 0.5 mol of gas at room temperature (300 K) fills roughly 12 L.
2. **A car tyre on a hot day.** About 2 mol of air heated to 320 K, squeezed into the tyre's fixed 10 L volume, pushes the pressure noticeably higher.
3. **A scuba tank, heavily compressed.** About 5 mol of air squeezed into just 8 L at room temperature (300 K) — far more gas than the same space would hold at normal pressure.

## Test yourself

1. Push the pressure up to about 250 kPa.
2. Bring the pressure down below 50 kPa.
3. Get the pressure to about 150 kPa.

## Intuition

Picture a bicycle pump: push the handle down and the same air gets squeezed into less space inside the cylinder. On screen, drag the piston left to shrink the volume V, and watch the same gas particles hit the walls more often — the wall-hits-per-second readout climbs, and the pressure gauge along the top rises with it.

Now drag the slider for temperature T up instead: every particle speeds up, so even in the same volume they slam into the walls harder and more often. Drag the slider for amount n up, and there are simply more particles doing the hitting. The pressure gauge is really just a running tally of those collisions — more of them, or harder ones, means a higher reading.

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
