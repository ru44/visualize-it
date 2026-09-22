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

## Intuition

Drag $x$ forward: the purchasing-power curve falls the same shape as
compound growth in reverse — a fixed sum buys steadily less each year
prices rise, and the drop accelerates as small yearly increases stack up.
Raise $p$ and the curve falls faster: even a rate that sounds small,
sustained for decades, erodes savings substantially.

The chart below shows the mirror image — the price of a basket of goods
that cost 100 today, marching upward as $p$ compounds. The same number
$p$ describes both curves: money's power to buy things falling, and the
price tag on those things rising, at the same rate.

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
prices rise, visible directly on this lesson's curve.

### Wage negotiations
Workers negotiate for raises above inflation to see a real increase in
what their pay can buy, not just a nominal one.

### Hyperinflation episodes
Weimar Germany and more recently Venezuela and Zimbabwe saw prices double
in days rather than decades, making cash nearly worthless within weeks.
