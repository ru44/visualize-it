---
title: Projectile motion
summary: 'Split an ideal projectile’s motion into constant horizontal velocity and vertically accelerated motion under gravity.'
parameters:
  v: 'v — initial speed'
  th: 'θ — launch angle above horizontal'
  x: 'x — horizontal position'
variables:
  - 'speed at launch'
  - 'launch angle above the horizontal'
  - 'constant downward gravitational acceleration, 9.81 m/s²'
  - 'horizontal position and height relative to the launch point'
---

## Try it

1. In the 2D view, pause the animation and set v = 20 m/s and θ = 45°. The trajectory returns to launch height at about x = 40.77 m.
2. Move x along the curve. Its tangent is horizontal near x = 20.39 m, at the highest point. Vertical velocity is zero there, but horizontal velocity and downward acceleration are not.
3. Keep v = 20 m/s and compare θ = 30° with 60°. Both ranges are about 35.31 m, but 60° gives a higher arc and longer flight. The 2D marker's playback speed is illustrative; x is horizontal position, not elapsed time.

## Real-life examples

1. **A short ideal throw.** At 8 m/s and 50°, the same-height range is about 6.42 m and maximum height above launch is 1.91 m. A target at another height requires a different calculation.
2. **A moderate angle.** At 25 m/s and 35°, the range is about 59.87 m and the maximum height about 10.48 m in this drag-free model.
3. **A low angle.** At 30 m/s and 15°, the range is about 45.87 m while maximum height is only 3.07 m. These values describe an ideal projectile, not a realistic golf ball with lift and drag.

## Test yourself

1. Choose speed and angle giving a same-height range near 40 m.
2. Set speed to 20 m/s and choose the angle that maximizes range in this model.
3. Keep speed at 20 m/s and find an angle below 40° with range within 1 m of 40 m. The 45° range is about 40.77 m, not exactly 40 m.

## Intuition

After launch, imagine gravity is the only force. There is no horizontal acceleration, so equal time intervals give equal horizontal displacements. Vertically, the projectile begins with an upward velocity and loses 9.81 m/s of that component each second. It reaches zero vertical velocity at the top, then gains downward velocity. Combining these motions produces a parabola.

The launch angle divides the initial velocity into horizontal and vertical components. A steeper launch gives more upward velocity but less horizontal velocity. At a fixed launch speed, equal launch and landing heights, and without drag, 45° balances these effects to give maximum range. The curve below y = 0 is a mathematical continuation after passing launch height, not a path through a solid floor. The 3D animation stops at the same-height landing point.

## Formal

Taking the launch point as the origin and upward as positive, $x=v\cos\theta\,t$ and $y=v\sin\theta\,t-\tfrac12gt^2$, with $g=9.81\ \mathrm{m/s^2}$. The model assumes constant gravity and no air resistance; v here is the initial speed, not the speed throughout flight.

For positive launch angles below 90° and landing at the launch height, $T=2v\sin\theta/g$, $R=v^2\sin(2\theta)/g$, and $H=v^2\sin^2\theta/(2g)$. Here T is flight time, R horizontal range and H maximum height above launch. Since sine is at most one, range is largest at 45° under these assumptions.

## Advanced

Eliminating time gives the displayed y(x) equation when the horizontal launch velocity is nonzero. Its slope is dy/dx = vᵧ/vₓ, a direction ratio, not the vertical velocity itself. Air resistance, spin, varying gravity or unequal endpoint heights change the problem; the 45° result cannot be carried over without checking the new assumptions.

## Derivation

1. Use zero horizontal acceleration and constant downward acceleration −g to write the two position equations.
2. Solve the horizontal equation for time. This requires v cos θ to be nonzero.
3. Substitute that time into the vertical equation to obtain the parabolic trajectory.

## Real world

### A thrown object

A dense object moving over a short distance may be approximately described by this model when air resistance is small. Use the actual launch and landing heights when comparing with a measurement.

### A stream of water

Droplets leaving a nozzle can trace an approximate projectile path. Air resistance, breakup of the stream and interactions between droplets limit the approximation.
