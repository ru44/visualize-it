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

## Try it

1. Watch the curve start flat near $t=0$: just the starting cell count, and nothing more yet.
2. Drag the time slider forward. The curve climbs slowly at first, then rockets upward.
3. Now drag the doubling-time slider, $T$, down. The same stretch of time now fits many more doublings, and the curve rockets up even faster.

## Real-life examples

- **E. coli in a warm broth.** Starting from just 10 cells ($N_0 = 10$) and doubling every 20 minutes ($T = 20$), the colony grows for 2 hours ($t = 120$): over six doublings, enough to pass 600 cells.
- **Yogurt culture bacteria.** Lactobacillus starting from 20 cells ($N_0 = 20$) doubles more slowly, about every 65 minutes ($T = 65$); after over 4 hours ($t = 260$) it has still multiplied many times over.
- **Slow soil bacteria.** A sluggish soil species starting from just 5 cells ($N_0 = 5$) and doubling only every 110 minutes ($T = 110$) still keeps climbing after over 7 hours ($t = 440$).

## Test yourself

1. Find the time $t$ at which the colony has doubled exactly once — set $t$ equal to the doubling time $T$.
2. Find the time at which the colony has grown to eight times its starting size (three doublings).
3. Starting from at least 80 cells and with a slow doubling time over 100 minutes, still push the colony's count past 500.

## Intuition

E. coli bacteria in a warm, nutrient-rich broth can double in number roughly every 20 minutes: one cell becomes two, two become four, and within ten hours one cell has become more than a billion. Drag the time slider, labelled $t$, forward from zero. Watch the population $N$ climb slowly at first, then faster and faster — each doubling adds as many cells as every doubling before it combined. The straight line touching the curve at your chosen point shows the instantaneous growth rate there. Watch it tilt steeper the further you drag, even though the doubling time $T$ never changes.

Now drag the doubling-time slider, $T$, down instead. The same population doubles more often in a given stretch of time, so the curve rockets up much faster; a longer $T$ does the opposite, stretching the climb out. But no real culture keeps doubling forever: nutrients run out and waste builds up, so real bacterial growth eventually bends over into a flatter, S-shaped curve instead — the logistic curve covered in another lesson.

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
