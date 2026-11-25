---
title: Solving right triangles
summary: 'Identify opposite, adjacent and hypotenuse, then choose a ratio to find a missing side or angle.'
parameters:
  a: 'a — leg opposite θ'
  b: 'b — leg adjacent to θ'
variables:
  - 'a: opposite leg length'
  - 'b: adjacent leg length'
  - 'c: hypotenuse length'
  - 'θ: acute angle opposite a'
---

## Try it

1. Set a = 3 and b = 4. Read c = 5 and θ ≈ 36.87°. Side a is opposite θ even though it is drawn horizontally on screen.
2. Set a = 6 and b = 8. All lengths double, but θ stays the same because the side ratios are unchanged.
3. Set a = b = 2. The angle θ is 45° and c is about 2.828. The hypotenuse is longer than either leg.

## Real-life examples

1. **A tall rectangle's diagonal.** Legs 6 and 1.5 give c ≈ 6.185 and θ ≈ 75.96° opposite the longer leg.
2. **A wide rectangle's diagonal.** Legs 1 and 5 give c ≈ 5.099 and θ ≈ 11.31° opposite the shorter leg.
3. **A two-to-one ratio.** Legs 4 and 2 give tangent 2 and θ ≈ 63.43°. The hypotenuse is √20 ≈ 4.472.

## Test yourself

1. Make θ equal 45°.
2. Make θ greater than 70° while keeping b below 2 length units.
3. Make θ less than 15° while keeping a above 1 length unit.

## Intuition

First choose the acute angle you are working with. The side across from it is opposite; the leg touching it is adjacent. The hypotenuse is always opposite the right angle. Rotating the drawing does not change these names, but switching to the other acute angle exchanges opposite and adjacent.

For legs 3 and 4 with hypotenuse 5, the ratios are sine = 3/5, cosine = 4/5 and tangent = 3/4 for the angle opposite 3. Doubling all lengths leaves every ratio unchanged. This is why the ratios determine an angle rather than the triangle's size. To determine the whole triangle, we need two sides, or one side and one acute angle; angles alone do not determine lengths.

## Formal

With positive legs a and b and θ opposite a, $c=\sqrt{a^2+b^2}$, $\sin\theta=a/c$, $\cos\theta=b/c$ and $\tan\theta=a/b$. Use the same length unit for all sides. These side-ratio definitions refer to an acute angle in a right triangle.

Choose the ratio containing the known and unknown quantities. For example, if c and θ are known, $a=c\sin\theta$ and $b=c\cos\theta$. If a and b are known, $\theta=\arctan(a/b)$. The other acute angle is $90^\circ-\theta$.

## Advanced

The mnemonic SOH–CAH–TOA stands for sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent. It helps recall the ratios after the sides are identified. Sine, cosine and tangent are also defined beyond acute angles through the unit circle; ordinary positive side lengths alone do not describe those signed values.

## Derivation

1. Apply the Pythagorean theorem to the two perpendicular legs to calculate the hypotenuse.
2. Divide each leg by the hypotenuse to get sine and cosine for the chosen angle.
3. Divide sine by cosine. The common hypotenuse cancels, leaving opposite divided by adjacent.

## Real world

### Finding a diagonal

A rectangular panel's width and height are the legs of a right triangle. The hypotenuse gives its diagonal and the ratios give the diagonal's angle.

### Distance from an angle

In a right-triangle measurement model, one known side and an acute angle can determine an inaccessible length. Identify whether the measured distance is a leg or the hypotenuse before choosing a formula.
