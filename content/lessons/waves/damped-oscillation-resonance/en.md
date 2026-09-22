---
title: Damped oscillation and resonance
summary: >-
  A swing pushed once loses a little height on every pass and eventually
  stops — but pushed at just the right rhythm instead, it can climb far
  higher than any single push, and this lesson shows both effects together.
parameters:
  A: initial amplitude A
  g: damping rate γ
  w: oscillation angular frequency ω
  x: time t
  F: driving force amplitude F
  w0: natural frequency ω0
variables:
  - damping rate — how fast the envelope decays
  - angular frequency of the free oscillation (main plot)
  - natural frequency and driving amplitude used in the resonance chart
charts:
  - title: 'Resonance: response amplitude vs driving frequency'
    xLabel: driving frequency ω (rad/s)
    yLabel: amplitude
    series:
      - F/√((ω0²−ω²)² + (2γω)²)
---

## Try it

1. Watch the curve. It swings up and down while shrinking toward zero, like a bell that rings and then fades.
2. Raise the slider "damping rate γ" toward 1. The swings now die out almost immediately.
3. Lower γ back toward 0. The swings barely fade at all — they ring on and on, like a struck tuning fork.

## Real-life examples

1. **A guitar string.** A plucked string (amplitude A = 1.5, damping rate γ = 0.06 per second) rings for a long time, because so little energy leaks out with each vibration.
2. **A playground swing.** Pushed once and let go (A = 3, γ = 0.3 per second), a swing rocks a few times before friction and air resistance bring it to a stop.
3. **A car driving over a pothole.** The suspension (A = 2.5, γ = 0.9 per second) is built to stop bouncing within about a second, so the ride feels smooth again quickly.

## Test yourself

1. Make the swings die out almost immediately: set the damping rate γ to at least 0.9 per second.
2. Make the oscillation rock back and forth at 4.5 radians per second.
3. Drive the system at its own natural rhythm: bring the frequency slider x within 0.3 rad/s of the natural frequency ω0.

## Intuition

Push a swing once and let go: each arc is a little lower than the one before, until it stops. The blue curve on screen shows exactly that pattern over time, in seconds along the bottom. It starts at a height of 3 and rocks back and forth while shrinking inside an invisible boundary. Drag the orange point along the curve and watch the short tangent line: it shows how fast the swing is moving at that exact instant. Raise the slider called "damping rate $\gamma$" — how quickly each swing shrinks — from 0.2 toward 0.9, and the same swing now dies out in about a second instead of ten.

Now imagine pushing that same swing over and over, trying different rhythms to see which one builds the highest arc. The second graph plots exactly that: how strongly the system responds, against how fast you push it. Pushing close to the swing's own natural rhythm, $\omega_0$ (its natural frequency, here 3 radians per second), makes the response shoot up far higher than pushing at any other pace — this sudden peak is called resonance. Make $\gamma$ small on the first graph and the peak on the second graph turns tall and narrow, so only one precise rhythm gets a big response. Make $\gamma$ large instead and the peak flattens out, so almost any rhythm works about as well.

## Formal

Free damped oscillation: $\ddot x + 2\gamma\dot x + \omega_0^2 x = 0$ has solution $x(t)=Ae^{-\gamma t}\cos(\omega t)$ (underdamped case, $\gamma<\omega_0$).

Driven steady-state amplitude: $X(\omega) = F/\sqrt{(\omega_0^2-\omega^2)^2 + (2\gamma\omega)^2}$, maximised near $\omega \approx \omega_0$ — sharper and taller the smaller $\gamma$ is.

## Advanced

The resonance peak's width is set by $\gamma$: the "quality factor" $Q = \omega_0/2\gamma$ measures how sharply peaked and long-ringing the resonance is, connecting the time-domain decay envelope seen in the main plot directly to the frequency-domain sharpness seen in the chart — the same $\gamma$ governs both, one of the clearest examples of a time-frequency uncertainty trade-off in physics.

## Derivation

1. Add a damping (friction) term proportional to velocity to the harmonic oscillator equation.
2. Try $x = e^{\lambda t}$; the characteristic equation gives complex roots $\lambda=-\gamma\pm i\omega$ when $\gamma<\omega_0$.
3. Rewrite the sum of sine and cosine as a single decaying cosine with amplitude $A$ and phase $\varphi$.

## Real world

### Bridges
The Tacoma Narrows collapse is a famous case of wind-driven oscillation approaching a structure's resonant frequency.

### Radio tuning
A radio's tuning circuit is a resonant LC oscillator selecting one station's frequency out of many.

### Playground swings
Pumping a swing at its natural frequency builds up amplitude far more effectively than any other rhythm.

### Shock absorbers
Vehicle suspensions are deliberately damped to avoid resonant bouncing over bumpy, periodic road surfaces.
