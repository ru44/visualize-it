---
title: PID control
summary: >-
  A controller pushes back on the gap between what you want and what you
  have — and a simple push alone always falls a little short of the goal.
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

## Try it

1. Watch $x$ chase $r$. With $K_i$ at zero, it settles just short of $r$.
2. Drag $K_p$ up. $x$ reacts faster and settles closer to $r$, but a gap always remains.
3. Now drag $K_i$ up from zero. The controller starts closing that last gap, and $x$ eventually lands exactly on $r$ — though push $K_i$ too far and it starts to overshoot and oscillate.

## Real-life examples

1. **A home thermostat.** Modest gains (Kp = 1, Ki = 0.1) bring the room to temperature smoothly and slowly, without any overshoot — comfortable but not fast.
2. **A car's cruise control.** Higher gains (Kp = 3, Ki = 0.5) let the system reach and hold the target speed quickly and precisely, even up a hill, without much overshoot.
3. **A poorly tuned drone stabilizer.** Aggressive gains (Kp = 8, Ki = 1.5) react fast but overshoot and oscillate before settling — exactly the "too much Ki" problem this lesson warns about.

## Test yourself

1. With $K_i$ at zero (proportional-only control), find a $K_p$ that makes $x$ settle at exactly 80% of the target $r$.
2. Find $K_p$, $K_i$ and $\tau$ that make the response critically damped — the fastest settling possible without any overshoot.
3. With $K_i$ above 0.05, find a $K_p$ and $\tau$ combination that makes the response clearly oscillate before settling.

## Intuition

A car's cruise control is set to 100 km/h, but going uphill the engine alone can't quite keep up, and the car settles at 97 km/h and stays there — that lasting gap is exactly what proportional-only control produces. On screen, $x$, the plant's output, chases $r$, the target: drag $K_p$, the proportional gain, up and $x$ reacts faster and more strongly to any gap, but with $K_i$ at zero it always settles just short of $r$.

Now drag $K_i$ up from zero: the controller starts keeping a running tally of that leftover gap and pushes harder the longer it persists, so $x$ eventually lands exactly on $r$ — the cruise control finally holds the exact speed, even uphill. Push $K_i$ too high, though, and the controller overreacts to old error, sending $x$ past $r$, back under, and oscillating before it settles.

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
