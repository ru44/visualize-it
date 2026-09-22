---
title: 'Sequences and recurrences'
summary: >-
  Fibonacci numbers are defined by looking backward, each one built from the
  two before it, yet a single formula lets you jump straight to term 50
  without computing the 49 before it.
parameters:
  x: n — which term of the sequence
variables:
  - F_n — the nth Fibonacci number
  - '$\varphi$ — the golden ratio, about 1.618'
---

## Try it

1. Drag x forward one step at a time from 0 and watch the curve trace 0, 1, 1, 2, 3, 5, 8, 13… exactly at each whole number.
2. Jump x straight to 8 and read the curve's value, 21 — the same count as the rabbit-pair story below.
3. Push x to 20 and see how fast the curve has grown by the far end of its range.

## Real-life examples

1. **Rabbit pairs after 8 months.** In the classic (unrealistic) breeding puzzle, a pair of rabbits produces F8 = 21 pairs after 8 months, each generation built from the two before it.
2. **Spiral counts in a sunflower head.** Large sunflower heads often show 144 spirals, F12 in the sequence, arranged at angles related to the golden ratio.
3. **How fast the sequence grows by term 20.** By the 20th term the sequence has already reached 6765, showing how quickly a rule this simple, add the last two terms, can snowball.

## Test yourself

1. Find the term where the curve reaches 21, the same 8th Fibonacci number as the rabbit-pair example above.
2. Find the term where the curve reaches 144, the same spiral count seen in a large sunflower head.
3. Find a term where the curve has already climbed past 1000.

## Intuition

A pair of rabbits breeds so that its population after 8 months reaches 21 pairs, each new count built from the two months before it, using the same building rule for every step after. Drag the slider x forward one step at a time and watch the curve leap upward faster and faster, landing on 21 the moment x reaches 8, then on 34 at x = 9, then 55 at x = 10, tracking the familiar sequence 0, 1, 1, 2, 3, 5, 8, 13… exactly.

That step-by-step rule has a shortcut: a single smooth curve, built from powers of the golden ratio $\varphi$, about 1.618, lands almost exactly on every one of those same whole numbers without ever adding two previous terms together. Computing term 50 this way takes one calculation, while the step-by-step rule would first need every term from 1 through 49.

## Formal

A sequence defined by a recurrence gives each term from earlier ones, here $F_n = F_{n-1} + F_{n-2}$ with seed values $F_0 = 0$ and $F_1 = 1$. A closed form instead gives $F_n$ directly as a function of n alone, with no reference to earlier terms.

Binet's formula is that closed form for Fibonacci, and its dominant part is $F_n \approx \varphi^n/\sqrt5$, rounded to the nearest whole number; the second, shrinking term of the exact formula becomes too small to matter once n is more than a few steps in.

## Advanced

The ratio of consecutive Fibonacci terms converges to the golden ratio, $F_{n+1}/F_n \to \varphi$, which follows directly from substituting the closed form into the ratio and letting the shrinking term vanish. This same constant $\varphi = (1+\sqrt5)/2$ solves $\varphi^2 = \varphi + 1$, the algebraic fingerprint of "each step is the sum of the two before it" carried over from a sequence to a single number.

## Derivation

1. Start the sequence with the two seed values, $F_0 = 0$ and $F_1 = 1$, which any recurrence needs before it can run.
2. Apply the recurrence itself: every later term is just the sum of the two immediately before it.
3. As n grows, the ratio between consecutive terms settles down to the golden ratio φ, which is why a pure power of φ approximates the whole sequence so well.

## Real world

### Population growth models
The classic (unrealistic) rabbit-breeding puzzle that first produced this sequence models each generation's size from the two before it.

### Recursive algorithms and memory
Computing Fibonacci numbers by naively re-deriving each call from scratch is painfully slow because the same subproblems get solved over and over — see how caching those results fixes it in the lesson on algorithm complexity.

### Spiral patterns in nature
Sunflower seed heads and pinecones often arrange in spirals whose counts are consecutive Fibonacci numbers, a side effect of growth angles related to the golden ratio.

### Financial and growth projections
Any quantity whose next value depends on a couple of previous values, like some simplified population or resource models, follows the same recurrence-to-closed-form logic shown here.
