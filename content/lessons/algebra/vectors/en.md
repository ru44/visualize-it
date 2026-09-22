---
title: Vectors
summary: >-
  See how two numbers alone pin down an arrow's exact length and direction —
  the language behind velocity, force, and screen positions in every game
  and map.
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

## Try it

1. Drag the orange arrow's tip and watch vx and vy change together.
2. Watch the length readout below the grid update as you drag — that is the arrow's straight-line distance from the center.
3. Push vx or vy negative and watch the arrow flip to point the other way along that axis.

## Real-life examples

1. **A car driving due east.** No sideways drift, just vx=5 m/s east (vy=0): the vector's length is exactly 5, matching its speed.
2. **An elevator rising straight up.** No horizontal motion, just vy=4 m/s upward (vx=0): the vector's length is exactly 4.
3. **An airplane's ground track.** Heading east at 3 while wind pushes it north at 4 (vx=3, vy=4): the combined ground-track vector has length exactly 5, even though neither component alone is 5.

## Test yourself

1. Make the vector's length exactly 5 using a vx and vy that are both nonzero.
2. Make the vector point straight up, with no horizontal component, and a length of exactly 4.
3. Make the vector point along the exact diagonal (equal vx and vy) with a length greater than 4.

## Intuition

A pilot flying due east at 3 units, while a crosswind pushes the plane north at 4 units, ends up moving along a single diagonal path — not east, not north, but somewhere between, and faster in a straight line than either push alone. The orange arrow on the grid is exactly that combined motion: drag its tip and two numbers change together, vx and vy, how far it reaches sideways and how far it reaches up. Those two numbers alone are enough to redraw the same arrow from scratch.

The arrow's straight-line length comes from the same idea as a ladder leaning against a wall: square each of the two numbers, add them, and take the square root — the Pythagorean theorem applied to the triangle the arrow forms with its own sideways and upward reach. Stretch vx or vy and the arrow's length grows to match; flip either one negative and the arrow points the opposite way along that same axis.

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
