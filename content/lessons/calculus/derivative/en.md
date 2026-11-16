---
title: Derivative
summary: Find the slope at one point on a curve, even when the slope changes along it.
parameters:
  x: position x on the curve
variables:
  - the function value; the height of the solid curve at x
  - the derivative; the slope of the solid curve at x, shown by the dashed graph
---

## Try it

1. Move the point to x = 0. The straight line through it is horizontal, and the slope is 0.
2. Move to x = 3. The straight line rises from left to right, and its slope is 6.
3. Move to x = -3. The straight line falls from left to right, and its slope is -6.

## Real-life examples

1. **The bottom of a curved path.** At x = 0, the tangent is horizontal. The slope at this point is zero, even though the path rises on both sides.
2. **An uphill section.** At x = 3, the tangent has slope 6. For a small horizontal step to the right, the rise is approximately six times that step.
3. **A downhill section.** At x = -3, the tangent has slope -6. For a small horizontal step to the right, the height decreases by approximately six times that step.

## Test yourself

1. Find a point where the slope is 0.
2. Find a point where the slope is 6.
3. Find a point where the slope is -8.

## Intuition

A straight ramp has the same slope all the way along. A curved path can be nearly flat in one place and steep in another. To describe it, we need a slope at each point. This is what the derivative gives us.

The solid curve shows the function. Move the point and watch the straight line through it turn. This line is the tangent: it follows the curve's direction at that point. Its slope is the derivative there. A positive value means the curve rises as you move right; a negative value means it falls.

The dashed graph records these slopes. At x = 3, its height is 6 because the solid curve's slope there is 6. This describes a local rate of change. It does not mean that moving a whole unit along the curve increases its height by exactly 6, because the slope changes as you move.

## Formal

Choose two nearby points, separated horizontally by h. Their vertical change divided by h gives the slope between them. The derivative is the value this ratio approaches as h approaches zero: $f'(x) = \lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$, provided the limit exists. We approach zero without dividing by zero.

Near a chosen position $x_0$, the tangent gives a linear approximation: $f(x) \approx f(x_0) + f'(x_0)(x - x_0)$. Start with the height at the chosen point, then add the slope times the small horizontal change.

## Advanced

Differentiability at $x_0$ means $f(x_0 + h) = f(x_0) + f'(x_0)h + o(h)$. The notation o(h) means that the approximation error divided by h tends to zero. A differentiable function is continuous, but a continuous function need not be differentiable. For example, $|x|$ has slopes -1 and 1 on opposite sides of zero, so it has no derivative there.

## Derivation

1. Take two points at $x$ and $x + h$. For the square function, subtract their heights and divide by their horizontal separation h.
2. Expand the square and cancel the common terms. Then divide by $h$, which is allowed because $h \ne 0$. The result is 2x + h.
3. Let h approach zero. The slope between the points approaches 2x, so this is the derivative of the square function.

## Real world

### Motion

If a function gives position over time, its derivative gives velocity at a particular moment. The derivative of velocity gives acceleration.

### Finding high and low points

At an interior maximum or minimum where a function is differentiable, its derivative is zero. A zero derivative alone does not guarantee a maximum or minimum; the graph may flatten briefly and keep rising.

### Production costs

The derivative of total cost with respect to quantity estimates the cost of producing a little more. It approximates the cost of one extra unit when the rate changes little over that unit.

### Training a model

Derivatives tell a learning algorithm how a small change in a parameter affects its error. The algorithm uses that information to choose an adjustment that aims to reduce the error.
