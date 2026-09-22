---
title: Standing waves on a string
summary: >-
  A jump rope shaken at one end settles into a shape that does not travel
  anywhere — some points stay still while others swing widely — and how many
  humps appear depends only on how fast you shake it.
parameters:
  A: amplitude A
  'n': harmonic number n
  f: frequency f
  t: time t
  x: position along string x
variables:
  - 'fixed string length, 6 m (both ends held still)'
  - harmonic number — how many humps fit along the string
  - amplitude and frequency of the oscillation
---

## Try it

1. Let it animate. Every point along the string moves up and down in place, but the pattern itself does not travel.
2. Raise the slider "harmonic number n" one step at a time. Count the humps that appear.
3. Watch the still points, called nodes — they mark the two ends and any point where the string barely moves at all.

## Real-life examples

1. **A guitar string's basic note.** Plucked in its simplest shape (harmonic n = 1, amplitude A = 1.2), the whole string swings as one big hump — this is the string's lowest, loudest note.
2. **A string pinched exactly at its middle.** Touching the midpoint forces a still point there (n = 2, A = 0.8), splitting the string into two smaller humps that ring a higher note.
3. **An organ pipe's higher overtone.** Air inside the pipe can also settle into a finer pattern (n = 4, A = 0.5), adding brightness on top of the pipe's basic tone.

## Test yourself

1. Create the second harmonic: get exactly 2 humps with a still point in the middle (n = 2).
2. Push the string to its highest possible harmonic: 6 humps at once (n = 6).
3. Make the string wiggle slowly (frequency below 0.5 Hz) while still showing 3 humps (n = 3).

## Intuition

Shake one end of a long jump rope up and down while a friend holds the other end still, and try different shaking speeds. At most speeds the rope just flails around messily — but at a few special speeds it settles into a clean, repeating shape that seems to breathe in place instead of travelling anywhere. The picture on screen shows exactly this: press play and every point on the blue string moves up and down, yet the overall pattern stays fixed between the two ends. Some points, called nodes, barely move at all; others, halfway between nodes and called antinodes, swing with the largest reach.

Raise the slider "harmonic number n" one step at a time and count the humps: at n = 1 the whole 6-metre string swings as one big hump; at n = 2 it splits into two smaller humps with a new still point in the middle; and so on. Only whole numbers of humps are allowed, because the string must stay motionless at both fixed ends no matter what. The slider "frequency f" controls how fast the pattern breathes in and out, and "amplitude A" controls how far each hump swings — neither one changes how many humps fit.

## Formal

$y(x,t) = 2A\sin(k_n x)\cos(\omega t)$ where $k_n = n\pi/L$, a superposition of a right- and left-travelling wave of equal amplitude.

Nodes occur where $\sin(k_n x) = 0$: $x = 0, L/n, 2L/n, \dots, L$ — always including both fixed ends.

## Advanced

Standing waves are the normal modes of the string: any physically allowed vibration (with both ends fixed) can be written as a superposition $\sum_n c_n \sin(n\pi x/L)\cos(2\pi f_n t + \varphi_n)$, a Fourier series in space at each instant in time — this is the same decomposition that underlies analysing any complex periodic sound as a sum of pure harmonics.

## Derivation

1. Two identical waves travelling in opposite directions.
2. Superpose them (waves add linearly).
3. Sum-to-product identity: the space and time dependence factor apart — a standing pattern.

## Real world

### Musical strings
Guitar and piano strings vibrate in standing-wave harmonics, which determine the note and its overtones.

### Wind instruments
Air columns in flutes and organ pipes form standing waves with nodes and antinodes set by the pipe's open or closed ends.

### Microwave ovens
Microwaves form standing waves inside the cavity, which is why food turntables exist — to avoid cold spots at the nodes.

### Bridge and building resonance
Structures can develop standing-wave-like vibration modes under periodic loading such as wind or footsteps.
