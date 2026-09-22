---
title: Bubble sort
summary: >-
  Bubble sort shows why a method that's easy to picture by hand can quietly
  become far too slow once the list you're sorting gets large.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - how many neighbour pairs have been compared so far
  - how many out-of-order pairs have actually been exchanged
---

## Try it

1. Press play and watch two neighbouring bars get compared one pair at a time — whenever the left bar is taller, they swap.
2. Watch the comparisons and swaps counters climb as the bars settle into order.
3. Slide «n» from 8 up to 40 and press play again — notice how much longer it takes for all the bars to settle.

## Real-life examples

- **Sorting 8 playing cards in your hand.** With only 8 cards, comparing each neighbouring pair and swapping is quick enough to do without even thinking about it.
- **Lining up 24 students by height for a class photo.** With 24 students, the same neighbour-swapping method needs far more comparisons — the teacher would be at it for a while.
- **Sorting 40 books on a shelf by thickness.** With 40 books, comparing and swapping neighbours takes so many steps that a faster method would clearly be worth it.

## Test yourself

1. Find the value of n where the total number of comparisons comes out to exactly 190.
2. Push n up until the comparison count reaches 300 or more.
3. Set n to 10 and let the animation play all the way through to the end.

## Intuition

Picture 8 kids standing in a random order, repeatedly comparing each pair of neighbours: if the taller kid is on the left, they swap places. After one full pass down the line, the tallest kid has ended up all the way at the end — bumped along by every swap, like a bubble floating up through water. On screen those kids are the coloured bars: press play and watch two neighbouring bars get compared at a time, swapping whenever the left one is taller.

The counters above tally comparisons and swaps as they happen. The slider $n$ sets how many bars there are. Each of the n−1 passes re-checks almost every neighbour again, so comparisons pile up fast: 8 bars need 28 comparisons, but 40 bars need 780 — nearly 30 times as many for only 5 times the bars. That is what quadratic growth means: work grows roughly as the square of $n$, not in direct proportion to it.

## Formal

Bubble sort makes $n-1$ passes; pass $i$ compares and possibly swaps each of the first $n-i$ adjacent pairs, giving $\sum_{i=1}^{n-1} (n-i) = \dfrac{n(n-1)}{2}$ comparisons in the worst and average case.

Worst-case and average-case time is O(n²); best case (already sorted, with an early-exit flag) is O(n). It is a stable sort: equal elements never cross each other.

## Advanced

Bubble sort's O(n²) comparisons come from checking every one of the n(n−1)/2 pairs indirectly through repeated adjacent swaps — the same order of work as insertion and selection sort, and the reason none of the simple quadratic sorts are used on large data in practice. Its one virtue is adaptivity: with an early-exit check, an already-sorted array costs only O(n).

## Derivation

1. Each pass needs one fewer comparison, because the largest remaining element is already bubbled past the end.
2. Add up the comparisons across all $n-1$ passes — a sum of the first $n-1$ integers.
3. Drop the lower-order term: quadratic growth dominates for large n.

## Real world

### Teaching sorting
Bubble sort is rarely used in production, but it is the standard first example for teaching comparisons, swaps and Big-O.

### Nearly-sorted data
With an early-exit flag, bubble sort is efficient specifically when data is already almost in order — some real pipelines exploit this.

### Small embedded systems
On tiny inputs (a handful of sensor readings) the simplicity of bubble sort can outweigh its poor scaling.
