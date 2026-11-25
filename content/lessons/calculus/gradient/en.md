---
title: Surfaces and the gradient
summary: 'Combine slopes in two coordinate directions to find the direction of greatest local increase.'
parameters:
  x0: 'x₀ — selected x coordinate'
  y0: 'y₀ — selected y coordinate'
variables:
  - '∂f/∂x: slope when only x changes'
  - '∂f/∂y: slope when only y changes'
  - '∇f: vector of the two partial slopes in the input plane'
---

## Try it

1. Set x₀ = y₀ = 0. Both partial derivatives and the gradient magnitude are zero. The tangent plane is horizontal at the bowl's minimum.
2. Set x₀ = 1 and y₀ = 0. The partial derivatives are 2 and 0, so the gradient points along positive x.
3. Keep x₀ = 1 and set y₀ = 1. The gradient becomes (2, 2), with magnitude about 2.828. Drag the view to rotate the camera; use the sliders to move the selected point.

## Real-life examples

1. **At the minimum.** At (0, 0), f = 0 and the gradient is (0, 0). Every directional derivative is zero there, although the surface rises away from the point.
2. **Two positive slopes.** At (1.5, 1.5), f = 4.5 and the gradient is (3, 3), with magnitude about 4.243.
3. **Different signs.** At (−2, 0.5), f = 4.25 and the gradient is (−4, 1). Moving toward more negative x increases height; moving toward more positive x initially decreases it.

## Test yourself

1. Choose a point whose distance from the origin in the x–y plane is less than 0.5.
2. Make the gradient magnitude within 0.5 of 5.
3. Make |x₀ − 2y₀| less than 0.05. Here that also makes the x slope approximately twice the y slope.

## Intuition

A surface can rise differently in different directions. To measure its x slope, change x while holding y fixed. To measure its y slope, do the reverse. These are partial derivatives. On the bowl x² + y² they are 2x and 2y, so at (1, 1) either positive coordinate direction initially increases height at rate 2.

Combining those slopes gives the gradient (2, 2). Moving diagonally in its direction increases height faster per unit distance in the x–y plane than moving along either axis alone. The floor arrow indicates this direction, and the tangent patch approximates the surface near the selected point. The arrow's drawn length is capped; use the magnitude readout for a numerical comparison.

## Formal

For a differentiable function f, $\nabla f=(f_x,f_y)$. Along a unit direction u in the input plane, $D_{\mathbf u}f=\nabla f\cdot\mathbf u$. When the gradient is nonzero, the greatest directional derivative is $|\nabla f|$, attained in the same direction as the gradient. If the gradient is zero, all first directional derivatives are zero.

The tangent plane at (a, b) is $z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$. For this bowl, $\nabla f=(2x,2y)$. The plane describes local change; it generally differs from the curved surface away from the contact point.

## Advanced

At a regular point, the gradient is perpendicular to a level curve: differentiating f along that constant-height curve gives a zero dot product with its tangent. The negative gradient gives the steepest local decrease. On this bowl, x² + y² ≥ 0 proves a global minimum at the origin; a zero gradient alone would not prove a minimum for a different surface.

## Derivation

1. Hold y fixed and differentiate x² + y² with respect to x to get 2x. Holding x fixed similarly gives 2y.
2. The chain rule along a straight unit-speed path combines those partial slopes using the path's direction components.
3. The dot product is gradient magnitude times the cosine of the angle to the unit direction. Its largest value occurs when the nonzero vectors point the same way.

## Real world

### Contour maps

For a smooth height model, the gradient crosses constant-height contours perpendicularly and gives the steepest local rise per unit map distance. It does not determine the shortest route to a distant summit.

### Minimising a function

A sufficiently small step opposite a nonzero gradient decreases a differentiable function locally. A step that is too large can overshoot; repeated steps need not find a global minimum on a general surface.
