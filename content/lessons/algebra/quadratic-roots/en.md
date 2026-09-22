---
title: Quadratic roots and the discriminant
summary: >-
  The sign of $b^2 - 4ac$ tells you, before solving anything, whether the
  parabola crosses the axis twice, touches it once, or misses it entirely.
parameters:
  a: a (curvature)
  b: b
  c: c
  x: x (drag along the curve)
variables:
  - coefficients of the quadratic
  - the discriminant — decides the number of real roots
  - point being dragged along the parabola
---

## Intuition

Drag the point across the curve: wherever it crosses the horizontal axis is a root. With the starting values you should see two crossings. Now shrink $c$ toward $0$ or shift the parabola upward with $b$ — watch the two crossings slide toward each other.

Push the parabola up until it just kisses the axis at its vertex: that is the knife-edge case of exactly one root, where the tangent line at the crossing is horizontal. Push it further and the curve never returns to zero — no real roots, only complex ones.

## Formal

The roots are $x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$ with $\Delta = b^2 - 4ac$.

$\Delta > 0$ gives two distinct real roots, $\Delta = 0$ gives one repeated root (the vertex touches the axis), and $\Delta < 0$ gives no real roots.

## Advanced

When $\Delta < 0$ the two roots are complex conjugates $\dfrac{-b \pm i\sqrt{-\Delta}}{2a}$; they still satisfy the same factorisation $a(x-r_1)(x-r_2)$, just off the real axis, which is why the parabola can miss the $x$-axis and yet the equation still "has" two roots.

## Derivation

1. Divide through by $a$.
2. Complete the square on the left.
3. Take the square root of both sides and solve for $x$.

## Real world

### Projectile landing time
Height versus time under gravity is quadratic; the discriminant tells you whether a thrown ball ever reaches a given height.

### Break-even with fixed and variable costs
Profit that includes a quadratic revenue term (price affects quantity sold) needs the quadratic formula to find zero-profit points.

### Optics and antenna design
Focal properties of parabolic mirrors and dishes come from the same quadratic geometry.

### Engineering tolerances
A design constraint with no real solution ($\Delta < 0$) tells engineers a target is simply unreachable with the current parameters.
