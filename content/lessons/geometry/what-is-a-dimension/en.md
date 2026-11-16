---
title: What is a dimension?
summary: 'Count the independent coordinates needed to locate a point on a line, on a plane or in space.'
parameters:
  n: 'n — positional dimensions: track (1), map (2), space (3)'
  x: 'x — coordinate along the first direction'
  y: 'y — second coordinate; ignored when n = 1'
  z: 'z — height; used only when n = 3'
variables:
  - 'P: point being located'
  - 'x₁: first position coordinate'
  - 'x₂: second position coordinate when available'
  - 'x₃: height coordinate in three dimensions'
  - 'n: number of independent positional coordinates'
---

## Try it

1. Set n = 1 and x = 3.5. The address has one coordinate. Change y and z: neither affects the train's position in this model.
2. Set n = 2, x = 2 and y = 8. The ship's address is (2, 8). Change one coordinate at a time to see which direction it controls.
3. Set n = 3, x = 4, y = 4 and z = 5. Change only z. The plane moves in height while its projected position on the floor stays (4, 4).

## Real-life examples

1. **Along a track.** At n = 1 and x = 3.5, one distance from the chosen starting point locates the train on this straight track.
2. **On a flat map.** At n = 2, x = 6 and y = 3 locate the ship six units in the first direction and three in the second.
3. **Above the map.** At n = 3, the address (6, 3, 9) adds a height of 9 to the same ground position. Another height would give a different point in space.

## Test yourself

1. Choose the two-dimensional mode and place the ship at (2, 8).
2. Choose the three-dimensional mode and place the plane at (4, 4, 5).
3. Choose the one-dimensional mode and place the train at coordinate 7.

## Intuition

On a straight track, one coordinate tells us how far a point lies from a chosen origin. Moving forward or backward changes that same coordinate; those are two senses along one direction, not two dimensions. The train is a three-dimensional object, but we are modelling only its position along the track.

On a flat map, one coordinate is no longer enough. Many points share the same horizontal position. Add a vertical map coordinate and the pair identifies one point. The two coordinates can vary independently, giving a two-dimensional model.

In space, add height. Two aircraft could be above the same map position at different heights, so we need a third coordinate to distinguish their locations. The dashed segment in the diagram connects the plane to its projection on the floor; this is a geometric projection, not a claim about where sunlight casts its shadow.

## Formal

In n-dimensional Cartesian space, a point has coordinates $P=(x_1,x_2,\dots,x_n)$ relative to a chosen origin and independent axes. Each coordinate can vary without forcing a change in the others. For the line, plane and space examples, n is respectively 1, 2 and 3.

A space consisting of a single point has dimension $n=0$: there is no positional freedom within it. More generally, constraints can reduce dimension. A point constrained to a circle in a plane needs one local position parameter even though we may describe it using two Cartesian coordinates.

## Advanced

Degrees of freedom count independent parameters needed to describe a configuration. An ideal mechanism with six independently variable joint angles can have six configuration coordinates while occupying ordinary three-dimensional space. Recording time adds a coordinate for when an event occurs; it does not create another spatial direction in which the object can move.

## Derivation

1. On a line, one coordinate specifies the position relative to an origin and direction.
2. On a plane, add a second independent coordinate to distinguish points sharing the first.
3. In space, add a third independent coordinate to distinguish points above or below the same planar position.

## Real world

### Pixel locations

A pixel in a rectangular image is indexed by its column and row. These describe a two-dimensional grid; colour is separate information about the pixel.

### Places and events

A point in a room needs three spatial coordinates in this model. To specify an event at that point, also give a time. The spatial position and event description answer different questions.
