---
title: A particle trapped in a box
summary: >-
  Trap a particle between two walls and only certain wave shapes fit, which
  is why its energy can only take certain values, never any value at all.
parameters:
  n: energy level n
variables:
  - Planck's constant divided by 2π
  - the wavefunction, the shape of the trapped particle's wave
  - the particle's mass
  - the particle's energy
  - the width of the box
  - the energy of level n
charts: []
---

## Try it

1. Look at the wave shape drawn between the two walls of the box on screen: it starts and ends at zero at both walls, like a guitar string pinned at both ends.
2. Raise the slider «energy level n» from 1 to 2. An extra hump appears in the wave, and the energy readout jumps up.
3. Keep raising «energy level n» and watch the wave pack in more humps while the energy climbs faster and faster.

## Real-life examples

1. **Ground state of an electron in a quantum dot.** At level 1 the electron's wave is one smooth hump, its lowest possible energy.
2. **First excited state.** At level 2 the wave gains a second hump and a higher energy, the next rung up the ladder.
3. **A quantum-dot TV pixel tuned to a different colour.** Manufacturers pick the dot's size so a chosen energy jump, and so a chosen colour of light, comes out.

## Test yourself

1. Reach the energy level where the energy readout is nine times the ground-state energy.
2. Push the level to 4 or higher.
3. Reach the energy level where the energy readout is sixteen times the ground-state energy.

## Intuition

Pin a guitar string down at both ends and pluck it: only whole numbers of humps ever fit between the two fixed ends, never one and a half. Trap an electron between two walls instead of a string between two pegs, and the very same rule applies to its wave: only shapes that start and end at exactly zero at both walls are allowed.

Raise the slider «energy level n» and watch the wave on screen gain one more hump each time. Because each extra hump costs increasingly more energy, level 2 is not merely twice as energetic as level 1; the energy climbs with the square of the level number, so higher levels are packed much further apart than the low ones.

## Formal

The time-independent Schrödinger equation, $-\dfrac{\hbar^2}{2m}\psi'' = E\psi$, describes how a particle's wavefunction $\psi$ must curve given its energy $E$ and mass $m$.

Demanding that $\psi$ vanish at both walls of a box of width $L$ allows only the energies $E_n = \dfrac{n^2\pi^2\hbar^2}{2mL^2}$, one for each whole number $n$.

## Advanced

Erwin Schrödinger published this equation in 1926 as the wave-mechanics counterpart to Heisenberg's matrix mechanics from the year before; the two were later shown by Schrödinger himself to be mathematically equivalent, and $\psi$'s squared magnitude was soon interpreted by Max Born as a probability density for where the particle will be found.

## Derivation

1. Rearranging the Schrödinger equation shows the wave's curvature is set by the particle's energy and mass.
2. The wave must vanish at both walls of the box, exactly like a guitar string pinned at both ends.
3. Only shapes with a whole number of half-wavelengths fit that condition, so only certain energies, numbered by n, are ever allowed.

## Real world

### Quantum-dot displays
The colour a quantum dot emits is set by its size, which fixes the energy gap between its trapped-electron levels, letting manufacturers tune red, green and blue pixels from the same material.

### Semiconductor lasers
Electrons confined in a thin semiconductor layer occupy box-like energy levels, and light is emitted when they drop from one level to a lower one.

### Understanding atoms
The particle-in-a-box is the simplest model of confinement; the same wave-fitting idea, made three-dimensional, explains why atoms only ever emit light at certain sharp colours.
