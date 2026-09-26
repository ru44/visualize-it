---
title: Signals and noise
summary: >-
  A faint, repeating signal can hide completely inside random noise on
  any one measurement — but average enough repeats and the noise cancels
  while the signal doesn't.
parameters:
  A: A — signal amplitude
  sigma: σ — noise standard deviation
  N: N — number of repeats averaged
variables:
  - A — the amplitude of the true, repeating signal buried in the noise
  - σ — the standard deviation of the random noise on a single measurement
  - N — the number of independent, repeated traces averaged together
  - S — the signal-to-noise ratio of a single trace, before averaging
  - S_N — the signal-to-noise ratio after averaging N traces
---

## Try it

1. With $N$ at 1, look at the single noisy trace — the faint pulse is barely, if at all, visible under the noise.
2. Drag $N$ up toward 16 or so. Watch the bold averaged trace pull cleanly out of the noise while the faint single trace stays just as messy as before.
3. Now raise $\sigma$ (more noise) while keeping $N$ high. Notice how much larger $N$ has to get before the pulse reappears — averaging still works, it just needs more repeats.

## Real-life examples

1. **A single noisy heartbeat reading.** With a genuine 2 mV pulse buried in 4 mV of sensor noise ($S = 0.5$), one reading alone is hopeless — the noise is twice as big as the signal itself.
2. **The same sensor, 16 heartbeats averaged.** Averaging 16 repeats of the same pulse improves the ratio to $S_{16} = 2$ — the pulse is now clearly visible above what's left of the noise.
3. **A fainter signal in noisier conditions, averaged hard.** A 1 mV pulse in 6 mV of noise starts at a poor $S \approx 0.17$, but averaging 100 repeats brings it up to $S_{100} \approx 1.67$ — recoverable, just at the cost of a hundred repeated measurements.

## Test yourself

1. Set up a signal that is completely buried on a single trace ($S$ below 1).
2. Find a combination where averaging brings the signal-to-noise ratio comfortably above 3.
3. Bring the averaged signal-to-noise ratio to about 2.

## Intuition

On any one noisy trace, the random wiggles are just as likely to push the reading up as down at each instant. Add many independent traces together and those random ups and downs start to cancel each other out, a little more completely the more traces you add — while the true signal, being identical every time, adds up the same way each time and never cancels.

That's the whole trick behind signal averaging: it doesn't remove noise from any single measurement, it lets many noisy measurements partially cancel each other's randomness while the one thing they all share in common — the real signal — keeps reinforcing itself. Doubling how much noise partially cancels takes four times as many repeats, not two, because randomness only shrinks as the square root of how much of it you average away.

## Formal

Averaging $N$ independent noisy measurements shrinks the noise's standard deviation to $\sigma_{\text{avg}} = \frac{\sigma}{\sqrt N}$, while the repeating signal's amplitude $A$ is completely unaffected, since it is identical on every trace. A single trace has signal-to-noise ratio $S = \frac{A}{\sigma}$.

After averaging, the ratio becomes $S_N = \frac{A}{\sigma_{\text{avg}}} = S\sqrt N$: the signal-to-noise ratio improves with the square root of the number of repeats, so quadrupling the averages only doubles how clearly the signal stands out.

## Advanced

This $\sqrt N$ improvement assumes the noise on each trace is independent of the others; noise that repeats in the same pattern every trial (for instance, mains electrical hum at a fixed frequency) averages out far more slowly, or not at all, since it isn't random from one trace to the next.

## Derivation

1. Averaging $N$ independent noisy traces shrinks the noise's standard deviation by the square root of how many are combined: $\sigma_{\text{avg}} = \frac{\sigma}{\sqrt N}$.
2. A single trace's signal-to-noise ratio compares the fixed signal amplitude to that single trace's noise: $S = \frac{A}{\sigma}$.
3. Using the shrunk noise level in the same ratio gives the averaged signal-to-noise ratio: $S_N = \frac{A}{\sigma_{\text{avg}}} = S\sqrt N$.

## Real world

### ECG and EEG monitoring
Doctors average many heartbeats or brain-wave cycles together to pull a clean, repeatable waveform out of the muscle and electrical noise that buries any single reading.

### Radio telescopes and pulsar detection
A pulsar's radio pulse can be far fainter than the surrounding cosmic noise on any single rotation; astronomers average thousands of rotations together to reveal a pulse invisible in any one of them.

### Astrophotography image stacking
Photographers stack dozens or hundreds of exposures of the same faint galaxy, averaging away each frame's random sensor noise while the galaxy's real light keeps adding up.

### GPS positioning
A GPS receiver averages many rapid position readings together, since each individual reading is noisy from atmospheric and signal effects, giving a far steadier final position than any single fix.
