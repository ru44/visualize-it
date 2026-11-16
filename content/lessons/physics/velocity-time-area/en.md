---
title: Area under a velocity-time graph is displacement
summary: 'Use signed area under a velocity graph to find displacement, and absolute area to find total distance.'
parameters:
  v0: 'v₀ — velocity at time zero'
  acc: 'constant acceleration'
  a: 'a — start time'
  b: 'b — end time'
variables:
  - 'signed velocity at each time'
  - 'displacement: final position minus initial position for the interval'
  - 'start and end times, with a ≤ b'
---

## Try it

1. Set v₀ = 4 m/s, acceleration = −2 m/s², a = 0 s and b = 2 s. The positive triangular area is 4 m: velocity falls from 4 m/s to zero.
2. Extend b to 4 s. Velocity becomes negative after 2 s, adding an area of −4 m. Net displacement returns to zero, while total distance is 8 m.
3. Set v₀ = 5 m/s and acceleration = 0, keeping a = 0 and b = 4. The rectangular area is 20 m. Keep a < b when interpreting an interval of forward-running time.

## Real-life examples

1. **Constant velocity.** At 5 m/s for 5 s, displacement and distance are both 25 m. The area is a rectangle with units (m/s) × s = m.
2. **A reversal.** With initial velocity 4 m/s and acceleration −2 m/s² over 0–4 s, the object goes 4 m forward and 4 m back. Displacement is zero; distance is 8 m.
3. **Stopping at the endpoint.** With initial velocity 8 m/s and acceleration −2 m/s² over 0–4 s, the triangular area is 16 m. The object reaches zero velocity at 4 s; continuing the formula beyond that would reverse its motion.

## Test yourself

1. Choose a < b and make the signed displacement approximately 20 m.
2. Choose a < b, an initial velocity with magnitude greater than 1 m/s, and net displacement within 0.5 m of zero. For a clear return journey, use a = 0 and put a reversal inside the interval.
3. Start the interval before 0.5 s with positive velocity, use negative acceleration, and end after the velocity becomes negative.

## Intuition

At a constant velocity of 5 m/s, each second adds 5 m to position. Over four seconds, the rectangle under the velocity graph has area 20, and its units are metres. When velocity changes, divide the time into short intervals. Velocity times each short duration approximates that interval's displacement; adding the pieces gives the area in the limit.

Velocity has a sign because direction matters. Area above zero increases position, and area below zero decreases it. The two contributions can cancel even when the object has moved a long way. To find total distance, count both areas as positive. This graph is velocity against time, not a drawing of the object's path through space.

## Formal

Over a forward time interval $a\le b$, displacement is $\Delta x=x(b)-x(a)=\int_a^b v(t)\,dt$. The bounds a and b are times; they are not positions. Reversing the integration bounds changes the sign mathematically, but does not describe elapsed time running forward.

Total distance is $D=\int_a^b|v(t)|\,dt$. It equals signed displacement when velocity is nonnegative throughout the interval. If velocity is nonpositive throughout, distance equals the magnitude of displacement. Here $v(t)=v_0+\mathrm{acc}\,t$, giving $\Delta x=v_0(b-a)+\tfrac12\mathrm{acc}(b^2-a^2)$.

## Advanced

For a linear velocity graph, displacement is also the interval duration multiplied by the average of the two endpoint velocities. This trapezoid rule is exact for the linear function, including signed cancellation. To calculate distance when velocity changes sign, split the interval at its zero and add the magnitudes of the resulting integrals.

## Derivation

1. Velocity is the derivative of position with respect to time.
2. Integrating that derivative between the two times gives the difference between the endpoint positions.
3. That position difference is displacement. It does not count every metre travelled if the object reverses direction.

## Real world

### A cart moving back and forth

A cart can return to its start with zero displacement after travelling several metres. Integrating signed velocity and integrating speed answer these different questions.

### Estimating motion from measurements

Measured velocity can be accumulated over time to estimate displacement. Sensor error can also accumulate, so the mathematical relationship alone does not guarantee an accurate position estimate.
