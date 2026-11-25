---
title: Percent change and compound growth
summary: 'Apply the same percentage to the updated amount each period and compare growth with decay.'
parameters:
  P: 'starting amount P'
  rate: 'percentage change per period (%)'
  x: 'elapsed periods x'
variables:
  - 'starting amount in the chosen units'
  - 'percentage change applied to the latest amount each period'
  - 'number of elapsed periods'
---

## Try it

1. Set P to 4 and rate to 8. Compare x = 0, 1 and 2: the amounts are 4, 4.32 and 4.6656. Each increase is calculated from the latest amount.
2. Set x to 8. The amount is about 7.40, still less than twice the starting value.
3. Set P to 10 and rate to -15. At x = 1 the amount is 8.5; at x = 2 it is 7.225. The percentage loss is fixed, but the amount lost decreases.

## Real-life examples

1. **Illustrative growth.** Starting at 4 and growing 8% each period gives about 7.40 after 8 periods. If the units are thousands, that represents about 7404, not a doubled 8000.
2. **Faster growth.** Starting at 2 and growing 20% each period gives about 4.98 after 5 periods, approximately 2.49 times the start.
3. **Illustrative depreciation.** Starting at 10 and losing 15% each period leaves about 4.44 after 5 periods. These are fixed-rate examples, not predictions for a particular asset.

## Test yourself

1. Set P to 4 and rate to 8, then find a time when the amount is approximately 8.
2. Set P to 10 and rate to -20, then make the amount less than 1.
3. Choose a rate greater than 1% and less than 15%, with enough periods to more than double the amount.

## Intuition

Start with 100 and add 10% each period. The first addition is 10, giving 110. The second is 11, giving 121. The percentage stays the same, but it applies to a new amount each time. This is compound growth.

For a 10% decrease, multiply by 0.9 instead. Starting from 100 gives 90 and then 81. The second loss is 9 rather than 10 because it is calculated from a smaller amount. The graph connects period values smoothly; fractional periods represent an extension of the model, not necessarily the timing of actual payments or updates.

## Formal

After x whole periods, $A(x)=P(1+\text{rate}/100)^x$. The same factor is applied repeatedly. With a positive starting amount and rate greater than -100%, the factor is positive and the result remains positive.

For real x, the same expression equals $Pe^{kx}$ exactly when $k=\ln(1+\text{rate}/100)$. For small rates, k is approximately rate divided by 100; that approximation need not stay accurate over a long time.

## Advanced

A nominal annual rate split into increasingly frequent compounding intervals gives a separate limiting model. Keep the rate per interval and number of intervals consistent when comparing schedules. Fixed percentage change alone does not account for deposits, withdrawals, fees, changing rates or resource limits.

## Derivation

1. Add the chosen percentage of the starting amount, or equivalently multiply by the per-period factor.
2. Apply the same factor to the new amount for the second period.
3. Repeating the multiplication x times gives the power formula for whole periods.

## Real world

### Repeated price changes

Successive equal percentage changes use the updated price each time. The final change is not generally the sum of the percentages.

### Population models

A fixed percentage per generation produces this curve only while the fixed-rate assumption remains suitable.

### Depreciation models

Reducing the remaining value by a fixed percentage each period gives compound decay. Real resale values need not follow it exactly.
