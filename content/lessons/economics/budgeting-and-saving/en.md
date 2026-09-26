---
title: Budgeting and saving
summary: >-
  Income minus spending leaves whatever is saved each month, and that saving
  is a running total — add it up for long enough and even a modest amount
  becomes a real sum, while a high income that spending keeps pace with
  never adds up to anything at all.
parameters:
  I: monthly income I
  X: monthly spending X
  m: months saved m
variables:
  - income — money coming in each month, from allowance, gifts or a part-time job
  - spending — money going out each month, on snacks, games, phone credit and everything else
  - saving — what is left each month once spending is subtracted from income
  - months — how many months the saving keeps happening
  - total saved — the running sum of every month's saving added together
charts: []
---

## Try it

1. Drop «monthly spending X» well below «monthly income I». The monthly saving jumps, and so does the total saved after «months saved m».
2. Raise «months saved m» toward a full year or two. Even a modest monthly saving turns into a total worth noticing.
3. Push «monthly spending X» close to «monthly income I». The saving shrinks toward zero, and the total barely grows no matter how long «months saved m» runs.

## Real-life examples

1. **Tight budget.** Income 800 dollars a month, spending 750 — only 50 dollars saved a month, but after a year that is still 600 dollars, enough for a decent bike.
2. **Steady saver.** Income 1200 dollars, spending 900 — 300 dollars saved a month, and after 2 years that is 7200 dollars, real money toward a laptop or a used car.
3. **Big spender.** Income 2000 dollars, spending 1950 — despite the much higher income, only 50 dollars saved a month, the exact same 600 dollars after a year as the tight budget above.

## Test yourself

1. Get the total saved to exactly 3600 dollars.
2. Save less than 100 dollars a month, and still push the total saved above 500 dollars.
3. Earn more than 3000 dollars a month, but keep the total saved under 1000 dollars.

## Intuition

Saving is not a separate pile of money — it is simply whatever is left of «monthly income I» after «monthly spending X» is subtracted. If income is a stream flowing in and spending is a drain letting it back out, saving is only what collects while the drain is smaller than the stream. Nothing mysterious happens to make it grow other than that gap staying open, month after month.

The Big spender example above is the sharp lesson here: a 2000-dollar income sounds far better than 800, but once spending nearly matches it, the saving collapses to the same 50 dollars a month as the Tight budget case — and after a year, both have saved exactly 600 dollars. «months saved m» is what turns a small gap into something real: the same 50 dollars a month becomes 600 dollars after a year and 1200 after two, purely because it kept being added.

## Formal

Each month's saving is income minus spending, $S = I - X$, measured in the same currency per month as both.

Over «months saved m» months, with no month skipped, the total saved is that monthly saving added up $m$ times: $T = S\,m = (I - X)\,m$.

## Advanced

The same formula runs backward for goal-setting: to reach a target total $T$ by month $m$, the saving needed each month is $S = T/m$ — exactly the arithmetic behind any "save this much every month to afford that" calculator.

## Derivation

1. Subtract what goes out from what comes in to get one month's saving: $S = I - X$.
2. Adding that same saving up once for every month gives the running total: $T = S\,m$.
3. Substituting the first line into the second gives the total directly from income and spending: $T = (I - X)\,m$.

## Real world

### Zero-based budgeting
A common household technique assigns every dollar of «monthly income I» a job before the month starts — rent, food, saving — so nothing is left unaccounted for and spending cannot quietly creep up to match income.

### Pay yourself first
Many savers set up an automatic transfer of the saving the moment income arrives, before there is a chance to spend it, which turns saving from "whatever is left over" into a fixed, protected part of the budget.

### Sinking funds
Saving a fixed amount every month toward a specific future cost — a birthday gift, a school trip, a replacement phone — is the same $T = S\,m$ arithmetic aimed at a known target instead of an open-ended goal.

### Lifestyle inflation
As «monthly income I» rises, «monthly spending X» often quietly rises with it, which is exactly why a raise does not always translate into more saving — the gap $S$ can stay just as thin as before.
