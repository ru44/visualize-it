---
title: Absolute value inequalities
summary: >-
  Find every point within a set distance of a target — the idea behind
  manufacturing tolerances, fever alarms, and geofences.
parameters:
  c: center c
  r: radius r
  x: x (drag to find the boundary)
variables:
  - the center of the allowed interval
  - the allowed distance from the center
  - a test point
---

## Try it

1. Drag the point labelled x back and forth under the V-shaped curve.
2. Watch where the curve dips below the horizontal axis — that stretch is every x within the allowed distance of the target.
3. Raise the "radius r" slider and watch that dipped stretch widen on both sides at once.

## Real-life examples

1. **Bolt manufacturing tolerance.** A factory accepts a bolt only if its length lands within 0.3 mm (radius r) of a 2 mm target mark (center c). Anything further off gets rejected.
2. **Fever check.** A digital thermometer sounds an alarm when a reading strays more than 1 °C (radius r) from the healthy baseline at 0 (center c).
3. **Delivery robot geofence.** A warehouse robot must stay within 5 units (radius r) of its charging dock at position -4 (center c) on the floor map.

## Test yourself

1. Move the point x onto the exact edge of the dipped region, where the curve touches the axis.
2. Make the accepted range exactly 10 units wide, from edge to edge.
3. Move the point x to a spot exactly 3 units outside the accepted range.

## Intuition

A factory accepts a bolt only if its length lands within 0.3 mm of a 2 mm target mark; anything further off gets thrown out. The picture shows this test as a V-shaped curve, drawn from $|x-c|-r$, that dips down and touches bottom exactly at the target. Drag the point x sideways along the curve: everywhere it sits below the horizontal axis is a length the factory would accept. The two spots where the curve crosses that axis mark the edges of the accepted range.

The slider labelled center c sets that target mark, and radius r sets how far off a part may still be. Raise r and the V drops lower, so the accepted stretch below the axis widens on both sides at once — a looser tolerance always lets more lengths through. Move c instead and the whole V slides sideways, target and accepted range together, without changing how wide that range is.

## Formal

$|x - c| < r$ (for $r > 0$) means $x$ lies within $r$ of $c$: $c - r < x < c + r$.

Equivalently, $|x-c| - r < 0$, so the solution set is exactly where the plotted function is negative.

## Advanced

The same reasoning with $>$ instead of $<$ gives the complementary set $x < c-r$ or $x > c+r$ — a union of two rays, not an interval — because the absolute value function is convex with a single minimum, so it is below any positive threshold on one connected interval but above it on two separate pieces.

## Derivation

1. Distance from $c$ to $x$ is less than $r$.
2. Definition of absolute value as a two-sided bound.
3. Add $c$ to all three parts.

## Real world

### Manufacturing tolerances
A part is acceptable if its measurement is within $r$ of the target $c$ — precisely an absolute-value inequality.

### Error bars and confidence
A measurement "accurate to within $r$" defines an interval exactly this way.

### Signal thresholds
A control system flags a fault when a reading strays more than $r$ from its setpoint.

### GPS and geofencing
Being "within range" of a location is an absolute-value (distance) condition in one or more dimensions.
