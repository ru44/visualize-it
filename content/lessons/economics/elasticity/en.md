---
title: Elasticity
summary: >-
  How hard buyers react to a price change — and why raising the price does
  not always raise revenue.
parameters:
  a: a — quantity bought at a price of zero
  b: b — how fast quantity falls as price rises
  x: x — the price
variables:
  - the quantity bought at price x
  - the quantity bought at a price of zero
  - how fast quantity falls as price rises
  - the price
  - total revenue, price times quantity
  - price elasticity of demand at x
charts:
  - title: Price elasticity of demand against price
    xLabel: x (price)
    yLabel: elasticity magnitude
    series:
      - price elasticity |E_d|
---

## Try it

1. Watch the revenue curve. Drag $x$, the price, up from a low value and see it climb.
2. Keep dragging $x$ higher. At some point the tangent line on the curve flattens, then tips down — revenue has started falling instead of rising.
3. Check the elasticity chart below: it crosses the value 1 at exactly the price where the tangent went flat.

## Real-life examples

1. **A staple food.** Rice priced at 30 with 105 units sold: raising the price barely changes how much people buy, since everyone still needs to eat. Demand is inelastic.
2. **A luxury handbag.** Priced near 25 with only 25 units sold: a small price cut brings in enough new buyers to raise total revenue. Demand is elastic.
3. **A concert ticket at the sweet spot.** Priced at 25 with 50 tickets sold, a 1-unit price rise would lose exactly as many sales as it gains in price — this is the single price that earns the most money overall.

## Test yourself

1. Find a price where demand is exactly unit elastic (the value on the elasticity chart equals 1) — this is the revenue-maximizing price.
2. Raise the price until demand becomes clearly elastic (elasticity above 2), while keeping the quantity sold above zero.
3. Lower the price until demand is clearly inelastic (elasticity below 0.2), while keeping the quantity sold above zero.

## Intuition

Imagine a concert where a free ticket would draw 100 fans, but every extra dollar on the price scares off 2 of them — that relationship is the demand line on screen. At a ticket price of 20, 60 fans still buy, and the tangent line on the revenue curve below still points up: the extra dollar you gain from everyone who stays outweighs the value of the few fans you lose. Demand is inelastic here, meaning buyers barely react to the price.

Now drag $x$, the price, higher still: past some point the tangent line flattens, then tips down — each further price rise now loses more ticket sales than it gains in extra revenue per ticket, and demand has become elastic. The elasticity chart below crosses the value 1 exactly where that tangent goes flat, marking the single price that earns the most total revenue.

## Formal

Quantity demanded is $Q = a - b\,x$ and revenue is $R = x\,Q$. Price
elasticity of demand is $E_d = -\dfrac{dQ}{dx}\cdot\dfrac{x}{Q}$: the
percentage drop in quantity for a 1% rise in price. $|E_d| < 1$ is
inelastic, $|E_d| > 1$ is elastic.

Revenue rises with price while $|E_d| < 1$ and falls while $|E_d| > 1$, so
$R$ is maximised exactly where $|E_d| = 1$.

## Advanced

Elasticity is not fixed for a good; it typically rises as price rises
along a straight-line demand curve, and it depends on how many close
substitutes exist, how large a share of the budget the good takes, and
the time horizon — demand is usually more elastic in the long run, once
buyers can adjust habits and find alternatives.

## Derivation

1. Write revenue as price times quantity.
2. Differentiate revenue with respect to price.
3. Define elasticity and show revenue peaks exactly where it equals 1.

## Real world

### Cigarette taxes
Demand for cigarettes is fairly inelastic, so a tax raises government
revenue even as it cuts smoking a little.

### Airline tickets
Business travellers pay inelastically close to departure; leisure
travellers are elastic and book early for lower fares.

### Luxury goods
Demand for designer goods is often elastic — a price cut can bring in
enough new buyers to raise total revenue.

### Staple foods
Demand for rice or bread is inelastic almost everywhere: people keep
buying roughly the same amount regardless of price swings.
