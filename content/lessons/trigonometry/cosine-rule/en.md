---
title: Cosine rule
summary: 'Find an angle from three side lengths, or a side from two lengths and the angle between them.'
parameters:
  a: 'a — side length (m)'
  b: 'b — side length (m)'
  c: 'c — length opposite C (m)'
variables:
  - 'a: side opposite angle A'
  - 'b: side opposite angle B'
  - 'c: side opposite angle C'
  - 'C: angle between sides a and b'
---

## Try it

1. Set a = 3, b = 4 and c = 5 m. The angle C, opposite c, is 90°.
2. Keep a and b fixed and increase c to 6. The angle grows to about 117.28°. Increase c to 6.9 to see a nearly flat triangle.
3. Set c = 7. Since a + b = c, the shape collapses to a line and the display reports an invalid triangle. Larger c values cannot form a triangle either.

## Real-life examples

1. **Checking a right angle.** Lengths 3, 4 and 5 m give C = 90°, since 3² + 4² = 5².
2. **Two equal rods.** Rods of 5 m joined at one endpoint, with their other endpoints 8.8 m apart, form an angle of about 123.28° at the joint.
3. **A triangular plot.** Lengths 5, 7 and 9 m give C ≈ 95.74° opposite the 9 m side. Three valid side lengths determine all the angles.

## Test yourself

1. Make C equal 90°.
2. Make C greater than 120° while keeping a greater than 6 m.
3. Choose lengths with a + b greater than c by less than 1 m. Keep a valid triangle.

## Intuition

Two rods joined at one endpoint can open like a hinge. Their lengths are a and b; the distance between their free endpoints is c. Opening the angle C increases c while the rod lengths stay fixed. The cosine rule describes this relationship even when the angle is not a right angle.

For a = 3 and b = 4, a right angle gives c = 5. An acute angle brings the free endpoints closer together, while an obtuse angle moves them farther apart. The rule includes a correction to the Pythagorean sum, accounting for how far the angle differs from 90°.

## Formal

For a nondegenerate triangle with positive side lengths a, b and c, and C opposite c, $c^2=a^2+b^2-2ab\cos C$. The angle C is between sides a and b. Valid lengths satisfy $|a-b|<c<a+b$.

Given three valid lengths, calculate $C=\arccos((a^2+b^2-c^2)/(2ab))$. When C is 90°, cosine is zero and the formula becomes the Pythagorean theorem. An acute C gives a positive cosine; an obtuse C gives a negative cosine.

## Advanced

The coordinates used in the derivation rotate and move the triangle for convenience; they differ from the on-screen placement. Both describe the same lengths and angle. Alternatively, expanding the squared length of a difference of two vectors gives the rule using their dot product.

## Derivation

1. Place the joint C at the origin, one free endpoint at (b, 0) and the other at (a cos C, a sin C). Apply the distance formula between the free endpoints.
2. Expand the squared horizontal difference and the squared vertical difference. The cross term is −2ab cos C.
3. Combine the terms a² cos² C and a² sin² C into a² using the unit-circle identity.

## Real world

### Measuring a layout

Three measured distances in a flat triangular layout determine its angles. Check the triangle inequalities first; inconsistent measurements may fail them.

### Two connected links

Given two link lengths and their included angle, the rule gives the distance between the outer endpoints. A change in that angle changes the reach.
