---
title: Bernoulli and flow rate
summary: >-
  Squeeze a steady flow into a narrower cross-section and it must speed up —
  and wherever it speeds up, its pressure drops.
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

## Intuition

Drag the downstream area $x$ smaller and watch the main curve shoot upward: the same volume of fluid has to get through every cross-section each second, so squeezing the pipe forces the flow to speed up there, exactly the way traffic accelerates through a lane closure.

Now look at the second chart tracking the pressure drop between the two points. As you shrink $x$ the marked point climbs steeply — the faster-moving fluid downstream is at noticeably lower pressure than the slower fluid upstream, and if you widen $x$ past $A_1$ the flow actually slows down again and the "drop" turns negative, meaning the pressure there is higher, not lower.

## Formal

Continuity for an incompressible fluid: $A_1 v_1 = A_2 v_2$, so the same mass flow rate passes every cross-section of the pipe each second.

Bernoulli's equation then converts that speed change into a pressure change: $\Delta p = p_1 - p_2 = \tfrac12\rho\left(v_2^2 - v_1^2\right)$, so any point where the flow is faster is a point where the pressure is lower.

## Advanced

This is exactly the physics behind the separate 'bernoulli' lesson's venturi tube, here reframed with the downstream area itself as the dragged variable: continuity fixes how fast the fluid must be moving at each cross-section, and Bernoulli's equation is nothing more than energy conservation converting that required kinetic energy into a matching pressure change along the streamline.

## Derivation

1. Mass conservation for a steady, incompressible flow requires the same mass flow rate through every cross-section.
2. Bernoulli's equation along the streamline (steady, inviscid, no elevation change) links pressure and speed at the two points.
3. Subtracting the two speed terms gives the pressure drop directly in terms of the upstream speed and the area ratio.

## Real world

### The garden hose thumb trick
Partly covering the end of a hose shrinks its effective area, so by continuity the water must shoot out faster — exactly this relationship, applied by hand.

### Fire hose nozzles
A firefighting nozzle narrows sharply on purpose, converting a modest flow inside the hose into a fast, far-reaching jet at the tip.

### Lift on an airplane wing
An airfoil accelerates air over its curved upper surface, and the resulting pressure drop is the same Bernoulli link explored in depth in the 'bernoulli' lesson.

### Blood flow through a narrowed artery
A partial blockage narrows an artery's cross-section, so blood speeds up through it and the local pressure drops — a mechanism doctors watch for in stenosis.
