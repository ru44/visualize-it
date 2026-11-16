---
title: Vectors
summary: 'Describe a displacement with horizontal and vertical components, then calculate its length.'
parameters:
  a: matrix row 1, column 1
  b: matrix row 1, column 2
  c: matrix row 2, column 1
  d: matrix row 2, column 2
  vx: vector x-component
  vy: vector y-component
variables:
  - the horizontal component of the vector
  - the vertical component of the vector
---

## Try it

1. Set a = 1, b = 0, c = 0 and d = 1 so the matrix leaves the vector unchanged. Set vx = 3 and vy = 4.
2. Read v = (3, 4) below the grid. Its length is 5 by the Pythagorean theorem; the readout shows components rather than a separate length value.
3. Change vx to -3. The horizontal direction reverses, but the length remains 5. The dashed input arrow and solid transformed arrow overlap while the matrix is the identity.

## Real-life examples

1. **Moving east.** With vx = 5 and vy = 0, the vector points horizontally right and has length 5.
2. **Moving upwards.** With vx = 0 and vy = 4, the vector points straight up and has length 4.
3. **Combining perpendicular movements.** Components 3 east and 4 north give a displacement of length 5. If both components instead describe velocity in the same units, 5 is the resulting speed.

## Test yourself

1. Make the input vector's length within 0.1 of 5, with both component magnitudes greater than 0.1.
2. Make the input vector (0, 4), pointing straight up.
3. Make vx and vy equal within 0.05, with vector length greater than 4. Both may be positive or both negative.

## Intuition

Move three units right and four units up. The arrow from your starting point to your final point records the total displacement. Its two components are 3 and 4: one for each perpendicular direction.

The arrow is the diagonal of a right triangle with side lengths 3 and 4. Its length is the square root of 9 plus 16, which is 5. Negative components reverse a direction without making the length negative. Keep the matrix at the identity in this lesson to focus on the input vector; other matrix settings create a separate transformed vector.

## Formal

A plane vector is written $\mathbf{v}=(v_x,v_y)$. Its Euclidean length is $|\mathbf{v}|=\sqrt{v_x^2+v_y^2}$. Both components must use compatible units for this interpretation.

The identity matrix has a = d = 1 and b = c = 0, giving $M\mathbf{v}=\mathbf{v}$. This is a selectable setting, not a restriction on the matrix controls. The exercises here test the input components regardless of the matrix setting.

## Advanced

Add vectors by adding corresponding components. Multiply by a scalar by multiplying every component by that scalar. A negative scalar reverses a nonzero vector's direction. The zero vector has length zero and no defined direction.

## Derivation

1. Record the horizontal and vertical components.
2. Square both components and add them to obtain the squared diagonal length.
3. Take the nonnegative square root to obtain the length.

## Real world

### Motion

Velocity combines speed with direction. Two perpendicular velocity components determine the total velocity.

### Forces

Forces acting on an object add as vectors, so opposite components can cancel.

### Graphics

Coordinates and displacement vectors help locate objects and describe their movement. A position also depends on the chosen origin.
