---
title: Indexes and fast search
summary: An index lets a database jump straight to what it needs instead of checking every single row, turning a search that could take forever into one that takes a handful of steps.
parameters:
  e: dataset size, e
  target: item to find, target
variables:
  - N, how many items there are
  - b, how many steps binary search needs
  - e, the exponent so that N equals 10 to the e
---

## Try it

1. Set e to 3, so there are 1,000 items. The readouts show checking one by one needs 1 000 steps (1.0 ms), while halving each time needs only 10 steps (10 µs).
2. Raise e to 9. Checking one by one now needs 1 000 000 000 steps (1000.0 s), while halving each time needs only 30 steps (30 µs).
3. Now look at the row of 64 boxes and change target, or tap a box. With target at 41 the picture says found in 5 steps; with target at 0 it says 6 steps. Wherever the box hides, it never takes more than 7.

## Real-life examples

1. **A school roll.** e at 3, target at 12: searching 1,000 student names for one roll number.
2. **A phone contacts app.** e at 6, target at 41: searching a million contacts for one name.
3. **A billion-row database index.** e at 9, target at 55: searching a billion rows the way a database index does.

## Test yourself

1. Push e to 12, a trillion items.
2. Set target to 0, the very first item.
3. Bring e back down to 2 or below, under a hundred items.

## Intuition

Picture searching for one name in a phone book of a million names by reading every single entry from the start: on a bad day that is nearly a million checks. Raise the slider e and watch the number of steps for checking one by one explode, while the binary searcher instead jumps to the middle, decides whether the target is to its left or right, and throws away half the list in a single step. Repeating that halving gives the number of steps binary search needs, $b = \log_2 N$, where N is how many items there are.

That difference is enormous: a million items takes about 20 steps for binary search but up to a million checks one by one. This is exactly what a database index does behind the scenes, so a lookup that would take forever on an unsorted table finishes almost instantly once it is indexed.

## Formal

Binary search works on a sorted list of N items. It compares the target to the middle item, discards the half that cannot contain it, and repeats on what remains. Because each comparison halves the list, the worst case needs only $b = \log_2 N$ comparisons to finish.

A database index keeps a sorted structure over a column so a lookup can use exactly this trick. With $N = 10^e$ rows, an index brings a single search down from N comparisons to about $\log_2 N$ comparisons instead.

## Advanced

Real databases rarely use plain binary search directly; they use B-trees or similar wide-branching structures, so that even a lookup on disk, where each step is relatively slow, still needs only a handful of steps for billions of rows. BigQuery's clustering plays a related role, physically grouping rows so a query can skip whole blocks at once.

## Derivation

1. N equal to 10 to the e is just how many items the slider e stands for, from a few in a school roll to trillions in a warehouse.
2. Every step of binary search rules out half of whatever is still left to search.
3. Halving over and over, from N down to 1, takes exactly log base 2 of N steps, b.

## Real world

### Phone and contact apps

Typing a few letters into a contacts app narrows a million entries down to one almost instantly thanks to an index.

### Database indexes

Adding an index to a column lets a database find matching rows in a handful of steps instead of scanning the whole table.

### Dictionaries and library catalogues

Looking up a word in a paper dictionary is binary search by hand: open near the middle, then narrow left or right.

### BigQuery clustering and partitioning

BigQuery lets you cluster a table by a column so queries can skip straight to the relevant rows instead of scanning everything.
