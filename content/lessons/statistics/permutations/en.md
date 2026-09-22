---
title: 'Permutations: when order matters'
summary: >-
  Count how many different ordered lists — race results, PINs, or a lineup —
  you can make by choosing and arranging items from a set.
parameters:
  'n': n — items available
  k: k — places to fill
variables:
  - how many different items you can choose from
  - 'how many places you fill, in order'
  - 'n factorial: n × (n−1) × … × 1, the ways to line up all n items'
---

## Try it

1. Watch the arrangements listed below the tokens as you drag «k — places to fill».
2. Notice (1,2) and (2,1) both appear: here order matters, like first and second place in a race.
3. Raise «n — items available» and watch the count of arrangements grow much faster than the tokens did.

## Real-life examples

1. **Race podium.** Awarding gold, silver, and bronze among 8 runners can happen in 336 different orders.
2. **Books on a shelf.** Arranging all 5 books in a row can be done in 120 different orders.
3. **Locker code.** Picking an ordered 3-letter code from 6 available letters, no repeats, gives 120 possible codes.

## Test yourself

1. Find «n — items available» and «k — places to fill» that give exactly 60 possible arrangements.
2. Fill every place, k equal to n, and make the count of arrangements exceed 100.
3. Leave at least 3 items unused (n − k ≥ 3), yet keep the count of arrangements under 20.

## Intuition

Look at the arrangements listed below the tokens. With «n — items available» at 4 and «k — places to fill» at 2 you get 12: any of the 4 tokens can go first, then any of the 3 that are left can go second, and 4 × 3 = 12. The pair (1,2) and the pair (2,1) both appear, because here order matters — like first and second place in a race.

Raise «k — places to fill» by one and every existing arrangement sprouts n − k new endings, so the count grows very fast. Set «k — places to fill» equal to «n — items available» and you are lining up every item — that count is written n factorial.

## Formal

$P(n,k) = n(n-1)\cdots(n-k+1) = \dfrac{n!}{(n-k)!}$, with $0! = 1$ so that $P(n,n) = n!$.

Permutations count injective maps from a $k$-element set into an $n$-element set.

## Advanced

Stirling’s approximation $n! \sim \sqrt{2\pi n}\,(n/e)^n$ shows how explosively factorials grow: $\log n!$ is of order $n \log n$, which is why brute-force search over orderings becomes hopeless beyond a few dozen items.

## Derivation

1. Multiply the choices for each place: the pool shrinks by one after every pick.
2. Write the product as a ratio of factorials: the factors from $n-k$ downward cancel.
3. The compact formula. For $k = n$ the denominator is $0! = 1$.

## Real world

### Passwords and PINs
A 4-digit PIN with no repeated digit has P(10,4) = 5040 possibilities; with repeats allowed it is 10⁴ = 10 000.

### Race podiums
Gold, silver and bronze among 8 runners can be awarded in P(8,3) = 336 ways.

### Scheduling
Ordering 10 tasks gives 10! ≈ 3.6 million schedules — which is why planners rely on heuristics.
