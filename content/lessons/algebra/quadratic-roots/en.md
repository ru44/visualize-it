---
title: Quadratic roots and the discriminant
summary: 'Find where a quadratic equals zero and tell whether it has two, one or no real roots.'
parameters:
  a: 'quadratic coefficient a'
  b: 'linear coefficient b'
  c: 'constant c'
  x: 'selected input x'
variables:
  - 'coefficients of the squared, linear and constant terms'
  - 'discriminant; determines the number of real roots when a is nonzero'
  - 'selected input on the graph'
---

## Try it

1. Set a to 1, b to 0 and c to -4. The graph meets the horizontal axis at x = -2 and x = 2.
2. Keep a and b fixed and raise c to 0. The two roots meet at the vertex, x = 0.
3. Raise c to 4. The lowest output is now 4, so the graph never reaches zero. Changing c shifts vertically; changing b does not simply lift the curve.

## Real-life examples

1. **An illustrative height curve.** With a = -1, b = 4 and c = 0, the output is zero at x = 0 and x = 4. These could represent the start and end of an idealized arc on a suitably scaled time axis.
2. **A strictly positive output.** With a = 1, b = 0 and c = 5, every real input gives at least 5. There is no real root. A positive cost alone says nothing about profit without a revenue model.
3. **One repeated root.** With a = 1, b = -6 and c = 9, the rule is the square of x minus 3. It touches zero only at x = 3.

## Test yourself

1. Make the output at x = 5 within 0.3 of zero, with the absolute value of a greater than 0.3.
2. Make the discriminant zero. Keep a nonzero to obtain the intended quadratic with a repeated root.
3. Choose a below -0.05 and a discriminant below -0.5, giving a downward-opening parabola with no real roots.

## Intuition

A root is an input that makes the output zero. For x squared minus 4, both 2 and -2 work because each squares to 4. On the graph, these inputs are the points where the curve meets the horizontal axis.

Now add 4 to every output. The rule becomes x squared, and only zero gives zero. Add another 4 and the rule becomes x squared plus 4, which cannot reach zero for a real input. This sequence shows two real roots, one repeated root, and no real roots.

The discriminant lets us distinguish these cases from the coefficients. It is the quantity inside the square root in the quadratic formula. A positive value gives two square-root choices, zero makes them coincide, and a negative value has no real square root.

## Formal

For a nonzero a, the roots of $ax^2+bx+c=0$ are $x=(-b\pm\sqrt{\Delta})/(2a)$, where $\Delta=b^2-4ac$.

A positive discriminant gives two distinct real roots. Zero gives one repeated real root at the vertex. A negative discriminant gives no real roots. If a is zero, use the remaining linear or constant equation instead of this formula.

## Advanced

When the discriminant is negative, allowing complex numbers gives a conjugate pair of roots. The real graph still does not meet the horizontal axis. A root may also be outside the graph window or outside the usable domain of an application.

## Derivation

1. Assume a is nonzero, divide both sides by a, and move the constant to the right.
2. Add the same completing-square term to both sides. The left becomes a square and the right contains the discriminant.
3. Take both square-root choices and isolate x. The resulting formula is valid over the reals when the discriminant is nonnegative.

## Real world

### Reaching a target

Subtract a target height from an idealized quadratic height model. Roots identify when the model reaches that target, subject to its physical time interval.

### Zero profit

If a profit model is quadratic, its real roots are candidate break-even quantities. Check which quantities are feasible.

### Geometric intersections

Intersecting a line with a quadratic curve can lead to a quadratic equation. The discriminant indicates two intersections, tangency, or no real intersection.
