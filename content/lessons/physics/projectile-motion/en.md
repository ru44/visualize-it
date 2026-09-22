---
title: Projectile motion
summary: >-
  Constant horizontal velocity plus constant downward acceleration traces a
  parabola.
parameters:
  v: launch speed v
  th: launch angle θ
  x: horizontal position x
variables:
  - launch speed
  - launch angle above the horizontal
  - 'gravitational acceleration, 9.81 m/s²'
  - horizontal distance and height; the ground is y = 0
---

## Intuition

The ball does two independent things at once: it drifts sideways at a steady speed, and it falls exactly as if it had been dropped. The tangent line shows its direction of travel at each moment — flat at the top, where all the vertical speed has been used up.

Sweep the angle from 5° to 85°. The landing point moves out, peaks at 45°, and comes back; angles that add to 90° (say 30° and 60°) land in the same place. The part of the curve below the axis is where the ball would go if the ground were not there.

## Formal

$x = v\cos\theta\, t$ and $y = v\sin\theta\, t - \tfrac12 g t^2$; eliminating $t$ gives the trajectory.

Range $R = \dfrac{v^2 \sin 2\theta}{g}$, maximum height $\dfrac{v^2\sin^2\theta}{2g}$.

## Advanced

With linear drag $-b\mathbf{v}$ the components still decouple, but the path is no longer symmetric and the optimum angle drops below 45°. With quadratic drag the equations couple and must be integrated numerically.

## Derivation

1. No horizontal force; constant downward force $mg$.
2. Solve the first equation for time.
3. Substitute: a quadratic in $x$ — a parabola.

## Real world

### Sport
Basketball arcs, long jumps and golf drives are all launch-angle problems.

### Fountains and hoses
Each water droplet is a projectile; the stream draws the parabola for you.

### Spaceflight
Throw fast enough and the ground curves away as quickly as you fall — an orbit is a projectile that keeps missing.
