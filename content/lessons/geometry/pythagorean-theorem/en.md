---
title: Pythagorean theorem
summary: >-
  In any right triangle, the squares built on the two legs together cover
  exactly as much area as the square built on the hypotenuse.
parameters:
  a: a — leg
  b: b — leg
variables:
  - length of one leg (drag its far vertex)
  - length of the other leg (drag its far vertex)
  - 'length of the hypotenuse, opposite the right angle'
  - the angle opposite side a
---

## Intuition

Drag either far vertex and watch the triangle stretch while the three tinted squares grow and shrink with it. The blue square sitting on leg $a$ has area $a^2$, the teal square on leg $b$ has area $b^2$, and the amber square leaning on the hypotenuse has area $c^2$. No matter how you distort the triangle, the blue area plus the teal area always exactly fills the amber one.

This only works because the corner between $a$ and $b$ stays a right angle — that small marked square at the vertex is the whole reason the identity holds. Try to picture what would happen if that corner opened wider than $90°$: the two smaller squares would no longer add up to the third, which is exactly what the readouts below let you check as $a^2+b^2$ versus $c$ squared.

## Formal

For a triangle with a right angle between sides of length $a$ and $b$, and hypotenuse $c$ opposite that right angle, $a^2 + b^2 = c^2$.

Conversely, if a triangle's side lengths satisfy $a^2+b^2=c^2$, the angle opposite $c$ must be exactly $90°$ — the theorem is an if-and-only-if statement about right angles.

## Advanced

In coordinates the theorem is the definition of the Euclidean norm, $\|v\|^2 = v \cdot v$, and generalises to the law of cosines $c^2 = a^2 + b^2 - 2ab\cos\gamma$. It fails on curved surfaces — its failure is one way to measure curvature.

## Derivation

1. Take a square of side $a+b$ and expand its area algebraically.
2. Build the same big square a second way: place four copies of the right triangle around a tilted inner square of side $c$. The big square is the tilted square plus the four triangles.
3. Both expressions describe the same area, so set them equal and cancel the shared $2ab$ term — the Pythagorean theorem is what remains.

## Real world

### Squaring a corner
Builders check a corner is a true right angle by measuring a 3-4-5 triangle along the two walls: if the diagonal is 5 units when the sides are 3 and 4, the corner is square.

### Screen and TV sizes
A display's advertised size is the diagonal of its rectangle — computed from its width and height with exactly this theorem.

### Straight-line distance
GPS and mapping tools use it to turn an east-west offset and a north-south offset into a single straight-line distance.

### Ladder safety
Knowing the ladder's length and how far its base sits from the wall tells you how high it reaches, and vice versa.
