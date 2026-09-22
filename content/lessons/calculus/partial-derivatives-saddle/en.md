---
title: Partial derivatives and saddle points
summary: >-
  A mountain pass is the lowest point along the ridge but the highest point
  along the trail crossing it — a saddle point is exactly that two-faced
  spot, and this shows you how to spot one.
parameters:
  x0: point x
  y0: point y
variables:
  - 'slope walking in the $x$ direction — here $2x$, always concave up'
  - 'slope walking in the $y$ direction — here $-2y$, always concave down'
  - the gradient — zero exactly at the saddle point
---

## Try it

1. Move the point along the x-axis, keeping «point y» at 0. The tangent plane curves upward like the wall of a valley.
2. Now move along the y-axis instead, keeping «point x» at 0. The same surface curves downward like a hilltop.
3. Bring the point back to the origin. The tangent plane goes flat, but this flat point is neither a peak nor a valley — it's a saddle.

## Real-life examples

1. **Sitting exactly at the saddle point.** At (x, y) = (0, 0), the tangent plane is flat and the gradient vanishes — yet this is neither a hilltop nor a valley floor.
2. **Walking straight into the uphill direction.** At (x, y) = (1.5, 0), the surface curves upward, like starting up a valley wall.
3. **Walking straight into the downhill direction.** At (x, y) = (0, 1.5), the same surface curves downward, like starting down a hilltop.

## Test yourself

1. Find a point away from the origin where the height is exactly 0 — on the saddle's diagonal ridge.
2. Climb to a height above 3 by moving along the x-axis.
3. Drop to a height below -3 by moving along the y-axis.

## Intuition

Move the point along the x-axis, keeping «point y» at 0: the tangent plane tilts like the wall of a valley, curving upward the way a bowl does. Now move along the y-axis instead, keeping «point x» at 0: the same surface curves downward like a hilltop. One surface, two completely opposite behaviours depending on which direction you walk.

Bring the point back to the origin (0, 0): the tangent plane goes perfectly flat and the gradient arrow shrinks to nothing, just as it would at a true minimum or maximum — but this flat point is neither. It is a saddle, the shape a horse rider sits on: curving up toward the horse's head and tail, down toward its sides.

## Formal

$f_x = 2x$, $f_y = -2y$; both vanish only at the origin, so $(0,0)$ is the only critical point.

The Hessian is $\begin{pmatrix}2&0\\0&-2\end{pmatrix}$, with eigenvalues of opposite sign — the signature of a saddle point, neither a local max nor min.

## Advanced

The second-derivative test formalises the picture: with $D = f_{xx}f_{yy} - f_{xy}^2$, $D<0$ at a critical point guarantees a saddle regardless of direction chosen, because the quadratic form $f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2$ (the local approximation of $f$ near the point) takes both signs — here $2h^2 - 2k^2$, positive along $h$, negative along $k$.

## Derivation

1. Differentiate holding the other variable fixed, one at a time.
2. Critical points are where the gradient vanishes.
3. The Hessian's mixed-sign eigenvalues classify the origin as a saddle, not an extremum.

## Real world

### Mountain passes
A literal mountain pass is a saddle point: lowest along the ridge, highest along the trail crossing it.

### Game theory equilibria
A minimax equilibrium in a zero-sum game is a saddle point of the payoff function — best response in one direction, worst in the other.

### Optimization pitfalls
Gradient descent can stall near saddle points in high-dimensional loss surfaces, since the gradient nearly vanishes without being at a true minimum.

### Structural engineering
Saddle-shaped (hyperbolic paraboloid) roofs are strong precisely because they curve oppositely in two directions, resisting buckling both ways.
