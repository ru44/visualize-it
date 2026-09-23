---
title: Triangle angles and sides
summary: >-
  Any triangle's three angles always add to 180°, its longest side always
  faces its biggest angle, and some three lengths simply can't close into a
  triangle at all.
parameters:
  a: side a
  b: side b
  c: side c
variables:
  - the angle at the first vertex, facing side a
  - the angle at the second vertex, facing side b
  - the angle at the third vertex, facing side c
---

## Try it

1. Drag "side a" up and down. The whole triangle reshapes, but the three angle readouts A, B, C still add to 180°.
2. Make side c the longest of the three. Watch angle C — the one that faces side c — become the largest angle too.
3. Push side c far past what a and b can reach (try a = 2, b = 3, c = 8). The triangle breaks open: the two dashed construction circles no longer touch, and there is no triangle with those three lengths.

## Real-life examples

1. **A 3-4-5 builder's triangle.** Sides 3 m, 4 m and 5 m always meet at a right angle opposite the 5 m side — carpenters use exactly this to square a corner.
2. **An equilateral roof truss.** Three equal 2 m beams meet at three equal 60° angles, splitting the straight 180° evenly.
3. **Rods too short to meet.** A frame built from rods 2 m, 3 m and 8 m simply cannot close: the two short rods, even stretched straight, don't reach 8 m together.

## Test yourself

1. Make all three sides equal, so the triangle is equilateral.
2. Make the angle at the third vertex (facing side c) equal to 100°.
3. Pick three side lengths that cannot form a triangle at all.

## Intuition

Every triangle, no matter how stretched or squashed, has angles that add to exactly a straight line — 180°. Drag "side a" and watch the shape change completely, yet the three angle readouts always settle back to a total of 180°. It never depends on how long the sides are, only on the fact that three straight sides close up into one flat shape.

The picture also carries a rule about which angle is biggest: whichever side you stretch the longest, the angle sitting across from it — not next to it — grows to match. Make side c the longest and angle C, at the vertex facing it, becomes the largest angle in the triangle. But not every trio of lengths can close up at all: the two dashed circles show where the third vertex would have to sit, and if the two shorter sides are too short to reach that far apart, the circles miss each other and no triangle exists.

## Formal

For any triangle with vertices A, B and C, the interior angles satisfy $\angle A + \angle B + \angle C = 180^\circ$. Equivalently, the largest angle is always opposite the longest side, and the smallest angle opposite the shortest side.

Three lengths a, b and c form a triangle only if each one is shorter than the sum of the other two; the tightest case is the longest side against the two shorter ones combined, which is why the picture tests the longest side against the sum of the other two.

## Advanced

On a curved surface the angle sum is no longer fixed at 180°: on a sphere, like the Earth's surface, a triangle's angles add to more than 180°, with the excess proportional to the triangle's area — the starting point for spherical and non-Euclidean geometry.

## Derivation

1. Draw a line through vertex C parallel to side AB.
2. The two angles this new line makes with sides CA and CB equal angle A and angle B — alternate angles on a line cut by a parallel, the same idea as a ladder crossing parallel rungs.
3. Those three angles now sit side by side along one straight line, so angle A plus angle B plus angle C equals 180°.

## Real world

### Carpentry
Builders check a corner is square by measuring 3, 4 and 5 units along the two walls and the diagonal; if the diagonal isn't exactly 5, the corner isn't a true right angle.

### Cartography
Triangulation finds a location by measuring the angles of a triangle to two known landmarks — the angle sum rule lets a surveyor find the third angle from the other two without measuring it directly.

### Structural engineering
Truss bridges are built from triangles rather than squares because a triangle's side lengths pin down its angles completely, so it can't rack or collapse sideways the way a four-sided frame can.

### Navigation
Sailors plotting a course between three ports check the shortest possible route obeys the triangle inequality: no leg of the journey can be longer than the other two legs combined.
