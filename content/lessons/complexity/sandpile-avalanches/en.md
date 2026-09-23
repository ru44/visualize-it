---
title: The sandpile that organises itself
summary: Drop grains of sand one at a time and the pile slides itself to the exact edge of collapse, where avalanches of every size — from one grain to thousands — become possible at any moment.
parameters:
  site: where each grain lands
  drops: grains dropped
variables:
  - how many grains are stacked at one cell
charts: []
---

## Try it

1. Press play and watch grains fall on the centre cell, one at a time. At first nothing much happens.
2. Once the pile in the middle turns orange, a new grain can trigger a burst of colour spreading outward. That is an avalanche.
3. Switch "where each grain lands" to drop at random spots instead of the centre. The pile still finds the same crowded, avalanche-ready state.

## Real-life examples

1. **A young, quiet pile.** After only 40 grains dropped on the centre, most cells are still nearly empty. A new grain rarely disturbs more than its own neighbours.
2. **A mature, critical pile.** After 160 grains on the centre, the pile has grown into a full cone. Now a single new grain can sit quietly, or it can set off a chain reaction that reshapes a large part of the grid.
3. **Dropped anywhere, same result.** 160 grains scattered at random spots, instead of always on the centre, still pushes the pile into the same crowded, avalanche-ready state.

## Test yourself

1. Keep grains landing on the centre and drop at least 160 of them. Watch the size of each new avalanche.
2. Switch to random landing spots and reach at least 120 drops. Confirm the pile still reaches the same crowded state.
3. Look at the pile after 5 or fewer drops. Confirm no avalanche has happened yet.

## Intuition

Picture dropping sand, one grain at a time, onto an empty table. At first every grain just sits where it lands. As more grains pile up, some cells get crowded: once a cell holds 4 grains it topples, pushing one grain to each of its four neighbours. Most of the time that is the end of it. But sometimes a toppling cell hands a grain to a neighbour that was already at 3, and that neighbour topples too, and so on — one dropped grain can trigger a cascade that reshapes a large part of the grid.

Nobody decided how crowded the pile should get. It gets there by itself: an empty table absorbs grains quietly, but a pile with a few large avalanches already behind it sits right at the point where the next grain could do almost nothing or almost everything. This self-tuning to the edge of collapse, with no dial to turn, is called self-organised criticality, and the sandpile is the simplest system known to show it.

## Formal

The grid is a cellular automaton over integer heights. Writing $z$ for the number of grains at a cell, the rule is: if $z \ge 4$ the cell topples, its height drops by 4, and each of its four neighbours gains one grain. A dropped grain can trigger a whole cascade of topplings before every cell is below 4 again — that cascade is one avalanche.

In the stationary state reached after many drops, avalanche sizes $s$ follow a power law, $P(s) \propto s^{-\tau}$ with $\tau$ close to $1$ on a large grid: avalanches of every size occur, most of them tiny and a few enormous, with no typical size to point to.

## Advanced

The exponent $\tau$ and the pile's fractal boundary are believed to depend only on the dimension of the grid, not on details like the toppling threshold or the grid's exact shape — a hallmark of a universality class, the same idea that groups magnets and fluids near their own critical points.

## Derivation

1. Dropping one grain on the chosen cell raises its height $z$ by one.
2. Once a cell reaches $z \ge 4$ it topples: it loses 4 grains and gives one to each of its four neighbours.
3. A toppled neighbour can itself reach 4 and topple, so one dropped grain can set off a whole chain before the grid is stable again.

## Real world

### Earthquakes
Stress builds slowly along a fault until a slip releases it, sometimes locally and sometimes in a cascade — real earthquake sizes follow a power law just like avalanche sizes here (the Gutenberg–Richter law).

### Forest fires
Litter builds up quietly for years until a spark meets a patch large enough to carry it into a fire of any size, from a few trees to an entire forest.

### Brain activity
Bursts of firing neurons in cortical tissue come in sizes that also follow a power law, a pattern researchers call neuronal avalanches.

### Traffic and stock markets
Small local slowdowns or trades usually stay small, but occasionally cascade into a jam or a crash — systems that sit, like the sandpile, close to their own tipping point.
