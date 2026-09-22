---
title: PID control
summary: >-
  A controller watches the gap between what you want and what you have, and
  pushes back on it; a proportional push alone always falls a little short,
  and adding up the leftover error closes that last gap.
parameters:
  Kp: K_p — proportional gain
  Ki: K_i — integral gain
  r: r — target (setpoint)
  tau: τ — plant time constant
  tView: time marker
variables:
  - x — the plant's output, such as a heater's temperature
  - I — the running total of past error, built up over time
  - K_p — proportional gain, how hard the controller pushes for each unit of current error
  - K_i — integral gain, how hard it pushes for each unit of accumulated past error
  - r — the target value the controller is trying to reach (the setpoint)
  - τ — the plant's own time constant, how sluggishly x responds to a push
---

## Intuition

x chases r: drag K_p up and x reacts faster and more strongly to any gap, but with K_i at zero it settles just short of r and stays there — a proportional push shrinks as the gap shrinks, so it never quite finishes the job. That leftover gap is the steady-state error.

Now drag K_i up from zero: the controller starts keeping a running tally of that leftover gap and pushes harder the longer it persists, so x eventually lands exactly on r. Push K_i too high, though, and the controller overreacts to old error, sending x past r, back under, and oscillating before it settles.

## Formal

The plant obeys $\tau\dot{x} = K_p(r - x) + K_iI - x$, where the accumulated error grows as $\dot{I} = r - x$; with $K_i = 0$ this is a first-order system pulled toward a value below r, since the push $K_p(r-x)$ must still balance the $-x$ term even once it has shrunk.

Adding the integral term $K_iI$ keeps growing as long as any gap remains, so the only equilibrium left has $r - x = 0$ exactly — the steady-state error is eliminated by construction, not by luck.

## Advanced

Raising K_p or K_i too far turns this into a lightly damped or even unstable oscillator, since a strong push arriving late in the response overshoots before it can be reversed; real controllers add a derivative term that reacts to how fast the error is changing, damping that overshoot before it grows — a topic for a full PID lesson.

## Derivation

1. With only proportional action, x settles below r because the push $K_p(r-x)$ must still support the plant's own $-x$ term at equilibrium.
2. The integral state I keeps summing the leftover gap $r - x$ for as long as it is nonzero.
3. Equilibrium now requires the full push $K_p(r-x) + K_iI$ to balance $x$, which is only possible once $r - x = 0$.

## Real world

### Cruise control
A car's cruise control is a PID loop on speed: it pushes the throttle harder the further you are below the set speed, and the integral term is what lets it hold an exact speed uphill instead of settling a little slow.

### Home thermostats and HVAC
Better heating and cooling systems use PID rather than simple on/off switching, which is why the temperature settles smoothly at the target instead of oscillating around it.

### Industrial process control
Chemical plants use PID loops on thousands of valves and heaters at once to hold pressure, flow and temperature exactly at their setpoints despite constantly changing conditions.

### Drone stabilization
A drone's flight controller runs a PID loop many times a second on each axis of tilt, pushing motors to cancel any drift from level flight before it is even noticeable.
