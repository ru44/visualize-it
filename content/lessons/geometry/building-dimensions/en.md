---
title: Building a new dimension by dragging
summary: 'Build a segment, square and cube by extending a shape in a new perpendicular direction, and count the new vertices and edges.'
parameters:
  n: 'n — dimension of the completed shape, from point (0) to cube (3)'
  sweep: 'sweep — newest extension: 0% collapsed, 100% complete'
  spin: 'spin — changes the projected view; also controlled by horizontal dragging'
variables:
  - 'V_n: vertex count of the completed n-cube'
  - 'E_n: edge count of the completed n-cube'
  - 'n: number of independent dimensions'
---

## Try it

1. Keep sweep = 100 and set n to 0, 1, 2 and 3. Read vertex counts 1, 2, 4 and 8, and edge counts 0, 1, 4 and 12.
2. Set n = 2 and move sweep from 0 to 100. A second copy of the segment moves away until the outline becomes a square. Halfway through, it is a rectangle.
3. Set n = 3 and compare sweep = 50 with 100. The half-swept shape is a box with a shorter newest dimension; the completed shape is a cube. Drag horizontally to change its projected view.

## Real-life examples

1. **Tracing a segment.** At n = 1 and sweep = 100, moving an ideal point a fixed distance traces a segment with two endpoints.
2. **Unrolling a rectangular sheet.** At n = 2 and sweep = 50, the moving edge has covered half the intended distance. The region has four corners but is not yet the completed square.
3. **Extruding a square.** At n = 3 and sweep = 100, extending a square perpendicularly by its own side length forms a cube with eight vertices and twelve edges.

## Test yourself

1. Predict the cube's vertex count, then set n = 3 and sweep = 100 to check it.
2. Choose n and sweep to show a completed square with four vertices.
3. Set n = 3 and sweep close to 50 to stop halfway through the newest extension.

## Intuition

Begin with one ideal point. Move it in one direction and keep all positions along the way: they form a line segment. Move that entire segment perpendicularly to itself and keep the swept region: it forms a rectangle, or a square when the new length equals the original length.

Next move the square perpendicular to its plane. Sweeping it through a distance equal to its side length forms a cube. The new direction must be independent of the old ones; sliding a square within its own plane does not create a solid.

To count vertices, keep the original ones and add a matching copy of each. To count edges, keep two copies of the old edges and add one connector for each old vertex. Thus a square produces 2 × 4 + 4 = 12 cube edges. The table reports counts for the completed shape selected by n, even at sweep = 0 when projected copies coincide.

## Formal

An n-cube is the higher-dimensional extension of a segment, square and cube. Start with $V_0=1$ vertex and $E_0=0$ edges. For each integer n at least 1, the construction gives $V_n=2V_{n-1}$ and hence $V_n=2^n$.

The edge recurrence is $E_n=2E_{n-1}+V_{n-1}$. For a cube, $E_3=2\cdot4+4=12$. These count the vertices and edges of the complete nondegenerate shape, not distinct marks visible in a possibly overlapping projection.

## Advanced

The construction extends mathematically beyond three dimensions by adding another independent coordinate. For n at least 1, its edge count has closed form E_n = n2^(n − 1): each of 2^n vertices meets n edges, and counting endpoints counts every edge twice. The construction establishes a mathematical object without asserting another physical direction in our room.

## Derivation

1. A single point supplies one initial vertex.
2. The next construction has an original and a copy of every vertex, doubling their number.
3. Repeating that doubling n times gives 2^n vertices.
4. Two copies of the old edges, plus one connector per old vertex, give the edge recurrence.

## Real world

### Extrusion in modelling

A modelling tool can extend a flat square along a perpendicular line to make a box. Equal extension and side lengths give a cube; other positive extension lengths give rectangular boxes.

### Counting a box frame

A rectangular box has eight vertices and twelve edges. An edge drawing on paper may overlap some of them, so use the connectivity rather than the number of visibly separate strokes to count.
