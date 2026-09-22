---
title: Travelling wave
summary: >-
  Amplitude, wavelength, frequency and phase — four knobs that describe every
  simple wave, from sound to light.
parameters:
  A: amplitude A
  L: wavelength λ
  f: frequency f
  phi: phase φ
  x: watch position x
  t: time t
variables:
  - amplitude — the maximum displacement
  - wavelength — distance between neighbouring crests
  - frequency — oscillations per second at any fixed point
  - phase — where in its cycle the wave starts
  - 'wave speed, always $f\lambda$'
---

## Intuition

Watch the marked point: it only moves up and down, while the pattern slides to the right. A wave carries shape and energy, not material.

Raise the frequency and the point bobs faster; stretch the wavelength and the crests spread out. Do both and the pattern races along — its speed is exactly $f\lambda$: one wavelength forward for every cycle completed.

## Formal

$y(x,t) = A\sin(kx - \omega t + \varphi)$ with $k = 2\pi/\lambda$ and $\omega = 2\pi f$.

A point of constant phase satisfies $kx - \omega t = \text{const}$, so it moves at $v = \omega/k = f\lambda$.

## Advanced

Any $g(x - vt)$ solves the wave equation $\partial_t^2 y = v^2 \partial_x^2 y$; sinusoids matter because the equation is linear, so by Fourier’s theorem every solution is a superposition of them.

## Derivation

1. A sine in space that also advances in time.
2. Follow one crest: its phase stays fixed.
3. Substitute the definitions of $\omega$ and $k$.

## Real world

### Sound
Frequency is pitch, amplitude is loudness; speed is fixed by the air, so higher notes have shorter wavelengths.

### Light and radio
The same relation with $v = c$: your Wi-Fi at 2.4 GHz has a 12.5 cm wavelength.

### AC electricity
Mains voltage is a 50/60 Hz sine; phase differences between voltage and current determine real power.

### Musical strings
Two opposite travelling waves add up to the standing waves that set a string’s notes.
