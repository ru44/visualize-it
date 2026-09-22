---
title: Refraction and Snell's law
summary: >-
  A straw in a glass of water looks bent, and a lens can focus light to a
  point, because light bends whenever it crosses into a material where it
  travels at a different speed — one equation predicts exactly how much.
parameters:
  theta1: angle of incidence θ₁
  n1: refractive index of medium 1
  n2: refractive index of medium 2
variables:
  - refractive indices of the first and second medium
  - angle of incidence and angle of refraction, both measured from the normal
  - speed of light in the first and second medium
---

## Try it

1. Drag the incoming ray at the top. Watch it bend as it crosses into the lower material.
2. Raise "refractive index of medium 2" (n2). The transmitted ray bends closer to the vertical dashed line.
3. Push the incidence angle θ1 toward 89°. Watch more and more light reflect instead of passing through.

## Real-life examples

1. **A straw in a glass of water.** Light going from air (n1 = 1) into water (n2 = 1.33) at 40° bends toward the vertical, which is why the straw looks broken at the surface.
2. **A pencil pressed against a glass block.** Light entering glass (n1 = 1, n2 = 1.5) at 50° bends even more sharply, because glass slows light down more than water does.
3. **A fish looking up out of the water.** Light leaving water (n1 = 1.33) for air (n2 = 1) at 30° bends away from the vertical, squeezing the fish's whole view of the sky into a narrow circle overhead.

## Test yourself

1. Set the angle of incidence θ1 to exactly 45°.
2. Find values of θ1, n1 and n2 that bend the refracted ray to exactly 25° from the vertical.
3. Find values that bend the refracted ray to just 5° from the vertical — nearly straight through.

## Intuition

Dip a straw into a glass of water and look at it from the side: the straw appears to bend right where it enters the surface, even though it is perfectly straight. That happens because light travels slower in water than in air, and the picture on screen recreates it directly. Drag the incoming ray (top left) to change its angle from the vertical — this is the angle of incidence, $\theta_1$ — and start it around 40°, measured from the dashed vertical line, not from the water's surface. Watch the shaded strip below the boundary: darkening it raises $n_2$, the refractive index of the lower material, a number like 1 for air or about 1.33 for water that measures how strongly a material slows light down.

Push $\theta_1$ toward grazing incidence, close to 90°, and watch the readout for the reflected share climb: some light always bounces back at the boundary between two different materials. The transmitted ray always bends toward the vertical line when it enters a denser material (a higher $n_2$), and away from it when leaving one. At $\theta_1 = 0°$, straight down the middle, there is no bending at all, no matter how different $n_1$ and $n_2$ are — which is why looking straight down into a pool shows no distortion, only a view from the side does.

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
