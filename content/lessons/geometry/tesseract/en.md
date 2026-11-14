---
title: 'The tesseract: a cube with four dimensions'
summary: Drag a cube in a fourth direction and you get 16 corners and 8 cubes. What you see on screen is its shadow, a cube inside a cube.
parameters:
  n: n — 3 for a plain cube, 4 for the tesseract
  spin: spin — turns the shape; the inner cube swells and swaps places with the outer one
  sweep: sweep — how far the cube has been dragged in the fourth direction (100 % means finished)
variables:
  - the number of edges of the shape with n dimensions
  - the number of dimensions
---

## Try it

1. Set n to 4 and spin to 0. You see a small cube inside a big one, with edges joining their corners. Then slowly raise spin and watch the inner cube grow and swap with the outer one.
2. Keep n at 4 and move sweep from 100 down to 0. The tesseract folds back into the plain cube it was made from. The blue edges are the ones the fourth direction made.
3. Switch between n = 3 and n = 4 and read the table at the right. The 4D row is always twice the 3D row, plus the new edges.

## Real-life examples

- **The cube to compare.** A cube has 8 corners, 12 edges, 6 square faces. Keep it in mind: it is what the tesseract was dragged from.
- **A cube inside a cube.** With spin at 0 the shadow shows 2 cubes joined at the corners, like a cube's shadow on a wall shows 2 squares joined at the corners. The inner cube is not smaller, only farther away in the fourth direction.
- **Half-way through the fourth drag.** At sweep 40 the second copy of the cube has only moved part of the way, and the 8 edges between the two copies are still short.

## Test yourself

1. Guess first: how many corners does a tesseract have? Then show the finished tesseract and read the number.
2. Before you move anything, guess how many edges a plain cube has. Then show the cube and check.
3. Turn the tesseract by a quarter turn, spin near 90. What happened to the inner cube?

## Intuition

Our room has three directions: forward, sideways and up. We ran out of directions, but the rule did not run out. Take the cube and drag the whole of it in a new direction that is at right angles to all three. We cannot point to that direction, but we can count what we get.

Counting is easy, because it is the same rule as before: copy the cube and join every corner to its copy. A cube has 8 corners, so the new shape has 16. A cube has 12 edges: the copies make 24 and the joins make 8 more, so there are 32. It has 24 square faces and 8 cubes. This shape is the tesseract, a cube with four dimensions.

What you see on the screen is a shadow. A real cube's shadow on a wall is flat: two squares joined at their corners. The tesseract's shadow in our room is two cubes joined at their corners: a small cube inside a big one. Set n to 4 and spin to 0 to see it.

The inner cube is not really smaller. It is farther away in the fourth direction, just as the far face of a cube looks smaller in a photograph. Raise spin and the shape turns in the fourth direction: the inner cube swells and swaps with the outer one. Nothing bends or breaks, it only turns, like the shadow of a coin you tilt in the light.

The word tesseract was coined by Charles Howard Hinton in 1888. The painter Salvador Dalí put an unfolded tesseract in his picture "Corpus Hypercubus" in 1954: 8 cubes in the shape of a cross. It works the way 6 squares in a cross fold up into a cube.

## Formal

A shape with $n$ dimensions has $2^n$ corners, and at every corner $n$ edges meet. Each edge has two ends, so counting edges by their ends counts every edge twice: $E_n = \frac{n\,2^n}{2} = n\,2^{\,n-1}$.

For the cube, $E_3 = 3 \cdot 4 = 12$. For the tesseract, $E_4 = 4 \cdot 8 = 32$.

## Advanced

The shadow of the tesseract in 3D is a perspective projection from 4D, done in the picture twice: from 4D to 3D, then from 3D to the flat screen. Turning in the plane of the third and fourth axes, or any plane that includes the fourth axis, is a rotation of the 4D shape. In the shadow it looks like the inner cube passing through the outer one, because depth in the fourth direction is traded for size.

## Derivation

1. At every corner of the shape, one edge leaves in each of the $n$ directions.
2. The shape has $2^n$ corners.
3. That counts every edge twice, once at each end, so we divide by 2: $E_n = \frac{n\,2^n}{2}$.
4. Simplify: $E_n = n\,2^{\,n-1}$.

## Real world

### Dalí's cross
In 1954 Salvador Dalí painted a tesseract unfolded into a cross of 8 cubes in "Corpus Hypercubus". The same trick folds 6 squares in a cross into a cube.

### A name from 1888
Charles Howard Hinton coined the word tesseract in 1888, and the shape has been drawn as a cube inside a cube ever since.

### Shadows on a wall
A cube's shadow on a wall can be 2 squares joined at the corners. A tesseract's shadow in space is 2 cubes joined at the corners. A lower-dimensional picture is always a shadow of a higher one.

### Unfolding
You can cut a cube open into 6 flat squares. A tesseract opens into 8 cubes. See the lesson on nets of solids for the cube's version.
