---
title: Quicksort
summary: >-
  Picking one item as a "pivot," sliding everything smaller to one side and
  everything bigger to the other, then repeating inside each side, sorts
  almost anything fast — though an unlucky pivot can slow it down badly.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - the element each partition step compares everything else against
  - how many comparisons against the current pivot have run so far
---

## Try it

1. Set n to 8 bars, press play slowly, and watch one bar get marked as the pivot while every other bar is pushed to its left or right.
2. Watch the pivot once the shuffle settles — it never moves again, because it is already sitting in its final sorted spot.
3. Drag n up to 40 bars and press play — a new pivot gets picked inside each smaller group, again and again, until every group is a single bar.

## Real-life examples

- **Sorting 8 kids in a lunch line by height.** With n = 8, one kid becomes the pivot, everyone shorter moves to their left and everyone taller to their right, and the trick repeats inside each side.
- **Sorting 40 exam papers by score before grading.** With n = 40, the same pivot trick keeps working on five times as many papers, one pile at a time, all the way down.
- **Sorting a tiny group of 4 friends by age.** With n = 4, one or two pivot rounds are enough to finish the whole sort.

## Test yourself

1. Drag n to the value where the total number of possible pairs among the bars is exactly 190.
2. Drag n to its largest setting, 40 bars, and play the animation all the way to the end.
3. Drag n to its smallest setting, 4 bars, and play the animation all the way to the end.

## Intuition

Picture 8 kids lined up in random height order, and you want them sorted from shortest to tallest fast: pick one kid as the pivot, and send everyone shorter than the pivot to their left and everyone taller to their right. Press play here and watch exactly that happen on screen: one bar gets marked as the pivot, every other bar is compared to it, and the shuffle ends with the pivot sitting in its exact final position — the one guarantee every round makes.

The same trick then repeats inside each smaller group on its own: a new pivot for the left group, a new pivot for the right group, smaller and smaller, until every group is down to one bar. Watch how a lucky pivot splits the bars into two roughly equal halves, while an unlucky pivot — say, always the shortest bar — leaves one huge group and one empty one, which is the difference between the fast, typical case and the slow, unlucky one.

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
