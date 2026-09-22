---
title: Newton's second law
summary: >-
  Push harder and something speeds up faster; push the same object once it's
  heavier and you need much more force for the same effect, which is why
  trucks need bigger engines than small cars.
parameters:
  F: force F
  m: mass m
variables:
  - the net force pushing the block
  - 'the block''s mass, shown by its size'
  - 'the resulting acceleration, F divided by m'
  - 'the block''s velocity, which grows steadily under constant acceleration'
charts:
  - title: Velocity and position over time
    xLabel: t (s)
    yLabel: v (m/s) · x (m)
    series:
      - v = (F/m)·t
      - x = ½(F/m)·t²
---

## Try it

1. Watch the crate. It starts still and speeds up as the arrow pushes it.
2. Raise the slider «force F». The crate reaches the end of the floor much sooner.
3. Now raise «mass m» instead. The same push barely moves the heavier crate. Acceleration = force ÷ mass.

## Real-life examples

1. **Pushing a shopping cart.** A steady 20 N push on a 15 kg cart: it speeds up by about 1.3 m/s every second.
2. **Kicking a football.** A hard kick of 50 N on a 0.5 kg ball gives a huge acceleration, which is why the ball leaves your foot so fast.
3. **Moving a heavy box.** 30 N on a 20 kg box barely gets it going: 1.5 m/s².

## Test yourself

1. Make the crate accelerate at exactly 2 m/s².
2. Set the mass to 10 kg, then find the force that gives an acceleration of 1.5 m/s².
3. Make the acceleration as gentle as 0.5 m/s².

## Intuition

Picture pushing a 15 kg shopping cart with a steady 20 N push — about as hard as a firm shove. Drag the slider "force F" and watch the orange arrow on the crate grow or shrink to match: a bigger push always makes the crate leap off the starting line faster, and you see the effect the moment you move the slider.

Now keep the push the same and drag "mass m" up instead, until the block on screen grows as big as a loaded delivery truck. The same push barely moves it now — the green acceleration arrow shrinks even though the orange force arrow hasn't changed, because the same push now has far more mass to share it with.

## Formal

Newton's second law states that the net force on an object equals the rate of change of its momentum: $F = \dfrac{dp}{dt}$.

For an object of constant mass, momentum is $p = mv$, so $F = m\dfrac{dv}{dt} = ma$ — force equals mass times acceleration.

## Advanced

In general $\mathbf{F} = d\mathbf{p}/dt$; for variable mass (a rocket) the $\dot m$ term matters. Given $\mathbf{F}(\mathbf{x}, \mathbf{v}, t)$ the law is a second-order ODE, so position and velocity at one instant determine the whole motion.

## Derivation

1. Momentum is mass times velocity — a measure of how hard it is to stop something moving.
2. Force is defined as how quickly momentum changes over time.
3. When the mass stays constant it comes out of the derivative, leaving force equal to mass times acceleration.

## Real world

### Cars
A more powerful engine applies more force, so the same car accelerates faster for a given mass.

### Rockets
As a rocket burns fuel its mass falls, so the same thrust produces ever greater acceleration.

### Sports
A heavier shot put needs a much larger push than a light ball to leave the hand with the same acceleration.
