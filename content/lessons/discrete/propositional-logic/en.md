---
title: 'Propositional logic'
summary: 'Use AND, OR and NOT to decide whether a combination of statements is true.'
parameters:
  a: 'a — first statement: false (0) or true (1)'
  b: 'b — second statement: false (0) or true (1)'
variables:
  - 'p, q: statements represented by inputs a and b'
  - 'AND: both statements must be true'
  - 'OR: at least one statement must be true'
  - 'NOT: reverses one truth value'
---

## Try it

1. Set a = 1 and b = 1. The AND output is 1 because both inputs are true.
2. Keep a = 1 and set b = 0. The output becomes 0: one true input is not enough for AND.
3. Set a = 0 and try both values of b. Compare the highlighted truth-table rows; neither gives output 1.

## Real-life examples

1. **Both requirements met.** Suppose a door requires a badge and a code. With a = 1 and b = 1, both requirements are met and AND returns 1.
2. **Only the badge.** With a = 1 and b = 0, the missing code makes AND return 0.
3. **Only the code.** With a = 0 and b = 1, the missing badge makes AND return 0.

## Test yourself

1. Find the input pair that makes AND return 1.
2. Choose different values for a and b.
3. Choose a so that changing b changes the AND output.

## Intuition

“The number 6 is even” is true; “the number 6 is odd” is false. A statement with a definite truth value is called a proposition. We represent true by 1 and false by 0. The inputs in the diagram represent two such statements.

AND requires both statements to be true. OR requires at least one, so it also accepts the case where both are true. NOT reverses the truth value of one statement. This diagram shows AND only; its four table rows cover all possible pairs of inputs.

## Formal

For propositions p and q, $p \land q$ means AND and is true only when both are true. $p \lor q$ means OR and is true when either or both are true. $\neg p$ means NOT p and is true exactly when p is false.

Each of two inputs has two possible values, giving $2^2 = 4$ combinations. More generally, a truth table for n inputs has $2^n$ rows. Each row records one combination and the result of the logical rule.

## Advanced

A tautology is true for every input, such as “p or not p.” A contradiction is false for every input, such as “p and not p.” De Morgan's laws explain how negation changes a combined condition: “not both” means at least one is false; “neither” means both are false.

## Derivation

1. List the four input pairs: (0, 0), (0, 1), (1, 0), (1, 1).
2. AND is 1 only in the final row. OR is 1 in every row except the first.
3. For “p or not p,” one of the two parts is always true, so the whole statement is a tautology.

## Real world

### Filtering a list

“Price below 50 AND in stock” keeps an item only if it meets both conditions. Replacing AND with OR also keeps items that meet just one.

### Checking a form

“Name supplied AND email supplied” can determine whether both required fields have been filled. NOT can express the opposite of one condition, such as “email not supplied.”
