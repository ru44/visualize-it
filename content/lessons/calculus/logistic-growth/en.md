---
title: Logistic growth and carrying capacity
summary: 'Explore proportional growth that slows near a stable capacity, and check when an S-shaped curve actually occurs.'
parameters:
  K: 'K — model capacity'
  y0: 'y₀ — initial amount'
  k: 'k — positive growth-rate constant'
  x: 't — selected time'
variables:
  - 'K: stable equilibrium amount in this model'
  - 'y₀: positive amount at time zero'
  - 'k: intrinsic proportional growth rate, in inverse time'
---

## Try it

1. Set K = 8, y₀ = 0.5 and k = 0.6. Move t from 0 toward 4.5. The amount increases and the tangent becomes steeper as y approaches K/2 = 4.
2. Continue to t = 8, then 15. The amount approaches 8 while its rate of increase decreases.
3. Set K = 2 and y₀ = 3. The model now decreases toward K from above. Starting above capacity does not produce the rising S-shaped curve.

## Real-life examples

1. **Early growth.** With K = 8, y₀ = 0.5, k = 0.6 and t = 2, y ≈ 1.450. The factor 1 − y/K is about 0.819, already reducing the proportional growth rate.
2. **After the fastest growth.** With the same parameters at t = 8, y ≈ 7.121. The fastest growth occurred near t = 4.513, when y = 4; this preset is already slowing near capacity.
3. **Near capacity.** With K = 5, y₀ = 2, k = 0.3 and t = 18, y ≈ 4.966, about 99.3% of K.

## Test yourself

1. Make |y − K/2| less than 0.1.
2. Make y greater than 0.95K. For an approach from below, start with y₀ less than K.
3. Keep y less than 0.1K at a selected time t of at least 5.

## Intuition

Exponential growth uses a rate proportional to the current amount. The logistic model multiplies that rate by the remaining fraction 1 − y/K. When y is small compared with K, this factor is close to 1. At half capacity it is 0.5, and near capacity it is close to zero.

Two effects compete: a larger amount can generate more growth, but less capacity remains. For an amount between zero and K, growth is fastest at K/2. If the starting amount is below that halfway point, the forward-time curve first steepens and then flattens. If it starts above halfway, it slows from the start. K is an assumed model parameter, not a measured universal ceiling.

## Formal

With constants k > 0, K > 0 and y₀ > 0, the model is $dy/dt=ky(1-y/K)$, with $y(0)=y_0$. Its solution is $y(t)=K/[1+((K-y_0)/y_0)e^{-kt}]$ for t ≥ 0. The graph's x coordinate represents time t.

For $0<y_0<K$, the amount increases toward K; for $y_0>K$, it decreases toward K. If $y_0=K$, it stays constant. The growth-rate expression has maximum $kK/4$ at $y=K/2$, but a trajectory starting above K/2 does not pass through that amount at positive time.

## Advanced

For 0 < y₀ < K, the inflection time is ln((K − y₀)/y₀)/k. It is positive only when y₀ < K/2. The zero solution is also an equilibrium, although the slider excludes it. Real processes may have changing capacities or delayed responses; the fixed logistic equation does not account for those effects.

## Derivation

1. Away from the equilibrium values zero and K, separate the variables by dividing by y(1 − y/K).
2. Split the fraction into two terms and integrate to obtain ln|y| − ln|1 − y/K| = kt + C.
3. Rearrange and use the initial amount to determine the constant. The resulting formula also gives the constant solution when y₀ = K, checked directly in the equation.

## Real world

### A limited-capacity growth model

When a quantity grows in proportion both to its current size and to the fraction of capacity remaining, the logistic equation describes that assumption. Compare observations with the model before using it to predict a plateau.

### Separating amount and rate

A large amount can coexist with a small growth rate near capacity. Plotting the amount and examining its tangent helps distinguish how much is present from how fast it changes.
