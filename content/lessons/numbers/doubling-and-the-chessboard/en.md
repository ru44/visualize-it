---
title: Doubling and the chessboard
summary: >-
  Find out why doubling a single grain of rice sixty-four times would bury
  the whole world in rice.
parameters:
  k: the square number k
variables:
  - the number of grains on that square
  - the square number, counted from 1 to 64
---

## Try it

1. Click or drag to square 8 on the board. Watch the orange highlight, and read the label showing 128 grains — still a small handful you can picture.
2. Move to square 20. The number on the right already reads over half a million grains, more than every earlier square combined.
3. Push to square 64, the last dark corner of the board. Read the weight shown on the right — heavier than anything you could lift.

## Real-life examples

1. **End of the first row.** By square 8, the pile is 128 grains — still just a small handful.
2. **Halfway across the board.** By square 32, the pile has grown past two billion grains — more rice than one field could grow.
3. **The last square.** By square 64, the pile holds about $1.8\times10^{19}$ grains — many times more rice than the whole world has ever harvested.

## Test yourself

1. Move to square 16, the end of the second row.
2. Find the square where the grain count first passes one million.
3. Push k to 60 or beyond, near the end of the board.

## Intuition

Put one grain of rice on the first square of a chessboard, then two on the second, four on the third — each square holds exactly double the grains of the one before. On screen, drag the slider labelled k and watch the orange highlight creep across the board: through the whole first row, the pile is still just a small handful you could hold in one hand.

Give the grains on a square a name, $g$, so it's easy to talk about. Give the square's own position a name too, $k$, counted from 1 to 64. By square 20, $g$ has already shot past half a million, though the slider has barely crossed a third of the board. By square 64, the far corner lights up, and the weight reading on the right shows more rice than the entire world grows in a year.

## Formal

The chessboard has 64 squares. The number of grains on square $k$ is $g=2^{k-1}$: square 1 holds $2^{0}=1$ grain, square 2 holds $2^{1}=2$, and so on.

Each square holds exactly twice the grains of the one before it, since $g_{k} = 2\,g_{k-1}$. Unrolling that rule from square 1 gives the closed formula $g_{k}=2^{k-1}$.

## Advanced

The total across all 64 squares is $\sum_{k=1}^{64} 2^{k-1} = 2^{64}-1$, one grain short of double the last square alone — a general fact about doubling: the sum of everything so far is always just under the size of the next step.

## Derivation

1. The first square holds a single grain: $g_{1}=1$.
2. Every later square holds twice the grains of the one before: $g_{k} = 2\,g_{k-1}$.
3. Repeating that doubling from square 1 gives a direct formula: $g_{k} = 2^{k-1}$.

## Real world

### Viral spread
An infection that doubles its case count every few days follows the exact same curve as the chessboard — slow at first, explosive later.

### Bacteria in a dish
A single bacterium dividing every twenty minutes fills a petri dish by the same runaway doubling, not by adding cells one at a time.

### Compound interest
Money that doubles on a fixed schedule grows the same way — which is why a modest interest rate, left alone for decades, can multiply savings enormously.
