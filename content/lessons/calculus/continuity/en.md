---
title: Continuity and jump discontinuities
summary: >-
  A tax schedule that jumps at a bracket boundary can cost you more than the
  extra dollar you earned — continuity is the idea that tells you whether a
  schedule does that.
parameters:
  d: distance from x = 1
  j: jump size j
variables:
  - the size of the jump added for $x \ge 1$
  - distance of the two approaching points from $x=1$
---

## Try it

1. With «jump size j» away from 0, shrink «distance from x = 1» toward 0. The two dots settle at two different heights.
2. Drag «jump size j» down to exactly 0. The step in the graph disappears.
3. Shrink «distance from x = 1» again. Now both dots settle on the same point — the graph never lifts the pen.

## Real-life examples

1. **A smooth tax curve.** With no jump (j = 0), earning one more dollar never costs you a sudden extra chunk of tax — the schedule is continuous.
2. **A moderate bracket jump.** With j = 1.5, crossing x = 1 suddenly adds 1.5 to the amount owed — a real step, like a poorly designed tax bracket.
3. **A steep rebate cliff.** With j = -2, crossing x = 1 suddenly drops the value by 2 — like a rebate that disappears the moment you earn one dollar too many.

## Test yourself

1. Make the function continuous: find the jump size that closes the gap.
2. Create a downward jump of exactly 2, where the right side sits 2 below the left.
3. Shrink the approach distance below 0.05 while keeping a jump bigger than 1 in size.

## Intuition

Think of a tax rule where crossing a certain income suddenly adds an extra charge, like a jump of 1.5 the moment you earn one dollar too many. On screen the same idea is drawn as two dots sliding toward the input value 1 from opposite sides — one creeping up from below, one creeping down from above — with the slider «distance from x = 1» setting how close they still are.

With «jump size j» away from 0, shrink that distance: the left dot settles near height 1, but the right dot settles near a different height, 1 plus the jump. Now drag «jump size j» down to exactly 0: the step disappears, both dots meet at the same height, and the curve can be traced through that point without ever lifting a pen — that is continuity.

## Formal

$f$ is continuous at $c$ iff $\lim_{x\to c^-}f(x) = \lim_{x\to c^+}f(x) = f(c)$.

Here $f(1) = 1 + j$ (using the right branch's definition at the boundary), $\lim_{x\to1^-}f = 1$, $\lim_{x\to1^+}f = 1+j$; continuity requires $j = 0$.

## Advanced

This is a jump discontinuity (both one-sided limits exist but disagree), distinct from a removable discontinuity (limits agree but differ from $f(c)$, or $f(c)$ is undefined) and from the essential/infinite discontinuities seen with $1/x$ or $\tan x$ — the three types cover every way a function can fail to be continuous at a point.

## Derivation

1. Approaching from the left uses the branch $x^2$.
2. Approaching from the right uses the other branch.
3. Continuity needs the two one-sided limits to agree — forces $j=0$.

## Real world

### Tax brackets
A poorly designed tax schedule can jump discontinuously at a bracket boundary, so earning one more dollar costs you far more than a dollar in tax.

### Structural loads
Sudden material changes in a beam can create discontinuous stress profiles that engineers must smooth or account for.

### Digital signal quantization
Rounding a continuous signal to discrete levels introduces jump discontinuities at the rounding boundaries.

### Phase transitions
Some physical quantities (like density at a phase change) jump discontinuously as temperature crosses a threshold.
