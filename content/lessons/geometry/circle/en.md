---
title: 'Circle: circumference and area'
summary: 'Use the radius to calculate a circle’s boundary length and the area inside it.'
parameters:
  r: 'r — radius, from centre to boundary'
variables:
  - 'r: radius; drag the boundary handle or use the slider'
  - 'C: circumference, the boundary length'
  - 'A: area of the enclosed disk'
---

## Try it

1. Set r = 1. Read circumference about 6.28 and area about 3.14. These measure different things and use different units.
2. Set r = 2. The circumference doubles to about 12.57, while the area quadruples to about 12.57. Their numerical agreement here does not make length and area interchangeable.
3. Compare C/d at different radii. It remains about 3.141593. The picture automatically rescales, so follow the numerical values rather than the circle's screen size.

## Real-life examples

1. **A circular mat.** A mat with radius 1.8 m covers about 10.18 m², using area = π × 1.8².
2. **A circular cover.** A cover with radius 0.5 m has a boundary about 3.14 m long and area about 0.79 m².
3. **A circular garden bed.** A bed with radius 3 m covers about 28.27 m² and needs about 18.85 m of edging around its boundary.

## Test yourself

1. Choose a radius giving an area of about 12.
2. Make r greater than 3 and the circumference greater than 25.
3. Keep r below 1 and the area below 2.

## Intuition

The radius is the distance from the centre to the boundary. A diameter crosses the centre from one side to the other, so it is twice the radius. The circumference is the length of one trip around the boundary. The segment under the circle represents that boundary laid straight; its tick spacing represents one radius.

The circumference is a little more than six radii, or a little more than three diameters. The fixed ratio of circumference to diameter is π, approximately 3.14159. The area measures how much flat surface lies inside the circle. Doubling the radius doubles all lengths but multiplies the area by four.

## Formal

For positive radius r, a circle consists of points at distance r from its centre. Its diameter is $d=2r$, and its circumference is $C=\pi d=2\pi r$. Lengths such as r, d and C use the same unit.

The enclosed disk has area $A=\pi r^2$. If r is measured in metres, C is measured in metres and A in square metres. Scaling r by a positive factor k scales C by k and A by $k^2$.

## Advanced

Increasing the radius by a small amount h adds an annulus with exact area 2πrh + πh². When h is small compared with r, the second term is small and the added area is approximately circumference × thickness. This explains why the derivative of area with respect to radius equals circumference.

## Derivation

1. Cut the disk into many narrow sectors. Each is approximately a triangle with height r and base a small arc of the circumference.
2. Arrange them alternately pointing up and down. As the sectors become narrower, the arrangement approaches a rectangle of height r and width C/2.
3. Its area is rC/2. Substituting C = 2πr gives πr². Taking the limit of increasingly narrow sectors makes the result exact.

## Real world

### Edging and covering

To border a round bed, use circumference to calculate edging length. To cover its surface, use area. The same radius answers both questions, but with different formulas and units.

### Rolling a wheel

An ideal wheel rolling without slipping travels one circumference per full rotation. Doubling its radius doubles that distance per rotation.
