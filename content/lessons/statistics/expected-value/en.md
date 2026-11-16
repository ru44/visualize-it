---
title: Expected value
summary: 'Calculate an average outcome by weighting each possible result by its probability, without treating that average as a guaranteed result.'
parameters:
  x: 'p — probability of gaining points'
  w: 'w — net points gained on success'
  c: 'c — points lost otherwise'
variables:
  - 'random net score change on one turn'
  - 'a possible net change: +w or −c'
  - 'probability of that outcome'
charts:
  - title: Expected score change against success probability
    xLabel: p (success probability)
    yLabel: expected score change
    series:
      - p·w − (1−p)·c
      - zero expectation
---

## Try it

1. Set p = 0.4, w = 10 and c = 5. The expected score change is 0.4 × 10 − 0.6 × 5 = 1, even though a single turn gives either +10 or −5.
2. Increase p while keeping w and c fixed. The selected point rises along the line because more probability is assigned to the positive result.
3. Set p = 0.5 and w = c = 8. The expectation is zero. Individual turns still change the score, and a finite run need not finish where it started.

## Real-life examples

1. **Equal chances and outcomes.** A 50% chance of gaining 8 points and a 50% chance of losing 8 gives an expected change of zero.
2. **Rare gain.** A 5% chance of gaining 20 points, otherwise losing 1 point, gives expectation 0.05. These are net score changes; if a cost applies on every turn, it must also be subtracted from the gain.
3. **Frequent small gains.** A 90% chance of gaining 2 points and a 10% chance of losing 15 gives expectation 0.3. A positive average does not remove the possibility of a large loss on one turn.

## Test yourself

1. Make the expected score change zero.
2. Make the expected score change greater than 5.
3. Use a success probability below 0.5 while keeping the expected score change positive.

## Intuition

Suppose a turn gives +10 points with probability 0.4 and −5 otherwise. In 100 independent turns with unchanged probabilities, the expected counts are 40 gains and 60 losses. Their expected total is 400−300 = 100 points, or one point per turn. This weighted average is $0.4\times10-0.6\times5=1$. One point is not a possible result of a single turn.

The graph calculates this average for every success probability from zero to one. Its endpoints are −c and w. The selected probability determines the marked value, while changing either score changes the line. If part of the line lies outside the plotting range, the formula still applies. Expected value summarizes an average; it does not describe all the possible outcomes or how widely they differ.

## Formal

For finitely many outcomes, $E[X]=\sum_i x_iP(X=x_i)$, with probabilities summing to one. Each outcome is multiplied by its probability. Here $E[X]=pw-(1-p)c$, where p is the success probability, w the net gain on success, and −c the net change otherwise.

If $w+c>0$, zero expectation occurs at $p=c/(w+c)$. If both w and c are zero, every p gives zero expectation. For variables with finite expectations, $E[aX+bY]=aE[X]+bE[Y]$ whether or not X and Y are independent.

## Advanced

The law of large numbers makes the observed average tend to the expectation for independent, identically distributed trials with a finite expected absolute outcome. The finite two-outcome model satisfies this condition. Dependence, changing probabilities and an infinite or undefined expectation require more care. Even with convergence, no finite total is guaranteed.

## Derivation

1. Over many independent turns with the same probability p, the proportions of successes and failures tend to p and 1−p. Their expected counts are Np and N(1−p).
2. Multiply the success count by the net gain and subtract the failure count times the loss. This gives an expected total of Npw−N(1−p)c.
3. Divide the expected total by N. The average change per turn is pw−(1−p)c; a finite observed average can differ.

## Real world

### Planning supplies

If an event has several possible attendance levels, a probability-weighted attendance estimate gives an expected number. Planning may also need to consider unusually busy outcomes, not only the average.

### Game design

Two scoring rules can have the same expected change but very different spreads of results. Players experience the individual outcomes as well as the average.
