---
title: Gravitational lensing
summary: Massive objects bend passing light, so we can spot hidden mass by how it distorts the view behind it.
parameters:
  M: lens mass M
  offset: source position
variables:
- 'the Einstein radius: how big the ring of bent light appears, in arcseconds'
- the lens mass, in the units the picture uses
- the angle a light ray bends as it passes the lens
- the closest distance the ray passes from the lens's center
---

## Try it

1. Drag «source position» toward 0. The smeared images of the background galaxy pull together into a ring.
2. Raise «lens mass M». The ring grows, since a heavier lens bends light through a wider angle.
3. Move «source position» away from 0 again. The ring breaks into separate arcs on either side of the lens.

## Real-life examples

1. **A single foreground star.** A light lens of mass 1, with the background source well off-center, bends light just enough to shift its image slightly (microlensing).
2. **A perfectly aligned quasar.** With the source position at 0, a lens of mass 4 produces a full, unbroken ring of light.
3. **A massive galaxy cluster.** A lens of mass 8, slightly off-center, stretches background galaxies into long, bright arcs.

## Test yourself

1. Line the source up with the lens to make a complete Einstein ring.
2. Set the lens mass so the ring's radius is about 0.3.
3. Build a lens heavier than 8 and see how wide its ring grows.

## Intuition

During a solar eclipse in 1919, astronomers photographed stars near the Sun's edge and found their positions shifted by about 1.75 arcseconds — a tiny angle, smaller than a coin looks from two kilometres away. That shift was starlight bending around the Sun's gravity, exactly as Einstein had predicted a few years earlier.

Drag «lens mass M» up and the picture bends the background galaxy's light more sharply, spreading its image into arcs. Slide «source position» to 0 and those arcs close into a full ring, called an Einstein ring, because the lens, source, and observer all line up in a straight row.

## Formal

A ray passing a mass $M$ at closest distance $b$ bends by an angle $\alpha = 4GM/(c^2 b)$, where $c$ is the speed of light and $G$ is Newton's gravitational constant. When the source sits directly behind the lens, geometry forces the bend angle to match the ring's angular radius, $\theta_E \approx \alpha$.

Solving that condition self-consistently shows the Einstein radius grows with the square root of the lens mass. In the units this picture uses, that comes out to $\theta_E = 0.12\sqrt{M}$, so a heavier lens always makes a bigger ring.

## Advanced

The full lens equation also depends on the distances between observer, lens, and source, which is why real Einstein radii are usually a fraction of an arcsecond for stars but several arcseconds for galaxy clusters. Because the bending only depends on mass, not on whether that mass gives off light, lensing works even when the lens is made almost entirely of dark matter.

## Derivation

1. A beam of light grazing a mass at some closest distance is deflected by an angle set by that mass and how close the beam passes.
2. When the source, lens, and observer line up exactly, that bend angle has to equal the angular radius of the ring the observer sees.
3. Solving the geometry for that radius gives a simple rule: the ring grows with the square root of the lens mass.

## Real world

### The Bullet Cluster
Two galaxy clusters collided, and lensing maps show most of the mass sitting apart from the glowing hot gas — strong direct evidence that dark matter exists and barely interacts with itself.

### Weighing galaxy clusters
Astronomers map dark matter in clusters by measuring exactly how much they distort the galaxies behind them.

### Hunting for exoplanets
A star's gravity can briefly brighten a background star as it passes in front, a trick called microlensing that has revealed planets too faint to see directly.

### Testing Einstein in 1919
Arthur Eddington's eclipse expedition measured starlight bending around the Sun, giving general relativity its first strong observational proof.
