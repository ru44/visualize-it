---
title: 'Implication and equivalence'
summary: >-
  XOR is true when exactly one input is true. Compare it with "if... then"
  and "if and only if", and see why reversing an implication changes its
  meaning.
parameters:
  a: a — first input (0 or 1)
  b: b — second input (0 or 1)
variables:
  - 'p, q: propositions, each either true (1) or false (0)'
  - 'XOR: true when exactly one of p, q is true, false when they agree'
  - 'implies: false only when p is true and q is false'
  - 'if and only if: true when p and q share the same truth value'
  - 'NOT: flips true to false and false to true'
---

## Intuition

With both switches on the XOR gate's lamp stays dark, and it stays dark with both switches off too — XOR only lights up when the two inputs disagree, exactly one on and one off. That is different from OR, which would happily light up with both switches on.

Implication behaves differently again: "if p then q" only breaks when p is true but q fails to follow, so it is not about matching inputs at all, it is about one thing guaranteeing another. "If and only if" sits between the two: it is true precisely when p and q agree, true together or false together, much like XOR's opposite.

## Formal

$p \oplus q$ (XOR) is true exactly when p and q differ. $p \Rightarrow q$ is true in every case except p true and q false — notably it is true whenever p itself is false, however strange that first sounds. $p \iff q$ is true exactly when $p \Rightarrow q$ and $q \Rightarrow p$ both hold, i.e. when p and q share the same truth value.

Every implication has a converse and a contrapositive. The converse of $p \Rightarrow q$ is $q \Rightarrow p$, a different statement that need not be true. The contrapositive, $\neg q \Rightarrow \neg p$, is logically identical to the original: same truth value in every row.

## Advanced

"If it rains, the ground is wet" is $p \Rightarrow q$ with p = "it rains" and q = "the ground is wet". The converse, "if the ground is wet, it rains", can fail — a sprinkler could have wet the ground with no rain at all — so a true implication never licenses swapping its two halves. Only the contrapositive, "if the ground is not wet, it did not rain", is guaranteed by the original statement, and proofs often use it precisely because it is easier to argue.

## Derivation

1. $p \Rightarrow q$ fails in exactly one row of the truth table: p true, q false; every other combination makes it true.
2. Swap and negate both sides to get the contrapositive $\neg q \Rightarrow \neg p$, and check it fails in that same single row, so the two statements always match.
3. Swap without negating to get the converse $q \Rightarrow p$; it fails whenever q is true and p is false, a different row, so it is a genuinely different claim.

## Real world

### Parity and checksums
XOR compares bits for disagreement and underlies parity bits and checksums that catch single-bit errors in transmitted data.

### Warranty and legal conditions
"If you break the seal, the warranty is void" only tells you what happens after breaking the seal — an intact seal alone does not prove nothing broke, only the contrapositive does.

### Network switching
A signal reaches exactly one of two paths when a switch is in XOR-like exclusive mode, ensuring the two outputs never carry the same pulse at once.

### Mathematical proofs
Proving "if n² is even then n is even" is often easier as its contrapositive, "if n is odd then n² is odd", which is logically the same claim.
