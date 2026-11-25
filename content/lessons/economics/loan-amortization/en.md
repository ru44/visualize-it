---
title: Loan amortization
summary: >-
  Why the first years of a mortgage barely dent the amount owed — most of
  each payment is interest, not repayment.
parameters:
  L: L — loan amount
  r: r — annual interest rate
  N: N — loan term in months
  x: x — months since the loan started
variables:
  - the remaining balance after x months
  - months since the loan started
  - the loan amount
  - the monthly interest rate
  - the loan term in months
  - the annual interest rate
charts:
  - title: Interest portion of the monthly payment over time
    xLabel: x (months)
    yLabel: interest per month
    series:
      - interest portion
---

## Try it

1. Watch the bars: every one is the same monthly payment, but at the start the red interest slice eats most of it. The thin line is the balance, starting at the full loan. At month 60 the readouts show a monthly payment of 716: 426 of it is interest and only 290 is principal.
2. Set $x$ (months elapsed) to 120. The green principal slice has grown to 392 and the interest has shrunk to 325. The dashed flag marks month 103, the tipping month where principal first beats the interest.
3. Now raise $r$ to 10. The red slices fatten and the tipping month slides from 103 to 158 — a costlier rate keeps you in interest territory longer. Raising $L$ makes every payment bigger but leaves the split and the flag where they are.

## Real-life examples

1. **A 30-year, 250,000 mortgage.** At 6% interest, two years in, the balance has barely moved: about 243,700 is still owed. The borrower has paid nearly 30,000 in interest before making a real dent in the debt.
2. **A 5-year, 25,000 car loan.** At 7%, one year in, the shorter term forces faster progress than a mortgage, but about a quarter of each 495 payment (123) still goes to interest.
3. **A 2-year, 5,000 personal loan.** At 12%, six months in, the short term forces a comparatively fast payoff despite the higher rate: the balance is already down to about 3,860.

## Test yourself

1. Find the month by which exactly half of the original loan has been paid off.
2. At the exact halfway point in time, find a rate and term where more than 55% of the loan is still unpaid — proof that paydown is slow early on.
3. Even after a third of the loan's term has passed, find a high enough rate that keeps more than 90% of the loan still unpaid.

## Intuition

Take a 250,000 mortgage at 6% interest over 30 years, or 360 months: in the very first payment, well over 1,000 of it is interest, and only a small amount actually reduces what is owed. The thin line on screen, $B$, is exactly that remaining balance, sliding down across the bars as $x$, the number of months since the loan started, advances. Drag $x$ forward from zero and watch the balance barely move at first, then fall faster and faster as it nears the end of the term.

Now drag $r$, the interest rate, up instead: the whole balance line sits higher throughout, since a costlier rate means more is still owed at any given month. A bigger loan $L$ scales every payment up but leaves the shape unchanged. Look at the red slices of the bars: early on, most of the fixed monthly payment goes to interest, and only a small remainder chips away at the balance — exactly why the first years of a mortgage barely dent what is owed.

## Formal

With monthly rate $i = r/1200$ and $N$ monthly payments, the balance
remaining after $x$ months is
$B(x) = L\cdot\dfrac{(1+i)^N - (1+i)^x}{(1+i)^N - 1}$, which falls from
$L$ at $x=0$ to $0$ at $x=N$.

Each month's interest charge is the current balance times $i$; the rest
of the fixed payment reduces the balance, which is why the interest
portion shrinks alongside $B(x)$.

## Advanced

The fixed monthly payment itself is
$\text{payment} = L\cdot\dfrac{i}{1-(1+i)^{-N}}$, chosen so the balance
reaches exactly zero at month $N$; it does not appear directly in $B(x)$
because $B(x)$ is derived from discounting the remaining payments rather
than accumulating past ones. Extra payments made early save
disproportionately more total interest than the same extra payment made
late, since they remove principal while it still has the most months left
to accrue interest.

## Derivation

1. Convert the annual rate to a monthly rate.
2. Write the remaining balance as a function of months elapsed.
3. Split any month's fixed payment into its interest and principal parts.

## Real world

### Mortgages

A 30-year mortgage's first payment is often 70–80% interest; only by the
final years does most of the payment reduce the balance.

### Car loans

Shorter loan terms carry higher monthly payments but far less total
interest, since the balance falls faster.

### Extra payments

Paying a lump sum early in a mortgage saves more interest than the same
amount paid in the final year.

### Refinancing

Resetting a loan to a new rate restarts the balance curve, which is why
refinancing late in a loan can raise total interest paid.
