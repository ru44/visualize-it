---
title: Standing waves on a string
summary: >-
  Two identical waves travelling in opposite directions add up to a pattern that
  does not travel at all — fixed nodes, oscillating antinodes.
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

## Intuition

Let it animate: every point along the string oscillates up and down in place, but some special points — the nodes — never move at all, while others — the antinodes, halfway between nodes — swing with the largest amplitude. Nothing travels left or right; the whole pattern just breathes in and out.

Increase $n$ one step at a time and count the humps: $n$ humps fit exactly between the two fixed, unmoving ends, so $n=1$ has one big hump, $n=2$ has two smaller ones with a new node in the middle, and so on — only these whole-number fits are allowed, because the string must be motionless at both ends.

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
