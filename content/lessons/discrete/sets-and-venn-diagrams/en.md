---
title: 'Sets and Venn diagrams'
summary: 'Learn how to combine two collections without counting their shared elements twice.'
parameters:
  N: 'N — include the integers from 1 to N'
  p: 'p — A contains multiples of this number'
  q: 'q — B contains multiples of this number'
  op: 'op — union (0), intersection (1), difference (2), complement of A (3)'
variables:
  - 'A: multiples of p from 1 to N'
  - 'B: multiples of q from 1 to N'
  - 'U: all integers from 1 to N'
---

## Try it

1. Set N = 20, p = 2, q = 3 and choose union (op = 0). The result contains 13 numbers.
2. Choose intersection (op = 1). Only 6, 12 and 18 remain selected: each belongs to both sets.
3. Choose difference (op = 2), then complement (op = 3). Difference selects members of A outside B; complement selects everything in the universe outside A.

## Real-life examples

1. **Two rules for numbered cards.** Among cards 1–20, ten numbers are multiples of 2 and six are multiples of 3. Three satisfy both rules, so 10 + 6 − 3 = 13 satisfy at least one.
2. **Cards satisfying both rules.** With N = 30, p = 4 and q = 6, the intersection contains 12 and 24. Each is divisible by both 4 and 6.
3. **One rule with an exclusion.** With N = 40, p = 5 and q = 7, A has eight numbers. Remove 35 because it also belongs to B: seven remain in A minus B.

## Test yourself

1. Choose N, p and q so that the union contains exactly 15 numbers.
2. Choose N, p and q so that the intersection contains more than 5 numbers.
3. Choose N, p and q so that the intersection is empty.

## Intuition

A set is a collection whose members we can identify. Here the rectangle contains the integers from 1 to N. The left circle groups multiples of p; the right groups multiples of q. A number in both sets appears in their overlap, once rather than twice.

For N = 20, p = 2 and q = 3, the two lists have 10 and 6 members. Adding their sizes counts 6, 12 and 18 twice. Subtract those three extra counts to get 13 distinct members. This combined set is the union. The three shared members form the intersection.

## Formal

$x \in A$ means that x belongs to A. The union $A \cup B$ contains members of either set, including members of both. The intersection $A \cap B$ contains only shared members. Writing $|A|$ for the number of members of a finite set, we have $|A \cup B| = |A| + |B| - |A \cap B|$.

The difference $A \setminus B$ contains members of A that are not in B. The complement $A^c = U \setminus A$ contains members of the chosen universe U that are not in A. A complement therefore depends on which universe we choose.

## Advanced

If every member of B belongs to A, B is a subset of A. The union is then A and the intersection is B. If no member is shared, the sets are disjoint and their sizes can be added without subtracting an overlap. The drawn circles keep the same shape; use the numbered members to determine these relationships.

## Derivation

1. Separate the union into members only in A, members only in B, and members in both.
2. Adding the sizes of A and B counts each shared member twice, but every other member once.
3. Subtract the size of the intersection. Each member of the union is now counted once.

## Real world

### Survey answers

If 12 students like drawing and 9 like music, we need to know how many like both before finding how many like at least one.

### Photo tags

Photos tagged beach or sunset form a union. Photos with both tags form an intersection. Beach photos without the sunset tag form a difference.
