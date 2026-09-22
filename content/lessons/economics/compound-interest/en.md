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

## Try it

1. Watch the curve. It starts low and flat, showing your balance $A$ growing slowly.
2. Drag $r$ (interest rate) up. The curve gets dramatically steeper — a higher rate changes everything.
3. Now drag $x$ (years invested) forward instead, keeping $r$ fixed. The same rate compounds into a much bigger balance simply by waiting longer.

## Real-life examples

1. **Saving for a child's education.** Parents put aside 1,000 at birth in an account paying 6% a year, compounded monthly; by the time their child turns 18 the fund has grown several times over.
2. **Building a retirement nest egg.** 5,000 invested at a 7% annual return, compounded yearly, grows for 30 years — most of the final balance comes from decades of interest earning interest, not the original deposit.
3. **A credit card balance.** 2,000 left unpaid at 15% interest, compounded monthly, compounds against the borrower instead of for them, growing steadily larger the longer it goes unpaid.

## Test yourself

1. Find a rate, compounding frequency and number of years that make your savings roughly double.
2. Using a realistic rate below 10%, grow your savings to more than 5 times the starting amount within 40 years.
3. Set the rate to 12% and find how many years it takes your money to double — check it against the rule of 72 (72 ÷ 12 = 6 years).

## Intuition

Put 1,000 in a savings account at 7% a year, compounded every month, and leave it alone for years. On screen, the curve labelled $A$ is your growing balance, plotted against $x$, the number of years invested. Drag $x$ to the right: the tangent line drawn on the curve gets steeper year after year, because you are now earning interest on your original deposit and on every year's interest that came before it.

Now drag $r$, the annual interest rate, up instead: even a small rise makes the curve climb dramatically faster, because a higher rate multiplies every future year rather than just adding once. This is why a saver who starts at 25 can end up with roughly double the retirement balance of one who starts at 35 with the same monthly deposit, even though the later saver contributes for nearly as many years.

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
