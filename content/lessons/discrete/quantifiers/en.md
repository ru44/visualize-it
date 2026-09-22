---
title: 'Quantifiers: for all and there exists'
summary: >-
  "Every multiple of 4 is a multiple of 2" and "some multiple of 2 is not a
  multiple of 4" are two different kinds of claim. See both in one picture.
parameters:
  N: N — largest number in the universe
  p: p — A is every multiple of p
  q: q — B is every multiple of q
  op: op — which operation is highlighted
variables:
  - 'set A: every multiple of p'
  - 'set B: every multiple of q'
  - 'for all: the claim holds for every element you check'
  - 'there exists: the claim holds for at least one element'
  - 'not an element of'
  - 'not: flips a true claim to false and a false one to true'
---

## Intuition

With p = 2 and q = 4, B sits entirely inside A: every multiple of 4 you can name (4, 8, 12, …) also turns up in A's list of even numbers. That "every single one" claim is what the for-all quantifier means, and it is exactly why the picture shows B \ A empty — nothing is in B without also being in A.

Now look at what the difference A \ B lights up: 2, 6, 10, 14, 18 — numbers that are even but not multiples of 4. Each one is a witness to an existence claim: "there exists a multiple of 2 that is not a multiple of 4." You only need to find one such number to make that claim true, and the picture hands you five.

## Formal

$(\forall x \in B)\ x \in A$ says every element of B also belongs to A, which is exactly what $B \subseteq A$ means. It takes checking every element of B to be sure this holds — one counterexample would break it.

$(\exists x \in A)\ x \notin B$ says at least one element of A is missing from B. Unlike the universal claim, a single example is enough to make this true; you do not need to check every element of A.

## Advanced

The two quantifiers are negations of each other: $\neg(\forall x \in B,\ x \in A) \iff \exists x \in B,\ x \notin A$. To disprove "every B is an A" you only need one counterexample in B, and conversely, to disprove "some B is not an A" you would need to check every element of B and find none. This flip between "check everything" and "find one witness" is the single most useful trick for both writing and reading mathematical proofs.

## Derivation

1. Since B is exactly the multiples of 4, every one of them is also a multiple of 2 by definition, so the for-all statement holds for every x in B.
2. Pick x = 2: it is a multiple of 2 so it lies in A, but it is not a multiple of 4 so it is missing from B, which alone proves the existence claim.
3. Negating "for all x in B, x is in A" flips it into "there exists an x in B that is not in A" — swapping the quantifier and negating the inner statement together.

## Real world

### Software specifications
"All users must verify their email" is a for-all requirement checked against every account, while "some login attempt exceeded the rate limit" is an existence claim a monitor only needs one instance to trigger.

### Database queries
SQL's EXISTS clause checks an existential claim directly, stopping as soon as one matching row is found, while ALL or a join over every row checks a universal one.

### Mathematical theorems
"Every prime greater than 2 is odd" is universal and needs a general argument; "there exists an even prime" is existential and is proved just by pointing at 2.

### Everyday reasoning
"All swans are white" was believed true until a single black swan in Australia supplied the one counterexample needed to break a universal claim.
