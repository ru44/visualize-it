---
title: Quantum tunnelling
summary: >-
  A particle can sometimes appear on the far side of a wall it should not
  have had the energy to cross, simply because its wave leaks through.
parameters:
  V: barrier height ÷ energy V
  w: barrier width w
variables:
  - the chance the particle is found on the far side
  - how fast the wave dies away inside the barrier
  - the height of the energy barrier
  - the particle's own energy
  - Planck's constant divided by 2π
  - the width of the barrier
charts: []
---

## Try it

1. Watch the wave on screen shrink as it crosses the shaded barrier in the middle, then reappear smaller but still present on the far side.
2. Drag «barrier width w» narrower. More wave survives the crossing, and the readout on the far side climbs.
3. Drag «barrier height V» higher instead. The surviving wave shrinks fast, even for the same narrow width.

## Real-life examples

1. **A flash-memory insulating layer.** Electrons tunnel through a thin insulating layer to store or erase a bit, which is how a USB drive keeps data with no power connected.
2. **A scanning tunnelling microscope tip.** Moving the tip a fraction of a nanometre from a surface changes the tunnelling current enormously, which is how the microscope images single atoms.
3. **Fusion inside the Sun's core.** Two protons tunnel through the electrical repulsion between them far more often than their raw energy alone would allow, which is part of why the Sun shines at all.

## Test yourself

1. Make the barrier very thin, with «barrier width w» at 0.05 or below.
2. Make the barrier both tall and thin at once: «barrier height V» at 3 or above while «barrier width w» stays at 0.1 or below.
3. Lower the barrier close to the particle's own energy, with «barrier height V» at 0.6 or below.

## Intuition

Roll a ball at a hill too tall for its speed to climb, and classically it always rolls back down; it can never appear on the other side. An electron's wave, though, does not stop dead at the foot of a barrier: it shrinks sharply while crossing it, but a little of it always leaks out the far side, small yet never exactly zero.

Drag «barrier width w» narrower on screen and watch the far-side wave grow, since there is less barrier for it to shrink across. Drag «barrier height V» higher instead and watch it shrink far faster than width alone would predict, because the barrier's height enters the formula inside a square root, and then again inside an exponential.

## Formal

Inside a barrier taller than the particle's own energy, the wavefunction decays as $\psi \propto e^{-\kappa x}$, with decay rate $\kappa = \dfrac{\sqrt{2m(V_0-E)}}{\hbar}$ set by the barrier height $V_0$, the particle's energy $E$, and its mass $m$.

Across a barrier of width $w$, the transmission probability is roughly $T \approx e^{-2\kappa w}$, so doubling the width squares how small the chance of crossing becomes.

## Advanced

Because $T$ falls off exponentially with both $\kappa$ and $w$, tunnelling is extraordinarily sensitive to distance — the basis of the scanning tunnelling microscope, where a change in tip-surface separation of under a tenth of a nanometre changes the measured current by a factor of ten, giving atomic-scale resolution from an ordinary electric current.

## Derivation

1. This constant measures how fast the wavefunction dies away inside a barrier higher than the particle's own energy.
2. Inside that barrier, the wave's amplitude decays exponentially instead of oscillating.
3. The chance of the particle appearing on the far side falls off exponentially with the barrier's width.

## Real world

### Flash memory and SSDs
Every bit in a flash drive is stored by trapping or removing electrons that reached their cell by tunnelling through a thin oxide layer.

### Nuclear fusion in stars
Protons in the Sun's core fuse at a rate that depends critically on tunnelling through their mutual electric repulsion, without which stars could not shine as they do.

### Radioactive alpha decay
An alpha particle trapped inside a heavy nucleus escapes by tunnelling through the nuclear force holding it in, and the decay rate of an element is set almost entirely by how thick that barrier is.
