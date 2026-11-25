---
title: Damped oscillation and resonance
summary: 'Separate two questions: how a free oscillation fades, and how strongly a repeatedly driven oscillator responds.'
parameters:
  A: 'A — initial displacement in the free plot'
  g: 'γ — envelope decay rate'
  w: 'ω — free-plot angular frequency / selected drive frequency'
  x: 'x — time t'
  F: 'F — driving force per unit mass'
  w0: 'ω₀ — natural frequency of the driven model'
variables:
  - 'rate of exponential amplitude decay'
  - 'angular frequency chosen for the free curve and the drive'
  - 'natural angular frequency and driving force per unit mass in the response model'
charts:
  - title: 'Resonance: response amplitude vs driving frequency'
    xLabel: driving frequency ω (rad/s)
    yLabel: amplitude
    series:
      - F/√((ω0²−ω²)² + (2γω)²)
---

## Try it

1. In the main plot, set A = 3, γ = 0.2 and ω = 3. The horizontal coordinate x is time. Move x to inspect displacement and tangent slope at different instants.
2. Raise γ to 0.9. The envelope falls to about 41% of its initial value after 1 s; it has not become zero. Lower γ to 0.06 to see a slower decay.
3. In the response chart, set ω₀ = 3, F = 2 and γ = 0.2. Move ω near 3 rad/s to move the chart's marker near the peak. Here ω selects driving frequency; x still selects time for the main plot and 3D view.

## Real-life examples

1. **Slow decay.** With A = 1.5, γ = 0.06 and ω = 5, the envelope takes about 16.7 s to fall to 1/e of its starting value—beyond the main plot's 12 s window.
2. **Moderate decay.** With A = 3, γ = 0.3 and ω = 1.5, that time is about 3.33 s. The oscillation period is about 4.19 s.
3. **Faster decay.** With A = 2.5, γ = 0.9 and ω = 3, that time is about 1.11 s. These are model parameters, not measured specifications for a car suspension.

## Test yourself

1. Set γ to at least 0.9 per second for faster envelope decay.
2. Set angular frequency ω to 4.5 rad/s.
3. Bring driving frequency ω within 0.3 rad/s of ω₀. Use ω, not the time control x; this is near resonance when damping is small.

## Intuition

A damped free motion loses amplitude over time. The main plot multiplies a cosine by a shrinking exponential. The cosine supplies the repeated changes of direction, while the exponential sets a decreasing bound on displacement. The tangent measures displacement change per second. At t = 0 this particular curve already has a nonzero velocity, so it is not a release from rest.

The smaller chart asks a different question: after repeated sinusoidal driving has settled, how large is the response at each driving frequency? With weak damping, a narrow range near the natural frequency produces a large response. These are two demonstrations with shared controls, not automatically the free and driven motion of one identical oscillator. In 3D the spring shows the driven steady response; its visible amplitude is capped, and the support movement is schematic.

## Formal

The main plot is $q(t)=Ae^{-\gamma t}\cos(\omega t)$ with $t=x$. Its envelope is $Ae^{-\gamma t}$ and its decay time is $\tau=1/\gamma$. Its initial velocity is $q'(0)=-\gamma A$. For this free curve, the corresponding undamped natural frequency is $\sqrt{\omega^2+\gamma^2}$, not necessarily the separate ω₀ control.

For the driven model $q''+2\gamma q'+\omega_0^2q=F\cos(\Omega t)$, steady amplitude is $X(\Omega)=F/\sqrt{(\omega_0^2-\Omega^2)^2+(2\gamma\Omega)^2}$. F is force per unit mass, and the ω control selects Ω. The positive-frequency amplitude peak is $\Omega_{peak}=\sqrt{\omega_0^2-2\gamma^2}$ when $\omega_0^2>2\gamma^2$; otherwise the largest response is at zero frequency.

## Advanced

The derivation below describes a free underdamped oscillator, with damped frequency determined by its natural frequency and damping rate. The main plot instead allows damped frequency and damping to be selected independently. For weak damping, $Q=\omega_0/(2\gamma)$ describes a narrow, strong resonance. Large damping need not leave a resonance peak at a positive frequency. The response chart samples a finite number of frequencies, so a very narrow peak can be under-resolved.

## Derivation

1. Add velocity-proportional damping to the free oscillator equation, with no periodic driving force.
2. Solve the characteristic equation in the underdamped case; the oscillation frequency is smaller than the undamped natural frequency.
3. Combine sine and cosine into a phase-shifted cosine inside the decaying exponential envelope.

## Real world

### A fading vibration

A struck object can lose vibration energy to its surroundings. A damped oscillator is a useful approximation for an isolated vibration mode.

### Driven systems

Periodic forcing can produce a strong response near a system's natural frequency. The response depends on damping as well as forcing strength; a large vibration is not explained by frequency alone.
