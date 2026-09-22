---
title: Matrices as transformations
summary: >-
  A matrix is a rule for moving every point in the plane at once. Drag its
  columns and watch the whole grid move with them.
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

## Intuition

Forget the grid of numbers for a moment: a matrix is a machine that moves every point of the plane somewhere else, all at once. The background grid shows this directly, its lines stay straight and evenly spaced, but they stretch, tilt or flip as you drag $a,b,c,d$.

Everything the matrix does is decided by two arrows: where the point $(1,0)$ lands and where $(0,1)$ lands. Those two landing spots are exactly the matrix's columns, $(a,c)$ and $(b,d)$. Drag either column and you are redefining the whole transformation.

## Formal

For any vector $\mathbf{v} = (v_x, v_y)$, the image under the matrix is $M\mathbf{v} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} v_x \\ v_y \end{pmatrix} = \begin{pmatrix} a v_x + b v_y \\ c v_x + d v_y \end{pmatrix}$.

This works because $\mathbf{v}$ is itself a combination of the two basis directions, so its image is the same combination of their two images, the matrix's columns.

## Advanced

Because $M\mathbf{v}$ is linear in $\mathbf{v}$, every matrix is fully determined by where it sends just two vectors. Try the values suggested for rotation, shear and scaling: a rotation by 90° is $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$, and composing two matrices, applying one after the other, is exactly matrix multiplication.

## Derivation

1. The two columns are where the two basis vectors land.
2. Any vector is a combination of those two basis vectors.
3. So its image is the same combination of the two columns.

## Real world

### Computer graphics
Rotating, scaling and skewing a shape on screen is one matrix multiplication applied to every one of its points.

### Robotics
A robot arm's joints each rotate a coordinate frame; multiplying the matrices together gives the hand's position from the base.

### Image compression
Techniques like JPEG apply a fixed transformation matrix to blocks of pixels before discarding the least important directions.

### Economics
An input-output matrix transforms a vector of raw resources into a vector of finished goods.
