---
title: Sampling and aliasing
summary: >-
  A continuous signal can be rebuilt perfectly from its samples only if you
  sample fast enough; sample too slowly and a fake, lower frequency appears
  in its place.
parameters:
  f: f — signal frequency
  fs: f_s — sampling rate
variables:
  - f — the frequency of the signal being sampled, in cycles per second (Hz)
  - f_s — the sampling rate — how many samples are taken every second
  - T_s — the sampling period, the time gap between one sample and the next
---

## Intuition

Dots mark where the signal is actually measured, and the smooth curve behind them is what gets reconstructed from those dots alone. Drag f_s down toward twice f and the dots grow sparse; push it below that line and the reconstructed curve locks onto a slower wave that was never really there.

That fake slow wave is the same trick behind the wagon-wheel effect in old films: a camera "samples" a spinning wheel a fixed number of times per second, and if the wheel turns close to a whole number of times between frames, it looks like it is barely moving or even spinning backward.

## Formal

The sampling (Nyquist) criterion says a signal of frequency f is recoverable only if $f_s > 2f$; the samples themselves are just points on the wave, $x(t) = \sin(2\pi f t)$, read off at fixed time steps.

Sample below that rate, $f_s < 2f$, and the true frequency f is indistinguishable from a lower "alias" frequency that fits the very same sample points — that alias is exactly the slow wave the reconstruction locks onto.

## Advanced

Because aliasing folds any frequency above $f_s/2$ down into the band below it, every real sampling system places an anti-aliasing low-pass filter before the sampler to remove energy above $f_s/2$ first — filtering after sampling can no longer tell the alias from the real thing.

## Derivation

1. Sampling every $T_s$ seconds turns the continuous wave into a list of numbers, one per step.
2. Each sample is just the signal's value at that instant, spaced $T_s$ apart.
3. When the sampling rate falls below twice the signal frequency, those numbers also fit a slower wave, and the reconstruction cannot tell which one was real.

## Real world

### Why CDs sample at 44.1 kHz
Human hearing tops out near 20 kHz, so CDs sample comfortably above twice that, at 44.1 kHz, with room to spare for a gentle anti-aliasing filter.

### The wagon-wheel effect
Wheels and propellers in video appear to spin slowly, stop, or reverse whenever their rotation rate lines up with the camera's frame rate — the same aliasing, in rotation instead of time.

### Digital cameras and moiré
A camera sensor sampling fine repeating patterns (a striped shirt, a distant roof) without enough resolution turns them into false colours and wavy bands — spatial aliasing instead of temporal.

### Oversampling in audio converters
Modern digital-to-analogue converters sample far above the Nyquist minimum on purpose, which pushes aliasing artefacts to frequencies easy to filter out cheaply.
