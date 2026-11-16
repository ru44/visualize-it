---
title: Rational functions and asymptotes
summary: Explore values near a zero denominator and distinguish an asymptote from a removable hole.
parameters:
  x: input x
  a: limiting height a
  b: numerator constant b
  p: excluded input p
variables:
  - limiting value as x becomes large in either direction
  - numerator constant; together with a and p determines whether cancellation occurs
  - excluded input; a vertical asymptote only when the numerator does not cancel
  - chosen input position
---

## Try it

1. Set a to 2, b to 1 and p to 2. Move x near 2 without making it equal to 2. The output grows large in magnitude; use the readout when it leaves the graph window.
2. Compare x = 4 and x = 8 with the same parameters. The values 4.5 and about 2.83 are approaching the limiting height 2.
3. Set b to -4, keeping a = 2 and p = 2. Every allowed input now gives 2, but x = 2 is still excluded. This is a hole, not a vertical blow-up; the plot may not mark the hole visibly.

## Real-life examples

1. **A function with two branches.** At a = 2, b = 1 and p = 2, the rule is 2 plus 5 divided by x minus 2. At x = -1 the output is one third.
2. **A decreasing ratio.** At a = 0, b = 6 and p = -2, the rule is 6 divided by x plus 2. Starting at x = 0 gives 3, and increasing x decreases the output towards zero.
3. **Approaching one.** At a = 1, b = 2 and p = -3, the rule is 1 minus 1 divided by x plus 3. For nonnegative x it rises towards 1 from below.

## Test yourself

1. Choose an allowed input, with x different from p, so the output's absolute value exceeds 50.
2. Set a to 0 and b above 1, giving a horizontal asymptote at zero.
3. Set p to -3. Keep b + ap nonzero if you want a vertical asymptote there rather than a hole.

## Intuition

Dividing 5 by 1 gives 5. Dividing it by 0.1 gives 50, and by 0.01 gives 500. A fixed nonzero numerator divided by a denominator approaching zero produces increasingly large magnitudes. The sign depends on which side of zero the denominator is on.

The rule here can be written as a constant a plus a fraction. Near x = p, that fraction can become very large, producing a vertical asymptote. Far from p, its denominator becomes large in magnitude, so the fraction tends to zero and the output approaches a.

There is an exception worth trying. If the fraction's numerator is also zero and cancels completely, the output stays at a for every allowed input. The original denominator still excludes x = p, leaving a missing point instead of an asymptote. A zero denominator alone does not guarantee a blow-up.

## Formal

For $f(x)=(ax+b)/(x-p)$, the domain excludes x = p. Rewriting gives $f(x)=a+(b+ap)/(x-p)$. If b + ap is nonzero, x = p is a vertical asymptote; otherwise the function equals a everywhere in its domain and has a removable hole at p.

As x tends to either positive or negative infinity, $f(x)\to a$. This limiting height is the horizontal asymptote. In general, a graph can cross a horizontal asymptote; the word describes its behaviour far away, not an uncrossable boundary.

## Advanced

For a ratio of polynomials, cancel common factors when studying behaviour near excluded inputs, while keeping track of the original exclusions. A shared root gives a hole only if cancellation removes every denominator factor at that root. Any remaining denominator zero can still produce a vertical asymptote.

## Derivation

1. Write the numerator as a times x minus p, plus the remainder b + ap. Dividing gives the constant part and the leftover fraction.
2. Assume b + ap is nonzero. As x approaches p, the leftover denominator approaches zero and the magnitude grows without bound.
3. As x becomes large, the leftover fraction tends to zero, so the output tends to a.

## Real world

### Average cost

A fixed setup cost divided among x items adds a term proportional to 1/x to the per-item cost. With positive x, it shrinks as more items share the setup cost.

### Fixed-distance travel

Time for a fixed distance equals distance divided by speed. As positive speed approaches zero, the time grows without bound in this idealized model.

### Checking formulas

Before interpreting a zero denominator as a physical limit, examine cancellation, the usable domain and the assumptions behind the formula.
