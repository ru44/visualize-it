---
title: The Doppler effect
summary: 'A moving sound source changes the spacing of arriving wavefronts, so a stationary listener can hear a different frequency.'
parameters:
  f: 'f — emitted frequency'
  vs: 'vs — source speed through the medium'
variables:
  - 'frequency emitted by the source'
  - 'sound speed in the medium, fixed at 343 m/s'
  - 'source speed relative to the medium'
  - 'observer speed relative to the medium; zero here'
  - 'forward, rear and general received frequencies'
---

## Try it

1. Set f = 500 Hz and source speed vs = 0. Both listener readouts equal 500 Hz: no motion means no shift here.
2. Increase vs to 20 m/s. The forward readout becomes about 531 Hz and the rear readout about 472 Hz.
3. Keep vs fixed and double f to 1000 Hz. Both received frequencies double, but their ratios to f stay unchanged. The animated rings are illustrative and do not show each actual sound cycle.

## Real-life examples

1. **A moving tone.** At f = 500 Hz and vs = 20 m/s, a stationary listener directly ahead receives about 531 Hz; one directly behind receives about 472 Hz.
2. **A faster source.** At f = 800 Hz and vs = 35 m/s, the values are about 891 Hz ahead and 726 Hz behind.
3. **A slowly moving source.** At f = 300 Hz and vs = 5 m/s, the values are about 304 Hz ahead and 296 Hz behind. The shift is smaller.

## Test yourself

1. Make the forward frequency about 10% greater than the emitted frequency.
2. Make the rear frequency about 10% less than the emitted frequency.
3. Set the source to the maximum available speed, 40 m/s.

## Intuition

Suppose a source emits one crest and moves forward before emitting the next. The new crest starts closer to the previous crest in front, but farther from the previous crest behind. Each crest still travels at the sound speed relative to the air. The source changes their spacing, not that propagation speed.

A stationary listener directly ahead encounters the compressed crests more often and hears a higher frequency. A listener directly behind encounters the wider spacing and hears a lower frequency. At zero source speed the frequencies agree. The drawing slows and sparsely samples the wavefronts; changing the frequency control changes the numerical readouts without changing the illustrated emission interval.

## Formal

For sound speed $v=343\ \mathrm{m/s}$, emitted frequency f and source speed $0\le v_s<v$, the forward wavelength is $\lambda_{front}=(v-v_s)/f$. A stationary listener directly ahead receives $f_1=fv/(v-v_s)$. Directly behind, $f_2=fv/(v+v_s)$.

For collinear source and observer motion relative to the medium, $f_D=f(v\pm v_o)/(v\mp v_s)$. Choose the numerator plus sign when the observer moves toward the source and the denominator minus sign when the source moves toward the observer; choose each sign independently. Here $v_o=0$. Oblique motion requires the corresponding directional components, rather than simply inserting total speeds.

## Advanced

For source speeds much smaller than sound speed, the fractional shift is approximately the source's line-of-sight speed divided by sound speed. This lesson assumes still, uniform air and constant emitted frequency. Light also exhibits a Doppler shift, but its exact formula follows relativity rather than this sound-in-a-medium formula. Reflection measurements require accounting for both outward and return propagation.

## Derivation

1. The spacing ahead is reduced by the distance the source moves between emissions; divide sound speed by this spacing to find the forward received frequency.
2. The spacing behind is increased by that distance, giving a lower received frequency.
3. A moving observer changes how quickly it meets the fronts; include its speed in the numerator with the appropriate direction sign.

## Real world

### A passing sound source

A steady tone can sound different as its source passes a stationary listener. For a listener beside the path, the line-of-sight motion varies through the pass, so the two axial readouts do not describe every instant.

### Frequency-based motion measurements

Comparing emitted and received frequencies can reveal motion along the line of sight. The conversion depends on the wave and measurement geometry.
