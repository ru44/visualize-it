---
title: Lorentz force and cyclotron motion
summary: >-
  A moving charge in a magnetic field feels a force perpendicular to its
  velocity — it steers the particle without ever speeding it up, bending
  straight lines into circles.
parameters:
  q: charge q
  v: speed v
  B: magnetic field B
  E: electric field E
variables:
  - 'the particle''s charge, in multiples of the elementary charge'
  - the particle's speed
  - 'magnetic field strength, into the screen when positive'
  - 'uniform electric field strength, pointing up the screen'
---

## Intuition

With E off, the particle traces a perfect circle — the magnetic force only ever turns the velocity, never lengthens or shortens it, because $\mathbf{v}\times\mathbf{B}$ is always perpendicular to $\mathbf{v}$. Set $q=0$ and the force vanishes: no charge, no push, a straight line.

Flip the sign of $q$ or of $B$ and the particle curves the other way — the trail (its fading history) traces the mirror circle. Turn on $E$ and the circle stops closing on itself: the constant sideways push adds a steady drift on top of the circular motion, sketching a looping, drifting path.

## Formal

The full electromagnetic force is $\mathbf{F} = q\mathbf{E} + q\mathbf{v}\times\mathbf{B}$. The magnetic term has magnitude $qvB\sin\theta$ and points perpendicular to both $\mathbf{v}$ and $\mathbf{B}$.

With $\mathbf{E}=0$, the speed is constant (magnetic force does no work: $\mathbf{F}\cdot\mathbf{v}=0$), so the particle moves in a circle of radius $r = mv/(|q|B)$ with period $T = 2\pi m/(|q|B)$ — independent of speed.

## Advanced

A velocity selector balances $qE = qvB$, passing only particles with $v = E/B$ undeflected regardless of charge or mass — the basis of mass spectrometry once the selected beam curves in a separate magnetic region and $m = qBr/v$ is read off from the radius.

## Derivation

1. The magnetic force is always perpendicular to the velocity.
2. A force perpendicular to v does no work, so speed — and hence the force magnitude — stays constant: uniform circular motion.
3. Set the magnetic force equal to the centripetal force required for a circle of radius r.

## Real world

### Mass spectrometers
Ions of different mass-to-charge ratio curve with different radii in a known B, revealing their mass.

### Auroras
Charged solar-wind particles spiral along Earth's magnetic field lines toward the poles, exciting the atmosphere to glow.

### Velocity selectors
Crossed E and B fields pass only particles at one speed, $v=E/B$, used to prepare particle beams.

### Cyclotrons and mass spectrometers
Particle accelerators use the fact that the cyclotron period is independent of speed to keep particles in sync as they spiral outward.
