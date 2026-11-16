---
title: Triangle angles and sides
summary: 'Check whether three lengths form a triangle, then connect its side lengths with its angles.'
parameters:
  a: 'a — side length opposite angle A'
  b: 'b — side length opposite angle B'
  c: 'c — side length opposite angle C'
variables:
  - 'A: angle opposite side a'
  - 'B: angle opposite side b'
  - 'C: angle opposite side c'
---

## Try it

1. Set a = 3, b = 4 and c = 5. Angle C, opposite the longest side, is 90°. The other two angles add to 90°.
2. Set a = b = c = 2. All three angles are 60°, adding to 180°.
3. Set a = 2, b = 3 and c = 8. No triangle forms because the two shorter lengths total only 5. Then set c = 5: equality gives a flat arrangement, still not a nondegenerate triangle.

## Real-life examples

1. **A right-angle frame.** Side lengths 3 m, 4 m and 5 m determine a right triangle, with the right angle opposite the 5 m side.
2. **An equilateral frame.** Three 2 m rods form an equilateral triangle. Equal sides face equal angles, so each angle is 60°.
3. **Lengths that cannot close.** Rods of 2 m and 3 m cannot bridge endpoints 8 m apart. The construction circles do not intersect, and the requested frame cannot form.

## Test yourself

1. Make all three sides equal; the checker allows small differences below 0.15 between a and b and between b and c.
2. Choose valid side lengths making angle C approximately 100°.
3. Choose side lengths that fail to form a nondegenerate triangle, including the boundary case where the longest equals the sum of the other two.

## Intuition

To build a triangle from three rods, first check whether they can close. The longest rod must be shorter than the other two combined. If their combined length equals it, they lie flat; if it is smaller, they cannot reach. The dashed circles show the possible locations of the third vertex at the required distances from the two endpoints.

Once a triangle forms, its three interior angles add to 180°. Its longest side faces its largest angle, and equal sides face equal angles. These are two related geometric facts, not two ways of stating the same theorem. The angle labelled C sits opposite the side labelled c, not at one of that side's endpoints.

## Formal

For a nondegenerate triangle in a Euclidean plane, $\angle A+\angle B+\angle C=180^\circ$. If a, b and c are the opposite side lengths, then $a>b$ exactly when $\angle A>\angle B$. Equal side lengths correspond to equal opposite angles.

Positive lengths a, b and c form a nondegenerate triangle exactly when $a+b>c$, $a+c>b$ and $b+c>a$. It is enough to check that the longest is strictly less than the sum of the other two. Equality gives a degenerate, zero-area configuration.

## Advanced

The law of cosines calculates an angle from all three lengths: cos C = (a² + b² − c²)/(2ab). The triangle inequalities must hold for a nondegenerate triangle. On a curved surface, triangles defined by appropriate surface paths can have an angle sum different from 180°; the rule here concerns flat geometry.

## Derivation

1. Draw a line through C parallel to AB.
2. Alternate interior angles transfer the angles at A and B to that line at C.
3. Those two angles and the original angle C fill a straight angle, so their sum is 180°.

## Real world

### Making a rigid frame

Three fixed side lengths determine a triangle's shape up to rigid motion and reflection. An ideal hinged triangular frame cannot change shape while keeping those lengths; real structures also depend on material strength and connections.

### Comparing routes

The straight segment between two points is no longer than a route through a third point. For three noncollinear points it is strictly shorter, matching the triangle inequality.
