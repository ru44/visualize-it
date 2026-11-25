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

## Try it

1. Watch the curve. It shows what a future payment is worth today, discounted by how many years away it is. At $x$ = 10 the readout f(x) shows about 614: that is what 1,000 paid in 10 years is worth now.
2. Set $x$ (years until payment) to 30. The value drops fast at first, then flattens: f(x) is now about 231 — money far in the future is worth very little today.
3. Now set $r$ (discount rate) to 10. The whole curve falls faster and f(x) drops to about 57, since a higher rate makes future money less valuable right now.

## Real-life examples

1. **A 2,000 work bonus paid next year.** At a 5% discount rate, that promised bonus is worth about 1,905 today — barely less, since it's only a year away.
2. **A pension promising 8,000 in 20 years.** At a 6% discount rate, that future payment is worth only about 2,494 today, because decades of waiting have discounted away most of its face value.
3. **A 10,000 legal settlement paid over 40 years.** At an 8% discount rate, the payment due in year 40 is worth only about 460 today, which is why people receiving settlements often accept a smaller lump sum right away instead.

## Test yourself

1. With a positive discount rate, find a future payment, a rate and a number of years that make it worth exactly 1,000 today.
2. Using a discount rate of at least 8%, show that a payment 40 years away is worth less than 5% of its face value.
3. Find a discount rate and a number of years such that a future payment is worth exactly half its face value today.

## Intuition

Suppose someone offers you a choice: 1,000 today, or 1,200 in five years. The curve on screen shows $V$, what a future payment is worth right now, plotted against $x$, the number of years until you receive it. Drag $x$ to the right and the curve drops fast at first, since a payment a year or two away is worth almost as much as cash in hand, then flattens out, since a payment 40 years away is worth very little today no matter how large it is.

Now raise $r$, the discount rate, instead: the whole curve falls faster, because a higher rate means money today is worth relatively more than money later, so future payments get discounted harder. Set $F$ to 1200 and $x = 5$, then drag $r$ until f(x) reads about 1,000 (at $r$ = 3.75) — that rate is the one that makes the offer above a toss-up.

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
