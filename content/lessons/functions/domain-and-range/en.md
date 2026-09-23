---
title: Domain and range
summary: >-
  Know before you even calculate whether a formula makes sense for the
  numbers you have — a square root needs a non-negative input, and you can
  never divide by zero.
parameters:
  x: point x
  a: a — smallest allowed input
  b: b — the forbidden input
variables:
  - the input you drag along the curve
  - the smallest input allowed — nothing is plotted before it, because the square root needs it
  - the one input that is never allowed — dividing by it is impossible
---

## Try it

1. Drag «x» from the left edge to the right. Below «a», the curve simply is not there — the square root of a negative number has no answer.
2. Now watch what happens as «x» creeps up toward «b». The curve shoots off the top or bottom of the screen and is missing at exactly that one point.
3. Move «a» and «b» themselves with their sliders. The forbidden stretch at the start and the single forbidden point in the middle both move with them.

## Real-life examples

1. **Draining a pool.** The pool can only be measured from day a=2 onward (a negative day makes no sense); on day x=6, with a sensor glitch fixed at day b=8, the reading is sqrt(6-2)/(6-8) = -1.
2. **Splitting a bill among friends.** Dividing a cost among x friends breaks down completely at x=b=0 friends — there is no such split, no matter how the rest of the formula looks.
3. **A cable's minimum reach.** The cable can only be measured from a=4 metres up the pole; at exactly x=4, right at that minimum, the reading is 0 — the very edge of what is allowed, with the pole's anchor at b=8 always skipped.

## Test yourself

1. Find a, b and x so the curve simply is not there — put x below a.
2. Find a and b so the point can land exactly on the one forbidden input.
3. Find a, b and x so the curve's value is exactly 1.

## Intuition

Picture a tub that only starts draining once it holds at least 2 litres — fill it with less and the draining formula makes no sense, so nothing is plotted before x=2. Drag the point along the blue curve: to the left of x=2 there is nothing to drag onto at all. That whole stretch of input is simply not allowed. This is the domain: the set of inputs the rule is willing to accept.

Now watch what happens as the point creeps toward x=8. The curve shoots up or down and vanishes completely right at that one input, because the rule divides by (x-8), and dividing by zero has no answer anywhere. Change the slider «b» and this single forbidden point follows it. Every function has some set of inputs it can actually use — the domain — and some set of values it can actually produce — the range — and this picture makes both visible at once.

## Formal

For a function $f$, the domain is the set of inputs $x$ for which $f(x)$ is defined, and the range is the set of values $f(x)$ actually takes. Here $f(x) = \dfrac{\sqrt{x-a}}{x-b}$ needs $x - a \ge 0$ for the square root and $x - b \neq 0$ for the division, so the domain is $x \in [a, \infty)$ with the single point $x = b$ removed.

The range is whatever set of heights the curve actually reaches on the vertical axis, read directly off the picture rather than assumed from the formula alone.

## Advanced

For a general function, domain and range must be checked wherever the defining expression contains a root of even order, a denominator, a logarithm, or an inverse trigonometric function; combining several such restrictions, as here, intersects each one's allowed set, and finding the true range can require calculus rather than simple inspection.

## Derivation

1. The square root needs a non-negative number inside it, so x − a must be at least 0, which means x ≥ a.
2. Division needs a non-zero denominator, so x − b cannot be 0, which means x ≠ b.
3. Putting both together: the domain is every x from a upward, except the single point x = b.

## Real world

### Speedometers and sensors
A sensor that reports the square root of a reading only accepts non-negative readings; anything below its zero point is simply not shown.

### Rental and billing formulas
A per-person cost that divides by the number of people breaks down at zero people, so billing software explicitly blocks that input.

### Engineering tolerances
Design formulas often only make sense above some minimum size or below some maximum load; values outside that domain are meaningless before any calculation even starts.

### Ticket price tables
A ticket-price or tax table only has entries for certain inputs, such as specific ages or income brackets; a lookup outside that table has no defined price, exactly like a value outside a function's domain.
