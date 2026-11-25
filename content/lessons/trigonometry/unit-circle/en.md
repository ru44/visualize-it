---
title: The unit circle
summary: 'Use a point on a circle of radius 1 to understand sine, cosine and their signs.'
parameters:
  theta: 'θ — angle in degrees'
variables:
  - 'θ: angle counterclockwise from the positive horizontal axis'
  - 'cos θ: signed horizontal coordinate'
  - 'sin θ: signed vertical coordinate'
  - 'tan θ: sine divided by cosine, when cosine is nonzero'
---

## Try it

1. Set θ to 0°, then 90°. The point moves from (1, 0) to (0, 1). Read cosine as its horizontal coordinate and sine as its vertical coordinate.
2. Set θ to 225°. The point is left of and below the centre, so both coordinates are negative.
3. Drag around the circle. The dots on the two curves show the coordinates at the selected angle; the dashed connector joins equal heights on the circle and sine graph.

## Real-life examples

1. **A quarter-turn.** At 90° the point is at the top: cosine is 0 and sine is 1. Angles here start at the right and increase counterclockwise.
2. **Down and left.** At 225° both coordinates are approximately −0.707. This uses mathematical angles, rather than compass bearings measured clockwise from north.
3. **Near the top.** At 80° the vertical coordinate is about 0.985 and the horizontal coordinate about 0.174. The radius remains 1.

## Test yourself

1. Find an angle whose sine is 0.5.
2. Choose an angle greater than 180° whose cosine is greater than 0.5.
3. Find an angle with both sine and cosine negative.

## Intuition

Imagine a point moving around a circle of radius 1. At the rightmost point its coordinates are (1, 0); at the top they are (0, 1). We call its horizontal coordinate $\cos\theta$ and its vertical coordinate $\sin\theta$. These are signed coordinates: left of the centre is negative horizontally, and below it is negative vertically.

The adjacent graphs record these coordinates against angle. Their horizontal axis is angle, not time. If the point rotates at a constant rate, angle also increases steadily with time, and the same shapes describe its horizontal and vertical motion over time. One full turn returns both coordinates to their starting values.

## Formal

The unit circle has centre (0, 0) and radius 1. At angle θ measured counterclockwise from the positive horizontal axis, its point is $(\cos\theta,\sin\theta)$. This control uses degrees; one turn is 360°, or $2\pi$ radians.

The circle equation gives $\cos^2\theta+\sin^2\theta=1$. Both coordinates lie between −1 and 1. The tangent is $\tan\theta=\sin\theta/\cos\theta$ when the denominator is nonzero; it is undefined at 90° and 270° in the displayed turn.

## Advanced

For radius r, multiply both coordinates by r. For a centre (a, b), add those coordinates: the point is $(a+r\cos\theta,b+r\sin\theta)$. The radius sets the scale while the angle sets the position around the circle.

## Derivation

1. Every point on a circle of radius 1 satisfies the circle equation. Squaring the coordinates accounts for points in every quadrant.
2. Name the horizontal coordinate cosine and the vertical coordinate sine.
3. Substitute these names into the circle equation to obtain the identity.

## Real world

### Circular motion

For a marked point on a wheel, sine and cosine give its displacement from the centre along two perpendicular directions.

### Drawing a circle

A graphics program can calculate successive points by increasing the angle and using the two coordinates. Connecting nearby points approximates the circle.
