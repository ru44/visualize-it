---
title: Domain and range
summary: Distinguish the inputs a rule allows from the outputs it can produce.
parameters:
  x: input x
  a: square-root boundary a
  b: excluded denominator input b
variables:
  - chosen input
  - lower boundary imposed by the square root
  - input making the denominator zero; excluded if it otherwise lies in the domain
---

## Try it

1. Set a to 2 and b to 8. Compare x = 1 and x = 6. The first has no real output; the second gives -1.
2. Keep a and b fixed and set x to 8. The denominator is zero, so the function has no value there.
3. Set x to 2. The output is 0, because the numerator is zero while the denominator is not. Zero in a numerator is allowed.

## Real-life examples

1. **An allowed input.** With a = 2, b = 8 and x = 6, the square root is 2 and the denominator is -2. Their quotient is -1.
2. **A zero denominator.** With a = -2, b = 0 and x = 0, the square root exists, but the denominator is zero. The input is excluded.
3. **A boundary that is allowed.** With a = 4, b = 8 and x = 4, the numerator is zero and the denominator is -4. The output is 0.

## Test yourself

1. Choose x below a so the square root has no real value.
2. Set x equal to b so the denominator is zero.
3. Choose an allowed input and parameters that give an output within 0.05 of 1.

## Intuition

Consider a rule that takes a square root and then divides. Before calculating, we need two checks. Is the quantity inside the square root nonnegative? Is the denominator nonzero? An input is allowed only if it passes both checks. The collection of allowed inputs is the domain.

Here, with a = 2 and b = 8, the square root uses x minus 2, so x must be at least 2. The division uses x minus 8, so x cannot be 8. Thus 2 and 6 are allowed, but 1 and 8 are not. These restrictions come from the rule itself, not from a story about a sensor or a pool.

The range answers a different question: which outputs can the rule produce? On a graph, inputs are horizontal positions and outputs are heights. The graph helps us investigate the range, but a limited window cannot show every possible input or output. A point outside the screen is not necessarily outside the domain.

## Formal

For $f(x)=\sqrt{x-a}/(x-b)$ over the real numbers, the domain is $\{x\in\mathbb{R}:x\ge a,\ x\ne b\}$. If b is below a, it is already outside the allowed interval; there is no additional hole within that interval.

The range is the set of all actual function values at allowed inputs. For the default a = 2 and b = 8, it is all real numbers: the left branch gives zero and every negative value, while the right branch gives every positive value. This conclusion uses the full branches, not just their visible portions.

## Advanced

The range depends on the parameters. If a equals b, the function reduces to the reciprocal of a square root for x greater than a, so its range is positive real numbers. If b is below a, the range starts at zero and has a finite positive maximum. Restrictions must be reconsidered after parameters change.

## Derivation

1. A real square root requires x minus a to be nonnegative, giving x at least a.
2. Division requires x minus b to be nonzero, excluding x equal to b.
3. Keep only inputs satisfying both conditions. The square-root boundary is included unless it also makes the denominator zero.

## Real world

### Sharing a cost

A cost divided by the number of people is undefined at zero people. In practice the number of people must also be a positive whole number.

### A square's side length

Taking the square root of an area gives a side length. In this setting both the area input and the length output are nonnegative.

### Using a model

A formula may give a numerical answer outside the conditions under which a model was established. Its practical domain can be smaller than its mathematical domain.
