---
title: Present value
summary: >-
  Why a payment promised years from now is worth less today than the same
  amount in hand — and how to compare offers on equal footing.
parameters:
  F: F — the future payment
  r: r — the discount rate
  x: x — years until the payment
variables:
  - the value today
  - the future payment
  - the discount rate
  - years until the payment
---

## Intuition

Drag $x$ to the right: the curve drops fast at first, since a payment a
year or two away is worth almost as much as cash now, then flattens out,
since a payment 40 years away is worth very little today no matter how
large it is. Raise $r$ and the whole curve drops faster: a higher rate
means money today is more valuable relative to money later, so future
payments are discounted harder.

This is why "would you rather have 1000 now or 1200 in five years" is not
obvious — it depends entirely on what rate $r$ you could otherwise earn on
that money. Drag $r$ until $V$ at $x=5$ equals 1000 to find the rate that
makes you indifferent.

## Formal

The present value of a future payment $F$ received in $x$ years, at
discount rate $r\%$, is $V = \dfrac{F}{(1+r/100)^x}$ — the amount that,
invested today at rate $r$, would grow to exactly $F$ by year $x$.

Present value is the inverse operation of compound growth: where
compounding asks "what will $P$ become?", discounting asks "what is $F$
worth today?"

## Advanced

Comparing two cash flows fairly means comparing their present values at
the same discount rate, not their raw amounts — this underlies how bonds,
pensions and company valuations are priced, using net present value (the
sum of many discounted future flows) as the standard test of whether a
project or investment is worth undertaking.

## Derivation

1. Write the discounting formula.
2. Rearrange to see it as the inverse of compound growth.
3. Note that value shrinks toward zero as the payment moves further away.

## Real world

### Lottery payouts
A lottery advertising "1 million" paid over 20 years is worth
substantially less today than 1 million paid as a lump sum.

### Company valuation
Investors value a company partly by discounting its expected future
profits back to a present value.

### Pension promises
A pension promising fixed future payments is worth less today when
interest rates are high, since those future payments are discounted more.

### Structured settlements
Legal settlements paid over years are often sold at a discount for a
smaller lump sum today, reflecting present value.
