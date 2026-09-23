---
title: The Hilbert curve
summary: >-
  A single line visits every square of a grid exactly once, bending back on
  itself so that squares close together on the line are almost always close
  together on the page too.
parameters:
  order: grid size (2^order)
  t: how much is drawn
variables:
  - the order you choose — the grid is 2^k cells wide
  - how far along the curve you are, from the first cell to the last
  - the column of the cell the curve is visiting
  - the row of the cell the curve is visiting
charts: []
---

## Try it

1. Press play and watch the line grow. It never crosses itself and never jumps to a far-away square.
2. Raise "order". The grid gets finer — 8×8, then 16×16, then 32×32 — and the line still visits every cell exactly once.
3. Drag "t" back and forth to replay any part of the curve; nearby values of t land on neighbouring squares.

## Real-life examples

1. **A tiny 4×4 grid, fully drawn.** Sixteen cells, one visit each, and the whole trip stays inside a single quarter of the grid before moving to the next.
2. **Halfway across a 16×16 grid.** The curve has filled one whole half of the picture and is about to start the other, without ever crossing back over itself.
3. **A full 32×32 grid.** Over a thousand cells, visited one by one, still drawn as a single line that never jumps.

## Test yourself

1. Reach at least a 16×16 grid and draw at least 90% of the curve.
2. Draw the whole 4×4 curve from start to end.
3. Stop the line exactly halfway through its trip.

## Intuition

Imagine numbering every square of an 8×8 chessboard from 1 to 64 so that square 5 is always right next to squares 4 and 6 — no jumping across the board between consecutive numbers. That's what the dot on screen is doing: it walks the grid in one continuous line, visiting every cell exactly once, and it never has to leap from one side of the picture to the other.

The trick is that the curve is built from a smaller copy of itself, rotated and placed in each quarter of the grid in turn. Zoom into any quarter of the picture and you'd see the same U-shaped pattern, just at half the size — the grid version of the self-similarity the Mandelbrot set shows for a fractal boundary.

## Formal

The Hilbert curve of order $k$ maps each index $i$ to one cell $(x, y)$ of a $2^k \times 2^k$ grid, $i \to (x, y)$. It is built recursively: the curve of order $k$ is four rotated and reflected copies of the curve of order $k-1$, joined end to end.

Because each step moves to a grid-adjacent cell, indices that are close together, small $|i_1 - i_2|$, almost always land on cells that are close together too, small $\|(x_1,y_1) - (x_2,y_2)\|$. No other one-pass numbering of a grid keeps this promise as well.

## Advanced

Because it keeps nearby indices nearby in space, the Hilbert curve is used to turn 2D or 3D coordinates into a single number that preserves locality — useful for spatial database indexes, image compression and cache-friendly memory layouts, where a range query on the number tends to touch a small, contiguous patch of the original space rather than scattering across it.

## Derivation

1. Choosing order $k$ fixes the grid at $2^k \times 2^k$ cells, so a larger order means a finer picture.
2. Write the index $i$ in base 4, one digit for every level of the recursion.
3. Each digit then rotates and offsets $(x, y)$ to zoom into the right quarter of the grid.

## Real world

### Spatial databases
Indexes for maps and geographic data often sort locations along a Hilbert curve, so a search for "everything near here" only has to look at one short stretch of the sorted list.

### Image and video compression
Reading pixels along a Hilbert curve instead of row by row keeps neighbouring pixels close together in the data stream, which helps compression algorithms find patterns.

### CPU caches
Some numerical libraries lay out large grids in memory along a Hilbert curve so that values a calculation needs together also sit close together in memory, which is faster to fetch.

### Dithering images
Some image-dithering algorithms walk the picture along a Hilbert curve instead of left to right, which spreads rounding errors more evenly and avoids visible streaks.
