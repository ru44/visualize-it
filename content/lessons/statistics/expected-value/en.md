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

## Try it

1. Watch the point on the line: it shows your average gain per play at the current «p — chance of winning».
2. Drag «p — chance of winning» to the right. Watch the line's value climb from a loss into a profit.
3. Find where the line crosses zero: that is a fair game, where on average you win exactly what you lose.

## Real-life examples

1. **Coin-flip bet.** Flip a coin: win 8 on heads, lose 8 on tails — a perfectly fair bet with an average result of zero.
2. **Store raffle ticket.** A 1-in-20 chance to win a prize worth 20, otherwise you lose the 1 you paid for the ticket — worth entering on average.
3. **Risky side bet.** A 90% chance to win a small 2, and a 10% chance to lose 15 — the average is still slightly positive, but a single unlucky spin can hurt a lot.

## Test yourself

1. Adjust the sliders until the game is exactly fair — an average result of zero.
2. Make the average result better than +5 per play.
3. Find a game where you win less than half the time, yet it is still profitable on average.

## Intuition

You win 10 with probability 0.4, otherwise you lose 5. Over 100 plays you expect about 40 wins (+400) and 60 losses (−300): +100 in total, or +1 per play. That per-play figure is the expected value, $0.4 \times 10 - 0.6 \times 5 = 1$. Drag the point along «p — chance of winning»: where the line crosses zero, the game is fair.

Every lottery, casino game and insurance policy is designed so this number favours the house. The expected value of a €2 lottery ticket is typically about €1 — on average you pay €1 per ticket just for the excitement of playing.

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
