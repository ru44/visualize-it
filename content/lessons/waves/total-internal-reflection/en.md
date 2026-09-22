---
title: Total internal reflection
summary: >-
  Shine a flashlight upward from underwater at a steep enough angle and none
  of the light escapes into the air above — it all bounces back down, which
  is also how optical fibres carry the internet across oceans without
  leaking light.
parameters:
  theta1: angle of incidence θ₁
  n1: refractive index of medium 1 (denser)
  n2: refractive index of medium 2 (less dense)
variables:
  - refractive indices of the first and second medium
  - critical angle θ_c
---

## Try it

1. With the defaults loaded, look for a bent ray crossing the boundary. There isn't one — only the reflected ray, shown at full brightness.
2. Drag θ1 down. Watch the refracted ray reappear once you cross the critical angle.
3. Push n2 up toward n1 instead. The critical-angle readout grows until, at n1 = n2, every angle lets light through.

## Real-life examples

1. **Light inside an optical-fibre core.** A glass core (n1 = 1.5) surrounded by slightly less dense glass cladding (n2 = 1.4) hits the wall at 80°: the light reflects perfectly and keeps travelling down the fibre.
2. **A diamond's sparkle.** Light inside a diamond (n1 = 2.42) hits its underside at 30°, well past the critical angle for diamond-to-air (n2 = 1): it bounces back up instead of leaking out, which is why a cut diamond sparkles so brightly.
3. **A swimmer looking up at a shallow angle.** Light trying to leave water (n1 = 1.33) for air (n2 = 1) at 60° from straight up passes the water-to-air critical angle of about 48.8°, so it reflects back down instead of escaping — which is why the sky disappears outside a narrow circle overhead.

## Test yourself

1. For whatever n1 > n2 you choose, set θ1 to exactly 2° above the critical angle.
2. Make total internal reflection impossible: bring n2 up to match n1 (within 0.02).
3. For any n1 greater than n2, find θ1 within 0.5° of the exact critical angle.

## Intuition

Dive underwater and look straight up: the whole sky looks squeezed into one bright circle above you, and outside that circle the surface looks like a mirror, reflecting the pool floor back at you. That mirror-like edge is what this lesson is about. On screen, $n_1$ is set above $n_2$ by default — light starts in the denser material — and the incoming ray is already past the point where a bent ray could exist: there is no refracted ray crossing the boundary at all, only the reflected one, drawn at full brightness.

Drag $\theta_1$ down and watch the refracted ray reappear once you cross a threshold called the critical angle: at first it skims almost along the boundary, then bends closer to the vertical line as you lower the angle further. Push $n_2$ up toward $n_1$ instead and the critical-angle readout grows, until at $n_1 = n_2$ every angle lets light through and total internal reflection becomes impossible — this only happens, in fact, when light tries to leave a denser material for a less dense one.

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
