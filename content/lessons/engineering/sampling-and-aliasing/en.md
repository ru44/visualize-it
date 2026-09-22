---
title: Sampling and aliasing
summary: >-
  A continuous signal can be rebuilt perfectly from its samples only if you
  sample fast enough — sample too slowly and a fake, lower frequency
  appears in its place.
parameters:
  f: f — signal frequency
  fs: f_s — sampling rate
variables:
  - f — the frequency of the signal being sampled, in cycles per second (Hz)
  - f_s — the sampling rate — how many samples are taken every second
  - T_s — the sampling period, the time gap between one sample and the next
---

## Try it

1. Watch the dots. They mark where the signal is actually measured, and the smooth curve behind them is what gets reconstructed from those dots alone.
2. Drag $f_s$ down toward twice $f$. The dots grow sparse and the reconstruction starts to struggle.
3. Push $f_s$ below that line. The reconstructed curve locks onto a slower, fake wave that was never really there — aliasing.

## Real-life examples

1. **Recording a musical note safely.** Sampling a 5 Hz-equivalent tone at a 40 Hz rate — comfortably more than twice the signal frequency — reconstructs the wave cleanly, the same safety margin CDs use by sampling well above twice the range of human hearing.
2. **The wagon-wheel effect on camera.** A wheel's spin (here, f = 10) sampled by a camera at only fs = 12 frames a second falls well short of the Nyquist rate, so the wheel appears to crawl or spin backward on screen.
3. **A sensor sampled right at the edge.** A signal at f = 8 sampled at fs = 17, just above the strict fs > 2f = 16 minimum, works in theory but leaves little margin — real systems sample well above this edge for safety.

## Test yourself

1. Find $f$ and $f_s$ where $f_s$ is at least twice $f$, but no more than 10% above that minimum — right at the edge of what the sampling rule requires.
2. Create clear aliasing: find $f$ and $f_s$ where $f_s$ is less than 1.5 times $f$.
3. Find $f$ and $f_s$ where $f_s$ sits just below twice $f$ — so aliasing has only just begun.

## Intuition

In old western films, a stagecoach wheel sometimes appears to spin slowly backward even though it is really turning forward fast — the camera only captures a fixed number of pictures each second, and that is not often enough to keep up with the wheel. The dots on screen mark exactly where a signal is measured, taken at a rate of $f_s$ samples per second; the smooth curve behind them is everything that gets rebuilt from those dots alone.

Drag $f_s$ down toward twice $f$, the signal's own frequency, and the dots grow sparse; push $f_s$ below that line and the reconstructed curve locks onto a slower wave that was never really there — the same illusion that makes the film wheel look like it is spinning backward.

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
