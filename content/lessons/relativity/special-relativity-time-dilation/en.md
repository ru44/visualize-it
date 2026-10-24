---
title: Time stretching near light speed
summary: >-
  The faster you move relative to someone else, the slower your clock ticks
  from their point of view — barely noticeable at everyday speeds, dramatic
  once you approach the speed of light.
parameters:
  x: speed as a fraction of light speed, v/c
---

## Try it

1. Leave v/c at 0.5 and watch the two clocks: both photons fly at the same speed, but the ship's photon must chase its sliding mirrors along a diagonal, and its tick counter already falls behind yours.
2. Drag the ship (or the slider x) up to 0.9: the diagonal stretches, gamma passes 2.3, and the ship's clock visibly ticks less than half as often as yours.
3. Push x all the way to 0.99 and look at the triangle below: the diagonal is now seven times the mirror gap — the geometry alone forces the ship's clock to tick once for your seven.

## Real-life examples

1. **The fastest human-made spacecraft.** At about 0.00064c, its time dilation is far too small to notice — gamma sits almost exactly at 1.
2. **A particle-accelerator beam.** At half the speed of light, gamma has already climbed to about 1.15 — a measurable, real effect physicists correct for daily.
3. **Cosmic-ray muons reaching the ground.** Produced high in the atmosphere at about 0.98c, muons live so much longer from our point of view that many survive the trip down to Earth's surface.

## Test yourself

1. Push the speed up until gamma reaches about 2 — the clock now ticks twice as slowly.
2. Reach 0.98c, the speed of atmospheric muons.
3. Find a speed where gamma climbs above 5.

## Intuition

A light clock is the simplest clock imaginable: a photon bouncing between two mirrors, one tick per round trip. On screen you own the left clock, and an identical one slides by on a ship at the slider's fraction x of light speed. Both photons must fly at the same speed — that is Einstein's rule — but the ship's photon has to chase its moving mirrors along a diagonal, a strictly longer path. At everyday speeds the diagonal is barely longer, which is why you never notice time dilation on a plane or even a rocket.

A longer path at the same speed simply takes longer, so the ship's tick lasts more than yours — and the triangle under the clocks measures exactly how much. That stretching factor is called $\gamma$, and it tells you how many times slower the moving clock ticks compared with a clock that stayed still — at x = 0.98 it is already above 5.

## Formal

The Lorentz factor is $\gamma = \dfrac{1}{\sqrt{1-v^2/c^2}}$, where $v$ is the object's speed and $c$ is the speed of light; it is always at least 1, and it stays close to 1 until $v$ becomes a sizeable fraction of $c$.

A moving clock's elapsed time relates to a resting clock's elapsed time by $\Delta t = \gamma\,\Delta t_0$, so an interval $\Delta t_0$ measured by the moving clock corresponds to a longer interval $\Delta t$ measured by someone at rest — the moving clock, from the outside, appears to run slow.

## Advanced

As $v \to c$, $\gamma \to \infty$, which is one reason nothing with mass can ever actually reach light speed: it would take infinite energy to push $\gamma$, and with it the object's effective inertia, to infinity.

## Derivation

1. Requiring the speed of light $c$ to look the same to every observer forces a correction factor onto time and length, the Lorentz factor $\gamma = \dfrac{1}{\sqrt{1-v^2/c^2}}$.
2. A clock moving at speed $v$ ticks slower by exactly this factor, so its elapsed time relates to a resting clock's by $\Delta t = \gamma\,\Delta t_0$.
3. Because $\gamma \to \infty$ as $v \to c$, time dilation grows without bound as an object's speed approaches the speed of light.

## Real world

### Muons from cosmic rays
Muons created in the upper atmosphere decay in millionths of a second, far too fast to reach the ground at everyday speeds — but at 0.98c, time dilation stretches their lifetime enough that huge numbers of them reach detectors at sea level.

### GPS satellites
Though their orbital speed is a tiny fraction of light speed, GPS satellites move fast enough that engineers must include special-relativistic time dilation, alongside the opposite gravitational effect, in every position calculation.

### Particle accelerators
Beams at facilities like CERN reach speeds where gamma exceeds a thousand, letting physicists watch unstable particles survive thousands of times longer than they would at rest.

### Why astronauts age very slightly slower
Astronauts on the International Space Station move fast enough that, after months in orbit, they return a few milliseconds younger than people who stayed on Earth — a real, measured example of this effect.
