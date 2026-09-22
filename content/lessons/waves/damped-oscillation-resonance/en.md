---
title: Damped oscillation and resonance
summary: >-
  Friction or resistance drains energy from an oscillator, shrinking its swings
  inside a decaying envelope — but driven at just the right frequency, a weakly
  damped oscillator can still respond enormously.
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

## Intuition

Drag the point along the main curve and watch the tangent: the oscillation still swings back and forth, but each successive swing is smaller than the last, trapped inside the shrinking dashed-like envelope $\pm Ae^{-\gamma t}$. Raise $\gamma$ and the whole thing dies out visibly faster, while the oscillation frequency $\omega$ barely changes.

Now look at the chart: it shows how a driven (pushed) version of this same oscillator responds depending on how fast you drive it. Sweep the driving frequency $x$-axis toward $\omega_0$ and the response amplitude spikes upward sharply if $\gamma$ is small — pushing at exactly the system's own natural rhythm gets an outsized response, the phenomenon of resonance.

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
