---
title: 'Combinations: when order does not matter'
summary: >-
  Count how many different teams, hands, or lottery picks you can form from a
  set of items, when only who's in the group matters, not the order.
parameters:
  'n': n — items available
  k: k — how many to pick
variables:
  - how many different items you can choose from
  - the size of the group you pick
  - 'read “n choose k”: the number of possible groups'
---

## Try it

1. Watch the groups listed below the tokens as you drag «k — how many to pick».
2. Notice (1,2) and (2,1) appear only once in that list: order does not matter for a group.
3. Compare picking 2 items to picking the other 3: the number of groups is the same either way.

## Real-life examples

1. **Pizza toppings.** Choosing 3 toppings from a menu of 8 gives 56 different pizzas, however you rank the toppings you chose.
2. **Study group.** Picking a 4-person study group from 9 classmates can be done 126 different ways.
3. **Double scoop.** Choosing 2 flavours from 6 at an ice cream shop — chocolate then vanilla is the same order as vanilla then chocolate — gives 15 possible scoops.

## Test yourself

1. Find «n — items available» and «k — how many to pick» that give exactly 10 possible groups.
2. Pick a k no larger than half of n, and make the number of groups exceed 50.
3. Set «n — items available» to 10 and find the «k — how many to pick» that gives the largest possible number of groups (at least 250).

## Intuition

Now a group of (1,2) and a group of (2,1) are the same thing — a team of two, not a ranking. Compare with the permutations lesson: with «n — items available» at 5 and «k — how many to pick» at 2 there were 20 ordered pairs, but only 10 groups, because every group of 2 had been counted twice, once per ordering.

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
