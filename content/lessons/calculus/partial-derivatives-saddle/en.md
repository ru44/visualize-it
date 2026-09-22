---
title: Partial derivatives and saddle points
summary: >-
  A saddle curves upward in one direction and downward in the perpendicular
  direction at once — neither a hilltop nor a valley floor.
parameters:
  x0: point x
  y0: point y
variables:
  - 'slope walking in the $x$ direction — here $2x$, always concave up'
  - 'slope walking in the $y$ direction — here $-2y$, always concave down'
  - the gradient — zero exactly at the saddle point
---

## Intuition

Move the point along the $x$-axis, keeping $y_0 = 0$: the tangent plane tilts like the wall of a valley, curving upward the way a bowl does. Now move along the $y$-axis instead, keeping $x_0=0$: the same surface curves downward like a hilltop. One surface, two completely opposite behaviors depending on which direction you walk.

Bring the point back to the origin: the tangent plane goes perfectly flat and the gradient arrow shrinks to nothing, just as it would at a true minimum or maximum — but this flat point is neither. It is a saddle, the point a horse rider sits on: curving up toward the horse's head and tail, down toward its sides.

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
