---
title: The percolation threshold
summary: Open each cell of a grid independently at random; below a sharp fraction open, no path ever crosses the whole grid, and above it, one almost always does.
parameters:
  p: fraction open
variables:
  - the chance any one cell is open
charts: []
---

## Try it

1. Press play and watch cells switch on as "fraction open" sweeps upward from zero. Every open cell was decided for itself, independently of every other.
2. Watch the colour: connected open cells are grey, but the moment one connected group reaches from the top row all the way to the bottom row, that whole group turns orange.
3. Note the fraction open showing when that first happens. Restart and watch again — it happens at almost the same fraction every time, even though the pattern of open cells is completely different.

## Real-life examples

1. **Below threshold.** With 40% of cells open, the grid never grows anything larger than small, isolated islands — no orange cluster ever reaches across.
2. **Right at threshold.** With about 59.3% open, a single fragile path just barely manages to connect top to bottom, often winding and thin rather than solid.
3. **Well above threshold.** With 75% open, a thick, robust orange cluster fills most of the grid, and it connects top to bottom almost as soon as you look.

## Test yourself

1. Set "fraction open" to 0.45 or below. Confirm no cluster crosses the grid.
2. Set it to 0.7 or above. Confirm a cluster crosses the grid.
3. Set it within 0.01 of 0.593, right at the threshold itself.

## Intuition

Picture a square slab of stone riddled with tiny pores, each one either open or sealed, decided independently by nothing more than chance. Pour water on top and ask: does it ever reach the bottom? For a small slab the answer depends on luck. But grow the slab larger and larger, and something strange happens — the answer stops depending on luck at all. Below a sharp fraction of open pores, water essentially never gets through, no matter how big the slab is. Above that same fraction, it essentially always does.

Nothing in the rule mentions "crossing" or "connecting" — each cell only ever asks whether it, alone, is open. The whole-grid question of whether a path exists top to bottom is an entirely emergent one, built from millions of independent local coin flips, and yet it snaps from "almost never" to "almost always" over a startlingly narrow range of that one shared number.

## Formal

Each cell is open independently with probability $p$, and two open cells belong to the same cluster if they share an edge (up, down, left or right). The grid percolates once some cluster touches both the top row and the bottom row.

For an infinite square lattice, there is a critical probability $p_c \approx 0.593$: for $p < p_c$ every cluster stays finite with probability 1, and for $p > p_c$ an infinite cluster exists with probability 1.

## Advanced

Unlike bond percolation on the same lattice, where the critical probability is known exactly to be $\tfrac12$, no exact closed-form value of $p_c$ is known for site percolation on the square lattice — only extremely precise numerical estimates. Proving an exact value here remains an open problem, even though the threshold itself is not in doubt.

## Derivation

1. Each cell is open independently with probability $p$ and closed otherwise.
2. Open cells that touch (up, down, left or right) belong to the same cluster.
3. The grid spans, top to bottom, once one cluster reaches both edges; on a large square lattice this first happens near $p_c \approx 0.593$.

## Real world

### Oil and gas reservoirs
Whether oil can flow through a rock formation depends on whether its connected pore space crosses a percolation threshold, which is why not every porous rock is a usable reservoir.

### Composite materials
A mix of conducting and insulating grains conducts electricity only once enough conducting grains touch to form a path across the material — the same threshold, on a random mixture instead of a grid.

### Forest fires and disease on networks
Modelling which trees are flammable, or which people are susceptible, as randomly "open" or "closed" turns "does it spread across the whole area" into exactly this percolation question.

### Wireless network coverage
A mesh of radio nodes, each able to reach only its near neighbours, connects the whole area only once enough nodes are active — below that density, messages simply cannot cross the network.
