---
title: 'Proof by induction'
summary: >-
  Prove a base case, show each step forces the next, and the statement holds
  forever after — like a row of dominoes falling one after another.
parameters:
  x: n — how many terms are added
charts:
  - title: The sum formula against a comparison curve
    xLabel: n — number of terms
    yLabel: value
    series:
      - 'sum formula: n(n+1)/2'
      - 'comparison: n²/2'
variables:
  - n — how many terms you are adding up
  - i — the term currently being summed
  - k — the general step used in the inductive argument
---

## Intuition

Drag x and watch the curve trace $1 + 2 + \cdots + n$ as a smooth shape rather than a growing pile of separate additions. At n = 10 the curve sits at 55, matching what you get by actually adding 1 through 10 by hand — the formula is just a shortcut for the same running total.

The chart lines up that same formula against $n^2/2$, a close but not identical curve: the two nearly overlap for large n, but the exact sum is always a little above $n^2/2$ because of the leftover $n/2$ term. Watching them separate slightly at small n and converge at large n is a first taste of how formulas can approximate each other.

## Formal

Induction proves a statement $P(n)$ for every natural number n using two pieces: a base case showing $P(1)$ holds, and an inductive step showing that if $P(k)$ holds then $P(k+1)$ must hold too.

Once both pieces are in place, the chain is unbreakable: $P(1)$ is true, so $P(2)$ follows, so $P(3)$ follows, and so on for every n — exactly like one falling domino guaranteeing the next falls, forever down the line.

## Advanced

Strong induction strengthens the inductive step to assume $P(1), P(2), \dots, P(k)$ all hold rather than just $P(k)$, which is useful for statements — like every integer above 1 having a prime factorisation — where the step naturally splits into smaller pieces rather than shrinking by exactly one. Both forms rest on the same well-ordering fact about the natural numbers: any nonempty set of them has a smallest element.

## Derivation

1. Check the formula for the smallest case by hand: with a single term, the sum is just 1, and the formula agrees.
2. Assume the formula already works for some value k — this assumption is the one domino you are allowed to lean on.
3. Add the next term, k+1, onto both sides of the assumption and simplify; the result is exactly the formula for k+1, so the next domino falls too.

## Real world

### Counting handshakes
At a party of n people where everyone shakes hands once, induction proves the total number of handshakes always matches $n(n-1)/2$.

### Loop and algorithm costs
Analysing how many operations a loop performs as it runs n times often uses induction to prove a running-total formula like this one.

### Stacking and tiling puzzles
Many puzzles about covering a board or stacking blocks are solved by proving a small base pattern and showing it extends one step at a time.

### Compound interest schedules
Showing a savings formula holds after each new deposit, given that it held the step before, is the same domino-chain reasoning as induction.
