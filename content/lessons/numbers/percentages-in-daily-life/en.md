---
title: Percentages in daily life
summary: >-
  Work out tips, discounts and price changes the way a shop till does, and
  see why a 50% rise followed by a 50% drop never gets you back to where
  you started.
parameters:
  P: starting price P
  p1: first percent change p1 (%)
  p2: second percent change p2 (%)
variables:
  - the starting amount, before any change
  - the first percent change applied to it
  - the second percent change, applied after the first
  - the final amount, after both changes
---

## Try it

1. Set P to 50 and p1 to 20, leaving p2 at 0: watch the bar grow by exactly a fifth — a 20% tip on a 50-dollar meal.
2. Set P to 80, p1 to -30, then raise p2 to 8: the bar first shrinks for the discount, then grows a little for the tax added on top of the smaller number.
3. Set P to 100, p1 to 50, then p2 to -50: the bar rises past 150, then falls — but read the final readout closely, it lands on 75, not back at 100.

## Real-life examples

1. **A 50-dollar meal, 20% tip.** P = 50, p1 = 20, p2 = 0: the tip alone raises the total from 50 to 60 dollars.
2. **An 80-dollar shirt, 30% off, then 8% tax.** P = 80, p1 = -30, p2 = 8: the discount drops it to 56 dollars, then tax on that smaller price brings it to 60.48 dollars.
3. **100 dollars, up 50% then down 50%.** P = 100, p1 = 50, p2 = -50: a year of gains takes it to 150, a year of losses brings it down to 75 — not back to 100.

## Test yourself

1. Find the tip percentage on a 50-dollar meal that brings the total to 60 dollars.
2. Set p1 to 50%, p2 to −50%, and P to 100, and read what the final amount actually is.
3. Find a rise followed by a fall that still leaves the final amount below where it started.

## Intuition

A tip, a discount and a sales tax are all the same move: multiply by $1+\frac{p}{100}$, where $p$ is positive for a rise and negative for a drop. Drag p1 upward from a 50-dollar meal and the bar on screen stretches — at 20% it reaches 60 dollars, the bill with tip already added. Add a second change, p2, and the bar stretches or shrinks again, but now starting from the new height left by the first change, not from the original P.

That second detail is why a 50% rise followed by a 50% drop does not return you to the start. Push p1 to 50 on a starting value of 100 and the bar climbs to 150; now push p2 to −50, and the bar loses half of 150, which is 75, not half of the original 100. The percentage is the same size both times, but it is taken of a different, already-changed amount — so the losses and gains are not mirror images of each other.

## Formal

Each percent change multiplies the current amount by a factor $1+\frac{p}{100}$; applying $p_1$ then $p_2$ in sequence gives the final amount $F = P\left(1+\frac{p_1}{100}\right)\left(1+\frac{p_2}{100}\right)$.

Because $p_1$ and $p_2$ are applied to different base amounts (the second to the result of the first), $F$ is generally not the same as applying a single combined change of $p_1+p_2$ percent to $P$.

## Advanced

Expanding the product shows the exact gap: $F = P\left(1+\frac{p_1+p_2}{100}+\frac{p_1 p_2}{10000}\right)$, so the true combined change differs from simply adding $p_1+p_2$ by the cross term $\frac{p_1 p_2}{10000}$ — negative whenever one change is a rise and the other a fall, which is exactly why "+50% then −50%" loses ground rather than breaking even.

## Derivation

1. A 100-dollar amount rising 50% is multiplied by 1.50, reaching 150.
2. That new 150-dollar amount falling 50% is multiplied by 0.50, reaching 75.
3. 75 is not equal to the original 100 — the two 50% changes did not cancel.

## Real world

### Shopping
Store discounts and sales tax are both percent changes applied one after another, exactly like p1 and p2 here.

### Restaurant bills
A tip is a single percent change added to the bill total — the simplest case of this same formula, with p2 left at zero.

### Investing
A stock that rises 50% one year and falls 50% the next is worth less than when it started, which is why average returns can be misleading.

### Payroll and prices
A pay rise followed later by a pay cut of the same percentage, or a price hike followed by an "equal" markdown, both leave you worse off than before either change.
