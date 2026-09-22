---
title: The drag equation
summary: >-
  This predicts why going faster costs so much more energy — on a bike, in a
  car, or falling through the air — because drag grows much faster than
  speed does.
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

## Try it

1. Picture a cyclist riding upright at 8 m/s (about 29 km/h) into a headwind.
2. Drag the speed point «speed v» to the right, toward highway speed. The tangent line — the extra force needed for one more m/s — gets steeper and steeper.
3. Now shrink «frontal area A», as if the cyclist tucked down low. The whole curve drops, even at the same speed.

## Real-life examples

1. **An upright cyclist commuting.** Moving at 8 m/s with a frontal area of 0.5 m² and a drag coefficient of 0.9, they push against about 18 N of drag — most of a cyclist's effort at that speed.
2. **A family car cruising on the motorway.** At 30 m/s (108 km/h) with a smooth 0.3 drag coefficient and a 2.2 m² frontal area, the car fights about 364 N of drag.
3. **A skydiver in free fall.** Falling belly-down at 50 m/s with a drag coefficient near 1.0 and a 0.7 m² frontal area, they push against over 1000 N — nearly their own body weight.

## Test yourself

1. Find a speed and shape that produce about 300 N of drag, like a car on the motorway.
2. Find a speed and shape where the power needed to overcome drag is about 10 kW.
3. Fly at least 20 m/s but keep the drag below 50 N by choosing a very streamlined shape (small area and drag coefficient).

## Intuition

Picture a cyclist riding upright at 8 m/s into a headwind. Drag «speed v» to the right, toward highway speed, and watch the tangent line on the curve: it is the extra force needed for one more m/s, and it gets steeper and steeper as you move right. Near very low speed the tangent is almost flat, but at highway speed a small further increase costs a large extra push — exactly why fuel economy falls off a cliff on the motorway.

Now shrink «drag coefficient Cd» or «frontal area A», as if the cyclist tucked down low: the whole curve drops but keeps its parabola shape, because both act as a plain multiplier on the speed term. A cyclist tucking in shrinks the area; a streamlined car body shrinks the drag coefficient — both attack that multiplier rather than fighting the speed-squared growth itself.

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
