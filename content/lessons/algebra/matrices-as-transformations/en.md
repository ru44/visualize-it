---
title: Matrices as transformations
summary: 'Understand a two-by-two matrix by following where it sends two unit arrows.'
parameters:
  a: matrix row 1, column 1
  b: matrix row 1, column 2
  c: matrix row 2, column 1
  d: matrix row 2, column 2
  vx: vector x-component
  vy: vector y-component
variables:
  - top-left entry, where the first basis vector lands (its x-coordinate)
  - top-right entry, where the second basis vector lands (its x-coordinate)
  - bottom-left entry, where the first basis vector lands (its y-coordinate)
  - bottom-right entry, where the second basis vector lands (its y-coordinate)
---

## Try it

1. Set a = 1, b = 0, c = 0 and d = 1. Every input arrow overlaps its transformed arrow.
2. Change a to 2. The horizontal unit arrow becomes (2, 0), while the vertical unit arrow stays (0, 1). Every horizontal coordinate doubles.
3. Set a = 0, b = -1, c = 1 and d = 0. The transformation rotates every vector a quarter turn counterclockwise.

## Real-life examples

1. **Stretching width.** The matrix with a = 2, d = 1 and b = c = 0 doubles horizontal coordinates while keeping vertical coordinates unchanged.
2. **Rotating a shape.** The matrix with a = d = 0, b = -1 and c = 1 sends (1, 0) upwards and (0, 1) leftwards.
3. **Shearing a shape.** With a = d = 1, b = 0.5 and c = 0, each point shifts horizontally by half its height. This slants vertical edges.

## Test yourself

1. Make the determinant approximately -1. This preserves area magnitudes and reverses orientation, but need not be a pure reflection.
2. Make the first transformed unit arrow, (a, c), have length approximately 3.
3. Choose a matrix and input vector whose transformed length is approximately 10. Use the coordinate readouts if the tip is outside the window.

## Intuition

Begin with an arrow one unit right and another one unit up. A two-by-two matrix specifies their new endpoints. Its first column, (a, c), tells where the rightward arrow goes. Its second column, (b, d), tells where the upward arrow goes.

A vector such as (2, 3) uses two copies of the first unit arrow and three of the second. Its transformed vector uses two copies of the first column and three of the second. The grid and the selected arrow follow this same rule; the dashed arrow is the input and the solid arrow labelled Mv is its image.

## Formal

For an input vector $\mathbf{v}=(v_x,v_y)$, the output is $M\mathbf{v}=(av_x+bv_y,cv_x+dv_y)$. Each output coordinate combines the input components using one matrix row.

This map is linear: it preserves vector addition and scalar multiplication. In particular, it keeps the origin fixed. A translation of the whole plane cannot be represented by this two-by-two rule alone.

## Advanced

A linear map in two dimensions is determined by its action on any two linearly independent basis vectors, not by any arbitrary pair. Applying two linear maps in sequence corresponds to matrix multiplication, with the rightmost matrix acting first.

## Derivation

1. Read the images of the two unit vectors from the columns.
2. Express the input as a sum of scaled unit vectors.
3. Apply linearity to obtain the same sum of scaled columns.

## Real world

### Graphics

A matrix can rotate, stretch or shear coordinates of a shape around the origin. Translation needs an additional offset or a larger representation.

### Coordinates

Matrices convert vector components between suitable coordinate bases.

### Repeated operations

Multiplying transformation matrices combines successive linear changes into one rule.
