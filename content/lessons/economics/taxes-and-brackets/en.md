---
title: Taxes and tax brackets
summary: >-
  A progressive tax charges a low rate on the first slice of income and a
  higher rate only on the slice above a threshold, which is why the
  marginal rate — what the next dollar earned is taxed at — is almost
  always higher than the average rate that the whole income actually
  works out to.
parameters:
  x: annual income x
  b: bracket threshold b
variables:
  - income — how much someone earns in a year, before tax
  - threshold — the income level where the tax rate steps up from 10% to 25%
  - tax owed — the total tax paid for the year, added from both brackets
charts: []
---

## Try it

1. Keep «annual income x» below «bracket threshold b». All of it sits in the cheap slice, so the average rate equals the 10% marginal rate exactly.
2. Raise «annual income x» well above «bracket threshold b». Only the slice above the threshold is taxed at 25%, so the average rate stays well below that 25% marginal rate.
3. Raise «bracket threshold b» toward «annual income x». More of the same income now sits in the cheap 10% slice, and the average rate falls even though income has not changed at all.

## Real-life examples

1. **First job.** Earning 18,000 dollars a year, entirely inside the 40,000-dollar threshold — every dollar taxed at 10%, so the marginal and average rate are both exactly 10%.
2. **Teacher's salary.** Earning 55,000 dollars — the first 40,000 taxed at 10% (4,000 dollars), the remaining 15,000 at 25% (3,750 dollars) — 7,750 dollars owed, a 14.1% average rate even though the marginal rate on the last dollar earned is 25%.
3. **Senior professional.** Earning 140,000 dollars — 4,000 on the first 40,000, then 25% on the remaining 100,000 (25,000 dollars) — 29,000 dollars owed, a 20.7% average rate, still well under the 25% marginal rate.

## Test yourself

1. Get the average tax rate to exactly 15%.
2. Earn more than «bracket threshold b», and keep the average rate under 20%.
3. Earn more than 60,000 dollars, and keep the average rate under 12%.

## Intuition

Two different "rates" are hiding in every tax bill. The marginal rate is what the very next dollar earned would be taxed at — either 10% or 25% here, depending only on which side of «bracket threshold b» that dollar falls. The average rate is the whole tax bill divided by the whole income — a blend of both rates, weighted by how much income sat in each slice. It is exactly like a water bill that charges more per liter past a certain amount: the price on the last liter used is not the price of the whole bill.

That gap explains the Teacher's salary example above: the marginal rate on the last dollar earned is 25%, yet the average rate on the whole 55,000 dollars is only 14.1%, because most of that income still sat in the cheap 10% slice. It also debunks a common myth — earning one more dollar and "crossing into a higher bracket" never lowers take-home pay, because only the income above «bracket threshold b» is ever taxed at the higher rate; every dollar below it keeps being taxed at 10% no matter how high total income climbs.

## Formal

Tax owed adds the two slices separately: $T = 0.10\,\min(x,b) + 0.25\,\max(0,x-b)$, where $\min(x,b)$ caps the cheap slice at the threshold and $\max(0,x-b)$ is whatever remains above it, or zero if income never reaches the threshold.

The average rate is that total divided by income, $T/x \times 100\%$, while the marginal rate is simply whichever bracket the last dollar falls in — 10% if $x \le b$, 25% if $x > b$ — so the average rate can only ever sit between the two bracket rates, never above the marginal one.

## Advanced

Real tax systems chain together many more brackets than two, but the arithmetic is identical: each extra bracket only ever taxes the slice of income that falls inside it, so a five-bracket system is just this same $\min$/$\max$ pattern repeated once per threshold and added up.

## Derivation

1. The slice of income up to «bracket threshold b» is taxed at 10%, capped at $b$ itself so it never counts income above the threshold: $0.10\,\min(x,b)$.
2. Whatever income remains above the threshold is taxed at 25%, or nothing at all if income never reaches it: $0.25\,\max(0,x-b)$.
3. Adding the two slices together gives the total tax owed: $T = 0.10\,\min(x,b) + 0.25\,\max(0,x-b)$.

## Real world

### The "raise makes you poorer" myth
A common worry is that a raise pushing income past a bracket threshold means losing money overall — but under a progressive system only the income above the threshold is ever taxed at the higher rate, so take-home pay always rises with a raise, just not by quite as much per dollar above the threshold.

### Standard deductions
Most real tax systems also exempt a first slice of income entirely — a 0%-taxed allowance before the 10% bracket even begins — layering one more slice onto the same $\min$/$\max$ pattern used here.

### Withholding
Employers typically estimate the year's average rate and withhold roughly that share from every paycheck, so «tax owed» is usually already paid gradually across the year rather than landing as one lump sum.

### Bracket creep
When «bracket threshold b» is not raised to keep pace with rising prices, wages that merely keep up with inflation still push more and more income into the higher bracket over time, even though nothing has really changed in what that income can buy.
