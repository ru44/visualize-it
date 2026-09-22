---
title: 'The pigeonhole principle and counting'
summary: >-
  Cramming more items into fewer boxes than you have items forces one box to
  hold at least two — a simple idea that proves surprisingly strong things
  about codes, passwords, and shared birthdays.
parameters:
  n: n — items to choose from
  k: k — how many to pick
variables:
  - n — the number of items placed into boxes
  - m — the number of boxes available
---

## Try it

1. Set n to 8 and k to 3, and read the total under the pool: that is how many different 3-person committees you could form.
2. Drag k up toward n and watch the number of groups climb, then drag it back down toward 0 and watch it shrink again.
3. Tap anywhere on the token pool to jump k straight to that position, and compare the new count to the one before.

## Real-life examples

1. **Picking a 3-person committee.** Choosing 3 volunteers for a committee out of 8 people who signed up: n = 8 and k = 3, and the order they are picked in does not matter.
2. **Choosing pizza toppings.** A pizza shop lets you pick 2 toppings from a menu of 5: n = 5 and k = 2, "mushroom then olive" counts the same as "olive then mushroom".
3. **Picking lottery numbers.** A lottery draws 4 numbered balls from a drum of 10: n = 10 and k = 4, and the winning set is the same no matter the order the balls came out.

## Test yourself

1. Find values of n and k that allow exactly 10 different selections.
2. Find values of n and k that give more than 100 different selections while picking 6 or fewer items.
3. Find the n and k that give the largest possible number of different selections in this picture (252 groups).

## Intuition

Imagine 8 volunteers sign up and a 3-person committee needs to be chosen from them. Slide n to 8 and k to 3, and the picture below shows every different group of 3 you could form from the coloured tokens in the pool. Push k up toward n and the number of possible groups grows fast, because there are far more ways to combine tokens once the group size gets close to half of n.

Now flip the idea around: invite 13 people to a party where only 12 calendar months exist to hold birthdays, and at least two guests are forced to share a month no matter how the dates fall. That is the pigeonhole principle: whenever you have more items than boxes to hold them, one box must end up with two or more items inside it.

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
