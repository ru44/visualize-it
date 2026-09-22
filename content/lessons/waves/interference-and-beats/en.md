---
title: Interference and beats
summary: >-
  Two musical notes that are almost — but not quite — the same pitch don't
  sound steady together; they pulse louder and softer in a rhythm you can
  hear, and this lesson shows why.
parameters:
  f1: frequency f1
  f2: frequency f2
  x: time t
variables:
  - the two individual frequencies being combined
  - the beat frequency — how often the combined amplitude swells
---

## Try it

1. Watch the curve: it wiggles quickly while its overall height swells and shrinks slowly.
2. Raise the slider f2 away from f1. The swelling speeds up.
3. Bring f2 back close to f1. The swelling slows almost to a stop — the two notes now sound like one.

## Real-life examples

1. **Tuning a guitar.** Two strings almost in tune (f1 = 8, f2 = 8.2) swell and fade slowly — a guitarist listens for this and tightens the string until it stops.
2. **Two out-of-tune piano notes.** A bigger mismatch (f1 = 6, f2 = 6.8) beats noticeably faster, which is why it sounds harsher and more obviously "off".
3. **Mixing two radio signals.** Engineers combine a station's frequency with a reference frequency far away (f1 = 5, f2 = 11) to produce a fast beat that is easier to process electronically.

## Test yourself

1. Make the two notes beat exactly once per second (a beat frequency of 1 Hz).
2. Tune the two frequencies so close together that the beating nearly disappears (within 0.05 Hz).
3. Make the beating fast: at least 5 beats per second.

## Intuition

Pluck two guitar strings tuned almost, but not quite, to the same note — say 220 and 224 vibrations per second — and you do not hear one steady tone. Instead the sound swells louder, fades to almost silence, then swells again, four times every second. The graph on screen shows this same effect with slower, easier-to-see numbers: the wiggly blue curve is the sum of two waves at frequencies $f_1$ and $f_2$ (starting at 8 and 9, meaning 8 and 9 cycles per second). Watch the curve's height rise and fall inside a slow, breathing outline — that outline is the beat.

Drag the slider $f_2$ away from $f_1$ and that swelling speeds up; bring them close together and it slows down almost to a standstill. Set $f_1$ to 8 and $f_2$ to 9 and count: the loud-soft cycle happens once every second, matching the gap between them, 1. This gap, $|f_1-f_2|$, is called the beat frequency, and it does not care how high or low the two notes are — only how far apart they sit.

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
