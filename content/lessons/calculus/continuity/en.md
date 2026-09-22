---
title: Continuity and jump discontinuities
summary: >-
  A function is continuous where its graph can be drawn without lifting the pen
  — where the limit from both sides agrees with the value there.
parameters:
  d: distance from x = 1
  j: jump size j
variables:
  - the size of the jump added for $x \ge 1$
  - distance of the two approaching points from $x=1$
---

## Intuition

With $j$ away from zero, shrink $d$ and watch the two approaching dots: the one coming from the left settles near $1$ (since $1^2 = 1$), while the one from the right settles near $1 + j$. They are closing in on two different heights, so no single limit exists at $x=1$, and the graph visibly has a step in it there.

Now drag $j$ down to exactly $0$: the two branches — $x^2$ below $1$ and $x^2 + j$ above — meet perfectly, the step disappears, and both one-sided limits agree with each other and with $f(1)$. That is continuity: the algebraic condition and the "no pen lift" picture are the same fact.

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
