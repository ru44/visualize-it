---
title: Low-pass filter
summary: >-
  Below a cutoff frequency a signal passes through almost untouched; above it,
  the filter squashes it harder and harder — the same behaviour whether it is
  built from a resistor and a capacitor or from a line of code.
parameters:
  fc: f_c — cutoff frequency
  x: f — signal frequency (Hz)
variables:
  - H — the filter's gain, the ratio of output to input, plotted in decibels
  - f_c — the cutoff frequency, where the output has dropped 3 dB below the input
  - φ — the phase shift between output and input, in degrees
charts:
  - title: Phase shift
    xLabel: frequency (Hz)
    yLabel: phase (degrees)
    series:
      - phase φ
---

## Intuition

The curve sits nearly flat near 0 dB at low frequency, then bends over and dives as frequency climbs past f_c — everything below the corner gets through almost untouched, everything above it gets quieter the higher it goes. Drag f_c up and the whole corner slides right, letting higher frequencies through before the rolloff starts.

This is exactly what a "treble" or "bass" knob does inside a mixer or an amplifier: it is a low-pass (or high-pass) filter whose cutoff you are sliding with the dial, cutting or keeping the higher frequencies in a sound.

## Formal

The gain in decibels is $|H(f)|_{dB} = 20\log_{10}\frac{1}{\sqrt{1+(f/f_c)^2}}$; at $f = f_c$ this works out to about $-3$ dB, the standard definition of the cutoff.

Alongside the amplitude, the filter also delays the signal by a phase $\phi(f) = -\arctan\left(\frac{f}{f_c}\right)$, which grows from $0°$ at low frequency to $-90°$ once $f \gg f_c$.

## Advanced

A single resistor-capacitor stage like this one rolls off at $-20$ dB per decade past $f_c$; cascading several identical stages multiplies that slope (two stages give $-40$ dB/decade), which is exactly how sharper analogue and digital filters are built from simple first-order pieces.

## Derivation

1. The output-to-input power ratio of a single RC stage is $|H(f)|^2 = \frac{1}{1+(f/f_c)^2}$.
2. Converting power ratio to decibels gives $|H(f)|_{dB} = 10\log_{10}|H(f)|^2 = 20\log_{10}|H(f)|$.
3. At the cutoff itself, $f = f_c$, the gain works out to $20\log_{10}\frac{1}{\sqrt{2}} \approx -3$ dB.

## Real world

### RC circuits
A single resistor and capacitor wired together form exactly this filter, with $f_c$ set by their values — see the rc-circuit lesson for how R and C combine into that one number.

### Treble and tone controls
The treble knob on a stereo or guitar amp shifts a low-pass filter's cutoff, letting you dial how much of the high end survives.

### Anti-aliasing before sampling
Every analogue-to-digital converter puts a low-pass filter in front of the sampler to remove frequencies that would otherwise alias into false tones.

### Speaker crossovers
A loudspeaker crossover sends only the low frequencies to the woofer with a low-pass filter, protecting it from high frequencies it cannot reproduce well.
