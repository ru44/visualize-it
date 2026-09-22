---
title: The gravitational-wave chirp
summary: >-
  As two black holes spiral together, their gravitational-wave signal rises
  in both pitch and loudness, producing the rising "chirp" LIGO listens for.
parameters:
  f0: starting frequency f0
  x: time toward merger x
---

## Try it

1. Watch the blue wave. Near x = 0 it oscillates slowly and quietly; drag x toward 1 and both its speed and its height grow.
2. Raise f0. The wave starts out oscillating faster right from the beginning, like a higher starting note.
3. Push x close to 1, the moment of merger. The wave's swings become tall and rapid — the "chirp" astronomers listen for.

## Real-life examples

1. **A GW150914-like merger, mid-signal.** With f0 = 4 and x = 0.5, the wave is partway through its rise in pitch and loudness, much like the first gravitational wave ever detected, in 2015.
2. **A slow pair just before merger.** With f0 = 2 and x = 0.9, the starting note is low but the pair is almost touching, so the wave is already swinging wildly.
3. **A fast pair early in the signal.** With f0 = 8 and x = 0.1, the note starts high but the merger is still far off, so the wave is still fairly calm.

## Test yourself

1. Push x close to the merger, to 0.95.
2. Set the starting frequency f0 to its maximum, 10.
3. Make the wave's envelope, its height, climb above 1.5.

## Intuition

Watch the blue wave as you drag x from 0 toward 1. Near the start it wiggles slowly and stays close to the middle line; the closer x gets to 1, the faster it wiggles and the taller its swings become, like a violin string being squeezed tighter and tighter.

That rising pitch and rising loudness together are called a chirp, and they happen because two orbiting masses lose energy as gravitational waves, spiralling closer and closer together, which speeds up their orbit and strengthens the waves they send out, right up until the instant they merge.

## Formal

As two masses spiral together, their orbital frequency, and so the gravitational-wave frequency, rises as $f(t) = f_0\left(1-\dfrac{t}{t_c}\right)^{-3/8}$, where $t_c$ is the moment of merger and $f_0$ is the frequency at the start of the signal.

The wave's amplitude, or strain, grows alongside the frequency, roughly as $h \propto (t_c-t)^{-1/4}$, so the signal gets both faster and louder as it approaches merger, both quantities plotted together in the curve above.

## Advanced

Both $f$ and $h$ formally diverge, $f, h \to \infty$ as $t \to t_c$, but this post-Newtonian approximation only holds while the two masses are still well separated; once they are close enough to actually merge, the full equations of general relativity, solved numerically, take over.

## Derivation

1. Gravitational waves carry energy away from the orbiting pair, so their separation shrinks and the orbital frequency rises, $f \propto (t_c-t)^{-3/8}$.
2. As the frequency climbs, the wave's amplitude grows too, $h \propto (t_c-t)^{-1/4}$, producing a signal that gets both faster and louder.
3. Both quantities formally blow up, $f, h \to \infty$ as $t \to t_c$, the moment of merger — the sharp, rising "chirp" detectors are built to catch.

## Real world

### LIGO, 2015
The Laser Interferometer Gravitational-Wave Observatory made the first direct detection of gravitational waves, a chirp from two black holes merging over a billion years ago, confirming a hundred-year-old prediction of Einstein's.

### Arms four kilometres long
LIGO's detectors bounce laser light down two 4 km tunnels; a passing gravitational wave stretches one arm and squeezes the other by a distance smaller than a proton, yet the instrument can still measure it.

### Listening, not looking
Unlike a telescope, a gravitational-wave detector "listens": the signal can be converted directly into sound, and scientists can literally hear the chirp of two black holes spiralling together.

### Multi-messenger astronomy
When two neutron stars merged in 2017, LIGO detected the gravitational-wave chirp while telescopes around the world caught the light from the same event, letting astronomers study one cosmic event through two completely different signals at once.
