---
title: Absolute value inequalities
summary: >-
  The inequality $|x-c| < r$ describes every point within distance $r$ of $c$ —
  exactly where the V-shaped curve $|x-c|-r$ dips below zero.
parameters:
  c: center c
  r: radius r
  x: x (drag to find the boundary)
variables:
  - the center of the allowed interval
  - the allowed distance from the center
  - a test point
---

## Intuition

The curve is a V with its point at $x = c$, shifted down by $r$. Drag $x$ across the plot: everywhere the curve dips below the axis is exactly the set of $x$ satisfying $|x-c| < r$ — the two spots where it crosses zero are the boundary of that region.

Widen $r$ and the V drops further, so the below-zero stretch widens on both sides at once — because distance from $c$ is being compared against a bigger radius. Move $c$ and the whole V, and hence the solution interval, just slides sideways with it.

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
