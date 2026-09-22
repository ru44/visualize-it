---
title: Area under a velocity-time graph is displacement
summary: >-
  The shaded area between a velocity curve and the time axis is exactly how far
  the object has travelled.
parameters:
  v0: initial velocity v₀
  acc: acceleration
  a: a (start time)
  b: b (end time)
variables:
  - velocity as a function of time
  - net displacement — the signed area
  - start and end times of the interval considered
---

## Intuition

Drag $b$ across the region where $v_0 + \text{acc}\cdot t$ is negative: the shading appears below the axis and the running displacement readout goes down — moving backward counts as negative area, subtracting from progress rather than adding to it.

Keep dragging $b$ past the point where the line crosses zero: now the shading appears above the axis too, and the positive area starts cancelling the earlier negative area. If the object reverses and retraces its path exactly, the two shaded regions can cancel completely — zero net displacement even though it clearly moved.

## Formal

$\Delta x = \int_a^b v(t)\,dt$; regions above the axis contribute positively, regions below contribute negatively.

This is exactly the Fundamental Theorem of Calculus applied to $v = \dot x$: displacement is the antiderivative of velocity, evaluated between the bounds.

## Advanced

Total distance travelled (odometer reading, always non-negative) is instead $\int_a^b |v(t)|\,dt$ — splitting the interval at every sign change of $v$ and adding the absolute value of each piece's area. Displacement and distance agree only when the object never reverses direction.

## Derivation

1. Velocity is defined as the rate of change of position.
2. Apply the Fundamental Theorem of Calculus.
3. This difference is, by definition, the net displacement over $[a,b]$.

## Real world

### Trip planning
GPS devices integrate measured speed over time to compute total distance travelled.

### Sports analytics
A sprinter's velocity curve, integrated, gives split distances at any point in the race.

### Air traffic and shipping
Flight or voyage displacement is computed by integrating velocity logs, accounting for any backtracking.

### Robotics odometry
Wheeled robots estimate position by integrating wheel-speed sensor readings over time.
