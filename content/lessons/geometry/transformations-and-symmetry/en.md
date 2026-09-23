---
title: Transformations and symmetry
summary: >-
  Slide a tile, spin it, or flip it in a mirror — three different moves that
  each leave every length and angle exactly as they were, which is why
  wallpaper and floor patterns can repeat forever without a single seam.
parameters:
  angle: θ — rotation angle
  tx: t_x — sideways shift
  ty: t_y — up/down shift
  flip: reflect (0 off, 1 on)
variables:
  - the x-coordinate of a point on the original tile
  - the y-coordinate of a point on the original tile
  - that point's x-coordinate after the move
  - that point's y-coordinate after the move
  - the angle turned through, measured around the pivot O
  - how far the tile slides sideways
  - how far the tile slides up or down
---

## Try it

1. Drag «t_x — sideways shift» and «t_y — up/down shift». The solid L-shaped tile slides away from the dashed original, but keeps exactly the same size and orientation — that's a translation.
2. Drag «θ — rotation angle» instead, back to zero shift first. The solid tile swings around the black dot O like a hand on a clock — that's a rotation.
3. Turn «reflect» on. The solid tile suddenly becomes the mirror image of the dashed one, flipped across the red dashed line through O — no amount of sliding or spinning alone could have produced that shape; only a reflection can.

## Real-life examples

1. **Sliding a tile across a floor.** Shift a paving tile 2 units sideways with no turn and no flip: every point of the tile moves by exactly the same amount, a pure translation.
2. **Turning a steering wheel.** Spin the tile 90° about the centre point with no sideways shift: every point sweeps the same angle around O, a pure rotation.
3. **Checking a mirror image.** Hold the tile up to a mirror with no slide and no spin: the reflection looks the same size but the L now curls the other way — you cannot rotate the original to match it.

## Test yourself

1. Rotate the tile by exactly 180° about O.
2. Turn reflection on with no rotation, so the tile is a plain mirror image of the original.
3. Rotate close to 180° while keeping both shift sliders at zero, so the tile spins in place around O.

## Intuition

Watch the dashed original tile and the solid coloured one together. However you drag the sliders, the solid tile is always exactly the same size and shape as the dashed one — same side lengths, same angles at every corner. Only its position, its direction of facing, or which way it curls can change; nothing about the tile itself is stretched or squashed.

A slide (translation) moves every point the same distance in the same direction, so the shape doesn't turn at all. A spin (rotation) instead keeps one point, the pivot O, fixed and swings every other point around it by the same angle, like the tile were pinned at O. A flip (reflection) is different from both: it turns the tile into its mirror image, so an L that curled to the right now curls to the left — no combination of sliding and spinning can ever undo that, only another flip can.

## Formal

A rotation by $\theta$ about the origin followed by a translation sends the point $(x, y)$ to $(x', y')$ where $x' = x\cos\theta - y\sin\theta + t_x$ and $y' = x\sin\theta + y\cos\theta + t_y$.

A reflection across the vertical axis through the origin instead sends $(x, y)$ to $(-x, y)$; combining that with a rotation and translation gives every rigid motion of the plane, direct or mirrored.

## Advanced

These are exactly the isometries of the plane: maps that preserve distance between every pair of points. Every isometry is one of only four kinds — translation, rotation, reflection, or glide reflection (a reflection combined with a translation along the mirror line) — and any pattern that repeats under some of these, like wallpaper or a frieze border, belongs to one of a small, fully classified list of symmetry groups.

## Derivation

1. Translating moves every point of the tile by the same vector, $(t_x, t_y)$, so the shape's size and orientation don't change, only its position.
2. Rotating by $\theta$ about the origin turns $(x, y)$ into $(x\cos\theta - y\sin\theta,\, x\sin\theta + y\cos\theta)$ — the standard rotation formula, which keeps the origin itself fixed.
3. Doing the rotation first and then adding the translation combines the two into one rule: $x' = x\cos\theta - y\sin\theta + t_x$ and $y' = x\sin\theta + y\cos\theta + t_y$.

## Real world

### Wallpaper and fabric
A repeating pattern is built from one motif copied by translations, rotations and reflections; mathematicians have proved there are exactly 17 fundamentally different ways to tile a flat wallpaper this way.

### Robotics and animation
A robot arm or an animated character is moved and turned using exactly these rigid motions, applied one joint at a time, so each rigid part keeps its shape while the whole figure reconfigures.

### Manufacturing and quality control
Checking that a stamped or 3D-printed part matches its design often means testing whether one shape can be translated, rotated or reflected onto the other with no stretching — a plain congruence check.

### Molecules and crystals
A molecule's or crystal's symmetry — which rotations and reflections leave it looking unchanged — determines many of its physical and chemical properties, from how it bends light to how it reacts.
