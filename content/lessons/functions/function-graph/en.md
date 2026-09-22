---
title: Function graph
summary: >-
  A function is a machine: put in x, get out f(x). The graph is every
  input–output pair drawn at once.
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

## Intuition

Drag the point. Its horizontal position is the input, its height is the output. The curve is simply the trail left by every possible input.

Now change $a$, $b$ and $c$. You are not moving a drawing — you are changing the rule, and the picture follows. Set $a = 0$ and the parabola collapses into a straight line.

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
