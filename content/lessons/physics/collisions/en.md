---
title: 'Collisions: momentum stays, energy doesn''t have to'
summary: >-
  Two carts always leave a collision with the same total momentum they
  arrived with, but only a perfectly elastic bounce keeps all of the kinetic
  energy too.
parameters:
  m1: cart 1's mass
  m2: cart 2's mass
  e: restitution e
  t: time
variables:
  - cart 1's mass
  - cart 2's mass
  - cart 1's velocity before the collision
  - cart 2's velocity before the collision
  - cart 1's velocity after the collision
  - cart 2's velocity after the collision
  - the restitution coefficient, how bouncy the collision is
charts: []
---

## Try it

1. Press play and watch cart 1 (blue) run into cart 2 (orange) — with «restitution e» at 1 they bounce apart like billiard balls.
2. Drag «restitution e» down to 0. Now the two carts crumple together and leave the collision moving as one.
3. Watch the "KE lost" reading climb as you lower e, while "momentum" stays exactly the same number throughout.

## Real-life examples

1. **Two equal billiard balls, a clean bounce.** Same mass, e = 1: the carts trade velocities completely, just like a head-on shot between two identical balls.
2. **A truck meeting a parked car.** A 12 kg cart barely slows down hitting a 3 kg cart elastically — the light cart shoots off much faster than the heavy one ever moved.
3. **Two train cars coupling.** Equal masses, e = 0: the carts lock together and coast off at a single shared speed, exactly the reading a coupling railcar gives.

## Test yourself

1. Make the collision perfectly inelastic: the two carts should move off stuck together.
2. Make the collision perfectly elastic: the carts should bounce cleanly apart.
3. Make cart 1 at least three times heavier than cart 2, with a nearly elastic bounce.

## Intuition

Push a shopping cart into a parked one and something has to give: momentum, mass times velocity added up over both carts, comes out exactly the same after the crash as before it, no matter how the carts behave on impact. Watch the "momentum" reading in this picture — it never moves, however you drag the sliders.

What does change is how much of the crash's motion survives as kinetic energy. Drag "restitution e" from 1 down to 0 and the two carts go from bouncing apart cleanly to crumpling together and drifting off as one lump; the missing kinetic energy did not vanish, it became heat, sound and bent metal, which is exactly what the "KE lost" reading is counting.

## Formal

Momentum is always conserved in a collision: $m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f}$, where $v_{1i}$ and $v_{2i}$ are the carts' velocities before the impact and $v_{1f}$, $v_{2f}$ their velocities after.

The restitution coefficient $e = \dfrac{v_{2f}-v_{1f}}{v_{1i}-v_{2i}}$ measures how much of the closing speed survives as separating speed after impact; combined with conservation of momentum it fixes $v_{1f} = \dfrac{(m_1-em_2)v_{1i} + (1+e)m_2v_{2i}}{m_1+m_2}$ exactly.

## Advanced

Kinetic energy is conserved only when e = 1; in general the energy lost is $\Delta KE = \tfrac12\mu(1-e^2)(v_{1i}-v_{2i})^2$, where $\mu = m_1m_2/(m_1+m_2)$ is the reduced mass. Real collisions almost always have 0 < e < 1, and e itself depends on the materials involved, not just their masses.

## Derivation

1. Total momentum before the collision equals total momentum after it, for any value of e.
2. The restitution coefficient e compares how fast the carts separate afterward to how fast they approached beforehand.
3. Solving the two equations together gives each cart's velocity after the collision directly from its mass, the other cart's mass, and e.

## Real world

### Car safety engineering
Crumple zones are designed to push e close to 0 in a crash, turning kinetic energy into deformation instead of bouncing the occupants around.

### Newton's cradle
The classic desk toy uses steel balls with e very close to 1, so the swinging ball's momentum passes almost losslessly down the line.

### Particle physics detectors
Physicists read off masses and speeds from how particles scatter in a collision, using the same conservation laws at nearly the speed of light.

### Asteroid impacts
Whether an asteroid strike is closer to elastic or inelastic changes how much energy goes into the crater versus into flinging debris back into space.
