---
title: Absolute value inequalities
summary: 'Find all inputs whose distance from a target is smaller than a chosen limit.'
parameters:
  c: 'target c'
  r: 'distance limit r'
  x: 'test input x'
variables:
  - 'target at the centre of the interval'
  - 'strict distance limit'
  - 'input being tested'
---

## Try it

1. Set c to 2 and r to 0.3. Compare x = 2 with x = 2.2. Both have a negative plotted output, so both satisfy the strict distance limit.
2. Set x to 2.3. The output is zero: this is the boundary, excluded by the strict inequality.
3. Increase r to 1. The interval between c minus r and c plus r widens, while its centre stays at 2.

## Real-life examples

1. **An illustrative size tolerance.** A target of 2 mm and a strict error limit of 0.3 mm accept lengths greater than 1.7 and less than 2.3 mm. This example excludes the endpoints.
2. **Deviation from a reference.** With c = 0 and r = 1, accepted deviations lie strictly between -1 and 1. Zero is the reference deviation, not a body-temperature reading.
3. **Position on a track.** With c = -4 and r = 5, the allowed positions are greater than -9 and less than 1 on a one-dimensional track.

## Test yourself

1. Put x on either boundary, where the plotted output is zero.
2. Make the interval width 10.
3. Put x three units beyond either boundary, so the plotted output is 3.

## Intuition

Suppose a part should measure 2 mm, with an error smaller than 0.3 mm. A measurement of 2.2 is 0.2 away from the target, so it passes. A measurement of 1.6 is 0.4 away, so it fails. We care about the size of the difference, not its sign.

Absolute value gives that distance. Subtracting the permitted distance makes the plotted output negative for an accepted input, zero at a boundary, and positive outside. The V's horizontal position sets the target; lowering the V by increasing r widens the accepted interval.

## Formal

For r positive, $|x-c|<r$ is equivalent to $c-r<x<c+r$. The endpoints are excluded because the inequality is strict.

The plot shows $|x-c|-r$, so its negative portion identifies the solution interval. At r = 0, the strict inequality has no solutions because a distance cannot be negative.

## Advanced

Replacing the strict inequality with “less than or equal” includes the boundary. The complement of a strict inside condition includes both boundaries and the outside; it is a greater-than-or-equal distance condition. A strict greater-than condition alone excludes the boundaries too.

## Derivation

1. Express distance from the target as an absolute value.
2. A distance smaller than r places the signed difference strictly between negative r and positive r.
3. Add c to all three parts to obtain the interval of accepted inputs.

## Real world

### Manufacturing

A tolerance specifies a target and an allowed error. Check whether the specification includes the limiting values.

### Signal monitoring

A threshold can compare a signal's deviation from a reference against a permitted magnitude.

### Position limits

On a straight track, an absolute difference measures distance from a fixed point. Two-dimensional distance requires a different formula.
