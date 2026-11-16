---
title: 'Proof by induction'
summary: 'Prove a statement for every positive integer by establishing a starting case and a rule that carries it to the next case.'
parameters:
  x: 'n — number of terms, controlled by x'
charts:
  - title: The sum formula against a comparison curve
    xLabel: n — number of terms
    yLabel: value
    series:
      - 'sum formula: n(n+1)/2'
      - 'comparison: n²/2'
variables:
  - 'n: number of terms in the sum'
  - 'i: index running through the terms'
  - 'k: arbitrary integer used in the inductive step'
---

## Try it

1. Set x = 10. The staircase contains 55 squares. Its pale copy completes a rectangle with 10 × 11 = 110 squares.
2. Set x = 11. The new column adds 11 squares, so the sum rises from 55 to 66. Check that the formula gives 11 × 12 ÷ 2 = 66.
3. Set x = 0, then x = 1. The first fallen domino represents establishing a starting case. Moving the slider illustrates the argument; it does not prove the step for every integer.

## Real-life examples

1. **Ten rows of cans.** Rows containing 1 through 10 cans use 10 × 11 ÷ 2 = 55 cans.
2. **Increasing daily savings.** Saving 1 unit on day 1, 2 on day 2, and so on for 14 days gives 14 × 15 ÷ 2 = 105 units.
3. **Twenty columns of blocks.** Columns of heights 1 through 20 use 20 × 21 ÷ 2 = 210 blocks.

## Test yourself

1. Find x for which the sum is exactly 66.
2. Find x for which the sum exceeds the comparison value x²/2 by exactly 5.
3. Find x for which the sum is at least 150 while x²/2 is still below 150.

## Intuition

Adding the integers from 1 to 10 gives 55. The staircase suggests a shortcut: two copies fit into a rectangle of width 10 and height 11, so one copy contains half of 110 squares. The same arrangement suggests the formula $1 + 2 + \cdots + n = n(n+1)/2$.

Induction gives another proof. First check that the formula works for 1. Then show that whenever it works up to some integer k, adding the next number makes it work up to k + 1. The second part must work for any k, not just for one chosen example. The base case starts the argument, and the step lets us reach every later integer.

## Formal

Let $P(n)$ be a claim about a positive integer n. To prove it for all such integers, establish the base case $P(1)$ and prove $P(k) \Rightarrow P(k+1)$ for every integer k at least 1. The assumption in this conditional proof is the induction hypothesis.

For the sum formula, assume $1+\cdots+k = k(k+1)/2$. Adding k + 1 gives $k(k+1)/2+(k+1)=(k+1)(k+2)/2$, which is precisely the formula with k replaced by k + 1. Together with the base case, this proves the claim.

## Advanced

Induction can start at another integer if the claim has a different domain. Strong induction allows the step to use all earlier cases from the base through k. The comparison curve here is n²/2: its absolute difference from the sum is n/2, which grows. Its relative error, measured against the exact sum, is 1/(n + 1), which shrinks.

## Derivation

1. At n = 1, the sum is 1 and the formula gives 1 × 2 ÷ 2 = 1. This establishes the base case.
2. Assume the sum through k is k(k + 1)/2. We use this assumption to prove the next case, not as a claim that all cases are already known.
3. Add k + 1 and factor out (k + 1). The result is (k + 1)(k + 2)/2, completing the inductive step.

## Real world

### Counting repeated work

If a process performs 1 operation on its first pass, 2 on its second, and so on, this formula counts the total after n passes. Induction verifies that the count remains correct after each additional pass.

### Building a pattern

A pattern that extends one row at a time often suggests an inductive proof: verify the first row, then explain why adding the next preserves the claimed property.
