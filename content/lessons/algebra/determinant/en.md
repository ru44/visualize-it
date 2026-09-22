---
title: The determinant
summary: >-
  Know instantly whether a transformation shrinks, grows, or mirror-flips a
  shape — the single number behind image scaling, 3-D rendering, and spotting
  when a robot arm gets stuck.
parameters:
  a: matrix row 1, column 1
  b: matrix row 1, column 2
  c: matrix row 2, column 1
  d: matrix row 2, column 2
  vx: vector x-component
  vy: vector y-component
variables:
  - matrix row 1, column 1
  - matrix row 1, column 2
  - matrix row 2, column 1
  - matrix row 2, column 2
  - the determinant, the area-scale factor of the transformation
---

## Try it

1. Drag a, b, c and d one at a time and watch the small square in the corner turn into a parallelogram.
2. Watch the number below the grid — the determinant — grow or shrink as the parallelogram's area changes.
3. Push a value far enough that the parallelogram flips over. Notice the determinant's sign flips too.

## Real-life examples

1. **Resizing a photo.** Stretching an image to twice its width while keeping its height the same (a=2, b=0, c=0, d=1) doubles its area — the determinant reads 2.
2. **Slanting text into italics.** A shear transform (a=1, b=0.5, c=0, d=1) tilts letters sideways without changing how much ink they cover — the determinant stays 1.
3. **Mirroring a photo.** Flipping an image left-to-right (a=-1, b=0, c=0, d=1) keeps every area the same size but reverses its orientation — the determinant turns to -1.

## Test yourself

1. Make the transformation double every area on the grid without flipping anything.
2. Make the transformation collapse the whole grid onto a single line, with zero area left.
3. Make the transformation flip the grid like a mirror while shrinking every area to exactly half.

## Intuition

Stretch a photo to twice its width but keep its height the same, and the area doubles too. Drag the slider a to 2 while leaving b, c and d alone: watch the small square in the corner of the grid turn into a rectangle twice its size, and the number below the grid — the determinant — read 2 to match.

Now push a past zero to a negative number, say -1: the little square flips over like a mirror image, and the determinant's sign flips too, from positive to negative, even though its size barely changes. That sign is the whole story — positive means the shape still faces the same way, negative means it has been turned inside out. This number always equals $ad-bc$, read straight off the grid's four sliders.

## Formal

For a $2\times2$ matrix, the determinant is $\det(M) = ad - bc$. Its absolute value $|\det(M)|$ is the factor by which the matrix scales any area; its sign tells you whether orientation is preserved.

When $\det(M) = 0$, the two columns point along the same line, so the matrix squashes the whole plane onto that line. No inverse transformation can undo that, because area, and information, has been lost.

## Advanced

In $n$ dimensions the determinant is the signed volume of the parallelepiped spanned by the matrix's columns, and $\det(M) \ne 0$ is exactly the condition for $M$ to be invertible. It also equals the product of the eigenvalues, linking area scaling to stretching along the eigen-directions.

## Derivation

1. Expand the $2\times2$ determinant from the two columns.
2. Its absolute value is the area-scale factor for any region.
3. When it is zero the columns are parallel and the map has no inverse.

## Real world

### Computer graphics
A rendering engine checks the sign of a triangle's determinant to decide whether it faces the camera or away from it.

### Solving linear systems
A system of equations has a unique solution exactly when its coefficient matrix has a nonzero determinant.

### Robotics
A near-zero determinant of a robot's Jacobian marks a singular pose where the arm loses a degree of freedom.

### Population models
A near-zero determinant in a system of interacting species signals that the populations are about to collapse onto a single trajectory.
