---
title: Genetic algorithms
summary: >-
  Twenty random flight paths mostly crash into a wall; breed the ones that do
  best, mutate a few genes, repeat a dozen times, and most paths thread the
  gap — nobody ever wrote down which way to turn.
parameters:
  mutationRate: mutation rate
  gen: generation
variables:
  - how often a gene is replaced at random when a child is made
  - which generation of the population you are looking at
charts: []
---

## Try it

1. Look at generation 0: twenty thin grey paths leave the bottom in random directions, most hitting the wall or missing the target circle entirely.
2. Drag "generation" forward. More paths turn green — they reached the target — and the thick blue path, the best one in that generation, threads the gap more and more directly.
3. Push "mutation rate" up past 0.25 and stay at a late generation. Compare the paths to what you saw with a small mutation rate: they stay noisier and less lined-up even after the same number of generations.

## Real-life examples

1. **The very first, blind attempt.** At generation 0 with the default mutation rate, every path is random DNA nobody has tested yet — mostly failure, by design.
2. **After a dozen generations of ordinary mutation.** By generation 13 with a modest mutation rate, most of the twenty paths reach the target, and the best one goes almost straight through the gap.
3. **Too much randomness, even late.** By generation 13 with a high mutation rate, progress is real but messier — good genes keep getting overwritten before the population can settle on them.

## Test yourself

1. Run to generation 12 or later with mutation rate kept under 0.1, and watch most paths turn green.
2. Look at generation 0 or 1, before any breeding has happened at all.
3. Push mutation rate to 0.25 or higher and still run to generation 12 — notice the paths stay far more scattered than test 1, even with just as many generations to work with.

## Intuition

Each path's DNA is nothing but a starting direction plus a list of small turns, one per step of its flight. At generation 0 those numbers are pure noise, so the paths fan out in every direction and most either hit the wall or sail past the target. After every generation, the paths that got closest to the target — or reached it fastest — get to be parents more often; a child's DNA is built by taking the first half of one parent's turns and the second half of another's, then occasionally replacing a turn with a fresh random one.

Nobody writes "turn left here" into the rules. The turning instructions that work — the ones that happen to thread the gap — simply get copied into more children than the ones that crash, generation after generation, until most of the population is built from genes that already work. Mutation is what keeps the population from getting stuck: without ever replacing a gene at random, the population can only recombine turns it already has, and if none of those turns happen to be quite right, breeding alone will never find them.

## Formal

A path's chance of becoming a parent is proportional to its own fitness against the whole population's: $P(\text{parent}=i) = \dfrac{f_i}{\sum_j f_j}$, so a path twice as fit as another is picked twice as often, never guaranteed and never forbidden.

Two chosen parents' turn-lists are spliced at a fixed point to make a child, and then every gene of that child has an independent, small chance — the mutation rate — of being thrown out and replaced with a fresh random turn. Too small a mutation rate and the population can only ever recombine turns it started with; too large and even a good gene keeps getting overwritten before the population can lock it in, which is exactly the messier, slower progress you see at a high mutation rate.

## Advanced

This visualisation always copies the single best path of a generation into the next one unchanged (called elitism), which is why the best-path fitness shown never drops — without it, a lucky best solution can be bred or mutated away and genuinely lost. Real genetic algorithms face a matching failure mode called premature convergence, where the whole population becomes near-identical too early around a merely decent solution and stops exploring; a higher mutation rate, a larger population, or deliberately keeping some very different individuals alive are the usual fixes.

## Derivation

1. Start with a population of completely random flight paths.
2. Pick parents for the next generation in proportion to how fit each path already is.
3. Splice two parents' genes together, mutate the result with probability μ, and repeat for every new generation.

## Real world

### Antenna and engineering design
NASA has flown genetic-algorithm-designed antennas whose oddly bent shapes no human engineer would have drawn, found purely by breeding and mutating candidate shapes against a radio-performance score.

### Scheduling and timetabling
Airlines and universities breed populations of candidate schedules, scoring each by how few conflicts it creates, to search timetables far too large to check by hand.

### Game-playing agents
Some game AIs evolve entire populations of players against each other for many generations instead of being programmed with explicit strategies.

### Drug and molecule search
Chemists breed populations of candidate molecules, scored by predicted effectiveness, to search chemical spaces too vast to test exhaustively in a lab.
