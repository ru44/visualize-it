---
title: Composing functions
summary: >-
  Chain two simple rules — convert currency, then add tax — into one, and see
  why the order in which you run them can change the final answer.
parameters:
  x: dollars x
  r: r — exchange rate (machine g)
  t: t — tax rate (machine f)
variables:
  - the amount of money you start with, in dollars
  - the exchange rate — dollars become this many units for every one dollar
  - the tax rate applied after conversion, as a fraction
---

## Try it

1. Drag «x», money in dollars, and watch the curve show what comes out after both machines run.
2. Raise «r», the conversion machine. The whole curve tilts steeper: every dollar is now worth more before tax even applies.
3. Now raise «t», the tax machine. The curve tilts steeper again, on top of the first tilt — two machines, two effects, stacked.

## Real-life examples

1. **Converting dollars to riyals, then paying tax.** 1 dollars 00 at a rate of r=3.75 becomes 375 riyals; a 15% tax after conversion brings the total to 431.25.
2. **Dollars to euros with a smaller tax.** 5 dollars 0 at r=0.85 becomes 42.5 euros; an 8% tax after that brings it to 45.90.
3. **A tax-free currency swap.** 1 dollars 50 at r=1.35 becomes 202.50 Canadian dollars, with no tax added (t=0), so the second machine changes nothing at all.

## Test yourself

1. Find x, r and t so the final amount comes out to exactly 300.
2. Find r, x and t so the tax portion alone equals exactly 15.
3. Find r and t so that converting and then taxing exactly doubles your money.

## Intuition

Picture two machines bolted one after the other on a conveyor belt. The first machine, g, takes your x dollars and converts them: feed in 100 dollars at a rate of r=3.75 and out comes 375 riyals. The second machine, f, takes whatever comes out of the first and adds tax: feed in 375 riyals at 15% tax and out comes 431.25. Composing f and g just means running the output of one straight into the input of the other, with nothing in between.

The curve on screen is the whole pipeline drawn as a single rule: for every x dollars you could start with, it shows exactly what comes out the far end after both machines have run. Slide «r» and the conversion machine changes, which shifts every point on the curve. Slide «t» instead and only the second machine changes, yet the whole curve still moves, because everything downstream of a changed machine changes too.

## Formal

Given two functions $g$ and $f$, their composition $(f \circ g)(x) = f(g(x))$ first applies $g$, then applies $f$ to the result. Composition is only defined where $g(x)$ lands inside the set of inputs $f$ is willing to accept.

Here $g(x) = rx$ and $f(u) = u(1+t)$, so $(f \circ g)(x) = rx(1+t)$: a single new function built entirely from the other two, with no value skipped or reused.

## Advanced

Composition is associative, $(f \circ g) \circ h = f \circ (g \circ h)$, but not commutative in general: converting then taxing is not the same rule as taxing then converting unless the tax applies equally to the original currency, which is why the order of real-world machines like these genuinely matters.

## Derivation

1. The first machine converts the input: g(x) = rx.
2. The second machine adds tax to whatever it receives: f(u) = u(1+t).
3. Feeding one into the other gives the single combined rule: f(g(x)) = rx(1+t).

## Real world

### Software pipelines
A data pipeline that cleans data, then transforms it, then loads it is a composition of three functions, applied in a fixed order.

### Unit conversion chains
Converting inches to centimetres, then centimetres to a scale-model size, is one conversion function composed with another.

### Bank and payment processing
Currency conversion, fee deduction and tax are often three separate composed functions applied to the same transaction, in that order.
