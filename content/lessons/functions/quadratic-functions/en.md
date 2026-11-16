---
title: Quadratic functions in vertex form
summary: Locate a parabola's highest or lowest point directly from its equation.
parameters:
  x: input x
  a: vertical scale a (nonzero for a parabola)
  h: vertex horizontal position h
  k: vertex height k
variables:
  - vertical scaling coefficient; its sign chooses upward or downward opening
  - horizontal coordinate of the vertex
  - vertical coordinate of the vertex
  - input position
---

## Try it

1. Set a to -0.75, h to 2 and k to 3. Compare x = 1, 2 and 3. The heights are 2.25, 3 and 2.25, showing symmetry around x = 2.
2. Change h to 4. The vertex moves two units right and its height remains 3.
3. Change a to 0.75. The same vertex is now the lowest point. At a = 0, the graph becomes a horizontal line instead of a parabola.

## Real-life examples

1. **An idealized arc.** With a = -0.75, h = 2 and k = 3, the maximum is 3 at x = 2. The curve reaches zero at x = 0 and x = 4.
2. **A model ramp.** With a = 0.3, h = 0 and k = 0, the minimum is at the origin. This is a parabolic ramp model, not a claim that every ramp has this profile.
3. **A shifted arc.** With a = -0.4, h = -3 and k = 4, the maximum is at (-3, 4). The negative horizontal coordinate means left of the chosen origin.

## Test yourself

1. Choose a above 0.1 and k within 0.2 of 6.
2. Put the vertex at h = -3 and k = 4. Keep a nonzero for a parabola.
3. Choose a below -0.1 and make the output at x = 5 within 0.3 of zero. You do not need to move the selected point to x = 5 for the checker to evaluate it.

## Intuition

Start with the rule “square the input.” Its smallest output is zero, reached at input zero. Inputs equally far from zero give the same answer: -2 and 2 both give 4. This creates the symmetric bowl-shaped graph called a parabola.

Now square x minus h instead. The squared quantity becomes zero at x = h, moving the centre of symmetry there. Add k to raise or lower every output. The turning point is now at horizontal position h and height k.

Multiplying the squared quantity by a positive a keeps the bowl opening upwards. A negative a turns it downwards, making the vertex a maximum. Larger absolute values of a make outputs change more sharply away from the vertex. If a is zero, the squared term disappears and there is no unique turning point.

## Formal

Vertex form is $f(x)=a(x-h)^2+k$, with a nonzero. The vertex is $(h,k)$, and the symmetry axis is $x=h$.

Because a square is nonnegative, positive a makes every output at least k, while negative a makes every output at most k. Equality occurs at x = h in either case.

## Advanced

For standard form with nonzero a, completing the square gives $h=-b/(2a)$ and $k=c-b^2/(4a)$. This is the same function in a form that makes the turning point explicit. A physical interpretation may use only a restricted portion of its graph.

## Derivation

1. The square of x minus h is nonnegative and is zero exactly when x equals h.
2. Multiplication by positive a preserves that inequality.
3. Adding k gives a minimum of k at x = h. With negative a, reverse the inequality to obtain a maximum instead.

## Real world

### Ideal projectile paths

With constant gravity and negligible air resistance, height as a function of horizontal position can be parabolic. The vertex locates the maximum within that idealized trajectory.

### Design profiles

A parabolic profile gives a symmetric curve with a specified centre and depth. Vertex form lets the designer set those directly.

### Optimization models

When a model is quadratic, vertex form identifies its unrestricted maximum or minimum. Check whether the vertex lies inside the usable domain.
