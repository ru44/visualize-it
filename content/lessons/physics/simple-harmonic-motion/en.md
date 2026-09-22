---
title: Simple harmonic motion
summary: >-
  A mass on a spring oscillates with a period that depends only on stiffness and
  mass — never on how far you pull it back.
parameters:
  A: amplitude A
  k: spring constant k
  m: mass m
  x: time t
variables:
  - amplitude — how far the mass is pulled back initially
  - spring stiffness
  - oscillating mass
  - angular frequency of oscillation
---

## Intuition

Let it animate and watch the tangent line and dashed derivative curve: the derivative (velocity) is zero exactly when position is at its extreme (turning around) and largest exactly when position crosses zero (moving fastest through the middle) — position and velocity are a quarter-cycle out of step.

Change $A$ alone and the oscillation swings wider or narrower, but count the time between peaks — it does not change. Now change $k$ or $m$ instead: the period visibly stretches or compresses. Amplitude sets how far it swings; stiffness and mass set how fast it swings, and only stiffness and mass.

## Formal

The equation of motion is $\ddot x + \omega^2 x = 0$ with $\omega = \sqrt{k/m}$ from $F = -kx = m\ddot x$; general solution $x(t) = A\cos(\omega t + \varphi)$.

Period $T = 2\pi/\omega = 2\pi\sqrt{m/k}$ is independent of amplitude $A$ — the defining feature of simple harmonic motion.

## Advanced

Amplitude-independence of the period is special to the exactly linear restoring force $F=-kx$; real springs and pendulums deviate from Hooke's law at large displacement, and their period then does depend slightly on amplitude — the isochronism seen here is an idealisation that clock and metronome designers approximate as closely as possible over their working amplitude range.

## Derivation

1. Hooke's law plus Newton's second law.
2. Try a sinusoidal solution and substitute back; it satisfies the equation for this $\omega$.
3. The period is set entirely by $m$ and $k$, not by $A$ or $\varphi$.

## Real world

### Pendulum clocks and metronomes
Their timekeeping relies on the amplitude-independence of the oscillation period.

### Vehicle suspension bounce
A car body on its springs oscillates with a natural frequency set by spring stiffness and vehicle mass.

### Musical instruments
Strings, reeds and air columns all oscillate approximately harmonically, setting their pitch.

### MEMS sensors
Tiny spring-mass systems in accelerometers and gyroscopes are engineered oscillators governed by this same equation.
