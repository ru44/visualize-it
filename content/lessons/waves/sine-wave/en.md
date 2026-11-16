---
title: Travelling wave
summary: 'Read a travelling sine wave as a changing displacement: amplitude sets its height, wavelength its spacing, and frequency its rhythm.'
parameters:
  A: 'A — displacement amplitude'
  L: 'L — wavelength λ'
  f: 'f — cycles per second'
  phi: 'φ — initial phase'
  x: 'x — observation position'
  t: 't — time'
variables:
  - 'largest displacement from equilibrium'
  - 'distance between successive crests'
  - 'cycles per second at a fixed position'
  - 'constant phase offset in radians'
  - 'speed of the travelling pattern'
---

## Try it

1. Set A = 1.5, L = 4 m, f = 0.4 Hz and φ = 0. Start the animation. At a fixed x, the marker moves up and down while crests travel right.
2. Pause and change L from 4 m to 2 m. More cycles fit across the graph. With f unchanged, the selected wave speed falls from 1.6 to 0.8 m/s.
3. Keep A, L and f fixed and change φ. The curve shifts along the horizontal axis without changing its height, spacing or speed.

## Real-life examples

1. **A short, small wave.** A = 0.3, L = 1 m and f = 1 Hz give speed 1 m/s and period 1 s.
2. **A wider wave.** A = 1.5, L = 4 m and f = 0.4 Hz give speed 1.6 m/s and period 2.5 s.
3. **A slow rhythm.** A = 2.5, L = 8 m and f = 0.15 Hz give speed 1.2 m/s and period about 6.67 s. These are mathematical examples, not measured ocean waves.

## Test yourself

1. Set frequency and wavelength for a speed of 1 m/s.
2. Keep speed within 0.05 m/s of 1 m/s while making wavelength at least 6 m.
3. Make wavelength less than 3 m and speed greater than 2 m/s.

## Intuition

The graph is a snapshot of displacement along a line. Its horizontal axis is position, not time. Starting the animation changes the snapshot over time. Following one crest shows how the pattern travels; watching one fixed position shows an oscillation. Those are two different motions.

Amplitude measures the largest displacement from zero. Wavelength measures the distance between successive crests. Frequency counts cycles per second at a fixed position. Phase chooses where the cycle starts. The controls describe an ideal sinusoidal pattern; they do not enforce the material properties of a particular rope or water surface.

## Formal

The model is $y(x,t)=A\sin(kx-\omega t+\varphi)$, where $k=2\pi/\lambda$ and $\omega=2\pi f$. The L control represents λ. With positive k and ω, the minus sign before the time term gives travel toward increasing x.

A crest has constant phase, so $kx-\omega t+\varphi=\mathrm{constant}$. Differentiating along that crest gives $v=\omega/k=f\lambda$. At a fixed position the period is $T=1/f$. The displacement amplitude A does not enter this model's speed formula.

## Advanced

A shifted profile $g(x-vt)$ travels right without changing shape. For suitable differentiable g it solves the one-dimensional wave equation $\partial_t^2y=v^2\partial_x^2y$. General solutions can also include left-travelling terms. Water-surface particles need not move only vertically, and different wavelengths can travel at different speeds; this simple graph does not model those details.

## Derivation

1. Write a sine whose phase depends on position and time; the displayed derivation sets the constant phase offset to zero.
2. Follow a crest by holding its phase constant and differentiating its position with respect to time.
3. Replace angular frequency and wavenumber with their definitions to obtain speed as frequency times wavelength.

## Real world

### Sound in a uniform medium

If propagation speed stays fixed, increasing frequency shortens wavelength. Pitch is related to frequency; perceived loudness also depends on factors beyond amplitude alone.

### Signals and phase

Two periodic signals can have the same frequency and amplitude but different phases. Comparing their phase tells us how their cycles line up.
