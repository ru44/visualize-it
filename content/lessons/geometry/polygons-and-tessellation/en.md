---
title: Polygons and tessellation
summary: >-
  A shape's own corner angle decides whether copies of it can pack around a
  point with no gap at all — which is exactly why floor tiles come in
  triangles, squares and hexagons, never pentagons.
parameters:
  n: n — number of sides
variables:
  - the number of sides of the polygon
  - the sum of all its interior angles
  - one interior angle, if the polygon is regular
---

## Try it

1. Drag «n — number of sides» up from 3. Watch the big shape on the left grow more sides and look rounder, while its readout «one interior angle» climbs.
2. Look at the small copies fanned around the point on the right. At n = 6 they close up into a perfect ring with no gap.
3. Move to n = 5 or n = 7. A wedge of empty space (shaded) is left over where the last copy doesn't quite reach the first — those shapes cannot tile a floor by themselves.

## Real-life examples

1. **Triangular roof brace.** A triangle (n = 3) is the only polygon that can't be pushed out of shape without changing a side length, which is why builders brace roofs and towers with triangles, not squares.
2. **Honeycomb cell.** Bees build with regular hexagons (n = 6): the shape that packs a flat sheet of wax with no wasted gaps while using the least wall per cell.
3. **Stop sign.** A stop sign is a regular octagon (n = 8) — instantly recognisable by its corners, but on its own it cannot tile a wall; pavers only manage it by filling the gaps with small squares.

## Test yourself

1. Make the shape a regular hexagon.
2. Find a polygon bigger than a hexagon and see the gap it leaves when copies meet at a point.
3. Push the interior angle sum to exactly 1440°.

## Intuition

Drag «n — number of sides» and watch the big polygon on the left gain corners one at a time. Each new corner also changes the angle at every corner: with few sides the corners are sharp, and as n grows the shape rounds out and each angle opens wider, creeping toward a flat 180°.

Now look at the fan of small copies meeting at the point on the right — this is what happens if you try to surround one point on a floor with copies of the same tile, edge to edge, corner to corner. Each copy takes up a slice equal to its own interior angle. A full turn around a point is 360°, so the copies only close up with no gap when the interior angle divides evenly into 360° — try n = 3, 4 and 6 and watch the shaded gap disappear completely.

## Formal

For any simple polygon with $n$ sides, the interior angles add to $S = (n-2)\cdot 180^\circ$. If the polygon is regular, every angle is equal, so each one measures $a = \dfrac{S}{n}$.

Copies of a regular polygon tile the plane edge-to-edge around a single point exactly when $360^\circ$ divides evenly by $a$ — among the regular polygons, that only happens for the triangle, the square and the hexagon.

## Advanced

Semi-regular tilings mix two or more regular polygons around each vertex, such as squares and octagons, so long as the angles at every vertex still add to exactly 360°; there are exactly eight such Archimedean tilings of the plane. Irregular pentagons can still tile despite the regular one failing — over a dozen convex pentagon families are now known to tile, a classification finished only in 2017.

## Derivation

1. Pick one vertex of the $n$-sided polygon and draw every diagonal from it to the other vertices. This slices the polygon into $(n-2)$ non-overlapping triangles.
2. Every triangle's three angles add to 180°, and together the triangles use up every interior angle of the polygon exactly once, with nothing left over and nothing counted twice.
3. Multiplying gives the total, $S = (n-2)\cdot 180^\circ$, and splitting that total equally among a regular polygon's $n$ matching corners gives each one's angle, $a = \dfrac{S}{n}$.

## Real world

### Flooring and tiling
Only equilateral triangles, squares and regular hexagons tile a floor edge-to-edge on their own, which is why those three shapes dominate paving, brickwork and bathroom tiles.

### Nature
Hexagonal packing shows up wherever a flat surface needs dividing with the least boundary per cell: honeycombs, dried mud cracks, and the pattern of a fly's compound eye.

### Sports and games
A football (soccer ball) is stitched from hexagons and pentagons so the panels can curve into a sphere — flat hexagons alone can only tile a flat sheet, not close up into a ball.

### Architecture
Domes and geodesic structures break a curved surface into triangles because triangles are rigid and their angles are easy to cut and check on site, unlike floppier four- or five-sided panels.
