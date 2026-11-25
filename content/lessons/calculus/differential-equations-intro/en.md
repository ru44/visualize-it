---
title: An introduction to differential equations
summary: 'Use a rate equation and a starting amount to explore equilibria under constant removal.'
parameters:
  k: 'k — proportional growth-rate constant'
  K: 'K — capacity without removal'
  h: 'h — constant amount removed per time unit'
  y0: 'y₀ — initial amount'
  tView: 'time position — 0 to 1 across 40 time units'
variables:
  - 'y: amount at time t'
  - 'k: intrinsic proportional growth rate'
  - 'K: equilibrium amount when h = 0'
  - 'h: fixed removal rate, in amount per time'
---

## Try it

1. Set k = 0.5, K = 100, h = 5 and y₀ = 30. Play the simulation or drag its time marker. The amount increases toward the upper equilibrium, about 88.73.
2. Keep the same rates but set y₀ = 5. This lies below the lower equilibrium, about 11.27, so the amount decreases instead. The starting value matters as well as the removal rate.
3. Set h = 15. It exceeds kK/4 = 12.5, so the rate is negative at every nonnegative amount. Interpret the population model only until it first reaches zero; numerical values beyond that point do not represent a population.

## Real-life examples

1. **Above the lower threshold.** With k = 0.5, K = 150 and h = 5, the equilibria are about 10.77 and 139.23. Starting at y₀ = 30 leads toward the upper level in this model.
2. **Closer equilibrium levels.** With k = 0.3, K = 100 and h = 7, the equilibria are about 37.09 and 62.91. Starting at 50 leads toward 62.91; a start below 37.09 would decrease toward zero.
3. **Removal exceeds all growth rates.** With k = 0.4, K = 80 and h = 12, the maximum growth rate is 8. Starting at 60, removal exceeds growth and no nonnegative equilibrium exists.

## Test yourself

1. Choose a positive h less than kK/4. This gives two positive equilibria, including a stable upper one; the check does not test whether y₀ lies above the lower threshold.
2. Choose h greater than kK/4, so no nonnegative equilibrium exists.
3. Make h differ from kK/4 by at most 0.5. The exact equality is the boundary where the two equilibria merge.

## Intuition

A differential equation gives a rate instead of directly giving the future amount. Here growth adds ky(1 − y/K), while constant removal subtracts h per time unit. Starting from y₀, the simulation estimates successive changes using that rate. The time control selects a point on the computed trajectory; its range 0 to 1 covers the displayed 0 to 40 time units.

An equilibrium is an amount where addition and removal balance. Below the maximum possible growth rate, there are two positive balance points. The upper one attracts nearby amounts, while the lower one separates outcomes: start above it and approach the upper equilibrium; start below it and decrease toward zero. The same rate settings can therefore produce different outcomes from different initial amounts.

## Formal

The model is $dy/dt=ky(1-y/K)-h$, with k > 0, K > 0, h ≥ 0 and a specified initial amount y₀. Equilibria solve $ky(1-y/K)=h$. For $0<h<kK/4$, they are $y_\pm=(K/2)(1\pm\sqrt{1-4h/(kK)})$; the upper is stable and the lower unstable.

At $h=kK/4$, the levels merge at $y=K/2$. It attracts trajectories from above but not from below. If $h>kK/4$, the rate is negative for every nonnegative y. The equation does not enforce y ≥ 0: at zero its rate is −h, so continuing it unchanged past depletion loses the population interpretation.

## Advanced

Write the rate as kK/4 − (k/K)(y − K/2)² − h to see its maximum directly. At h = 0, the equilibria are zero and K. The numerical curve is an approximation over a finite time window, not a proof of an asymptotic limit. A constant-removal rule would need modification at depletion to describe a physical population thereafter.

## Derivation

1. Specify the instantaneous rate as logistic growth minus a fixed amount removed per unit time.
2. Set that rate to zero to locate equilibrium amounts. Solve the quadratic and examine the rate's sign between and outside the roots.
3. The growth term reaches its maximum kK/4 at K/2. Comparing h with that maximum determines how many equilibrium levels exist, not by itself whether a chosen initial population persists.

## Real world

### Balancing production and removal

A stock model compares a production rate with an outflow rate. Its assumptions and initial amount determine the trajectory; a rate threshold from an ideal model is not a universal operating rule.

### Testing an initial-value problem

Changing y₀ while keeping the rate equation fixed reveals which outcomes depend on the starting state. Comparing nearby trajectories helps identify stable and unstable equilibria.
