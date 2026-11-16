---
title: Polygons and tessellation
summary: 'Calculate a regular polygon’s corner angle and check whether identical copies can meet edge to edge around a point.'
parameters:
  n: 'n — number of sides of the regular polygon'
variables:
  - 'n: number of sides'
  - 'S: sum of the interior angles'
  - 'a: one interior angle of the regular polygon'
---

## Try it

1. Set n = 3, then 4, then 6. The interior angles are 60°, 90° and 120°. Six, four and three copies respectively fit around a point.
2. Set n = 5. Each angle is 108°; three copies use 324°, leaving a 36° gap. A fourth copy would overlap.
3. Set n = 8. Two 135° corners leave a 90° gap. This suggests filling that corner with a square when mixing tile shapes.

## Real-life examples

1. **Equilateral triangular tiles.** At n = 3, six 60° corners meet to make 360°. Repeating the arrangement covers the plane.
2. **Regular hexagonal tiles.** At n = 6, three 120° corners meet without a gap. Each tile has angle sum 720°.
3. **Octagons with squares.** At n = 8, two 135° corners and one square's 90° corner total 360°. Regular octagons alone cannot provide this edge-to-edge tiling.

## Test yourself

1. Set n to make a regular hexagon.
2. Choose more than six sides and inspect the gap around the shared point.
3. Find n giving an interior-angle sum of 1440°.

## Intuition

A regular polygon has equal sides and equal interior angles. The drawing on the left shows one; the drawing on the right places copies around a shared vertex. To avoid both gaps and overlaps there, the corner angles must add to one full turn, 360°.

A square contributes 90°, so four fit. A regular pentagon contributes 108°: three leave a gap and four exceed a full turn. This rules out an edge-to-edge tiling using only regular pentagons. It does not rule out every pentagonal tile; changing the angles changes the problem.

## Formal

A simple plane polygon with n sides has interior-angle sum $S=(n-2)180^\circ$. For a regular polygon, every angle is $a=S/n$. Here n is an integer at least 3, and “simple” means the boundary does not cross itself.

An edge-to-edge tiling by one kind of regular polygon needs an integer number k of corners satisfying $ka=360^\circ$. This gives only $n=3,4,6$, and each of these admits such a tiling of the plane. The local angle check is necessary; the repeated constructions establish existence for these three cases.

## Advanced

A convex polygon can be split into n − 2 triangles by diagonals from one vertex. A nonconvex simple polygon also has the same angle sum, but may require a different triangulation. Irregular triangles, quadrilaterals and some pentagons can tile too. The restriction to three, four or six sides applies to using one regular polygon shape edge to edge.

## Derivation

1. For the convex polygon shown, draw diagonals from one vertex to all nonadjacent vertices. This creates n − 2 triangles inside the polygon.
2. The triangle angles partition the polygon's interior angles. Add 180° for each triangle to get the total.
3. Divide that total by n for a regular polygon, whose n angles are equal. Then test how many such angles fit into 360°.

## Real world

### Designing a tile pattern

Check the sum of the tile corners meeting at a vertex. A gap or overlap there prevents a flat edge-to-edge layout, even if each individual tile looks suitable.

### Mixing shapes

Squares and regular octagons can share a tiling because two octagon corners and one square corner total 360°. Mixing shapes changes the angle combinations available.
