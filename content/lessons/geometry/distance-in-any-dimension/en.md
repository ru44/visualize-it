---
title: How far apart? Distance in any number of dimensions
summary: 'Extend the Pythagorean theorem to perpendicular coordinate directions, and compare straight-line distance with a route along the axes.'
parameters:
  n: 'n — number of perpendicular coordinate directions'
  a: 'a — positive displacement length in each direction'
variables:
  - 'd: Euclidean distance between the endpoints'
  - 'x₁: first coordinate displacement'
  - 'x₂: second coordinate displacement'
  - 'x₃: third coordinate displacement'
  - 'x_n: displacement in the final coordinate'
  - 'n: number of coordinate directions'
  - 'a: common displacement length in the equal-step illustration'
---

## Try it

1. Set a = 1 and increase n from 1 to 4. The distance values are 1, √2, √3 and 2. Each new triangle adds one to the squared distance.
2. Set n = 9 and a = 1. Straight-line distance is 3 m, while a route taking one unit step in each coordinate direction has length 9 m.
3. Keep n = 9 and set a = 2. Both lengths double, to 6 m and 18 m. Their ratio stays 3. The diagram rescales, so compare the numerical labels.

## Real-life examples

1. **A square's diagonal.** With n = 2 and a = 1 m, the diagonal is √2 m, about 1.414 m. Two adjacent sides form a route of 2 m.
2. **A tesseract's diagonal.** With n = 4 and a = 1, opposite vertices are 2 units apart. A shortest edge route between them has length 4 units.
3. **An eleven-dimensional box.** With n = 11 and a = 1, the diagonal is √11, about 3.317 units, while the edge route has length 11 units.

## Test yourself

1. Keep a = 1 and find n making the diagonal 3.
2. Keep a = 1 and find n making the diagonal 2.
3. Use more than three dimensions and choose n and a making the diagonal 10.
4. Choose n so that the edge route is exactly twice the diagonal, for any allowed a.

## Intuition

Move 3 m east and 4 m north on a flat plane. The straight distance from the start is 5 m, while the route taken is 7 m. Add an independent 12 m vertical displacement. It is perpendicular to the whole ground plane, so another right triangle gives a final distance of 13 m: 5² + 12² = 13².

In n-dimensional Euclidean space, the same reasoning adds one squared displacement per perpendicular axis. The spiral on screen illustrates the repeated right-triangle calculation. Its legs are not n mutually perpendicular directions on the page; it is a two-dimensional construction of the successive lengths.

## Formal

For a displacement with components $x_1,\dots,x_n$ along perpendicular axes using a common unit, its Euclidean length is $d=\sqrt{x_1^2+\cdots+x_n^2}$. For two points, use their coordinate differences as these components.

If every component has positive length a, then $d=a\sqrt n$. Moving a distance a along each axis gives total route length $na$, so the route-to-diagonal ratio is $\sqrt n$. For n = 1 the two lengths agree; for n greater than 1 this axis route is longer.

## Advanced

The Euclidean norm is the square root of a vector's dot product with itself. The sum of absolute coordinate differences instead gives the Manhattan distance. Both are useful, but answer different questions. For measured data, coordinate scaling and the chosen metric influence which points are considered close; closeness is not automatically the same as human-perceived similarity.

## Derivation

1. Two perpendicular displacements give a right triangle, so the squared diagonal is the sum of their squares.
2. A new displacement perpendicular to the earlier coordinate subspace forms another right triangle with the previous diagonal.
3. Repeating adds one squared component per coordinate. Take the nonnegative square root for length.
4. With equal positive components a, the sum is na², whose square root is a√n.

## Real world

### Diagonals of boxes

A rectangular box with perpendicular edges 3, 4 and 12 has a space diagonal of 13. The route along those three edges is 19.

### Comparing numerical records

After choosing suitable units or scaling, a Euclidean distance can compare lists of measurements. Another task may need different weights or a different distance; the formula alone does not decide what “similar” should mean.
