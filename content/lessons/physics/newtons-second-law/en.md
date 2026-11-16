---
title: Newton's second law
summary: 'Relate the net force on a constant-mass object to how quickly its velocity changes.'
parameters:
  F: 'F — net horizontal force'
  m: 'm — mass'
variables:
  - 'sum of external horizontal forces on the block'
  - 'constant mass of the block'
  - 'acceleration: rate of change of velocity'
  - 'velocity, starting from zero in each animation cycle'
charts:
  - title: Velocity and position over time
    xLabel: t (s)
    yLabel: v (m/s) · x (m)
    series:
      - v = (F/m)·t
      - x = ½(F/m)·t²
---

## Try it

1. Set F = 10 N and m = 2 kg. The acceleration is 5 m/s²: velocity increases by 5 m/s each second while this net force acts.
2. Keep m = 2 kg and raise F to 20 N. Acceleration doubles to 10 m/s². Changing a control restarts the block from rest.
3. Keep F = 20 N and raise m to 4 kg. Acceleration returns to 5 m/s². The block's size represents mass; compare the acceleration readout rather than treating arrow lengths as exact measurements.

## Real-life examples

1. **An ideal cart.** A net horizontal force of 20 N on a 15 kg cart gives acceleration 20/15 ≈ 1.33 m/s². Any opposing forces must already be included in that net force.
2. **A light object.** A net force of 50 N on 0.5 kg gives 100 m/s². If it acts for 0.1 s, the velocity changes by 10 m/s; the duration matters too.
3. **A heavier block.** A net force of 30 N on 20 kg gives 1.5 m/s². Starting from rest, after 2 s the velocity is 3 m/s and the displacement is 3 m.

## Test yourself

1. Make the acceleration 2 m/s².
2. Set m = 10 kg and choose a force giving acceleration 1.5 m/s².
3. Make the acceleration approximately 0.5 m/s².

## Intuition

Pushing an object does not directly set its speed. The net force changes its velocity. In this model a 10 N force on a 2 kg block produces an acceleration of 5 m/s². Starting from rest, the block reaches 5 m/s after one second and 10 m/s after two seconds, provided the same net force continues to act.

Net force means the combined effect of all external forces, including any resistance. With the net force fixed, doubling the mass halves the acceleration. With the mass fixed, doubling the net force doubles it. The animation repeatedly starts from rest when the block reaches the screen edge; this reset is for display, not part of the physical law. The lower chart plots velocity and displacement with their different units on a shared numerical scale.

## Formal

For a constant-mass object in an inertial frame, $\mathbf F_{\mathrm{net}}=m\mathbf a$. An inertial frame is one in which an object with zero net force maintains constant velocity. Force and acceleration are vectors, so the relation applies to their components in each direction.

In this one-dimensional example, $a=F/m$, with mass in kilograms, force in newtons and acceleration in metres per second squared. For constant net force and a start from rest at zero position, $v=at$ and $x=\tfrac12at^2$. Zero net force means zero acceleration, not necessarily zero velocity.

## Advanced

For a fixed set of particles, the external net force is the time derivative of total momentum, F = dp/dt. In classical mechanics, a constant-mass particle has p = mv, giving F = ma. Applying momentum balance to a rocket requires accounting for the momentum carried away by expelled material; differentiating the rocket's changing mass alone is not sufficient.

## Derivation

1. For a constant-mass particle in classical mechanics, momentum is mass multiplied by velocity.
2. Newton's second law relates external net force to the rate of change of momentum for the system being followed.
3. With mass constant, take it outside the derivative. The derivative of velocity is acceleration, giving F = ma.

## Real world

### Comparing loads

The same net force gives a loaded cart less acceleration than an empty cart. A comparison of applied pushes must also account for differences in resistance.

### Changing direction

An object can accelerate while keeping the same speed if its direction changes. Circular motion is an example, so “acceleration” means more than speeding up.
