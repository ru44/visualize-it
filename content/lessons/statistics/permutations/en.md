---
title: 'Permutations: when order matters'
summary: >-
  How many ways can you line up k things chosen from n, when a different order
  counts as a different result?
parameters:
  'n': n — items available
  k: k — places to fill
variables:
  - how many different items you can choose from
  - 'how many places you fill, in order'
  - 'n factorial: n × (n−1) × … × 1, the ways to line up all n items'
---

## Intuition

Look at the arrangements listed below the tokens. With 4 tokens and 2 places you get 12: any of the 4 can go first, then any of the 3 that are left can go second, and 4 × 3 = 12. The pair (1,2) and the pair (2,1) both appear, because here order matters — like first and second place in a race.

Raise $k$ by one and every existing arrangement sprouts $n-k$ new endings, so the count grows very fast. Set $k = n$ and you are lining up everything: that is $n!$.

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
