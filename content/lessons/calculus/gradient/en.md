---
title: Surfaces and the gradient
summary: >-
  Standing on a hillside and wanting the fastest way to the top, without
  walking the whole hill first, is exactly what the gradient — a compass
  that always points straight uphill — tells you.
parameters:
  x0: point x
  y0: point y
variables:
  - slope if you walk in the x direction only
  - slope if you walk in the y direction only
  - the gradient vector (orange arrow on the floor)
---

## Try it

1. Move «point x» and «point y» to (0, 0), the bottom of the bowl. The orange gradient arrow shrinks to nothing.
2. Drag both sliders up together. The orange arrow grows and points straight away from the bottom — the steepest way up.
3. Drag only «point x» while keeping «point y» fixed. The tangent plane tilts along one direction only.

## Real-life examples

1. **Standing at the bottom of the bowl.** At (x, y) = (0, 0) the ground is flat: the gradient vanishes, so there is no single steepest way up.
2. **Partway up a steep slope.** At (x, y) = (1.5, 1.5) the gradient arrow is long: the ground climbs quickly in the direction it points.
3. **Near the rim, off to one side.** At (x, y) = (-2, 0.5) the point sits close to the edge of the bowl, where the slope is steep in the x-direction and gentler in the y-direction.

## Test yourself

1. Find a point close to the bottom of the bowl — within 0.5 units of the centre — where the gradient is nearly zero.
2. Make the gradient's length about 5.
3. Find a point where the slope in the x-direction is exactly twice the slope in the y-direction.

## Intuition

Imagine standing somewhere on the inside of a round, bowl-shaped valley, wanting to know which direction leads straight uphill. Drag to rotate the picture, then move the point with the sliders «point x» and «point y» to stand at different spots. The small orange tile beneath your feet is the tangent plane — a flat patch that matches the bowl's tilt at exactly that spot, like a tiny platform balanced on the slope.

The arrow lying flat on the floor is the gradient: it always points directly away from the bottom of the bowl, showing the one steepest way up from where you stand, and it grows longer as the walls around you get steeper. Stand exactly at the bottom (0, 0) and the arrow shrinks to nothing — the ground is flat there, because you are at the lowest point of the whole bowl.

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
