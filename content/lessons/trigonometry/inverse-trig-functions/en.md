---
title: Inverse trig functions
summary: >-
  Sine, cosine and tangent turn an angle into a ratio; arcsin, arccos and
  arctan run the machine backward, turning a ratio you measured into the
  angle that made it.
parameters:
  a: a — opposite side (rise)
  b: b — adjacent side (run)
variables:
  - length of the rise (drag its far vertex)
  - length of the run (drag its far vertex)
  - length of the slanted side joining them
  - the angle you get back, opposite side a
---

## Try it

1. Drag the far vertex of «a — opposite side» and watch the angle θ climb as the rise grows.
2. Drag «b — adjacent side» instead, and watch θ shrink as the run stretches out.
3. Make a and b equal. θ locks onto exactly 45° — the one angle where rise and run match.

## Real-life examples

1. **A ramp with a 3 m rise and a 4 m run.** Nobody measured its angle directly: arctan(3/4) ≈ 36.9° comes straight from the two lengths a builder can tape-measure.
2. **A roof with equal rise and run, 1 m each.** arctan(1/1) = 45°, the steepest pitch before walking on it stops being safe.
3. **A wheelchair ramp: 1.5 m of rise over a 6 m run.** arctan(1.5/6) ≈ 14°, still steeper than most accessibility codes allow.

## Test yourself

1. Make the angle exactly 20°.
2. Make the angle exactly 45°.
3. Make a bigger than b and push the angle past 70°.

## Intuition

Sine, cosine and tangent all start from an angle and hand you a ratio. Here you work in the other direction: drag a vertex to set the rise and the run yourself, and the angle θ appears already computed, as if you had measured two sides with a tape and asked "what angle made this?" That question is exactly what arcsin, arccos and arctan answer.

There is a catch worth noticing on screen: however you drag, θ only ever shows an angle between 0° and 90°, because both sides here are stuck positive. Countless other angles, like 150° or 330°, share the very same sine or tangent as some angle in that range. A calculator's arcsin has to pick one answer, so it is built to return only that first-quadrant-and-a-bit range and never the others, even though they are equally valid solutions to the original ratio.

## Formal

Arcsine, arccosine and arctangent are the inverses of sine, cosine and tangent: $\theta = \arcsin(x)$ means $\sin\theta = x$, and likewise for the other two.

Because sine, cosine and tangent each repeat forever, their inverses are defined on a restricted range where the original function is one-to-one: $\arcsin$ and $\arctan$ return values in $[-90°, 90°]$, and $\arccos$ returns values in $[0°, 180°]$.

## Advanced

Any other angle with the same ratio can be recovered from the principal value by symmetry — $\pi - \theta$ for sine, $-\theta$ or $2\pi - \theta$ for cosine and tangent's own period of $\pi$ — so the restricted range loses no information, it just names one representative per infinite family of solutions.

## Derivation

1. From the triangle, $\sin\theta = a/c$.
2. Applying arcsin to both sides undoes the sine, leaving $\theta = \arcsin(a/c)$.
3. The same angle also equals $\arccos(b/c)$ and $\arctan(a/b)$, since all three ratios describe the very same triangle.

## Real world

### Surveying a hillside
A surveyor measures a horizontal and a vertical distance with a tape, then uses arctan to report the slope as an angle instead of a fraction.

### Robot arms and animation
A joint's motor knows its (x, y) position; software recovers the angle to command with arctan so the arm bends correctly.

### Launch angle in sports and physics
Given a ball's horizontal and vertical speed components, arctan recovers the launch angle that produced them.

### Roof pitch
Roofers convert a measured rise and run into a pitch angle with exactly this inverse relationship, to compare it against building codes.
