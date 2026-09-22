---
title: 'Sets and Venn diagrams'
summary: >-
  A set is just a collection of things. See how two sets overlap, and why
  counting their union means subtracting what you double-counted.
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

## Intuition

Tap the operation buttons and watch which numbers light up. With union you get every number that is a multiple of p or of q (or both); with intersection only the numbers that are multiples of both stay lit, sitting in the lens where the two circles overlap. Difference keeps only what is in A but not in B, and complement flips the picture, lighting up everything outside A.

Set N to 20, p to 2 and q to 3: A has 10 numbers, B has 6, and the overlap A ∩ B (multiples of 6) has 3. If you just added 10 and 6 you would get 16, but the picture shows only 13 numbers lit for the union, because the 3 multiples of 6 were about to be counted twice, once in each circle.

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
