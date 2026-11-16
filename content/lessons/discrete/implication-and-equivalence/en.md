---
title: 'Implication and equivalence'
summary: 'Distinguish “if p, then q” from “p and q have the same truth value.”'
parameters:
  a: 'a — first statement: false (0) or true (1)'
  b: 'b — second statement: false (0) or true (1)'
variables:
  - 'p, q: statements represented by a and b'
  - 'XOR: true when exactly one statement is true'
  - 'Implication: if p, then q'
  - 'Equivalence: p and q have the same truth value'
  - 'NOT: reverses a truth value'
---

## Try it

1. Set a = 1 and b = 1. The displayed XOR output is 0 because the inputs agree. Equivalence would be true for this pair.
2. Keep a = 1 and set b = 0. XOR becomes 1. This is also the only pair that makes the implication “if a, then b” false.
3. Set a = 0 and b = 1. XOR is still 1, but the implication is now true. The XOR output alone cannot tell you whether an implication is true.

## Real-life examples

1. **Condition and result both hold.** Let p mean “it rains” and q mean “I carry an umbrella.” With a = 1 and b = 1, “if it rains, I carry an umbrella” is true. XOR is 0 because p and q agree.
2. **The result without the condition.** With a = 0 and b = 1, I carry an umbrella although it does not rain. This does not contradict the implication: it says nothing about what I do when it does not rain. XOR is 1.
3. **A counterexample.** With a = 1 and b = 0, it rains and I have no umbrella. This makes the implication false. XOR is 1 because the inputs differ.

## Test yourself

1. Set a = 1 and b = 0: the pair that makes “if a, then b” false.
2. Set a = 0 and b = 1: the original implication is true, but its converse is false.
3. Make both statements false. They are equivalent for this pair, and XOR is 0.

## Intuition

“If a number is a multiple of 4, then it is even” makes a promise about multiples of 4. To disprove it, we would need a multiple of 4 that is not even. An even number such as 6 does not disprove it: the statement never says that every even number is a multiple of 4.

An implication has a direction, from a condition to a conclusion. Equivalence asks for both directions and is true when the two statements agree. The diagram displays a third rule, XOR: its output is 1 when the inputs differ. Equivalence reverses that output; implication requires us to distinguish (1, 0) from (0, 1).

## Formal

$p \Rightarrow q$ is false only when p is true and q is false. In every other case it is true. The converse $q \Rightarrow p$ reverses the direction and need not have the same truth value. The contrapositive $\neg q \Rightarrow \neg p$ always has the same truth value as the original implication.

$p \iff q$ means that both implications hold, so p and q have the same truth value. In contrast, $p \oplus q$ is true exactly when their truth values differ. This XOR rule is the one shown by the diagram and its table.

## Advanced

A true implication does not automatically describe a cause. It is a relationship between truth values. When proving a mathematical implication, we must rule out every case where the condition is true and the conclusion false. Proving the contrapositive can be useful because it rules out the same cases from another starting point.

## Derivation

1. The implication fails only when its condition holds but its conclusion does not: p = 1 and q = 0.
2. The contrapositive fails when q = 0 and p = 1, exactly the same case. The two statements therefore agree in every row.
3. The converse fails when q = 1 and p = 0, a different case. Reversing the original implication needs a separate argument.

## Real world

### Describing shapes

Every square is a rectangle. The converse is false: a rectangle with sides 2 and 3 is not a square. A definition that works in both directions must add the missing condition.

### Program requirements

“If the input is empty, show an error” specifies what must happen for an empty input. It does not say that an empty input is the only possible cause of an error.
