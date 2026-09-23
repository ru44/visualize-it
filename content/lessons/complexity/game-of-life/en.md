---
title: 'Game of Life: four rules, endless patterns'
summary: Four rules about neighbours, with nobody in charge, and the grid starts building gliders that walk across the screen.
parameters:
  start: what you start from
  density: how crowded the start is
  gen: generation
variables:
  - the pattern you start from
  - how full the first generation is
  - which generation you are looking at
charts: []
---

## Try it

1. Press play and watch the blue squares. Nobody moves them. Each one only counts its eight neighbours.
2. Set "what you start from" to the gliders. Watch one five-square shape walk diagonally across the grid forever.
3. Drag "how crowded the start is" down to 5 and play again. Almost everything dies in the first few generations.

## Real-life examples

1. **A glider that walks.** Five cells arranged just so come back to the same shape every four generations, one step further along. Nothing in the rules mentions walking.
2. **A pulsar that breathes.** This pattern returns to itself every three generations, so it blinks in place for as long as you watch.
3. **A crowded start dies back.** Fill almost half the grid and most cells die of overcrowding in the first few steps, then the survivors settle into small still shapes.

## Test yourself

1. Start from the gliders and run to generation 40 or beyond. Count how far one glider has travelled.
2. Start from the pulsars and reach generation 20. The shape is back to where it began.
3. Set the crowd to about 5 percent and run 30 generations. Watch how little survives.

## Intuition

Imagine a street where every house follows one rule about its eight neighbours. A house with two or three neighbours stays lived in. A house with one or none empties out, and a house with four or more empties out too. An empty house with exactly three neighbours gets a new family. Nobody plans anything, and nobody sees more than their own street corner.

That is the whole game. Press play and the grid does something nobody wrote down: shapes appear that stay still, shapes that blink, and shapes that walk. John Conway invented these four rules in 1970, and people are still finding new patterns in them. The lesson is that complicated behaviour does not need complicated rules.

## Formal

The grid is a cellular automaton. Each cell has a state, alive or dead, and the next state depends only on the cell and its eight neighbours, all cells updating at the same time.

Writing $n$ for the number of live neighbours, a live cell survives when $n = 2$ or $n = 3$, and a dead cell becomes alive when $n = 3$. Everything else dies or stays dead.

## Advanced

The Game of Life is Turing complete. Patterns exist that build a working computer inside the grid, using streams of gliders as signals and collisions as logic gates. It is also undecidable in general whether a given starting pattern eventually dies out, which is the halting problem wearing a different coat.

## Derivation

1. Count the eight neighbours around every cell, using the same old generation for every count.
2. A live cell with two or three live neighbours stays alive, and any other live cell dies.
3. A dead cell with exactly three live neighbours comes alive, and the whole grid changes at once.

## Real world

### Modelling how things spread
The same neighbour-counting idea models forest fires, crystal growth and how a rumour moves through a crowd.

### Testing computers
Life patterns are a favourite benchmark, because the rules are trivial but the work is enormous when the grid is large.

### Biology
Patterns on seashells and animal coats come from neighbouring cells following local rules, much like this grid.

### The idea of emergence
Traffic jams, flocks and markets all show behaviour that no single participant intends, which is exactly what this grid demonstrates in the simplest possible way.
