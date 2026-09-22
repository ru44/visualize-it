---
title: Bernoulli and continuity
summary: >-
  Squeeze a steady flow through a narrower pipe and it must speed up
  (continuity); where it speeds up, its pressure must fall (Bernoulli).
parameters:
  v1: inlet speed v₁
  ratio: throat / inlet area
variables:
  - static pressure
  - flow speed
  - pipe cross-sectional area
  - fluid density (assumed constant — incompressible)
---

## Intuition

Shrink the throat with the drag handle and watch the particles: the same number must pass every cross-section each second, so where the pipe narrows they must speed up to keep up — that’s continuity, just like traffic bunching and accelerating through a lane closure.

Now look at the three manometer tubes. The liquid sits lower at the throat than at the inlet or outlet — the fast-moving air there is at lower pressure. Nothing is being destroyed: energy per unit volume ($p + \tfrac12\rho v^2$) stays constant along the pipe, so the kinetic-energy term the fluid gains by speeding up is paid for exactly by the pressure term it loses.

## Formal

Continuity for an incompressible fluid in a stream tube: $A_1 v_1 = A_2 v_2$, i.e. mass flow rate $\rho A v$ is constant.

Bernoulli’s equation along a streamline (steady, inviscid, incompressible, no elevation change): $p_1 + \tfrac12\rho v_1^2 = p_2 + \tfrac12\rho v_2^2$.

## Advanced

Bernoulli’s equation is the steady-flow, along-a-streamline statement of energy conservation for an inviscid fluid — it follows from integrating the Euler momentum equation $\rho(\mathbf v\cdot\nabla)\mathbf v = -\nabla p$ along a streamline. Real venturis lose a little total pressure to viscosity, which is why the outlet manometer here is drawn exactly level with the inlet only in this ideal, lossless model.

## Derivation

1. Mass in equals mass out for steady incompressible flow through a tube of varying area.
2. Euler's equation along a streamline with no other forces: a speeding fluid parcel is pushed forward by falling pressure.
3. Integrate from station 1 to station 2: the sum is conserved along the streamline.

## Real world

### Carburettors and atomisers
Air accelerated through a venturi throat drops in pressure enough to draw fuel or perfume up a side tube.

### Flow meters
Measuring the pressure drop through a known constriction (a venturi or orifice meter) gives the flow rate directly.

### Aneurysms
Blood speeding up through a narrowed artery drops in local pressure — the same physics, with real physiological consequences.

### Wind around buildings
Air squeezed between tall buildings speeds up and its pressure drops, which is why gaps between towers feel so much windier.
