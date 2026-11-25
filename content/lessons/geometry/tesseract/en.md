---
title: 'The tesseract: a cube with four dimensions'
summary: 'Construct a four-dimensional cube mathematically, then use counts and projections to understand its structure.'
parameters:
  n: 'n — ordinary cube (3) or tesseract (4)'
  spin: 'spin — changes the rotations used for the projected view'
  sweep: 'sweep — extension in the newest direction; 100% completes it'
variables:
  - 'E_n: number of edges of an n-cube'
  - 'n: number of coordinate directions'
---

## Try it

1. Set n = 3 and sweep = 100. Read 8 vertices and 12 edges. Then set n = 4: the counts become 16 and 32.
2. Keep n = 4 and change sweep from 100 to 0. The newest coordinate separation collapses, making pairs of vertices coincide. The count table still describes the completed tesseract.
3. Return sweep to 100 and change spin from 0 to 90. Watch the projection change while vertex and edge counts stay fixed. This control combines rotations; its value is not one isolated four-dimensional rotation angle.

## Real-life examples

1. **The familiar cube.** With n = 3, spin = 40 and sweep = 100, the projection represents a cube with 8 vertices, 12 edges and 6 square faces.
2. **The completed tesseract.** With n = 4, spin = 0 and sweep = 100, the drawing represents 16 vertices joined by 32 edges. Unequal apparent sizes in the projection do not mean unequal actual edge lengths.
3. **Partial extension.** With n = 4, spin = 40 and sweep = 40, the newest direction has 40% of its completed length. This is a partially extended four-dimensional box; it becomes a regular tesseract when the extension is complete.

## Test yourself

1. Show a completed tesseract by setting n = 4 and sweep = 100.
2. Show a completed ordinary cube by setting n = 3 and sweep = 100.
3. Set n = 4 and spin close to 90 to compare another projected view.

## Intuition

To build a cube from a square, make a second square and join corresponding vertices in a new perpendicular direction. The mathematical construction can be repeated: make two cubes and join their corresponding vertices along a fourth independent direction. The result is a tesseract, or four-dimensional cube. We can define that coordinate direction without being able to point to it in our room.

Each cube contributes eight vertices and twelve edges. The two copies give sixteen vertices and twenty-four edges; eight joining edges bring the edge count to thirty-two. The tesseract also has twenty-four square faces and eight three-dimensional cubic boundary cells. Those cells are parts of its boundary, not eight cubes filling ordinary three-dimensional space.

The screen shows a projection. Just as a drawing of a cube can distort lengths and overlap edges, a tesseract projection can make equal cells look different in size. Changing the view may make lines appear to pass through each other. The underlying edges are not bending or gaining new intersections merely because their projected lines cross.

## Formal

The vertices of a standard n-cube are the $2^n$ coordinate lists whose entries are each −1 or +1. Two vertices share an edge when exactly one coordinate differs. There are n edges at each vertex; counting endpoints and dividing by two gives $E_n=n2^{n-1}$ for n at least 1.

For n = 3, $E_3=3\cdot4=12$. For n = 4, $E_4=4\cdot8=32$. These formulas describe hypercubes specifically, not every shape in three or four dimensions. A tesseract's eight cubic boundary cells arise by fixing one of four coordinates at one of its two endpoint values.

## Advanced

The illustration rotates the coordinate model in several coordinate planes, then applies successive perspective projections to reach the screen. A nested-cube picture is one possible representation, not a unique appearance. Like a cube's net of six squares, a tesseract can have a three-dimensional net of eight cubes; folding that net into the original object requires four-dimensional geometry.

## Derivation

1. At each n-cube vertex, one edge changes each of the n coordinates, giving n incident edges.
2. Each coordinate has two endpoint choices, so there are 2^n vertices.
3. Multiplying n by 2^n counts each edge at both endpoints. Divide by two to correct the double count.
4. The result is n2^(n − 1), giving 32 edges when n = 4.

## Real world

### Four binary choices

Four on/off settings give 16 states. Represent each state by a tesseract vertex and connect states differing in exactly one setting. Its edges then describe allowed one-switch changes.

### Reading projections

An engineering drawing represents a three-dimensional object on a flat page. A tesseract picture extends that idea mathematically: it is useful for connectivity, while the projection alone does not preserve all lengths or angles.
