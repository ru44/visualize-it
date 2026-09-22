---
title: Bernoulli and flow rate
summary: >-
  This is why covering part of a hose opening makes the water shoot out
  faster, and why a narrowed artery makes blood speed up and its pressure
  drop.
parameters:
  v1: upstream speed v₁
  A1: upstream cross-sectional area A₁
  x: downstream area A₂
variables:
  - upstream and downstream cross-sectional area
  - upstream and downstream flow speed
  - pressure drop Δp
charts:
  - title: Pressure drop as the pipe narrows
    xLabel: downstream area A₂
    yLabel: Δp (kPa)
    series:
      - p₁ − p₂
---

## Try it

1. Watch the water flow through the pipe at its normal width.
2. Drag the slider "downstream area A₂" smaller, like pinching a hose. Watch the flow speed up.
3. Now drag it wider than "upstream area A₁". The flow slows down again, and the pressure difference flips sign.

## Real-life examples

1. **Garden hose, wide open.** Water leaves the tap at 1.5 m/s through an opening as wide as the pipe itself, so nothing speeds up.
2. **Covering the end with your thumb.** Shrinking the opening to a quarter of its area forces the same water through four times faster — the classic trick for reaching further with a hose.
3. **Firefighting nozzle.** A hose narrows sharply from a wide barrel to a narrow tip, turning a gentle 1 m/s flow into a jet about nine times faster.

## Test yourself

1. Narrow the pipe until the downstream speed is exactly twice the upstream speed.
2. Make the downstream speed reach 8.
3. Find a downstream area where the downstream speed squared minus the upstream speed squared equals 20 — the quantity that sets the pressure drop.

## Intuition

Imagine water moving steadily through a garden hose at 1.5 metres per second. Drag the slider "downstream area A₂" to make the pipe narrower there: the same amount of water still has to get through every second, so it has to speed up to squeeze through the smaller gap, exactly like traffic speeding up through a single-lane road works zone.

Now look at the second chart, which tracks the pressure drop between the wide and narrow points. Shrink A₂ further and the marked point on that chart climbs steeply: the faster water at the narrow point pushes with noticeably less pressure than the slower water upstream. Widen A₂ past A₁ instead, and the flow there slows down below the upstream speed, so the "drop" turns negative — the pressure there is actually higher.

## Formal

Continuity for an incompressible fluid: $A_1 v_1 = A_2 v_2$, so the same mass flow rate passes every cross-section of the pipe each second.

Bernoulli's equation then converts that speed change into a pressure change: $\Delta p = p_1 - p_2 = \tfrac12\rho\left(v_2^2 - v_1^2\right)$, so any point where the flow is faster is a point where the pressure is lower.

## Advanced

This is exactly the physics behind the separate 'bernoulli' lesson's venturi tube, here reframed with the downstream area itself as the dragged variable: continuity fixes how fast the fluid must be moving at each cross-section, and Bernoulli's equation is nothing more than energy conservation converting that required kinetic energy into a matching pressure change along the streamline.

## Derivation

1. Mass conservation for a steady, incompressible flow requires the same mass flow rate through every cross-section.
2. Bernoulli's equation along the streamline (steady, inviscid, no elevation change) links pressure and speed at the two points.
3. Subtracting the two speed terms gives the pressure drop directly from the upstream speed and the ratio of the two areas.

## Real world

### The garden hose thumb trick
Partly covering the end of a hose shrinks its effective area, so by continuity the water must shoot out faster — exactly this relationship, applied by hand.

### Fire hose nozzles
A firefighting nozzle narrows sharply on purpose, converting a modest flow inside the hose into a fast, far-reaching jet at the tip.

### Lift on an airplane wing
An airfoil accelerates air over its curved upper surface, and the resulting pressure drop is the same Bernoulli link explored in depth in the 'bernoulli' lesson.

### Blood flow through a narrowed artery
A partial blockage narrows an artery's cross-section, so blood speeds up through it and the local pressure drops — a mechanism doctors watch for in stenosis.
