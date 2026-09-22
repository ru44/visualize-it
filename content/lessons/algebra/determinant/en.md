---
title: The determinant
summary: >-
  One number that tells you how much a matrix stretches area, and whether it
  flips the plane inside out.
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

## Intuition

Watch the unit square in the corner of the grid as you drag $a,b,c,d$: the transformed grid cell it becomes is bigger or smaller than the original, and that change of area is exactly what the readout below the grid is measuring.

Push the values far enough and the parallelogram flips over, its two edges swap which one is "first" going counterclockwise. That flip is a sign change in the same number: positive keeps the plane's orientation, negative reverses it like a mirror.

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
