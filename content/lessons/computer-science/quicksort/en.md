---
title: Quicksort
summary: >-
  Pick a pivot, push everything smaller to one side and everything bigger to the
  other, then recurse. Fast on average, but a bad pivot can ruin it.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - the element each partition step compares everything else against
  - how many comparisons against the current pivot have run so far
---

## Intuition

Press play and watch one bar get marked as the pivot; every other bar is compared to it and shuffled to its left or right depending on whether it is smaller or bigger. Once the shuffle finishes, the pivot sits exactly where it belongs in the final sorted order — that is the one guarantee each partition step makes.

Then the trick repeats inside each side separately: a new pivot for the left group, a new pivot for the right group, smaller and smaller, until every group has one element. Watch how a good pivot splits the bars into two roughly equal halves, while an unlucky pivot (say, always the smallest bar) leaves one huge side and one empty one — that is the difference between the average and worst case.

## Formal

Quicksort partitions around a pivot $p$: all elements $< p$ go left, all $> p$ go right, then each side is sorted recursively; on average the pivot splits the array roughly in half, giving recurrence $T(n) = 2T(n/2) + O(n)$ and $T(n) = O(n\log n)$.

If the pivot is always the smallest or largest element (e.g. a poorly chosen pivot on already-sorted data), the recurrence becomes T(n) = T(n−1) + O(n), giving the O(n²) worst case; random or median-of-three pivot selection makes this rare in practice.

## Advanced

Quicksort sorts in place with O(log n) extra stack space on average (from the recursion), unlike merge sort's O(n) auxiliary array — which is why library sort implementations often default to a quicksort variant (introsort switches to heapsort if recursion gets too deep, guaranteeing worst-case O(n log n)).

## Derivation

1. Partitioning around the pivot costs O(n) comparisons; the two sides of size k and n−1−k are then sorted recursively.
2. A typical random pivot splits the array roughly evenly.
3. Each of the log₂n recursion levels does O(n) total work across its calls — the same pattern as merge sort.

## Real world

### Standard library sorts
Many languages’ default array sort is a quicksort variant, chosen for its excellent average-case speed and in-place memory use.

### Database query engines
Sorting result sets before a merge join or a GROUP BY often uses a quicksort-family algorithm.

### Selection algorithms
The same partition idea, without recursing on both sides, finds the k-th smallest element in expected O(n) time (quickselect).
