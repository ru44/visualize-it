---
title: Vectors
summary: >-
  An arrow with a length and a direction. Drag its tip and watch its
  components and its length change together.
parameters:
  a: matrix row 1, column 1
  b: matrix row 1, column 2
  c: matrix row 2, column 1
  d: matrix row 2, column 2
  vx: vector x-component
  vy: vector y-component
variables:
  - the horizontal component of the vector
  - the vertical component of the vector
---

## Intuition

The arrow on the grid is a vector: it has a length (how far it reaches) and a direction (which way it points). Drag its tip and two numbers change at once, $v_x$ and $v_y$, how far it goes right and how far it goes up. Those two numbers are all you need to redraw the same arrow from scratch.

Two vectors add tip to tail: slide one so its start sits on the other's tip, and the sum is the arrow from the first start to the last tip. A scalar multiple just stretches or shrinks the same arrow, or flips it if the scalar is negative, without changing its direction.

## Formal

A vector in the plane is the pair $\mathbf{v} = (v_x, v_y)$. Its length, or magnitude, is $|\mathbf{v}| = \sqrt{v_x^2 + v_y^2}$, the Pythagorean theorem applied to the triangle formed by the vector and its two components.

The matrix shown here is the identity, $a=d=1$ and $b=c=0$, so it leaves every vector exactly where it is: $M\mathbf{v} = \mathbf{v}$. Later lessons change $a,b,c,d$ to move the arrow somewhere new.

## Advanced

In $n$ dimensions a vector is simply a list of $n$ numbers, and the same magnitude formula generalises to $|\mathbf{v}| = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}$. Addition, scalar multiplication and the dot product all extend unchanged, which is why vectors describe everything from a two-dimensional velocity to a million-dimensional embedding.

## Derivation

1. Write the vector as its two components.
2. Square each component, exactly as in the Pythagorean theorem.
3. The square root of that sum is the vector's length.

## Real world

### Physics
Velocity, force and acceleration are all vectors: a speed alone does not tell you where a car is heading, but a velocity vector does.

### Computer graphics
Every point, every direction a camera looks, and every surface normal in a 3D scene is stored as a vector.

### Navigation
A pilot's ground track is the vector sum of the plane's heading and the wind: add the two arrows tip to tail to find where the plane actually goes.

### Machine learning
A word or an image is turned into a vector of numbers, and how close two vectors are measures how similar the two things are.
