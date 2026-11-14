---
title: Building a new dimension by dragging
summary: Drag a point to make a line, a line to make a square, a square to make a cube. Count how the corners double each time.
parameters:
  n: n — how many dimensions the shape has
  sweep: sweep — how far the shape has been dragged in its newest direction (100 % means finished)
  spin: spin — turns the shape so you can look at it from another side
variables:
  - the number of corners of the shape with n dimensions
  - the number of edges of the shape with n dimensions
  - the number of dimensions
---

## Try it

1. Set n to 0, then 1, 2 and 3. Each time, read the corners and the edges under the picture. Which number doubles every time?
2. Set n to 2 and move sweep from 0 to 100. Watch the line slide sideways and leave a square behind it. The blue lines are the new edges made by the drag.
3. Set n to 3 and drag the picture left and right. Look at the small table at the right: the row for 2D shows the square you started from, and the row for 3D shows the cube.

## Real-life examples

- **A pencil drag.** Press the tip on paper: a point. Drag it 10 cm and you have a line with 2 ends. n = 1 shows it.
- **A carpet being rolled out.** Its front edge is a line. As you roll it half-way across the floor you have half a rectangle, and the carpet is finished only when the edge has moved all the way (n = 2, sweep = 50).
- **A die.** It is a cube: 8 corners, 12 edges and 6 faces. You can make one by dragging a square upward by its own side length.

## Test yourself

1. Guess first: how many corners will a cube have? Then set the sliders to a complete cube and check your guess.
2. Before you touch n, guess which dimension gives a shape with exactly 4 corners. Then make the picture show it, finished.
3. Make the cube, but stop its last drag exactly half-way (sweep near 50). What do you see at that moment?

## Intuition

Put the tip of a pencil on a sheet of paper. It makes a point. You cannot move inside a point, so it has 0 dimensions, and it has one corner: itself. In the picture, set n to 0.

Now drag the pencil 10 cm to the right. The point leaves a line behind it, 10 cm long. On a line you can only go forward or back, so a line has 1 dimension. It has 2 ends. Set n to 1 to see it.

Drag the whole line 10 cm sideways. It leaves a square, 10 cm by 10 cm. On a square you can go forward and back, and left and right, so it has 2 dimensions. It has 4 corners and 4 sides. Set n to 2, and move the sweep slider from 0 to 100 to watch the line being dragged.

Drag the whole square 10 cm upward and you get a cube: 8 corners, 12 edges and 6 faces. That is 3 dimensions. Set n to 3. Your screen is flat, so what you see is the cube's shadow, the way a cube's shadow on a wall is a flat drawing. Drag the picture left and right to turn it.

Every drag does the same two things. It makes a copy of the whole shape, and it joins each corner to its own copy. So the corners double: 1, 2, 4, 8. The edges are two copies of the old edges plus one new edge for every old corner. For the cube that is 2 × 4 + 4 = 12. The table in the picture shows it with the numbers for n and for the dimension before it.

## Formal

Start from one point, so $V_0 = 1$. Each new dimension copies the shape and joins every corner to its copy, so $V_n = 2\,V_{n-1}$, and therefore $V_n = 2^n$.

The edges of the new shape are two copies of the old edges, plus one new edge for each old corner: $E_n = 2\,E_{n-1} + V_{n-1}$. For the cube, $E_3 = 2 \cdot 4 + 4 = 12$.

## Advanced

The recipe never mentions the number 3. You can repeat the drag as often as you like, and the counts $V_n$ and $E_n$ keep following the same two rules. Solving the second rule gives a closed form, $E_n = n\,2^{n-1}$, which the next lessons use.

## Derivation

1. A point has one corner: $V_0 = 1$.
2. A drag makes one copy of every corner, so the corners double: $V_n = 2\,V_{n-1}$.
3. Doubling $n$ times from 1 gives $V_n = 2^n$.
4. The edges are two copies of the old edges plus one new edge per old corner: $E_n = 2\,E_{n-1} + V_{n-1}$.

## Real world

### Extruding in 3D programs
Programs for 3D modelling do this on purpose. You draw a flat shape, then "extrude" it: drag it upward to make a solid box.

### Printing in layers
A 3D printer draws a line with its nozzle, lines make a layer, and layers stacked on top of each other make the object. Each step adds one dimension.

### Counting corners of boxes
Anything shaped like a box has 8 corners and 12 edges. A designer building a box model can check it with these two numbers.
