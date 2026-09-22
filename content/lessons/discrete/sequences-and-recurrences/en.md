---
title: 'Sequences and recurrences'
summary: >-
  Fibonacci numbers are defined by looking backward, each one built from the
  two before it, yet a single closed formula predicts them all.
parameters:
  x: n — which term of the sequence
variables:
  - F_n — the nth Fibonacci number
  - '$\varphi$ — the golden ratio, about 1.618'
---

## Intuition

Drag x forward one step at a time and watch the curve leap upward faster and faster — this is the closed-form approximation to the Fibonacci sequence, built purely from powers of the golden ratio φ, yet at every whole number it lands almost exactly on the familiar 0, 1, 1, 2, 3, 5, 8, 13… you would get by just adding the two previous terms.

That is the strange part: nothing about $\varphi^n/\sqrt5$ looks like "add the last two numbers", but the recurrence $F_n = F_{n-1} + F_{n-2}$ and this smooth exponential curve describe exactly the same sequence. The recurrence is easy to compute one term at a time; the closed form lets you jump straight to term 50 without ever computing terms 1 through 49.

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
