---
title: Total internal reflection
summary: 'Find the critical angle and the two conditions needed to keep light reflecting inside a higher-index medium.'
parameters:
  theta1: 'θ₁ — incidence angle from the normal'
  n1: 'n₁ — index on the incident side'
  n2: 'n₂ — index on the other side'
variables:
  - 'refractive indices of the incident and second media'
  - 'critical angle, defined for n₁ > n₂'
---

## Try it

1. Set n1 = 1.5, n2 = 1 and θ₁ = 50°. The critical angle is about 41.8°, so the model shows total internal reflection.
2. Lower θ₁ to 40°. A transmitted ray appears. The angle must exceed the critical angle for total internal reflection.
3. Set n1 = n2 = 1.5. The critical-angle readout disappears: there is no lower-index boundary to produce this effect.

## Real-life examples

1. **Core and cladding.** Indices 1.5 and 1.4 give a critical angle of about 69.0°. Incidence at 80° satisfies the condition for total internal reflection.
2. **Diamond to air.** Representative indices 2.42 and 1 give a critical angle of about 24.4°. Incidence at 30° exceeds it.
3. **Water to air.** Indices 1.33 and 1 give about 48.8°. Incidence at 60° exceeds it. These angles are measured from the normal, not from the surface.

## Test yourself

1. Choose n1 > n2 and set θ₁ within 0.5° of two degrees above the critical angle.
2. Set n1 and n2 equal, removing the index difference.
3. With n1 > n2, place θ₁ within 0.5° of the critical angle itself.

## Intuition

When light goes from a higher-index medium to a lower-index one, its transmitted ray bends away from the normal. Increasing the incident angle turns that ray farther toward the surface. At the critical angle, its limiting direction is along the surface. Beyond that angle, no travelling transmitted ray can carry energy away into the second ideal medium.

Two conditions matter together: the light must approach from the higher-index side, and the incidence angle must exceed the critical angle. A large angle alone is not enough. The 3D fibre illustrates repeated guidance using this condition. Its bent path is schematic; it does not calculate the local incidence angle at every real fibre bend.

## Formal

For $n_1>n_2$, set $\theta_2=90^\circ$ in Snell's law. This gives $\theta_c=\arcsin(n_2/n_1)$. Above the threshold, $n_1\sin\theta_1>n_2$, so there is no real transmitted ray angle.

In the ideal lossless model, $\theta_1>\theta_c$ gives power reflectance $R=1$. If $n_1\le n_2$, total internal reflection of this kind cannot occur. Equality at the critical angle is the limiting case, with a grazing transmitted direction; distinguish it from angles strictly above the threshold.

## Advanced

An evanescent field extends a short distance into the lower-index medium even during total internal reflection. Thus “no transmitted ray” does not mean “no field outside.” Another nearby medium can couple energy from that field. Real fibres also have attenuation from absorption, scattering and bends; ideal boundary reflectance is not a promise of lossless transmission over any distance.

## Derivation

1. Start with Snell's law for a ray approaching from the higher-index side.
2. At the limiting angle, the transmitted direction is 90° from the normal.
3. Divide by the incident index and take the inverse sine to obtain the critical angle.

## Real world

### Optical fibres

A core with a higher index than its cladding can guide light. Wave modes and losses are needed for a fuller description than the bouncing-ray picture.

### Prisms

A suitable prism can redirect light by total internal reflection at an internal surface. The incidence angle and surrounding medium determine whether the condition holds.
