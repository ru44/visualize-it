---
title: Polarisation
summary: >-
  Light's electric field wiggles sideways as it travels, and a polarising
  filter only lets through the sideways wiggle lined up with it — which is
  why two filters at right angles block almost all the light between them.
parameters:
  theta: angle between filters θ
variables:
  - the unpolarised light's intensity before either filter
  - the intensity after the first filter
  - the intensity after the second filter
  - the angle between the two filters' axes
---

## Try it

1. Watch the field arrows wiggle in every direction before the first filter, then settle into wiggling one way only after it.
2. Drag the angle slider θ toward 90°. The output brightness fades toward zero as the second filter blocks more and more of the light.
3. Bring θ back toward 0°. The two filters line up and nearly all the light that made it through the first filter now makes it through the second too.

## Real-life examples

1. **Two filters lined up.** With the filters aligned (θ = 0°), almost all the light that passed the first filter also passes the second.
2. **Two filters crossed.** At a right angle (θ = 90°), the classic "crossed polarisers" trick blocks almost all the light between them.
3. **Polarised sunglasses against an LCD screen.** Tilted partway (θ = 45°), a phone or laptop screen — whose light is itself already polarised — visibly dims when viewed through polarised sunglasses at an angle.

## Test yourself

1. Cross the two filters completely.
2. Set the angle so exactly half the light reaching the second filter gets through.
3. Get the two filters nearly aligned, within 20° of matching.

## Intuition

Light's electric field wiggles sideways as it travels forward, like the up-and-down motion of a wave on a rope — except ordinary light wiggles in every sideways direction at once, mixed together. A polarising filter is like a picket fence for that wiggle: it only lets through the part of the wiggle lined up with its own slots, and blocks the rest, so light coming out the other side wiggles in just one direction.

Add a second filter behind the first, and only the part of that already-narrowed wiggle that still lines up with the second filter's slots gets through. Turn the second filter so its slots run the same way as the first, and almost everything that got through the first filter gets through the second too. Turn it to run exactly across the first, at a right angle, and essentially nothing lines up — the light is blocked.

## Formal

After unpolarised light passes a first filter, its intensity is halved, $I_1 = \tfrac{1}{2}I_0$, and it emerges polarised along that filter's axis. A second filter at angle $\theta$ to the first then passes a fraction $\cos^2\theta$ of that intensity, Malus's law: $I_2 = I_1\cos^2\theta$.

Combining the two steps gives the full brightness after both filters as a function of the angle between them alone, $I_2 = \tfrac{1}{2}I_0\cos^2\theta$, which falls smoothly from full transmission at $\theta = 0°$ to zero at $\theta = 90°$.

## Advanced

The sky itself is partly polarised by sunlight scattering off air molecules, strongest at 90° from the Sun; some animals, including bees, can sense this polarisation pattern directly and use it to navigate even when the Sun itself is hidden behind clouds.

## Derivation

1. An unpolarised beam loses half its intensity passing through the first filter, emerging polarised along its axis.
2. Malus's law gives the fraction of that polarised intensity a second filter at angle $\theta$ transmits, $\cos^2\theta$.
3. Multiplying the two steps together gives the full two-filter transmission, $I_2 = \tfrac12 I_0\cos^2\theta$.

## Real world

### Polarised sunglasses
Sunglasses use a vertical polarising filter to block strongly horizontally-polarised glare reflected off water and roads, which ordinary tinted glass cannot do.

### LCD screens
LCD screens generate polarised light directly, which is why viewing one through a second polarising filter (or tilted sunglasses) can dim or blank it out depending on the angle.

### 3D cinema glasses
Some 3D projection systems polarise the left-eye and right-eye images differently and use matching polarised lenses in the glasses so each eye sees only its own image.

### Photography filters
Photographers use polarising filters to cut reflected glare off water and glass and to deepen a blue sky, both effects of blocking strongly polarised light selectively.
