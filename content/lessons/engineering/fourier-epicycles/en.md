---
title: Fourier epicycles
summary: >-
  Chain enough spinning circles together, each one riding on the last, and
  their combined tip traces almost any repeating wave — a square wave
  included.
parameters:
  n: harmonics n
  t: phase t
variables:
  - the height traced by the chain's tip
  - the angle swept since the start of the cycle
  - how many harmonics (spinning circles) are chained together
  - the index of one harmonic, 1, 2, 3, …
---

## Try it

1. Watch the chain of circles spin. Its tip's height, shown by the orange dot on the right, is being traced live into the wave.
2. Raise «harmonics n» from 1 up toward 12. The wobbly curve on the right straightens into sharper, flatter steps — a square wave.
3. Watch a full turn go by. The trace redraws the exact same wave every period, because nothing about the chain has changed except the angle θ.

## Real-life examples

1. **One circle, n = 1.** A single spinning circle only ever traces a smooth sine wave, nothing more complex.
2. **Three circles, n = 3.** Adding two more harmonics already bends the smooth sine into a curve leaning toward a square wave's flat top and steep sides.
3. **Twelve circles, n = 12.** With enough harmonics chained on, the trace looks almost exactly like a square wave, with only a small overshoot right at each edge.

## Test yourself

1. Chain all 12 harmonics together.
2. Drop back down to a single circle, n = 1.
3. With at least 6 harmonics running, catch the trace right at the middle of its cycle.

## Intuition

Picture one wheel spinning on a fixed hub — its rim traces a smooth, gentle sine wave, one hump up and one down per turn. Now bolt a second, smaller wheel to the rim of the first, spinning three times as fast. The point at the tip of that second wheel no longer traces a simple sine wave: it wobbles, because two different spinning motions are added together at every instant. Keep bolting on smaller, faster wheels — five times, seven times, nine times the original speed — and each one nudges the tip's path a little closer to a shape with flat tops and near-vertical sides: a square wave.

This is exactly what raising «harmonics n» does. Every harmonic you add is one more spinning circle in the chain, each with its own fixed speed and a radius chosen just right so that many small nudges, added together, sculpt a wave that no single circle could draw alone.

## Formal

A square wave's Fourier series uses only odd harmonics: $y(\theta) = \dfrac{4}{\pi}\displaystyle\sum_{k=1}^{n} \dfrac{\sin\big((2k-1)\theta\big)}{2k-1}$.

Harmonic $k$ contributes a circle of radius $\dfrac{4}{\pi(2k-1)}$ spinning at $2k-1$ times the base speed; as $n \to \infty$ the sum converges to the square wave everywhere except at its jumps.

## Advanced

The persistent overshoot near each jump, about 9% of the jump's height no matter how large n gets, is the Gibbs phenomenon: more harmonics narrow the overshoot toward the jump but never shrink its height, because a finite sum of smooth sine waves can only approximate — never exactly reproduce — a true discontinuity.

## Derivation

1. Each harmonic k is one circle, with radius $4/(\pi(2k-1))$, spinning $2k-1$ times as fast as the very first circle.
2. Chain the circles tip to base, so each one spins inside the position already reached by the one before it.
3. The final tip's height is $y(\theta)$, the sum of every harmonic at once, and it traces the whole wave as θ sweeps around one full turn.

## Real world

### Audio synthesis
Early electronic synthesizers built complex, buzzy timbres exactly this way: adding pure sine tones at multiples of a base frequency, in carefully chosen amounts.

### Signal processing
Any repeating electrical signal — a power grid's hum, a radio carrier — can be broken into these same spinning-circle components to filter, compress or analyze it.

### JPEG and MP3 compression
Both formats throw away the highest, least-noticeable harmonics first, because human eyes and ears are far less sensitive to fast wiggles than to the overall shape of the wave.

### Vibration analysis
Engineers decompose a shaking bridge or engine's vibration into harmonics to find which spinning part is the dominant cause and needs damping.
