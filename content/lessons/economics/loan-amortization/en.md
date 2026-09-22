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

## Intuition

Drag $x$ forward from zero: the balance curve drops slowly at first, then
faster and faster as it nears $N$. The monthly payment itself stays fixed
for the whole loan, but drag $L$ or $r$ up and the balance curve sits
higher throughout, since both a bigger loan and a costlier rate mean more
is still owed at any given month.

Look at the interest-share chart below the main curve: early on, most of
the fixed payment goes to interest, and only a small remainder reduces
the balance. As the balance shrinks, interest shrinks too, so more of
each later payment finally goes to paying down what was borrowed.

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
