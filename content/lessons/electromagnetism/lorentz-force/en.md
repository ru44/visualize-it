---
title: Lorentz force and cyclotron motion
summary: >-
  This is how MRI scanners sort atoms and mass spectrometers weigh molecules:
  a magnetic field steers a moving charged particle without ever speeding it
  up.
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

## Try it

1. Picture an electron, curving inside the magnetic field of an old CRT television tube.
2. Watch the particle with «electric field E» set to 0. It traces a perfect circle, over and over.
3. Drag «charge q» from positive to negative. The particle now curves the other way around.

## Real-life examples

1. **An electron beam in an old CRT television.** A negative charge moving at 6 (×10⁵ m/s) through a 1 T field curves in a circle, which is how the beam gets steered onto the screen.
2. **A proton in a mass spectrometer.** A positive charge moving at 8 (×10⁵ m/s) through a 1.5 T field curves too, and how tightly it curves reveals its mass.
3. **A velocity selector.** With crossed fields, a 1 T magnetic field and a 3 (×10⁵ V/m) electric field, only particles moving at exactly 3 (×10⁵ m/s) travel straight through undeflected — everything faster or slower gets pushed aside.

## Test yourself

1. Tune the charge, speed, and field so the magnetic force is about 5 × 10⁻¹³ N.
2. Build a velocity selector: with the magnetic field on, tune the electric field so particles moving at your chosen speed pass straight through.
3. Now tune the sliders so the magnetic force drops to a much gentler 1 × 10⁻¹⁴ N.

## Intuition

Picture an electron curving inside the magnetic field of an old CRT television tube. With «electric field E» set to 0, the particle traces a perfect circle: the magnetic force only ever turns its direction, never speeds it up or slows it down, because the push is always sideways to the motion. Set «charge q» to 0 and the force vanishes entirely — no charge, no push, just a straight line.

Flip the sign of $q$ or of $B$ and the particle curves the other way, tracing the mirror-image circle. Turn on $E$ and the circle stops closing on itself: a steady sideways push now adds a drift on top of the circular motion, sketching a looping, wandering path — this is exactly how a velocity selector works, letting only one speed through in a straight line.

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
