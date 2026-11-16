---
title: Splitting a vector into components
summary: 'Describe one vector by perpendicular horizontal and vertical components using sine and cosine.'
parameters:
  theta: 'θ — direction above the positive horizontal axis'
variables:
  - 'F: vector magnitude; the diagram uses 1'
  - 'θ: angle from the positive horizontal axis'
  - 'Fₓ: horizontal component'
  - 'Fᵧ: vertical component'
---

## Try it

1. Set θ = 0°. Cosine is 1 and sine is 0, so the vector points entirely along the horizontal axis.
2. Set θ = 45°. Both components of the unit vector are about 0.7071. Their ordinary sum exceeds 1, but their squares add to 1.
3. Set θ = 90°. The horizontal component is zero and the vertical component is 1. In the 3D view, the vector and both components still lie in one plane.

## Real-life examples

1. **A 60 N force at 15°.** Its horizontal component is about 57.96 N and its upward component about 15.53 N. These describe one force; an upward component alone does not show whether an object lifts off a surface.
2. **A 20 N force at 45°.** Each component is about 14.14 N. Equal components do not mean half the force magnitude in each direction.
3. **A 15 m/s velocity at 70°.** The horizontal component is about 5.13 m/s and the upward component about 14.10 m/s. The same geometry applies to velocity as to force.

## Test yourself

1. Make the horizontal component of the unit vector approximately 0.87.
2. Make its vertical component greater than 0.9 while keeping its horizontal component positive.
3. Make the two unit-vector components differ by less than 0.02.

## Intuition

A diagonal arrow can be described by how far its endpoint lies horizontally and vertically from its start. These two signed amounts are its components. The display uses an arrow of length 1: cosine gives the horizontal component and sine gives the vertical component. For a force of a different magnitude, multiply both readouts by that magnitude.

At 45°, a force of 20 N has components about 14.14 N and 14.14 N. Adding those numbers gives 28.28, but they act in perpendicular directions. Their vector sum has magnitude 20 N. Resolving a force changes its description, not the force itself; whether either component is useful depends on the situation.

## Formal

For magnitude $F\geq0$ and angle θ measured from the positive horizontal axis, $F_x=F\cos\theta$ and $F_y=F\sin\theta$. This control covers 0° to 90°, where both components are nonnegative. The diagram shows the case F = 1; the examples supply other magnitudes.

Perpendicular components recombine through $F_x^2+F_y^2=F^2$, hence $F=\sqrt{F_x^2+F_y^2}$. Components carry the same units as the vector: newtons for force, metres per second for velocity. Outside the displayed quadrant, negative components indicate the opposite axis direction.

## Advanced

You can choose axes along and perpendicular to an inclined surface instead of horizontal and vertical. The component values change with the axes, but the vector and its magnitude remain the same. When a pulling force has an upward component, it may reduce the normal contact force and friction; it is not automatically wasted.

## Derivation

1. For a nonzero vector in the displayed quadrant, the vector and its perpendicular components form a right triangle with hypotenuse F. At the axis endpoints, use the limiting values.
2. Multiply the cosine ratio by F to obtain the horizontal component.
3. Multiply the sine ratio by F to obtain the vertical component. The component formulas also give zero components when F is zero, although its direction is then undefined.

## Real world

### Combining forces

Resolve each force into components, add the horizontal components together and the vertical components together, then recombine to find the resultant.

### Projectile models

In an ideal model without air resistance, initial velocity components set horizontal speed and initial vertical speed. Horizontal range depends on both horizontal speed and the flight time, which also depends on vertical motion and landing height.
