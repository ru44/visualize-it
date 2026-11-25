---
title: Partial derivatives and saddle points
summary: 'See why a zero gradient can occur at a point that is neither a maximum nor a minimum.'
parameters:
  x0: 'x₀ — selected x coordinate'
  y0: 'y₀ — selected y coordinate'
variables:
  - '∂f/∂x: slope 2x with y fixed'
  - '∂f/∂y: slope −2y with x fixed'
  - '∇f: vector (2x, −2y)'
---

## Try it

1. Keep y₀ = 0 and move x₀ from −1 to 0 to 1. The surface heights are 1, 0 and 1: this cross-section curves upward.
2. Keep x₀ = 0 and move y₀ through the same values. Heights are −1, 0 and −1: this cross-section curves downward.
3. Set x₀ = y₀ = 0. The tangent plane is horizontal and both partial derivatives vanish, yet nearby surface points lie both above and below it.

## Real-life examples

1. **At the saddle.** At (0, 0), height and gradient are zero. The tangent plane is z = 0.
2. **On the upward cross-section.** At (1.5, 0), height is 2.25 and the gradient is (3, 0).
3. **On the downward cross-section.** At (0, 1.5), height is −2.25 and the gradient is (0, −3). The steepest local increase points toward decreasing y.

## Test yourself

1. Make |x₀² − y₀²| less than 0.05, with at least one of |x₀| and |y₀| greater than 0.3.
2. Find a point with height greater than 3. Setting y₀ = 0 is one approach.
3. Find a point with height less than −3. Setting x₀ = 0 is one approach.

## Intuition

A zero derivative in one variable is a candidate for a turning point, not a guarantee. The same caution applies in two variables. At the origin of x² − y², both partial slopes are zero. But moving a little along x gives a positive height, and moving a little along y gives a negative height.

There are therefore higher and lower points arbitrarily close to the origin. It cannot be a local maximum or minimum; it is a saddle point. The flat tangent patch describes only the first-order slopes. The surface curves above and below that plane. A plane itself does not curve, even when it is drawn on a curved surface.

## Formal

For $f(x,y)=x^2-y^2$, the partial derivatives are $f_x=2x$ and $f_y=-2y$. The gradient vanishes only at $(0,0)$, making it the only critical point. Along y = 0 the function is x², and along x = 0 it is −y².

The Hessian matrix of second derivatives is $H=\begin{pmatrix}2&0\\0&-2\end{pmatrix}$. Its eigenvalues have opposite signs, confirming a saddle. The zero-height set consists of the lines $y=x$ and $y=-x$; their nonzero points are not critical points.

## Advanced

For a twice continuously differentiable function at a critical point, a negative Hessian determinant proves a saddle. Here the determinant is −4. The second-order Taylor term is one half of the Hessian quadratic form, giving h² − k² near the origin; omitting the factor one half would double the actual height change.

## Derivation

1. Hold one variable fixed while differentiating with respect to the other to calculate the two partial derivatives.
2. Set both partial derivatives to zero. They vanish together only when x and y are zero.
3. Differentiate again to obtain the Hessian. Opposite signs in the two coordinate curvatures distinguish the saddle from a minimum or maximum.

## Real world

### Reading a terrain model

A pass can be modelled locally by a surface that rises in one direction and falls in another. The ideal saddle illustrates why one cross-section alone can give a misleading impression.

### Checking an optimisation result

A numerical method reporting a small gradient has not necessarily found a minimum. Examine nearby values or curvature to distinguish a minimum from a saddle.
