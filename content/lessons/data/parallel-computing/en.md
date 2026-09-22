---
title: Parallel computing
summary: Adding more machines to a job only helps the part of the work that can actually run at the same time; the part that cannot sets a hard ceiling on how much faster you can go.
parameters:
  p: share of the work that can run in parallel
  x: number of machines
variables:
  - S, the speedup over a single machine
  - p, the fraction of the job that can run in parallel
  - x, the number of machines working at once
  - T, the time the job takes with x machines
---

## Try it

1. Set p to 0.5 and x to 1. The curve sits low; with only one machine there is no speedup at all.
2. Drag x up toward 1000. The curve on the graph climbs fast at first, then flattens out and barely rises anymore.
3. Raise p toward 0.99 instead. The same number of machines now reaches a much higher point on the curve before it flattens.

## Real-life examples

1. **Mostly one machine.** p at 0.5, x at 4: only half the job can be split up, so four machines barely double the speed.
2. **A well-parallelized job.** p at 0.95, x at 16: 95% of the work splits across 16 machines, close to a 16-fold speedup on a real cluster.
3. **A near-perfect MapReduce job.** p at 0.99, x at 200: 99% of the work parallelizes across 200 machines, like a large BigQuery-style scan.

## Test yourself

1. Set p to exactly 0.9.
2. Set x to exactly 100 machines.
3. Find values of p and x that make the job run more than 15 times faster.

## Intuition

Say a job takes one machine 100 minutes, and 95 of those minutes can be split across many machines, but 5 minutes are stuck being done by one machine no matter what, like waiting for a single file to download. Drag the slider x, the number of machines, and watch the dot climb the curve: at first every extra machine helps a lot, but the curve bends and flattens because those fixed 5 minutes never shrink.

How high that curve can ever climb is set by p, the slider for the parallel share of the job. Raise p toward 1 and the curve's flat ceiling rises with it, but no number of machines can ever climb past that ceiling.

## Formal

Normalize the time one machine needs to 1. A fraction p of that time can run on x machines in parallel, taking $p/x$; the rest, $1-p$, cannot be split and always takes the same time. So the time with x machines is $T(x) = (1-p) + p/x$, and the speedup over one machine works out to $S(x) = 1/((1-p) + p/x)$, the curve plotted above.

This is Amdahl's law. As x grows without bound, $p/x$ shrinks to nothing, so the speedup approaches a fixed ceiling, $S \to 1/(1-p)$ — the serial fraction alone decides the best speedup any number of machines can ever reach.

## Advanced

In practice the curve is usually worse than this ideal, since coordinating x machines carries its own overhead — network communication, the MapReduce shuffle stage, or waiting for the slowest machine to finish — so real speedup curves tend to flatten, and sometimes even fall, earlier than Amdahl's law alone predicts.

## Derivation

1. With one machine's time normalized to 1, splitting the parallel fraction p across x machines means that part now takes only p divided by x, while the serial fraction 1 minus p still takes just as long as before.
2. Speedup compares the original one-machine time to the new time on x machines, so S(x) is that one-machine time divided by T(x).
3. As x grows huge, p divided by x shrinks toward nothing, so the speedup approaches a fixed ceiling of 1 divided by 1 minus p, and can never climb past it.

## Real world

### BigQuery and distributed queries
BigQuery splits a query across thousands of machines, but any part of the plan that cannot be split still limits how much a bigger cluster helps.

### Video rendering and encoding
Rendering separate frames of a video splits easily across many machines, but stitching the final file back together is a serial step that limits total speedup.

### Scientific simulation
Weather and climate simulations split space into a grid that many machines can compute in parallel, but pieces near the edges of each region still need to exchange data with each other.

### Multi-core phones and laptops
A phone with eight cores does not run every app eight times faster, because the useful parallel fraction p of most everyday tasks is well under 100%.
