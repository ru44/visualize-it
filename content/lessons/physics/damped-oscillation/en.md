---
title: Damped oscillation
summary: >-
  Pull a mass on a spring and let go with a bit of friction in the system:
  a little friction and it bounces back and forth while slowly dying out,
  a lot of friction and it just creeps back to rest without a single swing.
parameters:
  k: spring stiffness k
  m: mass m
  c: damping c
  x0: starting pull x₀
  t: time
variables:
  - damping ratio ζ
charts: []
---

## Try it

1. Watch the block on the spring, pulled out to "starting pull x₀" and released. Below it, the same position is traced over time.
2. Raise "damping c" a little. The block still swings back and forth, but each swing is smaller than the last.
3. Raise "damping c" much further, well past the block's stiffness and mass. The block stops swinging altogether and just eases back to the middle.

## Real-life examples

1. **A gently bouncing screen door.** With very little damping, a door on a weak spring swings back and forth several times before settling.
2. **A car's suspension, tuned well.** Set close to critical damping, the car body returns to level after a bump in the shortest time possible, with no extra bounce.
3. **A heavy door closer.** With damping well past critical, a fire door eases shut slowly and smoothly, never swinging past closed and slamming back open.

## Test yourself

1. Set the damping ratio below 0.5, so the block clearly swings back and forth several times.
2. Set the damping ratio within 0.03 of exactly 1 — critically damped, the fastest return with no overshoot.
3. Set the damping ratio above 2, so the block creeps back slowly with no swing at all.

## Intuition

A mass on a spring with no friction at all would swing forever, trading energy back and forth between motion and stretch with nothing lost, like the "simple harmonic motion" lesson. Real springs are never quite like that: some energy always leaks out as heat, through air resistance, internal friction in the spring, or a deliberate damper like a shock absorber. Raise "damping c" and watch how much of that leak there is.

With a little damping, the block still swings, but the trace below shrinks a little more with every pass — like a real screen door slowing to a stop. Push the damping high enough and something qualitatively different happens: the block never gets the chance to swing past the middle even once, it just eases back, more and more slowly the more damping you add. Somewhere between those two behaviours sits the fastest possible return with no overshoot at all — the setting engineers usually reach for on purpose.

## Formal

The equation of motion is $m\ddot x + c\dot x + kx = 0$, released from $x_0$ with zero velocity. Its behaviour is controlled entirely by the damping ratio $\zeta = \dfrac{c}{2\sqrt{km}}$.

For $\zeta<1$ (underdamped) the block oscillates inside a decaying envelope; for $\zeta=1$ (critically damped) it returns to zero in the least time with no oscillation; for $\zeta>1$ (overdamped) it returns even more slowly, still without oscillating.

## Advanced

The three regimes correspond to the roots of the characteristic equation $m r^2 + cr + k = 0$: a complex-conjugate pair for $\zeta<1$ (giving the oscillation, at the damped frequency $\omega_d=\omega_0\sqrt{1-\zeta^2}$), a repeated real root for $\zeta=1$, and two distinct real roots for $\zeta>1$. The same three-regime structure, with the same $\zeta<1$/$=1$/$>1$ split, appears throughout physics and engineering — RLC circuits, control-system step responses, and structural damping all reduce to this identical second-order equation.

## Derivation

1. $m\ddot x + c\dot x + kx = 0$, released from $x_0$ with zero velocity
2. $\zeta = \dfrac{c}{2\sqrt{km}}$, the damping ratio
3. $\zeta<1$: swings and shrinks — $\zeta=1$: shortest return, no swing — $\zeta>1$: creeps back

## Real world

### Car and bicycle suspension
A shock absorber is a damper added on purpose; suspension engineers tune it close to critical damping so the ride settles quickly after a bump without feeling either bouncy or sluggish.

### Door closers and drawer dampers
Soft-close drawers and door closers are deliberately overdamped, so they always ease shut slowly and never swing back open.

### Seismometers and structural damping
Buildings and bridges include damping (from materials, joints, or dedicated tuned-mass dampers) specifically to shrink oscillations from wind or earthquakes before they can build up to damaging levels.

### Electrical RLC circuits
A resistor, inductor and capacitor in one loop obey the exact same equation with charge in place of position, so radio and filter circuits are described by the same under/critical/overdamped language.
