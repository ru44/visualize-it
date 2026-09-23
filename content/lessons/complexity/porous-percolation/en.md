---
title: Porous rock and the percolation threshold
summary: Fill a rock with random pores and water either seeps straight through or stops dead, and the switch happens over a very narrow range of how porous the rock is.
parameters:
  porosity: fraction of pores (porosity)
  seed: rock sample
  step: how far the water has spread
variables:
  - how much of the rock is open pore space
  - which random arrangement of pores you're looking at
  - how far the water has spread from the top
charts: []
---

## Try it

1. Set "fraction of pores" low, around 0.3, and press play. The blue water spreads a little from the top and stops; it never reaches the bottom.
2. Now push "fraction of pores" up to about 0.75 and play again. Water floods straight through to the bottom almost every time.
3. Creep the slider up in small steps between 0.55 and 0.63. Somewhere in that narrow band the rock flips from blocking water to letting it through.

## Real-life examples

1. **A tight sandstone caprock.** With only 35% of its volume open, a rock seals in oil or gas underneath: no connected path of pores lets fluid through.
2. **The exact tipping point.** At about 59% open space, a large sheet of rock is right on the edge: some samples let water through, others just barely don't.
3. **A crumbly, weathered rock.** At 75% open space almost every sample lets water straight through, because open pores connect to each other everywhere.

## Test yourself

1. Find a fraction of pores where water clearly reaches the bottom, around 0.65.
2. Keep the fraction of pores under 0.4 and let the water spread for at least 15 steps. Watch it get stuck.
3. Find the narrow band, close to 0.59, where a sample could go either way.

## Intuition

Picture a slab of rock as a grid of tiny cells, and colour each cell brown if it's solid rock, or leave it empty if it's a pore water can sit in. Drag "fraction of pores" and watch the brown cells thin out or thicken up. Press play and blue water pours in from the top row and spreads into any open cell it touches, exactly like water finding its way through cracks.

At a low fraction of pores the empty cells are scattered and cut off from each other, so the water floods a little pocket near the top and stops — it has nowhere left to go. Push the slider higher and small pockets of empty cells start joining into bigger ones, until eventually one single chain of connected pores runs all the way from the top row to the bottom row, and the water pours straight through.

## Formal

Each cell is open with probability $p$, independently of every other cell, and closed otherwise. Water starts in every open cell of the top row and spreads to any open neighbour, so the wet region after many steps is exactly the set of open cells connected to the top by a chain of open neighbours.

For a large enough grid there is a sharp critical value, $p \approx 0.59$ for this square grid, below which no chain connects top to bottom and above which one almost always does: $p > 0.59 \Rightarrow$ the water reaches the bottom.

## Advanced

This is site percolation on the square lattice, and $p_c \approx 0.5927$ is known only numerically, not in closed form (bond percolation on the same lattice has the exact value $p_c = 0.5$). Near the threshold, quantities like the size of the largest connected cluster follow power laws in $|p - p_c|$, the same mathematics that describes magnets losing their magnetism at a critical temperature — percolation is the simplest model of a continuous phase transition.

## Derivation

1. Every cell is marked open with probability $p$ and closed otherwise, independently of its neighbours.
2. Water fills the open cells of the top row, then spreads outward one step at a time into any open neighbour it hasn't reached yet.
3. Above the critical fraction the open cells almost always link into one chain from top to bottom, so the flood reaches the last row.

## Real world

### Oil and water reservoirs
Geologists estimate a rock's porosity and connectedness before drilling, because oil only flows out if the pores form a connected path to the well.

### Filters and membranes
A coffee filter or a water filter works because its fibres leave pores connected enough to let liquid through while trapping larger particles.

### Forest fires and epidemics
The same connect-or-not question describes whether a fire jumps from tree to tree or a disease keeps spreading: both flip from dying out to sweeping through at a critical density.

### Electrical networks
A composite material conducts electricity only once enough conductive grains touch to form a connected path across it, the same percolation switch in a different material.
