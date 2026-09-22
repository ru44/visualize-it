---
title: Quadratic roots and the discriminant
summary: >-
  Know instantly, before solving anything, whether a thrown ball ever reaches
  a target height, a business ever breaks even, or a design goal is simply
  out of reach.
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

## Try it

1. Drag the point across the curve and watch it cross the horizontal axis — each crossing is a root.
2. Shrink c toward 0, or raise the curve with b, and watch the two crossings slide together.
3. Push the curve up further still and watch it lift off the axis completely — no more crossings at all.

## Real-life examples

1. **A ball's two landing times.** A ball's height over time follows h = -t² + 4t (a=-1, b=4, c=0): it starts on the ground at t=0 and lands again at t=4 seconds.
2. **A cost that never breaks even.** A production cost model x² + 5 (a=1, b=0, c=5) never touches zero at any output level — the business can never break even, no matter how much it makes.
3. **A satellite dish that just touches the ground.** A dish shaped like (x-3)² (a=1, b=-6, c=9) touches the ground at exactly one point, x=3, and nowhere else.

## Test yourself

1. Find a, b and c, keeping the curve genuinely curved (a not zero), so that plugging x = 5 into the expression gives exactly zero.
2. Make the discriminant exactly zero, so the curve just touches the axis at a single point.
3. Make the parabola open downward with no real roots at all, so it never touches the axis.

## Intuition

Throw a ball straight up and its height over time traces a curve that starts at zero, rises, then falls back to zero again — that return to the ground is a second root of the same equation as the launch. Drag the point across the blue curve here: wherever it crosses the horizontal axis is a root, a time when the height is exactly zero. With the starting numbers you should see two such crossings.

Now shrink c toward 0, or raise the curve with b, and watch the two crossings slide toward each other. Push the curve up until it just kisses the axis at its very peak — one repeated root, the knife-edge case where the ball just barely grazes the ground and no more. Push it further still and the curve never comes back down to zero at all: the ball, in this equation, never lands — no real roots, only complex ones.

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
