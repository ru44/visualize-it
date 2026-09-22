---
title: Bubble sort
summary: >-
  Repeatedly swap neighbours that are out of order and the largest values bubble
  to the end. Simple to picture, expensive to run at scale.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - how many neighbour pairs have been compared so far
  - how many out-of-order pairs have actually been exchanged
---

## Intuition

Press play and watch adjacent bars get compared one pair at a time; whenever the left bar is taller than the right, they swap. After one full pass, the tallest bar has "bubbled" all the way to the end — guaranteed, because it is the biggest thing it meets on the way.

The readouts count comparisons and swaps as they happen: with $n$ items, each of the $n-1$ passes re-scans almost the whole array, so the total comparisons pile up as roughly $n^2/2$. Slide $n$ from 8 up to 40 and watch how much longer the bars take to settle — quadrupling $n$ roughly quadruples the wait, squared.

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
