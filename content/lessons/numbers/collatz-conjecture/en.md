---
title: The Collatz conjecture
summary: >-
  Halve an even number, triple an odd one and add 1 — every starting number
  anyone has ever tried reaches 1 eventually, but no one has proved it always
  will.
parameters:
  start: number to test
  step: how far into its trip
variables:
  - the number in the sequence right now, changing at every step
charts: []
---

## Try it

1. Watch the line. It starts at "start" and rises and falls as the rule is applied again and again.
2. Raise "start". Some numbers barely move before reaching 1; others climb for hundreds of steps first.
3. Drag "step" to scrub through the trip and watch the current value and whether it's even or odd.

## Real-life examples

1. **The number 27.** A modest start that still takes 111 steps and climbs as high as 9,232 before finally reaching 1.
2. **The number 6,171.** One of the most dramatic small starting points: 261 steps, peaking near 975 million before it comes back down.
3. **The number 15.** A short, calm trip: only a handful of steps before it settles at 1.

## Test yourself

1. Run the number 27 all the way to 1.
2. Pick a start above 5,000 and watch it halfway through its trip.
3. Run the number 15 all the way to 1.

## Intuition

Take 27. It's odd, so triple it and add 1: 82. Now it's even, so halve it: 41. Odd again: 124. Even: 62, then 31, then 94, 47, 142, 71 — the dot on the line keeps climbing and falling, and it doesn't reach 1 until 111 steps later, after peaking above 9,000.

There's no known reason a number couldn't climb forever instead of eventually crashing down to 1. Mathematicians have tested every starting number up to enormous limits, far beyond what any single computer could check by hand, and every single one has come back down. Nobody has found a counterexample, and nobody has proved one can't exist.

## Formal

For a positive integer $n$, define the next value as $n/2$ when $n$ is even, and $3n+1$ when $n$ is odd. The Collatz conjecture states that repeating this rule from any starting $n$ eventually reaches 1.

Despite its simplicity, the conjecture is unproved. It has been verified by computer for every starting value up to roughly $2^{68}$ without a single exception, which is strong evidence but not a proof for all $n$.

## Advanced

The Collatz function is a simple example of how easy it is to write a dynamical system whose long-term behaviour is genuinely hard to predict; Paul Erdős remarked that mathematics may not be ready for such problems. Generalisations of the rule have been shown to be undecidable in general, which suggests any full proof would need fundamentally new ideas, not just more computing power.

## Derivation

1. The trip starts at the chosen number: $n_0 = \text{start}$.
2. Each step halves an even value or triples an odd one and adds 1: $n_{k+1} = n_k/2$ if $n_k$ is even, otherwise $3n_k+1$.
3. Every starting number tested so far eventually reaches $n_k = 1$ — but nobody has proved it always must.

## Real world

### Testing software correctness
Because its stopping behaviour is unpredictable but easy to compute, the Collatz sequence is a favourite toy example for testing loops, recursion and memoisation while learning to program.

### Distributed computing projects
Volunteer computing projects have checked trillions of starting numbers across networks of ordinary computers, hunting for a counterexample that would disprove the conjecture.

### Puzzles and mathematical recreation
The rule is simple enough for a child to run by hand, yet it has resisted some of the best mathematicians for nearly a century, which is exactly why it keeps showing up in puzzle books.

### A model of unpredictable simple rules
Like Conway's Game of Life, the Collatz rule shows that a one-line instruction can produce behaviour nobody can fully predict in advance, only trace step by step.
