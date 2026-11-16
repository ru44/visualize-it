---
title: Interference and beats
summary: 'Add two oscillations and see how a small frequency difference produces a slowly changing amplitude.'
parameters:
  f1: 'f1 — first frequency'
  f2: 'f2 — second frequency'
  x: 'x — observation time'
variables:
  - 'frequencies of the two unit-amplitude oscillations'
  - 'absolute frequency difference, the beat rate for nearby frequencies'
---

## Try it

1. Set f1 = 8 Hz and f2 = 9 Hz. The graph shows the summed displacement over four seconds, with an amplitude envelope that repeats every second.
2. Set f2 = 8.2 Hz. The envelope repeats every 5 s, longer than the visible time window. These low frequencies make the graph readable; they are not ordinary guitar notes.
3. Set both frequencies to 8 Hz. The equal-phase waves add to one sine with amplitude 2. Move x to inspect different times; x is time in this lesson.

## Real-life examples

1. **A small mismatch.** Frequencies 8 and 8.2 Hz differ by 0.2 Hz, giving a beat period of 5 s.
2. **A larger mismatch.** Frequencies 6 and 6.8 Hz differ by 0.8 Hz, giving a beat period of 1.25 s.
3. **Widely separated frequencies.** Frequencies 5 and 11 Hz differ by 6 Hz. The sum identity still holds, but the shape no longer has a clearly slow envelope around a much faster oscillation.

## Test yourself

1. Choose frequencies whose difference is 1 Hz.
2. Bring the frequencies within 0.05 Hz of each other; with these slider steps, set them equal.
3. Make their difference at least 5 Hz.

## Intuition

Two oscillations sometimes pull in the same direction and sometimes in opposite directions. When their frequencies are close, their relative timing changes slowly: they reinforce, then partly cancel, then reinforce again. The amplitude grows and shrinks even though each individual wave keeps a constant amplitude.

The blue curve is the signed sum at one observation point, not a sound recording. Its envelope describes the largest magnitude of the rapid oscillations. For equal amplitudes and a small frequency difference, that envelope produces beats. For example, audible tones at 220 and 224 Hz would have a 4 Hz beat rate in this ideal model. The graph uses lower frequencies to show the same arithmetic clearly.

## Formal

Writing time as x to match the graph, $s(x)=\sin(2\pi f_1x)+\sin(2\pi f_2x)$. The sum identity gives $s(x)=2\cos[\pi(f_1-f_2)x]\sin[\pi(f_1+f_2)x]$. Each component has amplitude 1.

The nonnegative amplitude envelope is $E(x)=2|\cos[\pi(f_1-f_2)x]|$. For unequal frequencies its period is $T_b=1/|f_1-f_2|$, so the beat frequency is $f_b=|f_1-f_2|$. Equal frequencies with the displayed equal phase give a constant envelope of 2.

## Advanced

The cosine factor changes sign, but the amplitude envelope uses its absolute value. Both positive and negative cosine peaks therefore correspond to maximum amplitude; zero crossings correspond to minimum amplitude. Linear addition leaves only the two original frequencies in the spectrum. Producing a separate difference-frequency component requires a nonlinear operation such as multiplication or detection. In 3D, two schematic ripple sources include travel delays and distance-dependent amplitudes, so the surface is not the same time trace at every point.

## Derivation

1. Start with the identity that rewrites a sum of two sines as a sine times a cosine.
2. Substitute the phase of each oscillation.
3. The average frequency sets the sine factor, while the frequency difference sets the repeating amplitude envelope.

## Real world

### Tuning by beats

Nearly matching tones can produce audible beats. Slower beats indicate a smaller frequency difference; equal frequency removes this source of beating.

### Electronic mixing

A nonlinear mixer can generate sum and difference frequencies. This differs from simply adding the two signals as the main graph does.
