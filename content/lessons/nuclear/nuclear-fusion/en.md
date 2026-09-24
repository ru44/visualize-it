---
title: 'Nuclear fusion: beating the Coulomb barrier'
summary: Two nuclei push each other away the instant they get close, so only enough heat and enough crowding ever bring them close enough to fuse — the same two knobs the Sun and every fusion reactor turn up.
parameters:
  temperature: temperature
  confinement: confinement
  step: time
variables:
  - the permittivity of free space, a fixed constant in the Coulomb force
charts: []
---

## Try it

1. Watch the blue nuclei drift and bounce inside the box, pushed apart by their own electric charge.
2. Drag "time" forward at a low temperature. Nuclei bounce off each other from a distance and almost never touch.
3. Raise "temperature" and run again. Faster nuclei punch closer together, and a ring occasionally flashes where two of them fuse.

## Real-life examples

1. **Hydrogen gas at room temperature.** Nuclei drift lazily apart, and their mutual repulsion easily keeps them from ever touching.
2. **Inside a tokamak.** Nuclei are heated to tens of millions of degrees and squeezed into a small ring by magnets, so close encounters happen often enough to fuse.
3. **The Sun's core.** Immense heat and the crushing weight of the whole Sun above keep hydrogen nuclei fusing steadily for billions of years.

## Test yourself

1. Keep "temperature" below 1 and "confinement" below 0.5, then run to time 80 or beyond. Fusion events should stay rare.
2. Raise "temperature" above 3 and "confinement" above 0.8, then run to time 80 or beyond. Several fusion events should appear.
3. Run all the way to time 150 and count how many nuclei are still left.

## Intuition

Every nucleus in the box carries a positive charge, so any two of them push each other away the instant they get close — the same push that keeps your fingers from passing through a tabletop, just far stronger up close. Left slow and spread out, nuclei bounce off that repulsion from a comfortable distance and never so much as touch. Speed them up, though, and each nucleus carries enough momentum to keep closing in even as the repulsion fights back harder the closer it gets, like a ball rolling determinedly up a steepening hill.

Only a nucleus fast enough eventually gets close enough to fuse, and "fast enough" is exactly what a higher temperature means at the scale of atoms. Squeezing the same nuclei into a smaller box, meanwhile, doesn't change how fast any single one moves, but it does mean far more close encounters happen every second, simply because there is less room to avoid one another. A working fusion reactor needs both knobs turned up together: hot enough to have a real chance of beating the repulsion, and dense enough that a real chance happens often.

## Formal

Two nuclei of charge $q_1$ and $q_2$ separated by a distance $r$ repel with a Coulomb force $F = \frac{q_1 q_2}{4\pi\varepsilon_0 r^2}$, which grows without bound as $r$ shrinks toward zero.

A nucleus of mass $m$ and speed $v$ carries kinetic energy $E_k = \tfrac12 m v^2 \propto T$, and only gets close enough to fuse once $\tfrac12 m v^2 \ge \frac{q_1 q_2}{4\pi\varepsilon_0 r}$ — comparing that kinetic energy against the Coulomb repulsion at the fusion distance sets the temperature a reactor needs.

## Advanced

Quantum tunnelling lets some nuclei fuse even without quite enough classical energy to clear the barrier, which is why the Sun's core, at "only" about 15 million kelvin, manages any fusion at all — a purely classical calculation at that temperature would predict almost none. The Lawson criterion combines temperature, density and how long a plasma stays confined into a single product that a reactor must clear before it produces more energy than it consumes.

## Derivation

1. The repulsion between two same-signed charges follows an inverse-square law, exactly like gravity but pushing apart instead of pulling together.
2. Average kinetic energy scales directly with temperature, so a hotter gas has faster-moving, harder-hitting nuclei.
3. Setting kinetic energy equal to the Coulomb repulsion gives the closest distance two nuclei can reach classically — hotter nuclei reach closer, nearer to the range where the strong nuclear force can finally take over.

## Real world

### The Sun and every other star
Stellar cores fuse hydrogen into helium continuously, and the outward push of that fusion energy is the only thing holding a star up against its own gravity.

### Tokamaks and stellarators
Magnetic confinement reactors use powerful magnetic fields, not solid walls, to squeeze a plasma hot enough that no material container could survive touching it.

### Inertial confinement fusion
Facilities such as the National Ignition Facility compress a tiny fuel pellet with lasers so fast and so hard that, for a fleeting instant, it reaches fusion conditions on its own.

### Hydrogen bombs
The same physics, run uncontrolled and all at once, releases the fusion energy of a star in a single explosive pulse.
