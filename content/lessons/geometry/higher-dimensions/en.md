---
title: 'Five dimensions and beyond, up to eleven'
summary: 'Count the vertices, edges and higher-dimensional faces of a hypercube without relying on a crowded projection.'
parameters:
  n: 'n — number of hypercube dimensions, from 4 to 11'
  spin: 'spin — changes the projected view'
variables:
  - 'F_k: count of k-dimensional faces, including vertices and the whole cube'
  - 'n: dimension of the hypercube'
  - 'k: dimension of the faces being counted'
---

## Try it

1. Set n = 5, then 6. The vertices double from 32 to 64. Edges increase from 80 to 192: twice the old 80 plus 32 joining edges.
2. Set n = 8. Compare the square-face and cubic-face counts: both are 1792, although these faces have different dimensions.
3. Set n = 11 and vary spin. The projection changes, but the counts stay at 2048 vertices and 11264 edges. Use the table when projected edges overlap.

## Real-life examples

1. **Five binary answers.** Five independent yes/no answers give 32 possible answer lists, represented by the vertices of a 5-cube.
2. **Eight-bit values.** Eight bits give 256 possible bit strings, represented by an 8-cube's vertices. One-bit changes are its edges.
3. **Eleven switches.** Eleven independent on/off switches have 2048 configurations. Each has eleven one-switch neighbours, giving 11264 undirected connections after double counts are removed.

## Test yourself

1. Find the dimension giving 256 vertices.
2. Find the smallest available n giving more than 10000 edges.
3. Find the dimension giving 80 edges.
4. Find the dimension where the square-face count equals the cubic-face count.

## Intuition

Every additional hypercube coordinate has two choices at a vertex. Adding one coordinate therefore doubles the possible vertex lists. That is why the sequence continues from 16 in four dimensions to 32 in five and 2048 in eleven, even when we cannot picture all the independent directions.

To describe a face, let some coordinates vary and fix the rest at endpoints. An edge has one free coordinate; a square face has two; a cubic face has three. These are designated faces of the hypercube, not all possible smaller squares or cubes that could be drawn inside it.

## Formal

For integers with $0\le k\le n$, choose the k free coordinate directions in $\binom nk$ ways. Each of the remaining n − k coordinates is fixed at −1 or +1, giving $2^{n-k}$ choices. Thus the number of k-dimensional faces is $F_k=\binom nk2^{n-k}$. We include vertices as 0-faces and the whole n-cube as one n-face.

In particular, $F_0=2^n$ and $F_1=n2^{n-1}$. For n = 11 these give 2048 vertices and 11264 edges. A projection can make different vertices or edges overlap on screen without changing either count.

## Advanced

Allow each coordinate three statuses: fixed at −1, fixed at +1, or free. This counts all nonempty faces of all dimensions, including the whole cube, giving 3^n. Their alternating sum by dimension is 1. The square-face and cubic-face counts agree at n = 8 because their ratio F3/F2 is (n − 2)/6.

## Derivation

1. Choose which k coordinates are allowed to vary. Their choice determines the directions within the face.
2. Fix every other coordinate at one of its two endpoints. These choices place the face within the hypercube.
3. Multiply the counts because each choice of free directions permits every endpoint assignment of the remaining coordinates.

## Real world

### Binary configurations

A hypercube graph describes independent binary settings and changes of one setting at a time. Its geometry organizes the state space without suggesting that the switches occupy extra physical dimensions.

### Data coordinates

Eleven recorded measurements can describe a point in an eleven-coordinate data space. Constraints or relationships may reduce its intrinsic dimension, and comparing distances requires sensible units and scaling. Such data need not lie at hypercube vertices.
