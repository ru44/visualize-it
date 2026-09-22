---
title: Compound interest
summary: >-
  Why money left to grow speeds up over time — interest earning interest,
  and why starting early beats saving more later.
parameters:
  P: P — amount saved today
  r: r — annual interest rate
  n: n — compounding periods per year
  x: x — years invested
variables:
  - the balance after x years
  - the amount saved today
  - the annual interest rate
  - compounding periods per year
  - years invested
charts:
  - title: Compound growth against simple interest
    xLabel: x (years)
    yLabel: value
    series:
      - simple interest
---

## Intuition

Drag $x$ forward: the tangent line on the curve keeps getting steeper,
because interest is now earned on both the original amount and on every
past year's interest. Raise $n$ from 1 to 12: the same annual rate paid
monthly instead of yearly compounds a little faster, since each month's
interest starts earning sooner.

Compare two starting points a few years apart with the same monthly
deposit: the earlier saver ends up well ahead, not because they saved
more in total, but because their money had more time to compound. Time in
the market matters more than timing it.

## Formal

The balance after $x$ years, compounded $n$ times a year at annual rate
$r\%$, is $A = P\left(1+\dfrac{r}{100n}\right)^{nx}$. As $n \to \infty$
this approaches continuous compounding, $A = Pe^{rx/100}$.

Because the exponent multiplies $x$, growth is exponential, not linear:
the added value in each year keeps increasing, unlike simple interest
shown for comparison on the chart below.

## Advanced

The rule of 72 approximates the doubling time as $72/r$ years, a good
estimate for typical rates because $\ln 2 \approx 0.693$ and the
approximation $\ln(1+u) \approx u$ holds well for small $u$. The choice
of compounding frequency $n$ matters far less than the rate $r$ or the
time $x$ — a saver gains much more from an extra 1% rate or an extra
decade than from daily versus monthly compounding.

## Derivation

1. Write the compound growth formula.
2. Take logarithms to see the exponent's effect on growth.
3. Approximate the doubling time to get the rule of 72.

## Real world

### Retirement savings
A saver starting at 25 instead of 35 can end up with nearly double the
balance at 65, even with the same monthly contribution.

### Credit card debt
Unpaid balances compound the same way, working against the borrower — a
debt left unpaid grows faster the longer it sits.

### Savings accounts
Banks quote an annual rate but often compound monthly or daily, which is
why the actual balance ends up slightly above the simple estimate.

### National debt
Government debt that compounds faster than the economy grows becomes a
larger share of national income over time.
