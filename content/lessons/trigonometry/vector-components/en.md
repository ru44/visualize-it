---
title: Splitting a vector into components
summary: >-
  A rope pulling at an angle is never fully useful — part of its pull drags
  forward, part of it wastes itself lifting, and sine and cosine tell you
  exactly how the pull splits.
parameters:
  theta: θ — rope angle above the ground
variables:
  - the rope's total pull, its tension, fixed for each example
  - the angle the rope makes with the ground
  - the part of the pull dragging the load across the ground
  - the part of the pull lifting the load upward
---

## Try it

1. Watch the readouts sin θ and cos θ. Multiply each by a rope's actual tension and you get the up part and the across part of its pull.
2. Drag θ up from a shallow angle. cos θ shrinks — less of the pull drags forward — while sin θ grows, lifting more and pulling less.
3. Bring θ back down near 0°. Almost the whole pull now drags forward; almost none of it lifts.

## Real-life examples

1. **A rope pulling a sledge at 15°, tension 60 N.** cos 15° ≈ 0.97 of it drags forward, about 58 N; only sin 15° ≈ 0.26, about 16 N, lifts the sledge slightly off the snow.
2. **A kite string at 45°, tension 20 N.** The pull splits almost evenly: about 14 N forward and 14 N upward.
3. **A ball kicked at 70°, speed 15 m/s.** Most of that speed, sin 70° ≈ 0.94, about 14 m/s, goes straight up; only cos 70° ≈ 0.34, about 5 m/s, carries it forward.

## Test yourself

1. Find the angle where 87% of the pull goes across (cos θ ≈ 0.87).
2. Find an angle where more than 90% of the pull goes upward.
3. Find the angle that splits the pull exactly evenly between across and up.

## Intuition

Picture the rope shrunk down to length 1: that shrunk rope is exactly the arrow on screen, and cos θ and sin θ are the fractions of the real pull that go across and up. A 60 N rope at 15° drags forward with 60 × cos 15° newtons and lifts with 60 × sin 15° newtons — the readouts do the fraction, you supply the real strength.

Raise θ and you are trading one job for the other: more lift, less drag. That is exactly why someone hauling a sledge keeps the rope angle low — every degree it climbs steals a little forward pull and hands it to a lift that does nothing useful against flat ground.

## Formal

A pull of magnitude F at angle θ above a reference line splits into $F_x = F\cos\theta$ along that line and $F_y = F\sin\theta$ perpendicular to it.

Because $\cos^2\theta+\sin^2\theta=1$, the two parts always recombine to the original size: $F_x^2+F_y^2=F^2$.

## Advanced

The same split works for any vector, not just a force — velocity, displacement, an electric field — because it is really a projection onto two perpendicular reference directions; choosing different perpendicular directions gives different components for the exact same underlying vector.

## Derivation

1. The rope, its across part and its up part form a right triangle with hypotenuse F, so $\cos\theta = F_x/F$ and $\sin\theta = F_y/F$.
2. Rearranging the first ratio gives the across part directly: $F_x = F\cos\theta$.
3. Rearranging the second gives the up part: $F_y = F\sin\theta$.

## Real world

### Hauling a sledge or a cart
Whoever pulls keeps the rope as flat as they can, because a low angle sends nearly all their effort into forward motion instead of lift.

### Sailing
The wind's push on a sail splits into a part that drives the boat forward and a part that only pushes it sideways, which sailors fight with the keel.

### Ramps and inclined planes
Gravity pulling straight down splits, relative to a ramp's surface, into a part that presses into the ramp and a part that slides an object down it.

### Launching a projectile
A cannon or a thrown ball's initial speed splits into a horizontal part that decides how far it travels and a vertical part that decides how high and how long it flies.
