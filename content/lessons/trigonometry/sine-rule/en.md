---
title: Sine rule
summary: 'Pair each side with its opposite angle to use one shared ratio throughout a triangle.'
parameters:
  a: 'a — length opposite A (m)'
  b: 'b — length opposite B (m)'
  c: 'c — length opposite C (m)'
variables:
  - 'a: side opposite A'
  - 'b: side opposite B'
  - 'c: side opposite C'
  - 'A: angle opposite a'
  - 'B: angle opposite b'
  - 'C: angle opposite c'
---

## Try it

1. Set a = 5, b = 6 and c = 7 m. Compare a/sin A, b/sin B and c/sin C: all are about 7.144 m.
2. Change c to 8 while keeping a and b fixed. The three ratios remain equal to each other, although their shared value changes.
3. Set a = b = 4 and c = 7. Angles A and B are equal. Keep the sum of the two shorter sides greater than the longest side to retain a triangle.

## Real-life examples

1. **Three different sides.** Lengths 5, 6 and 7 m give angles about 44.4°, 57.1° and 78.5°. Dividing each length by the sine of its opposite angle gives the same value.
2. **An isosceles triangle.** Lengths 4, 4 and 7 m give A = B ≈ 29.0° and C ≈ 122.1°. With c as the base, this is a wide, low triangle.
3. **Another scale and shape.** Lengths 6, 8 and 9 m give a shared ratio of about 9.182 m. All lengths here use metres, as on the controls.

## Test yourself

1. Make the shared ratio approximately 10 m.
2. Choose a valid triangle with |a − b| less than 0.3 m and c greater than 8 m.
3. Make a longer than both b and c in a valid triangle.

## Intuition

Match the letters before calculating: side a is across from angle A, not beside it. For a triangle with sides 5, 6 and 7, divide each side by the sine of its own opposite angle. The three answers agree even though the side lengths and angles differ.

This equality holds within each triangle; the shared value can change when you reshape it. If you already know one side and its opposite angle, you know the shared ratio. Another known angle then lets you calculate its opposite side. With only three side lengths, use the cosine rule to obtain an angle first; the display does this calculation for you.

## Formal

For any nondegenerate triangle with opposite pairs (a, A), (b, B) and (c, C), $a/\sin A=b/\sin B=c/\sin C$. All three angles are between 0° and 180°, so their sines are positive. A right angle is not required.

For example, from a, A and B, calculate $b=a\sin B/\sin A$. The angles must satisfy $A+B<180^\circ$, leaving a positive third angle. The shared ratio has the same length unit as the sides; it equals twice the circumradius.

## Advanced

Two sides and an angle opposite one of them can give zero, one or two triangles. After calculating sin B, test both B and 180° − B when distinct, keeping only angles that leave a positive third angle. The sliders here specify three sides, so valid settings determine one triangle up to reflection and movement.

## Derivation

1. Draw a perpendicular from C to the line containing side c. Its length can be expressed as b sin A or a sin B. The foot may lie outside the side for an obtuse triangle; the sine of supplementary angles is equal.
2. Divide the height equality by sin A sin B, which is nonzero for a valid triangle, to obtain the first pair of equal ratios.
3. Repeat using an altitude from another vertex to include the third side-angle pair.

## Real world

### Measuring across an obstacle

From two accessible points with a known separation, measure the angles to a third point. The third angle follows from the angle sum, and the sine rule gives the two inaccessible distances.

### Resizing a triangular design

Multiplying all sides by the same factor keeps the angles unchanged and multiplies the shared sine-rule ratio by that factor.
