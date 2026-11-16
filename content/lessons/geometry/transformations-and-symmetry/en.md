---
title: Transformations and symmetry
summary: 'Compare translation, rotation and reflection, then identify when a transformation leaves a shape unchanged.'
parameters:
  angle: 'θ — rotation angle; positive is clockwise in this display'
  tx: 't_x — horizontal shift; positive moves right'
  ty: 't_y — vertical shift; positive moves down'
  flip: 'reflect — off (0) or on (1), applied before rotation'
variables:
  - 'x: original horizontal coordinate relative to O'
  - 'y: original vertical coordinate, positive downward'
  - 'x′: transformed horizontal coordinate'
  - 'y′: transformed vertical coordinate'
  - 'θ: angle of rotation about O before translation'
  - 't_x: horizontal translation'
  - 't_y: vertical translation'
---

## Try it

1. Set angle = 0, flip = 0 and ty = 0. Change tx from 0 to 2. Every point shifts two units horizontally.
2. Reset tx = ty = 0 and keep flip = 0. Set angle = 90. The tile rotates about O; in this screen coordinate convention, positive rotation appears clockwise.
3. Reset angle = 0 and set flip = 1 with both shifts zero. The result is a reflection across the vertical dashed line through O. Compare corresponding corners, not just the outline.

## Real-life examples

1. **A shifted copy.** With angle = 0, tx = 2, ty = 0 and flip = 0, the tile translates two units to the right without turning.
2. **A quarter turn.** With angle = 90, zero shifts and flip = 0, every point rotates a quarter turn about O. Points farther from O travel farther, despite sharing the same angle.
3. **A mirror copy.** With angle = 0, zero shifts and flip = 1, each point is reflected to the opposite side of the vertical axis at the same perpendicular distance.

## Test yourself

1. Set angle = 180. Other settings are unrestricted by this check.
2. Set flip = 1 and angle = 0. Set both shifts to zero as well to view a pure reflection.
3. Set tx = ty = 0 and angle greater than 170°. The check accepts any angle above 170°, not only a half turn; keep flip = 0 to inspect rotation alone.

## Intuition

Translation moves every point by the same displacement. Rotation turns every point through the same angle about a centre. Reflection places points across a mirror line at equal perpendicular distances. All three preserve distances and angles, so the transformed tile is congruent to the original.

A symmetry is a transformation that maps the whole shape onto itself, not merely onto a congruent copy elsewhere. For example, reflecting a square across a diagonal leaves the square unchanged as a set. A symmetric outline may also hide the difference between different point mappings; track particular corners when comparing a reflection with a rotation.

## Formal

With reflection off, rotating by θ about the origin and then translating sends $(x,y)$ to $(x',y')$, where $x'=x\cos\theta-y\sin\theta+t_x$ and $y'=x\sin\theta+y\cos\theta+t_y$. These formulas preserve distances between points.

Reflection in the vertical axis sends $(x,y)$ to $(-x,y)$. Here that reflection, when enabled, happens before rotation and translation. The display takes positive y downward, so positive ty moves down and positive θ appears clockwise. With the usual upward y-axis, the same rotation formulas describe a counterclockwise turn.

## Advanced

The order of transformations matters. Rotating a point and then shifting it generally differs from shifting it first and rotating about the original centre. Translations and rotations preserve the orientation of labelled noncollinear points; reflections reverse it. That statement concerns point correspondence, even when a symmetric shape's outline can be matched by more than one motion.

## Derivation

1. A translation adds the same two components to every point. Subtracting two translated coordinates cancels those added components, preserving their displacement.
2. A rotation combines the original coordinates using sine and cosine. The identity sin² θ + cos² θ = 1 ensures that squared distances are preserved.
3. Applying rotation first and translation second gives the displayed formula. If reflection is enabled, negate the original x-coordinate before those two steps.

## Real world

### Arranging a pattern

Repeated translations place copies of a motif at regular intervals. Reflections or rotations can change the arrangement while preserving each copy's size. These motions alone do not guarantee a gap-free tiling.

### Moving rigid parts

A rigid part in a flat mechanical drawing can be repositioned using translation and rotation while retaining its dimensions. A reflected design may require a different physical part, depending on its shape and markings.
