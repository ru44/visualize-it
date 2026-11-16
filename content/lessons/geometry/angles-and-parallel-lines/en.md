---
title: Angles and parallel lines
summary: 'Use the positions of angle pairs to find which are equal and which add to 180° when a line crosses parallel lines.'
parameters:
  theta: 'θ — transversal angle in degrees'
  pair: 'pair — corresponding (0), alternate interior (1), same-side interior (2)'
variables:
  - 'α: first highlighted angle'
  - 'β: second highlighted angle'
---

## Try it

1. Set theta = 65 and pair = 0 for corresponding angles. Both highlighted angles are 65°.
2. Keep theta = 65 and choose pair = 1 for alternate interior angles. Their positions change, but both still measure 65°.
3. Choose pair = 2 for same-side interior angles. They measure 65° and 115°. Change theta and check that their sum remains 180°.

## Real-life examples

1. **A diagonal brace.** Model two parallel horizontal beams crossed by a straight brace at 65°. Corresponding angles at the two crossings are both 65°.
2. **A straight cut across strips.** With parallel strip edges and a cut at 50°, the highlighted alternate interior angles are both 50°.
3. **A crossing on a plan.** With theta = 100° and pair = 2, the same-side interior angles are 100° and 80°, adding to 180°.

## Test yourself

1. Choose corresponding angles and set theta close to 40°.
2. Choose alternate interior angles and set theta close to 100°.
3. Choose same-side interior angles and set theta close to 130°, giving a second angle close to 50°.

## Intuition

The horizontal lines are parallel: they have the same direction and never meet. The sloping line crosses both and is called a transversal. At each crossing there are four angles. Changing the transversal's tilt changes their sizes, while the relationship between matching positions stays the same.

Corresponding angles occupy matching positions at the two crossings, and are equal. Alternate interior angles lie between the parallels on opposite sides of the transversal, and are also equal. Same-side interior angles lie between the parallels on the same side of the transversal. They add to 180°, so if one increases, the other decreases.

## Formal

For two parallel lines cut by a transversal, corresponding angles satisfy $\alpha=\beta$, as do alternate interior angles. Opposite angles at a single crossing are equal because each is supplementary to the same adjacent angle.

Same-side interior angles satisfy $\alpha+\beta=180^\circ$, or $\beta=180^\circ-\alpha$. These angles are called supplementary. They are equal only in the special case where both are 90°.

## Advanced

The converse tests are useful too: equal corresponding angles, equal alternate interior angles, or supplementary same-side interior angles imply that the two lines are parallel in a Euclidean plane. Identify the positions before applying a rule; equality of two arbitrary angles does not establish parallelism.

## Derivation

1. Move one crossing to the other by a translation along the transversal. Parallel lines keep their direction, so matching angle positions have equal measures.
2. At a crossing, opposite angles are equal. Combining this with corresponding-angle equality gives the alternate interior angle rule.
3. The remaining interior angle is adjacent to an equal alternate angle on a straight line, so the same-side interior pair sums to 180°.

## Real world

### Parallel beams and a brace

A straight diagonal brace crossing parallel beams makes equal corresponding angles at each intersection. This lets us transfer an angle from one crossing to another in a drawing.

### Geometric proofs

Drawing a line through a triangle's vertex parallel to its opposite side lets us move the two other angles to that vertex using alternate interior angles. Together they form a straight angle, proving the triangle-angle sum.
