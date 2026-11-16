---
title: Diffraction
summary: 'Compare wavelength with slit width to understand spreading, and locate the first minimum when the single-slit formula permits one.'
parameters:
  a: 'a — gap width'
  lambda: 'λ — wavelength'
variables:
  - 'distance between successive wavefronts'
  - 'width of the opening'
  - 'first-minimum angle when λ ≤ a'
---

## Try it

1. Set gap width a = 1 m and wavelength λ = 0.7 m. The estimated first-minimum angle is about 44.4° from straight ahead.
2. Widen a to 4 m while keeping λ fixed. The angle falls to about 10.1°. A wider opening gives a narrower central diffraction peak.
3. Set a = 0.3 m and λ = 0.7 m. The wavelength now exceeds the gap width. The diagram shows broad spreading, but there is no first minimum at a real forward angle in this formula.

## Real-life examples

1. **A wavelength comparable to a doorway.** With a = 1 m and λ = 0.7 m, the ratio is 0.7 and the first-minimum estimate is 44.4°. This illustrates broad spreading; a voice contains many wavelengths.
2. **A small wavelength-to-gap ratio.** With a = 4 m and λ = 0.1 m, the ratio is 0.025 and the angle is about 1.43°. A 0.1 m wavelength is not visible light; the preset illustrates the ratio only.
3. **Equal width and wavelength.** With a = λ = 0.3 m, the limiting first minimum is at 90°. There is no first minimum strictly inside the forward half-plane.

## Test yourself

1. Make gap width equal to wavelength.
2. Make λ/a close to 0.05, within 0.02.
3. Choose a and λ for a first-minimum angle of approximately 30°.

## Intuition

A wave passing through an opening does not always keep travelling as a sharply bounded strip. Contributions from different parts of the opening overlap beyond it. They reinforce in some directions and cancel in others. This spreading and interference form a diffraction pattern.

The important comparison is wavelength divided by opening width. A small ratio gives a narrow central peak; a larger ratio gives broader spreading. The shaded wedge is a guide to the central region, not a boundary beyond which the wave vanishes. The outgoing arcs are schematic. Light diffracts too, but its wavelength is much smaller than an ordinary doorway, so diffraction there is much less obvious than for many sound wavelengths.

## Formal

For a uniformly illuminated single slit in the far-field approximation, the first intensity minima satisfy $a\sin\theta=\lambda$. For $0<\lambda/a\le1$, the positive limiting angle is $\theta=\arcsin(\lambda/a)$. The central peak lies between the corresponding negative and positive angles.

For small ratios, $\theta\approx\lambda/a$ in radians. At $\lambda=a$, the formula places the first minimum at $90^\circ$. For $\lambda>a$, it has no real first-minimum angle. The broad 90° drawing in that case is a display limit, not a calculated zero of intensity.

## Advanced

For this ideal slit, $I(\theta)/I(0)=(\sin u/u)^2$, where $u=\pi a\sin\theta/\lambda$ and the value at u = 0 is defined by its limit. Secondary peaks exist outside the central peak. The 3D scene sums nine discrete sources on a coarse mesh, illustrating superposition rather than accurately solving a continuous slit at every setting. At short wavelengths it can show sampling artifacts.

## Derivation

1. In the far field, contributions from paired parts of the slit cancel at the first minimum when their phase difference is half a cycle; the full-slit path difference is one wavelength.
2. When gap width is much larger than wavelength, the first-minimum angle is small.
3. As the ratio approaches one from below, the limiting angle approaches 90°. Beyond one, the first-minimum formula no longer has a real solution.

## Real world

### Sound around obstacles

Diffraction helps sound reach regions outside a direct line of sight. Reflections and other propagation paths can also contribute.

### Optical resolution

A finite aperture produces diffraction that limits image detail. A circular lens aperture has a different pattern from the single slit modelled here.
