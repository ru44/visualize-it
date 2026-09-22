---
title: 'Combinations: when order does not matter'
summary: >-
  How many different groups of k can you form from n items, when the group is
  all that counts?
parameters:
  'n': n — items available
  k: k — how many to pick
variables:
  - how many different items you can choose from
  - the size of the group you pick
  - 'read “n choose k”: the number of possible groups'
---

## Intuition

Now (1,2) and (2,1) are the same thing — a team of two, not a ranking. Compare with the permutations lesson: with $n = 5$, $k = 2$ there were 20 ordered pairs but only 10 groups, because every group of 2 had been counted twice (once per ordering).

That is the whole idea: count the ordered arrangements, then divide by the $k!$ ways each group can be shuffled. Notice the symmetry too — choosing 2 of 5 to take is the same as choosing 3 of 5 to leave behind, so $C(5,2) = C(5,3)$.

## Formal

$\dbinom{n}{k} = \dfrac{P(n,k)}{k!} = \dfrac{n!}{k!\,(n-k)!}$; the symmetry $\dbinom{n}{k} = \dbinom{n}{n-k}$ follows at once.

Pascal’s rule $\dbinom{n}{k} = \dbinom{n-1}{k-1} + \dbinom{n-1}{k}$: either the last item is in the group or it is not.

## Advanced

The binomial theorem $(a+b)^n = \sum_k \binom{n}{k} a^k b^{n-k}$ names these numbers: they count how many of the $2^n$ expansion terms have exactly $k$ factors of $a$. Summing the row gives $\sum_k \binom{n}{k} = 2^n$, the number of subsets of an $n$-set.

## Derivation

1. Start with ordered selections.
2. Every group can be written in $k!$ orders, and each order was counted separately.
3. Divide to count each group exactly once.

## Real world

### Lotteries
Choosing 6 numbers from 49: C(49,6) = 13 983 816 tickets, so one ticket wins the jackpot with probability 1 in 14 million.

### Poker hands
There are C(52,5) = 2 598 960 five-card hands; counting the hands of each type gives their probabilities.

### Teams and committees
Picking a 3-person committee from 12 colleagues: C(12,3) = 220 possible committees.

### Genetics and sampling
How many ways a sample of 10 can be drawn from a population of 1000 decides how precise a survey can be.
