---
title: Simple harmonic motion
summary: >-
  This is why a pendulum clock keeps steady time no matter how far it
  swings, and why every guitar string and car suspension settles into its
  own natural rhythm.
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

## Try it

1. Let it animate and watch the mass swing back and forth on the spring.
2. Drag "amplitude A" wider or narrower. Time the gap between peaks — it stays the same.
3. Now drag "spring constant k" or "mass m" instead. The time between peaks visibly stretches or shrinks.

## Real-life examples

1. **A heavy mass on an industrial spring.** Pulled back 1 m with a 2 N/m spring holding a 3 kg mass, it swings back and forth every 7.7 seconds regardless of how far you pull it.
2. **A stiff car suspension spring.** A stiffer 4 N/m spring with a lighter 0.5 kg load oscillates much faster, completing a cycle in about 2.2 seconds.
3. **A soft, stretchy spring.** A soft 0.3 N/m spring with a 1 kg mass swings slowly, taking nearly 11.5 seconds per cycle — proof that a floppier spring means a slower oscillation.

## Test yourself

1. Make the oscillation period exactly 2π seconds (about 6.28 s).
2. Find a mass of at least 3 kg that still gives a period of about 2π seconds.
3. Make the swing as wide as possible (A = 4 m) while keeping the period under 2 seconds.

## Intuition

Picture a 3 kg mass on a spring with stiffness 2 N/m, pulled back 1 metre and let go. Let it animate and watch the tangent line and the dashed derivative curve: the derivative, its velocity, is zero exactly when the mass is at its farthest point, turning around, and largest exactly when it crosses the middle, moving fastest.

Change "amplitude A" alone and the swing widens or narrows, but time the gap between peaks: it never changes. Now change "spring constant k" or "mass m" instead, and that gap visibly stretches or shrinks. Amplitude sets how far the mass swings; stiffness and mass alone set how fast it swings.

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
