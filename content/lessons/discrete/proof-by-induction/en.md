---
title: 'Proof by induction'
summary: >-
  Induction proves a statement true for every one of infinitely many numbers
  from just two checks — a base case and a step that topples the next domino
  in an endless row.
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

## Try it

1. Drag x to 10 and read the curve's value, 55 — the same total as stacking cans 1 through 10 in a triangle.
2. Watch the second curve n²/2 sitting just below the first, and note the gap between them at your chosen x.
3. Push x all the way to 20 and read the running sum at the top of its range.

## Real-life examples

1. **Stacking a triangular can display.** A grocery stacks cans in a triangle 10 rows tall, 1 can in row 1 up to 10 cans in row 10, for 55 cans in total.
2. **Saving a growing amount each day.** Saving 1 dollar on day 1, 2 dollars on day 2, and so on for 14 days adds up to 105 dollars saved.
3. **Building a 20-step staircase of blocks.** A staircase built from cubes, one more cube per step for 20 steps, uses 210 cubes in total.

## Test yourself

1. Find the number of terms that makes the running sum equal exactly 66.
2. Find x where the exact sum is exactly 5 more than the comparison curve n²/2.
3. Find x where the running sum has already passed 150 but the comparison curve n²/2 has not.

## Intuition

Stack cans in a triangle 10 rows tall, 1 can in row 1 up to 10 cans in row 10, and counting them all by hand gives 55 cans. Drag the slider x to 10 and the chart's curve lands at that same number, tracing the running sum $1 + 2 + \cdots + n$ as one smooth shape instead of a pile of separate additions.

The chart also draws a second curve, $n^2/2$, close to the first one but not identical. At x = 10 the exact sum sits at 55 while the comparison curve sits at 50, a gap of 5 that comes from the leftover x/2 term hiding inside the exact formula. Watch the two curves separate slightly for small x and nearly meet for large x, an early look at how one formula can approximate another.

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
