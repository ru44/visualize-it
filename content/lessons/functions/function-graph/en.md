---
title: Function graph
summary: Read a graph as a rule that turns each input into one output.
parameters:
  x: input x
  a: coefficient a of x squared
  b: coefficient b of x
  c: constant c
variables:
  - input; the horizontal coordinate
  - output; the height of the graph at that input
  - coefficient of the squared term; controls opening direction and steepness
  - coefficient of the linear term; affects the slope and turning-point location
  - constant term; the output when x is zero
---

## Try it

1. Set a to 1 and b and c to 0. Compare x = 2 and x = 3: the outputs are 4 and 9. The point's height records the result.
2. Keep a and b fixed and raise c to 2. Every output increases by 2, so the whole graph moves up.
3. Set a to 0, b to 1 and c to 0. The rule now gives the input unchanged, and its graph is a straight line.

## Real-life examples

1. **A square garden.** With a = 1, b = 0 and c = 0, an input of 3 gives 9. If x is side length in metres, the output is area in square metres. Only nonnegative inputs describe side lengths.
2. **A model with a maximum.** With a = -1, b = 4 and c = 0, the output reaches 4 at x = 2. This is a mathematical example of a quantity that rises and then falls.
3. **An illustrative revenue rule.** With a = -0.5, b = 4 and c = 0, the output is 8 at x = 4. Interpreting this as revenue requires a suitable price-and-demand model; the formula alone does not establish one.

## Test yourself

1. Make the output within 0.3 of 16, with the absolute value of a greater than 0.3. The output may be above the visible graph window; use the readout.
2. Choose a below -0.05 and make the maximum's horizontal position within 0.1 of x = 2.
3. Make the outputs at x = 0 and x = 4 approximately zero, with the absolute value of a greater than 0.05.

## Intuition

A square with side length 2 metres has area 4 square metres. A side length of 3 gives area 9. This is a rule: choose a side length, square it, and obtain an area. We call such a rule a function when each allowed input has exactly one output.

On the graph, the horizontal coordinate is the input x. The vertical coordinate is the output f(x). A point at (3, 9) records that input 3 gives output 9. The graph collects these input-output pairs so we can see the pattern across many inputs.

The sliders a, b and c change the rule itself. Moving x chooses a different input for the current rule. Changing c adds the same amount to every output; changing a or b changes how the output varies with x. The screen shows only part of the graph, so a missing point may simply lie outside the visible window.

## Formal

A function assigns exactly one output to each input in its domain. Its graph consists of points $(x,f(x))$. Here the rule is $f(x)=ax^2+bx+c$.

When a is nonzero, this is a quadratic function. Its turning point has horizontal coordinate $x=-b/(2a)$. Positive a gives a minimum, and negative a gives a maximum. When a is zero, the rule is linear or constant and the turning-point formula does not apply.

## Advanced

Completing the square rewrites a quadratic around its turning point. This exposes the horizontal and vertical shifts and the coefficient controlling its opening. A physical application may restrict the domain even when the polynomial can be evaluated for every real input.

## Derivation

1. Start with the quadratic rule and assume a is nonzero for the following steps.
2. Complete the square by adding and subtracting the required constant. This changes the form without changing the function's values.
3. The squared expression is zero at the turning point. Solve for x to locate it.

## Real world

### Area

For a square, the input can be side length and the output area. The units differ because squaring metres gives square metres.

### Measurements over time

A graph can pair each measurement time with a reading. Its meaning depends on the axis labels and units.

### Mathematical models

A formula can model a measured relationship, but its domain and assumptions must be checked against the situation.
