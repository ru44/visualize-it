---
title: Coordinate geometry
summary: 'Use two points’ coordinates to calculate their distance, midpoint and the slope of the line through them.'
parameters:
  x1: 'x1 — first point’s horizontal coordinate'
  y1: 'y1 — first point’s vertical coordinate'
  x2: 'x2 — second point’s horizontal coordinate'
  y2: 'y2 — second point’s vertical coordinate'
variables:
  - 'x₁: horizontal position of the first point'
  - 'y₁: vertical position of the first point'
  - 'x₂: horizontal position of the second point'
  - 'y₂: vertical position of the second point'
  - 'd: straight-line distance; one grid unit represents 1 km'
---

## Try it

1. Set (x1, y1) = (1, 1) and (x2, y2) = (5, 4). Read distance 5 km, midpoint (3, 2.5) and slope 0.75.
2. Keep x2 = 5 and change y2 to 8. The horizontal change is still 4, while the vertical change becomes 7, so the slope is 7/4 = 1.75.
3. Set y1 = y2 = 8 with x1 = 1 and x2 = 5. The line is horizontal, with slope 0. Then set x2 = x1 and y2 = 4 to compare a vertical line, whose slope is undefined.

## Real-life examples

1. **Two locations on a flat map.** Points (1, 1) and (5, 4) differ by 4 km horizontally and 3 km vertically on this grid. Their straight-line distance is 5 km; a road route may be longer.
2. **An east–west segment.** Points (2, 8) and (9, 8) are 7 km apart. Their midpoint is (5.5, 8), and their line is y = 8.
3. **A larger diagonal.** Points (0, 0) and (6, 8) are 10 km apart. Their midpoint is (3, 4), and the slope is 8/6 = 4/3. Here vertical on the map need not mean elevation.

## Test yourself

1. Place the points 5 km apart in straight-line distance.
2. Place the midpoint at (4, 4).
3. Keep x1 and x2 different and make the slope equal 2.

## Intuition

A coordinate pair records horizontal position first and vertical position second. From (1, 1) to (5, 4), the changes are 4 horizontally and 3 vertically. These form the perpendicular legs of a right triangle, whose hypotenuse is the straight segment between the points. Its length is 5 by the Pythagorean theorem.

To locate the midpoint, average the horizontal coordinates and then the vertical coordinates. To find slope, divide vertical change by horizontal change. The solid segment joins the points, while the dashed line extends through them. Use distinct points when studying that line: one location alone does not determine a unique line.

## Formal

For points $(x_1,y_1)$ and $(x_2,y_2)$ in perpendicular Cartesian coordinates with the same unit on both axes, the distance is $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$. The midpoint is $((x_1+x_2)/2,(y_1+y_2)/2)$.

If $x_1\ne x_2$, the slope is $m=(y_2-y_1)/(x_2-x_1)$ and the line is $y-y_1=m(x-x_1)$. Distinct points with the same x-coordinate instead determine the vertical line $x=x_1$, with undefined slope. Coincident points have distance zero but do not determine a unique line.

## Advanced

In three perpendicular coordinates, add the square of the z-coordinate difference under the square root. For data with unrelated units, such as height and temperature, choosing a distance formula also requires deciding how to scale each coordinate. Latitude and longitude are angles on a curved surface, so they cannot be substituted as ordinary kilometre coordinates without a suitable conversion or model.

## Derivation

1. Form horizontal and vertical displacements from the coordinate differences. Their absolute values are the legs of a right triangle when both are nonzero.
2. Squaring removes the signs, and the Pythagorean theorem gives the square of the straight-line distance as the sum of the squared differences.
3. Take the nonnegative square root to obtain distance. The formula still works if one or both differences are zero.

## Real world

### Placing an object halfway

On a flat drawing or game map, averaging endpoint coordinates places a marker halfway along their connecting segment. It does not find the midpoint of a winding route.

### Checking proximity

For circular objects on a flat game board, compare the distance between centres with the sum of their radii to determine whether they touch or overlap.
