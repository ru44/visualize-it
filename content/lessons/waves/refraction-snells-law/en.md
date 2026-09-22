---
title: Refraction and Snell's law
summary: >-
  A ray bends when it crosses into a medium where light travels at a
  different speed — the bend is exact enough to predict with one equation.
parameters:
  theta1: angle of incidence θ₁
  n1: refractive index of medium 1
  n2: refractive index of medium 2
variables:
  - refractive indices of the first and second medium
  - angle of incidence and angle of refraction, both measured from the normal
  - speed of light in the first and second medium
---

## Intuition

Drag the incident ray and watch the shaded strip below the boundary: darkening it raises $n_2$, and the transmitted ray bends harder toward the vertical dashed normal line as it does. Nothing mysterious is happening at the surface itself — the ray only changes direction because the wave in front of it is forced to slow down or speed up as it crosses into the new material.

Push $\theta_1$ toward grazing incidence and watch the readout for the reflected share climb: some light always reflects at a boundary between two different media, and the transmitted ray always bends away from a denser medium and toward a less dense one. At normal incidence ($\theta_1 = 0$) there is no bending at all, no matter how different $n_1$ and $n_2$ are.

## Formal

Snell's law: $n_1 \sin\theta_1 = n_2 \sin\theta_2$, with both angles measured from the normal to the boundary, not from the surface itself.

Refractive index is defined by how much a medium slows light down: $n = c/v$, so a higher $n_2$ means a slower wave and, by Snell's law, a smaller $\theta_2$ — the ray bends toward the normal when entering a denser medium.

## Advanced

Snell's law follows from requiring the wavefronts to stay continuous across the boundary: the two rays must have the same trace speed along the interface, which forces $\sin\theta_1/v_1 = \sin\theta_2/v_2$. It is the same continuity condition that, applied to the full wave equation with boundary conditions on the electric and magnetic fields, also yields the Fresnel reflection and transmission coefficients shown in the readouts here.

## Derivation

1. Matching how fast the wavefronts sweep along the boundary in each medium gives $\sin\theta_1/\sin\theta_2 = v_1/v_2$.
2. Refractive index is defined as $n = c/v$, so each medium's speed is $v_1 = c/n_1$ and $v_2 = c/n_2$.
3. Substituting the speeds turns the ratio into Snell's familiar form, $n_1\sin\theta_1 = n_2\sin\theta_2$.

## Real world

### Apparent depth of a swimming pool
Light leaving an underwater object bends away from the normal as it exits into air, so the pool bottom looks shallower than it really is.

### Rainbows and prisms
A prism refracts different wavelengths by slightly different amounts, fanning white light out into its spectrum of colors.

### Desert mirages
Hot air near the ground has a lower refractive index than the cooler air above it, bending light upward and making the sky look like a puddle on the road.

### A late sunset
Earth's atmosphere refracts sunlight enough that the sun is still visible for a few minutes after it has geometrically dropped below the horizon.
