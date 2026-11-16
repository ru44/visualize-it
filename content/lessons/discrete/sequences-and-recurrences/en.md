---
title: 'Sequences and recurrences'
summary: 'Build Fibonacci numbers from the previous two terms, then compare them with a formula that estimates any chosen term.'
parameters:
  x: 'n — whole-number index of the term'
variables:
  - 'F_n: Fibonacci value at index n'
  - 'φ: golden ratio, approximately 1.618'
---

## Try it

1. Set x = 0, then 1, then 2. The curve gives about 0.447, 0.724 and 1.171. Rounding gives the Fibonacci values 0, 1 and 1; the curve itself is an approximation.
2. Set x = 8. The curve gives about 21.010, close to the exact value 21.
3. Set x = 20. The estimate is very close to 6765. Compare this growth with the early terms you calculated by addition.

## Real-life examples

1. **Climbing seven steps.** If each move climbs one or two steps, there are 21 possible sequences of moves. This count is F8: the staircase count is shifted by one index from Fibonacci.
2. **Climbing eleven steps.** Under the same rule, there are F12 = 144 sequences of moves. Count sequences, not just the total number of one-step and two-step moves.
3. **Climbing nineteen steps.** The count is F20 = 6765. The graph estimates this count without listing every sequence of moves.

## Test yourself

1. Find the integer x where the curve is approximately 21.
2. Find the integer x where the curve is approximately 144.
3. Find an integer x where the curve exceeds 1000.

## Intuition

A sequence is an ordered list of values. Start with 0 and 1, then repeatedly add the last two: 0, 1, 1, 2, 3, 5, 8. For example, after 3 and 5 comes 8, and after 5 and 8 comes 13. A rule that uses earlier terms to find later ones is called a recurrence.

The curve uses a different method: it raises the number called the golden ratio to a power and divides by the square root of 5. This estimates a term directly from its index. The curve is smooth, but the Fibonacci sequence consists only of values at whole-number indices. Even there, the plotted estimate is not exactly the sequence value.

## Formal

The Fibonacci recurrence is $F_n = F_{n-1} + F_{n-2}$ for integers n at least 2, with $F_0 = 0$ and $F_1 = 1$. The two initial values are necessary: the recurrence alone does not determine a unique sequence.

Let $\varphi = (1+\sqrt5)/2$ and $\psi = (1-\sqrt5)/2$. The exact closed form is $F_n=(\varphi^n-\psi^n)/\sqrt5$. The diagram omits the second term and plots $\varphi^n/\sqrt5$. For nonnegative integer n, rounding this estimate to the nearest integer gives the exact Fibonacci number in exact arithmetic.

## Advanced

The omitted term shrinks because the magnitude of ψ is less than 1. Also, the ratio of consecutive nonzero Fibonacci terms approaches φ, about 1.618. Computer rounding eventually limits the accuracy of calculations with large powers; a recurrence using exact integers avoids that numerical issue.

## Derivation

1. Specify the starting values 0 and 1. Without them, the addition rule could produce many different sequences.
2. Add the last two terms to obtain each new term. For instance, 8 + 13 gives 21.
3. The exact formula contains a growing power of φ and a shrinking power of ψ. For large indices, the growing part dominates, explaining both the plotted approximation and the limiting ratio.

## Real world

### Counting ways to climb stairs

Let S(n) count ways to climb n steps using moves of size 1 or 2. The last move comes from step n − 1 or n − 2, so S(n) = S(n − 1) + S(n − 2). With S(0) = S(1) = 1, this gives S(n) = F(n + 1).

### Avoiding repeated calculations

A program can compute the sequence by keeping the latest two values. It does not need to recompute the earlier terms each time it adds a new one.
