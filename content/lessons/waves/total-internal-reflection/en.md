---
title: Total internal reflection
summary: >-
  Past a critical angle, a ray trying to leave a denser medium cannot refract
  out at all — every last bit of it reflects back inside.
parameters:
  theta1: angle of incidence θ₁
  n1: refractive index of medium 1 (denser)
  n2: refractive index of medium 2 (less dense)
variables:
  - refractive indices of the first and second medium
  - critical angle θ_c
---

## Intuition

With the defaults loaded, $n_1$ is set above $n_2$ — light starts in the denser medium — and the incident ray is already past the point where a refracted ray could exist: notice there is no bent ray crossing the boundary at all, only the reflected one, drawn at full brightness. That is total internal reflection.

Drag $\theta_1$ down and watch the refracted ray reappear once you cross the critical angle threshold, at first skimming almost along the boundary itself and bending closer to the normal as you keep lowering the angle. Push $n_2$ up toward $n_1$ instead and the critical angle readout grows, until at $n_1 = n_2$ every angle transmits and total internal reflection becomes impossible.

## Formal

Snell's law, $n_1\sin\theta_1 = n_2\sin\theta_2$, only has a real solution for $\theta_2$ when $n_1\sin\theta_1 \le n_2$; past that point $\sin\theta_2$ would need to exceed 1, which is impossible, so nothing refracts.

The boundary case defines the critical angle: $\theta_c = \arcsin(n_2/n_1)$, and it only exists when $n_1 > n_2$ — light must start in the denser medium.

## Advanced

Total internal reflection is genuinely total: unlike reflection at an ordinary boundary, which always loses some light to transmission, past $\theta_c$ the reflectance is exactly 1 for both polarizations, with no absorption in an ideal lossless medium. This is what makes it useful for guiding light over long distances with almost no loss, rather than merely redirecting it.

## Derivation

1. Snell's law relates the two angles at any boundary between the two media.
2. At the critical angle the refracted ray would have to skim exactly along the boundary, an angle of 90°, which pins down $\theta_c$ in terms of the indices.
3. Solving for the angle gives the critical angle directly from the ratio of the two refractive indices.

## Real world

### Optical fibres
Light bounces down a glass fibre by total internal reflection off the walls, losing almost none of its intensity over kilometres — the basis of the internet's backbone.

### Diamonds
A diamond's high refractive index gives it an unusually small critical angle, so light entering the top reflects internally many times before escaping, producing its signature sparkle.

### Endoscopes and medical imaging
Bundles of optical fibres carry images out of the body by the same total internal reflection that carries telecom signals.

### Fibre-optic decorative lighting
Light injected at one end of a plastic fibre emerges only where the fibre is scratched or cut, since an intact surface keeps reflecting it internally.
