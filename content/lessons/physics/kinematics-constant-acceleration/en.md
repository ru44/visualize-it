---
title: 'Position, velocity and constant acceleration'
summary: 'Use constant acceleration to calculate position and velocity, including slowing down and reversing direction.'
parameters:
  x0: 'x₀ — position at time zero'
  v0: 'v₀ — velocity at time zero'
  a: 'a — constant acceleration'
  x: 't — elapsed time'
variables:
  - 'initial position'
  - 'initial signed velocity'
  - 'constant rate of change of velocity'
  - 'elapsed time in seconds'
---

## Try it

1. Set x₀ = 0 m, v₀ = 2 m/s and a = 1 m/s². Move time from 0 to 4 s. At 4 s, the position is 16 m and velocity is 6 m/s.
2. Set a = 0 while keeping the other starting values. At 4 s the position is 8 m and velocity stays 2 m/s. The marks placed at whole seconds are evenly spaced.
3. Set v₀ = 8 m/s and a = −3 m/s². Near 2.67 s the velocity reaches zero; later it becomes negative and the object moves back. The road and inset clamp positions outside their visible range, so use the readouts for off-screen values.

## Real-life examples

1. **Slowing, then reversing.** With x₀ = 0, v₀ = 8 and a = −3, the object stops momentarily at about 2.67 s and x = 10.67 m. Continuing the same acceleration reverses it; a braking model for a car should end or change at the stop.
2. **Starting from rest.** With x₀ = 0, v₀ = 0 and a = 1, after 4 s the position is 8 m and the velocity is 4 m/s. Constant acceleration does not make position grow at a constant rate.
3. **A different starting point.** With x₀ = 2, v₀ = 1 and a = 2, at 4 s the position is 22 m and velocity is 9 m/s. The displacement from the start is 20 m.

## Test yourself

1. Set time to 5 s and make the position approximately 20 m; the position tolerance is 1 m.
2. Set time to 4 s and make the velocity within 0.2 m/s of zero.
3. At a time greater than 0.5 s, make the displacement from the starting point less than 0.5 m in magnitude. A stationary object also passes this check; try a reversal for a moving example.

## Intuition

Acceleration says how much velocity changes each second. With initial velocity 2 m/s and acceleration 1 m/s², the velocities at 0, 1 and 2 seconds are 2, 3 and 4 m/s. The object covers more distance in each successive second. The position formula includes both the distance associated with the starting velocity and the extra displacement caused by acceleration.

Choose one direction as positive. Negative velocity means motion in the opposite direction, while negative acceleration means velocity changes toward the negative direction. A positive velocity with negative acceleration first slows, then reverses if that acceleration continues. After reversal, speed increases even though acceleration remains negative. The inset plots position against time, so its slope represents velocity where the curve has not been clipped by the display bounds.

## Formal

For one-dimensional motion with constant acceleration a, $v(t)=v_0+at$ and $x(t)=x_0+v_0t+\tfrac12at^2$. Here x₀ and v₀ are the position and velocity at t = 0. Use consistent units, such as metres, seconds, metres per second and metres per second squared.

Displacement is $\Delta x=x(t)-x_0$, which can be negative. It differs from total distance travelled if the direction changes. The relations $v=dx/dt$ and $a=dv/dt$ connect the quantities; they do not require position, velocity and acceleration to have the same sign.

## Advanced

For constant acceleration, v² = v₀² + 2a(x−x₀) relates velocity to position without time. A stopping-time solution t = −v₀/a requires a nonzero acceleration and a nonnegative time to describe a future stop. It is only a momentary stop if the acceleration continues. At zero acceleration, velocity is constant and position is linear in time, including a horizontal line for an object at rest.

## Derivation

1. Assume the acceleration is constant over the time interval being modeled.
2. Integrate acceleration and choose the integration constant so that velocity at t = 0 is v₀.
3. Integrate velocity and choose the constant so that position at t = 0 is x₀.

## Real world

### Short periods of acceleration

A section of a vehicle's motion may be approximated by constant acceleration. Starting and ending that section generally involves changes in acceleration that this formula does not describe.

### Vertical motion

Near Earth's surface, an object subject only to approximately constant gravity follows this equation with a = −9.81 m/s² when upward is positive. Impact or significant air resistance ends that simple description.
