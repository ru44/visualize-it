---
title: Bacterial growth and doubling time
summary: >-
  Under ideal conditions a bacterial colony doubles at a fixed interval — but
  exponential growth like this can only last until resources run out.
parameters:
  N0: N₀ — starting cell count
  T: T — doubling time
  x: t — time
variables:
  - number of cells at time t
  - starting number of cells
  - doubling time — minutes for the population to double
  - elapsed time
---

## Intuition

Drag t forward and watch N climb slowly at first, then faster and faster — each doubling adds as many cells as every previous doubling combined. The tangent line shown at your chosen t is the instantaneous growth rate there; notice it gets steeper and steeper as t grows, even though the doubling time T never changes.

Shrink T and the same population doubles more often in a given stretch of time, so the curve rockets up much faster — E. coli under ideal lab conditions can double in about 20 minutes, turning one cell into over a billion in under 10 hours. But no real culture keeps this up: nutrients deplete and waste builds up, so real growth eventually bends over into the logistic curve instead.

## Formal

$N(t) = N_0\cdot 2^{t/T}$ satisfies $N(t+T) = 2N(t)$: the population doubles every $T$ time units, regardless of the current size.

Equivalently $N(t) = N_0e^{kt}$ with $k = \ln 2/T$, since $2^{t/T} = e^{(t/T)\ln 2}$: doubling time and the usual exponential growth rate carry the same information.

## Advanced

Real bacterial growth curves show four phases — lag, exponential, stationary, death — and this doubling-time formula describes only the exponential phase; once nutrients or space become limiting, the same population instead follows the logistic equation, with $r = \ln 2/T$ playing the role of the logistic growth rate near $P=0$.

## Derivation

1. Each doubling time $T$, the count doubles again, regardless of the current size.
2. After $n$ doubling periods, the population has doubled $n$ times.
3. Write $n = t/T$ (allowing non-integer multiples) to get a smooth curve valid at any time $t$.

## Real world

### Food safety
Bacteria left at room temperature can double every 20–30 minutes, which is why perishable food is refrigerated to slow this down.

### Lab culturing
Microbiologists estimate doubling time from optical density readings to characterise how fast a strain grows.

### Infections
Untreated bacterial infections can grow exponentially in the body until the immune system or antibiotics intervene.

### Antibiotic dosing
Dosing schedules are timed against a pathogen’s doubling time to keep drug concentration ahead of regrowth between doses.
