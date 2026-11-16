---
title: Exponential growth and decay
summary: 'Explore a quantity whose instantaneous rate of change is proportional to its current amount.'
parameters:
  k: 'k — instantaneous proportional rate'
  y0: 'y₀ — amount at time zero'
  x: 't — selected time'
variables:
  - 'y: amount at time t'
  - 'k: instantaneous rate divided by current amount'
  - 'y₀: initial positive amount'
---

## Try it

1. Set y₀ = 1, k = 0.25 and t = 4. The amount is about 2.7183 and the slope about 0.6796. Dividing slope by amount gives 0.25.
2. Set k = −0.3 and y₀ = 8. Move t from 0 to 5: the amount decreases to about 1.785, while the negative slope becomes smaller in magnitude.
3. Set k = 0. The amount stays at y₀ for every time. With a nonzero k, changing y₀ rescales the curve without changing its doubling or halving time.

## Real-life examples

1. **Slow continuous growth.** With y₀ = 1 and k = 0.05, the amount at t = 10 is about 1.649. The multiplier over one time unit is $e^{0.05}$, about 1.05127, rather than exactly 1.05.
2. **Continuous decay.** With y₀ = 8 and k = −0.3, the amount at t = 5 is about 1.785, about 22.3% of the starting amount.
3. **Faster growth.** With y₀ = 0.5 and k = 0.4, the amount at t = 8 is about 12.266. It exceeds the plot's upper bound of 12; use the numerical readout.

## Test yourself

1. Make the amount within 0.3 of 5.
2. Make the amount less than 0.1.
3. Make the multiplier from the starting amount within 0.1 of 2.

## Intuition

Suppose a quantity grows at an instantaneous rate equal to one quarter of its current amount per time unit. When the amount is 2, the rate is 0.5; when it is 4, the rate is 1. Growth accelerates because the rate is based on the amount already present. The constant k controls this proportionality, while y₀ is the amount at time zero.

A negative k makes the amount decrease. As less remains, the decrease per time unit becomes smaller in magnitude. In the continuous model the positive amount approaches zero without reaching it at any finite time. The graph shows an ideal proportional-rate rule; a real process follows it only while the assumed constant rate remains appropriate.

## Formal

For constant k, the initial-value problem $dy/dt=ky$ with $y(0)=y_0$ has solution $y(t)=y_0e^{kt}$. Here y₀ is positive. The rate constant has units of inverse time, so kt is dimensionless. The graph's horizontal coordinate x represents time t.

For $k>0$, the doubling time is $T_2=\ln2/k$. For $k<0$, the half-life is $T_{1/2}=\ln2/(-k)$. These times do not depend on y₀. When k = 0, the positive amount is constant and has no finite doubling or halving time.

## Advanced

Over a finite interval Δt, the multiplier is $e^{k\Delta t}$ and the fractional change is $e^{k\Delta t}$ − 1. The approximation kΔt is useful only when its magnitude is small. Multiplying a solution by $e^{-kt}$ gives a constant, which also shows why the initial condition selects a unique solution.

## Derivation

1. Since y is positive here, divide by y and separate the amount and time variables.
2. Integrate both sides: the integral of 1/y is ln y and the integral of constant k is kt.
3. Exponentiate, then apply the time-zero condition to identify the positive factor $e^C$ as y₀.

## Real world

### A constant proportional-loss model

If a process removes material at a rate proportional to the amount remaining, a negative k gives the model's time course. A fixed amount removed each time unit would instead produce a linear model.

### Comparing growth records

When a positive quantity follows this model, plotting its natural logarithm against time gives a straight line with slope k. A curved log plot suggests that a constant k may not fit the entire record.
