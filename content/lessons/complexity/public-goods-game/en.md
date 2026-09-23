---
title: The public goods game and free riders
summary: Everyone who chips in makes the shared pot bigger for the whole group, but chipping in nothing and still taking a share always pays better, so cooperation needs help to survive.
parameters:
  r: how much the pot is multiplied
  sigma: safe payoff for opting out
  gen: round
variables:
  - r
  - n
charts: []
---

## Try it

1. Press play with "how much the pot is multiplied" around 1.5. Watch red squares (free riders) spread until almost none of the grid is blue.
2. Raise the multiplier to about 6 and restart. Now blue cooperators survive in clusters, because a cooperator surrounded by other cooperators out-earns a lone defector nearby.
3. Drop "safe payoff for opting out" below zero and restart. With opting out no longer safe, cooperators and defectors fight it out with nobody able to retreat to the sidelines.

## Real-life examples

1. **A pot barely worth splitting.** At a multiplier of 1.5, every token you contribute comes back as less than a token to the group, so defecting always wins and cooperation collapses.
2. **A pot worth far more shared.** At a multiplier of 5, the group turns each token into five, so cooperators clustered together easily out-earn a lone defector near them.
3. **No safe way out.** With the loner's payoff pushed to -0.5, standing aside is no longer safe, and cooperators and defectors compete directly across the whole grid.

## Test yourself

1. Set "how much the pot is multiplied" to about 1.5.
2. Push the multiplier to at least 6 and run for at least 15 rounds.
3. Set "safe payoff for opting out" to about 0 and run for at least 10 rounds.

## Intuition

Picture nine neighbours around a table, each deciding whether to put a coin into a shared pot. Every coin in the pot gets multiplied and then split equally among everyone at the table, cooperators and defectors alike. A red square on the grid is a defector who keeps its coin and still takes a share; a blue square is a cooperator who pays in. Every round, each square copies whichever neighbour, or itself, earned the most, so a strategy that pays off locally spreads across the grid exactly like an infection.

Contributing one coin only comes back as more than one coin if the multiplier is bigger than the group size, so with a small multiplier defecting always earns more than cooperating in the same spot, and red spreads everywhere. Raise the multiplier enough, and a tight cluster of blue squares starts earning more together than any single defector at its edge, because the cooperators inside the cluster share a bigger multiplied pot with each other. Cooperation survives, but only by huddling together.

## Formal

A group of $n$ players each contribute either 1 token (cooperate) or 0 (defect) to a shared pot. The pot is multiplied by $r$ and split equally among all $n$ players, contributors and free riders alike.

A defector's payoff is always exactly 1 token higher than a cooperator's in the same group, because the defector keeps the token it didn't contribute. Since $r < n$ makes a single contributed token return less than a token once shared, $r < n \Rightarrow$ defecting always earns more, whatever the rest of the group does.

## Advanced

Because defection is a dominant strategy for any $r < n$, a well-mixed population collapses to all-defection under replicator-style dynamics, the standard tragedy of the commons. Space changes the outcome: placing players on a grid lets cooperators cluster and share the benefit of cooperation mostly among themselves, so a spatial public goods game can sustain cooperation for a range of $r$ where a well-mixed one cannot. Adding an explicit punishment option, where players pay a small cost to fine defectors in their group, pushes the surviving level of cooperation far higher still, as shown experimentally by Fehr and Gächter, at the price of a new free-riding problem: punishing costs the punisher too.

## Derivation

1. Every player in a group either contributes 1 token to the shared pot or keeps it and contributes 0.
2. The pot is multiplied by $r$ and split equally among all $n$ players in the group, whether or not they contributed.
3. Because a defector always keeps its own token as well as its share, and $r < n$ makes that share worth less than a token, defecting earns strictly more than cooperating in the same group.

## Real world

### Taxes and public services
Everyone benefits from roads and schools whether or not they pay their full share of tax, which is exactly the free-rider problem this game captures.

### Open-source software
Most users of a free project never contribute code or money back, yet the project can still thrive if a cluster of contributors gets enough benefit from cooperating with each other.

### Fisheries and shared resources
Fishing less than your share helps the whole fishery recover, but any individual boat earns more by fishing as much as it can, unless the fleet finds a way to enforce cooperation.

### Punishing free riders
Real communities often add explicit punishment, fines, social shaming, exclusion, which experiments show can lift cooperation far above what the bare game alone sustains.
