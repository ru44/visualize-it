---
title: Exponential growth and decay
summary: >-
  Money that earns interest on its own interest grows faster and faster the
  longer it sits — this is the rule behind that snowball effect, for growth
  or decay alike.
parameters:
  k: rate constant k
  y0: starting amount y₀
  x: time t
variables:
  - the amount present at time t
  - fractional change per unit time
  - the amount at t = 0
---

## Try it

1. Drag the point along the curve. Compare the slope readout with the height readout: the slope is always «rate constant k» times the height.
2. Make «rate constant k» negative. The curve now falls instead of rises.
3. Drag «starting amount y₀» up and down. The whole curve scales with it, but the doubling or halving time stays the same.

## Real-life examples

1. **Compound interest over a decade.** Starting with y₀ = 1 and a modest rate k = 0.05, ten years (x = 10) of compounding noticeably grows the amount.
2. **Radioactive decay of a sample.** Starting with y₀ = 8 and a decay rate k = -0.3, after 5 time units (x = 5) most of the sample is already gone.
3. **Early epidemic spread.** Starting from y₀ = 0.5 with a fast growth rate k = 0.4, by x = 8 the numbers have grown dramatically — this is why early outbreaks look explosive.

## Test yourself

1. Make the amount reach about 5.
2. Make the amount decay to below 0.1.
3. Find a rate and time where the amount has exactly doubled from its start.

## Intuition

Picture a savings account holding 100 dollars today — that starting balance is the slider «starting amount y₀». Each year the account earns a percentage of whatever is already in it, set by «rate constant k»: at 100 dollars you might earn 5 dollars, but once the balance has grown to 200 dollars, the same percentage now earns 10 dollars a year. Drag the point along the curve and compare the two readouts: the slope, how fast the balance is climbing right now, is always «rate constant k» times the current height.

Now make «rate constant k» negative, like a radioactive sample instead of a bank account. The same rule now says the more atoms remain, the faster they decay, so the curve falls quickly at first and then more and more slowly, approaching zero but never quite touching it.

## Formal

$y' = ky$ with $y(0) = y_0$ has the unique solution $y = y_0 e^{kt}$.

Doubling time (or half-life) is $\ln 2 / |k|$ — independent of the current amount.

## Advanced

Uniqueness: if $y$ solves the equation then $\frac{d}{dt}\left(y e^{-kt}\right) = 0$, so $y e^{-kt}$ is constant. This integrating-factor trick generalises to every linear first-order ODE.

## Derivation

1. Separate the variables: everything with $y$ on one side.
2. Integrate both sides.
3. Exponentiate; the constant is fixed by the starting amount.

## Real world

### Compound interest
Money earning a percentage of itself grows exponentially.

### Radioactive decay
Each nucleus has a fixed chance of decaying per second, so the sample shrinks with a constant half-life.

### Epidemics and populations
Early spread is exponential because every case creates new cases.

### Cooling
A hot drink approaches room temperature exponentially (Newton’s law of cooling).
