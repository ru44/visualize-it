---
title: Doubling and the chessboard
summary: Follow repeated doubling and distinguish the amount on one square from the total so far.
parameters:
  k: square number k
variables:
  - number of grains on the selected square
  - square number, starting at 1
---

## Try it

1. Set k to 1, then 2, then 3. The selected squares hold 1, 2 and 4 grains. Compare those values with the running totals 1, 3 and 7.
2. Select square 8. It holds 128 grains, while all eight squares together hold 255.
3. Select square 64. Read the separate values for that square and the total. The displayed mass estimates the total, not just the final square.

## Real-life examples

1. **Eight squares.** Square 8 holds 128 grains after seven doublings. The total is 255 grains.
2. **Thirty-two squares.** Square 32 holds 2,147,483,648 grains. This is the result of 31 doublings from the first grain.
3. **The full board.** Square 64 holds about 9.22 billion billion grains. The total on all 64 squares is about 18.45 billion billion.

## Test yourself

1. Select square 16.
2. Find the first square holding more than one million grains.
3. Select any square from 60 through 64.

## Intuition

Put one grain on the first square, two on the next, and four on the third. Each new square gets twice as many grains as the previous square. The increase is not a fixed number of grains: it grows with the pile already there.

By square 8, there are 128 grains on that square. One more doubling adds another 128 to make 256 on square 9. Much later, doubling a billion adds another billion. Repeating the same operation can therefore produce increasingly large changes.

Keep the selected square separate from the running total. On square 3 there are 4 grains, but the first three squares together hold 1 + 2 + 4 = 7. The diagram reports both quantities because they answer different questions.

## Formal

If k counts squares starting at 1, the number on square k is $g_k=2^{k-1}$. The exponent is k minus 1 because the first square has not yet been doubled.

The total through square k is $S_k=2^k-1$. It is one grain less than the amount that would go on the next square.

## Advanced

To see the sum rule, double the sum 1 + 2 + 4 + … + 2 to the power k minus 1. Subtract the original sum: all intermediate terms cancel, leaving $2S_k-S_k=2^k-1$. The displayed mass uses an assumed grain mass, so it is an estimate even though the grain count is exact.

## Derivation

1. Put one grain on the first square to set the starting value.
2. Multiply the previous square's count by two to find the next count.
3. Reaching square k requires k minus 1 doublings, giving the direct formula.

## Real world

### Repeated copying

If every copy produces one additional copy each round, the number doubles per round. The rule assumes all copies participate successfully.

### Cell division

A simplified model in which every cell divides into two after each interval follows this pattern. Actual growth can slow when resources become limited.

### Data size

Doubling a file size repeatedly can exceed available storage quickly. Ten doublings multiply the size by 1024.
