---
title: Travelling wave
summary: >-
  This is why the pattern of a wave slides forward while the water itself
  only bobs up and down, and why a higher musical note has a shorter
  wavelength.
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

## Try it

1. Let it animate and watch the marked point on the wave move only up and down.
2. Drag "frequency f" up. Watch the point bob faster.
3. Now drag "wavelength λ (L)" wider. The crests spread further apart.

## Real-life examples

1. **A ripple in a bathtub.** A small 0.3 m ripple with a 1 m wavelength, oscillating once per second, travels across the water at 1 m/s.
2. **A wave sent down a jump rope.** Flicking the rope creates a 1.5 m wave with a 4 m wavelength repeating 0.4 times per second, moving down the rope at 1.6 m/s.
3. **An ocean swell.** A slow, tall 2.5 m swell with an 8 m wavelength and a gentle 0.15 Hz rhythm rolls toward shore at just 1.2 m/s.

## Test yourself

1. Make the wave speed exactly 1 m/s.
2. Keep the wave speed at about 1 m/s but stretch the wavelength to at least 6 m.
3. Make the wave speed exceed 2 m/s while keeping the wavelength under 3 m.

## Intuition

Picture a ripple in a bathtub, a small wave 0.3 m tall with crests 1 m apart, repeating once per second. Let it animate and watch the marked point on the wave: it only moves up and down, while the whole pattern slides to the right. A wave carries shape and energy, not the water itself.

Raise "frequency f" and the marked point bobs faster; stretch "wavelength λ" and the crests spread further apart. Do both together and the pattern races along: its speed is exactly frequency times wavelength, one full wavelength forward for every cycle completed.

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
