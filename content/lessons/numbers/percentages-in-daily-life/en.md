---
title: Percentages in daily life
summary: Calculate percentage changes and see why a rise and an equal-percentage fall do not cancel.
parameters:
  P: starting amount P
  p1: first change p1 (%)
  p2: second change p2 (%)
variables:
  - starting amount before either change
  - first percentage change, applied to the starting amount
  - second percentage change, applied to the result of the first
  - final amount after both changes
---

## Try it

1. Set P to 50, p1 to 20 and p2 to 0. The bars show 50, 60 and 60. The 20% increase adds 10.
2. Set P to 80, p1 to -30 and p2 to 8. The first change gives 56; the second gives 60.48. The second percentage uses 56 as its base.
3. Set P to 100, p1 to 50 and p2 to -50. The bars show 100, 150 and 75. Explain why the final amount is below the starting amount.

## Real-life examples

1. **Adding 20% to a bill of 50.** The increase is 10, so the total is 60. The second change is zero.
2. **A discount followed by a charge.** A 30% discount on 80 gives 56. An illustrative 8% charge on that discounted amount adds 4.48, giving 60.48.
3. **A rise followed by a fall.** Increasing 100 by 50% gives 150. Reducing that new amount by 50% gives 75.

## Test yourself

1. Choose settings that give a final amount within 1.50 of 60.
2. Set P to 100, p1 to 50 and p2 to -50, then read the final amount.
3. Choose a positive first change and a negative second change that leave the final amount below P.

## Intuition

A percentage means an amount out of every hundred. To find 20% of 50, divide 50 by 100 and multiply by 20. That gives 10. Adding it to the original 50 gives 60; subtracting it would give 40.

For two changes, calculate the first result before applying the second percentage. Starting at 100, a 50% increase adds 50 and gives 150. A 50% decrease now removes half of 150, which is 75. The final amount is 75 because the two percentages were calculated from different amounts.

The three bars show the starting amount, the result after the first change, and the result after the second. A positive percentage increases the current amount; a negative one decreases it. Compare the labels as well as bar heights, since the chart rescales to fit the values.

## Formal

A percentage change p multiplies the current amount by $1+p/100$. For example, +20% uses the multiplier 1.2 and -20% uses 0.8.

For starting amount P and successive changes p₁ and p₂, the final amount is $F=P(1+p_1/100)(1+p_2/100)$. Adding the two percentages generally gives a different result because it omits the effect of the first change on the second base.

## Advanced

Expanding the product gives a combined percentage change of $p_1+p_2+p_1p_2/100$. For +50% followed by -50%, that is -25%. Reversing the order gives the same result in this model because multiplication commutes; real charges may have different rules or rounding.

## Derivation

1. A 50% increase on 100 adds 50, giving 150. Equivalently, multiply by 1.50.
2. A 50% decrease on 150 removes 75, leaving 75. Equivalently, multiply by 0.50.
3. Compare 75 with the original 100. The equal percentages did not cancel because their base amounts differed.

## Real world

### Discounts

Two successive discounts apply to different amounts. Calculate the first reduced price before applying the second discount.

### Price changes

A price increase followed by the same percentage decrease leaves a lower price in this model. Whether that is beneficial depends on whether you are buying or selling.

### Checking a bill

Identify which amount each percentage applies to. The calculation depends on the base, not only on the printed percentage.
