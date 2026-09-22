---
title: Matrices as transformations
summary: >-
  See a grid of numbers as a machine that moves every point on the plane at
  once — the idea behind rotating icons, resizing photos, and animating 3-D
  graphics.
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

1. Drag a, b, c and d one at a time and watch the grid stretch, tilt, or spin.
2. Watch the orange arrow (vx, vy) move along with the grid — it always follows the same rule as every other point.
3. Try a=0, b=-1, c=1, d=0 and see the whole grid spin exactly a quarter turn.

## Real-life examples

1. **Stretching a photo.** Doubling an image's width while keeping its height the same (a=2, b=0, c=0, d=1) stretches every point sideways, leaving vertical lines vertical.
2. **Rotating an icon.** Spinning an icon a quarter turn (a=0, b=-1, c=1, d=0) sends the point (1,0) straight up and (0,1) to the left.
3. **Slanting text into italics.** A shear (a=1, b=0.5, c=0, d=1) tilts every point sideways by an amount that grows with height, turning upright letters into italics.

## Test yourself

1. Make the transformation's determinant exactly -1: it should flip the plane like a mirror without changing any area.
2. Make the first basis arrow — where (1,0) lands — end up exactly 3 units from the center.
3. Find a vector and a matrix so that the vector lands exactly 10 units from the center after the transformation.

## Intuition

Rotate a phone icon a quarter turn when you tilt your screen, and every pixel of that icon moves to a new spot at once, all by the same rule. That rule is a matrix, and the grid you see here shows it acting on the whole plane: its lines stay straight and evenly spaced, but they stretch, tilt, or spin as you drag a, b, c and d.

Everything the matrix does is decided by just two arrows: where the point (1, 0) lands, and where the point (0, 1) lands. Those two landing spots are exactly the matrix's columns — drag column a, c and you move the first arrow; drag column b, d and you move the second. Every other point in the plane, including the orange vector defined by vx and vy, moves by the same combination of those two arrows.

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
