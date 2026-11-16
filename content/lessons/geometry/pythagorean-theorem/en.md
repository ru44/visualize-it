---
title: Pythagorean theorem
summary: 'Find a right triangle’s missing side by adding the areas of squares built on its two perpendicular sides.'
parameters:
  a: 'a — length of one perpendicular leg'
  b: 'b — length of the other perpendicular leg'
variables:
  - 'a: first leg length; drag its endpoint'
  - 'b: second leg length; drag its endpoint'
  - 'c: hypotenuse length, opposite the right angle'
  - 'θ: angle opposite side a'
---

## Try it

1. Set a = 3 and b = 4. The two smaller square areas are 9 and 16. Their sum is 25, and the hypotenuse is 5.
2. Keep a = 3 and set b = 6. The sum becomes 45, so c is the square root of 45, about 6.71.
3. Set a = 6 and b = 8. Compare with the first triangle: the side lengths have doubled and the square areas have quadrupled. The drawing rescales to fit, so use the numerical labels.

## Real-life examples

1. **A square corner.** Perpendicular lengths of 3 m and 4 m give a diagonal of 5 m. Conversely, a triangle with these three side lengths has a right angle.
2. **A sloping support.** A straight support reaching 6 m vertically from a point 1.5 m away horizontally has length √38.25, about 6.18 m, assuming level ground and a vertical wall.
3. **A garden diagonal.** A rectangular garden 5 m by 6 m has a diagonal of √61, about 7.81 m.

## Test yourself

1. Choose a and b so that c is 5.
2. Keep a below 2 while making c greater than 7.
3. Make a and b differ by less than 0.2, with c greater than 9.

## Intuition

The small square at one corner marks a right angle. The two sides meeting there are the legs, a and b. The side opposite that corner is the hypotenuse, c, and is the longest side. Each coloured square uses a triangle side as its own side length.

For legs of 3 and 4, those squares contain 9 and 16 square units. Together they have area 25, the same as the square on a hypotenuse of length 5. We add the squares of the lengths, not the lengths themselves. The diagram always keeps the corner at 90°; it cannot test a triangle with a different corner angle.

## Formal

For a right triangle with leg lengths $a$ and $b$ and hypotenuse length $c$, the Pythagorean theorem states $a^2+b^2=c^2$. Since lengths are positive, $c=\sqrt{a^2+b^2}$. Use the same length unit for every side.

The converse also holds: if positive side lengths forming a triangle satisfy $a^2+b^2=c^2$, the angle opposite c is a right angle. For a triangle that is not right-angled, this equality does not hold.

## Advanced

If the included angle between a and b is γ, the law of cosines gives c² = a² + b² − 2ab cos γ. At 90°, the cosine term vanishes and we recover this theorem. The familiar formula assumes distances in a flat Euclidean plane; distances measured along curved surfaces require a different model.

## Derivation

1. A square with side a + b has area a² + 2ab + b².
2. Arrange four copies of the right triangle inside it with their hypotenuses enclosing a central square of side c. The four triangles have total area 2ab, so the same outer square has area c² + 2ab.
3. Equate the two area expressions and subtract 2ab from both. What remains is a² + b² = c².

## Real world

### Rectangular screens

The screen's width and height form the legs of a right triangle. Its diagonal is the hypotenuse; knowing two of these lengths lets us calculate the third.

### Distance on a grid

Moving 3 units horizontally and 4 vertically places you 5 units from the start in a straight line. The two-leg route itself is 7 units long, so distinguish route length from straight-line distance.
