---
title: Percent change and compound growth
summary: >-
  Applying the same percentage change repeatedly compounds — each period grows
  off the new, larger total, not the original one.
parameters:
  P: starting amount P
  rate: rate per period (%)
  x: number of periods
variables:
  - starting amount
  - percent change applied each period
  - number of periods elapsed
---

## Intuition

Drag $x$ forward one period at a time and watch the tangent line steepen: because each period's growth is a percentage of the current, already-grown total, the amount added per period keeps increasing — compounding is growth feeding on itself.

Set the rate negative and the curve becomes decay: shrinking by the same percentage each period, the amount lost per period keeps shrinking too, so the curve falls fast at first and then flattens, never quite reaching zero — the same shape as radioactive decay.

## Formal

After $x$ periods, $A(x) = P(1 + \text{rate}/100)^x$; the growth factor per period is constant, $(1+\text{rate}/100)$, not the increment.

For small rates and many compounding periods this approaches continuous exponential growth $Pe^{kx}$ with $k \approx \text{rate}/100$.

## Advanced

Compounding $m$ times a year at nominal annual rate $\rho$ gives $(1 + \rho/m)^{m}$ per year; as $m \to \infty$ this tends to $e^{\rho}$ by the standard limit definition of $e$, which is exactly the bridge between compound growth here and the continuous exponential in the calculus lessons.

## Derivation

1. One period multiplies by the growth factor.
2. Each period multiplies again by the same factor — not adding the same amount.
3. After $x$ periods the factor has been applied $x$ times.

## Real world

### Savings and debt
Compound interest is exactly this formula, for good (savings) or ill (credit card debt).

### Inflation
Prices rising a fixed percent per year compound, so purchasing power erodes faster than a straight-line estimate suggests.

### Population and viral growth
A population growing a fixed percent per generation follows the same compounding law as money.

### Depreciation
A car losing a fixed percent of its value each year is compound decay — rate negative.
