---
title: 'Implication and equivalence'
summary: >-
  Comparing XOR with "if... then" and "if and only if" shows why swapping an
  implication's two halves can turn a true statement false.
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

## Try it

1. Flip switch a to 1 and switch b to 1 and watch the gate's lamp — it stays dark, because XOR only lights up when the two inputs disagree.
2. Flip switch b back to 0 so a = 1 and b = 0: the lamp turns on, and the row (1, 0) lights up in the truth table on the right.
3. Try all four combinations of a and b and read off the sum column each time — that column is exactly what XOR computes.

## Real-life examples

1. **Rain wets the ground.** It rains (a = 1) and the ground is wet (b = 1): the promise "if it rains, the ground gets wet" holds exactly as you would expect.
2. **A sprinkler wets the ground without rain.** It does not rain (a = 0) but a sprinkler left the ground wet anyway (b = 1): the implication still holds, since it only promises what happens when it does rain.
3. **A covered patio stays dry in the rain.** It rains (a = 1) but a covered patio stays dry (b = 0): this is the one combination that breaks the promise "if it rains, the ground gets wet."

## Test yourself

1. Find the one combination of switches where the promise "if it rains, the ground gets wet" is broken.
2. Find a combination where rain and wet ground disagree, yet the promise still holds true.
3. Find a combination where rain and wet ground are equivalent, both false at once.

## Intuition

Set switch a to 1 and switch b to 1: both up, yet the lamp above the gate stays dark. Set both back to 0 and the lamp is still dark. Only when exactly one switch is up, a = 1 with b = 0, or a = 0 with b = 1, does the lamp light, because XOR rewards disagreement between its two inputs rather than agreement. OR is different: it would happily light up with both switches on.

Picture a weather rule instead: a = 1 means it rained, and b = 1 means the ground got wet. The implication "if it rains, the ground gets wet" only breaks in one situation, when a = 1 but b = 0, rain with no wet ground; every other combination of the two switches keeps the rule true, even a = 0 with b = 0. "If and only if" is stricter: it is true only when a and b agree, both up or both down, which is almost the opposite pattern from the XOR lamp above.

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
