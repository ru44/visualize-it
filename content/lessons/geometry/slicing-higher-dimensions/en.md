---
title: What would a 4D ball look like passing through our room?
summary: 'Use a right triangle to find the size of a cross-section, from a disk cut by a line to a mathematical four-dimensional ball.'
parameters:
  n: 'n — ball dimension: disk (2), ordinary ball (3), four-dimensional ball (4)'
  h: 'h — signed centre offset from the cutting hyperplane, in cm'
  R: 'R — radius of the full ball, in cm'
variables:
  - 'r: slice radius; half the segment length when n = 2'
  - 'R: radius of the full ball'
  - 'h: signed offset; |h| is the perpendicular distance'
charts: []
---

## Try it

1. Set n = 3, R = 5 and h = 4. The slice is a disk of radius 3 cm because 5² − 4² = 9.
2. Keep R = 5 and move h through 5, 0 and −5. The slice grows to radius 5 at the centre, then shrinks. At either endpoint the mathematical intersection is only a point, which the display treats as zero-sized.
3. Set n = 2, then 4 with h = 0. The slice changes from a line segment to a three-dimensional ball. The side-view diagram illustrates the radius calculation; it is not a complete view of a four-dimensional object.

## Real-life examples

1. **An offset cut.** With n = 3, R = 5 cm and h = 4 cm, the disk slice has radius 3 cm and diameter 6 cm.
2. **A central four-dimensional slice.** With n = 4, R = 5 cm and h = 0, the mathematical cross-section is a three-dimensional ball of radius 5 cm.
3. **Near the edge of a disk.** With n = 2, R = 5 cm and h = 4.9 cm, the slice is a segment about 1.99 cm long. Its half-length is √0.99 cm.

## Test yourself

1. Keep R = 5 and make the slice radius approximately 3 cm.
2. Choose n = 4 and make |h| at least R, so there is no positive-radius slice. Use |h| greater than R if you want no intersection at all.
3. Set R = 8 and place the cutting plane through the centre to get the widest slice.
4. Make the slice radius approximately half the original radius.

## Intuition

Cut an ideal solid ball with a flat plane. Near the edge, the cross-section is a small disk. Through the centre, it is a disk as wide as the ball. Continuing past the centre makes the cross-section smaller again. A slice includes only points where the plane meets the ball; a projection would show the whole ball mapped onto the plane.

For radius 5 and a plane 4 units from the centre, draw a perpendicular from the centre to the plane. Then draw a radius to the edge of the slice. These segments and the slice radius form a right triangle with hypotenuse 5 and one leg 4. The remaining leg is 3.

The same calculation works in more dimensions. A line through a disk gives a segment, a plane through a three-dimensional ball gives a disk, and a three-dimensional hyperplane through a four-dimensional ball gives a three-dimensional ball. The last case is a mathematical model, not an observed object entering a room.

## Formal

For a ball of radius R and a hyperplane at perpendicular distance $|h|$ from its centre, an intersecting slice has radius $r=\sqrt{R^2-h^2}$. The sign of h records which side of the plane the centre occupies; it does not affect the radius. The formula requires $|h|\le R$.

When $|h|<R$, an n-dimensional ball has an (n − 1)-dimensional ball as its slice. When $|h|=R$, the intersection is a single point. When $|h|>R$, the intersection is empty. These boundary cases are different even though the display gives both zero slice radius.

## Advanced

Integrating the measures of parallel slices reconstructs the measure of the whole ball. For a four-dimensional ball, integrate the three-dimensional slice volumes (4π/3)(R² − h²)^(3/2) from −R to R to obtain π²R⁴/2. Scanning slices over time is a way to visualize the fourth spatial coordinate; it does not identify that coordinate with physical time.

## Derivation

1. The radius R, the perpendicular distance |h| and the slice radius r form a right triangle, so R² = r² + h².
2. Subtract h² to get r² = R² − h². A real intersection requires the right-hand side to be nonnegative.
3. Take the nonnegative square root because r is a radius. Equality gives r = 0 and a point of contact.

## Real world

### Cutting a ball-shaped object

Parallel cuts through an ideal spherical object produce disks of different sizes. Their sizes depend on distance from the centre, even though the object's radius is fixed.

### Layered models

A solid can be described by a sequence of thin cross-sections. Layer-by-layer fabrication uses that geometric idea, while the finite layer thickness limits how closely the layers reproduce a smooth shape.
