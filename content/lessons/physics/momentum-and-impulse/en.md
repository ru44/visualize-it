---
title: 'Impulse: the area under a force-time pulse'
summary: >-
  A quick, hard push and a slow, gentle shove can deliver the same total change
  in momentum if the areas under their force-time curves match.
parameters:
  Fmax: peak force Fmax
  w: pulse width w
  a: a (start time)
  b: b (end time)
variables:
  - 'force applied during the collision, peaking at $F_{\max}$'
  - how spread out in time the force pulse is
  - 'impulse — the shaded area, equal to the change in momentum $\Delta p$'
---

## Intuition

Make the pulse narrow (small $w$) and tall (large $F_{\max}$): a short, sharp force spike. Now widen $w$ and lower $F_{\max}$ to keep the shaded area roughly the same: a long, gentle push. Both deliver the same impulse — the same change in momentum — even though the peak force is wildly different.

That trade-off is exactly what an airbag or crumple zone exploits: it cannot change how much momentum a crash must remove, but it can spread that same area under the curve over a longer time, which forces the peak force down. Same impulse, much lower peak force on the body.

## Formal

$J = \int_a^b F(t)\,dt = \Delta p = m\Delta v$ — Newton's second law integrated over time.

For a fixed impulse $J$, stretching the duration $\Delta t$ over which it acts lowers the average (and typically the peak) force, since $J \approx \bar F \,\Delta t$.

## Advanced

This is the same area-preserving trade-off seen in signal processing (a narrow, tall pulse and a wide, short one can have equal integral, i.e. equal "DC" content) — in the limit of $w \to 0$ with the area held fixed, the force pulse approaches a Dirac delta function, an idealised instantaneous impulse used throughout mechanics and control theory.

## Derivation

1. Newton's second law, instant by instant.
2. Change variables from time to velocity.
3. Impulse equals the resulting change in momentum.

## Real world

### Airbags and crumple zones
Both extend the collision time to reduce peak force for the same necessary change in momentum.

### Padded flooring and mats
Gymnastics and martial arts mats extend landing time to reduce impact force on joints.

### Rocket thrust
Total impulse delivered by a rocket engine (area under its thrust-time curve) determines the resulting change in the rocket's momentum.

### Follow-through in sports
Extending contact time in a golf or tennis swing changes the force profile while delivering the same or greater impulse.
