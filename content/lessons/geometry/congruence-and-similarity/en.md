---
title: Congruence and similarity
summary: 'Compare corresponding lengths to distinguish a scaled copy from a copy with the same size and shape.'
parameters:
  sun: 'sun — sunlight angle above level ground, in degrees'
  hStick: 'hStick — reference stick height in metres'
  hTree: 'hTree — tree height in metres'
variables:
  - 'h₁: stick height'
  - 's₁: stick shadow length'
  - 'h₂: tree height'
  - 's₂: tree shadow length'
---

## Try it

1. Set sun = 40, hStick = 1.2 and hTree = 6. The tree is five times as tall, and its shadow is five times as long.
2. Keep both heights fixed and set sun = 60. Both shadows shorten. Their ratio remains 5 even though each height-to-shadow ratio changes.
3. Set hStick = 1.5 and hTree = 1.5. The two triangles now have the same size and shape, so they are congruent.

## Real-life examples

1. **A fivefold enlargement.** At sun = 40°, a 1.2 m stick casts a shadow about 1.43 m long. A 6 m tree casts one about 7.15 m long: both height and shadow are multiplied by 5.
2. **A higher sun angle.** At sun = 60°, a 1 m stick casts a shadow about 0.58 m long, and a 10 m tree casts one about 5.77 m long. The scale factor between the triangles is 10.
3. **Equal heights.** At sun = 25°, two objects of height 1.5 m both cast shadows about 3.22 m long. Their triangles are congruent even though height divided by shadow is not 1.

## Test yourself

1. Make the two heights equal, or less than 0.05 m apart for the checker, to match the triangles' sizes.
2. Make the tree's shadow longer than 15 m.
3. Adjust sun so that height divided by shadow is as close to 2 as the angle control allows.

## Intuition

Similar shapes have matching angles and proportional corresponding lengths. Here a vertical object, its shadow on level ground, and a sunlight ray form a right triangle. We assume parallel sunlight rays for both objects. The triangles share the sunlight angle and the right angle, so they have the same shape.

If the tree is five times as tall as the stick, its triangle is a fivefold enlargement, so its shadow is five times as long too. Congruent shapes also have the same size: their scale factor is 1. That compares one triangle with the other. It does not mean that a triangle's own height and shadow must be equal.

## Formal

For these similar triangles, let $h_1,s_1$ be the stick's height and shadow, and $h_2,s_2$ the tree's. Their scale factor is $k=h_2/h_1=s_2/s_1$. Equivalently, $h_1/s_1=h_2/s_2$, so $h_2=h_1s_2/s_1$. All lengths are positive.

The triangles are congruent when $k=1$, meaning corresponding sides are equal. The internal ratio $h_1/s_1$ instead depends on the sun angle. It equals the tangent of that angle and need not be 1 for congruence.

## Advanced

For triangles, two equal corresponding angles establish similarity (AA). Other tests use three proportional side lengths (SSS), or two proportional sides with the included angle equal (SAS). Congruence tests instead use equal side lengths and suitable equal angles. In the display, the congruence label allows a small numerical tolerance; exact congruence requires equal lengths.

## Derivation

1. Parallel sunlight rays make equal angles with the same level ground.
2. Each vertical object also meets the ground at a right angle. Two matching angles make the triangles similar.
3. Corresponding heights and shadows share a scale factor. Rearranging their ratios gives tree height = stick height × tree shadow ÷ stick shadow.

## Real world

### Estimating an inaccessible height

Measure a vertical reference object's height and both shadows on the same level ground at the same time. Similarity gives the unknown height when the parallel-ray model is suitable.

### Scale drawings

A flat object's uniformly scaled drawing preserves angles and multiplies all lengths by one factor. A factor of 2 doubles lengths and quadruples areas; a factor of 1 gives a congruent copy.
