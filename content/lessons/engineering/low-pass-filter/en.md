---
title: Low-pass filter
summary: >-
  Below a cutoff frequency a signal passes through almost untouched; above
  it, the same filter squashes it harder the higher it goes.
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

## Try it

1. Watch the curve sit nearly flat near 0 dB at low frequency, then bend over and dive as frequency climbs.
2. Drag $f_c$ (cutoff frequency) up. The whole corner slides right, letting higher frequencies through before the rolloff starts.
3. Now drag $x$ (signal frequency) across the corner near $f_c$. Watch the gain fall and the phase shift grow toward −90°.

## Real-life examples

1. **A bass-focused tone control.** Setting the cutoff near 100 Hz lets a 50 Hz bass note pass through almost untouched, since it sits below the cutoff.
2. **A bandwidth-limited voice channel.** A channel that only needs to carry speech filters out content above roughly 300 Hz in this simplified model, cutting an 800 Hz tone down substantially to save bandwidth.
3. **A speaker crossover.** A woofer's crossover, cutting off around 150 Hz, blocks a 1,000 Hz signal almost entirely, protecting the woofer from frequencies it cannot reproduce well.

## Test yourself

1. Set the signal frequency equal to the cutoff frequency: the gain should drop by exactly 3 dB, the definition of the cutoff.
2. Find a signal frequency more than 10 times the cutoff frequency where the gain has dropped by over 20 dB.
3. Using a cutoff of at least 200 Hz, find a signal frequency that pushes the phase shift to about −75°.

## Intuition

Turn the treble knob down on a stereo, and the shimmer of cymbals fades while the bass line stays just as loud — that knob is quietly setting the cutoff of a filter like this one. The curve on screen plots the gain in decibels against $x$, the signal's frequency: it sits nearly flat near 0 dB at low frequency, then bends over and dives as $x$ climbs past $f_c$, the cutoff frequency set by the slider.

Drag $f_c$ up and the whole bend slides right, letting higher frequencies through before the rolloff starts. Alongside the volume change, the filter also delays the signal — the phase chart below shows that delay growing from near 0° at low frequency toward −90° once the frequency is far above $f_c$.

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
