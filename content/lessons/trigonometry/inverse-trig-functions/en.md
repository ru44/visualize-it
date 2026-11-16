---
title: Inverse trig functions
summary: 'Recover an angle from a side ratio, and understand why an inverse trig function returns one selected answer.'
parameters:
  a: 'a — side opposite θ'
  b: 'b — side adjacent to θ'
variables:
  - 'a: opposite leg length'
  - 'b: adjacent leg length'
  - 'c: hypotenuse length'
  - 'θ: acute angle opposite a'
---

## Try it

1. Set a = 3 and b = 4. The hypotenuse c is 5 and θ is about 36.87°. The ratio a/b is 0.75.
2. Double both sides to a = 6 and b = 8. The triangle grows but the ratio and angle stay the same.
3. Set a = b = 1. The ratio is 1 and θ is 45°. Increase a while holding b fixed to increase the angle.

## Real-life examples

1. **Angle from two lengths.** Legs 3 and 4 give c = 5. Arcsin(3/5), arccos(4/5) and arctan(3/4) all give about 36.87°.
2. **Equal legs.** Legs 1 and 1 give θ = 45°. The hypotenuse is √2, so the sine ratio is 1/√2 rather than 1.
3. **A smaller angle.** Legs 1.5 and 6 give arctan(0.25) ≈ 14.04°. A small opposite-to-adjacent ratio corresponds to a small acute angle.

## Test yourself

1. Adjust the lengths to make θ approximately 20°.
2. Make θ equal 45°.
3. Make a greater than b and θ greater than 70°.

## Intuition

A trigonometric function starts with an angle and gives a ratio. An inverse trigonometric function starts with the ratio and returns an angle. In a right triangle with opposite side 3 and adjacent side 4, the tangent ratio is 0.75. Asking for arctan(0.75) recovers the acute angle, about 36.87°.

Outside a right triangle, several angles can have the same ratio. For example, 30° and 150° both have sine 0.5. Arcsine returns 30° because its output is restricted to a chosen interval. It does not say that 150° is wrong; it selects one value so that the inverse is a function. Positive legs in this diagram always give an acute angle.

## Formal

For the positive legs shown, $c=\sqrt{a^2+b^2}$ and $\theta=\arcsin(a/c)=\arccos(b/c)=\arctan(a/b)$. Side a is opposite θ, side b is adjacent, and c is the hypotenuse. The display reports degrees; check the angle mode when using a calculator.

Arcsine and arccosine accept inputs in $[-1,1]$. Their principal output intervals are respectively $[-90^\circ,90^\circ]$ and $[0^\circ,180^\circ]$. Arctangent accepts every real input and returns an angle in $(-90^\circ,90^\circ)$, excluding both endpoints.

## Advanced

Inverse does not mean reciprocal: arcsin(x) is an angle, whereas 1/sin(x) is the reciprocal of a sine value. To solve a trig equation, use the principal value together with symmetry and periodicity. To recover a vector's direction in every quadrant, use both coordinate signs, as in atan2(y, x), rather than arctan(y/x) alone.

## Derivation

1. In this right triangle the sine of θ is opposite side a divided by hypotenuse c.
2. Since θ is acute and belongs to the principal interval, applying arcsine recovers θ.
3. Applying arccosine to b/c or arctangent to a/b recovers the same acute angle.

## Real world

### Reporting a slope

A measured rise and horizontal run give a slope ratio. Arctangent expresses that same slope as an angle.

### Direction from components

Positive horizontal and vertical velocity components give a direction above the horizontal through arctangent of their ratio. Components with other signs require quadrant information.
