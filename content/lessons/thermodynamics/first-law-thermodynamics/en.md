---
title: 'The first law: energy, heat, and work'
summary: >-
  A bicycle pump gets warm as you compress air inside it, and rising air high
  in the atmosphere cools as it expands — both are the same rule: energy put
  in as heat, minus energy that leaves as work, is exactly what changes an
  object's internal energy.
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

## Try it

1. Drag markers a and b along the volume axis. Watch the shaded region between them — that is the work the gas does.
2. Raise the slider "temperature T". Watch the whole curve lift, so the same shaded strip covers more area.
3. Widen the gap between a and b. Watch the shaded area, and the work done, grow.

## Real-life examples

1. **A car engine's power stroke.** Hot combustion gas (n = 1 mol, T = 500 K) expanding from 1 to 5 litres pushes the piston outward, doing the work that turns the crankshaft.
2. **A compressed-air tool releasing air.** Air (n = 0.5 mol, T = 300 K) expanding from 2 to 8 litres as it leaves the tank does mechanical work on whatever it is driving, cooling slightly as it goes.
3. **A weather balloon rising through thin air.** A parcel of air (n = 2 mol, T = 250 K) expanding from 3 to 9 litres as pressure drops with altitude does work pushing against the surrounding air, cooling as it climbs.

## Test yourself

1. Get the work done by the gas to exactly 2000 J.
2. Exactly double the volume (b = 2a) while keeping the work above 1500 J.
3. Show compression: set b smaller than a so the work done by the gas drops to −1500 J or below.

## Intuition

Pump up a bicycle tire quickly and the pump barrel gets noticeably warm — squeezing the air does work on it, and that work becomes extra internal energy you can feel as heat. On screen, drag $a$ and $b$, the two markers on the volume axis, to set the start and end volume of a gas expanding the other way around. The shaded blue region under the curve between them is the work the gas does as it pushes outward — try moving from $a=1$ to $b=5$ litres and watch the strip widen.

Widen that shaded strip further, or start it at a higher point on the curve, and you can see directly why expanding more, or starting at higher pressure, always means more work done — exactly the way the area under a speed-vs-time graph gives you distance travelled. Now raise the slider "temperature T" with $a$ and $b$ fixed: the whole curve lifts upward, so the same shaded interval covers more area. Hotter gas pushes harder at every volume, so the same expansion now does more work — this is the picture behind "heating a gas lets it do more work", the core idea inside every heat engine.

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
