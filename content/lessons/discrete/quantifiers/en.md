---
title: 'Quantifiers: for all and there exists'
summary: 'Learn why one example can prove “there exists,” while one counterexample disproves “for all.”'
parameters:
  N: 'N — include the integers from 1 to N'
  p: 'p — A contains multiples of this number'
  q: 'q — B contains multiples of this number'
  op: 'op — union (0), intersection (1), difference (2), complement of A (3)'
variables:
  - 'A: multiples of p from 1 to N'
  - 'B: multiples of q from 1 to N'
  - 'For all: every member of the stated domain'
  - 'There exists: at least one member of the stated domain'
  - 'Not in: does not belong to the set'
  - 'NOT: negates a statement'
---

## Try it

1. Set N = 20, p = 2 and q = 4. Read the B list: 4, 8, 12, 16 and 20 all belong to A as well. The circles stay fixed; inspect their numbered members.
2. Choose difference (op = 2). The selected numbers 2, 6, 10, 14 and 18 belong to A but not B. Any one proves that such a number exists.
3. Keep N = 20 and p = 2, then set q = 5. The number 5 belongs to B but not A, disproving “every member of B belongs to A.”

## Real-life examples

1. **Numbered lockers.** Among lockers 1–20, every number divisible by 4 is divisible by 2. Locker 2 shows that the reverse claim is false.
2. **Numbered stops.** Among stops 1–30, every sixth stop is also a multiple of 3. Stop 3 is a multiple of 3 but not of 6.
3. **A counterexample.** For numbers 1–24 with p = 5 and q = 3, the number 3 belongs to B but not A. One example disproves the claim that every member of B is in A.

## Test yourself

1. Choose p and q so that q is a multiple of p. Every multiple of q is then a multiple of p.
2. Choose p and q so that q is not a multiple of p. Then q itself disproves that claim about all positive multiples. Set N at least as large as q to see it in the diagram.
3. Choose N, p and q so that more than 5 displayed numbers belong to A but not B.

## Intuition

“Every multiple of 4 is even” concerns all multiples of 4. Checking 4 and 8 alone does not establish it. A general reason does: a multiple of 4 consists of groups of four, and each group of four can be split into two pairs. This proves the statement even beyond the displayed numbers.

“Some even number is not a multiple of 4” needs just one example: 2. We call it a witness. If someone instead claims that every even number is a multiple of 4, the same 2 disproves their claim and is called a counterexample. Pay attention to whether a statement says every or at least one.

## Formal

$(\forall x \in B)\ x \in A$ means every member of B belongs to A, or $B \subseteq A$. We can prove it by checking every member of a finite B, or by giving an argument that covers every member. One counterexample disproves it.

$(\exists x \in A)\ x \notin B$ means at least one member of A does not belong to B. One witness proves it. The claim does not say there is only one such member, nor that every member of A has this property.

## Advanced

Negating “every B is an A” gives “at least one B is not an A.” Negating “at least one B is an A” gives “no B is an A.” If B is empty, the first universal statement is true because it has no counterexample, while an existence claim about a member of B is false. The finite diagram does not by itself prove statements about all positive integers.

## Derivation

1. For p = 2 and q = 4, each member of B is divisible by 4 and therefore by 2. Thus every member of B belongs to A.
2. The number 2 belongs to A but not B, proving that at least one such member exists.
3. To deny that all members of B belong to A is to assert that at least one member of B does not belong to A.

## Real world

### Checking a class list

“Every student has submitted” requires checking all students or establishing the claim another way. “Someone has submitted” needs only one confirmed submission.

### Reading mathematical claims

“There is an even prime” is proved by the example 2. “Every prime greater than 2 is odd” needs a reason: an even number greater than 2 has 2 as a divisor other than 1 and itself.
