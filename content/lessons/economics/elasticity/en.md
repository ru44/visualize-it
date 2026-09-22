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

## Intuition

Drag the price $x$ up from a low value: quantity falls only a little, and
the tangent line on the revenue curve still points up — revenue is
rising, because the extra money per sale outweighs the few buyers lost.
Demand here is inelastic: buyers barely react.

Keep dragging $x$ higher and the tangent line flattens, then tips down:
past a point, each further price rise loses more sales than it gains in
price. Demand has become elastic. The elasticity chart below crosses 1
exactly where the tangent goes flat — that is the revenue-maximising
price.

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
