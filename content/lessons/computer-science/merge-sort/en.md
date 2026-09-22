---
title: Merge sort
summary: >-
  Splitting a big messy pile in half again and again, sorting each tiny
  piece, then merging them back together lets you sort thousands of items
  quickly without ever hitting an unlucky worst case.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - how many times the list can be halved before reaching single elements
  - the step that combines two already-sorted halves into one sorted list
---

## Try it

1. Set n to 8 bars and step to 0, then press play slowly — watch the bars split into two groups of 4, then four groups of 2, before any comparing happens.
2. Keep watching as step climbs past halfway — two small sorted groups merge into one bigger sorted group, always taking whichever front bar is smaller.
3. Drag n up to 40 bars and press play again — the number of splitting levels barely grows, even with five times as many bars as before.

## Real-life examples

- **Arranging 8 playing cards by rank.** With n = 8, merge sort splits the hand into two groups of 4, then four pairs, before merging back — just 3 levels for a hand this small.
- **Lining up 32 classmates by height.** With n = 32, four times as many people only costs 5 splitting levels, not four times as many.
- **Alphabetizing a shelf of 40 books.** With n = 40, merging still finishes in about 5 or 6 levels, which is why merge sort stays fast even on a long shelf.

## Test yourself

1. Find the number of bars that needs exactly 5 levels of splitting to reach single bars.
2. Drag n to its largest setting, 40 bars, and play the animation all the way to the end.
3. Drag n to its smallest setting, 4 bars, and play the animation all the way to the end.

## Intuition

Picture a messy stack of 8 playing cards you want in order: split it into two piles of 4, then split each of those into pairs, until every pile is a single card that is trivially "in order" all by itself. Press play here and watch the bars do exactly that — splitting into halves, then quarters, then single bars — before a single comparison happens; the splitting phase only decides the groups, it does no sorting at all.

The real sorting happens on the way back up: each merge step slides two already-sorted piles side by side and always takes whichever front card is smaller, so the combined pile comes out sorted with no shuffling needed later. Every level of merging touches every single bar exactly once, and doubling the number of bars only adds one more level — which is why merge sort never has a slow day, no matter how scrambled the bars started.

## Formal

Merge sort recursively splits the array in half, sorts each half, then merges the two sorted halves in O(n) comparisons; the recurrence $T(n) = 2T(n/2) + O(n)$ solves to $T(n) = O(n\log n)$ in every case — best, average and worst.

It is a stable sort (equal elements keep their relative order through the merge) but needs O(n) auxiliary space for the merged output, unlike quicksort's in-place partitioning.

## Advanced

The recurrence $T(n) = 2T(n/2) + O(n)$ is the textbook case of the Master theorem with $a=2, b=2, f(n)=O(n)$: since $f(n) = \Theta(n^{\log_b a}) = \Theta(n)$, the solution is $T(n) = \Theta(n\log n)$. Merge sort's guaranteed worst case (unlike quicksort) and stability make it the standard choice for external sorting of data too large for memory, and for sorting linked lists.

## Derivation

1. Sort the two halves recursively, then merge them in linear time.
2. Halving n repeatedly reaches 1 after log₂n steps.
3. Every level merges all n elements once; multiply by the number of levels.

## Real world

### External sorting
Sorting a file too large for memory (a huge log or database table) merges sorted chunks from disk — the classic use of merge sort.

### Stable sorts in UI tables
Sorting a spreadsheet by one column while preserving the previous order of ties needs a stable sort like merge sort.

### Linked-list sorting
Because it never needs random access, merge sort is the natural way to sort a linked list in n log n time.

### Parallel and distributed sorting
Splitting the input and sorting pieces independently before merging is exactly how large-scale sort (e.g. MapReduce) is parallelised.
