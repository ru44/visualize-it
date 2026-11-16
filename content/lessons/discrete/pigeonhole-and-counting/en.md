---
title: 'The pigeonhole principle and counting'
summary: 'Use counting to distinguish how many selections are possible from what must happen when items outnumber boxes.'
parameters:
  n: 'n — number of distinct items available in the diagram'
  k: 'k — number selected; keep k between 0 and n'
variables:
  - 'n: item count; in the diagram, the pool size'
  - 'm: box count in the pigeonhole argument; not a diagram control'
---

## Try it

1. Set n = 8 and k = 3. There are 56 different groups of three. Each group is counted once, regardless of the order of its members.
2. Keep n = 8 and try k = 0, 4 and 8. The counts are 1, 70 and 1. The maximum is near the middle, not at the largest group size.
3. Set n = 5 and k = 2. Count the 10 displayed groups. Keep k no greater than n; the picture caps its selected group size at n.

## Real-life examples

1. **A committee of three.** Choosing 3 of 8 volunteers gives 56 committees if there are no distinct roles within the committee.
2. **Two toppings.** Choosing 2 distinct toppings from 5 gives 10 combinations. Selecting olive and mushroom is the same choice as mushroom and olive.
3. **Four numbered cards.** Selecting 4 distinct cards from 10 gives 210 groups. The display shows only the first 60 groups when the count is large; the total includes them all.

## Test yourself

1. Find n and k giving exactly 10 selections.
2. Find n and k giving more than 100 selections, with k no greater than 6.
3. Find n and k giving 252 selections, the largest count available here.

## Intuition

The diagram counts selections. For example, there are ten ways to pick two of five distinct items when order does not matter. This answers “how many groups are possible?” It does not show items being placed in boxes.

A different counting question asks what must happen. Put 13 people into 12 categories according to birth month. If every category contained at most one person, there could be at most 12 people. Since there are 13, at least one month belongs to two or more people. This reasoning is called the pigeonhole principle.

## Formal

For n items assigned to m boxes, with positive integer m, $n>m$ guarantees that some box contains at least two items. Each item must be assigned to one box. The principle guarantees a shared box without identifying which box it is.

The diagram counts combinations: $\binom{n}{k}=n!/[k!(n-k)!]$ for integers with $0\le k\le n$. Here n is the pool size and k is the group size. The product rule is different: if each of a first choice's a options allows b second options, there are ab pairs of choices.

## Advanced

More generally, some box contains at least n/m rounded up to an integer. For example, 25 items in 12 boxes force one box to contain at least 3 items: if all boxes held at most 2, their total capacity would be 24. For combinations, choosing k items is equivalent to choosing the n − k items to leave out, explaining the symmetry of the displayed counts.

## Derivation

1. Suppose every box holds at most one item.
2. Then m boxes hold at most m items altogether.
3. This contradicts having more than m items assigned to those boxes. Therefore some box holds at least two.

## Real world

### Shared birth months

Among 13 people, at least two share a birth month. This guarantees a shared month, not a shared birthday.

### Repeated labels

Assigning 101 objects labels from only 100 distinct labels forces at least one label to be reused. This remains true however carefully we choose the labels.
