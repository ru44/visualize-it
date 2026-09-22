---
title: Projectile motion
summary: >-
  This is the physics behind every basketball arc, fountain jet and long
  jump — and why 45° gives you the longest possible throw.
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

## Try it

1. Watch the ball launch and trace a curved path through the air.
2. Drag the slider "launch angle θ" from 5° to 85°. Watch the landing point move out, peak, then come back.
3. Now drag "launch speed v" up. The whole arc stretches further and higher.

## Real-life examples

1. **A basketball free throw.** Launched at about 8 m/s and a steep 50° arc, the ball drops into the hoop from above.
2. **A javelin throw.** At roughly 25 m/s and 35°, an elite throw balances launch angle against how far the javelin can travel before landing.
3. **A golf drive.** A low, fast 15° launch at 30 m/s sends the ball skimming far down the fairway rather than arcing high.

## Test yourself

1. Make the ball land exactly 40 m away.
2. Keep the launch speed at 20 m/s and find the angle that gives the greatest possible range.
3. With speed fixed at 20 m/s, find an angle below 40° that lands the ball at the same 40 m distance as a 45° launch.

## Intuition

Picture a basketball launched at 8 m/s at a steep 50° angle: it does two independent things at once, drifting sideways at a steady speed while falling exactly as if it had been dropped. The tangent line on the curve shows its direction of travel at each moment, flat at the top of the arc, where all the vertical speed has been used up.

Drag the slider "launch angle θ" from 5° up to 85°: the landing point moves out, peaks at 45°, then comes back in, and two angles that add up to 90°, say 30° and 60°, land in the same spot. The part of the curve below the ground is where the ball would keep going if the floor weren't there.

## Formal

$x = v\cos\theta\, t$ and $y = v\sin\theta\, t - \tfrac12 g t^2$; eliminating $t$ gives the trajectory.

Range $R = \dfrac{v^2 \sin 2\theta}{g}$, maximum height $\dfrac{v^2\sin^2\theta}{2g}$.

## Advanced

With linear drag $-b\mathbf{v}$ the components still decouple, but the path is no longer symmetric and the optimum angle drops below 45°. With quadratic drag the equations couple and must be integrated numerically.

## Derivation

1. No horizontal force; constant downward force $mg$.
2. Solve the first equation for the time.
3. Substitute: a quadratic in $x$ — a parabola.

## Real world

### Sport
Basketball arcs, long jumps and golf drives are all launch-angle problems.

### Fountains and hoses
Each water droplet is a projectile; the stream draws the parabola for you.

### Spaceflight
Throw fast enough and the ground curves away as quickly as you fall — an orbit is a projectile that keeps missing.
