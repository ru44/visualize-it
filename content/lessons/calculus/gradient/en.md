---
title: Surfaces and the gradient
summary: >-
  A function of two variables is a landscape. The gradient is the compass that
  always points straight uphill.
parameters:
  x0: point x
  y0: point y
variables:
  - slope if you walk in the x direction only
  - slope if you walk in the y direction only
  - the gradient vector (orange arrow on the floor)
---

## Intuition

Drag to rotate the bowl, then move the point with the sliders. The small orange tile is the tangent plane — the surface’s best flat approximation there, the 3D version of a tangent line.

The arrow on the floor is the gradient. It always points directly away from the bottom of the bowl — the steepest way up — and it grows as the walls get steeper. At the very bottom it vanishes: flat ground, a minimum.

## Formal

$\nabla f = (f_x, f_y)$. The directional derivative along a unit vector $\mathbf{u}$ is $\nabla f \cdot \mathbf{u}$, maximised when $\mathbf{u} \parallel \nabla f$.

Tangent plane at $(a,b)$: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$.

## Advanced

The gradient is perpendicular to level curves: along a curve $\gamma$ with $f(\gamma(t))$ constant, the chain rule gives $\nabla f \cdot \gamma' = 0$. Critical points are classified by the Hessian — here $2I$, positive definite, hence a strict minimum.

## Derivation

1. Freeze $y$ and differentiate as usual.
2. Any direction is a mix of the two axis directions.
3. Largest when $\alpha = 0$: walking along the gradient climbs fastest.

## Real world

### Machine learning
Training a neural network is gradient descent on a loss surface with millions of dimensions.

### Weather maps
Wind is driven by the pressure gradient; tightly packed isobars mean a steep gradient and strong wind.

### Heat flow
Heat flows along the negative temperature gradient (Fourier’s law).

### Hiking
On a contour map the gradient points straight across the contour lines — the steepest path.
