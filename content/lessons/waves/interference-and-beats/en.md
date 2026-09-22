---
title: Interference and beats
summary: >-
  Two tones close in frequency do not sound steady together — they beat,
  swelling and fading at a rate equal to the difference between their
  frequencies.
parameters:
  f1: frequency f1
  f2: frequency f2
  x: time t
variables:
  - the two individual frequencies being combined
  - the beat frequency — how often the combined amplitude swells
---

## Intuition

With $f_1$ and $f_2$ close together, the sum does not look like a clean sine wave — it looks like a fast wiggle trapped inside a slowly swelling and shrinking envelope. Watch the envelope: it grows to twice the single-tone amplitude where the two waves line up (constructive interference), and nearly cancels to zero where they fall out of step (destructive interference).

Pull $f_1$ and $f_2$ further apart and the envelope pulses faster; bring them closer together and the swelling slows down almost to a standstill. The rate of that swelling is always exactly $|f_1-f_2|$ — the beat frequency, independent of how large $f_1$ and $f_2$ themselves are.

## Formal

$\sin(2\pi f_1 x)+\sin(2\pi f_2 x) = 2\cos(2\pi\tfrac{f_1-f_2}{2}x)\sin(2\pi\tfrac{f_1+f_2}{2}x)$; a fast oscillation at the average frequency, amplitude-modulated by a slow cosine.

The amplitude envelope, $|2\cos(2\pi\tfrac{f_1-f_2}{2}x)|$, repeats with frequency $|f_1-f_2|$ — twice per envelope period since it is an absolute value.

## Advanced

Because the ear responds to the envelope's amplitude modulation, not the underlying phase, the perceived beat rate is $|f_1-f_2|$ even though the cosine envelope itself has "frequency" $(f_1-f_2)/2$ — the factor of two comes from the envelope crossing zero (a beat) on both its positive and negative half-cycles.

## Derivation

1. Sum-to-product trigonometric identity.
2. Substitute the two wave phases.
3. A slow envelope at the difference frequency times a fast carrier at the average frequency.

## Real world

### Tuning instruments
Musicians tune by listening for beats between two nearly matched notes and adjusting until the beating slows to zero.

### Radio heterodyning
Mixing two radio frequencies produces beat frequencies used to shift signals to a more convenient frequency for processing.

### Doppler radar
Beat frequencies between transmitted and reflected signals reveal the speed of a moving target.

### Acoustic dissonance
Fast, harsh beating between close, out-of-tune frequencies is part of why certain intervals sound dissonant.
