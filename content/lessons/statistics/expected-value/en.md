---
title: Expected value
summary: >-
  The average outcome over many repeats — the number that tells you whether a
  game, an insurance policy or a bet is worth it.
parameters:
  x: p — chance of winning
  w: w — amount won
  c: c — amount lost otherwise
variables:
  - the random gain from one play
  - a possible outcome (win w or lose c)
  - its probability
charts:
  - title: Long-run average winnings per play against the win probability
    xLabel: p (chance of winning)
    yLabel: expected gain
    series:
      - p·w − (1−p)·c
      - fair game (zero)
---

## Intuition

You win 10 with probability 0.4, otherwise you lose 5. Over 100 plays you expect about 40 wins (+400) and 60 losses (−300): +100 in total, +1 per play. That per-play figure is the expected value, $0.4 \times 10 - 0.6 \times 5 = 1$. Drag the point: where the line crosses zero the game is fair.

Every lottery, casino game and insurance policy is designed so this number favours the house. The expected value of a €2 lottery ticket is typically about €1 — you pay €1 per ticket, on average, for the excitement.

## Formal

$E[X] = \sum_i x_i P(X = x_i)$ for discrete $X$; $E[X] = \int x f(x)\,dx$ for continuous $X$. Linearity: $E[aX + bY] = aE[X] + bE[Y]$ always holds, independent or not.

The law of large numbers says the average of many plays converges to $E[X]$.

## Advanced

Expected value alone ignores risk: the St Petersburg game has infinite expectation yet nobody would pay much to play. Utility theory (Bernoulli, von Neumann–Morgenstern) replaces $E[X]$ with $E[u(X)]$ for a concave $u$, and the Kelly criterion shows that maximising expected *log* wealth is what grows a bankroll fastest.

## Derivation

1. Use the long-run proportions.
2. Add the gains and subtract the losses.
3. Per play: each outcome weighted by its probability.

## Real world

### Insurance
A premium is the expected payout plus a margin: many pay a little so that the few who suffer are paid.

### Lotteries and casinos
Roulette returns 97.3% of stakes on average — an expected loss of 2.7% per spin.

### Decisions under uncertainty
Should a company launch a product? Multiply each scenario’s profit by its probability and add.
