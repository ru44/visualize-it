---
title: 'Impulse: the area under a force-time pulse'
summary: >-
  This is why airbags and crumple zones save lives — they can't reduce how
  hard a crash pushes overall, but they can stretch that push over more
  time, cutting the peak force on your body.
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

## Try it

1. Watch the shaded pulse under the force-time curve at its default width.
2. Drag "pulse width w" narrower and "peak force Fmax" higher, keeping the shaded area about the same.
3. Now do the opposite: widen "pulse width w" and lower "peak force Fmax". The area, and the impulse, stays about the same.

## Real-life examples

1. **A boxer's punch.** A sharp punch reaches a high peak force (9 N in this simplified model) over a very short pulse (w=0.03 s) — a short, hard hit.
2. **Catching a ball with a padded glove.** Cushioning spreads the same catch over a much longer time (w=0.3 s) with a gentler peak force of just 2 N.
3. **A hard, unpadded collision.** Without any cushioning, the peak force spikes to the maximum (10 N) over an extremely brief pulse (w=0.02 s) — the sharpest, most damaging kind of impact.

## Test yourself

1. Find a peak force and pulse width whose product Fmax·w equals 1.5 — a rough measure of the impulse delivered.
2. Keep the peak force near 5 N but widen the pulse to longer than 0.3 s, turning a sharp hit into a gentle push.
3. Make the pulse both very short (under 0.05 s) and very weak (under 3 N) — a light, quick tap.

## Intuition

Picture a boxer's punch: a high peak force squeezed into a very short pulse, about 30 milliseconds. Drag "pulse width w" narrower and raise "peak force Fmax" to make the shaded pulse tall and thin: a short, sharp force spike, just like the punch.

Now widen "pulse width w" and lower "peak force Fmax" to keep the shaded area roughly the same, like catching a ball with a padded glove instead of bare hands. Both deliver the same impulse, the same change in momentum, even though the peak force is wildly different — which is exactly what an airbag exploits: it cannot change how much momentum a crash must remove, but it can spread that same area under the curve over a longer time, pushing the peak force down.

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
