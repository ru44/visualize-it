---
title: The drag equation
summary: >-
  Drag resists motion through a fluid and grows with the square of speed, so
  doubling your speed quadruples the force you must fight.
parameters:
  rho: fluid density ρ
  Cd: drag coefficient C_D
  A: frontal area A
  x: speed v
variables:
  - 'drag force, opposing motion'
  - fluid density
  - speed relative to the fluid
  - drag coefficient — how bluff or streamlined the shape is
  - reference (usually frontal) area
charts:
  - title: 'Power needed to overcome drag: P = D·v ∝ v³'
    xLabel: v (m/s)
    yLabel: P (kW)
    series:
      - P(v)
---

## Intuition

Drag the speed point along the curve: the curve is a parabola, and its tangent line — the extra force needed for one more m/s — gets steeper and steeper as you move right. Near v = 0 the tangent is almost flat, but by highway speed a small further increase costs a large extra push, which is exactly why fuel economy falls off a cliff on the motorway.

Now change $C_D$ or the frontal area $A$: the whole parabola scales up or down but keeps its shape, because both sit as a plain multiplier in front of $v^2$. A cyclist tucking into an aerodynamic crouch is shrinking $A$; a streamlined car body is shrinking $C_D$ — both attack the same multiplier rather than fighting the unavoidable $v^2$ growth.

## Formal

Drag is defined via the dynamic pressure $q = \tfrac12\rho v^2$ and a dimensionless coefficient: $D = qC_D A = \tfrac12 \rho v^2 C_D A$.

Power to overcome drag at constant speed is $P = Dv = \tfrac12\rho v^3 C_D A$ — cubic in speed, which is why top speed is so expensive to buy.

## Advanced

Total drag splits into parasitic drag (skin friction + form drag, both $\propto v^2$, dominant at high speed) and induced drag from generating lift ($\propto 1/v^2$, dominant at low speed) — see the lift-to-drag lesson for why their sum has a single minimum that defines best-range speed.

## Derivation

1. Dynamic pressure: the kinetic energy per unit volume of the oncoming flow.
2. $C_D$ packages all the messy shape- and Reynolds-number-dependent physics into one measured number.
3. Combine: drag grows with the square of speed for any fixed shape and orientation.

## Real world

### Cycling and running
Above a jog, air drag dominates human effort; aero bars and skin suits chase small $C_D A$ reductions because the payoff compounds with $v^2$.

### Vehicle fuel economy
Cruising fuel consumption rises roughly with $v^3$ once drag dominates rolling resistance — the reason motorway mpg drops sharply above about 100 km/h.

### Skydiving
A skydiver’s belly-down posture maximises $A$ and $C_D$ to slow their terminal velocity for a safer, more controllable fall.

### Wind loads on structures
Engineers size a building or bridge’s wind bracing using exactly this $v^2$ law, with hurricane-speed winds in mind.
