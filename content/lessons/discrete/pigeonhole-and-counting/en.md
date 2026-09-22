---
title: 'The pigeonhole principle and counting'
summary: >-
  Cram more items into fewer boxes than you have items, and one box must
  hold at least two. A simple idea that proves surprisingly strong things.
parameters:
  n: n — items to choose from
  k: k — how many to pick
variables:
  - n — the number of items placed into boxes
  - m — the number of boxes available
---

## Intuition

Every selection the picture draws is a group of k items chosen from n, with the group itself all that matters, not the order you picked them in. Slide k up toward n and the number of possible groups grows fast, because there are simply many more ways to combine items as the group gets closer to half of n.

That growth in choices is exactly what the pigeonhole principle is about in reverse: if you have more items than boxes to put them in, at least one box is forced to hold more than one item, no matter how cleverly you distribute them. With 13 people and 12 months of the year, at least two people must share a birth month — you cannot spread 13 pigeons across 12 holes one per hole.

## Formal

The pigeonhole principle states $n > m \Rightarrow \text{some box holds at least two of the } n \text{ items}$: place n items into m boxes with n strictly greater than m, and at least one box receives two or more items.

The product rule complements it for building things up rather than squeezing them down: if a first choice can be made k1 ways and a second, independent choice k2 ways, the pair together can be made k1 × k2 ways — the basis every permutation and combination count in this course relies on.

## Advanced

The pigeonhole principle generalises: with n items and m boxes, some box must hold at least ⌈n/m⌉ items (rounding up), not just "at least two". This stronger form proves results far beyond birthdays, such as guaranteeing that among any n+1 numbers chosen from 1 to 2n, two must be consecutive, or that a long enough sequence of distinct numbers must contain a rising or falling run of a guaranteed length.

## Derivation

1. Suppose, for contradiction, that every one of the m boxes holds at most one item.
2. Under that assumption the boxes together can hold at most m items in total, since each contributes no more than one.
3. But there are n items and n is greater than m, a direct contradiction, so the assumption was false and some box really does hold two or more.

## Real world

### Shared birth months
Among any 13 people, the pigeonhole principle guarantees at least two share a birth month, since there are only 12 months to go around.

### Hash table collisions
A hash table with fewer slots than items being stored is guaranteed to have a collision, the same pigeonhole logic that programmers design around with resizing and chaining.

### Counting passwords or IDs
The product rule multiplies the choices for each character position together to count how many distinct passwords or ID codes a format allows, the same rule behind counting permutations.

### Lossless compression limits
No lossless compression scheme can shrink every possible file, because there are strictly more input files than shorter output files to hold them uniquely — pigeonhole again, just with files as the pigeons.
