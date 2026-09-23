---
title: Circle theorems
summary: >-
  Stand anywhere on the rim of a circle and look at the same two points — your
  viewing angle never changes, and it is always exactly half the angle those
  two points make at the centre.
parameters:
  arc: arc — central angle AOB
  pos: pos — point C's place on the far arc
variables:
  - the centre of the circle
  - one end of the chord, fixed
  - the other end of the chord, fixed
  - a point you drag around the far arc
---

## Try it

1. Drag the slider «arc — central angle AOB». The orange wedge at the centre and the green wedge at C both grow, but C's angle is always half the centre's.
2. Drag «pos — point C's place on the far arc» all the way from one side to the other. The green angle at C does not change at all, even though C moves a long way.
3. Push «arc» to its maximum, 180°. Now A and B sit at opposite ends of a diameter, and the green angle at C locks onto exactly 90° — no matter where C is. The dashed line at A stays perpendicular to the radius OA the whole time: that line is the tangent.

## Real-life examples

1. **Lighthouse fix.** Sailors once measured the angle between two lighthouses from the ship with a sextant; every ship on the same circular path through the lighthouses reads the same angle, which is exactly half the angle the lighthouses make at that circle's centre.
2. **Carpenter's right-angle test.** Draw a semicircle over a board's straight edge. Any point you mark on the curve sees the two ends of that edge at a right angle — a quick way to check a corner without a set square.
3. **Panorama framing.** A photographer walking along an arc so a monument keeps filling the same width in every shot is really keeping the inscribed angle constant.

## Test yourself

1. Set the central angle so that point C sees a right angle.
2. Set the central angle to 80°, so C's angle reads exactly 40°.
3. Push the central angle above 130° and drag C close to B; check that the angle at C still matches half of «arc».

## Intuition

Picture the centre O and two fixed points A and B on the rim, joined to O by two spokes. Drag «arc» and those two spokes open and close like scissors — that is the central angle, the orange wedge. Now drag point C anywhere else on the rim and look at the lines from C to A and to B: they trace out the green wedge, the angle C sees looking at A and B.

However far you drag C around the far arc, the green wedge stays exactly half the width of the orange one. Push «arc» up to 180° and A, B become opposite ends of a diameter — the green wedge shrinks to exactly a quarter turn, 90°, wherever C sits. Watch the dashed line at A too: it only ever touches the circle at that one point, and it always stands at a right angle to the spoke OA, however you move the other sliders.

## Formal

The angle a chord subtends at the centre is twice the angle it subtends at any point on the far arc: $\angle AOB = 2\,\angle ACB$, where $O$ is the centre and $A$, $B$, $C$ lie on the circle.

Two special cases follow directly. When $AB$ is a diameter, $\angle AOB$ measures 180°, so $\angle ACB$ measures 90° for every position of $C$ — the angle in a semicircle is a right angle. And at any point $A$ on the circle, the tangent line is perpendicular to the radius $OA$.

## Advanced

The theorem also proves that every inscribed angle standing on the same arc is equal, since they all equal half the same central angle — this is why the four angles of a cyclic quadrilateral split into two equal pairs. The tangent-chord angle at $A$ equals the inscribed angle in the alternate segment, a fact used to prove the perpendicularity above without calculus.

## Derivation

1. $O$ is the centre, so $OA$, $OB$ and $OC$ are all radii of the same circle — equal in length. That makes triangle $OAC$ isosceles, and triangle $OBC$ isosceles too.
2. In an isosceles triangle the two angles opposite the equal sides match, so $\angle OAC = \angle OCA$ in the first triangle and $\angle OBC = \angle OCB$ in the second. Together those two base angles make up the whole of $\angle ACB$.
3. What's left of 180° at $O$ in each triangle, once its two equal base angles are taken out, is exactly twice that triangle's base angle. Adding both leftover pieces at $O$ gives $\angle AOB$, and it comes to exactly twice $\angle ACB$.

## Real world

### Sports
A striker looking for the widest shooting angle on goal is standing on the circle through both goalposts where the inscribed angle theorem gives the largest possible view of the gap.

### Navigation
Before GPS, sailors fixed a ship's position by measuring the angle between two landmarks; every point giving that same angle lies on one circle, found using exactly this theorem.

### Engineering and design
A right angle drawn inside a semicircle is the quickest way to test a square corner on site, and the same fact sizes gauges and cams that must swing through a true 90°.

### Astronomy
The line of sight from a tall building to the horizon is tangent to the Earth, so it meets the Earth's radius at that point at a right angle — the geometry used to work out how far you can see from a height.
