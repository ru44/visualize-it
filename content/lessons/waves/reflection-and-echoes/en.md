---
title: Reflection and echoes
summary: 'An echo makes a round trip. Calculate its delay, and distinguish that timing from the way a rope pulse reflects.'
parameters:
  d: 'd — one-way distance'
  v: 'v — propagation speed'
  endType: 'end — 0: fixed, 1: free'
variables:
  - 'one-way distance to the reflector'
  - 'propagation speed in the medium'
  - 'round-trip travel time'
---

## Try it

1. Set d = 50 m and v = 340 m/s. The calculated round-trip delay is about 0.294 s.
2. Double d to 100 m. The delay doubles. The animation keeps a fixed demonstration pace; read the calculated time rather than timing the animation.
3. Switch endType between 0 (fixed) and 1 (free). The returning rope-displacement pulse changes sign at a fixed end, but not at a free end. The calculated travel time is unchanged.

## Real-life examples

1. **A reflector 34 m away.** With v = 340 m/s, the pulse travels 68 m in total and returns after 0.2 s. Whether a sound is heard as a separate echo also depends on the sound and surroundings.
2. **An underwater reflector.** With d = 750 m and an assumed constant speed of 1500 m/s, the round trip takes 1 s.
3. **An ideal free end.** With d = 5 m and v = 340 m/s, return time is about 0.0294 s. A rope-displacement pulse returns without inversion; this preset does not model sound passing through a doorway.

## Test yourself

1. Choose d and v for a round-trip time of 0.5 s.
2. Choose them for a round-trip time of 2 s.
3. Select a free end and a distance less than 10 m.

## Intuition

Imagine sending a pulse toward a reflector 50 metres away. To return to you it must cover 50 metres out and 50 metres back. The measured delay therefore belongs to a 100-metre journey. Forgetting the return leg would make your estimated distance twice as large.

The pulse shape illustrates displacement on an ideal rope. A fixed end cannot move, so the reflected displacement cancels the incident displacement at the end. This produces an inverted reflected pulse. An ideal free end reflects without that inversion. The illustration shows the trip schematically; it does not show the full overlap of the two pulses at the boundary. Sound pressure and rope displacement are different quantities, so do not apply this sign rule to every wave reflection.

## Formal

For a stationary source and reflector separated by d in a uniform medium, the round-trip path is $2d$. At constant speed v, $t_{echo}=2d/v$, so the reflector distance is $d=vt_{echo}/2$.

For transverse displacement on an ideal string, a fixed boundary requires $y=0$ at the end; an ideal free boundary requires $\partial y/\partial x=0$. These conditions give opposite-sign and same-sign reflected displacement pulses, respectively. They do not change the travel time through the unchanged string.

## Advanced

The reflected quantity matters. For example, an ideal rigid wall reflects a sound-pressure disturbance without pressure inversion, although the normal particle motion must cancel at the wall. Also, a finite pulse has duration: nearby reflectors can produce overlapping echoes. The simple timing model assumes a clearly identifiable return and one known propagation speed. See [HyperPhysics on reflection](https://www.hyperphysics.phy-astr.gsu.edu/hbase/Sound/reflec.html).

## Derivation

1. Divide the outward distance by speed: $d/v$.
2. The return leg has the same distance and speed, so it also takes $d/v$.
3. Add the two times to obtain $t_{echo} = 2d/v$.

## Real world

### Echo ranging

Sonar estimates a reflector's distance from a sound pulse's round-trip time. Converting time to distance requires a suitable sound-speed estimate.

### Waves on a string

A pulse on a stretched string illustrates the difference between fixed and free boundary conditions. Its vertical displacement is not a graph of sound pressure.
