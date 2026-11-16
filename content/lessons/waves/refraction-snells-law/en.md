---
title: Refraction and Snell's law
summary: 'Measure light’s angles from the normal and use refractive index to predict its direction across a boundary.'
parameters:
  theta1: 'θ₁ — angle from the normal'
  n1: 'n₁ — index of the incident medium'
  n2: 'n₂ — index of the transmitted medium'
variables:
  - 'refractive indices on the two sides'
  - 'incident and transmitted angles from the normal'
  - 'phase speeds in the two media'
---

## Try it

1. Set n1 = 1, n2 = 1.5 and θ₁ = 40°. The transmitted angle is about 25.4°, measured from the dashed normal line.
2. Keep the indices fixed and reduce θ₁ to 0°. The ray goes straight through. Its speed can still change even though its direction does not.
3. Set n1 = n2. The transmitted ray keeps its direction and the reflected share becomes zero in this ideal model. Then restore different indices and compare the readout as you increase θ₁.

## Real-life examples

1. **Air to water.** With approximate indices 1 and 1.33 and incidence 40°, refraction is about 28.9°. The ray bends toward the normal.
2. **Air to glass.** With indices 1 and 1.5 and incidence 50°, refraction is about 30.7°.
3. **Water to air.** With indices 1.33 and 1 and incidence 30°, refraction is about 41.7°. The ray bends away from the normal. These material indices are representative values.

## Test yourself

1. Set the incidence angle to 45°.
2. Find indices and an incidence angle that give a transmitted angle of 25°.
3. Find settings that give a transmitted angle within 0.5° of 5°.

## Intuition

The normal is an imaginary line perpendicular to the surface. Measure both ray angles from this line, not along the surface. A higher refractive index means a lower phase speed of light. At oblique incidence, entering a higher-index medium turns the transmitted ray toward the normal; entering a lower-index medium turns it away.

A change in speed does not always mean a change in direction: a ray arriving along the normal continues straight. The diagram also includes reflection. Use the reflected-percentage readout to compare energy fractions; the brightness of the drawn lines is adjusted for visibility and is not an exact scale. Refractive index is an optical property, not another name for mass density.

## Formal

Snell's law is $n_1\sin\theta_1=n_2\sin\theta_2$. Both angles are measured from the normal. When transmission is possible, $\theta_2=\arcsin[(n_1/n_2)\sin\theta_1]$.

Refractive index is $n=c/v$, where v is phase speed in the medium and c is vacuum light speed. Frequency stays unchanged across a stationary boundary, so wavelength changes with speed. If $n_1\sin\theta_1>n_2$, no real transmitted ray angle exists: the ideal interface gives total internal reflection.

## Advanced

This model assumes a flat boundary between transparent, isotropic, nonabsorbing media. Matching wave phase along the boundary gives Snell's law. The reflected percentage is the average of the two Fresnel power reflectances for unpolarised light. Reflection depends on polarisation; it is not correct to say that every individual polarisation always has some reflected power at every angle.

## Derivation

1. Match the wave phase along the boundary to relate the sines of the angles to the propagation speeds; use the cross-multiplied form at normal incidence.
2. Express each phase speed as vacuum light speed divided by refractive index.
3. Substitute and rearrange to obtain Snell's law.

## Real world

### Apparent depth

Light from a submerged object changes direction as it leaves water. Tracing the emerging rays backward makes the object appear at a different depth. Looking nearly straight down does not remove the apparent-depth effect for the bundle of rays entering an eye.

### A prism

Refractive index can depend on wavelength, so different colours can emerge in different directions. The current model uses one index per medium and does not separate colours.
