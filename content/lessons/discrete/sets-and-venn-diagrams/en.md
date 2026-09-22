---
title: 'Sets and Venn diagrams'
summary: >-
  Counting two overlapping sets means subtracting what you double-counted,
  the same fix behind counting search results, guest lists, or survey
  answers that satisfy either of two conditions.
parameters:
  N: N — largest number in the universe
  p: p — A is every multiple of p
  q: q — B is every multiple of q
  op: op — which operation is highlighted
variables:
  - 'set A: the left circle, every multiple of p up to N'
  - 'set B: the right circle, every multiple of q up to N'
  - 'the universe U: every number from 1 to N, the big rectangle'
---

## Try it

1. Set N to 20, p to 2 and q to 3, and tap "union" — every ticket divisible by 2 or 3 lights up.
2. Tap "intersection" instead and watch the lit tickets shrink to just the ones divisible by both 2 and 3.
3. Tap "difference" and then "complement" and compare which tickets stay lit each time.

## Real-life examples

1. **Raffle tickets divisible by 2 or 3.** Out of 20 raffle tickets, the union with p = 2 and q = 3 lights up every ticket number divisible by 2 or by 3 (or both), the tickets eligible for a "lucky number" prize.
2. **Tickets divisible by both 4 and 6.** Out of 30 tickets, the intersection with p = 4 and q = 6 lights up only the numbers divisible by both, the multiples of 12, a smaller and rarer prize category.
3. **Tickets divisible by 5 but not 7.** Out of 40 tickets, the difference with p = 5 and q = 7 lights up numbers divisible by 5 that are not also divisible by 7, tickets that qualify for one prize but are excluded from a bonus draw.

## Test yourself

1. Find N, p and q so that the union A∪B contains exactly 15 numbers.
2. Find N, p and q so that the overlap A∩B has more than 5 numbers, the amount you'd double-count by just adding |A| and |B|.
3. Find N, p and q so small and mismatched that A and B never overlap at all.

## Intuition

Imagine 20 raffle tickets numbered 1 to 20, where set A is every ticket divisible by 2 and set B is every ticket divisible by 3. Tap the union button and every ticket that is a multiple of 2 or of 3 (or both) lights up. Tap intersection instead and only the tickets divisible by both light up, sitting in the lens where the two circles overlap.

Set N to 20, p to 2 and q to 3 on the sliders: A has 10 tickets, B has 6, and the tickets divisible by both, the overlap A∩B, has 3. Adding 10 and 6 gives 16, but the picture lights up only 13 tickets for the union, because the 3 tickets divisible by both were about to be counted twice, once in each circle.

## Formal

A set is a collection of elements with no repeats and no order; $x \in A$ means x belongs to A. For finite sets, $|A \cup B| = |A| + |B| - |A \cap B|$: add the two sizes, then subtract the overlap you counted twice.

Two useful special cases follow directly: if $A \cap B$ is empty the sets are disjoint and $|A \cup B| = |A| + |B|$; if $B \subseteq A$ then $A \cup B = A$ and $A \cap B = B$, so the formula still checks out.

## Advanced

The same idea extends to three sets by inclusion–exclusion: $|A \cup B \cup C| = |A|+|B|+|C| - |A\cap B| - |A\cap C| - |B\cap C| + |A\cap B\cap C|$, adding back the triple overlap that got subtracted three times. This pattern generalises to any number of sets and underlies counting arguments across combinatorics and probability.

## Derivation

1. Split the union into the three regions a Venn diagram shows: only A, only B, and the overlap.
2. Adding $|A|$ and $|B|$ separately means every element of the overlap gets counted in both sums.
3. Subtracting the overlap once removes exactly that duplicate, leaving each element counted a single time.

## Real world

### Database queries
SQL's UNION, INTERSECT and EXCEPT operators combine query results exactly like the set operations here, and databases must avoid double-counting rows that satisfy two conditions at once.

### Search filters and tags
Filtering photos tagged "beach" or "sunset" is a union; filtering by "beach" and "sunset" together is an intersection of the two tag sets.

### Spam and security rules
A message is blocked if it matches any rule in a blocklist (a union of trigger sets) but allowed through if it also matches an exemption list (a difference).

### Surveys and probability
Asking how many people like coffee or tea needs the union formula, since some people who like both would otherwise be counted twice.
