---
title: Coordinate geometry
summary: >-
  Two dots on a city map are enough to read off the straight-line distance
  between them, the meeting point exactly halfway, and the equation of the
  road that joins them.
parameters:
  x1: point 1, x
  y1: point 1, y
  x2: point 2, x
  y2: point 2, y
variables:
  - the first point's x-coordinate
  - the first point's y-coordinate
  - the second point's x-coordinate
  - the second point's y-coordinate
  - the straight-line distance between the two points
---

## Try it

1. Drag the orange point. The distance, midpoint and slope readouts update live as it moves.
2. Drag the blue point straight up, keeping its x fixed. Watch the slope grow and the dashed line get steeper.
3. Line the two points up so they share the same y-coordinate. The slope drops to exactly 0 — a flat, due-east road.

## Real-life examples

1. **Home to school.** Home sits at (1, 1) and school at (5, 4) on a 1 km grid: a straight-line distance of exactly 5 km, and the school bus's road follows the dashed line between them.
2. **A road running due east.** Two stops at (2, 8) and (9, 8) share the same y, so the road between them is flat: slope 0, and the equation is simply y = 8.
3. **A steep hillside path.** From (0, 0) to (6, 8), the path climbs 8 km for every 6 km east — ten kilometres of straight-line distance in total.

## Test yourself

1. Place the two points exactly 5 km apart.
2. Make the midpoint land on (4, 4).
3. Make the line's slope exactly 2.

## Intuition

Picture two towns marked on a grid map, each square worth one kilometre. Drag the orange point around and you'll see the straight dashed line connecting it to the blue point tilt and stretch, while the "distance" readout tells you exactly how far apart they are as the crow flies — not along any road, just the straight line between the dots.

The green dot marks the midpoint, sitting exactly halfway between the two towns on that straight line — average their x-coordinates and separately average their y-coordinates, and that's where it lands. The dashed line itself is a whole road, not just the segment between the two towns: it keeps going in both directions, and its steepness is the slope, how many kilometres it climbs for every kilometre it goes east.

## Formal

The distance between two points $(x_1, y_1)$ and $(x_2, y_2)$ is $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, and their midpoint is $\left(\dfrac{x_1+x_2}{2}, \dfrac{y_1+y_2}{2}\right)$.

The line through them has slope $m = \dfrac{y_2-y_1}{x_2-x_1}$ (undefined when $x_1 = x_2$, a vertical line), and its equation can be written $y - y_1 = m(x - x_1)$.

## Advanced

The same distance formula extends to three dimensions by adding a $(z_2-z_1)^2$ term under the root, and to any number of dimensions in data science, where "distance" between two rows of numbers (not points on a map) is exactly this formula applied to many coordinates at once.

## Derivation

1. The horizontal gap between the two points is x₂ − x₁ and the vertical gap is y₂ − y₁ — the two legs of a right triangle.
2. By the Pythagorean theorem the straight-line distance is the hypotenuse of that triangle: d² = (x₂ − x₁)² + (y₂ − y₁)².
3. Taking the square root of both sides gives the distance itself.

## Real world

### Delivery routing
A delivery app estimates the straight-line distance between two addresses instantly with this formula, before it ever calculates the actual road route, just to rank which stop is closer.

### GPS and mapping
Every "distance to destination" a phone shows is built on this formula applied to latitude and longitude, adjusted for the Earth's curve over longer distances.

### Video games
A game decides whether two characters are close enough to collide by computing exactly this distance between their coordinates, many times every second.

### Emergency dispatch
Dispatchers picking the nearest ambulance to a call estimate straight-line distance first, using the midpoint and distance formulas, before refining with actual road times.
