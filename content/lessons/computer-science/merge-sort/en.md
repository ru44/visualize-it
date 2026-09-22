---
title: Merge sort
summary: >-
  Split the list in half, sort each half, then merge the two sorted halves back
  together. Always n log n — no unlucky worst case.
parameters:
  'n': n — number of items
  step: step — play position
variables:
  - how many items are being sorted
  - how many times the list can be halved before reaching single elements
  - the step that combines two already-sorted halves into one sorted list
---

## Intuition

Press play and watch the bars split into smaller and smaller groups first — halves, then quarters, down to single bars that are trivially "sorted" alone. That splitting phase does no comparisons at all; it just decides the groups.

The real work happens on the way back up: each merge step walks two already-sorted groups side by side, always taking the smaller of the two fronts, so the combined group comes out sorted with no swaps needed later. Every level of merging touches every bar exactly once, and there are log2(n) levels — which is why the count never gets worse, no matter how the input was arranged to begin with.

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
