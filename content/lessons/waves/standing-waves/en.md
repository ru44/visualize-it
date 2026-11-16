---
title: Standing waves on a string
summary: 'Combine opposite travelling waves to make stationary nodes, and count the loops between a string’s fixed ends.'
parameters:
  A: 'A — amplitude of each travelling wave'
  n: 'n — number of loops'
  f: 'f — oscillation frequency'
  t: 't — time'
  x: 'x — position along the string'
variables:
  - 'string length, fixed at 6 m'
  - 'positive integer counting half-wavelength loops'
  - 'component amplitude and oscillation frequency'
---

## Try it

1. Set n = 2 and A = 1. Start the animation. The ends and midpoint stay at zero while the two loops alternate sides.
2. Increase n from 1 to 6. Count n loops and n + 1 nodes, including the endpoints. Inspect the shape away from instants when the whole string crosses zero.
3. Keep n fixed and change f. Oscillation becomes faster or slower without moving the nodes. The controls let shape and timing vary independently for exploration.

## Real-life examples

1. **One loop.** With n = 1, A = 1.2 and f = 0.5 Hz, the nodes are at 0 and 6 m. The midpoint's maximum displacement is 2.4, and a cycle takes 2 s.
2. **Two loops.** With n = 2, A = 0.8 and f = 0.8 Hz, an additional node appears at 3 m. The largest displacement is 1.6.
3. **Four loops.** With n = 4, A = 0.5 and f = 1.2 Hz, nodes are 1.5 m apart. The largest displacement is 1. These presets are separate patterns, not harmonics of one unchanged physical string.

## Test yourself

1. Select n = 2 to obtain two loops.
2. Select n = 6, the largest harmonic number available in this display.
3. Show three loops oscillating at a frequency below 0.5 Hz.

## Intuition

Send equal sinusoidal waves along a string in opposite directions. Their displacements add. At certain positions they always cancel, creating nodes. Halfway between adjacent nodes they combine to produce the largest motion; these positions are antinodes. The nodes stay in place even though each contributing wave travels.

For a string fixed at both ends, each end must be a node. The number n counts the half-wavelength loops that fit along the length. Here A is the amplitude of each travelling wave, so the largest standing-wave displacement is twice A. A point briefly crossing zero is not necessarily a node: a node stays there throughout the cycle.

## Formal

For length $L=6\ \mathrm{m}$, the displayed shape is $y(x,t)=2A\sin(n\pi x/L)\cos(2\pi ft)$. Its wavelength is $\lambda_n=2L/n$. The integer n is positive, and the maximum antinode displacement is $2A$.

Nodes satisfy $\sin(n\pi x/L)=0$, giving $x=jL/n$ for $j=0,1,\ldots,n$. On a physical ideal string with fixed wave speed v, the allowed frequencies are $f_n=nv/(2L)$. This display's independent n and f controls do not enforce that fixed-speed relation.

## Advanced

A general vibration can combine several string modes; a plucked string need not vibrate in only the fundamental. Loudness does not follow from harmonic number alone. In the 3D view, the string follows the same equation. The nearby circular surface illustrates additional spatial patterns, but its shapes are schematic rather than exact drum modes; exact circular-membrane modes require different radial functions.

## Derivation

1. Write two equal-amplitude sinusoidal waves travelling in opposite directions.
2. Add their displacements using linear superposition.
3. Apply the sine sum identity to separate the position-dependent shape from the time-dependent oscillation.

## Real world

### String instruments

An ideal fixed string has harmonic frequencies that are integer multiples of its fundamental. Real strings can depart from the ideal because of stiffness and other effects.

### Air columns

Standing waves also occur in air columns, but the boundary conditions for pressure and particle displacement differ. An open pipe end is not simply a fixed string end.
