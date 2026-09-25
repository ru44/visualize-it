---
title: Wingtip vortices and induced drag
summary: >-
  Every real wing leaks a little high-pressure air around its tip into the
  low-pressure air on top, rolling up into a trailing vortex that quietly
  costs the aircraft thrust — which is exactly why winglets and a goose's V
  formation both exist.
parameters:
  AR: aspect ratio AR
  alpha: angle of attack α
  winglets: winglets
variables:
  - induced drag coefficient
  - lift coefficient
  - aspect ratio, span squared over wing area
  - span efficiency, how close the wing's lift is to the ideal elliptical spread
---

## Try it

1. Picture an airliner on approach at 70 m/s, wings at AR = 9 and 8° angle of attack, no winglets fitted.
2. Watch the swirling vortex spilling off each wingtip, and read the induced drag it costs.
3. Flip «winglets» on: the same lift, but visibly smaller vortices and a smaller induced-drag number.

## Real-life examples

1. **A short, wide airliner wing without winglets.** AR = 9 at 8°, the vortex is fat and the induced drag coefficient comes out around 0.034 — a real, fuel-burning cost of making lift this way.
2. **The same wing, with winglets fitted.** Same lift, but the winglets choke the tip vortex down, cutting the induced drag coefficient to about 0.031 — roughly 9% less, for free, on every flight.
3. **A glider's long, slender wing.** AR = 25 at a gentle 4°, and the vortex almost vanishes: the induced drag coefficient drops to about 0.003, more than ten times smaller — long wings simply leak far less air around the tip.

## Test yourself

1. Reach an induced drag coefficient of about 0.034 — the short-winged airliner without winglets.
2. Turn winglets on and get the induced drag coefficient below 0.031, beating the no-winglet number.
3. Push the aspect ratio high and get the induced drag coefficient below 0.005, glider territory.

## Intuition

A wing only works by keeping high pressure below and low pressure above — but at the tip, there is nothing to stop that high-pressure air from simply curling up and around into the low-pressure region on top. Raise «angle of attack α» and watch the swirl grow: more lift means a bigger pressure difference, and a bigger pressure difference means more air is eager to leak around the tip. That leaking air rolls itself into a spinning trailing vortex — the same vortex a following aircraft must stay well clear of, and the same one you sometimes see condense into a visible spiral behind a landing jet on a humid day.

That vortex is not free: it tilts the whole flow the wing feels slightly backward, tilting the lift vector back with it — so part of what should have been pure lift now points backward too, as extra drag. Drag «aspect ratio AR» toward a long, slender wing and watch the vortex shrink even at the same lift: a longer wing spreads the same lift over more span, so proportionally less air needs to leak around each tip to balance the pressure. This is exactly why gliders and geese both favour long, narrow wings, and why «winglets» — small fins that block the air's escape route around the tip — buy back some of what a short wing loses.

## Formal

Induced drag comes from the small backward tilt of the lift vector caused by the wing's own trailing vortex system, and for a wing of aspect ratio $\mathrm{AR} = b^2/S$ (span squared over area), it works out to $C_{D,i} = \dfrac{C_L^2}{\pi\, \mathrm{AR}\, e}$, where $e \le 1$ is the span efficiency — equal to 1 only for the theoretically ideal elliptical lift distribution.

Because $C_{D,i}$ grows with $C_L^2$, induced drag matters most exactly when lift coefficient is highest: at low speed, during takeoff and landing — which is also when wingtip vortices are strongest and most likely to be visible.

## Advanced

Winglets do not eliminate the tip vortex; they reshape it, effectively pushing the "spanwise loading" closer to elliptical near the tip and slightly increasing the effective span efficiency $e$ (and, on some designs, the effective aspect ratio) without adding as much physical span as a literal wing extension would need, which matters because airports set hard limits on wingspan for gate clearance.

## Derivation

1. Lift, to first approximation, comes from pushing a "tube" of air of radius about half the span downward: $L \approx \dot m\, w$, with mass flow rate $\dot m = \rho v \cdot \pi(b/2)^2$ through a disc set by the span $b$.
2. That downwash tilts the flow the wing actually experiences backward by a small induced angle, $\alpha_i \approx w/(2v)$, and tilting the lift vector back by that angle gives an induced drag $D_i \approx L\,\alpha_i$.
3. Carrying the algebra through for the best-case (elliptical) spread of lift along the span gives the clean result $C_{D,i} = \dfrac{C_L^2}{\pi\, \mathrm{AR}\, e}$.

## Real world

### Why airliners keep getting longer, thinner wings
Modern airliner wings favour higher aspect ratio for exactly this reason, folding wingtips (like the 777X's) let a long, efficient wing still fit existing airport gates.

### Geese flying in a V
Each bird flies slightly behind and to the side of the one ahead, riding the upward-swirling outer edge of that bird's wingtip vortex for a free boost, which is also why the formation always trails off at an angle, not a straight line.

### Contrails and vortex cores
On humid days, the very low pressure at the core of a wingtip vortex can chill moist air below its dew point, condensing a visible spiral trail even without any engine exhaust involved.

### Wake turbulence separation rules
Air traffic control keeps following aircraft well behind and below a heavy jet's flight path specifically to avoid its wingtip vortices, which can persist and roll a smaller aircraft dangerously for a minute or more.
