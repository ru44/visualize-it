---
title: Inflation
summary: >-
  Why the same 100 buys less every year prices rise — and why central
  banks target a small, steady inflation rate rather than zero.
parameters:
  p: p — annual inflation rate
  x: x — years elapsed
variables:
  - purchasing power of the original 100
  - the annual inflation rate
  - years elapsed
charts:
  - title: Nominal price level over time
    xLabel: x (years)
    yLabel: price level
    series:
      - nominal prices
---

## Try it

1. Watch the note. It shows how much a fixed 100 can still buy after $x$ years of rising prices — the loaves below count it out. With $p$ = 3 and $x$ = 20, "buying power of 100" reads 55.4 and the price index reads 181.
2. Set $p$ (inflation rate) to 8. The note shrinks much faster: buying power drops to 21.5 and the price index climbs to 466 — a few extra percent erodes savings a lot over decades.
3. Now put $p$ back to 3 and set $x$ (years elapsed) to 40. Buying power reads 30.7: the same inflation rate keeps eating away at your money's value the longer it continues.

## Real-life examples

1. **A developed economy's inflation target.** At a steady 2% a year for 20 years, a retiree's fixed pension quietly loses about a third of its buying power, even though the number on the check never changes.
2. **A fast-growing emerging economy.** At 8% a year, a family saving for a car over 10 years watches prices climb every year: after 10 years each 100 saved buys only what about 46 used to.
3. **A currency crisis.** At 20% a year, a household's savings lose real value fast: after just 5 years, each 100 of cash buys only what about 40 used to, less than half.

## Test yourself

1. Find an inflation rate and number of years after which your money has lost half its purchasing power.
2. Using a 2% inflation rate, find how many years it takes for prices to double — compare it to the rule of 72 (72 ÷ 2 = 36 years).
3. Using a rate below 10%, find how many years it takes for your savings to be worth less than a tenth of today's value.

## Intuition

Suppose a loaf of bread costs 2 today, and prices climb by $p$, the inflation rate, set to 8% a year on the slider. The shrinking note on screen shows $V$: how much your original 100 currency units can still buy after $x$ years. Drag $x$ forward and the note shrinks along the same compound path that growth climbs, only in reverse — the same coins that used to buy a whole loaf buy a smaller slice of it every year that passes.

Now raise $p$ instead: even a rate that sounds modest, kept up for decades, shrinks the note much faster, because small yearly increases keep stacking on top of each other. The basket's price tag shows the mirror image: the cost of the same goods, marching upward as $p$ compounds — money's power to buy things falls exactly as fast as the price tag on those things rises.

## Formal

The purchasing power of a fixed sum after $x$ years at inflation rate
$p\%$ is $V = \dfrac{100}{(1+p/100)^x}$, while the price index itself
rises as $100(1+p/100)^x$ — the same compound-growth formula as interest,
now working against money held rather than money invested.

Real values (adjusted for inflation) differ from nominal values (in the
currency of the day); comparing incomes or prices across years without
this adjustment overstates any real gain.

## Advanced

Most central banks target inflation of around 2%, not zero: a small
positive rate gives room to cut interest rates in a downturn without
hitting zero, and it avoids deflation, where falling prices make debts
effectively heavier and can lead people to delay spending. Hyperinflation
— inflation exceeding roughly 50% a month — is a different phenomenon
entirely, usually driven by a government printing money to cover deficits
it cannot otherwise finance.

## Derivation

1. Write purchasing power as the inverse of compound price growth.
2. Write the price index itself as compound growth.
3. Apply the rule of 72 to estimate how fast prices double.

## Real world

### Grocery bills

At 3% inflation, a basket costing 100 today costs about 180 in 20 years,
even with no change in what is bought.

### Savings under a mattress

Cash held without earning interest loses purchasing power every year
prices rise, visible directly in this lesson's shrinking note.

### Wage negotiations

Workers negotiate for raises above inflation to see a real increase in
what their pay can buy, not just a nominal one.

### Hyperinflation episodes

Weimar Germany and more recently Venezuela and Zimbabwe saw prices double
in days or weeks rather than decades, making cash nearly worthless within weeks.
