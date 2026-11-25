---
title: Continuity and jump discontinuities
summary: 'Check whether the two limiting values at a boundary agree with the function value there.'
parameters:
  d: 'd — sampling distance from 1'
  j: 'j — signed shift of the right branch'
variables:
  - 'j: amount added when x ≥ 1'
  - 'd: marked inputs are 1 − d and 1 + d'
---

## Try it

1. Set j = 1.5 and d = 0.1. The marked values are f(0.9) = 0.81 and f(1.1) = 2.71. Reduce d: the left value approaches 1 and the right approaches 2.5.
2. Set j = 0. Both branches now use x², and both sides approach f(1) = 1.
3. Set j = −2 and d = 0.02. The marked values are 0.9604 and −0.9596, approaching distinct limits 1 and −1. The readout table samples the right side only; the branch formulas explain both sides.

## Real-life examples

1. **No jump.** At j = 0 and d = 0.3, the marked values are 0.49 and 1.69. They differ at this finite distance but approach the same value 1 as d shrinks.
2. **Upward jump.** At j = 1.5 and d = 0.3, the marked values are 0.49 and 3.19. The limiting jump is 1.5, not their current difference 2.7.
3. **Downward jump.** At j = −2 and d = 0.1, the marked values are 0.81 and −0.79. Their limits are 1 and −1, giving a jump of −2.

## Test yourself

1. Choose j so that the function is continuous at x = 1.
2. Create a downward jump of 2 by setting j = −2.
3. Make d less than 0.05 while keeping |j| greater than 1.

## Intuition

This function uses x² to the left of 1 and x² + j at and to the right of 1. The parameter j moves only the right branch vertically. If j is 1.5, the left branch approaches 1 at the boundary while the right branch approaches 2.5. Getting closer to the boundary does not close that gap.

Continuity requires more than two close dots. The left-hand limit, right-hand limit and value at the boundary must agree. Setting j to zero makes that happen here. Changing d only changes where we sample the existing function; it cannot repair a jump. The drawn stroke can visually join samples across a discontinuity, so judge continuity from the formula and limits.

## Formal

At an interior point c, a function is continuous exactly when $\lim_{x\to c^-}f(x)=\lim_{x\to c^+}f(x)=f(c)$. In particular, f(c) must be defined and the two-sided limit must exist and equal it.

Here $f(x)=x^2$ for x < 1 and $f(x)=x^2+j$ for x ≥ 1. The left limit is 1, while the right limit and $f(1)=1+j$ agree. Therefore continuity at 1 holds exactly when $j=0$. The signed limiting jump is j and its size is |j|.

## Advanced

A jump has two distinct finite one-sided limits. A removable discontinuity has a finite common limit but a missing or different function value; changing that single value can repair it. Other failures include unbounded behaviour and oscillation without a limiting value. Changing only f(1) cannot repair a nonzero jump here.

## Derivation

1. Inputs approaching 1 from below use x², whose limit is 1.
2. Inputs approaching from above use x² + j, whose limit is 1 + j. The value at the boundary also uses this branch.
3. Set the limits equal. The equation 1 = 1 + j requires j = 0, which also makes the boundary value agree.

## Real world

### Rounding measurements

A continuous measurement rounded to the nearest integer becomes a step function. Crossing a rounding boundary changes the reported value abruptly even if the underlying quantity changes smoothly.

### Joining formulas

When two formulas describe adjacent input ranges, compare their limits and the assigned boundary value. Matching only their slopes or only a few plotted samples does not establish continuity.
