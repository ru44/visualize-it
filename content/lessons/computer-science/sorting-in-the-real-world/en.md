---
title: 'Which sort do real programs use?'
summary: Your phone sorts a contact list in a blink, and the trick is that real software almost never uses the sorts taught first.
parameters:
  alg: the algorithm
  n: how many bars
  step: play position
variables:
  - how many items you sort
  - how many times you can halve n before reaching 1
  - putting items in order
charts: []
---

## Try it

1. Leave the algorithm on Timsort and press play. Watch it tidy up short stretches of bars first, then join them.
2. Slide the algorithm to Bubble sort and play again. Compare the comparison counter at the end, for the same 24 bars.
3. Slide it all the way to Radix sort. No two bars are ever compared, yet the row ends up in order.

## Real-life examples

1. **Sorting a contact list in Python or Java.** Both use Timsort, which sorts short runs by hand and then merges them. Real data often arrives half sorted already, and Timsort finishes those in almost one pass.
2. **Sorting inside the Linux kernel.** The kernel's own sort uses heap sort. It never needs extra memory and never slows to a crawl, which matters when the code runs in the kernel and cannot fail.
3. **Sorting a million small numbers.** Radix sort never compares two numbers. It buckets them by their last digit, then the next, which beats every comparison sort when the keys are short.

## Test yourself

1. Run Timsort to the end and read the number of comparisons.
2. Now run heap sort to the end on the same bars. It does more comparisons, yet it never gets much worse than this, whatever the data.
3. Run radix sort to the end. Its comparison counter stays at zero.

## Intuition

Twenty-four bars stand in a random order. Bubble sort walks the row again and again, swapping neighbours, and needs hundreds of comparisons. Timsort, which Python and Java use, first sorts short stretches of eight bars the way you sort cards in your hand, then merges the tidy stretches two at a time. You see the same row become ordered with far fewer comparisons.

Slide the algorithm along and the strategy changes, not the goal. Heap sort keeps the largest bar on top of a heap and moves it to the end, over and over. Quicksort splits the row around one bar and repeats on each side. Counting sort and radix sort never compare two bars at all. They look at the values themselves, so the comparison counter stays at zero all the way.

## Formal

Any sort that only compares pairs needs at least $\log_2(n!) \approx n\log_2 n$ comparisons in the worst case, so $O(n\log n)$ is the floor for merge sort, heap sort, quicksort and Timsort.

Counting and radix sort escape that floor because they read the keys instead of comparing them. Radix sort runs in $O(dn)$ for keys of $d$ digits, which is linear when the keys are short.

## Advanced

Real libraries mix several algorithms. C++ `std::sort` is introsort: quicksort until the recursion gets too deep, then heap sort, with insertion sort for tiny pieces. Java uses dual-pivot quicksort for numbers and Timsort for objects, because Timsort is stable and equal objects keep their original order. Go switched its standard sort to pattern-defeating quicksort in 2022. The Linux kernel uses heap sort in `lib/sort.c` and a bottom-up merge sort for linked lists, where a worst case would be unacceptable.

## Derivation

1. Each comparison splits the possible orders in two, and there are $n!$ possible orders to tell apart.
2. Stirling's approximation turns that count into roughly $n\log_2 n$ comparisons.
3. No comparison sort can beat that bound, which is why the good ones all land on the same $O(n\log n)$.

## Real world

### Your phone's contact list
Sorting names is a Timsort job. The list is nearly sorted already after one new contact, and Timsort spots the ordered runs and does almost no work.

### Databases
A database sorts far more data than fits in memory, so it sorts chunks, writes them to disk and merges them, which is merge sort applied to files.

### Graphics and games
Radix sort orders millions of triangles by depth every frame, because the keys are short integers and no comparisons are needed.

### Stable sorting in spreadsheets
Sort by city, then by age, and the cities stay in order inside each age group only if the sort is stable. Timsort and merge sort are stable; heap sort and quicksort are not.
