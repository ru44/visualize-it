---
title: Area under a velocity-time graph is displacement
summary: >-
  This is how GPS devices and sports trackers turn a recorded speed into the
  actual distance travelled, even when the path doubles back on itself.
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

## Try it

1. Watch the shaded area between the velocity line and the time axis.
2. Drag "b (end time)" across a region where the line dips below zero. Watch the shading appear below the axis.
3. Keep dragging "b" past where the line crosses zero. The new shading above the axis starts cancelling the shading below.

## Real-life examples

1. **Cruising at a steady 5 m/s.** With no acceleration, the shaded rectangle's area gives exactly 25 m traveled over 5 seconds — simple constant-speed motion.
2. **A ball tossed straight up.** Launched at 4 m/s and pulled back by 2 m/s² of gravity-like deceleration, the ball rises then falls back to the same height after 4 s — the positive and negative areas exactly cancel, for zero net displacement.
3. **A cyclist braking to a stop.** Starting at 8 m/s and braking at 2 m/s², the cyclist coasts to a complete stop after exactly 4 s, covering 16 m in the process.

## Test yourself

1. Make the net displacement over the interval exactly 20 m.
2. Find values where the object clearly moves (v₀ ≠ 0) but still ends up with zero net displacement.
3. Make the object start moving forward, then reverse direction before the end of the interval.

## Intuition

Picture a cyclist starting at 8 m/s and braking at 2 m/s² until stopping exactly at 4 seconds — the shaded area under the line from a = 0 to b = 4 gives 16 metres travelled. Drag "b (end time)" across a region where the velocity line dips below zero instead: the shading appears below the time axis and the running displacement readout goes down, because moving backward counts as negative area, subtracting from progress rather than adding to it.

Keep dragging "b" past the point where the line crosses zero: shading now appears above the axis too, and that positive area starts cancelling the earlier negative area. If the object reverses and retraces its path exactly, the two shaded regions can cancel completely — zero net displacement even though it clearly moved.

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
