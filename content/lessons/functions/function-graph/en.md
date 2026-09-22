---
title: Function graph
summary: >-
  See how changing a rule reshapes its entire picture — the first step to
  reading any graph, chart, or formula you will ever meet.
parameters:
  x: input x
  a: a — curvature
  b: b — tilt
  c: c — vertical shift
variables:
  - the input you choose
  - the output the rule produces
  - 'how sharply the curve bends, and whether it opens up or down'
  - shifts the turning point sideways
  - where the curve crosses the vertical axis
---

## Try it

1. Drag the point left and right. Its height is the answer the rule gives for that x.
2. Move the slider «a». Watch the whole curve bend more or less.
3. Set «a» to 0. The curve turns into a straight line: no bending left.

## Real-life examples

1. **A square garden's area.** A garden shaped like a square with side length x=3 metres (a=1, b=0, c=0) has an area of exactly 9 square metres — the output is the side length squared.
2. **A ball's flight height.** A ball thrown so its height follows h = -x² + 4x (a=-1, b=4, c=0) reaches its highest point, 4 metres, at x=2 seconds.
3. **Peak revenue from pricing.** A product's revenue follows R = -0.5x² + 4x (a=-0.5, b=4, c=0): pricing it at x=4 earns the peak revenue of 8.

## Test yourself

1. Find a, b, c (keeping the curve genuinely curved, a not zero) and an x so the output is exactly 16.
2. Choose a negative a and a b so the curve's peak sits exactly at x = 2.
3. Make the curve cross zero both at x=0 and at x=4, while still curving (a not zero).

## Intuition

A square garden with side length x has area x² square metres: make the side 2 metres and the area is 4; make it 3 and the area jumps to 9. The point on this graph does exactly that calculation for you — drag it left and right along the horizontal axis, and its height shows the output for whatever x you land on. The curve is simply the trail of every possible answer, for every possible input, drawn all at once.

Now change a, b or c using the sliders below the graph. You are not just moving a drawing — you are changing the rule itself, and the whole curve redraws to match. Set a to 0 and the curve stops bending altogether, collapsing into a straight line, because the squared term that caused the curve has vanished.

## Formal

A function $f: \mathbb{R} \to \mathbb{R}$ assigns exactly one output to each input. Its graph is the set $\{(x, f(x))\}$.

For a quadratic, the vertex sits at $x = -\tfrac{b}{2a}$ and the sign of $a$ decides whether it is a minimum or a maximum.

## Advanced

The three parameters are coordinates on the space of quadratics; completing the square shows every parabola is an affine image of $y = x^2$, which is why they all share one shape up to scaling.

## Derivation

1. Start from the general quadratic.
2. Complete the square: the same rule, rewritten as a shifted copy of $ax^2$.
3. The squared term is smallest when it is zero — that is the turning point you see on the graph.

## Real world

### Thrown objects
Height against time for a ball in flight is a downward-opening parabola.

### Pricing
Revenue against price is often quadratic: too cheap or too expensive both lose money.

### Satellite dishes
A parabolic cross-section reflects every incoming ray to a single focus.
