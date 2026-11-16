---
title: Piecewise functions and absolute value
summary: Choose a different rule for each part of the input range, and use that idea to understand absolute value.
parameters:
  x: input x
  a: rule-change point a
  p: slope before a
  q: slope from a onwards
  c: constant in the first rule
variables:
  - input, such as distance in a pricing example
  - input where the rule changes
  - slope on the first piece
  - slope on the second piece
  - constant term in the first piece
---

## Try it

1. Set a to 2, p to 1, q to 2 and c to 0. Compare x = 1, 2 and 3. The outputs are 1, 2 and 4: after the join, each input unit adds 2 instead of 1.
2. Set a and c to 0, p to -1 and q to 1. Compare x = -3 with x = 3. Both outputs are 3.
3. Set p and q to 1. The two pieces form one straight line; using two rules does not always create a visible corner.

## Real-life examples

1. **An illustrative fare.** Charge 2 initially, then 1.5 per kilometre for the first 4 km and 2.5 per kilometre beyond that. A 6 km journey costs 2 + 6 + 5 = 13.
2. **Two illustrative rates.** Charge 10% on the first 5 units and 25% on the next 3. The total charge on 8 units is 0.50 + 0.75 = 1.25. These are practice rates, not a tax policy.
3. **Distance from zero.** With a = 0, c = 0, p = -1 and q = 1, the output at x = -3 is 3. This is the absolute value of -3.

## Test yourself

1. Choose parameters and an input so the output is about 13.
2. Set p to -1, q to 1, and a and c to 0 to obtain absolute value.
3. Choose positive slopes so q is twice p, within 0.05.

## Intuition

Suppose a delivery service uses one rate for the first four kilometres and another for the rest. To calculate the price, first check which part of the journey you are considering. A rule chosen according to the input is called a piecewise function.

After the change point, keep the amount already accumulated and add the new rate only for the extra distance. That is why the pieces in this diagram meet without a jump. Their slopes can differ, creating a corner.

Absolute value is another piecewise rule. It gives distance from zero: 3 and -3 are both three units away. For negative inputs, change the sign; for nonnegative inputs, keep the value. The graph forms a V with its lowest point at zero.

## Formal

The first rule is $f(x)=px+c$ for $x<a$. The second is $f(x)=pa+c+q(x-a)$ for $x\ge a$. At the join, x minus a is zero, so both expressions give pa plus c.

Absolute value uses $|x|=-x$ when x is negative and $|x|=x$ when x is nonnegative. Its output is always nonnegative, including zero at x = 0.

## Advanced

A piecewise function need not have matching values at its joins. This family was constructed to be continuous, but choosing a different starting value for the second piece could create a jump. Matching values ensures continuity; matching slopes is a separate question.

## Derivation

1. Use the first linear rule before the change point.
2. Evaluate it at a to find the accumulated amount pa plus c.
3. For later inputs, add q times the extra distance x minus a. This preserves the accumulated amount at the join.

## Real world

### Tiered prices

A later rate may apply only to the additional quantity, not retroactively to everything purchased. Check the actual pricing rule.

### Distance on a line

The absolute difference between two coordinates gives their distance, regardless of which point is to the left.

### Error size

Absolute error measures how far a prediction is from a target without keeping the direction of the error.
