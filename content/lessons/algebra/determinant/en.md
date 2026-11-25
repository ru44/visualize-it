---
title: The determinant
summary: 'Use the determinant to measure area scaling, orientation reversal and loss of dimension.'
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

1. Set a = 2, b = 0, c = 0 and d = 1. The transformed unit square has area 2, matching the determinant.
2. Change a to -2. The area is still 2, but the determinant is -2 because orientation reverses.
3. Set a to 0, keeping b = c = 0 and d = 1. The square collapses to a vertical segment and the determinant is zero.

## Real-life examples

1. **Stretching width.** With a = 2, d = 1 and b = c = 0, every area doubles and orientation is preserved.
2. **Shearing.** With a = d = 1, b = 0.5 and c = 0, the square becomes a parallelogram of the same area. The determinant is 1.
3. **Reflecting horizontally.** With a = -1, d = 1 and b = c = 0, areas are unchanged and orientation reverses. The determinant is -1.

## Test yourself

1. Make the determinant approximately 2, doubling areas while preserving orientation.
2. Make the determinant zero, collapsing the plane to a line or possibly a point.
3. Make the determinant approximately -0.5, reversing orientation and halving areas.

## Intuition

A square one unit wide and one unit tall has area 1. Stretch its width to 2 while keeping its height at 1, and its area becomes 2. The determinant records that area multiplier for a linear transformation.

The sign records a different feature. A reflection can keep the area unchanged while reversing clockwise and counterclockwise order. Its determinant is negative. A zero determinant means the unit square has no area after transformation: different inputs have been collapsed together, so the original cannot be uniquely recovered.

## Formal

For the matrix with rows (a, b) and (c, d), $\det(M)=ad-bc$. The area scale factor is $|\det(M)|$. A positive determinant preserves orientation, and a negative one reverses it.

A zero determinant makes the columns linearly dependent. The image of the plane is a line, or a single point if the matrix is zero. The matrix is invertible exactly when its determinant is nonzero.

## Advanced

A determinant does not describe every change in shape. A matrix with determinant 1 can stretch one direction and compress another, preserving area while changing lengths. In higher dimensions, the absolute determinant is the corresponding volume scale factor.

## Derivation

1. Calculate ad minus bc from the four entries.
2. Take the absolute value to obtain the nonnegative area multiplier.
3. At zero, the transformed unit square has zero area and the transformation cannot be inverted uniquely.

## Real world

### Area changes

The determinant converts areas under a constant linear coordinate transformation.

### Linear systems

A square coefficient matrix gives a unique solution for every right-hand side exactly when its determinant is nonzero.

### Checking transformations

A zero determinant identifies a loss of dimension. A small determinant alone does not describe every aspect of numerical sensitivity; scaling matters too.
