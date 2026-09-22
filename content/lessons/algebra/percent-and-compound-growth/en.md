---
title: Percent change and compound growth
summary: >-
  Learn why the same percentage, applied again and again, snowballs faster
  than simple math suggests — the force behind savings, debt, and inflation.
parameters:
  P: starting amount P
  rate: rate per period (%)
  x: number of periods
variables:
  - starting amount
  - percent change applied each period
  - number of periods elapsed
---

## Try it

1. Drag x forward one year at a time and watch the tangent line get steeper.
2. Raise "rate" above zero and watch the curve bend upward faster and faster.
3. Push "rate" negative and watch the curve flatten toward zero instead, without ever quite reaching it.

## Real-life examples

1. **Savings account.** 4,000 dollars growing at 8% interest per year (P=4, rate=8): after 8 years the balance has more than doubled.
2. **Credit card debt.** 2,000 dollars in debt growing at a brutal 20% per year if left unpaid (P=2, rate=20): after 5 years it has nearly tripled.
3. **Car depreciation.** A 10,000-dollar car losing 15% of its value every year (P=10, rate=-15): after 5 years it is worth less than half.

## Test yourself

1. With 4,000 dollars growing at 8% per year, find how many years it takes to pass 8,000 dollars — doubling your money.
2. Set the starting amount to 10 and the rate to -20%, then find how many years it takes to fall under 1 — a 90% loss.
3. Find a growth rate under 15% and enough years so the amount more than doubles.

## Intuition

Put 4,000 dollars in a savings account earning 8% a year, and after one year you have 4,320 dollars — 8% of 4,000. The next year's 8%, though, is not measured against that original 4,000; it is measured against the new, larger 4,320, so you earn 345.60 dollars, a little more than before. Drag x forward one year at a time and watch the little tangent line on the curve get steeper each step — that steepening is this snowball: growth feeding on an already-grown total.

Now set the rate negative and the curve turns into decay: a car worth 10,000 dollars losing 15% of its value every year is worth 8,500 dollars after one year, then loses 15% of that smaller number next — so the amount lost each year keeps shrinking too. The curve falls fast at first, then flattens, and it never quite reaches zero, the same shape radioactive decay follows.

## Formal

After $x$ periods, $A(x) = P(1 + \text{rate}/100)^x$; the growth factor per period is constant, $(1+\text{rate}/100)$, not the increment.

For small rates and many compounding periods this approaches continuous exponential growth $Pe^{kx}$ with $k \approx \text{rate}/100$.

## Advanced

Compounding $m$ times a year at nominal annual rate $\rho$ gives $(1 + \rho/m)^{m}$ per year; as $m \to \infty$ this tends to $e^{\rho}$ by the standard limit definition of $e$, which is exactly the bridge between compound growth here and the continuous exponential in the calculus lessons.

## Derivation

1. One period multiplies by the growth factor.
2. Each period multiplies again by the same factor — not adding the same amount.
3. After $x$ periods the factor has been applied $x$ times.

## Real world

### Savings and debt
Compound interest is exactly this formula, for good (savings) or ill (credit card debt).

### Inflation
Prices rising a fixed percent per year compound, so purchasing power erodes faster than a straight-line estimate suggests.

### Population and viral growth
A population growing a fixed percent per generation follows the same compounding law as money.

### Depreciation
A car losing a fixed percent of its value each year is compound decay — rate negative.
