---
title: Polar coordinates
summary: 'Describe a point by its distance and direction from the origin, and convert to horizontal and vertical coordinates.'
parameters:
  a: 'a — horizontal coordinate'
  b: 'b — vertical coordinate'
  n: 'n — exponent in zⁿ'
variables:
  - 'a: signed horizontal coordinate'
  - 'b: signed vertical coordinate'
  - 'r: distance from the origin'
  - 'θ: direction counterclockwise from the positive horizontal axis'
---

## Try it

1. Set a = 1.5, b = 0.8 and n = 1. The readout |z|, arg z gives distance 1.7 and angle about 28.1° from the positive horizontal axis.
2. Set a = −1 and b = 1.2. The point lies in the upper-left quadrant, at about 129.8°. Its coordinate signs are needed to select the correct direction.
3. Set a = 1.1, b = 0.4 and increase n from 1 to 5. The extra dots are powers of the complex number z; n counts multiplications, not complete turns.

## Real-life examples

1. **Distance and direction.** The point (1.5, 0.8) is 1.7 units from the origin at about 28.1° counterclockwise from the right.
2. **A different quadrant.** The point (−1, 1.2) is about 1.562 units away at 129.8°. Using arctan(b/a) alone would select the wrong quadrant.
3. **Repeated rotation and scaling.** For z = 1.1 + 0.4i, each multiplication scales distance by about 1.170 and adds about 19.98°. At n = 5, the result has distance about 2.197 and angle about 99.92°; it has not made five loops.

## Test yourself

1. Place z within 0.05 units of distance 1.5 from the origin.
2. Give z an angle strictly between 1.4 and 1.7 radians, about 80.2° to 97.4°, and a distance greater than 1.
3. Set n to at least 5 and make the distance of zⁿ greater than 5. Use the readout if the result leaves the visible plot.

## Intuition

The coordinates (a, b) tell us how far to move horizontally and vertically from the origin. Polar coordinates describe the same point by the length and direction of the arrow from the origin. The length is r, and the angle θ is measured counterclockwise from the positive horizontal axis. This convention differs from a compass bearing measured clockwise from north.

Direction needs more than the ratio b/a. The points (1, 1) and (−1, −1) have the same ratio, but lie in opposite directions. The function atan2 uses both signs to distinguish them. At the origin there is no preferred direction, even if software displays a numerical angle there.

## Formal

For a point other than the origin, $r=\sqrt{a^2+b^2}$ and $\theta=\operatorname{atan2}(b,a)$. The displayed angle is in degrees. Adding any whole turn to θ describes the same direction, so polar coordinates are not unique.

The reverse conversion is $a=r\cos\theta$ and $b=r\sin\theta$. Here $r\geq0$. At r = 0 every angle gives the origin, whose direction is undefined. The circles centred on the origin have constant r; rays from it have constant direction.

## Advanced

The display also treats (a, b) as z = a + bi. Its nth power has distance rⁿ and angle nθ modulo a full turn. The points expand when r > 1, contract when 0 < r < 1, and stay on the unit circle when r = 1. Their connected segments need not form a smooth spiral. The angle readout wraps to a principal angle instead of counting total rotation.

## Derivation

1. Resolve a radius r into its horizontal and vertical components using cosine and sine.
2. Square and add the components. The unit-circle identity leaves r², so the nonnegative square root gives distance.
3. The coordinate ratio gives tangent when a is nonzero, but it loses quadrant information. Use atan2 with both coordinates to select a direction; exclude the origin.

## Real world

### Locating a point from a reference

Distance and direction from a chosen landmark can locate a point on a flat map. State the reference direction and the sense in which angles increase.

### Circular patterns

To draw equally spaced points on a circle, keep r fixed and increase θ by equal amounts, then convert each point to horizontal and vertical coordinates.
