---
title: The uncertainty principle
summary: >-
  Pin a particle down to a smaller spot and its speed becomes wildly less
  certain — nature simply will not let you know both at once.
parameters:
  sx: position spread Δx
variables:
  - the spread in the particle's position
  - the spread in the particle's momentum
  - Planck's constant divided by 2π
charts: []
---

## Try it

1. Look at the bump on screen: its width shows how spread out the particle's position is, and the readout beside it shows the spread in its speed.
2. Drag «position spread Δx» narrower, squeezing the bump. The speed-spread readout climbs.
3. Drag «position spread Δx» wider instead, spreading the bump out. The speed-spread readout falls.

## Real-life examples

1. **A photon loosely located over a wide region.** With a wide position spread, its speed is known fairly precisely.
2. **An electron confined tightly inside an atom.** Squeezed into such a small space, its speed becomes wildly uncertain.
3. **A dust grain, localized fairly precisely.** At an everyday size the uncertainty is there in principle but far too small to ever notice.

## Test yourself

1. Set the speed-spread readout to about 5.
2. Squeeze the bump until the speed-spread readout climbs above 15.
3. Widen the bump until the speed-spread readout drops to about 1.7, as wide as this slider allows.

## Intuition

Squeeze a wave packet into a single, sharp spike and it has a clean, well-defined position — but to build a spike that sharp you must add together waves of many different wavelengths, so its speed becomes almost impossible to pin down. Spread the same amount of wave out over a wide region instead, and it settles into something close to one clean wavelength, giving a well-defined speed but a hopelessly vague position.

Drag «position spread Δx» narrower on screen and watch the bump shrink while the speed-spread readout beside it climbs; drag it wider and watch the opposite happen. The trade is not a flaw of the measuring instrument — the wave simply cannot have both a single sharp position and a single sharp speed at once.

## Formal

The uncertainty principle states that the spread in position $\Delta x$ and the spread in momentum $\Delta p$ obey $\Delta x \cdot \Delta p \geq \dfrac{\hbar}{2}$, where $\hbar$ is Planck's constant divided by $2\pi$.

The narrowest possible wave packet saturates this inequality exactly, giving $\Delta p = \dfrac{\hbar}{2\,\Delta x}$, so squeezing position ever tighter drives the momentum spread toward infinity.

## Advanced

Werner Heisenberg derived this limit in 1927 from the mathematics of Fourier analysis: any wave built to be narrow in position must necessarily be broad in the spread of wavelengths that compose it, and this is a property of waves in general, appearing identically in classical signal processing, not a special quirk of quantum particles alone.

## Derivation

1. No measurement can pin down both position and momentum tighter than this limit allows.
2. The tightest possible wave packet saturates the inequality exactly.
3. Squeezing the packet in space without limit drives its spread in momentum toward infinity.

## Real world

### Electron microscopy resolution
Confining an electron beam tightly enough to image small features unavoidably spreads its momentum, setting a fundamental limit on achievable resolution.

### Laser linewidth
A laser pulse made extremely short in time must contain a correspondingly wide spread of frequencies, the time-energy cousin of the same principle.

### Zero-point energy
Even at absolute zero temperature, a trapped particle cannot sit perfectly still at the bottom of its trap, since that would fix both its position and momentum at once; this leftover jiggle is called zero-point energy.
