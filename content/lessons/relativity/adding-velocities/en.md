---
title: Why 0.8c plus 0.8c is not 1.6c
summary: >-
  Fire a probe forward at 0.8c from a ship already moving at 0.8c, and
  someone watching from the ground never measures more than about 0.976c —
  relativistic velocities do not simply add.
parameters:
  u: the probe's speed relative to the ship, as a fraction of c
  v: the ship's speed relative to the ground, as a fraction of c
---

## Try it

1. Watch the three markers race along the track: gold is light itself, the dashed marker is the naive sum u + v, and the solid marker is the actual ground-frame speed w.
2. At u = 0.8, v = 0.8, notice the dashed marker would need to run faster than light — u + v = 1.6 — while the solid marker for w stays safely behind it, at about 0.976c.
3. Push both sliders to 0.99. The naive sum jumps to 1.98, wildly past light speed, but w only creeps closer to light speed itself, reaching about 0.99995c and no further.

## Real-life examples

1. **A probe launched at 0.8c from a ship already moving at 0.8c.** Naive addition suggests 1.6c; the real ground-frame speed is w = 0.976c, comfortably under the limit.
2. **Two ships each approaching light speed, at u = v = 0.99.** Naive addition suggests 1.98c; the true combined speed is w = 0.99995c, closer to light speed but never past it.
3. **Two everyday-fast objects, u = v = 0.5.** Even at half light speed each, relativity already bites: naive addition gives 1.0c exactly at light speed, but the true answer is w = 0.8c, safely below it.

## Test yourself

1. Set the probe's own speed u to 0.8.
2. Push the ship's speed v to 0.99, near the top of the slider.
3. Combine u = 0.8 and v = 0.8 to land the true speed w on about 0.976c.

## Intuition

At everyday speeds, adding velocities the ordinary way, u + v, works so well that nobody ever notices it is only an approximation. A car doing 30 m/s on a train doing 30 m/s really does move at 60 m/s to someone on the ground, because both speeds are tiny fractions of light speed and the correction term below barely registers.

That correction term grows fast once u and v themselves become sizeable fractions of c, and it always works to hold the combined speed w back from ever reaching, let alone passing, light speed — no matter how close to c both u and v get on their own. Light speed behaves like a wall that nothing with mass can push through by simply adding enough smaller pushes.

## Formal

Naive, everyday addition would predict a combined speed of $w_{\text{naive}} = u + v$, which can exceed $c$ whenever both $u$ and $v$ are large fractions of $c$.

The Lorentz transformation instead gives $w = \dfrac{u+v}{1+uv/c^2}$, where the extra denominator term is what keeps $w$ strictly below $c$ for any $u < c$ and $v < c$.

## Advanced

Two limits check this formula against what is already known: as $u, v \to c$, $w \to c$ as well, so combining two light-speed velocities still gives light speed, never more — consistent with light's speed being the same for every observer. And for small everyday $u, v$, the denominator $1 + uv/c^2$ is so close to 1 that $w \approx u + v$, recovering ordinary addition exactly where it has always seemed to work.

## Derivation

1. Ordinary, slow-speed intuition predicts simple addition, $w_{\text{naive}} = u + v$, which breaks down badly once $u$ and $v$ are sizeable fractions of $c$.
2. Applying the Lorentz transformation to a velocity measured in the ship's frame, then converting it to the ground frame, gives the correct relativistic formula instead: $w = \dfrac{u+v}{1+uv/c^2}$.
3. Because the denominator always grows exactly enough to compensate, $w < c$ for any $u < c$ and $v < c$ — light speed can be approached but never reached this way.

## Real world

### Particle accelerator collisions
Two particle beams collided head-on, each already moving at 0.999999c in the lab, do not approach each other at nearly twice light speed in either beam's own frame — this exact formula is what physicists use to compute their true relative speed.

### Why nothing can be pushed past light speed
No matter how many successive relativistic pushes an object receives, each one adding some velocity in its own current frame, chaining this formula together always keeps the result under $c$ — there is no finite sequence of additions that ever reaches it.

### The headlight effect in astrophysics
Jets of matter blasted from black holes at relativistic speeds combine their own motion with the motion of particles inside them using exactly this formula, which is part of why such jets can appear to beam light forward far more intensely than backward.

### GPS and everyday electronics
Engineers combining small relative velocities, like a satellite's motion plus the spin of the Earth beneath it, use the everyday $u + v$ approximation without a second thought, because at those speeds the relativistic correction is many orders of magnitude smaller than anything a GPS receiver could detect.
