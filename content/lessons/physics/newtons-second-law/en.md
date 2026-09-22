---
title: Newton's second law
summary: >-
  A net force accelerates a mass in proportion to the force and in inverse
  proportion to the mass.
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

## Intuition

Drag left and right on the diagram to change the force $F$. Watch the orange arrow grow, and watch the block leap off the starting line faster and faster — a bigger push means a bigger acceleration, and the effect is immediate.

Now picture the same push on a much heavier block: it grows visibly bigger as you raise $m$. For an identical force it now crawls instead of races, because acceleration is force *shared out* over mass — the green arrow above it shrinks even though the orange arrow behind it has not.

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
