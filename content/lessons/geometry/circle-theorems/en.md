---
title: Circle theorems
summary: 'Compare angles standing on the same arc, and see why an angle opposite a diameter is a right angle.'
parameters:
  arc: 'arc — central angle AOB in degrees'
  pos: 'pos — C along the far arc, from near A (0) toward B (1)'
variables:
  - 'O: centre of the circle'
  - 'A: fixed endpoint on the circle'
  - 'B: endpoint moved by the arc control'
  - 'C: point on the far arc; drag it or change pos'
---

## Try it

1. Set arc = 100 and pos = 0.5. The central angle is 100° and the angle at C is 50°.
2. Keep arc = 100 and move pos from 0.05 to 0.95. C stays on the opposite arc, and its angle remains 50°.
3. Set arc = 180. AB is now a diameter and the angle at C is 90°. The dashed tangent at A is perpendicular to OA throughout.

## Real-life examples

1. **A fixed viewing angle.** With arc = 100 and pos = 0.5, the lines from C to two marked points A and B form 50°. Moving C along the same far arc preserves that angle.
2. **Constructing a right triangle.** With arc = 180 and pos = 0.5, the diameter AB and any third point C on the open semicircle form a right triangle.
3. **Moving off the middle.** With arc = 60 and pos = 0.8, C is nearer B, but the angle ACB remains 30°. The two distances from C to the endpoints need not be equal.

## Test yourself

1. Choose arc so that the angle at C is 90°.
2. Set arc = 80 to make the angle at C equal 40°.
3. Make arc greater than 130 and pos greater than 0.85, placing C near B while preserving the half-angle relationship.

## Intuition

The centre O sees endpoints A and B through the two radii OA and OB. Their angle is the central angle. Point C lies on the other arc of the circle and sees the same endpoints through CA and CB. This angle has its vertex on the circle, so it is called an inscribed angle.

Hold A and B fixed and move C along that far arc. The triangle changes shape, but its angle at C stays equal to half the central angle. The condition on C matters: it must stay distinct from A and B and on the opposite arc. When AB becomes a diameter, half of the straight central angle is 90°.

## Formal

Let O be the centre, with A, B and C distinct points on the circle. If C lies on the arc opposite the central angle AOB shown here, then $\angle AOB=2\angle ACB$. More generally, an inscribed angle measures half the intercepted arc that does not contain its vertex.

If AB is a diameter, then $\angle ACB=90^\circ$. A separate circle theorem states that the tangent at A is perpendicular to the radius OA. The tangent touches the circle at A and has no second intersection with it.

## Advanced

Angles standing on the same arc are equal. If four distinct points form a convex cyclic quadrilateral, opposite angles add to 180°, rather than being equal in general. Each opposite angle intercepts one of the two complementary arcs, whose measures add to 360°.

## Derivation

1. For the symmetric position pos = 0.5, draw OC. The triangles OAC and OBC are isosceles because all three radii are equal.
2. Let the angle ACB be γ. Symmetry splits it into two angles γ/2. Each isosceles triangle therefore has angle 180° − γ at O.
3. The angles around O total 360°, so AOB = 360° − 2(180° − γ) = 2γ. This proves the symmetric case. For other positions, extending OC to a diameter and adding or subtracting the corresponding isosceles-triangle angle relations gives the same result.

## Real world

### Constructing a right angle

Choose the endpoints of a diameter and a third point on the circle. Joining the three gives a right angle at that third point, provided it differs from the endpoints.

### Loci in geometry

For two fixed endpoints and a fixed angle, possible observation points lie on circular arcs. Points must be chosen on the correct arc to preserve that angle rather than its supplement.
